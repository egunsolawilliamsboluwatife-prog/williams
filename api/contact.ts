import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const TO_EMAIL = "williams.the.tech@gmail.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const b = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot filled: anti-spam silent success
  if (typeof b.company_url === "string" && b.company_url.trim() !== "") {
    return res.status(200).json({ ok: true, notice: "filtered" });
  }

  // Submitted under 1.5 seconds after render: anti-bot silent success
  const startedAt = Number(b.startedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 1500) {
    return res.status(200).json({ ok: true, notice: "filtered" });
  }

  // Extract fields (supports both Contact page and Booking Popup modal)
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const businessName =
    typeof b.businessName === "string"
      ? b.businessName.trim()
      : typeof b.business === "string"
      ? b.business.trim()
      : "Not specified";
  const businessType =
    typeof b.businessType === "string" && b.businessType.trim() !== ""
      ? b.businessType.trim()
      : "General / Client Inquiry";
  const website = typeof b.website === "string" ? b.website.trim() : "";
  const budget =
    typeof b.budget === "string" && b.budget.trim() !== ""
      ? b.budget.trim()
      : "Not specified";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const source = typeof b.source === "string" ? b.source : "website";

  // Basic Validation
  const errors: Record<string, string> = {};
  if (!name || name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!message || message.length < 5) {
    errors.message = "Please include a brief message or project details.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  // 1. Deliver via Web3Forms (looks for WEB3FORMS_ACCESS_KEY or VITE_WEB3FORMS_ACCESS_KEY in Vercel env)
  const web3Key =
    process.env.WEB3FORMS_ACCESS_KEY ||
    process.env.VITE_WEB3FORMS_ACCESS_KEY ||
    (typeof b.access_key === "string" ? b.access_key : "") ||
    "fcc66b34-57bd-4782-b094-d6939177554d";

  let delivered = false;

  if (web3Key && web3Key.trim() !== "") {
    try {
      const emailContent = [
        `New Website Lead Submission`,
        `==================================`,
        `Client Name: ${name}`,
        `Client Email: ${email}`,
        `Business Name: ${businessName}`,
        `Business Type: ${businessType}`,
        `Current Website: ${website || "None provided"}`,
        `Package / Budget: ${budget}`,
        `Submission Source: ${source === "popup" ? "Booking Popup Modal" : "Contact Page Form"}`,
        `Date: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST`,
        `==================================`,
        `Message / Requirements:`,
        message,
      ].join("\n");

      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3Key.trim(),
          subject: `[New Lead] ${name} - ${businessName || "Local Business"}`,
          from_name: name,
          email,
          replyto: email,
          name,
          business: businessName,
          business_type: businessType,
          website: website || "none",
          budget,
          message: emailContent,
        }),
      });

      const web3Data = await web3Res.json().catch(() => ({}));
      if (web3Data.success || web3Res.ok) {
        delivered = true;
        return res.status(200).json({ ok: true, provider: "web3forms" });
      } else {
        console.warn("Web3Forms response warning:", web3Data);
      }
    } catch (err) {
      console.error("Web3Forms api route error:", err);
    }
  }

  // 2. Deliver via Resend if configured
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (apiKey && from) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from,
        to: [TO_EMAIL],
        replyTo: email,
        subject: `[New Website Lead] ${name} (${businessName})`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Business: ${businessName}`,
          `Business type: ${businessType}`,
          `Website: ${website || "None"}`,
          `Budget: ${budget}`,
          `Source: ${source}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      });

      if (!error) {
        return res.status(200).json({ ok: true, provider: "resend" });
      }
    } catch (err) {
      console.error("Resend api error:", err);
    }
  }

  // If no email service was configured yet, return status notice so frontend can offer direct Gmail compose
  return res.status(200).json({
    ok: true,
    delivered,
    notice: web3Key ? "transmission_attempted" : "needs_access_key",
    to: TO_EMAIL,
  });
}

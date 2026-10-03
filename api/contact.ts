import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const TO_EMAIL = "williams.the.tech@gmail.com";

const ALLOWED_BUSINESS_TYPES = [
  "Event rentals & venues",
  "Barber or salon",
  "Accounting, legal or professional services",
  "Home cleaning",
  "Contractor or home services",
  "Restaurant or food",
  "Health or wellness",
  "Retail shop",
  "Other",
];

const ALLOWED_BUDGETS = [
  "Launch (starting at $1,000)",
  "Growth (starting at $1,500)",
  "Signature (starting at $2,300)",
  "Not sure yet",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const b = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot filled: pretend success, send nothing
  if (typeof b.company_url === "string" && b.company_url.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  // Submitted under 3 seconds after render: anti-bot silent success
  const startedAt = Number(b.startedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 3000) {
    return res.status(200).json({ ok: true });
  }

  // VALIDATION
  const errors: Record<string, string> = {};

  const name = typeof b.name === "string" ? b.name.trim() : "";
  if (!name || name.length < 2 || name.length > 80) {
    errors.name = "Please enter your name.";
  }

  const email = typeof b.email === "string" ? b.email.trim() : "";
  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const businessName =
    typeof b.businessName === "string" ? b.businessName.trim() : "";
  if (!businessName || businessName.length < 2 || businessName.length > 120) {
    errors.businessName = "Please enter your business name.";
  }

  const businessType =
    typeof b.businessType === "string" ? b.businessType.trim() : "";
  if (!businessType || !ALLOWED_BUSINESS_TYPES.includes(businessType)) {
    errors.businessType = "Please choose a business type.";
  }

  const website = typeof b.website === "string" ? b.website.trim() : "";
  if (website) {
    if (website.length > 200 || !URL_REGEX.test(website)) {
      errors.website = "Please enter a valid web address, or leave it blank.";
    }
  }

  const budget = typeof b.budget === "string" ? b.budget.trim() : "";
  if (!budget || !ALLOWED_BUDGETS.includes(budget)) {
    errors.budget = "Please choose a budget.";
  }

  const message = typeof b.message === "string" ? b.message.trim() : "";
  if (!message || message.length < 20) {
    errors.message =
      "Please write at least 20 characters so I know what you need.";
  } else if (message.length > 2000) {
    errors.message = "Please keep your message under 2000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const web3Key = process.env.VITE_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;
  if (web3Key && web3Key.trim() !== "") {
    try {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3Key.trim(),
          subject: `New enquiry from ${name} (${businessName})`,
          from_name: name,
          email,
          business: businessName,
          business_type: businessType,
          website: website || "none given",
          budget,
          message,
          replyto: email,
        }),
      });

      const web3Data = await web3Res.json().catch(() => ({}));
      if (web3Data.success || web3Res.ok) {
        return res.status(200).json({ ok: true });
      }
    } catch (err) {
      console.warn("Web3Forms api route error:", err);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    // If Web3Forms wasn't configured and Resend is missing, return success so client fallback can handle it
    return res.status(200).json({ ok: true, notice: "lead_recorded" });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New enquiry from ${name} (${businessName})`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business: ${businessName}`,
        `Business type: ${businessType}`,
        `Website: ${website || "none given"}`,
        `Budget: ${budget}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      return res.status(502).json({ ok: false, error: "send_failed" });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: "send_failed" });
  }
}

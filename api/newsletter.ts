import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const TO_EMAIL = "williams.the.tech@gmail.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const b = (req.body ?? {}) as Record<string, unknown>;
  const email = typeof b.email === "string" ? b.email.trim() : "";

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ ok: false, error: "invalid_email" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (apiKey && from) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to: [TO_EMAIL],
        replyTo: email,
        subject: `New Newsletter Subscriber: ${email}`,
        text: `New subscriber email: ${email}\nDate: ${new Date().toISOString()}`,
      });
    } catch (e) {
      console.error("Resend newsletter error:", e);
    }
  } else {
    console.log(`[Newsletter Subscription] New subscriber: ${email}`);
  }

  return res.status(200).json({ ok: true, email });
}

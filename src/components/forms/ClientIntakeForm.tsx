import React, { useState } from "react";
import {
  CheckCircle,
  PaperPlaneTilt,
  Clock,
  ShieldCheck,
  EnvelopeSimple,
  ArrowSquareOut,
  ArrowClockwise,
} from "@phosphor-icons/react";
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from "../../config/site.ts";

export const ClientIntakeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    budget: "Growth (starting at $1,500)",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [deliveredViaWeb3Forms, setDeliveredViaWeb3Forms] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in your name, email, and a brief message.");
      return;
    }

    setIsSubmitting(true);

    let sentSuccessfully = false;

    // 1. If Web3Forms Access Key is provided in client, attempt delivery
    if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.trim() !== "") {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY.trim(),
            subject: `[New Website Lead] ${formData.name} - ${formData.business || "Local Business"}`,
            from_name: formData.name,
            email: formData.email,
            business: formData.business || "Not provided",
            budget: formData.budget,
            message: formData.message,
            replyto: formData.email,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (data.success || res.ok) {
          sentSuccessfully = true;
          setDeliveredViaWeb3Forms(true);
        }
      } catch (err) {
        console.warn("Web3Forms transmission notice:", err);
      }
    }

    // 2. Send to /api/contact (which reads server-side WEB3FORMS_ACCESS_KEY from Vercel)
    try {
      const apiRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          businessName: formData.business || "Not specified",
          budget: formData.budget,
          message: formData.message,
          source: "popup",
        }),
      });
      const apiData = await apiRes.json().catch(() => ({}));
      if (apiRes.ok && (apiData.ok || apiData.provider === "web3forms")) {
        sentSuccessfully = true;
        setDeliveredViaWeb3Forms(true);
      }
    } catch (err) {
      console.warn("API route contact notice:", err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const subjectText = `Website Project Inquiry: ${formData.name || "Client"}${formData.business ? ` (${formData.business})` : ""}`;
  const bodyText = `Hi Williams,\n\nName: ${formData.name}\nEmail: ${formData.email}\nBusiness: ${formData.business || "Not specified"}\nPackage / Budget: ${formData.budget}\n\nProject details:\n${formData.message}\n\nLooking forward to hearing from you!`;

  const webGmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    CONTACT_EMAIL
  )}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(bodyText)}`;

  if (isSuccess) {
    return (
      <div className="glass rounded-[28px] border border-line p-8 md:p-12 text-center max-w-xl mx-auto animate-fade-in shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={38} weight="fill" />
        </div>
        <h3 className="font-display font-bold text-2xl md:text-3xl text-bone mb-3">
          Inquiry Logged!
        </h3>
        <p className="font-sans text-base text-bone-muted leading-relaxed mb-6">
          Thank you, <strong className="text-bone">{formData.name}</strong>. Your project details have been recorded for <strong className="text-bone">{CONTACT_EMAIL}</strong>.
        </p>

        {deliveredViaWeb3Forms ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-6">
            <ShieldCheck size={16} />
            <span>Delivered directly to {CONTACT_EMAIL} inbox</span>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-navy border border-line text-left mb-6 space-y-3">
            <p className="font-sans text-xs text-bone-muted leading-relaxed">
              To send this immediately from your personal Gmail or email client:
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={webGmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ember text-navy font-sans font-bold text-xs hover:bg-ember-bright transition-colors shadow-md"
              >
                <ArrowSquareOut size={16} weight="bold" />
                <span>Open in Gmail (1-Click Send)</span>
              </a>
              <a
                href={mailtoUrl}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-deep border border-line text-bone font-sans font-medium text-xs hover:border-line-strong transition-colors"
              >
                <EnvelopeSimple size={16} />
                <span>Default Mail App</span>
              </a>
            </div>
          </div>
        )}

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy border border-line text-xs font-mono text-bone-subtle mb-6">
          <Clock size={15} className="text-ember" />
          <span>Egunsola Williams personal reply guaranteed within 2–4 hours</span>
        </div>

        <div className="pt-4 border-t border-line/60">
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                name: "",
                email: "",
                business: "",
                budget: "Growth (starting at $1,500)",
                message: "",
              });
            }}
            className="inline-flex items-center gap-2 text-xs font-mono text-bone-subtle hover:text-bone transition-colors cursor-pointer"
          >
            <ArrowClockwise size={14} />
            <span>Send another inquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="glass rounded-[28px] border border-line p-7 md:p-10 shadow-2xl space-y-6"
      >
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-ember/15 border border-ember/30 text-ember text-xs font-sans">
            {errorMessage}
          </div>
        )}

        {/* 1. Name */}
        <div>
          <label className="block text-xs font-mono text-bone-muted uppercase tracking-wider mb-2">
            Your Name <span className="text-ember">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Marcus Vance"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-navy-deep border border-line focus:border-ember focus:outline-none rounded-xl px-4 py-3.5 text-sm text-bone placeholder:text-bone-subtle/50 transition-colors"
          />
        </div>

        {/* 2. Email */}
        <div>
          <label className="block text-xs font-mono text-bone-muted uppercase tracking-wider mb-2">
            Email Address <span className="text-ember">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="marcus@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-navy-deep border border-line focus:border-ember focus:outline-none rounded-xl px-4 py-3.5 text-sm text-bone placeholder:text-bone-subtle/50 transition-colors"
          />
        </div>

        {/* 3. Business Name or Current Website (Optional) */}
        <div>
          <label className="block text-xs font-mono text-bone-muted uppercase tracking-wider mb-2">
            Business Name or Website <span className="text-bone-subtle text-[11px] font-normal lowercase">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="The Barber's Society / yourbusiness.com"
            value={formData.business}
            onChange={(e) => setFormData({ ...formData, business: e.target.value })}
            className="w-full bg-navy-deep border border-line focus:border-ember focus:outline-none rounded-xl px-4 py-3.5 text-sm text-bone placeholder:text-bone-subtle/50 transition-colors"
          />
        </div>

        {/* 4. Package / Budget Selection */}
        <div>
          <label className="block text-xs font-mono text-bone-muted uppercase tracking-wider mb-2">
            Target Package or Budget
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full bg-navy-deep border border-line focus:border-ember focus:outline-none rounded-xl px-4 py-3.5 text-sm text-bone transition-colors"
          >
            <option value="Launch (starting at $1,000)">Launch ($1,000) — Fast 1-Page Lead Generator</option>
            <option value="Growth (starting at $1,500)">Growth ($1,500) — Multi-Page with Booking</option>
            <option value="Signature (starting at $2,300)">Signature ($2,300) — Custom Interactive Build</option>
            <option value="Care Plan ($59/mo)">Care Plan ($59/mo) — Hosting, Fixes & Edits</option>
            <option value="Not sure yet">Not sure yet — let's discuss on a call</option>
          </select>
        </div>

        {/* 5. Message / Project Needs */}
        <div>
          <label className="block text-xs font-mono text-bone-muted uppercase tracking-wider mb-2">
            How can Williams help? <span className="text-ember">*</span>
          </label>
          <textarea
            required
            rows={4}
            placeholder="Tell me a bit about what you need: a brand new site, a redesign, or adding online booking..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-navy-deep border border-line focus:border-ember focus:outline-none rounded-xl p-4 text-sm text-bone placeholder:text-bone-subtle/50 transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-xl bg-ember hover:bg-ember-bright text-navy font-sans font-bold text-sm transition-all shadow-lg hover:shadow-ember/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
              <span>Sending inquiry...</span>
            </>
          ) : (
            <>
              <PaperPlaneTilt size={18} weight="bold" />
              <span>Send Message Directly</span>
            </>
          )}
        </button>

        {/* High-trust assurance & Direct email alternative */}
        <div className="pt-2 text-center space-y-2">
          <p className="font-sans text-xs text-bone-subtle flex items-center justify-center gap-1.5">
            <ShieldCheck size={15} className="text-emerald-400" />
            <span>Delivers directly to {CONTACT_EMAIL} · No spam, guaranteed</span>
          </p>
          <p className="font-sans text-xs text-bone-muted">
            Prefer direct email?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Website%20Inquiry`}
              className="text-ember hover:underline font-medium"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

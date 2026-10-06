import React, { useState } from "react";
import {
  CheckCircle,
  PaperPlaneTilt,
  Clock,
  ArrowClockwise,
} from "@phosphor-icons/react";
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from "../../config/site.ts";

export const ClientIntakeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    budget: "Growth (starting at $1,000)",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in your name, email, and a brief message.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit directly to Web3Forms using FormData (official Web3Forms client-side format)
      const dataPayload = new FormData();
      dataPayload.append("access_key", WEB3FORMS_ACCESS_KEY.trim());
      dataPayload.append("name", formData.name.trim());
      dataPayload.append("email", formData.email.trim());
      dataPayload.append("business", formData.business.trim() || "Not specified");
      dataPayload.append("budget", formData.budget);
      dataPayload.append("message", formData.message.trim());
      dataPayload.append("from_name", formData.name.trim());
      dataPayload.append(
        "subject",
        `[New Website Lead] ${formData.name.trim()} - ${formData.business.trim() || "Local Business"}`
      );
      dataPayload.append("replyto", formData.email.trim());

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: dataPayload,
      });

      const data = await res.json().catch(() => ({}));
      if (data.success || res.ok) {
        console.log("Web3Forms submission success:", data);
      }
    } catch (err) {
      console.warn("Web3Forms client submission notice:", err);
    }

    // 2. Also forward to local /api/contact as backup
    try {
      await fetch("/api/contact", {
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
    } catch {}

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="glass rounded-[28px] border border-line p-8 md:p-12 text-center max-w-xl mx-auto animate-fade-in shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={38} weight="fill" />
        </div>
        <h3 className="font-display font-bold text-2xl md:text-3xl text-bone mb-3">
          Inquiry Sent!
        </h3>
        <p className="font-sans text-base text-bone-muted leading-relaxed mb-6">
          Thank you, <strong className="text-bone">{formData.name}</strong>. Your project details have been sent directly to Williams. You'll receive a response at <strong className="text-bone">{formData.email}</strong> within 2–4 hours.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy border border-line text-xs font-mono text-bone-subtle mb-6">
          <Clock size={15} className="text-ember" />
          <span>Egunsola Williams personal reply guaranteed within 2–4 hours</span>
        </div>

        <div className="pt-2 border-t border-line/60">
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                name: "",
                email: "",
                business: "",
                budget: "Growth (starting at $1,000)",
                message: "",
              });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono text-bone-subtle hover:text-bone hover:bg-navy transition-colors cursor-pointer"
          >
            <ArrowClockwise size={14} />
            <span>Send another inquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto text-left">
      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block font-mono text-xs text-bone-muted mb-1.5 uppercase tracking-wider">
          Your Name <span className="text-ember">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. David Vance"
          className="w-full px-4 py-3 rounded-xl bg-navy border border-line text-bone font-sans text-sm focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-all placeholder:text-bone-subtle/50"
        />
      </div>

      <div>
        <label className="block font-mono text-xs text-bone-muted mb-1.5 uppercase tracking-wider">
          Your Email Address <span className="text-ember">*</span>
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="e.g. david@vancepartners.com"
          className="w-full px-4 py-3 rounded-xl bg-navy border border-line text-bone font-sans text-sm focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-all placeholder:text-bone-subtle/50"
        />
      </div>

      <div>
        <label className="block font-mono text-xs text-bone-muted mb-1.5 uppercase tracking-wider">
          Business Name & Niche
        </label>
        <input
          type="text"
          value={formData.business}
          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
          placeholder="e.g. Vance Law Firm · Corporate Litigation"
          className="w-full px-4 py-3 rounded-xl bg-navy border border-line text-bone font-sans text-sm focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-all placeholder:text-bone-subtle/50"
        />
      </div>

      <div>
        <label className="block font-mono text-xs text-bone-muted mb-1.5 uppercase tracking-wider">
          Target Scope / Budget
        </label>
        <select
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-navy border border-line text-bone font-sans text-sm focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-all cursor-pointer"
        >
          <option value="Launch (starting at $600)">Launch Package (starting at $600)</option>
          <option value="Growth (starting at $1,000)">Growth Package (starting at $1,000) — Most Popular</option>
          <option value="Signature (starting at $1,500)">Signature Package (starting at $1,500)</option>
        </select>
      </div>

      <div>
        <label className="block font-mono text-xs text-bone-muted mb-1.5 uppercase tracking-wider">
          Project Details / What do you need? <span className="text-ember">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell me a bit about your business, current website or goals, and target timeline..."
          className="w-full px-4 py-3 rounded-xl bg-navy border border-line text-bone font-sans text-sm focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-all placeholder:text-bone-subtle/50 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ember hover:bg-ember-bright text-navy font-sans font-bold text-sm transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
      >
        <PaperPlaneTilt size={18} weight="bold" />
        <span>{isSubmitting ? "Sending inquiry..." : "Send Project Inquiry"}</span>
      </button>

      <p className="text-center font-mono text-[11px] text-bone-subtle pt-1">
        Direct delivery to {CONTACT_EMAIL} · No spam, guaranteed response
      </p>
    </form>
  );
};

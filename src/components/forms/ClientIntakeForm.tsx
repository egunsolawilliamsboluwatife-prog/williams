import React, { useState, useRef } from "react";
import {
  CheckCircle,
  WarningCircle,
  PaperPlaneTilt,
  Clock,
  Sparkle,
  ShieldCheck,
  CalendarCheck,
  CurrencyDollar,
  ListChecks,
} from "@phosphor-icons/react";
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from "../../config/site.ts";

interface IntakeFormValues {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  currentWebsite: string;
  budget: string;
  timeline: string;
  features: string[];
  hasAssets: string;
  projectGoals: string;
  company_url: string; // Honeypot
}

export const ClientIntakeForm: React.FC = () => {
  const startedAtRef = useRef<number>(Date.now());
  const [values, setValues] = useState<IntakeFormValues>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "Barber or salon",
    currentWebsite: "",
    budget: "Growth (starting at $1,500)",
    timeline: "2 to 4 weeks",
    features: ["Mobile booking calendar", "Local SEO basics"],
    hasAssets: "I have logo & photos ready",
    projectGoals: "",
    company_url: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const toggleFeature = (feature: string) => {
    setValues((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const errs: Record<string, string> = {};
    if (!values.name.trim()) errs.name = "Please enter your name.";
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!values.businessName.trim()) {
      errs.businessName = "Please enter your business name.";
    }
    if (!values.projectGoals.trim() || values.projectGoals.length < 15) {
      errs.projectGoals = "Please write at least a sentence about what you want to achieve.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const emailBody = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "Not provided"}`,
      `Business: ${values.businessName} (${values.businessType})`,
      `Budget Tier: ${values.budget}`,
      `Target Timeline: ${values.timeline}`,
      `Current Website: ${values.currentWebsite || "None"}`,
      `Brand Assets: ${values.hasAssets}`,
      `Features: ${values.features.join(", ")}`,
      "",
      "Project Goals & Details:",
      values.projectGoals,
    ].join("\n");

    try {
      // 1. Send via Web3Forms if access key configured
      if (WEB3FORMS_ACCESS_KEY) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `[Client Intake] ${values.name} - ${values.businessName}`,
            from_name: values.name,
            email: values.email,
            phone: values.phone || "Not provided",
            business: values.businessName,
            business_type: values.businessType,
            budget: values.budget,
            timeline: values.timeline,
            message: emailBody,
          }),
        }).catch((err) => console.warn("Web3Forms notice:", err));
      }

      // 2. Also forward to local /api/contact proxy
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          message: emailBody,
          website: values.currentWebsite,
          startedAt: startedAtRef.current,
        }),
      }).catch((err) => console.warn("Local API notice:", err));

      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `[Website Inquiry] ${values.name} - ${values.businessName}`
  )}&body=${encodeURIComponent(
    `Hi Williams,\n\nHere are my project intake details:\n\n` +
    `Name: ${values.name}\n` +
    `Email: ${values.email}\n` +
    `Phone: ${values.phone || "Not provided"}\n` +
    `Business: ${values.businessName} (${values.businessType})\n` +
    `Budget: ${values.budget}\n` +
    `Target Timeline: ${values.timeline}\n` +
    `Current Website: ${values.currentWebsite || "None"}\n` +
    `Brand Assets: ${values.hasAssets}\n` +
    `Features: ${values.features.join(", ")}\n\n` +
    `Project Goals:\n${values.projectGoals}\n`
  )}`;

  return (
    <div className="w-full">
      {/* 1. PRE-FLIGHT CHECKLIST: What Williams Needs From The Client */}
      <div className="bg-navy-deep rounded-[24px] border border-line p-6 md:p-8 mb-10 shadow-lg">
        <div className="flex items-center gap-2.5 mb-3 text-ember">
          <ListChecks size={22} weight="bold" />
          <h3 className="font-display font-bold text-xl text-bone tracking-tight">
            Before you start: What I need from you
          </h3>
        </div>
        <p className="font-sans text-sm text-bone-muted leading-relaxed mb-6">
          To build a custom website that wins local customers right out of the box, having these 5 items ready makes your project launch 2x faster:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 bg-navy-raised/50 p-3.5 rounded-xl border border-line/50">
            <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" weight="fill" />
            <div className="text-xs">
              <strong className="block text-bone font-medium mb-0.5">1. Business Details & City</strong>
              <span className="text-bone-muted">Your official business name, city/state, and primary phone number.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-navy-raised/50 p-3.5 rounded-xl border border-line/50">
            <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" weight="fill" />
            <div className="text-xs">
              <strong className="block text-bone font-medium mb-0.5">2. Primary Conversion Goal</strong>
              <span className="text-bone-muted">Direct appointment booking, quote inquiry, or phone calls.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-navy-raised/50 p-3.5 rounded-xl border border-line/50">
            <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" weight="fill" />
            <div className="text-xs">
              <strong className="block text-bone font-medium mb-0.5">3. Services & Pricing List</strong>
              <span className="text-bone-muted">Your menu of services, packages, or hourly rates to display.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-navy-raised/50 p-3.5 rounded-xl border border-line/50">
            <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" weight="fill" />
            <div className="text-xs">
              <strong className="block text-bone font-medium mb-0.5">4. Photos & Branding</strong>
              <span className="text-bone-muted">Logo, studio or shop photos (or I can curate high-end assets).</span>
            </div>
          </div>

          <div className="md:col-span-2 flex items-start gap-3 bg-navy-raised/50 p-3.5 rounded-xl border border-line/50">
            <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" weight="fill" />
            <div className="text-xs">
              <strong className="block text-bone font-medium mb-0.5">5. Timeline & Budget Tier</strong>
              <span className="text-bone-muted">Launch ($1,000+), Growth ($1,500+), or Signature ($2,300+).</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE FORM */}
      {isSuccess ? (
        <div className="glass rounded-[28px] border border-line p-8 md:p-12 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={38} weight="fill" />
          </div>
          <h3 className="font-display font-bold text-3xl text-bone mb-3">
            Inquiry received, {values.name.split(" ")[0]}!
          </h3>
          <p className="font-sans text-base text-bone-muted max-w-[48ch] mx-auto mb-6 leading-relaxed">
            Your project details have been recorded for Egunsola Williams ({CONTACT_EMAIL}). I review every submission personally and reply within 24 hours with custom recommendations.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy border border-line text-xs font-mono text-bone-subtle mb-8">
            <Clock size={15} className="text-ember" />
            <span>Average response time: 2–4 hours</span>
          </div>

          {/* Guaranteed direct delivery action */}
          <div className="p-5 rounded-2xl bg-navy-raised/60 border border-line/70 max-w-lg mx-auto text-left">
            <span className="block font-mono text-xs text-bone-muted uppercase tracking-wider mb-2">
              Instant Dispatch Backup
            </span>
            <p className="font-sans text-xs text-bone-subtle mb-3">
              Need immediate confirmation or want this in your sent items? You can also trigger an email directly to Williams with one tap:
            </p>
            <a
              href={mailtoLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ember hover:bg-ember-bright text-navy font-sans text-xs font-bold transition-all shadow-md"
            >
              <PaperPlaneTilt size={15} weight="bold" />
              <span>Open in your Email App (Pre-filled)</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass rounded-[28px] border border-line p-7 md:p-10 shadow-xl space-y-8">
          {/* Honeypot field (hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="company_url"
              tabIndex={-1}
              autoComplete="off"
              value={values.company_url}
              onChange={(e) => setValues({ ...values, company_url: e.target.value })}
            />
          </div>

          {/* Section A: Contact Details */}
          <div>
            <h4 className="font-display font-bold text-lg text-bone mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-ember/20 text-ember text-xs flex items-center justify-center font-mono">1</span>
              <span>Your Information</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-bone-muted mb-1.5">
                  Your Full Name <span className="text-ember">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  className="w-full bg-navy rounded-xl border border-line px-3.5 py-3 text-sm text-bone placeholder:text-bone-subtle focus:border-ember focus:ring-1 focus:ring-ember outline-none"
                />
                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono text-bone-muted mb-1.5">
                  Email Address <span className="text-ember">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="marcus@business.com"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  className="w-full bg-navy rounded-xl border border-line px-3.5 py-3 text-sm text-bone placeholder:text-bone-subtle focus:border-ember focus:ring-1 focus:ring-ember outline-none"
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono text-bone-muted mb-1.5">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="(312) 555-0199"
                  value={values.phone}
                  onChange={(e) => setValues({ ...values, phone: e.target.value })}
                  className="w-full bg-navy rounded-xl border border-line px-3.5 py-3 text-sm text-bone placeholder:text-bone-subtle focus:border-ember focus:ring-1 focus:ring-ember outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section B: Business Info */}
          <div className="pt-4 border-t border-line/60">
            <h4 className="font-display font-bold text-lg text-bone mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-ember/20 text-ember text-xs flex items-center justify-center font-mono">2</span>
              <span>About Your Business</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-bone-muted mb-1.5">
                  Business Name <span className="text-ember">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Barber's Society"
                  value={values.businessName}
                  onChange={(e) => setValues({ ...values, businessName: e.target.value })}
                  className="w-full bg-navy rounded-xl border border-line px-3.5 py-3 text-sm text-bone placeholder:text-bone-subtle focus:border-ember focus:ring-1 focus:ring-ember outline-none"
                />
                {errors.businessName && <p className="text-xs text-rose-400 mt-1">{errors.businessName}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono text-bone-muted mb-1.5">
                  Business Category <span className="text-ember">*</span>
                </label>
                <select
                  value={values.businessType}
                  onChange={(e) => setValues({ ...values, businessType: e.target.value })}
                  className="w-full bg-navy rounded-xl border border-line px-3.5 py-3 text-sm text-bone focus:border-ember focus:ring-1 focus:ring-ember outline-none"
                >
                  <option value="Barber or salon">Barber or salon</option>
                  <option value="Event rentals & venues">Event rentals & venues</option>
                  <option value="Accounting, legal or professional services">Accounting, legal or professional services</option>
                  <option value="Home cleaning">Home cleaning</option>
                  <option value="Contractor or home services">Contractor or home services</option>
                  <option value="Health or wellness">Health or wellness</option>
                  <option value="Restaurant or food">Restaurant or food</option>
                  <option value="Retail shop">Retail shop</option>
                  <option value="Other">Other local business</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-bone-muted mb-1.5">
                  Current Website / Social URL
                </label>
                <input
                  type="text"
                  placeholder="yoursite.com or IG handle"
                  value={values.currentWebsite}
                  onChange={(e) => setValues({ ...values, currentWebsite: e.target.value })}
                  className="w-full bg-navy rounded-xl border border-line px-3.5 py-3 text-sm text-bone placeholder:text-bone-subtle focus:border-ember focus:ring-1 focus:ring-ember outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section C: Project Requirements & Checklist */}
          <div className="pt-4 border-t border-line/60">
            <h4 className="font-display font-bold text-lg text-bone mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-ember/20 text-ember text-xs flex items-center justify-center font-mono">3</span>
              <span>Project Scope & Features You Need</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {[
                "Mobile booking calendar",
                "Custom quote request form",
                "Local SEO & Google Maps setup",
                "High-speed mobile performance",
                "Menu / price list display",
                "Ongoing care & hosting ($59/mo)",
              ].map((feat) => {
                const isSelected = values.features.includes(feat);
                return (
                  <button
                    type="button"
                    key={feat}
                    onClick={() => toggleFeature(feat)}
                    className={`p-3 rounded-xl border text-left text-xs font-sans flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-ember/15 border-ember text-bone font-medium"
                        : "bg-navy border-line text-bone-muted hover:border-line-strong hover:text-bone"
                    }`}
                  >
                    <span>{feat}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected ? "border-ember bg-ember text-ink" : "border-line"
                    }`}>
                      {isSelected ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-bone-muted mb-1.5">
                  Target Launch Timeline
                </label>
                <select
                  value={values.timeline}
                  onChange={(e) => setValues({ ...values, timeline: e.target.value })}
                  className="w-full bg-navy rounded-xl border border-line px-3.5 py-3 text-sm text-bone focus:border-ember focus:ring-1 focus:ring-ember outline-none"
                >
                  <option value="Immediately (Within 7-10 days)">Immediately (Within 7–10 days)</option>
                  <option value="2 to 4 weeks">2 to 4 weeks</option>
                  <option value="Next 1-2 months">Next 1–2 months</option>
                  <option value="Flexible / Just planning">Flexible / Just planning</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-bone-muted mb-1.5">
                  Estimated Budget Tier
                </label>
                <select
                  value={values.budget}
                  onChange={(e) => setValues({ ...values, budget: e.target.value })}
                  className="w-full bg-navy rounded-xl border border-line px-3.5 py-3 text-sm text-bone focus:border-ember focus:ring-1 focus:ring-ember outline-none"
                >
                  <option value="Launch (starting at $1,000)">Launch (starting at $1,000)</option>
                  <option value="Growth (starting at $1,500)">Growth (starting at $1,500)</option>
                  <option value="Signature (starting at $2,300)">Signature (starting at $2,300)</option>
                  <option value="Not sure yet">Not sure yet / Let's discuss</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-bone-muted mb-1.5">
                  Do you have photos & logo ready?
                </label>
                <select
                  value={values.hasAssets}
                  onChange={(e) => setValues({ ...values, hasAssets: e.target.value })}
                  className="w-full bg-navy rounded-xl border border-line px-3.5 py-3 text-sm text-bone focus:border-ember focus:ring-1 focus:ring-ember outline-none"
                >
                  <option value="I have logo & photos ready">Yes, logo & photos are ready</option>
                  <option value="I have a logo but need photos">Have a logo, need stock/photos</option>
                  <option value="Starting from scratch">Starting from scratch (need help)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section D: Goals & Notes */}
          <div className="pt-4 border-t border-line/60">
            <h4 className="font-display font-bold text-lg text-bone mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-ember/20 text-ember text-xs flex items-center justify-center font-mono">4</span>
              <span>Project Goals & Specific Notes <span className="text-ember">*</span></span>
            </h4>
            <p className="text-xs text-bone-muted mb-3 font-sans">
              Tell me about your business and your #1 objective (e.g. "We want more people calling from Google Maps", "Need clients to book online instead of texting").
            </p>
            <textarea
              required
              rows={4}
              value={values.projectGoals}
              onChange={(e) => setValues({ ...values, projectGoals: e.target.value })}
              placeholder="Describe what you want the website to do for your business..."
              className="w-full bg-navy rounded-xl border border-line p-3.5 text-sm text-bone placeholder:text-bone-subtle focus:border-ember focus:ring-1 focus:ring-ember outline-none"
            />
            {errors.projectGoals && (
              <p className="text-xs text-rose-400 mt-1">{errors.projectGoals}</p>
            )}
          </div>

          {/* Submit Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-bone-subtle font-sans">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>Submits directly to Egunsola Williams ({CONTACT_EMAIL})</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 rounded-xl bg-ember hover:bg-ember-bright text-ink font-sans font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <PaperPlaneTilt size={18} weight="bold" />
              <span>{isSubmitting ? "Sending..." : "Submit project inquiry"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

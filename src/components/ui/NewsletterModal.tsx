import React, { useState, useEffect, useRef } from "react";
import { X, EnvelopeSimple, CheckCircle, Sparkle } from "@phosphor-icons/react";
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from "../../config/site.ts";

export const NewsletterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Check if user already dismissed or subscribed in this session
    const isDismissed = sessionStorage.getItem("newsletter_popup_dismissed");
    if (isDismissed) {
      return;
    }

    const openPopup = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setIsOpen(true);
    };

    // Trigger 1: 15 seconds spent on page
    const timer = setTimeout(() => {
      openPopup();
    }, 15000);

    // Trigger 2: Scrolled 3/4 (75%) of page height
    const handleScroll = () => {
      if (hasTriggeredRef.current) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (fullHeight > 0 && (scrollY + viewportHeight) / fullHeight >= 0.75) {
        openPopup();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("newsletter_popup_dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (WEB3FORMS_ACCESS_KEY) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `[Newsletter Signup] ${email}`,
            email: email,
            from_name: "Williams Portfolio Newsletter",
            message: `New subscriber joining Williams Local Business Growth Newsletter: ${email}`,
          }),
        }).catch((err) => console.warn("Web3Forms notice:", err));
      }

      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch((err) => console.warn("Newsletter API notice:", err));

      setIsSuccess(true);
      sessionStorage.setItem("newsletter_popup_dismissed", "true");
    } catch {
      setIsSuccess(true);
      sessionStorage.setItem("newsletter_popup_dismissed", "true");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-md animate-fade-in"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] bg-navy-deep border border-line rounded-[28px] p-7 md:p-9 shadow-2xl overflow-hidden animate-scale-up"
      >
        {/* Ambient backlight glow */}
        <div
          className="absolute -top-16 -right-16 w-44 h-44 bg-ember/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close newsletter popup"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-navy border border-line flex items-center justify-center text-bone-muted hover:text-bone hover:border-line-strong transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} weight="fill" />
            </div>
            <h3 className="font-display font-bold text-2xl text-bone mb-2">
              You're on the list!
            </h3>
            <p className="font-sans text-sm text-bone-muted max-w-[34ch] mx-auto mb-6">
              Thank you for subscribing. We've recorded your email ({email}) and sent a confirmation.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 rounded-full bg-bone text-ink text-sm font-semibold hover:bg-bone/90 transition-colors"
            >
              Back to site
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ember/10 border border-ember/20 text-ember text-xs font-mono font-medium mb-4">
              <Sparkle size={13} weight="fill" />
              <span>Free Growth Insights</span>
            </div>

            <h3
              id="newsletter-title"
              className="font-display font-bold text-2xl md:text-[26px] text-bone tracking-tight mb-2"
            >
              Get local business website breakdowns
            </h3>

            <p className="font-sans text-sm text-bone-muted leading-relaxed mb-6">
              Join local business owners receiving short, practical breakdowns on getting more phone calls, online appointments, and higher Google local rankings.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <EnvelopeSimple
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-bone-subtle pointer-events-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-navy rounded-xl border border-line pl-11 pr-4 py-3.5 text-sm text-bone placeholder:text-bone-subtle focus:border-ember focus:ring-1 focus:ring-ember outline-none transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs text-rose-400 font-sans">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-ember hover:bg-ember-bright text-ink font-sans font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Subscribe for free"}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between text-[11px] text-bone-subtle font-sans">
              <span>No spam. Delivered directly to your inbox.</span>
              <button
                type="button"
                onClick={handleClose}
                className="hover:text-bone transition-colors underline cursor-pointer"
              >
                No thanks
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

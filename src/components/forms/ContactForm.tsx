import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { WarningCircle, CheckCircle } from "@phosphor-icons/react";
import {
  contactSchema,
  BUSINESS_TYPES,
  BUDGET_OPTIONS,
} from "../../lib/contactSchema.ts";
import { CONTACT_EMAIL } from "../../config/site.ts";
import { Button } from "../ui/Button.tsx";

interface FormValues {
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  website: string;
  budget: string;
  message: string;
  company_url: string;
}

export const ContactForm: React.FC = () => {
  const location = useLocation();
  const startedAtRef = useRef<number>(Date.now());
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    businessName: "",
    businessType: "",
    website: "",
    budget: "",
    message: "",
    company_url: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [liveStatus, setLiveStatus] = useState("");

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (isSuccess && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [isSuccess]);

  const validateField = (field: keyof FormValues, val: string) => {
    const testData = { ...values, [field]: val };
    const result = contactSchema.safeParse(testData);
    if (!result.success) {
      const fieldError = result.error.issues.find(
        (issue) => issue.path[0] === field
      );
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [field]: fieldError.message }));
        return false;
      }
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name as keyof FormValues, value);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof FormValues, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate entire form with zod
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as string;
        if (!newErrors[fieldName]) {
          newErrors[fieldName] = err.message;
        }
      });
      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        businessName: true,
        businessType: true,
        website: true,
        budget: true,
        message: true,
      });

      setLiveStatus("Please fix the highlighted fields.");

      // Focus first invalid field
      const firstInvalidField = Object.keys(newErrors)[0];
      if (firstInvalidField && formRef.current) {
        const input = formRef.current.querySelector<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >(`[name="${firstInvalidField}"]`);
        input?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setLiveStatus("Sending your message...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          startedAt: startedAtRef.current,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setIsSuccess(true);
        setLiveStatus(`Thanks, ${values.name.split(" ")[0]}. Your message is in.`);
      } else if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setLiveStatus("Please fix the highlighted fields.");
      } else {
        setServerError(
          `Something went wrong and your message didn't send. Please try again, or email me at ${CONTACT_EMAIL}.`
        );
        setLiveStatus("Something went wrong and your message didn't send.");
      }
    } catch {
      setServerError(
        `Something went wrong and your message didn't send. Please try again, or email me at ${CONTACT_EMAIL}.`
      );
      setLiveStatus("Something went wrong and your message didn't send.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstName = values.name.trim().split(" ")[0] || "there";

  const handleSuccessBookingClick = () => {
    if (location.pathname === "/book") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[460px] flex flex-col items-center justify-center text-center p-6 md:p-10">
        <CheckCircle size={40} className="text-ember mb-4" weight="fill" />
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="font-display font-bold text-2xl md:text-3xl text-bone tracking-tight mb-3 outline-none"
        >
          Thanks, {firstName}. Your message is in.
        </h3>
        <p className="font-sans text-base md:text-lg text-bone-muted leading-relaxed max-w-[48ch] mb-8">
          I'll reply to {values.email}. If you'd rather talk now, book a 15-minute call.
        </p>

        {location.pathname === "/book" ? (
          <Button variant="primary" onClick={handleSuccessBookingClick}>
            Book a call
          </Button>
        ) : (
          <Button to="/book" variant="primary">
            Book a call
          </Button>
        )}

        <div aria-live="polite" className="sr-only">
          {liveStatus}
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 text-left"
    >
      {/* Honeypot field for anti-spam */}
      <div
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label htmlFor="company_url">Do not fill this</label>
        <input
          id="company_url"
          name="company_url"
          type="text"
          value={values.company_url}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block font-mono text-[13px] font-medium text-bone tracking-[0.02em] mb-2"
          >
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            disabled={isSubmitting}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full h-[52px] bg-navy-raised rounded-[12px] px-4 font-sans text-[17px] text-bone border transition-colors outline-none focus:border-ember ${
              errors.name ? "border-error-text" : "border-input-border"
            }`}
          />
          {errors.name && (
            <p
              id="name-error"
              className="flex items-center gap-1.5 mt-1.5 font-sans text-sm text-error-text"
            >
              <WarningCircle size={16} className="shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-mono text-[13px] font-medium text-bone tracking-[0.02em] mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full h-[52px] bg-navy-raised rounded-[12px] px-4 font-sans text-[17px] text-bone border transition-colors outline-none focus:border-ember ${
              errors.email ? "border-error-text" : "border-input-border"
            }`}
          />
          {errors.email && (
            <p
              id="email-error"
              className="flex items-center gap-1.5 mt-1.5 font-sans text-sm text-error-text"
            >
              <WarningCircle size={16} className="shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Business name and Business type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="businessName"
            className="block font-mono text-[13px] font-medium text-bone tracking-[0.02em] mb-2"
          >
            Business name
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            disabled={isSubmitting}
            value={values.businessName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.businessName}
            aria-describedby={
              errors.businessName ? "businessName-error" : undefined
            }
            className={`w-full h-[52px] bg-navy-raised rounded-[12px] px-4 font-sans text-[17px] text-bone border transition-colors outline-none focus:border-ember ${
              errors.businessName ? "border-error-text" : "border-input-border"
            }`}
          />
          {errors.businessName && (
            <p
              id="businessName-error"
              className="flex items-center gap-1.5 mt-1.5 font-sans text-sm text-error-text"
            >
              <WarningCircle size={16} className="shrink-0" />
              <span>{errors.businessName}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="businessType"
            className="block font-mono text-[13px] font-medium text-bone tracking-[0.02em] mb-2"
          >
            Business type
          </label>
          <select
            id="businessType"
            name="businessType"
            disabled={isSubmitting}
            value={values.businessType}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.businessType}
            aria-describedby={
              errors.businessType ? "businessType-error" : undefined
            }
            className={`w-full h-[52px] bg-navy-raised rounded-[12px] px-4 font-sans text-[17px] text-bone border transition-colors outline-none focus:border-ember cursor-pointer ${
              errors.businessType ? "border-error-text" : "border-input-border"
            }`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {BUSINESS_TYPES.map((bt) => (
              <option key={bt} value={bt} className="bg-navy text-bone">
                {bt}
              </option>
            ))}
          </select>
          {errors.businessType && (
            <p
              id="businessType-error"
              className="flex items-center gap-1.5 mt-1.5 font-sans text-sm text-error-text"
            >
              <WarningCircle size={16} className="shrink-0" />
              <span>{errors.businessType}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Current website and Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="website"
            className="block font-mono text-[13px] font-medium text-bone tracking-[0.02em] mb-2"
          >
            Current website (optional)
          </label>
          <input
            id="website"
            name="website"
            type="text"
            inputMode="url"
            placeholder="yourbusiness.com"
            disabled={isSubmitting}
            value={values.website}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.website}
            aria-describedby={errors.website ? "website-error" : undefined}
            className={`w-full h-[52px] bg-navy-raised rounded-[12px] px-4 font-sans text-[17px] text-bone placeholder:text-bone-subtle/60 border transition-colors outline-none focus:border-ember ${
              errors.website ? "border-error-text" : "border-input-border"
            }`}
          />
          {errors.website && (
            <p
              id="website-error"
              className="flex items-center gap-1.5 mt-1.5 font-sans text-sm text-error-text"
            >
              <WarningCircle size={16} className="shrink-0" />
              <span>{errors.website}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block font-mono text-[13px] font-medium text-bone tracking-[0.02em] mb-2"
          >
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            disabled={isSubmitting}
            value={values.budget}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.budget}
            aria-describedby={errors.budget ? "budget-error" : undefined}
            className={`w-full h-[52px] bg-navy-raised rounded-[12px] px-4 font-sans text-[17px] text-bone border transition-colors outline-none focus:border-ember cursor-pointer ${
              errors.budget ? "border-error-text" : "border-input-border"
            }`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {BUDGET_OPTIONS.map((bo) => (
              <option key={bo} value={bo} className="bg-navy text-bone">
                {bo}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p
              id="budget-error"
              className="flex items-center gap-1.5 mt-1.5 font-sans text-sm text-error-text"
            >
              <WarningCircle size={16} className="shrink-0" />
              <span>{errors.budget}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 4: Message */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="message"
            className="block font-mono text-[13px] font-medium text-bone tracking-[0.02em]"
          >
            What do you need?
          </label>
          <span className="font-mono text-xs text-bone-subtle">
            {values.message.length} / 2000
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          rows={6}
          disabled={isSubmitting}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full bg-navy-raised rounded-[12px] p-4 font-sans text-[17px] text-bone border transition-colors outline-none focus:border-ember resize-y ${
            errors.message ? "border-error-text" : "border-input-border"
          }`}
        />
        {errors.message && (
          <p
            id="message-error"
            className="flex items-center gap-1.5 mt-1.5 font-sans text-sm text-error-text"
          >
            <WarningCircle size={16} className="shrink-0" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Server Error Notice */}
      {serverError && (
        <div className="p-4 rounded-[12px] bg-ember-soft border border-error-text text-error-text text-sm">
          Something went wrong and your message didn't send. Please try again, or email me at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline underline-offset-4 font-medium"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          Send message
        </Button>
      </div>

      {/* Privacy note */}
      <p className="font-sans text-sm text-bone-subtle">
        By sending this form you agree to the{" "}
        <Link
          to="/privacy"
          className="text-ember underline underline-offset-4 hover:underline"
        >
          privacy notice
        </Link>
        .
      </p>

      {/* Accessible Live Region */}
      <div aria-live="polite" className="sr-only">
        {liveStatus}
      </div>
    </form>
  );
};

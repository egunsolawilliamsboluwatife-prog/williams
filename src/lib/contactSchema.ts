import { z } from "zod";

export const BUSINESS_TYPES = [
  "Event rentals & venues",
  "Barber or salon",
  "Accounting, legal or professional services",
  "Home cleaning",
  "Contractor or home services",
  "Restaurant or food",
  "Health or wellness",
  "Retail shop",
  "Other",
] as const;

export const BUDGET_OPTIONS = [
  "Launch (starting at $1,000)",
  "Growth (starting at $1,500)",
  "Signature (starting at $2,300)",
  "Not sure yet",
] as const;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const domainOrUrlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please enter your name."),
  email: z
    .string()
    .trim()
    .max(254, "Please enter a valid email address.")
    .regex(emailRegex, "Please enter a valid email address."),
  businessName: z
    .string()
    .trim()
    .min(2, "Please enter your business name.")
    .max(120, "Please enter your business name."),
  businessType: z
    .enum(BUSINESS_TYPES, {
      error: "Please choose a business type.",
    }),
  website: z
    .string()
    .trim()
    .max(200, "Please enter a valid web address, or leave it blank.")
    .refine(
      (val) => {
        if (!val || val.length === 0) return true;
        return domainOrUrlRegex.test(val);
      },
      { message: "Please enter a valid web address, or leave it blank." }
    )
    .optional()
    .default(""),
  budget: z
    .enum(BUDGET_OPTIONS, {
      error: "Please choose a budget.",
    }),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters so I know what you need.")
    .max(2000, "Please keep your message under 2000 characters."),
  company_url: z.string().optional().default(""),
  startedAt: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

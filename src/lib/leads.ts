export interface ContactLead {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  business?: string;
  budget?: string;
  message: string;
  deliveredToWeb3Forms?: boolean;
}

export interface NewsletterLead {
  id: string;
  createdAt: string;
  email: string;
  deliveredToWeb3Forms?: boolean;
}

const CONTACT_LEADS_KEY = "williams_contact_leads_v1";
const NEWSLETTER_LEADS_KEY = "williams_newsletter_leads_v1";

export function saveContactLead(data: Omit<ContactLead, "id" | "createdAt">): ContactLead {
  const existing = getContactLeads();
  const newLead: ContactLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    ...data,
  };

  const updated = [newLead, ...existing];
  try {
    localStorage.setItem(CONTACT_LEADS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Storage warning:", err);
  }
  return newLead;
}

export function getContactLeads(): ContactLead[] {
  try {
    const raw = localStorage.getItem(CONTACT_LEADS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveNewsletterLead(email: string, deliveredToWeb3Forms = false): NewsletterLead {
  const existing = getNewsletterLeads();
  // Prevent exact duplicate email on the same day
  const existingIndex = existing.findIndex((l) => l.email.toLowerCase() === email.toLowerCase());
  if (existingIndex >= 0) {
    return existing[existingIndex];
  }

  const newSub: NewsletterLead = {
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    email,
    deliveredToWeb3Forms,
  };

  const updated = [newSub, ...existing];
  try {
    localStorage.setItem(NEWSLETTER_LEADS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Storage warning:", err);
  }
  return newSub;
}

export function getNewsletterLeads(): NewsletterLead[] {
  try {
    const raw = localStorage.getItem(NEWSLETTER_LEADS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function clearAllLeads(): void {
  try {
    localStorage.removeItem(CONTACT_LEADS_KEY);
    localStorage.removeItem(NEWSLETTER_LEADS_KEY);
  } catch {}
}

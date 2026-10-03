import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  EnvelopeSimple,
  User,
  Buildings,
  CurrencyDollar,
  Clock,
  ArrowSquareOut,
  Copy,
  Check,
  Trash,
  DownloadSimple,
  ShieldCheck,
  Key,
} from "@phosphor-icons/react";
import { Seo } from "../components/ui/Seo.tsx";
import {
  getContactLeads,
  getNewsletterLeads,
  clearAllLeads,
  ContactLead,
  NewsletterLead,
} from "../lib/leads.ts";
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from "../config/site.ts";

export const InboxPage: React.FC = () => {
  const [contactLeads, setContactLeads] = useState<ContactLead[]>([]);
  const [newsletterLeads, setNewsletterLeads] = useState<NewsletterLead[]>([]);
  const [activeTab, setActiveTab] = useState<"inquiries" | "newsletter">("inquiries");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadData = () => {
    setContactLeads(getContactLeads());
    setNewsletterLeads(getNewsletterLeads());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear your local leads history?")) {
      clearAllLeads();
      loadData();
    }
  };

  const exportCsv = () => {
    if (activeTab === "inquiries") {
      const headers = "Date,Name,Email,Business,Budget,Message\n";
      const rows = contactLeads
        .map(
          (l) =>
            `"${l.createdAt}","${l.name}","${l.email}","${l.business || ""}","${l.budget || ""}","${(l.message || "").replace(/"/g, '""')}"`
        )
        .join("\n");
      const blob = new Blob([headers + rows], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `williams_inquiries_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    } else {
      const headers = "Date,Email\n";
      const rows = newsletterLeads
        .map((l) => `"${l.createdAt}","${l.email}"`)
        .join("\n");
      const blob = new Blob([headers + rows], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `williams_newsletter_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    }
  };

  return (
    <>
      <Seo
        title="Admin Leads Inbox | Williams"
        description="Private lead and inquiry dashboard for Egunsola Williams."
        path="/inbox"
      />

      <div className="pt-28 md:pt-36 pb-24 max-w-[1100px] mx-auto px-5 md:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-line mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ember/10 border border-ember/20 text-ember text-xs font-mono font-medium mb-3">
              <ShieldCheck size={14} weight="bold" />
              <span>Owner Dashboard</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-bone tracking-tight mb-2">
              Client Inquiries & Leads Inbox
            </h1>
            <p className="font-sans text-sm text-bone-muted">
              Every client submission on the contact page or newsletter popup is saved here so you never miss a lead.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCsv}
              disabled={activeTab === "inquiries" ? contactLeads.length === 0 : newsletterLeads.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy border border-line text-xs font-mono text-bone hover:border-line-strong transition-colors disabled:opacity-40 cursor-pointer"
            >
              <DownloadSimple size={16} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-navy border border-line text-xs font-mono text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Clear Leads"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>

        {/* Web3Forms Integration Status Card */}
        <div className="p-5 md:p-6 rounded-2xl bg-navy/80 border border-line mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${WEB3FORMS_ACCESS_KEY ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-ember/15 text-ember border border-ember/30"}`}>
              <Key size={20} weight="bold" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-semibold text-base text-bone">
                  Gmail Forwarding Status: {WEB3FORMS_ACCESS_KEY ? "Connected" : "Pending Access Key"}
                </h3>
                {WEB3FORMS_ACCESS_KEY ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-ember/15 text-ember border border-ember/20">
                    Local Storage Only
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-bone-muted leading-relaxed">
                {WEB3FORMS_ACCESS_KEY
                  ? `Submissions are delivered directly to ${CONTACT_EMAIL} via Web3Forms.`
                  : `To deliver inquiries straight to ${CONTACT_EMAIL}, enter your email at web3forms.com to get your free key and paste it in src/config/site.ts.`}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Link
              to="/contact"
              className="px-4 py-2 rounded-xl bg-navy-deep border border-line hover:border-line-strong text-xs font-mono text-bone-muted hover:text-bone transition-colors"
            >
              Go to Contact Form
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-line pb-4">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2 rounded-xl font-sans text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${activeTab === "inquiries" ? "bg-ember text-navy font-bold" : "text-bone-muted hover:text-bone"}`}
          >
            <EnvelopeSimple size={16} weight={activeTab === "inquiries" ? "fill" : "regular"} />
            <span>Project Inquiries ({contactLeads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("newsletter")}
            className={`px-4 py-2 rounded-xl font-sans text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${activeTab === "newsletter" ? "bg-ember text-navy font-bold" : "text-bone-muted hover:text-bone"}`}
          >
            <User size={16} weight={activeTab === "newsletter" ? "fill" : "regular"} />
            <span>Newsletter Subscribers ({newsletterLeads.length})</span>
          </button>
        </div>

        {/* Tab 1: Project Inquiries */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            {contactLeads.length === 0 ? (
              <div className="glass rounded-2xl border border-line p-12 text-center">
                <EnvelopeSimple size={42} className="mx-auto text-bone-subtle/50 mb-3" />
                <h3 className="font-display font-semibold text-lg text-bone mb-1">
                  No inquiries received yet
                </h3>
                <p className="font-sans text-xs text-bone-muted max-w-sm mx-auto mb-6">
                  When someone submits the form on the Contact page, their message, budget, and business details will appear right here.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ember text-navy font-sans font-bold text-xs hover:bg-ember-bright transition-colors"
                >
                  Send a test inquiry
                </Link>
              </div>
            ) : (
              contactLeads.map((lead) => {
                const dateStr = new Date(lead.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                });

                const replyMailto = `mailto:${lead.email}?subject=${encodeURIComponent(
                  `Re: Website Project Inquiry - ${lead.business || "Williams"}`
                )}&body=${encodeURIComponent(
                  `Hi ${lead.name},\n\nThank you for reaching out through my website regarding ${lead.business || "your project"}.\n\n`
                )}`;

                const replyGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                  lead.email
                )}&su=${encodeURIComponent(
                  `Re: Website Project Inquiry - ${lead.business || "Williams"}`
                )}&body=${encodeURIComponent(
                  `Hi ${lead.name},\n\nThank you for reaching out through my website regarding ${lead.business || "your project"}.\n\n`
                )}`;

                return (
                  <div
                    key={lead.id}
                    className="glass rounded-2xl border border-line p-6 hover:border-line-strong transition-all space-y-4"
                  >
                    {/* Top Row: Name, Date, Delivered Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-line/60">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-lg text-bone">
                          {lead.name}
                        </span>
                        {lead.business && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-navy text-bone-muted text-xs font-sans border border-line">
                            <Buildings size={13} />
                            <span>{lead.business}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5 text-xs font-mono text-bone-subtle">
                        <Clock size={13} />
                        <span>{dateStr}</span>
                      </div>
                    </div>

                    {/* Metadata: Email & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                      <div className="flex items-center gap-2 text-bone-muted">
                        <span className="text-bone-subtle font-mono">Email:</span>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-ember hover:underline font-mono"
                        >
                          {lead.email}
                        </a>
                        <button
                          onClick={() => handleCopy(lead.email, lead.id)}
                          className="text-bone-subtle hover:text-bone p-1 rounded transition-colors"
                          title="Copy email"
                        >
                          {copiedId === lead.id ? (
                            <Check size={13} className="text-emerald-400" />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </div>

                      {lead.budget && (
                        <div className="flex items-center gap-2 text-bone-muted">
                          <span className="text-bone-subtle font-mono">Budget:</span>
                          <span className="text-bone font-medium inline-flex items-center gap-1">
                            <CurrencyDollar size={14} className="text-emerald-400" />
                            <span>{lead.budget}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Message Box */}
                    <div className="p-4 rounded-xl bg-navy-deep border border-line/80 font-sans text-sm text-bone leading-relaxed whitespace-pre-wrap">
                      {lead.message}
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      <a
                        href={replyGmail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-ember text-navy font-sans font-bold text-xs hover:bg-ember-bright transition-colors shadow-sm"
                      >
                        <ArrowSquareOut size={14} weight="bold" />
                        <span>Reply in Gmail</span>
                      </a>
                      <a
                        href={replyMailto}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-navy border border-line text-bone font-sans font-medium text-xs hover:border-line-strong transition-colors"
                      >
                        <EnvelopeSimple size={14} />
                        <span>Default Mail</span>
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Newsletter Subscribers */}
        {activeTab === "newsletter" && (
          <div className="glass rounded-2xl border border-line overflow-hidden">
            {newsletterLeads.length === 0 ? (
              <div className="p-12 text-center">
                <User size={42} className="mx-auto text-bone-subtle/50 mb-3" />
                <h3 className="font-display font-semibold text-lg text-bone mb-1">
                  No newsletter subscribers yet
                </h3>
                <p className="font-sans text-xs text-bone-muted max-w-sm mx-auto">
                  When visitors subscribe via the popup or footer newsletter form, their email addresses will be collected here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-line">
                <div className="p-4 bg-navy/60 grid grid-cols-12 text-xs font-mono text-bone-subtle uppercase tracking-wider">
                  <div className="col-span-7">Email Address</div>
                  <div className="col-span-5 text-right">Joined Date</div>
                </div>
                {newsletterLeads.map((sub) => {
                  const dateStr = new Date(sub.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  });
                  return (
                    <div
                      key={sub.id}
                      className="p-4 grid grid-cols-12 items-center hover:bg-navy/30 transition-colors"
                    >
                      <div className="col-span-7 flex items-center gap-2">
                        <span className="font-mono text-sm text-bone">{sub.email}</span>
                        <button
                          onClick={() => handleCopy(sub.email, sub.id)}
                          className="text-bone-subtle hover:text-bone p-1 rounded transition-colors"
                          title="Copy email"
                        >
                          {copiedId === sub.id ? (
                            <Check size={13} className="text-emerald-400" />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </div>
                      <div className="col-span-5 text-right font-mono text-xs text-bone-muted">
                        {dateStr}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InboxPage;

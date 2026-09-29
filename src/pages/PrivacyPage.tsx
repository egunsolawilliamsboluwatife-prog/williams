import React from "react";
import { Seo } from "../components/ui/Seo.tsx";
import { PRIVACY_LAST_UPDATED, CONTACT_EMAIL } from "../config/site.ts";

export const PrivacyPage: React.FC = () => {
  const sections = [
    {
      title: "What this covers",
      content:
        "This notice explains what happens to the information you share on this website through the contact form and the booking calendar.",
    },
    {
      title: "The contact form",
      content:
        "When you send the form, I receive your name, email, business name, business type, website (if you add one), budget and message. The form is delivered to my inbox by Resend, an email service. I use this information only to reply to you and to talk about your project. I don't sell it or share it for marketing.",
    },
    {
      title: "Booking a call",
      content:
        "The booking calendar is provided by Google Calendar. When you book, Google collects the details you enter and sends you a confirmation with a Google Meet link. Google's own privacy policy applies to that information.",
    },
    {
      title: "Hosting",
      content:
        "This site is hosted on Vercel, which keeps standard technical logs, such as IP addresses and browser types, to run and protect the site.",
    },
    {
      title: "Cookies and tracking",
      content: "This site doesn't use analytics or advertising cookies.",
    },
    {
      title: "Your choices",
      content: (
        <>
          To see, correct or delete the information you've sent me, email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ember underline underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </>
      ),
    },
    {
      title: "Contact",
      content: (
        <>
          Questions about this notice:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ember underline underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <>
      <Seo
        title="Privacy notice | Williams"
        description="How Williams handles the information you send through the contact form and the booking calendar."
        path="/privacy"
      />

      <div className="pt-28 md:pt-36 pb-24">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[72ch]">
            <h1 className="font-display font-bold text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] text-bone tracking-tight mb-3 opsz-96">
              Privacy notice
            </h1>

            {PRIVACY_LAST_UPDATED ? (
              <p className="font-sans text-sm text-bone-subtle mb-12">
                Last updated: {PRIVACY_LAST_UPDATED}
              </p>
            ) : (
              <p className="font-sans text-sm text-bone-subtle mb-12">
                Last updated: Pending publication
              </p>
            )}

            <div className="space-y-10">
              {sections.map((sec, idx) => (
                <div key={idx}>
                  <h2 className="font-display font-semibold text-2xl text-bone tracking-tight mb-3">
                    {sec.title}
                  </h2>
                  <p className="font-sans text-lg text-bone-muted leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;

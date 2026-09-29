# Williams | Web Designer & Builder Portfolio

A production-grade, conversion-focused multipage portfolio website for US local businesses. Built with React 19, TypeScript, Tailwind CSS v4, Motion, Three.js / React Three Fiber, and Vercel serverless functions.

---

## C1. Set up the booking calendar (Williams)
1. On a computer, open Google Calendar and click **Create > Appointment schedule**.
2. Title: "15-minute call with Williams". Appointment duration: **15 minutes**.
3. General availability: turn on **every day of the week** and set each day to the widest range Google Calendar allows (the whole day), so the schedule really is open 24/7. Set the minimum booking notice as low as you're comfortable with.
4. Location / conferencing: choose **Google Meet video conferencing**, so every booking gets its own Meet link automatically.
5. Save. Open the schedule, click **Share**, choose **Website embed > Inline schedule**, and copy the URL inside `src="..."` from the code shown. It looks like `https://calendar.google.com/calendar/appointments/schedules/...?gv=true`.
6. Paste that URL into `BOOKING_URL` in `src/config/site.ts`.
7. Visitors see open times in their own time zone automatically.

---

## C2. Set up Resend (Williams)
1. Create a Resend account. Go to **Domains > Add domain** and add the domain you'll send from (for example the domain you connect to this site). Add the DNS records Resend shows at your domain registrar and wait until the domain shows **Verified**.
2. Go to **API Keys > Create API key** (sending access). Copy it when shown. This is `RESEND_API_KEY`.
3. Pick a sender on the verified domain, for example `Williams Website <hello@yourdomain.com>`. That whole string is `RESEND_FROM_EMAIL`.
4. Until a domain is verified, Resend only sends from its test address to the email that owns the Resend account, so verify the domain before launch.

---

## C3. Deploy checklist
- [ ] In AI Studio, check that every route renders in the preview. (The contact form showing its error state in the preview is expected; the function only runs on Vercel.)
- [ ] In `src/config/site.ts`, set `BOOKING_URL`, `SITE_URL` (start with the `https://<project>.vercel.app` URL) and `PRIVACY_LAST_UPDATED`.
- [ ] Push to GitHub: click the GitHub icon in AI Studio, create a new **private** repository (for example `williams-portfolio`) and push. Confirm `.env.example` is in the repo and no `.env` file is.
- [ ] In Vercel: **Add New > Project**, import the repo. Framework preset **Vite**, install command `npm install`, build command `npm run build`, output directory `dist`.
- [ ] Vercel **Settings > Environment Variables**: add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` for Production (and Preview if you want the form to work on preview links). Redeploy after adding them.
- [ ] Open the deployed site and run the C4 acceptance checklist.
- [ ] Domain, when you have one: Vercel **Settings > Domains > Add**, follow the DNS steps and wait for the certificate. Then set `SITE_URL` to `https://yourdomain.com`, push, and let Vercel redeploy. Check that `/sitemap.xml` and the `og:image` URL use the domain.
- [ ] Optional: submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

---

## C4. Acceptance checklist (binary; test on the live Vercel URL)

### Routes and build
- [ ] `npm run build` succeeds with zero TypeScript errors.
- [ ] The build stops with the A11 message when `BOOKING_URL`, `SITE_URL` or `PRIVACY_LAST_UPDATED` is empty.
- [ ] Each route loads when typed into the address bar and refreshed: `/`, `/work`, `/work/mimis-party-palace`, `/work/elite-barber-adrian-duany`, `/work/mid-ohio-cpa`, `/work/quality-affordable-cleaning`, `/services`, `/about`, `/book`, `/privacy`.
- [ ] `/work/does-not-exist` and `/anything` show the 404 page, which has `noindex`.
- [ ] `/work/mid-ohio-cpa-desktop.webp` returns the image, not the app.
- [ ] `/sitemap.xml` lists exactly the 10 routes with absolute URLs; `/robots.txt` points to it.
- [ ] The Network tab shows no requests to cdn.tailwindcss.com, fonts.googleapis.com, esm.sh, unpkg, jsdelivr, githack, Unsplash, Pexels or picsum.

### Brand and content
- [ ] Only the hex values in A4.1 (plus the device-body `#1B2233`) appear in the CSS.
- [ ] Headings use Bricolage Grotesque, body text uses Geist, prices use Geist Mono.
- [ ] A text search of every rendered page finds no em dash and no en dash.
- [ ] No numbers appear other than those allowed in A14.
- [ ] No testimonials, reviews, ratings, logos, awards, timelines or locations for Williams appear anywhere.
- [ ] Every booking button reads exactly "Book a call".
- [ ] The three social links open the right profiles in a new tab; the email links open a message to `egunsolawilliams1910@gmail.com`.
- [ ] Each case study shows only the B-Case copy, links to the correct live URL, and shows "Shown with the owner's permission."

### 3D and motion
- [ ] Desktop (1440 px, mouse): the hero shows the beveled navy W with ember rim light behind the portrait, floating gently and tilting toward the pointer.
- [ ] `/work` on desktop: the ring rotates by itself, pauses on hover, drags with inertia, and clicking a laptop or phone opens that case study. Every device screen shows the right client screenshot.
- [ ] Keyboard on `/work`: Tab reaches the ring; ArrowRight/ArrowLeft move one project; Enter opens it; the live announcement updates; the Previous/Next buttons work.
- [ ] On a 390 px phone, and on any device with reduced motion on: no canvas renders and no three.js chunk downloads (Network tab); the SVG W poster and the scroll-snap gallery show instead.
- [ ] With the OS "Reduce motion" setting on: no entrance animations, the sticky stack is a plain list, the availability dot doesn't pulse.
- [ ] Scrolling is native everywhere, and the nav is visible from the first frame.

### Booking and form
- [ ] `/book` shows the Google scheduler in the bone frame; a test booking creates an event with a Google Meet link and sends a confirmation email.
- [ ] "Open booking page" opens the same schedule in a new tab.
- [ ] Submitting the form empty shows each error under its field and focuses the first one.
- [ ] A valid submission shows "Sending", then the success panel, and the email arrives at `egunsolawilliams1910@gmail.com` with the visitor's address as Reply-To.
- [ ] On a preview deployment without `RESEND_API_KEY`, submitting shows the error panel with the mailto link and keeps the typed values.
- [ ] Filling the hidden honeypot (in dev tools) returns success and sends no email.

### Accessibility and performance
- [ ] Keyboard only: every link, button, field, FAQ row and the ring can be reached, each with a visible ember focus ring; the skip link works.
- [ ] Lighthouse and axe report no contrast or labeling failures.
- [ ] `document.documentElement.scrollWidth === window.innerWidth` at 360, 390, 768, 1024 and 1440 px on every page.
- [ ] The nav is one line at every width from 360 px; the hero H1 is at most 3 lines; hero CTAs are visible without scrolling at 390x844 and 1440x900.
- [ ] Lighthouse mobile on `/`, `/work` and `/book`: LCP under 2.5 s, CLS under 0.1.
- [ ] A link-preview check of the home URL shows the title, description and warm-grey portrait.

---

## C5. Values you must paste (nothing else is left open)

| Value | Where | What it is |
|---|---|---|
| `BOOKING_URL` | `src/config/site.ts` | Your Google Calendar appointment schedule inline-embed URL from C1 step 5 (ends in `?gv=true`). |
| `RESEND_API_KEY` | Vercel environment variables | Your Resend API key from C2 step 2. |
| Verified Resend sender domain | Resend dashboard + your DNS | The domain you verify in C2 step 1. The form can't email you until it's verified. |
| `RESEND_FROM_EMAIL` | Vercel environment variables | A sender on that verified domain, for example `Williams Website <hello@yourdomain.com>`. |
| `SITE_URL` | `src/config/site.ts` | Your live origin with no trailing slash: the vercel.app URL first, your domain later. |
| `PRIVACY_LAST_UPDATED` | `src/config/site.ts` | The date you publish the privacy notice. |
| Domain (optional) | Vercel Domains | Your custom domain, if you buy one. |
| FAQ answers (optional) | `src/content/faq.ts`, `faqPending` | Timeline, payments, revisions, ownership, no care plan, cancellation, what a small edit is. They stay hidden until you write them. |


r

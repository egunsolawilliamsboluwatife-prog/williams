// Google Calendar appointment schedule links
export const GOOGLE_MEET_URL: string = "https://calendar.app.google/LFHfK442HsJc5v1i7";
export const GOOGLE_MEET_EMBED_URL: string =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0SeC7SoPPlcPwiC68-ysY9Z7a361_gCPGVbn5OCEdOu6V0Kj79QhSUzB1ueUr7bapQFf1Ie-82?gv=true";

// Backward compatibility alias for existing code
export const BOOKING_URL: string = GOOGLE_MEET_URL;
export const BOOKING_EMBED_URL: string = GOOGLE_MEET_EMBED_URL;

// Your live site origin, no trailing slash. Set in Vercel or leave empty for relative links.
export const SITE_URL: string = "";

// Date shown on the privacy page
export const PRIVACY_LAST_UPDATED: string = "September 30, 2026";

export const CONTACT_EMAIL = "williams.the.tech@gmail.com";
export const WEB3FORMS_ACCESS_KEY: string =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) ||
  (typeof process !== "undefined" && process.env && process.env.VITE_WEB3FORMS_ACCESS_KEY) ||
  "fcc66b34-57bd-4782-b094-d6939177554d";

// Ambient Hero Video Background configuration
export const HERO_VIDEO_SRC: string = "/videos/hero-background.mp4";
export const HERO_VIDEO_POSTER: string = "/videos/hero-background-poster.jpg";

export const SOCIALS = {
  facebook: "https://web.facebook.com/profile.php?id=61594974237916",
  instagram: "https://www.instagram.com/websitesbywilliam/",
  tiktok: "https://www.tiktok.com/@website.by.williams",
} as const;

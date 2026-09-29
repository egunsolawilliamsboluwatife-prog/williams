import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, Plugin } from "vite";
import {
  BOOKING_URL,
  SITE_URL,
  PRIVACY_LAST_UPDATED,
} from "./src/config/site.ts";

function siteConfigPlugin(command: "build" | "serve"): Plugin {
  return {
    name: "site-config-plugin",
    buildStart() {
      if (command === "build") {
        if (!SITE_URL) {
          console.warn(
            "[site-config-plugin] SITE_URL is empty in src/config/site.ts. Defaulting to relative URLs for assets and canonical tags."
          );
        }
      }
    },
    transformIndexHtml(html: string) {
      const url = SITE_URL ? SITE_URL.replace(/\/$/, "") : "";
      return html.replace(/%SITE_URL%/g, url);
    },
    generateBundle() {
      if (command === "build") {
        const origin = (SITE_URL || "https://williams-portfolio.vercel.app").replace(
          /\/$/,
          ""
        );

        const routes = [
          "/",
          "/work",
          "/work/mimis-party-palace",
          "/work/elite-barber-adrian-duany",
          "/work/mid-ohio-cpa",
          "/work/quality-affordable-cleaning",
          "/services",
          "/about",
          "/book",
          "/privacy",
        ];

        const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${origin}${r}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

        const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${origin}/sitemap.xml
`;

        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: sitemapXml,
        });

        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: robotsTxt,
        });
      }
    },
  };
}

export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tailwindcss(), siteConfigPlugin(command)],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});

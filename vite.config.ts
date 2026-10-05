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

function devApiPlugin(): Plugin {
  return {
    name: "dev-api-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (
          req.method === "POST" &&
          (req.url === "/api/contact" || req.url === "/api/newsletter")
        ) {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            const key = process.env.WEB3FORMS_ACCESS_KEY || process.env.VITE_WEB3FORMS_ACCESS_KEY;
            let forwarded = false;
            if (key && key.trim() !== "") {
              try {
                const parsed = JSON.parse(body || "{}");
                const isNewsletter = req.url === "/api/newsletter";
                const payload = isNewsletter
                  ? {
                      access_key: key.trim(),
                      subject: `[New Newsletter Subscriber] ${parsed.email}`,
                      email: parsed.email,
                      from_name: "Williams Portfolio Newsletter",
                      message: `New subscriber: ${parsed.email}`,
                    }
                  : {
                      access_key: key.trim(),
                      subject: `[New Website Lead] ${parsed.name || "Client"} - ${parsed.businessName || parsed.business || "Local Business"}`,
                      from_name: parsed.name,
                      email: parsed.email,
                      replyto: parsed.email,
                      business: parsed.businessName || parsed.business,
                      budget: parsed.budget,
                      message: parsed.message,
                    };

                const web3Res = await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", Accept: "application/json" },
                  body: JSON.stringify(payload),
                });
                const web3Data = await web3Res.json().catch(() => ({}));
                forwarded = web3Data.success || web3Res.ok;
                console.log(`[Dev API Handler] Forwarded ${req.url} to Web3Forms:`, forwarded ? "SUCCESS" : web3Data);
              } catch (err) {
                console.warn("[Dev API Handler] Web3Forms forward error:", err);
              }
            } else {
              console.log(`[Dev API Handler] Received ${req.url} (no Web3Forms key set in dev env):`, body);
            }

            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, devMode: true, forwarded }));
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tailwindcss(), siteConfigPlugin(command), devApiPlugin()],
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

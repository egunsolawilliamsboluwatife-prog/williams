// Ensure window.fetch has both getter and setter in restrictive or polyfilled environments
if (typeof window !== "undefined") {
  try {
    let _nativeFetch = window.fetch;
    Object.defineProperty(window, "fetch", {
      get() {
        return _nativeFetch;
      },
      set(fn) {
        _nativeFetch = fn;
      },
      configurable: true,
      enumerable: true,
    });
  } catch {
    // Ignore
  }

  // Handle Vite stale chunk dynamic import failures when a new deployment occurs
  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    const hasReloaded = sessionStorage.getItem("vite_preload_retry") === "true";
    if (!hasReloaded) {
      sessionStorage.setItem("vite_preload_retry", "true");
      window.location.reload();
    }
  });
}

import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

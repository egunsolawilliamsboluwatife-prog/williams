import React, { lazy, Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router";
import { MotionConfig } from "motion/react";
import { ArrowClockwise } from "@phosphor-icons/react";
import { SiteLayout } from "./components/layout/SiteLayout.tsx";

/**
 * Enhanced lazy loader that detects stale deployment chunks (e.g. 404 on WorkPage-[hash].js)
 * and automatically triggers a clean page reload so the client grabs the fresh bundle.
 */
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    const hasRetried = sessionStorage.getItem("app_chunk_retry") === "true";

    try {
      const module = await factory();
      sessionStorage.removeItem("app_chunk_retry");
      return module;
    } catch (err: any) {
      const errorMsg = String(err?.message || "");
      const isChunkError =
        errorMsg.includes("Failed to fetch dynamically imported module") ||
        errorMsg.includes("Importing a module script failed") ||
        err?.name === "ChunkLoadError";

      if (isChunkError && !hasRetried) {
        sessionStorage.setItem("app_chunk_retry", "true");
        window.location.reload();
        return new Promise(() => {}); // Pause mounting while browser reloads
      }

      throw err;
    }
  });
}

const HomePage = lazyWithRetry(() => import("./pages/HomePage.tsx"));
const WorkPage = lazyWithRetry(() => import("./pages/WorkPage.tsx"));
const CaseStudyPage = lazyWithRetry(() => import("./pages/CaseStudyPage.tsx"));
const ServicesPage = lazyWithRetry(() => import("./pages/ServicesPage.tsx"));
const AboutPage = lazyWithRetry(() => import("./pages/AboutPage.tsx"));
const BookPage = lazyWithRetry(() => import("./pages/BookPage.tsx"));
const ContactPage = lazyWithRetry(() => import("./pages/ContactPage.tsx"));
const PrivacyPage = lazyWithRetry(() => import("./pages/PrivacyPage.tsx"));
const NotFoundPage = lazyWithRetry(() => import("./pages/NotFoundPage.tsx"));

/**
 * Fallback UI for router errors with auto-reload for deployment chunk misses
 */
function RouteErrorBoundary() {
  const error = useRouteError() as any;
  const errorMsg = String(error?.message || error?.statusText || "");
  const isChunkError =
    errorMsg.includes("Failed to fetch dynamically imported module") ||
    errorMsg.includes("Importing a module script failed");

  useEffect(() => {
    if (isChunkError) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isChunkError]);

  return (
    <div className="min-h-screen bg-ink text-bone flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-ember/15 border border-ember/30 text-ember flex items-center justify-center mb-5">
        <ArrowClockwise size={32} className={isChunkError ? "animate-spin" : ""} />
      </div>
      <h2 className="font-display font-bold text-2xl md:text-3xl text-bone mb-3">
        {isChunkError ? "Updating to the latest version..." : "Page could not be loaded"}
      </h2>
      <p className="font-sans text-sm md:text-base text-bone-muted max-w-md mb-8">
        {isChunkError
          ? "A new version of the website was recently deployed. Refreshing to load the latest content..."
          : errorMsg || "An unexpected error occurred while loading this page."}
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="px-6 py-3 rounded-full bg-ember hover:bg-ember-bright text-navy font-sans font-bold text-sm transition-all shadow-md cursor-pointer"
      >
        Refresh Page
      </button>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={null}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "work",
        element: (
          <Suspense fallback={null}>
            <WorkPage />
          </Suspense>
        ),
      },
      {
        path: "work/:slug",
        element: (
          <Suspense fallback={null}>
            <CaseStudyPage />
          </Suspense>
        ),
      },
      {
        path: "services",
        element: (
          <Suspense fallback={null}>
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={null}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "book",
        element: (
          <Suspense fallback={null}>
            <BookPage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={null}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "privacy",
        element: (
          <Suspense fallback={null}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={null}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}

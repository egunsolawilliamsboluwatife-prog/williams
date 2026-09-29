import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { MotionConfig } from "motion/react";
import { SiteLayout } from "./components/layout/SiteLayout.tsx";

const HomePage = lazy(() => import("./pages/HomePage.tsx"));
const WorkPage = lazy(() => import("./pages/WorkPage.tsx"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage.tsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const BookPage = lazy(() => import("./pages/BookPage.tsx"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage.tsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
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

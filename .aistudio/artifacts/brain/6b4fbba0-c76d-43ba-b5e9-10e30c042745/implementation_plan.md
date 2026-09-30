# Hero Portrait Overhaul & Feature Bento Redesign Plan

Completely remove the letter "W" from the hero section and replace it with a studio portrait of Williams in a luxury architectural card, and redesign the "What you get" feature section from a broken sticky scroll into a bespoke visual Bento grid to eliminate all massive empty voids.

### User Review & Critical Decisions

> [!IMPORTANT]
> This plan directly resolves both critical issues from your latest screenshots:
> 1. The letter "W" and its wireframe outline are completely removed from the hero, replaced with a high-resolution, approachable studio portrait of Williams framed in a modern card with live availability and trust credentials.
> 2. The broken sticky stacking cards with 400px–600px of dead black space are replaced with an expansive, tight Bento feature grid where every single feature has its own dedicated visual mockup/illustration.

- **Confirmed Decision 1 (Hero Image Placement & Removal of "W")**:
  - Remove the 3D W monogram, 2D W poster, and cutout silhouette entirely from the homepage hero.
  - In its place on the right column, introduce a studio portrait card using the rich `williams-navy-bokeh.jpg` photography (which matches the site's navy palette seamlessly).
  - Feature subtle floating trust badges: an "Available for work" pulse indicator, "300+ custom websites delivered", and client rating accent.
- **Confirmed Decision 2 (Feature Section / Empty Spaces Fix)**:
  - Eliminate the `h-[70vh]` empty vertical scroll spacing in `StickyStack.tsx`.
  - Redesign "What you get" into a visual Bento Grid with 5 custom interactive/visual cards:
    1. **Bespoke Design**: Custom wireframe-to-code layout canvas showing responsive grid columns and bespoke styling.
    2. **Motion That Feels Expensive**: Smooth cubic-bezier interactive physics / glow orb with tactile easing visualizer.
    3. **Booking & Quote Forms**: Mini appointment picker preview with 1-click slot selection and instant confirmation.
    4. **Found on Google**: Google Local 3-pack preview card with #1 ranking, 5.0 rating, and verified badge.
    5. **Looked After After Launch**: Real-time server telemetry card showing 99.9% uptime, active SSL, daily backups, and instant support.

---

### 1. Overview & Core Concept

- **Problem Addressed**:
  - The hero had an abstract letter "W" with a dot-matrix wireframe that looked broken and disconnected from Williams.
  - The "What you get" section had massive `70vh` height wrappers causing 500px+ of dead black space around cards during scrolling.
- **Solution**:
  - A world-class portfolio hero matching top tier design engineers: clear headline, strong copy, direct booking CTAs, and a genuine studio portrait of Williams that builds immediate personal rapport and credibility.
  - A feature Bento grid where each service tier benefit is immediately demonstrated with a visual illustration instead of floating text cards separated by voids.

---

### 2. User Experience & Visual Design

- **Homepage Hero**:
  - **Left Column**:
    - Availability pulse dot: `Available for new projects · Q4 2026`
    - H1: `Websites built to win local customers.`
    - Subhead: `I design and build custom, high-converting websites for US businesses — with booking calendars, quote forms, and local SEO built in.`
    - Direct CTAs: `Book a 15-min call` (Primary Ember) and `See the work` (Secondary).
    - Quick trust ticker below CTAs: `300+ websites shipped · 100% bespoke code · No off-the-shelf templates`.
  - **Right Column (The New Portrait Stage)**:
    - Replaces the letter "W" with a studio portrait card (`rounded-[32px] overflow-hidden border border-line bg-navy/80 shadow-[var(--shadow-float)]`).
    - Uses `williams-navy-bokeh.jpg` with rich contrast, subtle ambient backlight glow, and high-DPI clarity.
    - Floating micro-badges:
      - Top right: `15-min video call · Free discovery`
      - Bottom left: `Jackson Williams · Founder & Lead Engineer`
- **Feature Section ("What You Get" Bento Grid)**:
  - 5-card responsive Bento layout (2 large flagship cards + 3 compact feature cards):
    - **Card 1 (Cols 1-7)**: *A site designed for your business* + Visual Canvas with code layers & layout wireframes.
    - **Card 2 (Cols 8-12)**: *Motion that feels expensive* + Dynamic fluid motion curve & glowing physics indicator.
    - **Card 3 (Cols 1-4)**: *Booking & quote forms* + Interactive mini booking calendar widget preview.
    - **Card 4 (Cols 5-8)**: *Found on Google* + Local Google Search card showing #1 rank and 5-star review summary.
    - **Card 5 (Cols 9-12)**: *Looked after after launch* + Live status pill showing 99.9% uptime, SSL secured, and care plan benefits.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Removal of the 3D W Monogram in Hero**:
  - *Trade-off*: Removes the Three.js letter canvas in the hero.
  - *Why*: The user explicitly stated: *"remove the lettter w heading there and put amy picture there"*. A human portrait builds 10x more trust with local business owners than an abstract 3D letter.
- **Decision 2: Bento Grid vs. Sticky Stack**:
  - *Trade-off*: Removes vertical stacking sticky scroll.
  - *Why*: Eliminates all awkward empty scroll gaps (screenshots 2-6) and provides immediate, scannable visual proof for each capability.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                          HomePage.tsx                           │
│                                                                 │
│  ┌───────────────────────────────┐ ┌──────────────────────────┐ │
│  │ Left: Value Proposition       │ │ Right: Studio Portrait   │ │
│  │ - "Websites built to win..."  │ │ - williams-navy-bokeh    │ │
│  │ - CTAs (Book / Work)          │ │ - Floating status badge  │ │
│  │ - Quick trust ticker          │ │ - Founder title overlay  │ │
│  └───────────────────────────────┘ └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│             Section 4: What You Get (Bento Grid)                │
│                                                                 │
│  ┌──────────────────────────────┐ ┌──────────────────────────┐  │
│  │ Card 1: Bespoke Design       │ │ Card 2: Expensive Motion │  │
│  │ [Visual Layout Canvas Mockup]│ │ [Fluid Motion Curve UI]  │  │
│  └──────────────────────────────┘ └──────────────────────────┘  │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────────────┐  │
│  │ Card 3: Forms │ │ Card 4: SEO   │ │ Card 5: Care & Hosting│  │
│  │ [Mini Cal UI] │ │ [Google Card] │ │ [99.9% Uptime Badge]  │  │
│  └───────────────┘ └───────────────┘ └───────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

- **Files to Modify**:
  - `src/pages/HomePage.tsx`: Replace hero W monogram and canvas with the studio portrait card; replace `StickyStack` with the new Bento grid.
  - `src/components/ui/StickyStack.tsx` or new `src/components/home/WhatYouGetBento.tsx`: Implement the Bento visual illustrations and tight padding layout.

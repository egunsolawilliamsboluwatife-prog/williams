# Hero Redesign & Booking Streamline Plan

Redesign the homepage hero with a bold, prominently scaled portrait seamlessly integrated with the 3D W monogram and polished typography, while simplifying the booking modal and booking page into minimal, text-light platform choice cards.

### User Review & Critical Decisions

> [!IMPORTANT]
> The changes will resolve both issues captured in your screenshots: the oversized/awkward headline wrapping and tiny floating cutout in the hero, and the overwhelming text/bullet lists in the booking flow.

- **Confirmed Decision 1 (Hero Integration)**: The portrait photo will be scaled up prominently (approx. 1.3x–1.5x visual weight) and centered directly over the warm-ember 3D W monogram stage. A subtle radial aura and bottom gradient mask will blend the cutout seamlessly into the obsidian canvas, eliminating awkward clipping or empty gaps.
- **Confirmed Decision 2 (Hero Headline)**: The H1 typography container will be balanced with refined responsive clamping and `max-w-[20ch]` line rhythm, ensuring words like "customers" and "local" never break across single-letter hyphenations.
- **Confirmed Decision 3 (Booking Simplification)**: All dense bullet lists, redundant checkmark items, and walls of descriptive text will be eliminated from the booking modal and book page. Instead, visitors receive two clean, elevated cards (Google Meet vs. Cal.com) with one-sentence clarity and direct action buttons.

---

### 1. Overview & Core Concept

- **What It Does**:
  1. Transforms the homepage hero into a cohesive, high-impact personal brand presentation where Williams' portrait is large, grounded, and harmonized with the interactive 3D lettermark.
  2. Reduces the booking modal and calendar experience to an effortless, frictionless choice between Google Meet and Cal.com.
- **Target Audience**: Prospective business owners (contractors, lawyers, CPAs, salon owners) looking for a polished, modern partner who delivers high-end craftsmanship without visual clutter.
- **Key Value**: Immediate visual authority in the hero above the fold, and faster call bookings with zero cognitive fatigue.

---

### 2. User Experience & Visual Design

- **Homepage Hero Overhaul**:
  - **Typographic Balance**: Adjusted clamping `text-[clamp(2.5rem,1.4rem+3.6vw,4.5rem)]` with `text-balance` and structured breaks so the heading reads cleanly: "Websites built to win local customers."
  - **Portrait & Monogram Stage**:
    - Right media column expands to `h-[440px] sm:h-[520px] lg:h-[min(680px,76dvh)]`.
    - 3D W monogram / poster is centered as the architectural backlight.
    - Williams' cutout portrait is scaled prominently (`w-[clamp(320px,42vw,560px)]` with vertical centering and upward offset) so his head and shoulders rest comfortably in front of the W.
    - An ambient radial ember glow (`rgba(217, 119, 6, 0.12)`) surrounds his silhouette, and a smooth bottom feather gradient seamlessly merges his black shirt into the `#0A0D14` background.
- **Booking Flow Simplification**:
  - **Modal Comparison View**:
    - Remove the 8 checkmarked bullet items and lengthy paragraphs.
    - Two clean, elegant cards:
      - **Google Meet**: "Fast 1-click sync for Google Calendar & Gmail users." -> `Schedule with Google Meet`
      - **Cal.com**: "Flexible sync for Outlook, Apple iCloud & Google." -> `Schedule with Cal.com`
    - Preserves embedded scheduler tabs if the user wants to book right inside the modal, or directly launch the external booking page in a new tab.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Direct Scale & Anchor vs. Cropping**:
  - *Chosen Approach*: Anchor the cutout image to the bottom-center of the monogram stage with enhanced width clamping and negative bottom translation, combined with a vertical fade mask.
  - *Why*: Gives Williams full natural shoulder width and visual presence without truncating his head or distorting image aspect ratios.
- **Decision 2: Elimination of Bullet Lists in Booking**:
  - *Chosen Approach*: Replace multi-line checkmark lists with single-line benefit pills/subtitles.
  - *Why*: Reduces reading time from 30 seconds to 2 seconds, drastically increasing click-through to booking slots.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                      HomePage.tsx                      │
│                                                        │
│  ┌───────────────────────┐   ┌──────────────────────┐  │
│  │ Left: Refined H1      │   │ Right: Hero Stage    │  │
│  │ - "Websites built..." │   │  ├─ Ambient Ember Glow│  │
│  │ - Availability dot    │   │  ├─ 3D W Monogram    │  │
│  │ - CTAs (Book / Work)  │   │  └─ Scaled Portrait  │  │
│  └───────────────────────┘   └──────────────────────┘  │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                   BookingModal.tsx                     │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Clean Header: "Book a 15-Minute Call" (24/7)     │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌─────────────────────────┐  ┌─────────────────────┐  │
│  │ Card 1: Google Meet     │  │ Card 2: Cal.com     │  │
│  │ - Icon + 1-line summary │  │ - Icon + 1-line     │  │
│  │ - Primary Action Button │  │ - Primary Action    │  │
│  └─────────────────────────┘  └─────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

- **Affected Components**:
  - `src/pages/HomePage.tsx`: Hero grid, H1 typography styles, portrait container and scale, ambient glow layer.
  - `src/components/booking/BookingModal.tsx`: Simplified card layouts, removal of 8 bullet points, streamlined action buttons.
  - `src/pages/BookPage.tsx` & `src/components/booking/BookingEmbed.tsx`: Ensure consistency with the simplified, text-light booking experience.

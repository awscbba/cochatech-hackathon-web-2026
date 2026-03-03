# Sprint 1 — UI Level-Up Plan

**Date:** March 2026
**Branch:** dev1
**Goal:** Transform the functional MVP into a premium, visually striking hackathon destination

---

## Direction Summary

The site has a solid foundation (design system, all sections, glassmorphism). The gap is
visual drama, motion, and imagery. Sprint 1 focuses on the three highest-impact upgrades:
hero imagery, scroll animations, and ambient depth — in that order.

---

## Epic 1: Hero Image — Cristo de la Concordia

**Concept:** Cristo de la Concordia (Cochabamba's iconic Christ statue) reimagined as a
futuristic tech symbol, surrounded by glowing hexagonal sponsor tokens, on a dark cinematic
background. This ties local identity to the tech theme.

**Status:** Image generation request created at `/gemini/requests/hero-cristo-image.md`

**Tasks:**
- [ ] Generate image via Gemini PRO using the prompt in the request file
- [ ] Save to `/public/images/hero-cristo.png`
- [x] Replace the current inline SVG circuit placeholder in `Hero.astro` with the image
- [x] Add a subtle radial glow behind the image to blend it into the dark background
- [ ] Optionally mirror the hexagon colors in the Sponsors section tiers

**Hero.astro changes needed:**
- Right column: swap `<svg>` for `<img src="/images/hero-cristo.png">`
- Add a wrapper with `position: relative` and a pseudo-element for the cyan glow halo
- Keep floating animation but reduce intensity (image is more detailed than SVG)

---

## Epic 2: Scroll-Triggered Animations

**Why:** Currently everything is visible/static on load. Scroll reveals make the page feel
alive and premium. Standard for any high-end landing page.

**Implementation:** Vanilla JS `IntersectionObserver` — no library needed, no bundle bloat.

**Tasks:**
- [x] Add `data-animate` + `data-animate-delay` attributes to all sections, cards, grids
- [x] IntersectionObserver script inline in Layout.astro
- [x] CSS: `[data-animate]` hidden → `.is-visible` triggered on intersection
- [x] Staggered delays on card grids (About, Challenges, Prizes, Mentors, Timeline)
- [x] Respect `prefers-reduced-motion` media query

**Files to modify:**
- `src/layouts/Layout.astro` — add script tag
- All component `.astro` files — add `data-animate` attributes

---

## Epic 3: Animated Particle Background (Hero Section)

**Why:** The hero background is currently a static CSS gradient. A subtle animated
particle/constellation field adds depth and reinforces the "tech event" feel without
being distracting.

**Implementation:** Lightweight canvas-based particle system (~50 lines of JS).

**Tasks:**
- [x] Add `<canvas id="hero-particles">` behind the hero content
- [x] Implement particle system: floating dots connected by lines when close
- [x] Colors: `rgba(0, 210, 255, 0.4)` (cyan dots), `rgba(0, 210, 255, 0.1)` (lines)
- [x] ~70 particles, slow drift, subtle — not distracting
- [x] Canvas auto-resizes on window resize
- [x] Stops animating when hero scrolls out of view (IntersectionObserver on canvas)

**Files to modify:**
- `src/components/Hero.astro` — add canvas element + inline script

---

## Epic 4: Section Visual Differentiation

**Why:** Every section currently shares the same `#020b1c` background. No rhythm, no
breathing room. Small background variations create a sense of depth and progression.

**Pattern:**
```
Hero          → #020b1c (base, with particle canvas)
About         → #0a1628 (slightly elevated surface)
Challenges    → #020b1c (base — returns to ground)
Timeline      → #0a1628 + faint horizontal cyan line dividers
Requirements  → #020b1c
Prizes        → gradient from #0a1628 to #111d33 (gold-tinted feel)
Mentors       → #020b1c + large bottom-left cyan glow (already has this)
Sponsors      → #0a1628
FAQ           → #020b1c
Footer        → #000000 (deepens to black)
```

**Tasks:**
- [x] Updated backgrounds — alternating deep/surface/elevated rhythm:
  - Hero: deep · About: surface · Challenges: deep · Timeline: surface
  - Requirements: deep · Prizes: elevated · Mentors: surface
  - Sponsors: deep · FAQ: elevated · Footer: #000000
- [ ] Optional: section divider decorative elements (deferred to Sprint 2)

---

## Epic 5: Countdown Timer (Hero Section)

**Why:** Adds urgency. "X days until the hackathon" is standard for event pages and
drives registration conversions. The event is May 16, 2026.

**Tasks:**
- [x] Add countdown widget below the stats row in Hero.astro
- [x] Display: `DD days  HH hours  MM min  SS sec`
- [x] Style: glassmorphism pill, cyan digits, tabular-nums
- [x] Pure JS `setInterval` — no library
- [x] Graceful fallback if event date has passed (shows 00s)

**Files to modify:**
- `src/components/Hero.astro`

---

## Execution Order

```
1. Epic 1 (image) — blocked on Gemini generation, start in parallel
2. Epic 3 (particles) — quickest win, unblocks the hero feeling immediately
3. Epic 5 (countdown) — fast, high conversion impact
4. Epic 2 (scroll animations) — most code, highest overall impact
5. Epic 4 (section backgrounds) — polish pass, done last
```

---

## What's NOT in Sprint 1

- Real sponsor logos (waiting on assets from organizers)
- Real mentor profiles/photos
- Backend/form integration
- Mobile menu (hamburger) — already functional enough
- Phase 2 features (parallax, cursor effects)

---

## File Map

| File | Epics that touch it |
|------|---------------------|
| `src/components/Hero.astro` | 1, 3, 5 |
| `src/layouts/Layout.astro` | 2 |
| `src/components/*.astro` (all) | 2, 4 |
| `src/styles/global.css` | 2, 4 |
| `public/images/hero-cristo.png` | 1 (generated asset) |
| `gemini/requests/hero-cristo-image.md` | 1 (prompt for generation) |

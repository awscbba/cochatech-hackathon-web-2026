# Sprint 2 — Premium Polish & UX Gaps

**Picks up where Sprint 1 left off.**
Sprint 1 built the foundation (image, particles, countdown, scroll animations, backgrounds).
Sprint 2 closes the gap between "functional" and "genuinely high-end tech site".

---

## Priority Order (top = highest impact)

```
1. Mobile menu          — functional gap, non-negotiable
2. FAQ smooth animation — visible jank on every interaction
3. Noise texture        — 5 min change, huge premium lift
4. Scroll progress bar  — fast, signals quality
5. Stat count-up        — hero engagement
6. Nav active state     — scroll-aware navigation
7. Timeline animated    — pulsing dots + line draw
8. Floating back-to-top — UX convenience
9. Card cursor glow     — micro-interaction polish
10. Section dividers    — breathing room between sections
```

---

## Epic 1 — Mobile Hamburger Menu

**File:** `src/components/Navigation.astro`

**Problem:** On screens < 1024px the nav menu is `display: none` with no replacement.
Users on mobile have no way to navigate. Fatal for conversions.

**Implementation:**
- Add hamburger button (3-line icon) to nav-actions, visible only on mobile
- Add a full-width slide-down (or slide-in right) drawer with the same 7 anchor links
- Drawer closes on link click and on outside tap
- Animate open/close with `max-height` + `opacity` transition
- Button toggles an `.is-open` class on the nav

```html
<!-- Add to nav-actions -->
<button class="nav-hamburger" aria-label="Abrir menú" aria-expanded="false" id="nav-toggle">
  <span></span><span></span><span></span>
</button>

<!-- Add after nav -->
<div class="nav-drawer" id="nav-drawer">
  <!-- same 7 links -->
</div>
```

```css
/* Hamburger: 3 lines → X animation */
/* Drawer: slides down from nav bottom */
/* Only visible on < 1024px */
```

```js
// ~10 lines: toggle class on button click, close on link click
```

---

## Epic 2 — FAQ Smooth Height Animation

**File:** `src/components/FAQ.astro`

**Problem:** Native `<details>` element expands/collapses instantly — no smooth transition.
Looks amateurish compared to the rest of the site.

**Implementation:** Replace native `<details>/<summary>` with `<div>` + JavaScript.
The JS approach uses `max-height` transition (reliable cross-browser).

```html
<!-- Replace each <details> with: -->
<div class="faq-item">
  <button class="faq-summary" aria-expanded="false">
    <span>Question text</span>
    <span class="faq-chevron"><!-- svg --></span>
  </button>
  <div class="faq-body" style="max-height: 0; overflow: hidden;">
    <div class="faq-content"><p>Answer</p></div>
  </div>
</div>
```

```css
.faq-body {
  transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.3s ease;
  opacity: 0;
}
.faq-body.is-open {
  opacity: 1;
  /* max-height set by JS to scrollHeight */
}
```

```js
// On button click: set max-height = el.scrollHeight, toggle is-open + aria-expanded
// On close: set max-height = 0
```

---

## Epic 3 — Noise / Grain Texture Overlay

**File:** `src/styles/global.css` + `src/layouts/Layout.astro`

**Problem:** All section backgrounds are flat solid colors. High-end tech sites layer a
subtle grain texture that adds depth, making the surface feel tactile rather than digital-flat.

**Implementation:** Single pseudo-element on `body` — a fixed SVG noise filter overlay.

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;  /* very subtle */
  background-image: url("data:image/svg+xml,..."); /* inline noise SVG */
}
```

The noise SVG uses `<feTurbulence>` filter — no external file needed, entirely inline.
Adjust opacity between 0.02–0.05 until it feels right without being distracting.

---

## Epic 4 — Scroll Progress Bar

**File:** `src/layouts/Layout.astro`

**Problem:** No visual indicator of page progress. Premium sites often have a thin accent
bar at the top of the viewport that fills as the user scrolls.

**Implementation:** Fixed `<div>` at top of page + `scroll` event listener.

```html
<div id="scroll-progress" aria-hidden="true"></div>
```

```css
#scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  width: 0%;
  background: linear-gradient(90deg, var(--ds-cyan), var(--ds-yellow));
  z-index: 9998;
  transition: width 0.1s linear;
}
```

```js
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('scroll-progress').style.width = pct + '%';
}, { passive: true });
```

---

## Epic 5 — Stat Count-Up Animation

**File:** `src/components/Hero.astro`

**Problem:** The 500+, 9, $15k stats load as static text. Animating them counting up from
0 when the page loads creates immediate engagement and signals the numbers matter.

**Implementation:** Small inline script — reads the final value from the DOM, counts up
over ~1.5s with an ease-out curve, starts on `DOMContentLoaded`.

```js
function countUp(el, end, duration, prefix, suffix) {
  // easeOutCubic from 0 → end over duration ms
  // updates el.textContent each rAF
}
// Targets: 500 (Participantes), 9 (Retos), 15 ($15k → display as $15k)
```

Note: The `$15k` value needs special handling — count to 15 and append "k".

---

## Epic 6 — Nav Active Link State on Scroll

**File:** `src/components/Navigation.astro`

**Problem:** Nav links don't indicate which section is currently visible. On a single-page
site this is a key navigation quality signal.

**Implementation:** IntersectionObserver watching each section's entry. When a section
enters view (≥ 30% visible), add `.is-active` to the matching nav link.

```js
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle(
        'is-active', a.getAttribute('href') === '#' + entry.target.id
      ));
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => io.observe(s));
```

```css
.nav-menu a.is-active {
  color: var(--ds-text-primary);
  /* optional: small cyan underline */
}
.nav-menu a.is-active::after {
  content: '';
  display: block;
  height: 1px;
  background: var(--ds-cyan);
  /* subtle bottom indicator */
}
```

---

## Epic 7 — Timeline Pulsing Dots + Line Draw

**File:** `src/components/Timeline.astro`

**Problem:** The timeline connector dots are static. The connecting line is a static
gradient. On a "chronological journey" component this feels flat.

**Two improvements:**

**7a — Pulsing dots:** Add a `@keyframes` ping animation to each `.timeline-dot`
(expanding ring that fades out — like a radar pulse). Only on the current/active milestone.

```css
@keyframes timeline-ping {
  0%   { transform: scale(1); opacity: 0.8; }
  70%  { transform: scale(2.5); opacity: 0; }
  100% { transform: scale(2.5); opacity: 0; }
}

.timeline-dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--ds-cyan);
  animation: timeline-ping 2s ease-out infinite;
}
```

**7b — Progressive line:** The `.timeline-line` gradient currently goes from cyan to
transparent statically. With `data-animate` already on the items, add a `scaleY(0) → scaleY(1)`
animation triggered by the IntersectionObserver as each item enters view.

---

## Epic 8 — Floating Back-to-Top Button

**File:** `src/layouts/Layout.astro` (global, not Footer)

**Problem:** The current back-to-top is a text link buried in the footer. Users who scroll
down to the bottom of a long page want an always-accessible, visually clear button.

**Implementation:** Fixed circular button, bottom-right corner. Appears after scrolling
300px. Smooth fade-in/fade-out.

```html
<button id="back-to-top" aria-label="Volver al inicio">
  <svg><!-- up arrow --></svg>
</button>
```

```css
#back-to-top {
  position: fixed;
  bottom: 2rem; right: 2rem;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--ds-glass-bg);
  border: 1px solid rgba(0, 210, 255, 0.3);
  color: var(--ds-cyan);
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s, transform 0.3s;
  z-index: 500;
}
#back-to-top.is-visible {
  opacity: 1; pointer-events: auto;
}
#back-to-top:hover {
  background: var(--ds-cyan-dim);
  transform: translateY(-3px);
}
```

```js
window.addEventListener('scroll', () => {
  document.getElementById('back-to-top')
    .classList.toggle('is-visible', window.scrollY > 300);
}, { passive: true });
```

---

## Epic 9 — Card Cursor Glow (Mouse-Follow Border)

**File:** Global CSS + small JS in `Layout.astro`

**Problem:** Card hover is just `translateY(-4px)` on all cards — consistent but generic.
High-end sites use a "spotlight" effect where the card border glows toward the cursor position.

**Implementation:** JS tracks `mousemove` on each card and updates a CSS custom property
`--mouse-x / --mouse-y`, used in a `::before` pseudo-element radial gradient.

```js
document.querySelectorAll('.ds-glass-card, .about-card, .prizes-card, .mentors-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  });
});
```

```css
.about-card::before, .prizes-card::before, .mentors-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(
    200px circle at var(--mx, 50%) var(--my, 50%),
    rgba(0, 210, 255, 0.08),
    transparent
  );
  transition: opacity 0.3s;
  pointer-events: none;
}
.about-card:hover::before, .prizes-card:hover::before, .mentors-card:hover::before {
  opacity: 1;
}
```

---

## Epic 10 — Section Gradient Dividers

**File:** Each section component `<style>` block

**Problem:** Section backgrounds change abruptly (deep → surface → deep). A subtle
gradient at the top/bottom of each section (using `::before`/`::after`) blends transitions.

```css
.about-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 60px;
  background: linear-gradient(to bottom, var(--ds-bg-deep), transparent);
  pointer-events: none;
  z-index: 1;
}
```

Apply matching gradients (using the adjacent section's background color) to create seamless
blending at every section boundary.

---

## What's NOT in Sprint 2

- Real sponsor logos (waiting on assets from organizers)
- Real mentor profiles / photos
- SVG icon system (emoji is fine for now — actual event content > icon polish)
- Parallax scroll on Cristo image
- Pre-loader / intro animation
- Open Graph image (Phase 3 — after content is finalized)

---

## File Map

| File | Epics |
|------|-------|
| `src/components/Navigation.astro` | 1, 6 |
| `src/components/FAQ.astro` | 2 |
| `src/styles/global.css` | 3, 9 |
| `src/layouts/Layout.astro` | 3, 4, 8, 9 |
| `src/components/Hero.astro` | 5 |
| `src/components/Timeline.astro` | 7 |
| All section components | 10 |

## Build Command
```bash
/c/Program\ Files/nodejs/node.exe node_modules/astro/astro.js build
/c/Program\ Files/nodejs/node.exe node_modules/astro/astro.js dev
```

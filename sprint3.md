# Sprint 3 — Production Launch Readiness

**This is the final sprint. After this, the site is launchable.**

Sprint 1 = visual foundation. Sprint 2 = polish & UX.
Sprint 3 = real content, working links, SEO, legal, and deployment prep.

---

## CRITICAL BLOCKERS (site cannot launch without these)

---

## Epic 1 — Fix All Broken CTAs

**Problem:** Every "Aplicar ahora" button on the site links to `#aplicar` — an anchor that
does not exist anywhere in the page. Every primary conversion point is broken.
"Descargar bases" links to `#` (nothing).

**Files:** `Navigation.astro`, `Hero.astro`, `Requirements.astro`

**Fix options (pick one):**
- **Option A — External form:** Replace `#aplicar` with the real Typeform / Google Form URL
  ```html
  <a href="https://forms.gle/XXXXXXXX" target="_blank" rel="noopener">Aplicar ahora</a>
  ```
- **Option B — Embedded section:** Add a `<section id="aplicar">` above the footer with
  an embedded `<iframe>` of the form
- **Option C — Coming soon state:** If the form isn't ready, replace with a modal that
  collects emails for early notification (no external dependency)

**"Descargar bases":** Link to the PDF once created, or hide the button until it exists.

---

## Epic 2 — Real Contact Details

**File:** `src/components/Footer.astro`

**Replace placeholders:**

| Field | Current | Needs |
|-------|---------|-------|
| WhatsApp href | `wa.me/591XXXXXXXXX` | Real Bolivian number from COCHATECH.md: `+591 79791349` |
| WhatsApp display | `+591 XX XXX XXXX` | `+591 79791349` |
| Email | `info@cochatech.com` | Confirm or replace with `jtaya@ucb.edu.bo` (from COCHATECH.md) |
| Mentor email | `mentores@cochatech.com` | Confirm this mailbox exists |

**Note:** COCHATECH.md already has the real contact info:
- Email: `jtaya@ucb.edu.bo`
- WhatsApp: `+591 79791349`
- Website: `https://cochatech.lat`

**Also fix social links** (currently generic placeholders):
- Instagram: `@COCHATECH` → `https://instagram.com/COCHATECH`
- TikTok: `@COCHATECH` → `https://tiktok.com/@COCHATECH`
- Facebook: `COCHATECH 2026` → real URL when available

---

## Epic 3 — SEO & Open Graph Meta Tags

**File:** `src/layouts/Layout.astro`

**Currently missing:**
```html
<!-- Add to <head> -->
<meta property="og:image" content="https://cochatech.lat/images/og-cover.png" />
<meta property="og:url" content="https://cochatech.lat" />
<meta property="og:site_name" content="COCHATECH 2026" />
<meta property="og:locale" content="es_BO" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://cochatech.lat/images/og-cover.png" />
<link rel="canonical" href="https://cochatech.lat" />
```

**OG Image (`/public/images/og-cover.png`):**
- Size: 1200×630px (standard OG ratio)
- Should show: COCHATECH 2026 logo/title + Cristo image + event date + location
- This is what appears when someone shares the link on WhatsApp, Instagram, LinkedIn
- Generate with Gemini or design manually — request file at `gemini/requests/og-cover.md`

**JSON-LD Event Schema** (helps Google show rich results):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "COCHATECH 2026",
  "startDate": "2026-05-16",
  "endDate": "2026-05-17",
  "location": {
    "@type": "Place",
    "name": "Cochabamba, Bolivia"
  },
  "description": "El hackathon más grande de Cochabamba...",
  "organizer": { "@type": "Organization", "name": "UCB" },
  "url": "https://cochatech.lat"
}
</script>
```

---

## Epic 4 — Astro Config + robots.txt + Sitemap

**File:** `astro.config.mjs`

Add site URL (required for sitemap and canonical):
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cochatech.lat',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

Install sitemap integration:
```bash
/c/Program\ Files/nodejs/node.exe node_modules/astro/astro.js add sitemap
```

**`/public/robots.txt`:**
```
User-agent: *
Allow: /
Sitemap: https://cochatech.lat/sitemap-index.xml
```

---

## Epic 5 — 404 Page

**File:** `src/pages/404.astro`

Astro handles 404s automatically if this file exists. Should match site branding and
give the user a way back.

**Content:**
- Same Navigation and Footer
- Large "404" in cyan gradient
- Short message: "Esta página no existe"
- Single CTA: "Volver al inicio" → `/`
- Keep the particle canvas effect from Hero for visual consistency

---

## Epic 6 — Legal Pages (Privacy, Terms, Code of Conduct)

**Files:** `src/pages/privacidad.astro`, `src/pages/terminos.astro`, `src/pages/codigo-conducta.astro`

Footer currently links to `href="#"` for all three — they resolve to nothing.

**Minimum viable content for each:**
- Header + Footer (reuse existing components)
- Single content block with the relevant text
- Link back to main page

**Priority order:** Código de Conducta > Privacidad > Términos
(CoC is most relevant to a hackathon community)

**Update footer links:**
```html
<a href="/privacidad" class="footer-legal-link">Privacidad</a>
<a href="/terminos" class="footer-legal-link">Términos</a>
<a href="/codigo-conducta" class="footer-legal-link">Código de Conducta</a>
```

---

## Epic 7 — Sponsors Hexagonal Redesign

**File:** `src/components/Sponsors.astro`

**Problem:** Still all text placeholder boxes. This section visually contradicts the
Cristo + hexagon concept of the hero image.

**Redesign direction:** Replace the rectangular logo cards with hexagonal tiles that
mirror the hexagon colors from the Cristo image. When real logos arrive, they drop into
the hex shape.

**Tier visual language:**
- Tier 1 (Organizadores / UCB, UMSS, UPB): **Gold hex** — large, prominent
- Tier 2 (Aliados Financieros): **Blue hex** — medium
- Tier 3 (Tecnología y Social): **Green / Purple hex** — smaller
- Tier 4 (Internacional): **Silver hex** — smallest

**CSS hex shape** (no SVG needed):
```css
.hex {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: var(--hex-color);
}
```

**With real logos:** `<img>` inside the hex clip-path, logo grayscale → color on hover.

**Without real logos (now):** Initials/acronyms styled inside colored hexagons — already
looks intentional and connected to the hero image.

---

## Epic 8 — OG Cover Image (Gemini Request)

**File to create:** `gemini/requests/og-cover.md`

The OG image is the most-seen asset for the site — it shows on every WhatsApp/Instagram/
LinkedIn share. Should be generated with Gemini.

**Spec:**
- 1200×630px landscape
- Dark background (#020b1c)
- Cristo image (smaller, right side) with cyan glow
- Left side: "COCHATECH 2026" in large bold white text
- Below title: "16-17 Mayo · Cochabamba, Bolivia"
- Cyan/yellow accent elements matching the site
- Save to `/public/images/og-cover.png`

---

## Epic 9 — Performance Pass

**Before deploying:**

**Image optimization:**
- `hero-cristo-transparent.png` — check file size, compress if > 500KB
  ```bash
  # Check size
  ls -lh public/images/
  ```
- Use Astro's `<Image>` component if the PNG is large (auto-generates optimized formats)

**Font loading:**
- Current setup double-loads the font (preload + stylesheet on same URL)
- Fix in `Layout.astro`:
  ```html
  <!-- preload first -->
  <link rel="preload" href="..." as="style" onload="this.rel='stylesheet'">
  <!-- fallback -->
  <noscript><link rel="stylesheet" href="..."></noscript>
  ```

**`loading="lazy"` on below-fold images:** Already set on Cristo image (`loading="eager"`
is correct for hero — it's above the fold).

---

## Epic 10 — Final Visual Touches (not in Sprint 2)

Small items that don't fit elsewhere:

**10a — Shimmer on hero title**
Add a subtle animated shimmer/shine sweep across the gradient text in the hero H1.
Pure CSS `@keyframes` background-position animation on the gradient.

**10b — Magnetic CTAs**
The primary "Aplicar ahora" buttons subtly follow the cursor within a small radius.
JS `mousemove` + CSS `transform: translate()` — ~15 lines. Very premium feel.

**10c — Design system page cleanup**
`src/pages/design-system.astro` should be either:
- Removed from production build (add to `.gitignore` or exclude from build)
- Or kept but not linked publicly

---

## What Requires External Input (blockers from organizers)

These items cannot be completed by a developer alone — they need content from the team:

| Item | Who provides it | Sprint |
|------|----------------|--------|
| Registration form URL (Typeform/Google) | Event organizers | 3 — Epic 1 |
| Real PDF "Bases del hackathon" | Event organizers | 3 — Epic 1 |
| Confirmed WhatsApp number | Event organizers | 3 — Epic 2 |
| Sponsor logo files (UCB, UMSS, UPB, banks) | Partners/Marketing | 3 — Epic 7 |
| Privacy policy text | Legal/Organizers | 3 — Epic 6 |
| Code of conduct text | Organizers | 3 — Epic 6 |
| Final deployment domain confirmed | Tech/Organizers | 3 — Epic 4 |

---

## After Sprint 3 — The Site Is Done

| Sprint | Focus | Status |
|--------|-------|--------|
| Sprint 1 | Visual foundation (image, particles, countdown, animations, backgrounds) | ✅ Done |
| Sprint 2 | UX polish (mobile menu, FAQ animation, noise, scroll bar, count-up, cursor glow) | 📋 Planned |
| Sprint 3 | Production readiness (real links, SEO, legal, sponsors, 404, OG image) | 📋 Planned |

No Sprint 4 is needed. After Sprint 3 the site is complete and deployable to `cochatech.lat`.

---

## Build & Dev Commands
```bash
# Dev server
/c/Program\ Files/nodejs/node.exe node_modules/astro/astro.js dev

# Production build
/c/Program\ Files/nodejs/node.exe node_modules/astro/astro.js build

# Preview production build
/c/Program\ Files/nodejs/node.exe node_modules/astro/astro.js preview
```

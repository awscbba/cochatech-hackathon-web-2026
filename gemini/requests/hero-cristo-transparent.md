# Gemini Image Request — Hero Cristo (Web-Native, Transparent BG)

## The Problem with the Previous Image
The original concept image has a solid teal background that shows as a hard rectangle on the
dark website. Even with CSS masking it's a workaround. The fix is generating the image with
**no background at all** — the subject floats freely on whatever the site puts behind it.

## On SVG vs PNG
- **SVG**: Only practical for flat/vector illustrations. A photorealistic 3D render cannot
  be an SVG. Skip this.
- **PNG with transparent background**: This is the right format. The subject renders on pure
  transparency — it will integrate on any dark background without masking, blending, or CSS
  tricks. This is the goal.

---

## Concept (keep same aesthetic as original — NOT the dark edgy version)
Cristo de la Concordia from Cochabamba, Bolivia — in the same approachable, semi-realistic
3D style as the original concept (white/silver ceramic statue with subtle circuit blue
accents on the robe). Surrounded by colorful glowing hexagonal gem tokens. The feel should
be **friendly and premium**, not dark/aggressive.

---

## Prompt

```
Isolated 3D render of the Cristo de la Concordia statue from Cochabamba, Bolivia.
Transparent background (PNG with alpha channel, no background at all).

The statue is rendered in a premium ceramic-white / silver-blue material. The robe has
subtle glowing circuit board traces in soft cyan. The pose is the classic outstretched arms.
Lighting: soft dramatic upward fill light in cyan-white from below, rim lighting from behind
in electric blue. The statue should appear to float with no floor, no ground, no scene.

Scattered around the base in a loose natural arc: colorful glowing hexagonal gem tokens of
different sizes and colors — gold (largest, front), crimson red, emerald green, deep purple,
royal blue, silver-gray. Each hexagon is slightly elevated, glowing from within, with a
beveled metallic edge. They radiate outward from the base like they belong to the statue.
The hexagons should also have NO ground shadow — they float.

CRITICAL: Pure transparent background. No sky, no floor, no circuit board ground, no
environment. The subject (statue + hexagons) must be entirely surrounded by transparency
so it composites cleanly onto any dark website background.

Style: high quality 3D product render, clean studio lighting adapted for dark backgrounds,
premium but approachable (not horror/dark). Vertical composition, statue centered, hexagons
spreading downward and outward. Aspect ratio 3:4 portrait.
```

---

## Variations to Try
1. **Primary**: Exactly as above — white/silver Cristo, transparent BG, colorful hexagons
2. **Alt A**: Same but statue has slightly more blue/cyan tint on the robe for better
   color harmony with the site's cyan accent (#00d2ff)
3. **Alt B**: Slightly wider crop showing more hexagons spreading outward at the bottom

---

## If Gemini Cannot Generate Transparent PNG
Some Gemini versions don't support alpha channel export. In that case, generate on a
**pure black background (#000000)** — then in the CSS use:

```css
.hero-cristo-img {
  mix-blend-mode: screen;  /* makes black pixels invisible on dark backgrounds */
}
```

This works because `screen` blend mode: dark pixels in image × dark site bg = invisible.
The colored subject (statue, hexagons) will remain visible. Not as clean as true transparency
but very effective on dark sites.

---

## Technical Specs
- **Format**: PNG with alpha (transparent) — or PNG on pure black if alpha not available
- **Resolution**: minimum 1000×1300px (3:4 ratio)
- **Save to**: `/public/images/hero-cristo.png` (replaces current file)
- No padding/margin inside the image — subject should reach close to the canvas edges

---

## CSS Integration (already in Hero.astro)
Once the transparent/black-bg PNG is in place:
- If transparent PNG: remove the `mask-image` CSS from `.hero-cristo-img` — not needed
- If black-bg PNG: add `mix-blend-mode: screen` to `.hero-cristo-img` instead of mask

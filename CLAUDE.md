# COCHATECH 2026 - Development & Design Guide

## 📋 Project Overview
A high-end luxury hackathon landing page for COCHATECH 2026 in Cochabamba. Static single-page application optimized for fast loading and seamless information discovery through smooth scrolling.

**Type:** Landing Page (Single Page Application - SPA)
**Technology:** Astro JS, HTML/CSS with Tailwind CSS
**Launch:** Feb 2026 · Cochabamba, Bolivia

---

## 🎨 Visual Design System

### Color Palette
- **Primary Dark Background:** `#020b1c` (deep midnight blue)
- **Text Primary:** `#ffffff` (white)
- **Accent Cyan:** `#00d2ff` (bright cyan/teal - glowing accents)
- **Accent Secondary:** `#ffff00` (pale yellow - circuit elements)
- **Text Secondary:** `rgba(255, 255, 255, 0.7)` (for navigation, secondary text)
- **Page Background:** `#111` (very dark gray)

### Typography System
- **Font Family:** Inter (primary) | SF Pro Display or Helvetica Neue (fallback for high-end feel)
- **H1 (Hero):** Bold, 4.5rem (desktop) / 3rem (mobile), line-height 0.95, tight spacing
- **H2 (Section Headers):** 2.5rem, bold
- **H3 (Subsections):** 1.5rem, medium weight
- **Navigation:** Uppercase, 0.7rem, letter-spacing 1.5px
- **Body Text:** 0.9rem-1rem, line-height 1.6
- **Logo:** 1.2rem, font-weight 600

### Layout & Spacing
- **Container Max-Width:** 1200px, 95% viewport width
- **Padding:** 30px 50px (navbar) | 0 80px (hero) | 60px-80px (sections)
- **Border Radius:** 30px (main container) | 24px-32px (cards)
- **Gap Spacing:** 30px (nav links) | 20px-30px (grid items)
- **Section Padding:** 80px vertical, 50px horizontal

### Visual Effects
- **Background:** Layered radial gradient (cyan glow at 20% 50%) + circuit board pattern (right-aligned)
- **Glow:** `radial-gradient(circle at 20% 50%, rgba(0, 210, 255, 0.15), transparent 50%)`
- **Overflow:** Hidden on main container to contain rounded corners
- **Decorative Star:** `✦` bottom-right (2rem, 40% opacity)

---

## 🏗️ Site Architecture & Components

### 1. NAVIGATION (Sticky Header)
**Always visible on scroll. Fixed position, z-index: 10**

**Left Element:**
- Logo + "Cocha Tech" text (link to `#inicio`)
- Hexagonal icon with cyan border (24x24px)

**Center Element:**
- Anchor link menu (uppercase, wide letter-spacing):
  - `#sobre-el-evento` → Sobre el Evento
  - `#retos` → Retos
  - `#cronograma` → Cronograma
  - `#requisitos` → Requisitos
  - `#premios` → Premios
  - `#mentores` → Mentores
  - `#contacto` → Contacto

**Right Element (CTAs):**
- Ghost Button: "Descargar bases" (PDF link)
- Solid Button: "Aplicar ahora" (External form/Typeform)

---

### 2. HERO SECTION (`#inicio`)
**Component Type:** Hero Split or Centered
**Height:** 600px (desktop) | flexible (mobile)

**Content (Left):**
- **H1:** "El hackathon más importante de Bolivia llega a Cochabamba"
- **Subtitle:** "36-48 horas para transformar ideas en soluciones reales"
- **Data Row:** 3 metrics with icons
  - 500+ Participantes
  - 9 Retos Reales
  - $15k en Premios
- **Badges:** "Mayo 2026 · Cochabamba, Bolivia"
- **CTAs:** Primary button + Secondary button
- **Max-width:** 500px

**Graphic (Right):**
- Circuit board pattern background
- Glowing nodes and lines
- Futuristic visual effect

---

### 3. ABOUT SECTION (`#sobre-el-evento`)
**Component Type:** Feature Section (Text + Card Grid)

**Top Part:**
- **Heading:** "¿Qué es COCHATECH?"
- **Description:** Combined descriptive paragraphs
- Emphasis on "event for Cochabamba, by Cochabamba"

**Bottom Part (3-Column Card Grid):**
1. **🎯 Retos Reales**
   - Icon: Target
   - Text: Brief description of real challenges

2. **🤝 Mentores Activos**
   - Icon: Handshake
   - Text: Guidance and mentorship focus

3. **🚀 Impacto Continuo**
   - Icon: Rocket
   - Text: Lasting impact beyond the event

**Card Style:** Simple, icon-top, light background with border

---

### 4. CHALLENGES SECTION (`#retos`)
**Component Type:** Vertical Card List or List Group
**Design Principle:** All content visible at once (no sliders)

**Intro Text:**
- Context about real problems and challenge categories
- Mention of immersion session

**Challenge Items (3 categories):**

1. **🏢 Retos Empresariales**
   - Description of business challenges
   - Status: "Se revela en la ceremonia"
   - Reasoning: Confidentiality of businesses

2. **🏦 Retos Bancarios**
   - Description of financial/banking challenges
   - NDA Note: Under confidentiality agreement
   - Status: "Se revela en la ceremonia"

3. **❤️ Retos Sociales**
   - Description of social impact challenges
   - Ethics Note: Focus on sustainable solutions
   - Fully transparent description available

**Footer Note:** Information about pre-event immersion session

---

### 5. TIMELINE SECTION (`#cronograma`)
**Component Type:** Vertical Timeline (mobile) | Simple Table (desktop)

**Design Principle:** Linear vertical flow, no tabs

**Timeline Milestones:**
- **Jan-Feb:** Convocatoria (Opening announcement and info)
- **Feb 16:** Cierre de Inscripciones (Application deadline)
- **Feb-Mar:** Preselección (Evaluation and selection)
- **Mar:** Anuncio de Equipos (Team announcement)
- **Apr:** Inmersión (Immersion session)
- **May:** Evento (Hackathon event - 36-48 hours)
- **Post-Event:** Seguimiento (Post-hackathon support)

**Mobile Adaptation:** Stacked cards with date badges

---

### 6. REQUIREMENTS SECTION (`#requisitos`)
**Component Type:** Two-Column Layout with differentiated styling

**Left Column (Eligibility - Green/Positive):**
- Header: "¿Quién puede participar?"
- Checkmark (✓) list:
  - Ser estudiante de pregrado o posgrado
  - Estar inscrito en universidad boliviana
  - Tener 18+ años
  - Disponibilidad para 36-48 horas continuas
  - Etc.

**Right Column (Commitment - Different visual treatment):**
- Header: "Compromiso con el evento"
- Subtle background color to differentiate
- Bullet or numbered list:
  - Asistencia obligatoria desde inicio a fin
  - Disponibilidad completa durante el hackathon
  - Cumplimiento de código de conducta
  - Propiedad intelectual agreements
  - Etc.

**Bottom CTA:**
- Large button: "Postular ahora" (primary action)

---

### 7. PRIZES SECTION (`#premios`)
**Component Type:** Highlighted Card + Grid List

**Featured Element:**
- Large card with golden border or strong shadow
- **"Gran Premio COCHATECH"**
- List of main benefits:
  - Prize amount
  - Mentoring period
  - Investment opportunity
  - International recognition
  - Etc.

**Secondary Grid (2x3 or 3x2):**
- Categories of prizes with descriptions
- Example categories:
  - Best Innovation
  - Best Social Impact
  - Best Design
  - Best Pitch
  - Etc.

**Tertiary Element:**
- Horizontal list: "Beneficios para todos los equipos"
  - Certificate
  - Network connections
  - Mentoring access
  - Portfolio showcase
  - Etc.

---

### 8. MENTORS SECTION (`#mentores`)
**Component Type:** Profile Grid (4 profiles)

**Concept:** Since specific names aren't finalized, use role-based profile cards

**Profile Cards (4-item grid):**
1. **💼 Mentores de Negocios** (Business icon)
   - Focus: Strategy, pitch, market validation

2. **💻 Mentores de Tecnología** (Code/tech icon)
   - Focus: Technical execution, architecture

3. **❤️ Mentores Sociales** (Heart/helping hands icon)
   - Focus: Social impact, sustainability

4. **🎨 Mentores de UX** (Design/eye icon)
   - Focus: User experience, design thinking

**Callout Section:**
- Small text inviting mentors to join the initiative
- Contact info or "Become a Mentor" link

---

### 9. SPONSORS/ALLIES SECTION
**Component Type:** Logo Cloud (with hierarchy)

**Tier 1 - Organizers (Large logos):**
- UCB (Universidad Católica Boliviana)
- UMSS (Universidad Mayor de San Simón)
- UPB (Universidad Privada Boliviana)

**Tier 2 - Banking Partners (Medium logos):**
- Major Bolivian banks

**Tier 3 - Technology & Social (Medium/Small logos):**
- Tech companies, social enterprises

**Tier 4 - International Partners (Small logos):**
- Global organizations, international sponsors

---

### 10. FAQ SECTION
**Component Type:** Accordion (Collapsible)

**Rationale:** Only necessary interactive element. Keeps page layout clean while allowing extensive Q&A content.

**Typical Q&A Categories:**
- Registration & Eligibility
- Event Logistics
- Prizes & Recognition
- Team Formation
- Technical Requirements
- Post-Event Benefits

---

### 11. FOOTER (`#contacto`)
**Component Type:** Simple Footer with 3 columns

**Column 1 - Contact:**
- Heading: "Contacto"
- Email (clickable mailto link)
- WhatsApp (clickable link)

**Column 2 - Social Media:**
- Icons linking to:
  - Instagram
  - LinkedIn
  - Twitter/X
  - TikTok (if applicable)

**Column 3 - Institution Logos:**
- Small logos of organizing institutions
- Copyright text

---

## 📍 CTA Strategy
For maximum conversion, repeat primary CTA ("Aplicar ahora") at strategic points:

1. **Header** (Fixed sticky navigation) - Always visible
2. **Hero Section** (Large, prominent) - Main entry point
3. **End of Requirements** (Contextual) - After decision-making section
4. **Before Footer** (Last reminder) - Final conversion opportunity

Secondary CTA ("Descargar bases") available in header and sections as needed.

---

## 📁 File Structure
```
cochatech-lat-1a/
├── CLAUDE.md (this file)
├── index.html (single page)
├── style.css (or Tailwind config)
├── assets/
│   ├── circuit-board.svg (or .png)
│   ├── logo-icon.svg
│   ├── icons/ (hero metrics, section icons)
│   └── images/ (sponsors, hero image)
├── fonts/ (if self-hosting Inter)
└── js/ (minimal - only for accordion if needed)
```

---

## 🎯 Development Workflow

### CSS Custom Properties (Root Variables)
```css
:root {
    --bg-dark: #020b1c;
    --text-white: #ffffff;
    --accent-cyan: #00d2ff;
    --accent-yellow: #ffff00;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --font-main: 'Inter', sans-serif;
    --container-max: 1200px;
    --border-radius: 30px;
}
```

### Responsive Breakpoints
- **Desktop:** 1200px+ (full layout, 4.5rem h1)
- **Tablet:** 768px-1199px (adjusted spacing, 3.5rem h1)
- **Mobile:** <768px (stacked layout, 3rem h1, vertical timeline)

### Interactive Elements
- **Navbar Links:** Smooth anchor scrolling, active state highlighting
- **Hover States:** Color transition 0.3s ease
- **Accordion:** Smooth height animation, chevron icon rotation
- **Buttons:** Glow effect on hover (optional, maintains luxury feel)

### Performance Considerations
- Circuit board image: Optimize SVG or PNG for web (< 200KB)
- Use `background-size: contain` to avoid stretching
- Lazy-load sponsor logos if many
- Minimize JavaScript (only accordion logic if needed)
- Consider CSS Grid/Flexbox for responsive layouts

---

## 🎨 Design Decision Rationale

1. **Dark Theme:** High-end luxury aesthetic, reduces eye strain, tech-forward
2. **Cyan Accents:** Cyberpunk/innovation feel, stands out on dark background
3. **Circuit Graphics:** Symbolizes technology, engineering, hackathon focus
4. **Sans-Serif Typography:** Clean, modern, professional, scannable
5. **Rounded Corners:** Contemporary design, softens tech aesthetic
6. **Sticky Header:** Constant CTA access, easy navigation
7. **Single Page:** Fast loading, complete info in one scroll, event-optimized
8. **Anchor Links:** Users can share specific sections, improves UX
9. **No Sliders:** All content visible, better for scanning and SEO
10. **Accordion for FAQ:** Reduces cognitive load while preserving content depth

---

## 🔄 Iteration & Future Enhancements

**Phase 1 (MVP):**
- Static landing page with all sections
- Responsive design mobile-to-desktop
- External form integration (Typeform/Google Forms)

**Phase 2 (Optional):**
- Animated circuit board paths
- Parallax scrolling on graphics
- Smooth scroll animations on section reveal
- Back-to-top button

**Phase 3 (Post-Event):**
- Results/winners showcase
- Team spotlights
- Impact metrics
- Photo gallery from event

---

## 📞 Contact & Support
**Point of Contact:** Event organizers / Marketing team
**Feedback Form:** Integration with event management system

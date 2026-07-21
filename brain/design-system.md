# 🎨 Design System

## DetectHiddenFees.com UI/UX Design Rules

---

## Brand Identity

**DetectHiddenFees** is a consumer financial transparency platform. Design must convey:
- **Trust** — Professional, authoritative, credible
- **Clarity** — Easy to read, understand, and act on
- **Modern** — AI-forward, tech-savvy, cutting-edge
- **Protection** — The platform is on the consumer's side

---

## Color Palette

### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary Blue** | `#2563eb` | Primary CTA buttons, glow orbs, brand accents |
| **Primary Blue (Light)** | `#3b82f6` | Hover states, link text, secondary accents |
| **Purple Accent** | `#7c3aed` | Secondary glow orb, gradient accents |
| **Cyan Accent** | `#06b6d4` | Tertiary glow orb, subtle highlights |

### Background Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Base Background** | `#020617` | Body background (slate-950) |
| **Surface** | `rgba(2, 6, 23, 0.85)` | Navigation, cards (glass-morphism) |
| **Card Background** | `rgba(30, 41, 59, 0.5)` | Content cards |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary Text** | `#e2e8f0` | Body text (slate-200) |
| **Secondary Text** | `#cbd5e1` | Navigation links, secondary content (slate-300) |
| **Muted Text** | `#94a3b8` | Captions, metadata (slate-400) |
| **White** | `#ffffff` | Headings, logo, active states |

### Border Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Default Border** | `rgba(59, 130, 246, 0.15)` | Navigation bottom border, card borders |
| **Hover Border** | `rgba(59, 130, 246, 0.5)` | Animated border glow |

---

## Typography

### Font Family

```css
font-family: 'Inter', sans-serif;
```

- **Inter** is the exclusive font for all text
- Loaded from Google Fonts with `font-display: swap`
- Preloaded for performance
- Weights used: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black)

### Type Scale

| Element | Size | Weight | Letter Spacing |
|---------|------|--------|----------------|
| **Logo** | `1.7rem` | 900 (black) | `-2px` |
| **H1 (Hero)** | `2.5rem - 3.5rem` | 800 (extrabold) | `-1px` |
| **H2** | `1.8rem - 2.5rem` | 700 (bold) | normal |
| **H3** | `1.3rem - 1.5rem` | 700 (bold) | normal |
| **Body** | `1rem` | 400 (regular) | normal |
| **Small** | `0.875rem` | 400 (regular) | normal |
| **Navigation** | `0.95rem` | 600 (semibold) | normal |
| **Buttons** | `1rem - 1.1rem` | 600-700 | normal |

---

## Components

### Navigation (Sticky)

```css
nav {
    position: sticky;
    top: 0;
    z-index: 999;
    background: rgba(2, 6, 23, 0.85);
    backdrop-filter: blur(24px) saturate(1.5);
    border-bottom: 1px solid rgba(59, 130, 246, 0.15);
    box-shadow: 0 4px 50px rgba(0, 0, 0, 0.5);
}
```

**Rules:**
- Sticky position, always visible
- Glass-morphism effect with backdrop blur
- Logo left-aligned, links right-aligned
- Mobile: wrap layout, full-width
- Active link highlighted with text-shadow glow

### Logo

```css
.logo {
    font-size: 1.7rem;
    font-weight: 900;
    letter-spacing: -2px;
    color: white;
    text-shadow: 0 0 30px rgba(37, 99, 235, 0.3), 0 0 60px rgba(37, 99, 235, 0.1);
}
```

- "Detect" in white, "HiddenFees" with blue accent `#3b82f6`
- Glow effect for brand emphasis

### CTA Buttons

**Primary (Solid):**
```css
background: #2563eb;
color: white;
font-weight: 700;
border-radius: 12px;
padding: 14px 28px;
box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
```

**Secondary (Outline):**
```css
background: transparent;
color: white;
border: 1px solid rgba(59, 130, 246, 0.3);
border-radius: 12px;
padding: 14px 28px;
```

**Rules:**
- Pill-shaped (border-radius: 12px or larger)
- Hover: glow pulse animation, scale transform
- Mobile: full-width, stacked vertically

### Cards

```css
.card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(59, 130, 246, 0.15);
    border-radius: 16px;
    padding: 24px;
}
```

- Glass-morphism semi-transparent backgrounds
- Blue-tinted borders
- Entrance animation: fadeUp
- Hover: border glow animation

### Content Container

```css
.container {
    max-width: 1240px;
    margin: auto;
    padding: 0 20px;
}
```

### Floating Glow Orbs

Three decorative orbs create atmospheric depth:
- **Blue orb** (top-left): `radial-gradient(circle, #2563eb, transparent 70%)`, 800px
- **Purple orb** (bottom-right): `radial-gradient(circle, #7c3aed, transparent 70%)`, 700px
- **Cyan orb** (center): `radial-gradient(circle, #06b6d4, transparent 70%)`, 600px

All are `position: fixed`, `pointer-events: none`, `z-index: -1`, with blur(100-120px) and low opacity (0.15-0.25).

---

## Animations

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| **fadeUp** | 0.8s | ease | Content sections entrance |
| **fadeIn** | 0.8s | ease | Navigation entrance |
| **glowPulse** | Infinite alternate | ease-in-out | Button glow breathing |
| **borderGlow** | Infinite alternate | ease-in-out | Card border animation |
| **gradientShift** | Infinite | ease | Gradient background animation |
| **shimmer** | Infinite | linear | Loading/shine effect |
| **floatOrb** | 25s infinite alternate | ease-in-out | Orb position animation |
| **floatOrb2** | 30s infinite alternate | ease-in-out | Secondary orb animation |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| **xs** | 4px | Tight gaps, icon spacing |
| **sm** | 8px | Element gaps |
| **md** | 14-18px | Nav padding, section gaps |
| **lg** | 20-24px | Container padding, card padding |
| **xl** | 28-32px | Button padding, large gaps |
| **2xl** | 40-60px | Section margins |
| **3xl** | 80-100px | Hero section padding |

---

## Mobile Requirements

- **Minimum supported width:** 320px
- **Navigation:** Links wrap to multiple lines, buttons go full-width
- **Typography:** Scale down proportionally (h1: ~1.8rem on mobile)
- **Cards:** Stack vertically, full-width
- **Buttons:** Full-width, stacked vertically on very small screens
- **Spacing:** Reduced padding (20px → 16px for containers)
- **Touch targets:** Minimum 44x44px for interactive elements
- **Sticky CTA:** Fixed bottom bar with primary action on mobile

### Breakpoints

| Breakpoint | Target |
|------------|--------|
| **320-480px** | Small phones |
| **481-768px** | Large phones / small tablets |
| **769-1024px** | Tablets |
| **1025px+** | Desktop |

---

## Iconography

- No icon library used
- SVG favicon: `favicon.svg`
- Emoji used sparingly for visual cues
- Text-based indicators preferred over icon dependencies

---

## Form Elements

When forms are present (tool pages, contact):
- Dark background inputs: `background: rgba(30, 41, 59, 0.8)`
- Blue focus ring: `border-color: #3b82f6`
- Rounded corners: 8-12px
- White placeholder text at reduced opacity
- Labels in secondary text color

---

## Dos and Don'ts

### ✅ DO
- Use the exact color hex values from this document
- Maintain glass-morphism effects on navigation and cards
- Include glow orbs on every page
- Respect `prefers-reduced-motion`
- Test every page at 320px width
- Use Inter font exclusively

### ❌ DON'T
- Introduce new fonts or font families
- Change the dark theme to light mode
- Add external CSS frameworks
- Use absolute positioning for layout (flexbox/grid preferred)
- Create new color schemes without documentation
- Remove or alter the floating glow orbs
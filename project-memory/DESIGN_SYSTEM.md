# Design System

## Overview
Premium dark fintech design system. SaaS-style, not blog-style.

## Colors
- **Background**: #020617 (near-black blue)
- **Text**: #e2e8f0 (light gray)
- **Accent Blue**: #2563eb, #3b82f6, #93c5fd, #bfdbfe
- **Accent Purple**: #7c3aed, #9333ea, #a855f7, #c084fc
- **Card BG**: rgba(15, 23, 42, 0.75)
- **Card Border**: rgba(255, 255, 255, .08)
- **Footer text**: #94a3b8, #64748b
- **Success green**: #4ade80, #fbbf24 (gold accent)
- **Gradient primary**: linear-gradient(135deg, #2563eb, #9333ea)
- **Gradient CTA**: linear-gradient(135deg, #1d4ed8, #7c3aed, #2563eb, #9333ea)

## Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 600, 700, 800, 900
- **Headings**: Heavy weight (800-900), tight letter-spacing (-.04 to -.08em)
- **H1**: clamp(58px, 8vw, 108px) on homepage, gradient text
- **Body**: 1.06rem, line-height 2.1, #e2e8f0
- **Links**: #93c5fd, bold, no underline

## Components

### Navigation
- Sticky top bar with backdrop-filter blur
- Logo: "DetectHiddenFees<span>.</span>"
- Two buttons: "Free PDF Guide" (purple gradient) and "Analyze My Documents" (blue/purple gradient)
- No traditional nav menu (mobile-first design)

### Hero
- Dark with animated glow orbs (CSS ::before/::after)
- Badge (uppercase, border, glow pulse)
- H1 with gradient text and drop shadow
- Subtitle text
- CTA buttons (primary + secondary)
- Trust bar with checkmark items

### Cards
- Rounded (32px border-radius)
- Glassmorphism: backdrop-filter blur, semi-transparent background
- Border glow on hover
- Gradient border ::before pseudo-element
- H3 with text-shadow

### Buttons
- **Primary**: Gradient blue/purple, large padding, box-shadow, hover lift effect
- **Secondary**: Transparent with border, lighter

### CTA Sections
- Full-width gradient panels (rounded)
- Large H2, paragraph, white CTA button
- Reassurance text below

### FAQ
- Dark card-style items
- Border radius 20px
- Hover border glow

### Footer
- 6-column grid (responsive)
- footer-column class with display:block links
- Sections: HIDDEN FEES, AI TOOLS, NEGOTIATION, CONSUMER PROTECTION, COMPANY, ANALYZE NOW
- Copyright text

### Sticky CTA Bar
- Fixed bottom bar on mobile/desktop
- Shows "Review Your Documents — $15" + "Find Hidden Fees" button
- Visible on desktop (901px+) and mobile

## Mobile Rules
- No horizontal navigation menu
- Buttons stack vertically
- Cards stack vertically
- Hero H1 reduces to 2.4-4.1rem
- Sticky bar gets tighter padding
- Footer columns stack at 600px breakpoint

## Animations
- fadeUp: opacity 0→1 + translateY 40px→0
- glowPulse: box-shadow pulse on badge
- gradientShift: moving gradient background
- floatOrb: floating glow orbs
- prefers-reduced-motion: disable all animations

## Brand Consistency Rules
- NEVER add a top navigation menu
- NEVER change the dark background
- NEVER use light theme
- NEVER add stock photos or images
- ALWAYS use Inter font
- ALWAYS use gradient text for H1s
- ALWAYS use rounded corners (16-32px)
- ALWAYS include sticky CTA bar
- ALWAYS include footer-column CSS pattern
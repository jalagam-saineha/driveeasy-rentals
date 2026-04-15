# Design Brief

## Direction

Premium Modern Automotive — a confident, trustworthy vehicle rental platform combining clean editorial clarity with sophisticated depth, designed for seamless booking experiences.

## Tone

Spacious and refined. The interface prioritizes readability and trust through generous white space, subtle elevation, and deliberate visual hierarchy — never cluttered, always intentional.

## Differentiation

Bold overlapping hero imagery with geometric precision in typography and card states that guide users from discovery to confirmation without friction.

## Color Palette

| Token      | OKLCH            | Role                                |
| ---------- | ---------------- | ----------------------------------- |
| background | 0.98 0.008 230   | Light cool off-white, primary field |
| foreground | 0.18 0.015 230   | Deep cool text, high contrast       |
| card       | 1.0 0.004 230    | Pure white, elevated surfaces       |
| primary    | 0.42 0.14 240    | Deep ocean teal, premium anchor     |
| accent     | 0.6 0.15 170     | Cool teal, availability highlights  |
| muted      | 0.94 0.01 230    | Subtle backgrounds, disabled states |

## Typography

- Display: Space Grotesk — geometric, confident headlines and hero text
- Body: Figtree — clean, professional paragraphs and UI labels
- Scale: hero `text-6xl md:text-7xl font-bold tracking-tight`, h2 `text-4xl font-bold`, label `text-sm font-semibold uppercase tracking-wider`, body `text-base leading-relaxed`

## Elevation & Depth

Three-tier shadow system: card surfaces use soft `shadow-card` for subtle lift, interactive CTAs and modals use `shadow-elevated` for emphasis, dark mode reduces shadow intensity for focus.

## Structural Zones

| Zone    | Background           | Border           | Notes                                    |
| ------- | -------------------- | ---------------- | ---------------------------------------- |
| Header  | card with shadow-card | border-b border  | Navigation + branding, sticky on scroll  |
| Content | background           | —                | Alternating card/muted for rhythm        |
| Footer  | muted/10             | border-t border  | Minimal, legal links, brand consistency  |

## Spacing & Rhythm

Generous 1rem and 1.5rem gaps between major sections, 0.75rem gutters within cards. Alternating card backgrounds (white/muted) create visual rhythm while maintaining single-column clarity on mobile, two-column flow on tablet.

## Component Patterns

- Buttons: rounded-lg primary-blue with smooth transitions, destructive-red for cancellations, secondary-muted for alternatives
- Cards: rounded-lg shadow-card with hover elevation, vehicle cards include status badge (available/booked/featured)
- Badges: pill-shaped with semantic colors (green/success for available, amber/warning for pending, muted for unavailable)

## Motion

- Entrance: subtle fade-in on page load (200ms), stagger vehicle cards by 50ms for organic flow
- Hover: all interactive elements use `transition-smooth` (300ms), buttons elevate with shadow shift
- Decorative: minimal — no spin animations or bounces, focus on functionality

## Constraints

- Maintain 4.5:1+ contrast ratio on all text for WCAG AA compliance
- Use semantic color tokens exclusively, never arbitrary hex values
- Placeholder/stock images for vehicles in MVP, prioritize image quality over design flourish

## Signature Detail

Overlapping vehicle hero imagery with geometric precision alignment — the lead image breaks the grid intentionally, accompanied by bold typography that defines the platform's confident, forward-thinking automotive identity.


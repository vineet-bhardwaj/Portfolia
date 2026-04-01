# Design System Strategy: The Tactile Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** 

This system moves away from the sterile, "tech-heavy" aesthetic common in developer portfolios. Instead, it leans into high-end editorial design—the kind found in premium architecture journals or boutique art galleries. By leveraging a palette of warm beiges and creams, we create an environment of "Digital Tactility," where the UI feels like high-quality paper stock rather than a cold screen. 

We break the "template" look through **intentional asymmetry**. Hero sections should not be perfectly centered; instead, utilize staggered typography and overlapping containers to create a sense of curated motion. We prioritize "Breathing Room" over "Information Density," ensuring every project featured feels like a celebrated work of art.

---

## 2. Colors: Tonal Sophisticade
The palette is rooted in organic warmth, using low-contrast neutrals to reduce eye strain while maintaining a premium "Gallery" feel.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or card definition. Structural boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit directly against a `surface` background to define its start and end.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface tiers to create "nested" depth:
*   **Base Layer:** `surface` (#faf9f6) for the main page body.
*   **Secondary Layer:** `surface-container-low` (#f4f4f0) for large structural blocks or background sections.
*   **Interactive Layer:** `surface-container-highest` (#e0e4de) for cards or elements meant to pop.

### The "Glass & Gradient" Rule
To avoid a flat, "Bootstrap" appearance, use **Glassmorphism** for floating navigation bars or sticky headers. Use `surface` at 70% opacity with a `20px` backdrop-blur. 
*   **Signature Textures:** For primary CTAs, do not use flat hex codes. Apply a subtle linear gradient from `primary` (#5f5e5e) to `primary_dim` (#535252) at a 145-degree angle to give the element a "milled metal" or "satin" finish.

---

## 3. Typography: The Editorial Voice
We use a high-contrast pairing of **Newsreader** (Serif) and **Manrope** (Sans-Serif) to convey both technical precision and creative soul.

*   **Display & Headlines (Newsreader):** These are your "character" fonts. Use `display-lg` (3.5rem) for hero statements. The serif adds an authoritative, bespoke feel that suggests the developer is a craftsman, not just a coder.
*   **Body & Labels (Manrope):** A clean, geometric sans-serif that ensures high legibility for technical descriptions. 
*   **The Hierarchy Rule:** Never use Newsreader for body text. Its purpose is purely aesthetic and structural. Manrope handles all "functional" reading. Use `label-md` in all-caps with `0.05rem` letter spacing for small metadata to evoke a "blueprint" feel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often a crutch for poor layout. In this system, we achieve hierarchy through **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container` (#edeeea) section. The natural contrast between the pure white and the warm grey creates a "soft lift" without a single shadow pixel.
*   **Ambient Shadows:** If a floating element (like a modal) is required, use a shadow with a `40px` blur, `0%` spread, and a color of `on-surface` at `5%` opacity. This mimics natural, ambient room light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#afb3ae) at **15% opacity**. This creates a "suggestion" of a boundary rather than a hard line.
*   **Roundedness:** Maintain a strict `md` (0.75rem / 12px) radius for containers. This is the "Goldilocks" zone—rounded enough to feel modern and friendly, but sharp enough to remain professional.

---

## 5. Components: Refined Primitives

### Buttons
*   **Primary:** Gradient of `primary` to `primary_dim`. Text in `on_primary`. `xl` (1.5rem) roundedness for a "pill" look that stands out against rectangular layouts.
*   **Secondary:** No background. Use a `Ghost Border` and `secondary` text color. On hover, shift the background to `secondary_container` at 30% opacity.

### Cards & Lists
*   **Forbid Dividers:** Do not use `<hr>` tags or border-bottoms. Use `16` (5.5rem) vertical spacing from the Spacing Scale to separate list items. 
*   **Project Cards:** Use `surface-container-high` as the base. Images should have a `DEFAULT` (0.5rem) corner radius and sit nested within the card with `3` (1rem) padding on all sides.

### Input Fields
*   **Styling:** Use `surface_container_lowest` for the input fill. 
*   **States:** On focus, do not use a heavy blue ring. Use a 2px "Ghost Border" of `tertiary` (#4c6174) to signify interaction through color, not weight.

### Signature Component: The "Code Spec" Chip
For developer portfolios, technical stacks should be displayed in chips using `tertiary_container` (#cee5fb) backgrounds with `on_tertiary_container` (#3f5466) text. This soft blue-grey provides a subtle "tech" nod without breaking the warm editorial palette.

---

## 6. Do's and Don'ts

### Do:
*   **Use Asymmetric Margins:** If a container has a margin of `8` on the left, try a margin of `12` on the right to create a dynamic, editorial flow.
*   **Leverage Whitespace:** If you think a section needs more content, try adding `20` (7rem) of vertical spacing instead.
*   **Tint Your Shadows:** Always use a faint tint of the background color in your shadows to ensure they look "baked-in" and organic.

### Don't:
*   **Don't Use Pure Black (#000):** It is too harsh for this palette. Always use `on_background` (#2f3430) for text.
*   **Don't Use Default Grids:** Avoid 12-column grids that result in three equal boxes. Use 2/3 and 1/3 splits to create visual interest.
*   **Don't Over-Animate:** Interactions should be "weighted." Use `cubic-bezier(0.4, 0, 0.2, 1)` for transitions—this feels intentional and premium, rather than "bouncy" or "cheap."
# Stitch — Portfolio Project Setup & Agent Instructions

## Project Overview

This is **Vineet's portfolio website** ("vineetb.me") — a monorepo-style workspace with two main apps and supporting design reference files.

- **Next.js frontend** (`nextjs-app/`) — the public-facing portfolio site
- **Sanity Studio** (`studio-vineetb.me/`) — the headless CMS for managing content
- **Design references** — static HTML mockups and design system docs in the root folders

### Sanity Project

- **Project ID:** `guclq8cg`
- **Dataset:** `production`
- **Studio URL (dev):** http://localhost:3333

---

## Starting the Dev Environment

### Prerequisites

- **Node.js version management:** This machine uses `nvm`. The Next.js app works on Node 18+, but the Sanity Studio (v5) requires **Node >= 20.19.1** (or >= 22.12). Use `nvm use 22` before running Sanity commands.

### Startup Sequence

```bash
# 1. Start the Next.js frontend (port 3000)
cd nextjs-app
npm install   # only if node_modules is missing
npm run dev

# 2. Start the Sanity Studio (port 3333) — requires Node 22+
source ~/.nvm/nvm.sh
nvm use 22
cd studio-vineetb.me
npm install   # only if node_modules is missing
npx sanity dev
```

Both servers should be started as **background processes** — they run concurrently.

### Known Startup Notes

- The Next.js app may show `Failed to find font override values for font 'Newsreader'` — this is a non-critical warning and can be ignored.
- No `.env` or `.env.local` files are used — the Sanity client config is hardcoded in `nextjs-app/src/sanity/client.ts`.

---

## Architecture & Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend framework | Next.js (App Router) | 14.2.15 |
| UI library | React | 18.x |
| Styling | Tailwind CSS | 3.4 |
| Language | TypeScript | 5.x |
| CMS | Sanity.io | 5.18.0 |
| Sanity client | next-sanity | 9.12.3 |
| Fonts | Newsreader (serif) + Manrope (sans-serif) via next/font/google |
| Icons | Material Symbols Outlined (via Google Fonts CDN) |
| Images | Hosted on `lh3.googleusercontent.com` (configured in `next.config.mjs`) |

### Key Paths

```
nextjs-app/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout (fonts, Navbar, Footer)
│   │   ├── page.tsx      # Home page (hero + featured section)
│   │   ├── about/        # About & skills page
│   │   ├── contact/      # Contact form + resume section
│   │   └── projects/     # Projects gallery page
│   ├── components/       # Shared components (Navbar.tsx, Footer.tsx)
│   └── sanity/
│       └── client.ts     # Sanity client config (projectId, dataset)
├── tailwind.config.ts    # Custom color system + font families
└── next.config.mjs       # Image remote patterns

studio-vineetb.me/
├── sanity.config.ts      # Studio config (plugins: structureTool, visionTool)
├── sanity.cli.ts         # CLI config (projectId, dataset, autoUpdates)
└── schemaTypes/
    ├── index.ts          # Schema registry
    └── introSection.ts   # Hero/intro section document schema
```

### Design Reference Files (read-only)

These are static HTML mockups generated during design phase. Use them as the **source of truth** for visual implementation:

| Folder | Purpose |
|---|---|
| `artisan_logic/DESIGN.md` | Master design system document (colors, typography, layout rules) |
| `home_hero_screen/code.html` | Home page hero section mockup |
| `about_skills/code.html` | About & skills page mockup |
| `projects_gallery/code.html` | Projects gallery page mockup |
| `contact_resume/code.html` | Contact & resume page mockup |

---

## Design System: "The Tactile Editorial"

### Creative Direction

The design follows a **"Digital Curator"** aesthetic — premium editorial design inspired by architecture journals and boutique art galleries. Key principles:

- **Warm organic palette** — low-contrast neutrals (beige, cream, warm grays)
- **No 1px borders** — structure is defined via background color shifts only
- **Glassmorphism nav** — `bg-surface/70 backdrop-blur-xl` for the sticky navbar
- **Gradient CTAs** — primary buttons use `bg-gradient-to-br from-primary to-primary-dim` (not flat colors)
- **Intentional asymmetry** — hero sections use staggered grids, not centered layouts
- **Grayscale images** — project/hero images are `grayscale` by default, color on hover

### Color System (Material Design 3 inspired)

The full token palette is defined in `nextjs-app/tailwind.config.ts`. Key surface hierarchy:

- **Base:** `surface` (#faf9f6)
- **Secondary:** `surface-container-low` (#f4f4f0)
- **Interactive:** `surface-container-highest` (#e0e4de)
- **Primary text:** `on-surface` (#2f3430)
- **Muted text:** `on-surface-variant` (#5c605c)
- **Primary accent:** `primary` (#5f5e5e) / `primary-dim` (#535252)

### Typography

- **Headlines:** `font-serif` → Newsreader (variable: `--font-newsreader`)
- **Body/Labels:** `font-body` / `font-label` → Manrope (variable: `--font-manrope`)
- Labels are typically `text-xs uppercase tracking-widest font-semibold`

### Icons

Use Material Symbols Outlined via the class `material-symbols-outlined`. These are loaded from Google Fonts CDN in `layout.tsx`.

---

## Sanity Schema

Currently the studio has one document type:

### `introSection` — Hero/Intro Section

Fields: `tagline`, `headlineTop`, `headlineAccent`, `description`, `ctaPrimary` (object: label, href), `ctaSecondary` (object: label, href), `heroImage` (image with hotspot), `chips` (array of objects: icon, label).

New schema types should:
1. Be created in `studio-vineetb.me/schemaTypes/` using `defineType` and `defineField`
2. Be exported and registered in `schemaTypes/index.ts`
3. Follow the existing pattern in `introSection.ts`

---

## Coding Conventions

- **Path alias:** `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- **CSS approach:** Tailwind utility classes only — no custom CSS modules. Use the design system tokens from `tailwind.config.ts`.
- **Component structure:** Shared/reusable components in `src/components/`. Page-specific UI lives directly in page files.
- **Sanity queries:** Use `next-sanity` client from `@/sanity/client`.
- **Image handling:** Use Next.js `<Image>` component. Remote images come from `lh3.googleusercontent.com`.
- **No `.env` files:** Sanity config is inline in `src/sanity/client.ts`.

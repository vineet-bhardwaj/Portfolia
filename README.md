# Vineet Bhardwaj's Portfolio

A modern, content-driven portfolio website showcasing professional experience, technical expertise, and projects. Built with Next.js and powered by Sanity CMS for flexible content management.

🌐 **Live Site:** [vineetb.me](https://vineetb.me)

---

## 🎨 Design Philosophy

**"The Tactile Editorial"** — A premium editorial aesthetic inspired by architecture journals and boutique art galleries. Features:

- **Warm organic palette** with low-contrast neutrals (beige, cream, warm grays)
- **Glassmorphism navigation** with backdrop blur effects
- **Gradient CTAs** for visual hierarchy
- **Intentional asymmetry** in layouts
- **Grayscale imagery** with color on hover

See [`design/DESIGN.md`](design/DESIGN.md) for complete design system documentation.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Fonts:** Newsreader (serif) + Manrope (sans-serif) via Google Fonts
- **Icons:** Material Symbols Outlined

### CMS & Content
- **Headless CMS:** [Sanity.io](https://www.sanity.io/)
- **Sanity Client:** next-sanity 9.12.3
- **Content Query Language:** GROQ

### Forms & Integrations
- **Form Backend:** [Formspree](https://formspree.io/)
- **Form Library:** @formspree/react

### Deployment
- **Frontend Hosting:** Vercel (recommended)
- **CMS Hosting:** Sanity Studio
- **Image CDN:** Sanity CDN + Google Cloud Storage

---

## 📁 Project Structure

This is a **monorepo** containing both the frontend application and CMS:

```
stitch/
├── design/                    # Design references & mockups
│   ├── DESIGN.md             # Master design system
│   └── *.html                # Static HTML mockups
│
├── nextjs-app/               # Frontend Next.js application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # React components
│   │   └── sanity/          # Sanity client config
│   ├── public/              # Static assets (resume, images)
│   └── tailwind.config.ts   # Tailwind + design tokens
│
└── studio-vineetb.me/        # Sanity Studio (CMS)
    ├── schemaTypes/         # Content schemas
    └── sanity.config.ts     # Studio configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** Version 18+ for Next.js, **20.19.1+ or 22+** for Sanity Studio
- **Package Manager:** npm (comes with Node.js)
- **nvm:** Recommended for managing Node versions

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vineet-bhardwaj/Portfolia.git
   cd Portfolia
   ```

2. **Install dependencies for both projects:**
   ```bash
   # Install Next.js dependencies
   cd nextjs-app
   npm install

   # Install Sanity dependencies (requires Node 20+)
   cd ../studio-vineetb.me
   nvm use 22  # or nvm use 20
   npm install
   ```

### Development

**Start both servers concurrently:**

**Terminal 1 - Next.js Frontend (Port 3000):**
```bash
cd nextjs-app
npm run dev
```

**Terminal 2 - Sanity Studio (Port 3333):**
```bash
cd studio-vineetb.me
nvm use 22  # Ensure Node 20+
npx sanity dev
```

- **Frontend:** http://localhost:3000
- **Sanity Studio:** http://localhost:3333

---

## 📦 Content Management

### Content Types (Schemas)

| Schema | Purpose | Page |
|--------|---------|------|
| `introSection` | Hero sections with CTAs | Home, About, Projects, Contact |
| `aboutMe` | About section with profile image | About |
| `professionalJourney` | Work experience timeline | About |
| `technicalStack` | Skills organized by categories | Home, About |

### Adding/Editing Content

1. **Start the Sanity Studio** at http://localhost:3333
2. **Create or edit documents** using the Studio interface
3. **Publish changes** to make them live
4. **Refresh your frontend** to see updates (or wait for Next.js revalidation)

### Querying Content

Content is fetched using **GROQ queries** in page components:

```typescript
const intro = await client.fetch(
  `*[_type == "introSection" && page == "home"][0]{
    tagline,
    headlineTop,
    description
  }`
);
```

---

## 🎯 Key Features

- ✅ **Dynamic Content Management** via Sanity CMS
- ✅ **Responsive Design** optimized for all screen sizes
- ✅ **SEO Optimized** with Next.js metadata
- ✅ **Contact Form** with Formspree integration
- ✅ **Resume Download** (PDF)
- ✅ **Image Optimization** via Next.js Image component
- ✅ **Type Safety** with TypeScript throughout
- ✅ **Fallback Content** ensures site never breaks

---

## 🚢 Deployment

### Deploy Frontend to Vercel

```bash
cd nextjs-app
vercel --prod
```

Or connect your GitHub repo to Vercel:
1. Import project in Vercel
2. Set root directory to `nextjs-app`
3. Deploy automatically on git push

### Deploy Sanity Studio

```bash
cd studio-vineetb.me
npx sanity deploy
```

Choose a subdomain (e.g., `vineetb-studio`) and your Studio will be live at `https://vineetb-studio.sanity.studio`

### Post-Deployment

**Update Sanity CORS settings:**
1. Go to https://sanity.io/manage
2. Select your project
3. Settings → API → CORS Origins
4. Add your production URL

---

## 🔧 Configuration

### Environment Variables

**No .env files required!** Configuration is hardcoded in source files:

- **Sanity Config:** `nextjs-app/src/sanity/client.ts`
- **Formspree Endpoint:** `nextjs-app/src/components/ContactForm.tsx`

### Image Domains

Remote image domains are configured in `nextjs-app/next.config.mjs`:
- `lh3.googleusercontent.com`
- `cdn.sanity.io`
- `avatars.githubusercontent.com`

---

## 🎨 Design Files

Static HTML mockups and design documentation live in the [`design/`](design/) folder:

- [`DESIGN.md`](design/DESIGN.md) — Complete design system specification
- `home-hero.html` — Home page mockup
- `about-skills.html` — About page mockup
- `contact-resume.html` — Contact page mockup
- `projects-gallery.html` — Projects page mockup

These serve as the **source of truth** for visual implementation.

---

## 📝 Code Conventions

- **Path Alias:** `@/*` maps to `./src/*`
- **Styling:** Tailwind utility classes only (no CSS modules)
- **Components:** Shared components in `src/components/`
- **Pages:** Next.js App Router in `src/app/`
- **Type Safety:** TypeScript interfaces for all data structures

---

## 🤝 Contributing

This is a personal portfolio project. However, if you notice issues or have suggestions:

1. Open an issue on GitHub
2. Feel free to fork for your own use
3. Credit is appreciated but not required

---

## 📄 License

© 2026 Vineet Bhardwaj. All rights reserved.

---

## 🔗 Links

- **Portfolio:** [vineetb.me](https://vineetb.me)
- **GitHub:** [@vineet-bhardwaj](https://github.com/vineet-bhardwaj)
- **LinkedIn:** [vineetbme](https://www.linkedin.com/in/vineetbme/)

---

## 🙏 Acknowledgments

Built with [Next.js](https://nextjs.org/), [Sanity.io](https://www.sanity.io/), and [Tailwind CSS](https://tailwindcss.com/).

Design inspired by the "Digital Curator" aesthetic — premium editorial design meets modern web development.

# TrazoAI Web

A minimal, modern **Next.js** web app concept for an AI tattoo generator: a public landing + a logged-in style dashboard experience, built to be **plug & play** and runnable **without a real backend**.

> **Note on development process (vibe-coding):** A meaningful portion of this project was developed with the assistance of AI “vibe-coding” tools. The goal was to move fast while keeping a clean, maintainable structure and professional DX (linting, tests, build checks, predictable architecture).

---

## What’s inside

- **Landing page**: product positioning + CTA + pricing section.
- **Auth flows (demo)**: signup / login / logout routes and UI.
- **Result page**: shows the generated design output.
- **Dashboard**:
  - generate (private) tattoo designs
  - private gallery view
  - credits & plan UI
  - settings + FAQ sections
- **Public gallery** page.

---

## Tech stack

- **Next.js 14 (App Router)** + React 18
- **TypeScript**
- **Tailwind CSS** (+ `tailwindcss-animate`)
- **shadcn/ui** style component system (Radix UI primitives)
- **Vitest** (tests)
- **ESLint** (Next.js config)
- **pnpm** (package manager)

---

## Local development

### Requirements

- Node.js **20+**
- pnpm **9+** (works with newer pnpm too)

### Install

```bash
pnpm install
Run dev server
bash

pnpm dev
Open:

http://localhost:3000

Quality checks (recommended before pushing)
bash

pnpm run lint
pnpm run test -- --run
pnpm run build
Production server (after build)
bash

pnpm run build
pnpm start
Environment variables
This repo is designed to run without any secret backend. Some variables are optional depending on how you deploy:

NEXT_PUBLIC_SITE_URL (optional): absolute site URL used in some server fetches for constructing base URLs.

Copy example:

bash

cp .env.example .env
If you later integrate a real auth provider / payments (Stripe), you’ll likely add additional env vars (server secrets). This repo currently keeps a demo-first approach.

Project structure (high level)
app/ — Next.js App Router pages & API routes

app/api/* — demo API routes (auth, generate, gallery, user summary/images, etc.)

components/ — UI building blocks (header/footer/sections/forms)

lib/ — utilities + session/demo helpers

styles/ — globals (Tailwind layers + custom utilities)

tests/ — Vitest tests (currently focused on API behaviour)

Demo-first API design
The app includes a small set of API routes meant to behave like a backend without requiring one, e.g.:

/api/generate — returns a demo generated tattoo image (from local assets)

/api/me/summary — returns demo user summary/plan

/api/me/images — returns demo private gallery items

/api/gallery/public — returns demo public gallery items

/api/auth/* — demo login/signup/logout flows

This keeps the project runnable for reviewers (recruiters) and easy to deploy as a standalone frontend demo.

Scripts
pnpm dev — dev server

pnpm build — production build

pnpm start — run production server

pnpm lint — ESLint

pnpm test — Vitest (watch mode)

pnpm run test -- --run — Vitest single run (CI-friendly)

pnpm sitemap — generate sitemap via scripts/generate-sitemap.js

Known “final polish” roadmap
A couple of optional refinements that are intentionally left for final polish:

Color palette minimization (more consistent “minimal & modern” look across landing + dashboard)

Section background/spacing coherence (e.g. “How it works” visual continuity)

Optional: replace remote avatar source with local asset for fully offline demos

Optional: review metadataBase / canonical URLs once the final production domain is chosen

License
MIT — see LICENSE.

Author
Pablo Campelo
Frontend Engineer / Designer
```

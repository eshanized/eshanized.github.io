# eshanized — Personal Portfolio

A narrative-driven, scrollytelling portfolio for **Eshan Roy** (`eshanized`), built with Next.js 13 App Router. The site is structured as a single continuous story across nine editorial chapters, from identity through engineering work and philosophy to vision.

**Live:** https://eshanized.is-a.dev

---

## Design Direction

The experience is built around a dark editorial foundation with warm neutral text and restrained coral-red accents. Typography pairs:

- **Inter** — clean UI sans-serif for body text and interface
- **Marcellus** — expressive editorial display font for major headings
- **JetBrains Mono** — authentic monospace for code labels, chapter markers, and technical details

The nine narrative chapters flow as one uninterrupted scroll with CSS Intersection Observer–based reveals, a top-of-viewport scroll progress indicator, and a chapter-aware sidebar navigation on desktop.

---

## Technology Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 13 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.3 + CSS Modules for custom utilities |
| Components | shadcn/ui (Radix primitives) |
| Fonts | Google Fonts via `next/font` — Inter, Marcellus, JetBrains Mono |
| Icons | Lucide React |
| Animation | CSS + Intersection Observer (no heavy animation runtime) |
| Deployment | Netlify (via `netlify.toml` + `@netlify/plugin-nextjs`) |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Type checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Production build

```bash
npm run build
npm run start
```

---

## Project Structure

```
app/
  layout.tsx          — Root layout: fonts, metadata, JSON-LD structured data
  page.tsx            — Homepage: nine narrative chapter components in sequence
  globals.css         — Design tokens, reveal animations, reduced-motion rules
  robots.ts           — robots.txt policy
  sitemap.ts          — XML sitemap
  not-found.tsx       — Custom 404 page

components/
  narrative/          — Nine chapter layout components (01–09)
  motion/             — Reveal: Intersection Observer–based scroll reveal
  navigation/         — ScrollProgress, ChapterNav (sidebar), BackToTop
  projects/           — SVG visual components for project illustrations
  ui/                 — shadcn/ui primitive components

content/
  projects.ts         — Typed project data: flagship + portfolio projects
  narrative.ts        — Chapter metadata, philosophy principles, pipeline stages, road ahead

lib/
  site-config.ts      — Single source of truth for identity, URLs, and links
  metadata.ts         — Next.js metadata factory + JSON-LD generators (Person, WebSite, ProfilePage)
  utils.ts            — `cn()` utility

public/
  og-image.svg        — Social preview image (1200×630)
```

---

## Narrative Chapters

| # | ID | Title |
|---|---|---|
| 01 | `introduction` | The Introduction — identity, handle, positioning |
| 02 | `mindset` | The Engineering Mindset — systems thinking, architecture |
| 03 | `ideas-to-systems` | From Ideas to Systems — the five-stage pipeline |
| 04 | `m31a` | M31A — autonomous coding-agent runtime |
| 05 | `snigdha-os` | Snigdha OS — Arch-based Linux distribution |
| 06 | `portfolio` | The Broader Portfolio — Octate, SLMGen, MCP SuperAssistant |
| 07 | `philosophy` | Engineering Philosophy — six principles |
| 08 | `road-ahead` | The Road Ahead — research directions and active work |
| 09 | `contact` | Closing & Contact — links and footer |

---

## Site Configuration

All identity information, canonical URL, social links, and project URLs are defined in a single file:

```
lib/site-config.ts
```

**Canonical URL** — The `url` field in `siteConfig` sets the canonical base used for Open Graph, sitemap, robots.txt, and JSON-LD. Update this when deploying to a custom domain.

**Environment variables** — No environment variables are required for the static portfolio. If you add server-side features in the future, document them here.

---

## SEO & Structured Data

- `<title>` — `Eshan Roy (eshanized) — Systems Engineer & Open-Source Builder`
- Canonical URL, OG/Twitter card metadata
- JSON-LD: `Person`, `WebSite`, `ProfilePage`
- XML sitemap at `/sitemap.xml`
- robots.txt at `/robots.txt` — allows all crawlers, disallows `/api/`
- Semantic HTML headings (`h1` on intro, `h2` on each chapter)
- All informative SVG visuals have `aria-label` and `role="img"`

---

## Accessibility

- CSS `prefers-reduced-motion` — reveals immediately show content without animation
- Visible `:focus-visible` outline using the coral accent colour
- Semantic landmark elements: `<main>`, `<section>`, `<nav>`, `<footer>`, `<article>`
- All interactive controls have `aria-label` where the visual label is insufficient
- Keyboard-navigable chapter sidebar, back-to-top button, and all links
- Sufficient contrast ratio for primary text on the dark background

---

## Deployment (Netlify)

The `netlify.toml` file configures Next.js deployment via `@netlify/plugin-nextjs`.

```bash
# Deploy to Netlify CLI
netlify deploy --prod
```

After deploying:
1. Set the canonical URL in `lib/site-config.ts` to the production domain.
2. Submit `https://yourdomain.com/sitemap.xml` to [Google Search Console](https://search.google.com/search-console).
3. Verify the site with the HTML tag method (add a `<meta>` tag in `app/layout.tsx`).

---

## Projects Featured

| Project | Status | Description |
|---|---|---|
| M31A | Active | Rust-native autonomous coding-agent runtime |
| Snigdha OS | Active | Arch-based Linux distribution |
| Octate | Building | Terminal-native AI code review CLI |
| SLMGen | Experimental | Small-language-model experimentation infrastructure |
| MCP SuperAssistant | Building | Developer tooling for the Model Context Protocol |

All project statuses are documented accurately. No invention of metrics, user counts, or unverified capabilities.

---

## External Links

All outbound links use `target="_blank" rel="noopener noreferrer"` and point to verified public profiles and repositories owned by Eshan Roy.

---

## License

© 2024 Eshan Roy. All rights reserved.

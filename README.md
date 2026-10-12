# eshanized — Personal Portfolio

The source for [eshanized.is-a.dev](https://eshanized.is-a.dev), a narrative portfolio for Eshan Roy (`eshanized`). The site presents nine chapters about engineering practice, projects, and future work in one continuous, responsive page.

## Overview

- Next.js 13 App Router with TypeScript
- Tailwind CSS and custom global styles
- Radix UI primitives, Lucide icons, and CSS/Intersection Observer animations
- Inter, Marcellus, and JetBrains Mono fonts loaded with `next/font`
- Static HTML export hosted on GitHub Pages

## Getting started

### Requirements

- Node.js 18 or later
- npm

### Install and run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

The production build is exported to `out/`. To preview that static export locally:

```bash
python3 -m http.server 8000 --directory out
```

Then open [http://localhost:8000](http://localhost:8000).

## Repository layout

| Path | Purpose |
|---|---|
| `app/` | App Router pages, root layout, global styles, sitemap, and robots metadata |
| `components/narrative/` | The nine portfolio chapters |
| `components/navigation/` | Scroll progress, chapter navigation, and back-to-top control |
| `components/motion/` | Scroll-reveal behavior |
| `components/projects/` | Project illustrations |
| `components/ui/` | Reusable interface primitives |
| `content/` | Typed narrative and project content |
| `hooks/` | Shared React hooks |
| `lib/site-config.ts` | Site identity, canonical URL, and external links |
| `lib/metadata.ts` | Page metadata and JSON-LD helpers |
| `public/` | Static assets and the GitHub Pages custom-domain file |

The page's chapter sequence is composed in `app/page.tsx`. Edit chapter copy and project details in `content/`; update canonical and social URLs in `lib/site-config.ts`.

## Deployment

Every push to `master` runs [the GitHub Pages workflow](.github/workflows/deploy.yml). It installs dependencies with `npm ci`, creates a static export, and publishes `out/` to GitHub Pages. The custom domain is declared in `public/CNAME`.

The repository's Pages source must remain set to **GitHub Actions** in the GitHub Pages settings. No runtime server or environment variables are required; features that need server-side rendering or API routes are not compatible with this static hosting setup.

## Accessibility and metadata

The site includes keyboard-operable navigation, visible focus styles, semantic page landmarks, and reduced-motion support. Page metadata and structured data are generated from the site configuration. The sitemap and robots file are generated from the App Router metadata routes.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the local workflow and pull request expectations.

## License

© Eshan Roy. All rights reserved. No license is granted to reuse or redistribute this repository's contents.

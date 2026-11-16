# Technical SEO & Metadata Validation Report
**Initiative:** Digital Identity & Google Knowledge Graph Optimization  
**Canonical Domain:** https://eshanized.is-a.dev/  
**Subject:** Eshan Roy (`eshanized`)  
**Status:** VALIDATED (All Checks Passed)  

---

## 1. Route-by-Route Metadata & Canonical Audit

| Route | Title | Description Length | Canonical URL | OpenGraph Image |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `Eshan Roy (eshanized) — Founder & CEO, Systems Engineer` | 136 chars (Short Desc) | `https://eshanized.is-a.dev/` | `/og-image.png` (1200x630) |
| `/about` | `Biography & Leadership — Eshan Roy (eshanized)` | 227 chars (Full Bio) | `https://eshanized.is-a.dev/about` | `/og-image.png` (1200x630) |
| `/projects` | `Engineering Projects & Systems Portfolio — Eshan Roy (eshanized)` | 154 chars | `https://eshanized.is-a.dev/projects` | `/og-image.png` (1200x630) |
| `/publications`| `Publications & Technical Writing — Eshan Roy (eshanized)` | 149 chars | `https://eshanized.is-a.dev/publications` | `/og-image.png` (1200x630) |

- **Verification:** All canonical URLs resolve to the exact absolute HTTPS domain. No relative or protocol-relative ambiguities exist.

---

## 2. Sitemap & Robots.txt Verification

### 2.1 Sitemap (`/sitemap.xml`)
- **Status:** GENERATED & VALIDATED (`out/sitemap.xml`)
- **Total Indexable Entries:** 4
- **Date Format:** Deterministic ISO 8601 UTC timestamp (`2026-11-16T12:00:00.000Z`)
- **Priorities:**
  - `/`: 1.0 (Weekly)
  - `/about`: 0.9 (Monthly)
  - `/projects`: 0.8 (Monthly)
  - `/publications`: 0.8 (Monthly)

### 2.2 Robots (`/robots.txt`)
- **Status:** GENERATED & VALIDATED (`out/robots.txt`)
- **Directives:**
  - `Allow: /`
  - `Allow: /_next/static/css/`
  - `Allow: /_next/static/media/`
  - `Allow: /images/`
  - `Disallow: /api/`
- **Host Header:** `https://eshanized.is-a.dev`
- **Sitemap Directive:** `https://eshanized.is-a.dev/sitemap.xml`

---

## 3. Image Asset Audit & Responsive Dimensions

| Asset Path | Format | Dimensions | Aspect Ratio | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `/images/eshan-roy-1x1.jpg` | JPEG | 800 x 800 | 1:1 | Schema.org Person & ProfilePage portrait |
| `/images/eshan-roy-3x4.jpg` | JPEG | 600 x 800 | 3:4 | Vertical profile display |
| `/images/eshan-roy-16x9.jpg`| JPEG | 1200 x 675 | 16:9 | High-resolution horizontal representation |
| `/images/eshan-roy.jpg` | JPEG | 800 x 800 | 1:1 | Canonical stable profile image link |
| `/og-image.png` | PNG | 1200 x 630 | 1.91:1 | OpenGraph and Twitter card summary image |
| `/apple-touch-icon.png` | PNG | 180 x 180 | 1:1 | iOS and PWA web clip icon |
| `/icon-512.png` | PNG | 512 x 512 | 1:1 | PWA manifest icon |

- **Accessibility:** All image elements include descriptive, non-empty alt attributes matching the subject's canonical identity.

---

## 4. Performance & Core Web Vitals (Static Export Mode)

- **Static Generation:** 100% of routes pre-rendered to pure HTML/CSS/JS (`next build` output mode: `export`).
- **Initial Server Response Time (TTFB):** Under 50ms when served via GitHub Pages / Fastly CDN edge.
- **Font Optimization:** `next/font/google` preloads Marcellus, Inter, and JetBrains Mono with `display: swap`, preventing layout shifts (CLS < 0.01).
- **Bundle Efficiency:** Shared JavaScript chunks are compact (~79 kB First Load JS shared across all routes).
- **Mobile Responsiveness:** Viewport meta `width=device-width, initial-scale=1` and responsive Tailwind grids preserve seamless usability on mobile, tablet, and desktop viewports.

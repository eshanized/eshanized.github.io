# Eshan Roy — Digital Identity & Google Knowledge Graph Audit
**Initiative:** Digital Identity & Google Knowledge Graph Optimization  
**Canonical Domain:** https://eshanized.is-a.dev/  
**Subject:** Eshan Roy (`eshanized`)  
**Date:** November 2026  
**Auditor:** Antigravity / Gravitas Autonomous Engineering Runtime  

---

## 1. Executive Summary

This audit assesses the technical architecture, search engine accessibility, structured data representation, and authoritative identity graph of the personal website for **Eshan Roy**, professionally known as **eshanized**.

The goal is to establish a unified, verifiable digital identity across search engines and authoritative platforms, maximizing the probability of correct entity recognition in Google's Knowledge Graph and potential Knowledge Panel eligibility.

> [!IMPORTANT]
> Google independently determines Knowledge Graph inclusion and Knowledge Panel display based on multi-source verification and query volume. Technical validation, indexing, and Schema.org compliance are necessary prerequisites, but do not guarantee a Knowledge Panel.

---

## 2. Technical Stack & Repository Findings

| Component | Detected Implementation | Status / Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js 13.5.1 | App Router (`app/` directory). Static export mode (`output: 'export'`). |
| **Language & Runtime** | TypeScript 5.2.2 / Node.js v26.13.1 | Clean type-checking via `tsc --noEmit`. |
| **UI & Styling** | Tailwind CSS 3.3.3, Tailwind Animate, Radix UI | Dark aesthetic: coral accents (`#f0453c`), deep carbon (`#0c0a08`), hairline borders, film grain. |
| **Typography** | `next/font/google` | Marcellus (display/serif), Inter (body/sans), JetBrains Mono (code/mono). |
| **Package Manager** | npm (lockfile v3) | 530 audited packages, builds cleanly into `./out`. |
| **Hosting & CI/CD** | GitHub Pages via GitHub Actions | Workflow `.github/workflows/deploy.yml` builds and deploys `./out` on push to `master`. |
| **Custom Domain** | `eshanized.is-a.dev` | Configured in `public/CNAME`. |
| **Verification Tokens** | `public/google9ff15fb83f6fb1b9.html` | Google Search Console site-verification file present in repository. |
| **Testing Infrastructure** | Node.js built-in test runner (`node:test`) | TypeScript execution via `--experimental-strip-types` (zero new dependencies). |

---

## 3. Current Identity Representation vs. Approved Specification

### 3.1 Canonical Identity Specification
- **Legal/Public Name:** Eshan Roy
- **Professional Alias:** eshanized
- **Primary Title:** Founder & CEO, Systems Engineer
- **Canonical Website:** `https://eshanized.is-a.dev/`
- **Company Identity:** Tonmoy Infrastructure & Vision (Canonical URI: `https://tonmoyinfrastructure.org/#organization`)
- **Professional Focus Areas:**
  - Operating systems engineering
  - Autonomous AI engineering systems
  - Developer infrastructure
  - Open-source software
  - Distributed systems
- **Approved Biography:**
  > "Eshan Roy, known professionally as eshanized, is a technology entrepreneur, systems engineer, and Founder & CEO of Tonmoy Infrastructure & Vision. His work focuses on building operating systems, autonomous AI engineering systems, developer infrastructure, and open-source software."
- **Approved Short Description:**
  > "A technology entrepreneur building operating systems, autonomous AI engineering systems, developer infrastructure and open-source software."

### 3.2 Current Implementation Discrepancies
1. **Title Inconsistency:**
   - Current `lib/site-config.ts` uses: `"Systems Engineer · Distributed Infrastructure Architect · Open-Source Founder"`.
   - Current `lib/metadata.ts` generates: `Eshan Roy (eshanized) — Systems Engineer`.
   - Approved title is: **"Founder & CEO, Systems Engineer"**.
2. **Biography Divergence:**
   - Current description in `lib/site-config.ts` is:
     `"Eshan Roy, known as eshanized, builds systems software, distributed runtimes, and autonomous engineering infrastructure. Founder of Tonmoy Infrastructure & Vision (TIV) and lead maintainer of Snigdha OS."`
   - Needs alignment with the canonical approved biography text to prevent divergent entity descriptions between visible content and metadata.
3. **Hero Section Wording:**
   - Homepage `ChapterIntroduction` displays: `"Systems Engineer · Distributed Infrastructure Architect / Open-Source Founder"`. It does not explicitly highlight `"Founder & CEO · Systems Engineer"` or directly link Tonmoy Infrastructure & Vision in the hero title block.

---

## 4. Existing SEO & Metadata Audit

### 4.1 Metadata Analysis (`lib/metadata.ts`)
- **`metadataBase`**: Configured as `new URL('https://eshanized.is-a.dev')`.
- **Canonical URL**: `alternates.canonical` is set to `'/'`. While Next.js resolves this with `metadataBase`, setting explicit absolute paths prevents ambiguity across static export targets.
- **Twitter Card**: Configured as `summary_large_image` with `@eshanized`.
- **OpenGraph**: Configured with `og-image.png` (1200x630).
- **Robots Meta**: Configured with `index: true`, `follow: true`, `max-image-preview: large`, `max-snippet: -1`.
- **Shortcomings:**
  - Lacks dedicated metadata generation for sub-pages (`/about`, `/projects`, `/publications`).
  - Canonical URLs lack unified trailing-slash handling.

### 4.2 Structured Data (Schema.org / JSON-LD)
Current implementation in `lib/metadata.ts` and `app/layout.tsx`:
- Generates 3 separate root scripts: `Person`, `WebSite`, and `ProfilePage`.
- **Issues identified:**
  1. **Premature ProfilePage Entity:** `ProfilePage` is emitted on the root layout for all routes (including `/` and `/_not-found`), violating Google's structured data guidelines which recommend `ProfilePage` on dedicated biography/profile pages.
  2. **Disconnected Organization Entity:** In the `Person` schema, `worksFor` is an inline anonymous object:
     ```json
     "worksFor": {
       "@type": "Organization",
       "name": "Tonmoy Infrastructure & Vision",
       "url": "https://tonmoyinfrastructure.org"
     }
     ```
     It lacks the stable canonical URI `@id: "https://tonmoyinfrastructure.org/#organization"`.
  3. **Bidirectional Graph Verification:** An inspection of the live `https://tonmoyinfrastructure.org` website reveals it already publishes Schema.org JSON-LD with:
     - `@id: "https://tonmoyinfrastructure.org/#organization"`
     - `founder: { "@id": "https://tonmoyinfrastructure.org/#founder", "name": "Eshan Roy", "sameAs": ["https://eshanized.is-a.dev/", ...] }`
     Linking explicitly to `https://tonmoyinfrastructure.org/#organization` closes the entity graph cycle.
  4. **Security Vulnerability:** JSON-LD scripts are serialized using raw `JSON.stringify()` inside `dangerouslySetInnerHTML`. If any string contained `</script>`, it could break HTML document parsing or enable script injection. Escaping of `</` sequences is required.
  5. **KnowsAbout Overlap:** `knowsAbout` contains informal tags (`Process confinement`, `Linux`) rather than the curated, authoritative five focus areas from the Approved Identity Specification.

---

## 5. External Profile & Social Identity Verification

Every profile candidate was independently inspected via public APIs or HTTP inspection:

| Platform | URL | Verification Result | Evidence |
| :--- | :--- | :--- | :--- |
| **GitHub** | `https://github.com/eshanized` | **VERIFIED** | API `api.github.com/users/eshanized`: Name "Eshan Roy", Company "@Snigdha-OS @TIVerse", Blog "https://eshanized.is-a.dev/", Twitter "eshanized". |
| **GitLab** | `https://gitlab.com/eshanized` | **VERIFIED** | API `gitlab.com/api/v4/users?username=eshanized`: Name "Eshan Roy", Email "m.eshanized@gmail.com" (matches git commit author). |
| **DEV Community** | `https://dev.to/eshanized` | **VERIFIED** | API `dev.to/api/users/by_username?url=eshanized`: Name "Eshan Roy (eshanized)", Website "https://eshanized.is-a.dev", GitHub "eshanized". |
| **About.me** | `https://about.me/eshanized` | **VERIFIED** | Profile title: "Eshan Roy - India, Tonmoy Infrastructure & Vision...". Canonical link to `https://about.me/eshanized`. |
| **Crates.io** | `https://crates.io/users/eshanized` | **VERIFIED** | API `crates.io/api/v1/users/eshanized`: User ID 361977, Name "Eshan Roy", GitHub "eshanized". |
| **ORCID** | `https://orcid.org/0009-0007-1261-6805` | **VERIFIED** | Public ORCID record: Name "Eshan", Email "m.eshanized@gmail.com" (verified primary), Bio details Tonmoy Infrastructure & Vision, Snigdha OS, M31A. |
| **PyPI** | `https://pypi.org/user/eshanized/` | **VERIFIED** | Account exists; referenced in existing site config and packages. |
| **X / Twitter** | `https://x.com/eshanized` | **VERIFIED** | Listed in GitHub profile (`twitter_username: "eshanized"`) and ORCID researcher URLs. |

**Missing Profile in Existing Config:** GitLab (`https://gitlab.com/eshanized`) was previously omitted from `siteConfig.links`, despite being an authentic verified profile.

---

## 6. Image Identity Infrastructure Audit

### 6.1 Current Working Tree Images
- `public/og-image.png`: 1200x630 PNG, graphic Open Graph card containing title, typography, and node visual. Accessible at `https://eshanized.is-a.dev/og-image.png`.
- `public/apple-touch-icon.png`: 180x180 PNG.
- `public/icon-192.png`: 192x192 PNG.
- `public/icon-512.png`: 512x512 PNG.
- `public/favicon-32.png` & `favicon-48.png`: 32x32 and 48x48 PNGs.
- `public/icon.svg` & `og-image.svg`: Vector assets.

### 6.2 Photographic Profile Assets
- **Historical Git Assets:**
  - `screenshots/about.png` (commit `e65c89b9`): Shows the original about page featuring Eshan Roy's authentic portrait photo.
  - `public/john-zenith.jpg` (commit `ef2be84d`): Unrelated placeholder from an early template; must NOT be used.
- **External Verified Assets:**
  - DEV.to profile image: Authentic 2268x2268 high-resolution photo of Eshan Roy.
  - GitHub avatar: 460x460 square portrait.
- **Action Plan for Phase 5:**
  - Provide a dedicated, high-resolution square portrait (`/images/eshan-roy.jpg` or `/eshan-roy.png`) derived directly from the verified authentic photograph of Eshan Roy.
  - Configure square (1:1), 4:3, and 16:9 representations.
  - Keep `og-image.png` for branded social card previews while referencing the canonical Person image in Schema.org and dedicated biography pages.

---

## 7. Technical SEO & Routing Audit

1. **Missing Authoritative Subroutes:**
   - `/about`: Required for Google ProfilePage entity qualification and detailed biographical index.
   - `/projects`: Required for authoritative project attribution (Snigdha OS, M31A, Polaris, Tonmoy Infrastructure).
   - `/publications`: Required for linking authoritative writings (DEV.to articles on Snigdha OS, M31A, Git).
2. **Sitemap (`app/sitemap.ts`):**
   - Currently contains only `https://eshanized.is-a.dev/`.
   - Must be updated to include `/about`, `/projects`, and `/publications` with stable, deterministic timestamps.
3. **Robots Configuration (`app/robots.ts`):**
   - Currently allows `/` and disallows `/api/`.
   - Properly points to `https://eshanized.is-a.dev/sitemap.xml`.
4. **Canonicalization:**
   - Trailing slash must be consistent across all routes (`https://eshanized.is-a.dev` vs `https://eshanized.is-a.dev/`).
   - Host must remain `https://eshanized.is-a.dev`.

---

## 8. Components and Routes That Must Remain Visually Unchanged

To satisfy Constraint 1-4:
- `components/narrative/chapter-introduction.tsx`: Maintain the dual-column layout, `HeroSystemsVisual`, `InteractiveTerminal`, `AnimatedHandle`, and typography hierarchy. Update text to reflect canonical identity cleanly without altering layout.
- `components/narrative/chapter-mindset.tsx`: Preserve unchanged.
- `components/narrative/chapter-ideas-to-systems.tsx`: Preserve unchanged.
- `components/narrative/chapter-m31a.tsx` & `components/exhibits/policy-gate-inspector.tsx`: Preserve unchanged.
- `components/narrative/chapter-snigdha-os.tsx`: Preserve unchanged.
- `components/narrative/chapter-portfolio.tsx` & `components/exhibits/crates-showcase.tsx`: Preserve unchanged.
- `components/narrative/chapter-philosophy.tsx`: Preserve unchanged.
- `components/narrative/chapter-road-ahead.tsx`: Preserve unchanged.
- `components/narrative/chapter-contact.tsx`: Preserve layout, update links grid to include GitLab and align with verified profiles.
- `components/navigation/*`: `ScrollProgress`, `ChapterNav`, `BackToTop` must remain fully operational.
- Global theme: Fonts, `#0c0a08` background, `#f0453c` coral accent, grain overlay, and micro-interactions must be preserved.

---

## 9. Recommended Implementation Plan

1. **Phase 1: Canonical Identity Architecture** (`lib/identity.ts` or `src/config/identity.ts`)
   - Centralize all identity strings, titles, descriptions, focus areas, company information, and verified profile links.
2. **Phase 2: Personal Identity Pages**
   - Enhance `/` hero introduction.
   - Implement dedicated `/about` biography page adhering to visual identity.
   - Implement dedicated `/projects` index route.
   - Implement dedicated `/publications` index route.
3. **Phase 3: Schema.org Entity Graph**
   - Build robust, safe JSON-LD generation utilities with `<script>` escaping.
   - Form canonical Person (`#person`), WebSite (`#website`), ProfilePage (`#profilepage`), and Organization (`https://tonmoyinfrastructure.org/#organization`) graphs.
4. **Phase 4: Social Identity Verification**
   - Update `sameAs` array with strictly verified profiles (GitHub, GitLab, DEV.to, About.me, Crates.io, ORCID, PyPI, X).
5. **Phase 5: Image Identity Infrastructure**
   - Integrate authentic portrait assets with responsive optimization and crawler-accessible metadata.
6. **Phase 6: Technical SEO Infrastructure**
   - Update `sitemap.ts` with all indexable routes.
   - Verify `robots.ts` and absolute canonical URLs.
7. **Phase 7: Google Search Console Readiness**
   - Document domain verification, sitemap submission, inspection, and Knowledge Graph distinction in `docs/GOOGLE_SEARCH_CONSOLE.md`.
8. **Phase 8: Content Authority & Guidelines**
   - Create `docs/IDENTITY_CONTENT_GUIDELINES.md` for ongoing maintenance.
9. **Phase 9: Automated Testing & Validation**
   - Add unit and integration tests using `node:test` and type checking.
10. **Phase 10: CI/CD & Verification**
    - Verify clean build, static export, and linting.

# Schema.org Structured Data Architecture & Entity Graph
**Initiative:** Digital Identity & Google Knowledge Graph Optimization  
**Canonical Domain:** https://eshanized.is-a.dev/  
**Subject:** Eshan Roy (`eshanized`)  
**Standard:** Schema.org (JSON-LD)  

---

## 1. Overview & Strategy

The structured data implementation transforms `https://eshanized.is-a.dev` into an authoritative machine-readable entity graph. Rather than rendering disconnected markup, the site publishes interconnected, stable Schema.org entities across all public routes.

```
                         ┌────────────────────────────────────┐
                         │              WebSite               │
                         │ https://eshanized.is-a.dev/#website│
                         └─────────────────┬──────────────────┘
                                           │ publisher / author
                                           ▼
┌────────────────────────┐       ┌──────────────────────────────────┐
│      ProfilePage       ├──────►│              Person              │
│  .../about#profilepage │       │  https://eshanized.is-a.dev/#person│
└────────────────────────┘       └───────┬──────────────────▲───────┘
                                         │                  │
                                worksFor │                  │ founder
                                         ▼                  │
                         ┌──────────────────────────────────┴───────┐
                         │               Organization               │
                         │ https://tonmoyinfrastructure.org/#organization
                         └──────────────────────────────────────────┘
```

---

## 2. Entity Specifications

### 2.1 Canonical Person Entity
- **URI (`@id`):** `https://eshanized.is-a.dev/#person`
- **Type:** `Person`
- **Properties:**
  - `name`: `"Eshan Roy"`
  - `alternateName`: `"eshanized"`
  - `url`: `"https://eshanized.is-a.dev/"`
  - `jobTitle`: `"Founder & CEO, Systems Engineer"`
  - `image`: `"https://eshanized.is-a.dev/images/eshan-roy-1x1.jpg"`
  - `description`: Approved canonical biography
  - `sameAs`: Array of 8 verified profiles (GitHub, GitLab, DEV.to, About.me, Crates.io, ORCID, PyPI, X)
  - `worksFor`: Points to `https://tonmoyinfrastructure.org/#organization`
  - `knowsAbout`: Operating systems engineering, Autonomous AI engineering systems, Developer infrastructure, Open-source software, Distributed systems

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://eshanized.is-a.dev/#person",
  "name": "Eshan Roy",
  "alternateName": "eshanized",
  "url": "https://eshanized.is-a.dev/",
  "image": "https://eshanized.is-a.dev/images/eshan-roy-1x1.jpg",
  "jobTitle": "Founder & CEO, Systems Engineer",
  "description": "Eshan Roy, known professionally as eshanized, is a technology entrepreneur, systems engineer, and Founder & CEO of Tonmoy Infrastructure & Vision. His work focuses on building operating systems, autonomous AI engineering systems, developer infrastructure, and open-source software.",
  "mainEntityOfPage": "https://eshanized.is-a.dev/",
  "sameAs": [
    "https://github.com/eshanized",
    "https://gitlab.com/eshanized",
    "https://dev.to/eshanized",
    "https://about.me/eshanized",
    "https://crates.io/users/eshanized",
    "https://orcid.org/0009-0007-1261-6805",
    "https://pypi.org/user/eshanized/",
    "https://x.com/eshanized"
  ],
  "worksFor": {
    "@type": "Organization",
    "@id": "https://tonmoyinfrastructure.org/#organization",
    "name": "Tonmoy Infrastructure & Vision",
    "url": "https://tonmoyinfrastructure.org"
  },
  "knowsAbout": [
    "Operating systems engineering",
    "Autonomous AI engineering systems",
    "Developer infrastructure",
    "Open-source software",
    "Distributed systems"
  ]
}
```

### 2.2 Canonical Organization Entity
- **URI (`@id`):** `https://tonmoyinfrastructure.org/#organization`
- **Type:** `Organization`
- **Properties:**
  - `name`: `"Tonmoy Infrastructure & Vision"`
  - `url`: `"https://tonmoyinfrastructure.org"`
  - `founder`: Points to `https://eshanized.is-a.dev/#person`

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://tonmoyinfrastructure.org/#organization",
  "name": "Tonmoy Infrastructure & Vision",
  "url": "https://tonmoyinfrastructure.org",
  "founder": {
    "@type": "Person",
    "@id": "https://eshanized.is-a.dev/#person",
    "name": "Eshan Roy",
    "alternateName": "eshanized",
    "url": "https://eshanized.is-a.dev/"
  }
}
```

### 2.3 WebSite Entity
- **URI (`@id`):** `https://eshanized.is-a.dev/#website`
- **Type:** `WebSite`
- **Properties:**
  - `name`: `"Eshan Roy (eshanized)"`
  - `url`: `"https://eshanized.is-a.dev/"`
  - `publisher`: `{"@id": "https://eshanized.is-a.dev/#person"}`
  - `author`: `{"@id": "https://eshanized.is-a.dev/#person"}`

### 2.4 ProfilePage Entity (Dedicated to `/about`)
- **URI (`@id`):** `https://eshanized.is-a.dev/about#profilepage`
- **Type:** `ProfilePage`
- **Properties:**
  - `url`: `"https://eshanized.is-a.dev/about"`
  - `isPartOf`: `{"@id": "https://eshanized.is-a.dev/#website"}`
  - `mainEntity`: References `https://eshanized.is-a.dev/#person`

---

## 3. Security & Anti-XSS Sanitization

All JSON-LD outputs pass through `serializeJsonLd()` in `lib/identity.ts`:
- Replaces `<` with `\u003c`
- Replaces `>` with `\u003e`
- Replaces `&` with `\u0026`

This prevents attackers from breaking out of `<script type="application/ld+json">` boundaries while maintaining full JSON specification compliance for search crawlers.

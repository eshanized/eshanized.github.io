# Digital Identity Architecture Specification
**Initiative:** Digital Identity & Google Knowledge Graph Optimization  
**Canonical Domain:** https://eshanized.is-a.dev/  
**Subject:** Eshan Roy (`eshanized`)  
**Architecture Version:** 1.0.0  

---

## 1. Architectural Philosophy

The objective of the identity architecture is to establish a deterministic, immutable single source of truth for all personal, professional, corporate, and technological representations of **Eshan Roy**, known professionally as **eshanized**.

By centralizing all identity attributes within a typed configuration layer (`lib/identity.ts` and `src/config/identity.ts`), the application eliminates:
- Conflicting names, job titles, or biographies between visible UI and metadata.
- Divergent canonical URLs and trailing-slash ambiguities.
- Unvalidated third-party social links.
- Fragile inline JSON-LD declarations susceptible to parser-breaking or injection vulnerabilities.

```
                              ┌──────────────────────────────────┐
                              │         lib/identity.ts          │
                              │  Authoritative Identity Source   │
                              └──────────────┬───────────────────┘
                                             │
             ┌───────────────────────────────┼──────────────────────────────┐
             │                               │                              │
             ▼                               ▼                              ▼
  ┌─────────────────────┐        ┌──────────────────────┐       ┌──────────────────────┐
  │   lib/metadata.ts   │        │  lib/site-config.ts  │       │ Visible Page Routing │
  │ Metadata & JSON-LD  │        │ Backward-Compat Layer│       │  /, /about, /projects│
  └──────────┬──────────┘        └──────────────────────┘       │    /publications     │
             │                                                  └──────────────────────┘
             ▼
  ┌─────────────────────────────────────────────────────┐
  │  HTML Output with Interconnected Schema.org Graphs  │
  │  - https://eshanized.is-a.dev/#person               │
  │  - https://tonmoyinfrastructure.org/#organization   │
  │  - https://eshanized.is-a.dev/#website              │
  │  - https://eshanized.is-a.dev/about#profilepage     │
  └─────────────────────────────────────────────────────┘
```

---

## 2. Canonical Identity Layer (`lib/identity.ts`)

### 2.1 Core Identity Attributes
- **Full Legal/Public Name:** `Eshan Roy`
- **Professional Alias / Alternate Name:** `eshanized`
- **Primary Title:** `Founder & CEO, Systems Engineer`
- **Canonical Origin:** `https://eshanized.is-a.dev`
- **Canonical Homepage URL:** `https://eshanized.is-a.dev/`
- **Canonical Person URI (`@id`):** `https://eshanized.is-a.dev/#person`

### 2.2 Corporate Affiliation
- **Organization Legal Name:** `Tonmoy Infrastructure & Vision`
- **Organization Short Name:** `TIV`
- **Organization Web Address:** `https://tonmoyinfrastructure.org`
- **Organization Canonical URI (`@id`):** `https://tonmoyinfrastructure.org/#organization`
- **Leadership Role:** `Founder & CEO`

### 2.3 Approved Biographical Texts
- **Full Biography:**
  > "Eshan Roy, known professionally as eshanized, is a technology entrepreneur, systems engineer, and Founder & CEO of Tonmoy Infrastructure & Vision. His work focuses on building operating systems, autonomous AI engineering systems, developer infrastructure, and open-source software."
- **Short Description:**
  > "A technology entrepreneur building operating systems, autonomous AI engineering systems, developer infrastructure and open-source software."
- **Positioning Statement:**
  > "I build systems that help software do more."

### 2.4 Focus Areas (`knowsAbout`)
1. Operating systems engineering
2. Autonomous AI engineering systems
3. Developer infrastructure
4. Open-source software
5. Distributed systems

---

## 3. Image Identity Layer

To prevent search crawler confusion and ensure compliance with Google structured data image guidelines:
1. **Source Photograph:** An authentic high-resolution photograph of Eshan Roy from his verified profile was used.
2. **Derivative Image Variants:**
   - **Square (1:1):** `/images/eshan-roy-1x1.jpg` (800x800, JPEG, q=2). Canonical portrait for Schema.org `Person.image` and `ProfilePage`.
   - **Portrait (3:4):** `/images/eshan-roy-3x4.jpg` (600x800, JPEG). Vertical view for profile cards and mobile layouts.
   - **Landscape (16:9):** `/images/eshan-roy-16x9.jpg` (1200x675, JPEG). Broad widescreen representation.
   - **Stable Alias:** `/images/eshan-roy.jpg` (points to 1:1 square portrait).
   - **Branded Card:** `/og-image.png` (1200x630). Branded raster card with typography and node graphic for Twitter/OpenGraph sharing.

---

## 4. Entity Graph Interconnection & Bidirectional Verification

A major requirement for Google Knowledge Graph disambiguation is bidirectional linking between the Person entity and the Organization entity.

### Person -> Organization
The personal website's `Person` schema references:
```json
"worksFor": {
  "@type": "Organization",
  "@id": "https://tonmoyinfrastructure.org/#organization",
  "name": "Tonmoy Infrastructure & Vision",
  "url": "https://tonmoyinfrastructure.org"
}
```

### Organization -> Person
The company domain (`https://tonmoyinfrastructure.org`) already publishes in its `@graph`:
```json
{
  "@type": "Organization",
  "@id": "https://tonmoyinfrastructure.org/#organization",
  "name": "Tonmoy Infrastructure and Vision",
  "url": "https://tonmoyinfrastructure.org/",
  "founder": {
    "@type": "Person",
    "@id": "https://tonmoyinfrastructure.org/#founder",
    "name": "Eshan Roy",
    "alternateName": "eshanized",
    "sameAs": [
      "https://github.com/eshanized",
      "https://orcid.org/0009-0007-1261-6805",
      "https://eshanized.is-a.dev/"
    ]
  }
}
```
This mutual, explicit cross-domain identifier reference provides search engine indexers with unambiguous evidence of entity co-reference.

---

## 5. Security & Serialization Architecture

Raw string interpolation or naive `JSON.stringify()` in `<script type="application/ld+json">` exposes applications to HTML parsing exploitation if data contains `</script>`.

The `serializeJsonLd()` utility sanitizes output:
```typescript
export function serializeJsonLd(data: unknown): string {
  const jsonString = JSON.stringify(data);
  return jsonString
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
```
This prevents premature script termination while preserving full JSON semantic fidelity upon deserialization.

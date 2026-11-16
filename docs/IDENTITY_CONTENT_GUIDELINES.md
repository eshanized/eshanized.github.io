# Identity & Content Authority Guidelines
**Subject:** Eshan Roy (`eshanized`)  
**Scope:** Public Website, Social Media Profiles, Documentation, Publications  
**Status:** Canonical & Enforced  

---

## 1. Objective

These guidelines define the rules for authoring, editing, and publishing biographical, technical, and corporate information across all digital properties representing **Eshan Roy**, professionally known as **eshanized**.

Adherence to these guidelines ensures consistent entity reconciliation by search engines (specifically Google Knowledge Graph) while preventing misinformation, brand fragmentation, or SEO penalties resulting from keyword stuffing or exaggerated claims.

---

## 2. Canonical Copy Assets

Whenever introducing or summarizing Eshan Roy, use the approved copy variants verbatim or adapt with minimal semantic divergence.

### 2.1 Canonical Full Biography
> "Eshan Roy, known professionally as eshanized, is a technology entrepreneur, systems engineer, and Founder & CEO of Tonmoy Infrastructure & Vision. His work focuses on building operating systems, autonomous AI engineering systems, developer infrastructure, and open-source software."

### 2.2 Approved Short Description (Meta & Social Bio)
> "A technology entrepreneur building operating systems, autonomous AI engineering systems, developer infrastructure and open-source software."

### 2.3 Approved Positioning Statement
> "I build systems that help software do more."

### 2.4 Title Standardization
- **Primary Public Title:** `Founder & CEO, Systems Engineer`
- **Permissible Alternate:** `Founder & CEO · Systems Engineer`
- **Company Context:** `Founder & CEO, Tonmoy Infrastructure & Vision`

---

## 3. Strict Prohibitions

To preserve trust, technical integrity, and search engine compliance, the following practices are strictly prohibited:

1. **No Invented Qualifications or Credentials:** Never fabricate university degrees, academic honors, or certifications not explicitly documented in verified records.
2. **No Invented Awards or Accolades:** Do not add awards (e.g., "Top 30 Under 30", "Innovator of the Year") unless backed by public third-party citations.
3. **No Fabricated Financial or Company Statistics:** Do not publish unverified revenue numbers, funding rounds, valuation estimates, employee counts, or user counts.
4. **No Artificial Backlink Generation:** Do not purchase links, participate in link schemes, or deploy spammy directory submissions.
5. **No AI-Generated Headshots / Avatars:** Do not generate synthetic portraits using diffusion models. Always reuse the authentic photographic portraits (`/images/eshan-roy-1x1.jpg` / `/images/eshan-roy.jpg`).
6. **No Keyword Stuffing:** Never repeat phrases such as "best systems engineer" or "leading AI expert" artificially in body text or alt tags.

---

## 4. Entity Relationships & Cross-Linking Rules

### 4.1 Company Representation
- **Organization Name:** Always reference `Tonmoy Infrastructure & Vision` (abbreviation `TIV` is acceptable in secondary references).
- **Company Website:** Link to `https://tonmoyinfrastructure.org`.
- **Entity Connection:** Maintain explicit reference to the canonical URI `https://tonmoyinfrastructure.org/#organization`.

### 4.2 Project Attribution
Attribution must accurately reflect the specific technical role:
- **Snigdha OS:** Lead Developer / Maintainer. (Focus: Arch Linux distribution, system tooling, desktop shell, PKGBUILD packaging).
- **M31A:** Author & Systems Architect. (Focus: Autonomous coding-agent runtime with deterministic policy gates and verifiable execution).
- **Polaris:** Author & Maintainer. (Focus: Rust-native distributed task orchestration engine).
- **Tonmoy Infrastructure Projects (Veda, Dep Insight, MultiGit):** Architect & Maintainer.

### 4.3 Verified External Profiles
Only profiles audited and verified in `lib/identity.ts` may be included in `sameAs` arrays:
- GitHub: `https://github.com/eshanized`
- GitLab: `https://gitlab.com/eshanized`
- DEV Community: `https://dev.to/eshanized`
- About.me: `https://about.me/eshanized`
- Crates.io: `https://crates.io/users/eshanized`
- ORCID: `https://orcid.org/0009-0007-1261-6805`
- PyPI: `https://pypi.org/user/eshanized/`
- X: `https://x.com/eshanized`

---

## 5. Process for Adding New Projects or Publications

When a new project or article is published:
1. **Verify Canonical Link:** Ensure the project has an active public repository or documentation site with HTTPS.
2. **Update `lib/identity.ts`:** Add the project to `identity.projects` with name, description, and technologies.
3. **Update `content/publications.ts`:** For articles, add title, canonical publication URL, publication date, and platform.
4. **Run Verification:** Execute `npm test && npm run build` to verify that sitemap, Schema.org entities, and static outputs remain deterministic.

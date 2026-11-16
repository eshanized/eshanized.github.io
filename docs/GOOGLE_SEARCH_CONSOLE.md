# Google Search Console & Entity Recognition Runbook
**Initiative:** Digital Identity & Google Knowledge Graph Optimization  
**Canonical Domain:** https://eshanized.is-a.dev/  
**Subject:** Eshan Roy (`eshanized`)  
**Status:** Verification Ready  

---

## 1. Important Entity Recognition Lifecycle Distinction

Search engine optimization and Knowledge Graph presence operate across five distinct, independent phases. Completing website-side markup does not automatically produce a Knowledge Panel.

```
┌─────────────────────────┐
│ 1. Website Indexing     │ URL crawled, rendered, and stored in Google's search index.
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 2. Schema Eligibility   │ Valid Schema.org structured data qualifies pages for Rich Results.
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 3. Entity Recognition   │ Google's algorithms identify "Eshan Roy" as a discrete real-world entity
└───────────┬─────────────┘ across multiple independent corroborating sources.
            ▼
┌─────────────────────────┐
│ 4. Knowledge Panel      │ Algorithmic decision by Google to display an authoritative panel on the
└───────────┬─────────────┘ right side of SERP for high-confidence entity queries.
            ▼
┌─────────────────────────┐
│ 5. Verification/Claim   │ Manual verification by the entity or authorized representative to manage
└─────────────────────────┘ and propose edits to the Knowledge Panel.
```

> [!IMPORTANT]
> Google independently decides Knowledge Graph inclusion and Knowledge Panel display. No schema markup, backlink campaign, or technical optimization can guarantee a Knowledge Panel. The steps below maximize technical accessibility and confidence.

---

## 2. Google Search Console Setup & Ownership Verification

### 2.1 Existing On-Site Verification Artifacts
The repository includes an existing HTML verification file:
- **Path in repository:** `public/google9ff15fb83f6fb1b9.html`
- **Public URL:** `https://eshanized.is-a.dev/google9ff15fb83f6fb1b9.html`
- **Output Status:** Deployed directly to the root of the static site.

### 2.2 Adding a Property in Google Search Console
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Choose **Property Type**:
   - **URL Prefix Property:** `https://eshanized.is-a.dev` (allows instant HTML file or meta tag verification).
   - **Domain Property:** `is-a.dev` (requires DNS access on the parent domain, usually managed through is-a.dev GitHub registry). For personal subdomains, URL prefix property is the recommended operational choice.
3. **HTML File Verification Method:**
   - Select "HTML file".
   - Confirm verification using `google9ff15fb83f6fb1b9.html`.
4. **Alternative: DNS TXT Verification:**
   - If using a dedicated root domain in the future, add a DNS TXT record via your DNS provider with the token provided by Google.

---

## 3. Sitemap Submission Procedure

1. In the Google Search Console left sidebar, click **Sitemaps** (under *Indexing*).
2. In the "Add a new sitemap" input field, enter:
   ```
   sitemap.xml
   ```
   (Full URL: `https://eshanized.is-a.dev/sitemap.xml`)
3. Click **Submit**.
4. Confirm the status updates to **Success** and that 4 discovered pages are detected:
   - `https://eshanized.is-a.dev/`
   - `https://eshanized.is-a.dev/about`
   - `https://eshanized.is-a.dev/projects`
   - `https://eshanized.is-a.dev/publications`

---

## 4. URL Inspection & Indexing Request Workflow

When significant identity or schema updates are deployed:
1. In the top Search Console search bar ("Inspect any URL in..."), enter the target URL:
   - Start with `https://eshanized.is-a.dev/`
   - Next inspect `https://eshanized.is-a.dev/about`
2. Click **Test Live URL** to confirm that Googlebot can fetch and render the page without blockers.
3. Check the **Page fetch** result: ensure it reports *Successful*.
4. Click **Request Indexing**.
5. Repeat for `/about`, `/projects`, and `/publications`.

---

## 5. Structured Data & Rich Results Validation

1. Open the [Google Rich Results Test](https://search.google.com/test/rich-results).
2. Test both the live URL (`https://eshanized.is-a.dev/`) and code snippet.
3. Verify that the following entities are parsed with **0 Errors** and **0 Warnings**:
   - **Person Entity:** Name, alternateName, jobTitle, sameAs (all 8 profiles), worksFor (Organization link), image.
   - **WebSite Entity:** Name, url, publisher, author.
   - **ProfilePage Entity (on `/about`):** mainEntity correctly resolves to `#person`.
4. Inspect the [Schema.org Validator](https://validator.schema.org/) to confirm strict RDF/JSON-LD vocabulary compliance.

---

## 6. Ongoing Monitoring & Reconciliation

- **Page Indexing Report:** Regularly check *Pages* in Search Console for excluded or 404 URLs.
- **Search Performance:** Monitor impressions for query variations:
  - `Eshan Roy`
  - `eshanized`
  - `Eshan Roy Tonmoy Infrastructure`
  - `Eshan Roy Snigdha OS`
  - `Eshan Roy M31A`
- **Knowledge Graph Entity Appearance:** As Google's crawl corroborates the identity across GitHub, GitLab, DEV.to, Crates.io, and ORCID, monitor whether a Knowledge Panel or entity carousel appears in search results for the brand queries.

# SEO Audit — astro-eab (emilybackes.design rebuild)

*Date: 2026-06-20 · Auditor: Claude (seo-audit skill) · Scope: Astro codebase*

**Scope:** Astro codebase (technical + on-page + content structure).
**Goal context (from `.agents/product-marketing.md`):** scale ~500 → 10,000 search impressions/day via content; healthcare-design focus; secondary peer-designer audience.

**Caveat:** This audit is of the source, not a live render. Core Web Vitals field data and schema-as-rendered were **not** verified — those require PageSpeed Insights / Rich Results Test on the deployed build (see #5). Two findings are flagged accordingly.

---

## Re-Audit & Fixes (2026-06-20, round 2)

Re-ran the audit against current source; verified round-1 fixes all landed. Found and **fixed** one new high-impact bug plus two deferred items:

| Finding | Status |
|---|---|
| **Double-encoded HTML entities in post frontmatter** — Webflow-export `&#x27;`/`&amp;` left in `title` (4 posts) and `category` (4 posts). Astro auto-escapes → rendered `&amp;#x27;` in `<title>`/`og:title`/`twitter:title`/JSON-LD headline, and `&amp;amp;` in category badges ("TIPS &amp; TRICKS" shown literally on cards). | ✅ Fixed — replaced entities with literal chars in 5 posts; verified `dist/` clean (correct `&#39;` / `&amp;` single-encoding) |
| **Over-length `<title>` tags** (6 posts, up to 84 chars, truncating in SERP) | ✅ Fixed — added optional `seoTitle` frontmatter field (schema + `[slug].astro` → `PostLayout` → `Layout`); the visible H1 keeps the full headline, the `<title>`/OG tags use the ≤60-char `seoTitle`. Applied to the 5 still-long posts; all `<title>`s now render ≤59 displayed chars |
| **Inline post images: no `loading`/`decoding`** (CWV) | ✅ Fixed — added `rehypeLazyImages` plugin in `astro.config.mjs`; all MDX body `<img>` now get `loading="lazy" decoding="async"`. Cover image (in PostLayout, not MDX) keeps `fetchpriority="high"` |

**Still open (require design/content/deploy, not code):**
- Inline image **`width`/`height`** for full CLS protection — needs per-image intrinsic dimensions (would need an `image-size`-style build step); lazy-load shipped, dimensions deferred.
- Bespoke **1200×630 OG card** — current `og-eb-logo.png` is 1080×1080 (works, but not the ideal 1.91:1 content card).
- **Healthcare-design content cluster** (#12) — strategic content authoring; hand to `content-strategy`.
- **CWV / schema live verification** (#5) — needs deployed build (PageSpeed Insights / Rich Results Test).

Build passes (27 pages + sitemap) after all changes.

---

## Implementation Status (2026-06-20)

Implemented by 3 sub-agents under Lead-Agent orchestration; validated via `npm run build` (passes, 27 pages + sitemap) and inspection of rendered `dist/` HTML.

| # | Finding | Status |
|---|---------|--------|
| 1 | Canonical tags | ✅ Done — self-referencing canonical in `Layout.astro`, verified rendered |
| 2 | Font loading | ✅ Done (scope corrected) — blog posts now load only Pridi + Public Sans; port pages keep full set (the 6 "extra" families are **in use** by case-study ports, 5-Pillars, and `SwotGrid`, so global removal was rejected) |
| 3 | OG image | ✅ Done (code) — default → `og-eb-logo.png`, absolute URLs, `og:url` added. ⏳ Follow-up: design a bespoke 1200×630 social card |
| 4 | `og:type=article` | ✅ Done — posts emit `article` + `article:published_time`/`article:author` |
| 5 | CWV / schema live verify | ⏳ Deferred — requires deployed build (PageSpeed Insights / Rich Results Test) |
| 6 | Empty meta descriptions | ✅ Done — all 12 posts have unique ~150–160-char descriptions (0 empty in `dist/`) |
| 7 | Homepage title/description | ✅ Done — title "Emily Backes — Senior Product Designer (Healthcare UX/UI)" (59 chars) + description |
| 8 | Long titles | ✅ Done — folsom (77→56) and sprocket (68→59) tightened; others were already ≤60 |
| 9 | `about.astro` double H1 | ✅ Done — greeting → `<p class="pl-hero-h1">`, single H1, visuals unchanged (class-based CSS) |
| 10 | `coverImageAlt` | ✅ Done — added to all 12 posts + threaded through `[slug].astro`; 12/12 non-empty in `dist/` |
| 11 | Inline image alts | ✅ Done — all 5 empty `![]()` filled |
| 12 | Healthcare content cluster | ⏳ Deferred — net-new content authoring; hand to `content-strategy` skill |
| 13 | Structured data | ✅ Done — Person + WebSite (homepage) + BlogPosting (posts); JSON-LD validated as well-formed |

**Note on alt text (#10/#11):** several illustration alts are best-guess from filenames (agent could not see the images) — worth a quick human glance. Flagged set: `girl_who_dis`, `a_young_woman_who_is_ai`, `girl_maze`, `girl_books`, `user_personas`, `jr-portfolio`, `starting_over`, `applying_in_2024_sucks`.

**Pre-existing TypeScript errors** (unrelated to this work, not introduced): `resume.astro`, `lago.astro`, `sprocket-app.astro` `<script>` blocks (`dataset`/`RendererType`/null typings). Build still succeeds.

---

## Executive Summary

The **technical foundation is solid** — `site` is set, `@astrojs/sitemap` + `robots.txt` are wired correctly, HTTPS, `lang="en"`, viewport, skip-link, semantic `<article>`, no stray `noindex`. The problems are concentrated where they hurt the traffic goal most: **the blog posts**, the engine intended to grow impressions.

**Top 5 priorities:**
1. **9 of 12 blog posts ship with an empty meta description** — content pages launch their most clickable SERP element blank.
2. **No canonical tags anywhere** — duplicate-URL risk (trailing slash, query params) with nothing consolidating signals.
3. **8 Google Font families load render-blocking** (DESIGN.md uses only 2) — a direct LCP / Core Web Vitals drag on every page.
4. **No structured data** — no `Person`, `WebSite`, or `BlogPosting` JSON-LD; rich-result and entity signals left unused.
5. **Zero healthcare-design content** — the stated target industry is absent from the topics the site can rank for.

**Quick wins (high impact, <1 hr each):** fill post excerpts, fix the OG image (SVG → PNG, absolute URL), pass `coverImageAlt` through the post page, add 5 missing inline-image alts.

---

## Technical SEO Findings

### 1. No canonical tags — Impact: High · Priority 1
- **Evidence:** `src/layouts/Layout.astro` `<head>` has no `<link rel="canonical">`. `@astrojs/sitemap` does not add them.
- **Fix:** Add `<link rel="canonical" href={new URL(Astro.url.pathname, Astro.site)} />` to `Layout.astro`. Self-referencing canonicals protect against trailing-slash/param duplicates and consolidate ranking signals.

### 2. Render-blocking font bloat — Impact: High (Core Web Vitals) · Priority 1
- **Evidence:** `Layout.astro` loads **8 families** — Pridi, Public Sans, Lato, Josefin Sans, Roboto Slab, Just Me Again Down Here, Lexend, Inconsolata — many weights each, in one blocking `<link>`. DESIGN.md specifies only **Pridi + Public Sans**. The extras are Webflow-port leftovers.
- **Fix:** Drop to Pridi + Public Sans (confirm no port page uses the others first). Cuts CSS payload and a render-blocking request → faster LCP. Consider self-hosting or preloading the two used families (`&display=swap` already present).

### 3. OG image is an SVG at a relative path — Impact: Medium · Priority 2
- **Evidence:** `Layout.astro` default `ogImage = '/assets/images/eb_logo_navy_500.svg'`. Facebook/LinkedIn/X don't render SVG OG images, and OG requires **absolute** URLs. `twitter:card` is `summary_large_image` but the image is a small logo.
- **Fix:** Create a 1200×630 PNG/JPG social card; make `ogImage` absolute (`new URL(ogImage, Astro.site)`). Add `<meta property="og:url">`. Social previews drive click-through from shares the content strategy depends on.

### 4. `og:type` hardcoded to `website` — Impact: Low · Priority 3
- **Evidence:** `Layout.astro` sets `og:type=website` for all pages, including blog posts.
- **Fix:** Pass `og:type=article` for posts plus `article:published_time` / `article:author`.

### 5. Cannot verify CWV / schema as-rendered — Priority: Verify
- Run **PageSpeed Insights** and **Rich Results Test** on the deployed build to confirm LCP/INP/CLS and that no schema is silently expected.
- Inline MDX `<img>` tags lack `width`/`height`/`loading` — a likely **CLS** + lazy-load gap worth checking on long posts.

---

## On-Page SEO Findings

### 6. Empty meta descriptions on 9/12 blog posts — Impact: High · Priority 1
- **Evidence:** `src/pages/post/[slug].astro` passes `excerpt` as the description. In `src/content/posts/`, only 3 posts have a filled `excerpt:`; the other 9 are `excerpt: ""`, so they ship a blank `<meta name="description">`.
- **Fix:** Write a 150–160-char, keyword-bearing excerpt for every post. Highest-leverage quick win for the traffic goal — these are the pages meant to earn impressions.

### 7. Homepage has no custom description; generic title — Impact: Medium · Priority 2
- **Evidence:** `src/pages/index.astro:87` passes only `title="Emily Backes — Product Designer"` → falls back to the generic default description. Title carries no differentiating keyword (e.g., healthcare, UX).
- **Fix:** Add a tuned homepage description and consider a title like `Emily Backes — Senior Product Designer (Healthcare UX/UI)`.

### 8. Long titles will truncate — Impact: Low · Priority 3
- **Evidence:** e.g. `folsom-psychology` title ≈76 chars, `sprocket-app` ≈67 chars (>60 SERP limit).
- **Fix:** Tighten to ≤60 chars, front-load the keyword.

### 9. `about.astro` has two `<h1>`s — Impact: Low · Priority 3
- **Evidence:** Two `<h1>` ("Hi, my name is," / "Emily Backes…"). Tolerated by Google but not ideal.
- **Fix:** Make one the `<h1>` and the greeting a styled `<p>`/`<span>`, or merge.

---

## Content & Accessibility Findings

### 10. All 12 posts missing `coverImageAlt`; the slug page doesn't pass it anyway — Impact: Medium · Priority 2
- **Evidence:** `grep -L coverImageAlt` → all 12 posts. `[slug].astro` destructures `excerpt` but **not** `coverImageAlt`, so `PostLayout` always receives `alt=""` on the cover image.
- **Fix:** Add `coverImageAlt` to each post's frontmatter **and** thread it through `[slug].astro` → `PostLayout`.

### 11. 5 inline post images have empty alt — Impact: Medium · Priority 2
- **Evidence:** `![](…)` in `the-productivity-hack…`, `my-ux-ui-journey` (×3), `how-relevant-are-user-personas…`.
- **Fix:** Add descriptive alt text. Image SEO + accessibility (notable given there is a post on accessibility).

### 12. Zero healthcare-design content — Impact: High (strategic) · Priority 1–2
- **Evidence:** All 12 posts are general UX/career topics; none target healthcare/health-tech UX, the stated leading industry.
- **Fix:** A `content-strategy` job, but the SEO read is clear: ranking in the target niche needs topical depth there (e.g., "UX patterns for patient scheduling," "designing for EHR/clinical workflows," "accessibility in healthcare apps"). Pairs with the Folsom Psychology case study for internal linking.

### 13. No `BlogPosting` / `Person` / `WebSite` structured data — Impact: Medium–High · Priority 2
- **Evidence:** No JSON-LD in any layout.
- **Fix:** Add `Person` + `WebSite` on the homepage and `BlogPosting` (headline, datePublished, author, image) on posts. Strengthens E-E-A-T and rich-result eligibility. (Hand off to the `schema` skill.)

---

## Prioritized Action Plan

**1 — Critical / quick wins (do first):**
- Fill all empty post `excerpt:` fields (#6)
- Add canonical tags in `Layout.astro` (#1)
- Trim fonts to Pridi + Public Sans (#2)
- Fix OG image → absolute PNG + `og:url` (#3)

**2 — High-impact:**
- Thread `coverImageAlt` through posts + add to frontmatter (#10); fill 5 inline alts (#11)
- Add `BlogPosting` / `Person` / `WebSite` schema (#13)
- Tune homepage title/description (#7)

**3 — Strategic (compounding):**
- Build a healthcare-UX content cluster (#12) — the real lever for 500 → 10k impressions
- `og:type=article` + article meta (#4); tighten long titles (#8); fix `about` H1 (#9)
- Verify CWV + image dimensions/lazy-load on the live build (#5)

---

## What's working (keep)
- `astro.config.mjs`: `site` set, `@astrojs/sitemap` + `mdx` integrations, `output: static`
- `public/robots.txt`: allows crawl, references `sitemap-index.xml`
- HTTPS, `lang="en"`, viewport meta, skip-link, semantic `<article>` + `<time datetime>`
- `_redirects`: 301 for the `subscription-cancelletion` misspelling
- No `noindex` on any important page
- Per-page titles/descriptions present on all static pages (home description is the gap — see #7)

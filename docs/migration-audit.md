# Webflow → Cloudflare + Astro: Migration Audit & Runbook

**Date:** 2026-06-20
**Source site:** https://emilybackes.design/ (Webflow, fronted by Cloudflare)
**Target:** Astro static build on Cloudflare Pages
**Scope note:** The `/experimental/*` pages are intentionally **not** migrated (≈0 traffic, owner's decision).

> Deploy mechanics (build settings, custom domain, DNS) live in [`deploy.md`](./deploy.md).
> This doc covers the **SEO / traffic-preservation** side: URL parity, redirects, and what to verify so rankings don't drop.

---

## Verdict

**Low-risk migration.** The Astro build already mirrors production's URL structure almost exactly — same `/post/[slug]`, `/case-study/[slug]`, `/posts`, `/legal/*`, and top-level paths. Every live, indexed prod URL maps to a page in the new build. The migration also *fixes* several pre-existing SEO weaknesses (no sitemap, no canonical tags, no host canonicalization).

The risk is concentrated in a few **must-fix** items below — primarily analytics continuity and host canonicalization — not in the URL structure.

---

## URL parity

Every live, indexed production URL maps to a page in the Astro build:

| Prod (Webflow, live) | Astro build | Status |
|---|---|---|
| `/`, `/about`, `/contact`, `/resume`, `/the-5-pillars-of-emily` | same paths | ✅ match |
| `/posts` (blog index) | `/posts` | ✅ match |
| `/legal/privacy-policy`, `/legal/terms-conditions`, `/legal/credits` | same paths | ✅ match |
| 12 blog posts at `/post/[slug]` | all 12 present (+1 net-new) | ✅ match |
| 5 case studies at `/case-study/[slug]` | all 5 present | ✅ match (typo handled — see §4) |
| `/experimental/ui-list`, `/experimental/alpinejs-webflow` | intentionally dropped | ⚠️ will 404 — see §2 |

### Blog posts (12 live on prod, all present in build)

All at `/post/[slug]`:

1. `how-to-apply-for-jobs-in-a-tough-market`
2. `breaking-the-config-seal---my-first-time-at-the-figma-conference`
3. `how-to-create-jr-ux-ui-portfolio-presentations`
4. `beginner-friendly-advice-for-an-impactful-ux-portfolio`
5. `the-productivity-hack-that-recruiting-gurus-on-linkedin-wont-give-you`
6. `how-relevant-are-user-personas-a-personal-story`
7. `my-ux-ui-journey`
8. `ai-chatbots-customer-service-guide`
9. `omg-is-ai-going-to-take-our-jobs-yes-no-maybe`
10. `how-to-think-about-accessibility-as-a-ux-designer`
11. `how-to-conduct-effective-ux-interviews`
12. `how-to-collect-free-ux-survey-responses-in-24-hours`

Net-new in the build (not yet on prod, fine to publish): `obsidian-claude-code-figma-design-workflow`.

### Case studies (5 live on prod, all present in build)

At `/case-study/[slug]`: `sage-designing-an-ai-powered-chatbot`, `folsom-psychology`, `subscription-cancelletion` (typo — see §4), `lago`, `sprocket-app`.

---

## 🔴 Must-fix before DNS cutover

### 1. Add Google Analytics (analytics continuity)

Prod runs **GA4 `G-K6ZBTPD3BT`** (gtag) on every page. The Astro source has **no analytics tag** anywhere (the only match in the repo is a text mention in `privacy-policy.astro`).

**Impact:** If cut over as-is, traffic reporting goes dark on day one — and you can't measure whether the migration affected traffic, which is the primary concern of this whole effort.

**Action:** Add the same `G-K6ZBTPD3BT` gtag snippet to `src/layouts/Layout.astro` (and confirm `PostLayout.astro` inherits it) so the data series stays continuous.

### 2. Add a 404 page + redirect dropped experimental pages

The two `/experimental/*` pages are currently indexed and return `200` on prod, so after migration they 404. Cleaner for SEO to redirect them.

**Actions:**
- [x] Add a branded `src/pages/404.astro`. *(Done — uses `PageLayout` for nav/footer, surfaces the 3 most-recent posts via `getCollection('posts')` + `BlogCard`, and a "Take me home" `.btn-primary` CTA. Passes `astro check` and the design hook.)*
- [x] Add to `public/_redirects`: `/experimental/* /posts 301`. *(Done.)*

### 3. Canonicalize host: www → non-www (301)

Prod serves **both** `https://emilybackes.design/` and `https://www.emilybackes.design/` with `200`, **no redirect, and no canonical tag** — a pre-existing duplicate-content issue. Google has indexed the **www** version.

The Astro `site` is set to **non-www** (`https://emilybackes.design`) and `Layout.astro` correctly emits a non-www canonical.

**Action:** Add an edge redirect **www → non-www (301)**. Without it, indexed www URLs keep resolving and signals split. *Easiest item to forget.*

- [x] Added to `public/_redirects`: `https://www.emilybackes.design/* https://emilybackes.design/:splat 301`. *(Done.)*
- [ ] **Prerequisite at deploy time:** attach `www.emilybackes.design` as a custom domain on the Pages project — otherwise the www host never hits `_redirects` and the rule is a no-op. (Alternative: a zone-level Cloudflare Redirect Rule, which works even without attaching www to Pages.)

---

## 🟡 Should-fix (SEO hygiene — improvements over prod)

### 4. Verify the `subscription-cancellation` typo redirect

Prod's *live, indexed* case-study URL is the **misspelled** `/case-study/subscription-cancelletion` (the correct spelling 404s on prod). The build serves the **corrected** `subscription-cancellation` and `public/_redirects` already 301s the typo → correct spelling. ✅ Correct.

**Action:** Confirm the homepage / `case-catalog.ts` links to the **corrected** slug, so you're not internally linking to a redirect.

### 5. Submit the new sitemap

Prod has **no sitemap** (`/sitemap.xml` returns the 404 page) and an **empty `robots.txt`**. The Astro build uses `@astrojs/sitemap` (→ `sitemap-index.xml`) and a `robots.txt` referencing it — a net improvement.

**Action:** After launch, submit `https://emilybackes.design/sitemap-index.xml` in Google Search Console to accelerate re-crawl.

### 6. Set `trailingSlash`

`trailingSlash` is unset (Astro default `ignore`); Webflow uses no trailing slash.

**Action:** Set `trailingSlash: 'never'` in `astro.config.mjs` to avoid CF Pages serving both `/about` and `/about/` as `200`.

### 7. Orphaned indexed URL

`/post/ai-agents-revolutionizing-ux-research-2025-guide` appears in Google's index but **already 404s on prod** (deleted pre-migration). Migration doesn't make it worse.

**Action (optional):** 301 it to a related post or `/posts` to recover residual link equity.

---

## Cutover mechanics

The domain is **already fronted by Cloudflare** (`server: cloudflare`, `cf-ray`, Cloudflare-managed DNS with Webflow as origin). Cutover is just repointing the DNS / custom-domain record to the Cloudflare Pages project — no nameserver change, fast SSL, minimal propagation. `public/_redirects` is the correct mechanism for CF Pages and is read automatically.

Full step-by-step deploy instructions: [`deploy.md`](./deploy.md).

---

## Post-launch verification checklist

- [ ] Crawl new `sitemap-index.xml`; confirm 12 posts + 5 case studies + top-level pages all return `200`.
- [ ] Spot-check 3–4 `/post/*` and all 5 `/case-study/*` URLs return `200` (not 404).
- [ ] Confirm `www → non-www` returns `301`.
- [ ] Confirm `/case-study/subscription-cancelletion` returns `301` → `/case-study/subscription-cancellation`.
- [ ] Confirm `/experimental/*` returns `301` → `/posts`.
- [ ] Confirm GA4 (`G-K6ZBTPD3BT`) real-time shows hits.
- [ ] Submit sitemap in GSC; watch the Coverage/Pages report for a 404 spike over the next 1–2 weeks.

---

## Audit method & caveat

Production has no sitemap, so the post/case-study inventory was built by crawling the homepage plus both `/posts` pagination pages. Webflow's pagination returns `200` past the last page, so status codes can't give a hard post count. The crawl surfaced **12 unique posts, all of which map to the build**, and the build was clearly authored from prod — so confidence is high. The **definitive** check is the sitemap-vs-crawl diff in the post-launch checklist above.

### Evidence captured during audit
- Host: both www and non-www return `200`, `0` redirects (no canonicalization).
- `robots.txt`: empty on prod. `/sitemap.xml`: returns Webflow 404 page.
- Prod HTML: no `<link rel="canonical">` or `hreflang` emitted.
- Analytics: GA4 `G-K6ZBTPD3BT` (gtag) present on prod; absent in build.
- URL patterns confirmed via HTTP status probes: posts at `/post/[slug]`, case studies at `/case-study/[slug]`, blog index at `/posts`, legal under `/legal/*`.

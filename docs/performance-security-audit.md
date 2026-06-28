# Astro Build Audit — Performance, Security & Best Practices

**Date:** 2026-06-24
**Scope:** Whole Astro static build (`output: 'static'`, CF Pages). Complements
[`migration-audit.md`](./migration-audit.md) (URL parity / SEO) — this pass covers
load speed, security headers, and Astro best practices.

## Verdict

Solid baseline. Build is clean (`astro check`: 0 errors), routes are static, CSS is
per-route split, animation libraries (AOS, Lottie, lord-icon) are **lazy-loaded
behind feature-detection**, and the Webflow-port case-study pages already ship
responsive AVIF with `srcset`/`sizes`/`loading="lazy"`.

Two real levers remain: (1) **no HTTP security headers** were being sent, and
(2) the **homepage case-study cards ship ~3.6 MB of non-responsive images**.

---

## ✅ Fixed in this pass

### `public/_headers` added (security + caching)
CF Pages was sending **no** security headers. Added `public/_headers` with:
- `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, `Permissions-Policy`, and a **Content-Security-Policy**
  allowlisting the site's real third parties (Google Fonts, web3forms, Podbean,
  Rive).
- `Cache-Control: immutable` for content-hashed `/_astro/*`, and a 1-day +
  `stale-while-revalidate` for non-hashed `/assets/*`.

**⚠️ Action:** the CSP must be **verified on a preview deploy** — confirm fonts,
the contact form, and the Podbean/Rive embeds still load. When GA4 is added (below),
extend `script-src`/`connect-src` with the Google domains (noted inline in the file).

---

## 🔴 High-impact load-speed items

### 1. Homepage case-study card images — ~3.6 MB, non-responsive
`src/data/case-catalog.ts` points each card at a single full-res file:

| File | Size |
|---|---|
| `cs-sage.webp` | 1.0 MB |
| `cs-sub-cancel.webp` | 1.0 MB |
| `cs-lago.webp` | 636 KB |
| `cs-folsom.webp` | 580 KB |
| `cs-sprocket.webp` | 408 KB |

These render at card size but download at full resolution, with **no `srcset`** —
unlike the in-page case-study images, which are already responsive. ~3.6 MB on the
homepage.

**Fix options (either works):**
- Move the five card images into `src/assets/` and render them with Astro's
  `<Image>` component → automatic resized + AVIF/WebP `srcset` + intrinsic
  dimensions. Cleanest, idiomatic Astro.
- Or pre-generate ~800 px + ~1600 px variants and add `srcset`/`sizes`/`width`/
  `height` to the existing `<img>` (matches the Webflow-port pattern already used
  on case-study pages).

Expect this to cut homepage image transfer by **~80–90%**.

### 2. Adopt Astro `<Image>` for raster images generally
The build uses **150 raw `<img>` tags and zero `<Image>`/`<Picture>`**. The
Webflow-port pages are fine (they carry hand-authored `srcset`), but any *new*
raster image should go through `astro:assets` for automatic optimization, format
negotiation, and CLS-safe intrinsic sizing.

---

## 🟡 Medium

### 3. Google Fonts is render-blocking
`Layout.astro` loads fonts via a blocking `<link rel="stylesheet">` to
`fonts.googleapis.com` (preconnect + `display=swap` are correctly set). To remove
the third-party round-trips entirely, **self-host** the two design-system families
(Pridi, Public Sans) via `@fontsource` or local `@font-face` + `preload`. Removes
two cross-origin connections from the critical path and simplifies the CSP
(`font-src 'self'`).

### 4. Lottie + lord-icon weight (~528 KB JS) on case-study & About pages
`lottie-web` (304 KB) + `@lordicon/element` (224 KB, babel-heavy) load on every
case-study page (the `[data-animation-type="lottie"]` divs are initialized) and on
About (Quick Facts icons). They're correctly lazy/conditional, but this is the
single largest JS cost on those routes. Consider replacing the decorative outline
animations with static SVGs, or a much lighter player, if the motion isn't essential.

### 5. GA4 still absent
`migration-audit.md §1` flagged GA4 `G-K6ZBTPD3BT` as a must-fix for analytics
continuity; it is still not in the source. Add it before DNS cutover **and** update
the CSP allowlist at the same time.

---

## 🟢 Low / housekeeping

- **Duplicate assets.** `public/assets/images/*` largely duplicates
  `public/assets/cs/**` (e.g. `DSCF6299-2.avif` exists in both at 676 KB). Doesn't
  affect runtime (only referenced files are fetched) but inflates the repo/deploy.
  De-dupe to one canonical path.
- **MDX `rehypePlugins` deprecation.** `astro check` warns that
  `mdx({ rehypePlugins })` is deprecated; move the `rehypeLazyImages` plugin to
  `markdown.processor` / `unified({...})` before the next major.
- **`PostLayout` cover `<img>`** has no `width`/`height`, but CSS sets
  `aspect-ratio: 16/9`, so CLS is already covered. Fine as-is.

---

## What's already good (don't regress)

- Lazy/conditional loading of AOS, Lottie, lord-icon (feature-detected).
- Per-route CSS splitting; no inline `<style>` blobs.
- Responsive AVIF `srcset` on in-page case-study images.
- External `target="_blank"` links carry `rel="noopener"`.
- `prefetch` on hover, `trailingSlash: 'never'`, canonical + OG/Twitter + JSON-LD.
- Skip-to-content link; cards use CSS `aspect-ratio` (CLS-safe).

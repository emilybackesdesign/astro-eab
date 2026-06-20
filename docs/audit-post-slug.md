# Audit: `/post/{slug}` page

**Target:** `src/layouts/PostLayout.astro` + `src/pages/post/[slug].astro`  
**Date:** 2026-06-19  
**Tool:** `/impeccable audit`

---

## Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 2/4 | No skip link, no focus styles, post body elements unstyled |
| 2 | Performance | 2/4 | Duplicate font load; AOS + Lordicon loaded globally on pages that don't use them |
| 3 | Theming | 3/4 | Strong token usage; border-radius hardcoded, no token defined |
| 4 | Responsive Design | 2/4 | Post title has no `clamp()`; body line length unconstrained; no mobile breakpoints |
| 5 | Anti-Patterns | 3/4 | Clean and on-brand; no back navigation; MDX elements completely unstyled |
| **Total** | | **12/20** | **Acceptable — significant work needed** |

---

## Anti-Patterns Verdict

**Mostly passes.** The design doesn't read as AI-generated. The Pridi + Public Sans pairing is distinctive, the cat-pun personality comes through in the category chip and typographic hierarchy, and there's no gradient text, glassmorphism, or hero-metric clichés.

One concern: the post body is a raw MDX dump with no typographic treatment of `<blockquote>`, `<code>`, `<pre>`, `<ul>`, `<ol>`, or `<hr>`. When those elements appear in a post, they render with browser defaults — mismatched fonts, white-background `<code>` blocks on a dark page, no list styling.

---

## Executive Summary

- **Health: 12/20 — Acceptable (significant work needed)**
- Issues: **3 P1 · 9 P2 · 3 P3**
- Top issues:
  1. AOS + Lordicon loaded globally on post pages (wasted JS, no `data-aos` elements on posts)
  2. Duplicate font loading — `@import` in `global.css` is render-blocking and redundant
  3. No post body typographic system — MDX elements render with browser defaults on dark theme
  4. Post title `font-size` fixed at `--h2` with no mobile scaling
  5. Body text line length unconstrained at ~85ch (cap is 65–75ch)

---

## Detailed Findings

### P1 — Blocking / Fix Before Release

---

#### [P1] Duplicate Google Fonts loading (render-blocking)

- **Location:** `src/styles/global.css:7`, `src/layouts/Layout.astro:36`
- **Category:** Performance
- **Impact:** `global.css` has `@import url('https://fonts.googleapis.com/...')` for Pridi + Public Sans. `Layout.astro` also loads the same fonts via `<link rel="preconnect">` + `<link rel="stylesheet">`. The CSS `@import` is render-blocking by spec — it stalls all CSS parsing until the font sheet resolves. The `<link>` in the head is the correct pattern and already covers these fonts.
- **Standard:** Core Web Vitals / LCP
- **Fix:** Remove the `@import` from `global.css`. The `<link>` in Layout.astro is sufficient.
- **Command:** `/impeccable optimize`

---

#### [P1] AOS + Lordicon JS loaded globally — unused on post pages

- **Location:** `src/layouts/Layout.astro:3,43–51`
- **Category:** Performance
- **Impact:** `import 'aos/dist/aos.css'` and `AOS.init()` run on every page. Post pages have no `data-aos` attributes. Similarly, `@lordicon/element` + `lottie-web` initialize on every page; posts have no `<lord-icon>` elements. Both libraries add non-trivial JS weight and CPU time for zero benefit on post pages.
- **Fix:** Move AOS initialization and Lordicon import to a page-level script that only exists on pages using them (homepage, case studies). The layout shell should not load animation libraries unconditionally.
- **Command:** `/impeccable optimize`

---

#### [P1] No skip-to-content link

- **Location:** `src/layouts/Layout.astro`, `src/components/Nav.astro`
- **Category:** Accessibility
- **Impact:** Keyboard users must tab through all 5 nav interactive elements before reaching the article `<h1>`. No skip-navigation mechanism exists anywhere.
- **Standard:** WCAG 2.4.1 (AA)
- **Fix:** Add `<a href="#main-content" class="skip-link">Skip to content</a>` as the first child of `<body>` in Layout.astro. Add `id="main-content"` to `<main>` in PageLayout.astro. Style as visually hidden until focused.
- **Command:** `/impeccable harden`

---

#### [P1] No custom focus styles

- **Location:** `src/styles/global.css`
- **Category:** Accessibility
- **Impact:** No `:focus-visible` rules defined anywhere. Browser default blue outline is poorly visible against `--bg` (#111216). All interactive elements — nav links, hamburger button, in-text links — rely on inconsistent browser defaults.
- **Standard:** WCAG 2.4.7 (AA)
- **Fix:** Add global rule:
  ```css
  :focus-visible {
    outline: 2px solid var(--toe-bean-pink-200);
    outline-offset: 2px;
  }
  :focus:not(:focus-visible) { outline: none; }
  ```
- **Command:** `/impeccable harden`

---

### P2 — Major / Fix Before Ship

---

#### [P2] Post title `font-size` fixed, no `clamp()` for mobile

- **Location:** `src/layouts/PostLayout.astro:73`
- **Category:** Responsive Design
- **Impact:** `font-size: var(--h2)` = 2.488rem (39.8px). On a 375px iPhone, a title like "Breaking the Config Seal – My First Time at the Figma Conference" spans 3–4 lines at full size, consuming the visible viewport before body copy starts. The homepage hero uses `clamp(2.5rem, 6vw, 4.2rem)` — the post title should follow the same pattern.
- **Fix:** `font-size: clamp(1.6rem, 5vw, var(--h2));` plus `text-wrap: balance` on `.post-title`.
- **Command:** `/impeccable adapt`

---

#### [P2] Body text line length unconstrained (~85ch at max-width)

- **Location:** `src/layouts/PostLayout.astro:34`
- **Category:** Responsive Design / Accessibility
- **Impact:** `.post-article` is `max-width: 780px`. Public Sans at 1rem renders ~85 characters per line at full width — well over the 65–75ch readability cap. Long-form posts become tiring to read across full lines.
- **Fix:** Add `max-width: 65ch` to `.post-body`, or narrow the article container to `max-width: 680px`.
- **Command:** `/impeccable layout`

---

#### [P2] MDX body elements completely unstyled — dark background failures

- **Location:** `src/layouts/PostLayout.astro:83–98`
- **Category:** Accessibility / Theming / Anti-Patterns
- **Impact:** `.post-body` defines styles for only `h2`, `h3`, `h4`, `img`, and `a`. All other MDX elements render with browser defaults on a `#111216` background: `<blockquote>` gets a plain italic treatment, `<code>`/`<pre>` use system monospace with inconsistent contrast, `<ul>`/`<ol>` have no spacing, `<hr>` renders as a gray system rule. Posts using `---` dividers, code snippets, or bullet lists will look broken.
- **Fix:** Extend the `:global()` styles in PostLayout to cover the full MDX element set:
  - `blockquote` — left border in `--rule-strong`, left padding, Pridi italic
  - `code`/`pre` — Public Sans or system monospace, `--surface` background, `--toe-bean-pink-200` text
  - `ul`/`ol` — left padding, `--body` color, 1.65 line-height
  - `hr` — 1px `--rule-strong` border
  - `strong`/`em` — weight/style without color shift
- **Command:** `/impeccable typeset`

---

#### [P2] In-article headings inherit page-section sizes

- **Location:** `src/layouts/PostLayout.astro:84–89`
- **Category:** Responsive Design / Theming
- **Impact:** `.post-body :global(h2)` inherits the global h2 = 2.488rem — the same size as "Case Cat-alog" and "Paws & Reflect" section titles. Article subheadings look as prominent as page-level sections. Wraps to 2–3 lines on mobile.
- **Fix:** Override heading sizes within `.post-body`:
  ```css
  .post-body :global(h2) { font-size: clamp(1.25rem, 3vw, 1.5rem); }
  .post-body :global(h3) { font-size: clamp(1.1rem, 2.5vw, 1.25rem); }
  .post-body :global(h4) { font-size: 1.1rem; }
  ```
- **Command:** `/impeccable typeset`

---

#### [P2] Cover image missing `width`/`height` — Cumulative Layout Shift

- **Location:** `src/layouts/PostLayout.astro:19`
- **Category:** Performance
- **Impact:** `<img src={coverImage} alt={title} />` has no `width`/`height` and no `aspect-ratio`. The browser can't reserve space before the image loads, causing heading and body content to shift down. Core Web Vitals CLS failure.
- **Fix:** Add `aspect-ratio: 16 / 9` to `.post-cover img` (or the actual ratio your covers use). Add `fetchpriority="high"` since this is the LCP element.
- **Command:** `/impeccable optimize`

---

#### [P2] Date rendered as `<span>`, not `<time>`

- **Location:** `src/layouts/PostLayout.astro:21`
- **Category:** Accessibility
- **Impact:** `<span class="post-date">{formattedDate}</span>` — machines and screen readers can't parse the human-formatted date string. The semantic `<time>` element with `datetime` provides machine-readable ISO date.
- **Standard:** WCAG 1.3.1 / semantic HTML
- **Fix:** `<time class="post-date" datetime={date.toISOString()}>{formattedDate}</time>`
- **Command:** `/impeccable harden`

---

#### [P2] Nav `aria-current` mismatch for post pages

- **Location:** `src/components/Nav.astro:16`
- **Category:** Accessibility
- **Impact:** The Journal nav link checks `currentPath.startsWith('/posts')` but individual post pages are at `/post/[slug]` (singular prefix). When reading a post, the Journal link doesn't show as active — users lose location context.
- **Fix:** Update condition to `currentPath.startsWith('/posts') || currentPath.startsWith('/post/')`.
- **Command:** `/impeccable harden`

---

#### [P2] No "back to journal" contextual navigation

- **Location:** `src/layouts/PostLayout.astro`
- **Category:** UX
- **Impact:** Post is a terminal page. The only return path to the blog list is the global nav. No breadcrumb, no "← Paws & Reflect" link, no "more posts" section at the foot. After finishing a post, the next action is unclear.
- **Fix:** Add a back link at the top of the post header (between meta and title) and/or a "More from the Journal" section at the bottom.
- **Command:** `/impeccable harden`

---

#### [P2] Top padding too deep on mobile

- **Location:** `src/layouts/PostLayout.astro:35`
- **Category:** Responsive Design
- **Impact:** `padding: var(--lg-spacer) var(--def-spacer)` = `4rem 1rem`. On mobile, 4rem (64px) of top padding pushes the post title below the fold. No `@media` breakpoints exist in PostLayout.
- **Fix:**
  ```css
  @media (max-width: 768px) {
    .post-article { padding: 2rem 1rem; }
  }
  ```
- **Command:** `/impeccable adapt`

---

### P3 — Polish / Fix If Time Permits

---

#### [P3] Border-radius values hardcoded — no CSS token

- **Location:** `src/layouts/PostLayout.astro:40,93`, `src/components/PodcastEmbed.astro:22`
- **Category:** Theming
- **Impact:** `16px` (cover image) and `8px` (body images) are hardcoded. DESIGN.md defines radius tokens (sm=4px, md=8px, lg=16px) but `global.css` never declares them as CSS custom properties.
- **Fix:** Add to `global.css :root`: `--radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px; --radius-pill: 32px; --radius-full: 100%;` then update all hardcoded values.
- **Command:** `/impeccable extract`

---

#### [P3] Cover image alt text always repeats the post title

- **Location:** `src/layouts/PostLayout.astro:19`
- **Category:** Accessibility
- **Impact:** `alt={title}` means the cover image alt always echoes the `<h1>` immediately below. Screen readers announce the same content twice in sequence.
- **Fix:** Add optional `coverImageAlt` to the content schema. Fall back to `alt=""` (decorative) when not provided, since the `<h1>` already provides the heading context.
- **Command:** `/impeccable harden`

---

#### [P3] `post-body` line-height undocumented token deviation

- **Location:** `src/layouts/PostLayout.astro:82`
- **Category:** Theming
- **Impact:** `line-height: 1.7` is not in the design token system (DESIGN.md has `body-md.lineHeight: 1.44rem`). 1.7 is correct for long-form dark-background reading, but it's an undocumented divergence.
- **Fix:** Add `--line-height-reading: 1.7` to `global.css` and reference it here.
- **Command:** `/impeccable extract`

---

## Systemic Issues

1. **No `@media` queries in PostLayout.astro** — the entire post layout was designed desktop-first. Affects title scaling, padding, heading sizes. Needs a responsive pass.
2. **Global layout bundles animation libraries** — AOS and Lordicon load on every route. As the site grows, every new page pays the weight cost. Pattern should be page-level opt-in.
3. **MDX element styles incomplete** — only 5 of ~12 standard Markdown elements are styled. Any post using blockquotes, code, lists, or dividers will look broken.

---

## Positive Findings

- `lang="en"` on html element
- Semantic `<article>` landmark wraps the post
- Nav has proper ARIA — `role`, `aria-label`, `aria-expanded` on hamburger, `aria-current` on active links
- Podcast iframe has `title` and `loading="lazy"`
- Full OG meta tags (title, description, image, type) passed from frontmatter
- `<link rel="preconnect">` before font load in Layout.astro
- Strong color contrast: `--body` (#c4c5c9) on `--bg` (#111216) ≈ 10:1; `--muted` (#a8a8ac) ≈ 7.8:1
- Pridi + Public Sans pairing is distinctive, on-brand, and not on the reflex-reject list

---

## Recommended Actions (priority order)

| Priority | Command | Scope |
|----------|---------|-------|
| P1 | `/impeccable harden` | Skip link, focus styles, `<time>` element, `aria-current` fix, back nav, `coverImageAlt` schema |
| P1 | `/impeccable optimize` | Remove `@import` from global.css, conditional AOS/Lordicon, cover image aspect-ratio + fetchpriority |
| P2 | `/impeccable typeset` | MDX body element styles, rescale in-article headings, `text-wrap: balance` on post title |
| P2 | `/impeccable adapt` | Post title `clamp()`, mobile padding breakpoint |
| P2 | `/impeccable layout` | Constrain body text to ~65ch |
| P3 | `/impeccable extract` | Add border-radius CSS custom properties to global.css |
| Final | `/impeccable polish` | Quality pass after all above fixes |

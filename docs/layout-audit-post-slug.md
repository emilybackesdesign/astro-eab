# Layout Audit: `/post/{slug}`

**Target:** `src/layouts/PostLayout.astro` + `src/pages/post/[slug].astro`
**Date:** 2026-06-19
**Register:** Brand (portfolio)
**Auditor:** `/impeccable layout`

---

## Layout Health

| Dimension | Score | Summary |
|---|---|---|
| Spacing system | 2/4 | `var(--md-spacer)` applied uniformly — no rhythm |
| Visual hierarchy | 2/4 | Title/meta/body all equally spaced; squint test fails |
| Grid & structure | 2/4 | 65ch body not centered in 780px container; asymmetric |
| Rhythm & variety | 1/4 | One spacing value dominates the entire article |
| Density | 3/4 | Comfortable reading density; top padding too deep on tablet |
| **Total** | **10/20** | **Layout needs a full pass** |

---

## Executive Summary

The post layout is structurally sound but spatially flat. A single value — `var(--md-spacer)` (2rem) — governs every major gap: between the cover image and the back link, between the back link and the header, between body sections, and between headings and paragraphs. There is no rhythm of tight vs. generous space, no spatial signal of hierarchy, and no felt moment that announces "you are entering a long-form article."

Three structural issues stand above the spacing monotony:

1. **The reading column is not centered.** `max-width: 65ch` on `.post-body` has no `margin: 0 auto`. The reading column sits left-aligned inside the 780px article container, leaving ~130px of unintentional empty space to the right.

2. **Back navigation is buried mid-page.** The DOM order is: cover image → back link → header. The navigation affordance appears sandwiched between the hero image and the article title — the eye lands on the image, is interrupted by a nav element, then has to re-focus on the title.

3. **The blockquote uses a 3px side-stripe border.** This is an absolute ban in the design guidelines. It reads as a template default, not a design decision, and is the single element most likely to make the layout look generic.

---

## Findings

### P0 — Absolute Ban Violation

#### [P0] Blockquote 3px side-stripe border

- **Location:** `src/layouts/PostLayout.astro:129–135`
- **Current code:**
  ```css
  .post-body :global(blockquote) {
    border-left: 3px solid var(--rule-strong);
    padding-left: var(--md-spacer);
    margin: var(--md-spacer) 0;
    font-style: italic;
    color: var(--muted);
  }
  ```
- **Issue:** Side-stripe `border-left` greater than 1px on a block element is the #1 absolute ban. It reads as a template default — the first thing any CSS framework ships. On a dark background it looks especially template-y.
- **Fix options:**
  - **Tinted surface (recommended for dark theme):** Replace with a soft background tint and uniform padding:
    ```css
    .post-body :global(blockquote) {
      background: rgba(255, 255, 255, 0.04);
      border-radius: var(--radius-md);
      padding: var(--sm-spacer) var(--md-spacer);
      margin: var(--md-spacer) 0;
      font-style: italic;
      color: var(--muted);
    }
    ```
  - **Pull quote treatment:** Elevate blockquotes to a distinct typographic voice moment:
    ```css
    .post-body :global(blockquote) {
      font-family: 'Pridi', serif;
      font-size: clamp(1.1rem, 2.5vw, 1.25rem);
      color: var(--toe-bean-pink-200);
      font-style: italic;
      text-align: center;
      padding: var(--md-spacer) var(--lg-spacer);
      margin: var(--md-spacer) 0;
    }
    ```

---

### P1 — Major Layout Failures

#### [P1] Reading column not centered — `65ch` left-aligned inside `780px` container

- **Location:** `src/layouts/PostLayout.astro:101–107`
- **Current code:**
  ```css
  .post-body {
    max-width: 65ch;
    /* no margin: 0 auto */
  }
  ```
- **Issue:** `.post-article` is centered at `max-width: 780px`. The `.post-body` column constrains to `~650px` but is left-aligned, leaving ~130px of unintentional whitespace on the right. The cover image, back link, and post title all span the full 780px — only the body text is narrowed, creating an asymmetric layout that looks like a mistake.
- **Fix (option A — preferred):** Remove `max-width: 65ch` from `.post-body` and narrow the article container instead. This keeps all elements — cover, nav, title, body — the same width:
  ```css
  .post-article { max-width: 680px; }
  .post-body { /* remove max-width */ }
  ```
- **Fix (option B):** Keep 780px article, center the body column:
  ```css
  .post-body { max-width: 65ch; margin: 0 auto; }
  ```
  This creates an intentional asymmetry in header vs. body, which needs to be deliberate design — not the current implicit accident.

---

#### [P1] Spacing monotony — `var(--md-spacer)` dominates every gap

- **Location:** `src/layouts/PostLayout.astro:53, 67, 113–115, 128–130, 164`
- **Issue:** The layout has one gear. `var(--md-spacer)` (2rem) appears for:
  - `.post-back` bottom margin (line 53)
  - `.post-header` bottom margin (line 67)
  - `h2`/`h3`/`h4` top margin in body (line 113)
  - `blockquote` margin (line 130)
  - Inline images margin (line 122–123)

  Paragraphs use `var(--sm-spacer)` (0.75rem). That's two distinct values for the entire layout. There is no hierarchy of space, no rhythm of tight vs. generous, no spatial signal of importance. The squint test fails: no element reads as more significant than another through space alone.

- **Fix — establish a clear spacing hierarchy:**

  | Element | Current | Should be | Reason |
  |---|---|---|---|
  | Post-back → cover/header | `--md-spacer` (2rem) | `--sm-spacer` (0.75rem) | Back link is utility nav, not structural |
  | Post-header → body | `--md-spacer` (2rem) | `--lg-spacer` (4rem) | Biggest gap on page — signals "now we read" |
  | h2 margin-top | `--md-spacer` (2rem) | `--lg-spacer` (4rem) | New section; must feel like a break |
  | h3 margin-top | `--md-spacer` (2rem) | `--md-spacer` (2rem) | Fine — subsection within a section |
  | h4 margin-top | `--md-spacer` (2rem) | `--sm-spacer` (0.75rem) | Minor subhead; shouldn't interrupt flow |
  | Heading → following text | `--sm-spacer` (0.75rem) | `--xs-spacer` (0.5rem) | Heading binds tightly to its content below |
  | Paragraphs | `--sm-spacer` (0.75rem) | keep | Fine |

---

#### [P1] Back link buried between cover image and header

- **Location:** `src/layouts/PostLayout.astro:22–26`
- **Current DOM order:**
  ```html
  {coverImage && <div class="post-cover"><img … /></div>}
  <a href="/posts" class="post-back">← Paws &amp; Reflect</a>
  <header class="post-header">…
  ```
- **Issue:** When a cover image is present, the back navigation appears between a full-width hero image and the article title — the worst possible placement. The eye lands on the image, is interrupted by a small nav link it must skip, then reaches the title. Navigation affordances belong at the top of the page, not mid-flow.
- **Fix:** Move the back link above the cover image:
  ```html
  <a href="/posts" class="post-back">← Paws &amp; Reflect</a>
  {coverImage && <div class="post-cover"><img … /></div>}
  <header class="post-header">…
  ```
  Visual order becomes: navigate if needed → hero moment → title → read. This also fixes the no-cover case, where the back link currently has no visual anchor above it.

---

### P2 — Significant Layout Issues

#### [P2] Post-title letter-spacing contradicts Pridi's designed rhythm

- **Location:** `src/layouts/PostLayout.astro:98`
- **Current code:** `letter-spacing: -0.5px;`
- **Issue:** DESIGN.md defines Pridi heading letter-spacing as positive — H2 uses 3px, H3 uses 1px. Pridi is a Thai-influenced serif whose identity is its airy, bracketed-serif quality. Negative tracking closes the letterforms and makes it read like generic compressed type.
- **Fix:** `letter-spacing: 1px;` — matches the DESIGN.md H3 value, appropriate for clamp-scaled display text that may run long across multiple lines.

---

#### [P2] No visual entrance into the article body

- **Location:** `src/layouts/PostLayout.astro:66–68`
- **Current code:** `.post-header { margin-bottom: var(--md-spacer); }` = 2rem
- **Issue:** The transition from header to body is the most significant spatial boundary in any long-form article. 2rem — the same gap used between any two generic elements — communicates no such transition. The reader's eye runs the title directly into the first paragraph without a breath.
- **Fix:** `margin-bottom: var(--lg-spacer);` (4rem). This one change creates a felt pause and spatially declares: "the article begins here."

---

#### [P2] Heading-to-body spacing inverted at the wrong size

- **Location:** `src/layouts/PostLayout.astro:113–115`
- **Current code:**
  ```css
  .post-body :global(h2),
  .post-body :global(h3),
  .post-body :global(h4) {
    margin-top: var(--md-spacer);
    margin-bottom: var(--sm-spacer);
  }
  ```
- **Issue:** All three heading levels get the same spacing. An `h2` is a major section break; an `h4` is a minor inline label. Treating them identically erases the document hierarchy. Additionally, the margin-bottom (0.75rem) that binds a heading to its content is slightly loose — the heading should own its following text more definitively.
- **Fix:**
  ```css
  .post-body :global(h2) { margin-top: var(--lg-spacer); margin-bottom: var(--xs-spacer); }
  .post-body :global(h3) { margin-top: var(--md-spacer); margin-bottom: var(--xs-spacer); }
  .post-body :global(h4) { margin-top: var(--sm-spacer); margin-bottom: var(--xxs-spacer); }
  ```
  h2 gets `--lg-spacer` (4rem) above — a real section break. h4 gets `--sm-spacer` (0.75rem) above — barely interrupts flow. All headings tighten their bottom margin to 0.5rem / 0.25rem to bind more clearly to their content.

---

#### [P2] No article closure — page ends abruptly after body

- **Location:** `src/layouts/PostLayout.astro:35` — after `<slot />` / `<PodcastEmbed>`
- **Issue:** After the last paragraph, nothing. No visual separator from the footer, no "back to journal" CTA, no related posts, no breadcrumb. The reader finishes the article and the page dissolves. For a portfolio, a finished post is a conversion moment — the reader's next action should be invited, not abandoned.
- **Fix:** Add an article footer with generous breathing room:
  ```html
  <footer class="post-footer">
    <a href="/posts" class="post-footer-back">← Back to Paws &amp; Reflect</a>
  </footer>
  ```
  ```css
  .post-footer {
    margin-top: var(--xl-spacer);
    padding-top: var(--md-spacer);
    border-top: 1px solid var(--rule);
  }
  .post-footer-back {
    font-family: 'Public Sans', sans-serif;
    font-size: var(--text-sm);
    color: var(--muted);
    text-decoration: none;
    transition: color 0.15s;
  }
  .post-footer-back:hover { color: var(--toe-bean-pink-200); }
  ```

---

### P3 — Minor / Polish

#### [P3] Article top padding too deep on tablet — no fluid clamp

- **Location:** `src/layouts/PostLayout.astro:41–44`
- **Current code:** `padding: var(--lg-spacer) var(--def-spacer)` = `4rem 1rem`
- **Issue:** At 769–900px (tablets that escape the `≤768px` breakpoint), 4rem of top padding above the back link pushes the title far below the fold. A mobile override exists at ≤768px but the breakpoint misses the tablet range.
- **Fix:** Use `clamp()` to make padding fluid:
  ```css
  .post-article {
    padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 1.5rem);
  }
  ```
  Remove the `@media (max-width: 768px)` padding override — the clamp covers the range.

---

#### [P3] `post-meta` — date and category visually run together

- **Location:** `src/layouts/PostLayout.astro:70–76`
- **Current code:**
  ```css
  .post-meta { display: flex; gap: var(--xs-spacer); align-items: center; }
  ```
- **Issue:** Date and category chip are separated by 0.5rem with nothing between them. They're distinct elements (a timestamp vs. a classification label) but at a glance read as one undifferentiated label row. A separator makes parsing effortless.
- **Fix:** Add a separator between the two elements. In the HTML:
  ```html
  <time class="post-date" …>{formattedDate}</time>
  <span class="post-meta-sep" aria-hidden="true">·</span>
  <span class="post-category">{category}</span>
  ```
  ```css
  .post-meta-sep { color: var(--subtle); }
  ```

---

#### [P3] `line-height-reading` at 1.7 — could breathe more on dark background

- **Location:** `src/styles/global.css:106`
- **Current:** `--line-height-reading: 1.7`
- **Issue:** The brand register reference specifies: "Light text on dark backgrounds: add 0.05–0.1 to line-height." Public Sans at 1rem on `#111216` reads as slightly tight at 1.7. For a long-form article where reading comfort is critical, 1.75–1.8 reduces eye fatigue on dark surfaces.
- **Fix:** `--line-height-reading: 1.75;`

---

## Layout Fix Order

| Priority | Fix | File | Lines |
|---|---|---|---|
| P0 | Replace blockquote side-stripe border | PostLayout.astro | 129–135 |
| P1 | Center `.post-body` (add `margin: 0 auto` or narrow article to 680px) | PostLayout.astro | 41, 101–107 |
| P1 | Establish spacing hierarchy (vary gaps from xs to xl) | PostLayout.astro | 53, 67, 113–115, 128, 164 |
| P1 | Move back link above cover image | PostLayout.astro | 22–26 |
| P2 | Fix post-title letter-spacing (`-0.5px` → `1px`) | PostLayout.astro | 98 |
| P2 | Increase header → body gap (`--md-spacer` → `--lg-spacer`) | PostLayout.astro | 67 |
| P2 | Differentiate h2/h3/h4 margins in post body | PostLayout.astro | 113–115 |
| P2 | Add article footer with back-link CTA | PostLayout.astro | after `<slot />` |
| P3 | Fluid top padding with `clamp()`, remove `@media` override | PostLayout.astro | 41, 172–174 |
| P3 | Add `·` separator between date and category in post-meta | PostLayout.astro | 23–25 |
| P3 | Nudge `--line-height-reading` to 1.75 | global.css | 106 |

---

## What's Working

- `max-width: 780px` article container is a reasonable reading width for a portfolio post
- `clamp(1.6rem, 5vw, var(--h2))` on `.post-title` scales correctly across viewport sizes — keep this
- Cover image `aspect-ratio: 16/9` with `border-radius: var(--radius-lg)` is solid
- `var(--line-height-reading)` on `.post-body` (1.7) is the right instinct, just slightly too tight for dark-background long-form
- `.post-back` hover transition to `var(--toe-bean-pink-200)` is correct and on-brand
- Post meta uses `text-extra-sm` + uppercase + letter-spacing — consistent with the design system's label-caps pattern

---

## Next Steps

After implementing the P0–P2 fixes above:

```
/impeccable polish /post/{slug}    # Final quality pass
```

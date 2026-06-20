---
version: alpha
name: Emily Backes Design Portfolio
description: Dark-mode-first portfolio for Emily Backes, Product Designer — warm Toe Bean Pink and deep navy accents over layered charcoal backgrounds, with playful personality in copy and illustration.
colors:
  bg: "#111216"
  surface: "#1a1c23"
  elevated: "#22242d"
  card: "#282838"
  highest: "#2f313a"
  ink: "#f4f4f6"
  body: "#c4c5c9"
  muted: "#a8a8ac"
  subtle: "#76777d"
  light-bg: "snow"
  pink-100: "#f6dadd"
  pink-200: "#f1b4bb"
  pink-400: "#c88f96"
  pink-500: "#774d52"
  navy-100: "#c3dbff"
  navy-200: "#92bfff"
  navy-500: "#1f4172"
  navy-600: "#1a365f"
  midnight-300: "#89a0dc"
  midnight-500: "#2f4276"
  midnight-600: "#132043"
  brand: "#dd2a3b"
  brand-light: "#e45562"
  green: "#559d69"
  minty: "#c7e0da"
typography:
  h1:
    fontFamily: Pridi
    fontSize: 2.986rem
    fontWeight: 600
    letterSpacing: 4px
  h2:
    fontFamily: Pridi
    fontSize: 2.488rem
    fontWeight: 600
    letterSpacing: 3px
  h3:
    fontFamily: Pridi
    fontSize: 2.074rem
    fontWeight: 600
    letterSpacing: 1px
  h4:
    fontFamily: Pridi
    fontSize: 1.728rem
    fontWeight: 600
    letterSpacing: 1px
  h5:
    fontFamily: Pridi
    fontSize: 1.44rem
    fontWeight: 600
    letterSpacing: 1px
  body-md:
    fontFamily: Public Sans
    fontSize: 1rem
    lineHeight: 1.44rem
  body-sm:
    fontFamily: Public Sans
    fontSize: 0.833rem
  body-xs:
    fontFamily: Public Sans
    fontSize: 0.694rem
  label-caps:
    fontFamily: Public Sans
    fontSize: 0.694rem
    fontWeight: 400
  pillars-heading:
    fontFamily: Lexend
    fontWeight: 600
  pillars-body:
    fontFamily: Inconsolata
    fontSize: 1rem
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  xl: 24px
  pill: 32px
  full: 100%
spacing:
  xxs: 0.25rem
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 2rem
  xl: 4rem
  xxl: 8rem
  xxxl: 16rem
components:
  nav-link:
    textColor: "{colors.ink}"
    typography: body-md
    backgroundColor: "transparent"
    rounded: sm
    padding: "5px 8px"
  nav-link-hover:
    textColor: "{colors.pink-200}"
    backgroundColor: "transparent"
    rounded: sm
  button-primary:
    backgroundColor: "{colors.pink-200}"
    textColor: "#333333"
    typography: label-caps
    rounded: sm
    padding: "9px 15px"
  button-primary-hover:
    backgroundColor: "{colors.pink-400}"
    textColor: "#333333"
    rounded: sm
  card:
    backgroundColor: "{colors.surface}"
    rounded: lg
  card-elevated:
    backgroundColor: "{colors.elevated}"
    rounded: lg
  tag-chip:
    backgroundColor: "transparent"
    textColor: "{colors.pink-200}"
    typography: label-caps
    rounded: sm
---

## Overview

"Wrangler of Pixels. Herder of Cats. & Humans." The portfolio is dark-mode-first and personality-forward. Deep charcoal and navy backgrounds anchor a rigorous case study structure, while Toe Bean Pink — a dusty blush accent — signals every interactive moment. The mode is: serious work, light spirit.

Pridi, a Thai-influenced serif, lends editorial warmth to headings. Public Sans keeps body copy clean and accessible on dark surfaces. Cat motifs, illustrated SVGs, and self-aware section names ("Purr-ficiencies," "Paws & Reflect") weave character throughout without undercutting professional credibility.

## Colors

The palette is built on a dark layered background system driven by a single warm accent — Toe Bean Pink — with deep navy as a structural secondary.

- **bg (#111216):** Deepest background — the true page floor.
- **surface (#1a1c23):** Primary card and section surface; first elevation step.
- **elevated (#22242d):** Interactive and featured card surfaces; second elevation.
- **card (#282838):** Default card background for content grids.
- **highest (#2f313a):** Reserved for selected or active states.
- **ink (#f4f4f6):** Near-white for high-emphasis headings and iconography.
- **body (#c4c5c9):** Main body text — warm grey, slightly muted for comfort on dark.
- **muted (#a8a8ac):** Secondary text, metadata, captions.
- **subtle (#76777d):** Tertiary text, decorative labels, placeholder copy.
- **light-bg (snow):** White foundation used exclusively inside light-mode case study embeds.
- **pink-200 (#f1b4bb):** "Toe Bean Pink" — the primary interactive accent. Hero headings, hover states, CTA buttons, and active tags all draw from here.
- **pink-400 (#c88f96):** Deepened pink for button hover and active states.
- **navy-500 (#1f4172):** Deep navy for case study subheadings, accent borders, and SWOT quadrant fills.
- **midnight-600 (#132043):** Darkest navy for deep section backgrounds in case study work.
- **brand (#dd2a3b):** Vivid red — used sparingly for brand badges and high-urgency accents; never for interactive UI.
- **green (#559d69):** Positive indicators, success labels.

**Light-page tokens** (used by the Toe Bean Pink custom pages — see "Light Custom Pages" below):

- **snow (#fffafa):** Near-white for dots, timeline progress fill, footer link/heading text on dark cards, and the offset button "hard shadow." (`--snow`)
- **midnight-500 (#2f4276):** Mid navy — photo gradient overlays, timeline year labels, sub-headlines, and copyright text on pink.
- **polaroid-cream (#dee1d2):** Off-white photo-card stock for polaroid frames. (`--polaroid-cream`)
- **card (#282838):** Doubles as the dark footer-card surface on the light pages (`--card-bg-default`).

## Typography

Two typefaces carry the main site. They should never be swapped for alternatives without a deliberate redesign decision. (The light custom pages are the documented exception — the 5 Pillars page uses **Lexend** + **Inconsolata**, and the case-study detail pages use **Lato** for headings (with **Josefin Sans** as the Subscription page's display font), each to stay 1:1 with its original Webflow build; see "Light Custom Pages.")

**Pridi** — a Thai-influenced serif designed by Cadson Demak. Its gentle curves and bracketed serifs provide editorial warmth and visual personality at display sizes. Used exclusively for headings (H1–H5). Letter-spacing opens progressively at larger sizes to improve legibility and give the headers an airy, spacious rhythm.

**Public Sans** — a grotesque commissioned by the U.S. Web Design System. Its restrained geometry and high x-height make it exceptionally legible at small sizes on dark backgrounds. Used for all body copy, navigation links, buttons, tags, and form labels.

The scale uses a ~1.2× modular ratio anchored at 1rem:

| Token | Size | Role |
|---|---|---|
| `--h1` | 2.986rem | Hero headlines, section hero titles |
| `--h2` | 2.488rem | Primary section titles |
| `--h3` | 2.074rem | Subsection headers, case study chapter titles |
| `--h4` | 1.728rem | Card titles, sidebar headings |
| `--h5` | 1.44rem | Small section labels, card subtitles |
| `--text-body` | 1rem | Body paragraphs, nav links |
| `--text-sm` | 0.833rem | Secondary body, card descriptions |
| `--text-extra-sm` | 0.694rem | Tags, labels, metadata, button text |
| `--text-xl` | 56px | Hero tagline spans (responsive, above 1rem breakpoint) |

## Layout & Spacing

The layout is a centered single-column composition, max-width ~1030px, with full-bleed section backgrounds. Content sections stack vertically with generous inter-section whitespace.

The spacing system has two parallel scales — a semantic rem scale (`xxs`–`xxxl`) and a 9-stop pixel alias scale (`sp-1`–`sp-9`) for precise component work:

| Semantic | px alias | Value |
|---|---|---|
| `xxs` | `sp-1` | 0.25rem / 4px |
| `xs` | `sp-2` | 0.5rem / 8px |
| `sm` | `sp-3` | 0.75rem / 12px |
| `md` | `sp-4` | 1rem / 16px |
| — | `sp-5` | — / 24px |
| `lg` | `sp-6` | 2rem / 32px |
| — | `sp-7` | — / 48px |
| `xl` | `sp-8` | 4rem / 64px |
| `xxl` | `sp-9` | 8rem / 96px |
| `xxxl` | — | 16rem |

Case studies display in a numbered grid (.01–.05). Blog previews in a 2–3 column card grid. Testimonials in a horizontal card row.

## Elevation & Depth

Depth is communicated entirely through background lightness — no drop shadows are used on the dark theme. This keeps the UI clean and avoids the muddiness shadows create against near-black backgrounds.

The four-tier elevation stack:

1. **bg (#111216):** Page foundation — below all content.
2. **surface (#1a1c23):** Primary card surfaces, section panels.
3. **elevated (#22242d):** Featured or interactive cards, hover states.
4. **highest (#2f313a):** Active/selected state backgrounds.

Section dividers use translucent white rules (`#ffffff12` subtle, `#ffffff21` stronger) to separate content without disrupting the dark atmosphere.

## Shapes

Rounded corners follow a 4px base scale:

- **xs (2px):** Micro-rounding for photo corners inside polaroid frames and the nav hamburger bars (`--radius-xs`).
- **sm (4px):** Buttons, nav hover chips, tag badges — tight rounding for precision components.
- **md (8px):** Input fields, small utility cards.
- **lg (16px):** Case study cards, blog cards, featured content panels.
- **xl (24px):** Large modal or overlay surfaces.
- **pill (32px):** Badge-style labels, decorative pill elements.
- **full (100%):** Avatar images, circular icon frames, skill bubble indicators.

Asymmetric corner radii (e.g., `border-radius: 0 16px 0 0`) appear on decorative illustrated elements and section accent shapes — they add visual dynamism without breaking the grid.

## Components

### Navigation

Transparent top bar with the EB logo left-anchored and text links right-aligned. Links use Public Sans body-md, white (`ink`) at rest, transitioning to `pink-200` on hover with a `sm`-radius background chip. The final link — "Let's connect" — acts as the primary header CTA.

### Buttons

Primary action buttons: `pink-200` background, `#333` text, Public Sans `label-caps` (uppercase, 0.694rem), `sm` border radius. On hover, background deepens to `pink-400`. The uppercase treatment signals action without aggressive weight.

### Case Study Cards

Numbered (.01–.05 notation) with a `surface` or `elevated` background, `lg` radius. Structure: category tag row (uppercase, `pink-200`, `text-extra-sm`) → Pridi H4 title → Public Sans `text-sm` excerpt → "explore case study" link. Numbering uses a large decorative numeral in `subtle` color as a visual anchor.

### Blog Cards ("Paws & Reflect")

Image-forward cards with a featured thumbnail, a category tag chip, a Pridi headline, and a short Public Sans excerpt. Category tags use `pink-200` text against the dark card background.

### Testimonials

Profile avatar (full-radius image) + name + title + pull quote. Laid out in a horizontal card row on desktop. Pull quotes are set slightly larger than body-md for visual distinction.

### SWOT Analysis

Four-quadrant grid — Strengths, Weaknesses, Opportunities, Threats — each with a thematic illustrated icon. Quadrant backgrounds use category-specific colors (`navy-500`, `midnight-600`, `pink-400` tints) to differentiate at a glance. Bullet points in Public Sans `body-sm`.

### Skills Section ("Purr-ficiencies")

Skill tags displayed as flat chips with subtle borders. Categories include UX Research, UI Design, Product Design, Leadership. Uses `text-extra-sm` uppercase labels.

## Light Custom Pages (Toe Bean Pink theme)

The dark-mode-first system above governs the home page, the case-study **catalog** (the numbered grid on the home page), and the journal. Several **standalone personality pages — `/about`, `/the-5-pillars-of-emily`, `/resume`, legal pages — plus the case-study DETAIL pages (`/case-study/<slug>`) — are intentionally LIGHT**, ported 1:1 from the original Webflow site. They invert the palette: a full Toe Bean Pink (`#f1b4bb`) page background with deep-navy structure. This is a deliberate, documented exception, not drift — these pages predate the dark redesign and retain their original look.

**Palette inversion on these pages:**

- **Page background:** `pink-200` (#f1b4bb) — set on `body` per-page via a scoped `is:global` rule.
- **Primary text / structural boxes:** `navy-500` (#1f4172). Secondary navy / labels: `midnight-500` (#2f4276). Deepest box (e.g. the Pillars CTA): `midnight-600` (#132043).
- **Accent / buttons:** buttons flip to a `pink-200` fill with `navy-500` text (the reverse of the dark theme), plus an offset `snow` hard-shadow (`-4px 4px 0`) that the button slides into on hover (`translate(-4px,4px)`, shadow removed, text → white).
- **Nav:** sticky, `top: 1rem`, transparent with `backdrop-filter: blur(16px)`, 1140px max-width. Navy logo, white links (→ pink on hover), navy "contact me" CTA. Collapses to a hamburger ≤991px.
- **Footer:** a `snow`/pink band wrapping a dark `card` (#282838) panel — white logo (`eb_logo2.svg`), two link columns, midnight-500 copyright on the pink band below the card.

**Light-page component patterns (as built on `/about`):**

- **Hero photo cards:** CSS `background-image` divs at `md` (8px) radius, each with a `linear-gradient(transparent 33%, midnight-500)` overlay anchoring a centered pink Pridi label at the bottom. Laid out in a 3-col grid (lavender photo spans 2; two stacked cat cards in col 3).
- **Quick Facts:** 3-col grid — a navy `QUICK / FACTS` box (pink Pridi H1) beside a 2-col-spanning list of facts, each prefixed by a 40px navy-tinted Lottie icon (lord-icon).
- **Polaroid marquee:** an infinitely scrolling (leftward, ~linear, no hover-pause) row of `polaroid-cream` cards at `sm` radius, photos at `xs`-radius top corners, each card rotated ±3–7°, with a handwritten-caption SVG below. Two duplicated tracks translate `0 → -100%` for a seamless loop; honors `prefers-reduced-motion`.
- **"Path to UX" timeline:** per-entry `1fr 160px 1fr` grid (right-aligned year+body | centered `snow` dot | bold title + 16:9 photo). One continuous 2px `pink-300` track runs down the center with a `snow` scroll-progress fill. **Hidden entirely below 480px** (matches production).
- **Dual CTA:** two side-by-side boxes (`md` radius) at 50% width — navy "read resume" box + darker midnight-600 "5 Pillars" box with the pillars graphic. Stack vertically ≤767px.

### The 5 Pillars page (`/the-5-pillars-of-emily`)

A long-form editorial essay page, ported 1:1 from Webflow. It is the one page that **uses its own type pairing** — see "Per-page typefaces" below — and a warm cream canvas rather than the pink-200 fill.

**Palette (5p tokens):** page canvas `--5p-bg` (#f6f2ec, warm cream); hero card / audio card / contact card fill `pink-100` (#f6dadd); "What's Next" card fill `navy-100` (#c3dbff); hero H1 `--5p-cold` (#234272); "Listen instead" heading `--5p-orchid` (#cd899e); pull-quote accent + link hover `--5p-ballad` (#a6427c, magenta); body/heading text `midnight-500` (#2f4276) and `navy-500` (#1f4172). Pillar "card" tints are declared but set fully transparent (alpha `00`) so the hero icons float on the pink card. Hairline borders/shadows use navy at low alpha (`#2f42761a`, `#cd899e0d`); link labels use midnight-500 at 50% (`#2f427680`).

**Per-page typefaces:** headings render in **Lexend** (600), body in **Inconsolata** — set on the `.pillars-page` wrapper, overriding the site default Pridi/Public Sans. This matches the original Webflow build and is scoped to this page (the shared Nav/Footer keep the site fonts).

**Section rhythm:** full-width `section`s on the cream canvas, each with a centered inner container (max-width 1440px). No alternating background stripes — the illustrations carry the visual rhythm. Two-column rows collapse to one column at **991px**; the CTA cards stack at **767px**.

**Signature components / patterns:**
- **Staggered hero icons:** five 20%-width cards in a row, each with one absolutely-positioned pillar icon at a different `top` inset (50/30/15/45/30%) so they stagger like organ pipes; icons reveal with staggered AOS `fade-up`.
- **SVG-wordmark eyebrows:** each section's kicker is a hand-lettered SVG wordmark above the H2 (e.g. `introduction.svg`, `ethics_and_sustainability.svg`), not caps text.
- **Pull-quote (`.text-block-112`):** a Lexend, `--h5` block with a 4px `--5p-ballad` **left border**. This single-side accent border is an intentional, faithful reproduction of the source design — not AI drift — and is the canonical pull-quote treatment for this page family.
- **Layered illustration compositions:** several pillars stack multiple SVGs in a `position:relative` parent with `position:absolute` layers — Ethics (`group_chat_v3` base + 3 chat bubbles), Balance (`balance_character` + `balance_cat` + `balance_lines`). Overlay layers reveal with AOS `zoom-in`/`fade-up`.
- **Flanking characters:** Collaboration places tall character SVGs left/right of a centered two-card text block; these are `display:none` ≤991px.
- **CTA cards:** a blue (`navy-100`) "What's Next" card beside a pink (`pink-100`) contact card with three arrow-icon (`arrow_right_icon.svg`) link rows and decorative semicircle graphics.

### Case Study Detail Pages (`/case-study/<slug>`, 1:1 Webflow port)

The individual case-study pages (Sage, Folsom, Subscription Cancellation, Lago, and Sprocket) are **1:1 visual ports of the production Webflow site** — a deliberate, documented exception to dark-mode-first. The home-page case **catalog** stays dark; only the detail pages are light. Each renders on a near-white canvas with editorial, content-rich layouts (data-viz, version badges, comparison cards, animated hero graphics) that the dark token system was never meant to express.

**Why a verbatim port (not a token rebuild):** these pages are dense with bespoke per-page graphics — JS-drawn SVG charts, animated "fake app" hero SVGs, hand-built node diagrams. Reproducing them from tokens would lose fidelity. Instead the production body HTML, its Webflow CSS subset, and its inline animation scripts are ported as-is.

**Architecture:**
- Each page is a self-contained `src/pages/case-study/<slug>.astro` (NOT the dynamic `[slug].astro` MDX route — ported slugs are excluded from that route's `getStaticPaths`).
- The production `<body>` content is pasted into the page template verbatim, minus the Webflow navbar/footer (the shared site `Nav` + `Footer` from `PageLayout` wrap it instead — a deliberate improvement over prod's per-page chrome inconsistency).
- The minimal CSS subset each page needs is extracted from the Webflow stylesheet into the page's scoped `<style>`. The Webflow `:root` token block is **re-scoped to a page-level wrapper** (`.cs-port-root` or the page's own `*-main-wrapper`) so its values can't leak onto the shared Nav/Footer.
- Inline animation scripts (chart generators, the chatbot/hero animations, scroll-reveal, count-ups) are preserved as `<script is:inline>`. Webflow Lottie icons (`[data-animation-type="lottie"]`) are re-initialized with the already-bundled `lottie-web`.
- Page assets are localized under `public/assets/cs/<slug>/`.

**Typography:** heading fonts are per-page, matching each page's original Webflow build, all loaded globally in `Layout.astro`: **Lato** (Sage), **Roboto Slab** (Folsom headings), **Josefin Sans** (Subscription display font `--font-display` — the source left it undefined, a latent prod bug the port fixes), and **Lexend** (Lago + Sprocket section headings; Lago's hero `<strong>` is also Lexend, Sprocket's hero + headings are **Public Sans**). In-graphic SVG text uses `system-ui`/`-apple-system` exactly as authored. Body copy inherits the serif/sans as set by the ported Webflow classes. NB: Webflow wraps most heading text in a `<strong>`/`<span>` that carries the real font; the bare `<h1>`/`<h2>` element may fall through to the site-default Pridi, but no visible text uses it — verify the **text-bearing child**, not the wrapper, when contrast/font-checking.

**Palette:** light/near-white section backgrounds, teal (`#046c7a`) as the dominant case-study accent (Sage), brand red (`#dd2a3b`) for product-UI replicas, with per-page accent colors carried directly from the source. Do not "correct" these toward the dark token palette. **Lago** introduces the **Tech Fleet "TF" brand set** — `--tf-blue #1d44c0` (headings, blue outcome card), `--tf-body #09143a` (dark navy body/labels), `--midnight-blue-300 #89a0dc` (light-blue eyebrows) — on a `#fafcfd` canvas, plus a warm `#ffd95d` yellow for the first outcome card. **Sprocket** sits on a `#ebe9f0` lavender-gray canvas with `#284b63` slate headings, pink section panels, a sage-green (`#80ada0`) skill-chip fill, and a green Sprocket brand card. These per-page brand colors are intentional 1:1 — do not remap them to site tokens (mirrors the Case Catalog 1:1 rule).

**Per-page nav theme:** the shared Nav auto-picks its light/dark variant from `src/lib/page-theme.ts` (`LIGHT_ROUTES`). Sage, **Lago**, and **Sprocket** are light-canvas pages so they're registered there (transparent nav, navy links/logo, "contact me" CTA). Folsom and Subscription are dark-themed pages, so they keep the default dark nav. Register a newly-ported page in `LIGHT_ROUTES` only if its canvas is light.

**Accessibility:** body text on the light pages must meet WCAG AA (≥4.5:1). The source's muted body gray (`#718182` ≈ 3.8:1) and label gray (`#a3adae` ≈ 2.1:1) fail; the Sage port remaps them to `#586867` (≈5.4:1). Two gotchas on a light page inside this dark-first site: (1) `body` must get a light background or the dark site default (`#111216`) shows as a dark band behind the transparent sticky nav. Set it via the **`bodyBg` prop** on `PageLayout` (e.g. `bodyBg="#fafcfd"`), which `Layout.astro` applies as an **inline `<body>` style**. Do NOT use a page-level `<style is:global>body{…}</style>` rule: it has the same specificity as `global.css`'s `body { background: var(--bg) }` and loses on source order in `astro dev` (it happens to win in the production build, so the band is invisible in `preview` but shows in dev — a trap). The inline style beats every stylesheet rule in both modes. (2) `global.css` has `p { color: var(--body) }` (`#c4c5c9`) which wins over an inherited wrapper color, so paragraphs need a direct, higher-specificity override (`.sage-main-wrapper p { color: #586867 }`). This is a deliberate, documented improvement over prod — when porting a light page, contrast-check its readable text and remap failing colors.

  **The color-less-element trap (Lago/Sprocket):** Webflow div/heading classes that set *no* `color` (e.g. `.text-block-117` phase labels, `.text-block-83` outcome-card eyebrow) inherit `body { color: #c4c5c9 }` from the dark-first `global.css` and render **invisible** (≈1.2:1) on a light canvas — even though prod shows them dark. This is distinct from the muted-gray case above: there's no source color to "remap," so add an explicit dark color via the build script's `CSS_APPEND` (Lago uses `.text-block-117{color:#09143a}.text-block-83{color:#09143a}`). Catch these with an automated contrast probe (computed text-color vs. nearest opaque ancestor bg) over `.cs-port-root *`, not just an eyeball pass — they hide in animated/diagram regions. Distinguish them from elements that *do* carry an explicit sub-AA brand color (Lago's `#89a0dc` eyebrows ≈2.5:1, Sprocket's white-on-`#80ada0` chips ≈2.4:1): those match prod exactly and are left as 1:1, not "fixed."

When building or extending these light pages, prefix component classes (e.g. `pl-`) and scope the page background + per-page typefaces to the page wrapper so the shared dark Nav/Footer and dark pages remain untouched.

**Custom case-study elements (ported, not token-derived).** These pages carry bespoke layout components the dark token system doesn't define. Preserve them verbatim; treat this as the catalog of what's expected on a ported detail page:

- **Animated hero with baked-in product UI** — the hero "image" is a full screenshot of the live product (Lago's "Welcome to LAGO" landing mockup, including its blue *"Chat with us now!"* widget; Sprocket's three iPhone frames), wrapped in a soft radial glow. The chat widget and testimonial row are *part of the image file*, not live components — do not mistake them for stray overlays.
- **Phase-progression diagram** (Lago) — a horizontal row of hatched (diagonal-stripe) bars labeled `Discovery · Solution · Strategy & Design · Development · QA & Testing`, with a glowing center node carrying an animated `wired-outline` puzzle Lottie. Labels are `.text-block-117` (see the color-less trap above).
- **Paired outcome cards** (Lago) — two side-by-side 16px-radius cards: a `#ffd95d` yellow "Project Challenges" card (dark navy text) and a `#1d44c0` TF-blue "Project Changes" card (white text), each topped by a `wired-outline` Lottie (paper-boat, layers).
- **`wired-outline` Lottie icon sets** — both pages use multiple looping line-icon Lotties (tools row, responsibilities grid, phase node, outcome cards). Webflow's IX2 runtime is absent, so they're re-initialized via bundled `lottie-web` and **autoplay/loop** rather than scroll-triggering — a minor, acceptable motion difference from prod (prod may show a static first frame until scroll).
- **Comparison / data graphics** (Sprocket) — a competitive-analysis check/✗ comparison table, a hand-drawn "Bike App" mind map, a sine-wave *"start loose, finish tight"* iteration graphic, a four-stage wireframe→hi-fi gallery, and a multi-screen hi-fidelity grid. (Lago) — a team org chart with avatars, a Kanban board image, and node-flow priority diagrams.
- **Skill / tag chips** — small pill chips listing the UX skillset (Lago: `.lago_pill`; Sprocket: sage-green `.default_pill`) and a logos row of tool brands (Slack, Loom, Google Calendar, Notion, Miro).

**Verifying a port (parity loop).** Screenshot prod and local full-page at 1440px, slice into aligned bands, and diff band-by-band (layout/copy/graphics/color). Full-page height should land within ~1% of prod. Strip the **Astro dev toolbar** (`document.querySelector('astro-dev-toolbar')?.remove()`) before shooting in `dev` — it's a fixed bottom-center overlay that otherwise reads as a stray dark pill. Validate with `npm run build` (ported pages are excluded from `astro check` in `tsconfig.json` because they hold verbatim third-party SVG/script, but the build still type-checks the rest).

## Do's and Don'ts

**Do:**
- Use `pink-200` (#f1b4bb) as the sole interactive accent — hover states, CTAs, active links, heading accents
- Pair Pridi headings with Public Sans body copy exclusively; no other font combinations in the main layout
- Maintain dark backgrounds throughout; `light-bg` (snow) is only for embedded light-mode case study panels
- Set category tags and metadata in uppercase Public Sans at `text-extra-sm` with wide letter-spacing
- Use illustrated SVG elements to carry personality — keep surrounding copy direct and professional
- Apply `lg` (16px) radius to all content cards; `sm` (4px) to all interactive controls

**Don't:**
- Use `brand` red (#dd2a3b) for interactive UI — it reads as error or alert; reserve it for brand badges
- Apply drop shadows on dark backgrounds — use background-lightness elevation only
- Mix navy/midnight blue palette with `pink-200` in the same interactive component **on the dark theme** (the light custom pages intentionally do — see "Light Custom Pages")
- Use Pridi below 1.44rem — it loses legibility at body sizes on dark surfaces
- Center-align long body paragraphs; center alignment is for short section headers and hero taglines only
- Add more typefaces on the **main** site; the two-font system (Pridi + Public Sans) is intentional and complete there. The light custom pages may carry their original Webflow typefaces (e.g. Lexend + Inconsolata on the 5 Pillars page), scoped to the page — this is documented, not drift

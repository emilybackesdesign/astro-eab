# Case-study 1:1 Webflow port

Tooling + recipe for porting a production Webflow case-study page into a self-contained
Astro page that is a 1:1 visual match. See `DESIGN.md` → "Case Study Detail Pages" for the
design rationale. Already ported: **sage-designing-an-ai-powered-chatbot**, **folsom-psychology**,
**subscription-cancellation**, **lago**, **sprocket-app**. All case-study detail pages are now
dedicated 1:1 ports; the dynamic MDX route only serves any future, not-yet-ported slug.

## How it works

Production is a static Webflow site, so true parity comes from porting the real source rather
than re-deriving from tokens:

1. **Fetch** the prod page HTML + the shared Webflow stylesheet.
2. **`scripts/extract-css.cjs`** pulls the minimal CSS subset the page needs out of the
   264KB shared sheet (keyed off the class/id tokens present in the page HTML; keeps
   `@font-face`, referenced `@keyframes`, and matching `@media` blocks).
3. **`scripts/build-page.cjs`** slices the prod `<body>`, drops the Webflow navbar (and footer
   if present — the shared site `Nav`/`Footer` wrap the page instead), localizes CDN assets to
   `/assets/cs/<slug>/`, preserves inline animation scripts as `<script is:inline>`, scopes the
   Webflow `:root` tokens to a page wrapper, and emits `src/pages/case-study/<slug>.astro`.
4. **Exclude** the slug from `src/pages/case-study/[slug].astro`'s `PORTED` set so the dynamic
   MDX route doesn't collide.
5. **Verify** the rebuilt page against prod with a screenshot diff at 1440px; iterate.

## build-page.cjs options (env vars)

| Var | Purpose |
|---|---|
| `ROOTSCOPE` | Selector the Webflow `:root` tokens are re-scoped to (e.g. `.cs-port-root`, or the page's own `*-main-wrapper`). |
| `WRAP=1` | Wrap the ported body in `<div class="cs-port-root">` (needed when the page has no single top wrapper). |
| `DROP_FROM` | Marker string; everything from it onward is cut (used to drop an in-body Webflow footer). |
| `LOTTIE=1` | Append a `lottie-web` initializer for Webflow `[data-animation-type="lottie"]` icons (Webflow's IX2 engine isn't present). |
| `STRIP_IX2=1` | Strip inline `style="…opacity:0…"` IX2 init-states so content isn't stuck hidden without the IX2 runtime. |
| `DISPLAY_FONT` | Define `--font-display` (e.g. `'Josefin Sans',sans-serif`) — some Webflow exports leave it undefined. |
| `PAGE_BG` / `BODY_BG` | Set the wrapper / `body` background to match the prod page's Webflow body bg. `BODY_BG` is emitted as a **`bodyBg` prop on `PageLayout`** (inline `<body>` style), NOT a `<style is:global>` rule — the inline style beats `global.css`'s `body { background: var(--bg) }` in both `dev` and `build` (a plain `body{}` override loses the source-order race in `astro dev`, so the dark band shows only in dev). |
| `CSS_APPEND` | Arbitrary CSS appended last (highest source-order priority) for per-page overrides. |
| `RECOLOR` | JSON array of `[from, to]` string pairs applied to the page CSS — e.g. darkening a prod text color to meet WCAG AA. Remember to remap both the `#hex` and its `lab(...)` twin (Webflow emits both). |
| `SVG_TEXT_RECOLOR` | JSON `[fromFill, toFill]` pairs applied ONLY to `fill="…"` on inline `<text>` elements — for WCAG on hand-built SVG diagram labels, without touching identical fills on `<rect>`/`<path>` shapes. |

Positional args: `<slug> <html> <css> <outAstro> <contentStartMarker> <title> <description> <ogImage> [extraJs,csv]`
— `contentStartMarker` must point at the FIRST real content element (skip the navbar AND any
mobile rotate-warning / `cs_mobile__wrapper`, which is desktop-hidden on prod).

## Reference invocations (the three ported pages)

```sh
# Sage — clean single wrapper, inline SVG hero + JS charts, outcomes count-up.
# RECOLOR darkens the prod body text (#718182, ~3.8:1) + muted labels (#a3adae, ~2.1:1)
# to #586867 (~5.4:1) so the light page meets WCAG AA — prod itself fails this.
# BODY_BG sets a light <body> via PageLayout's bodyBg prop (inline style; the site default is
# dark #111216, which else shows as a dark band behind the transparent sticky nav — and a plain
# is:global body{} rule would lose to global.css in dev). CSS_APPEND colors the body paragraphs directly:
# global.css has `p { color: var(--body) }` (#c4c5c9 ≈ 1.6:1 on cream) which beats inherited
# colors, so a wrapper base color is NOT enough — target `.sage-main-wrapper p` to win on specificity.
RECOLOR='[["#718182","#586867"],["lab(52.603% -5.4661 -2.92336)","#586867"],["#a3adae","#586867"],["lab(69.9595% -3.79741 -1.5921)","#586867"]]' \
CSS_APPEND='.sage-main-wrapper p{color:#586867}' BODY_BG='#f3f7f4' \
ROOTSCOPE='.sage-main-wrapper' node scripts/build-page.cjs sage \
  sage.html sage.extracted.css src/pages/case-study/sage-designing-an-ai-powered-chatbot.astro \
  '<div id="sage-page-header"' "<title>" "<desc>" "<og>" sageoutcomesanim.js
# Sage is light/cream → also registered in src/lib/page-theme.ts LIGHT_ROUTES so the
# shared Nav renders its transparent light variant (no dark band). Folsom/Subscription are dark.

# Subscription — animated SVG hero (cc_hero_anim_v2) + count-up (cc_reveal_stats_v2).
# Dark page; WCAG fixes: brand-red eyebrows #dd2a3b (~3.6-4:1) → #e45562; muted grays
# (OR divider, FRICTION badge, captions, outcome-note) → #b0b1b6; IRREVERSIBLE badge → #ef7480.
# SVG_TEXT_RECOLOR lifts the hand-built diagram's <text> labels (grays → #b0b1b6, reds → #e45562)
# WITHOUT recoloring the brand-red <rect>/<path> shapes that share #dd2a3b.
WRAP=1 ROOTSCOPE='.cs-port-root' DISPLAY_FONT="'Josefin Sans',sans-serif" \
  CSS_APPEND=".before-card-title{font-family:'Barlow Semi Condensed',sans-serif}.eyebrow{color:#e45562}.before-or-divider span{color:#b0b1b6}.before-badge--muted{color:#b0b1b6}.before-badge--danger{color:#ef7480}.asset-caption{color:#b0b1b6}.outcome-note{color:#b0b1b6}" \
  SVG_TEXT_RECOLOR='[["#54565d","#b0b1b6"],["#76777d","#b0b1b6"],["rgba(84,86,93,0.8)","#b0b1b6"],["#dd2a3b","#e45562"],["rgba(221,42,59,0.7)","#e45562"]]' \
  node scripts/build-page.cjs subscription \
  subscription.html subscription.extracted.css src/pages/case-study/subscription-cancellation.astro \
  '<div id="company-cancel-page-header"' "<title>" "<desc>" "<og>" cc_hero_anim_v2.js,cc_reveal_stats_v2.js

# Folsom — 12 Lottie icons, in-body footer dropped, body bg #333, IX2 reveal stripped.
# Folsom is a DARK page (#333) with several LIGHT-bg sections — the inherited #c4c5c9 body text
# is invisible on them (~1.5:1). CSS_APPEND forces dark #333 text on the light cards
# (.fs_cc__wrapper, .div-block-234/249/250/251) and the olive stat panel's own classes
# (.sol_stat_hdg, .text-block-71..74) — NOT a blanket darken, because the olive .div-block-119
# also nests the dark teal/navy panels (which need light text). It also darkens the teal
# challenge panel (#1a9597 → #0f7173) so its lime text clears AA. (The shared footer's
# copyright color was bumped --subtle → --muted in Footer.astro for the same reason.)
EL=':where(p,h1,h2,h3,h4,h5,h6,span,div,strong,b,em,li,a)'
WRAP=1 LOTTIE=1 STRIP_IX2=1 BODY_BG='#333' ROOTSCOPE='.cs-port-root' \
  DROP_FROM='<section class="main_footer__dark fs_footer">' \
  CSS_APPEND=".fs_cc__wrapper $EL,.div-block-234 $EL,.div-block-249 $EL,.div-block-250 $EL,.div-block-251 $EL,.sol_stat_hdg,.text-block-71,.text-block-72,.text-block-73,.text-block-74{color:#333}.div-block-123.project_chal{background-color:#0f7173}" \
  node scripts/build-page.cjs folsom \
  folsom.html folsom.extracted.css src/pages/case-study/folsom-psychology.astro \
  '<section class="fs_hero__section"' "<title>" "<desc>" "<og>" cc_hero_anim_v2.js,cc_reveal_stats_v2.js

# Lago — light (#fafcfd) page, no single wrapper (WRAP), 8 wired-outline Lottie icons,
# in-body footer dropped, IX2 reveal states stripped, Josefin Sans hero display font.
# WCAG/contrast: the phase-diagram labels (.text-block-117) and the yellow outcome-card
# eyebrow (.text-block-83) carry NO source color, so they inherit global.css's dark-theme
# #c4c5c9 and vanish on the light canvas — CSS_APPEND forces them dark (#09143a = --tf-body).
# No inline anim scripts to preserve (only the Google tag IIFE, which build-page strips).
WRAP=1 LOTTIE=1 STRIP_IX2=1 BODY_BG='#fafcfd' PAGE_BG='#fafcfd' \
  ROOTSCOPE='.cs-port-root' DISPLAY_FONT="'Josefin Sans',sans-serif" \
  DROP_FROM='<section class="main_footer__dark lago_footer' \
  CSS_APPEND='.text-block-117{color:#09143a}.text-block-83{color:#09143a}' \
  node scripts/build-page.cjs lago \
  lago.html lago.extracted.css src/pages/case-study/lago.astro \
  '<section data-w-id="25cbef73-b993-b211-6670-8f9647949f03" class="lagos_hero__section"' \
  "<title>" "<desc>" "<og>"
# Lago's content-start marker includes the hero's data-w-id (the class isn't the first attr),
# so the slice begins at the real <section> open, not mid-tag.

# Sprocket — light (#ebe9f0) page, same WRAP/LOTTIE/STRIP_IX2 shape, in-body footer dropped.
# Headings/hero are Public Sans (no display-font dependency); no contrast remap needed —
# its only sub-AA colors (white-on-sage-green skill chips) match prod and stay 1:1.
WRAP=1 LOTTIE=1 STRIP_IX2=1 BODY_BG='#ebe9f0' PAGE_BG='#ebe9f0' \
  ROOTSCOPE='.cs-port-root' DISPLAY_FONT="'Josefin Sans',sans-serif" \
  DROP_FROM='<section class="main_footer__dark sprocket_footer' \
  node scripts/build-page.cjs sprocket \
  sprocket.html sprocket.extracted.css src/pages/case-study/sprocket-app.astro \
  '<section class="sprocket_hero__section"' "<title>" "<desc>" "<og>"
# After downloading assets, decode %-encoded filenames on disk (Notion%20Logomark%201.svg →
# "Notion Logomark 1.svg", and the fingerprint Lottie's "...security (1).json") so refs resolve.
# Both pages are registered in src/lib/page-theme.ts LIGHT_ROUTES (light canvas → light Nav).
```

After generating, download the asset list build-page.cjs prints to `public/assets/cs/<slug>/`
(decode `%20` in filenames so the server resolves them), and run `npm run build` to validate.
The ported pages are excluded from `astro check` (TSX) in `tsconfig.json` because they contain
verbatim third-party inline SVG/scripts; `npm run build` still validates them.

# Plan: 1:1 Port of "The 5 Pillars of Emily"

Goal: make `/the-5-pillars-of-emily` in the Astro build a faithful match of the
production Webflow page at https://emilybackes.design/the-5-pillars-of-emily.

Decisions (confirmed):
- **Typography:** match production exactly — **Lexend** (headings) + **Inconsolata** (body).
  Document this as a per-page design system in `DESIGN.md`.
- **Animation:** reproduce production's scroll-reveal (illustrations fade/slide in).

## Root cause — why the current page diverges
1. **Hero is wrong** — local shows ONE 3D block; production has FIVE pillar icons
   staggered like organ pipes across a pale-pink (`#f6dadd`) full-width card.
2. **All per-pillar illustrations are missing** — local reuses one generic SVG;
   production composes layered SVGs (characters + chat bubbles + cat + lines).
3. **Pull-quotes missing** — each pillar has a Lexend pull-quote with a magenta left border.
4. **Eyebrow labels are SVG wordmarks** in production (`introduction.svg`, etc.), not caps text.
5. **Podcast is misplaced** — production embeds it inline in the intro (right column);
   local moved it to a standalone gray section at the bottom.
6. **"So, What's Next?" CTA section is absent** in local (two cards + arrow links + semicircles).
7. **Wrong fonts** — local uses Pridi/Public Sans; production uses Lexend/Inconsolata.
8. **AOS bug** — every section is wrapped in `data-aos="fade-up"`, so content sits at
   `opacity:0` until scrolled into view; the full-page render looks empty below the hero.

All required illustration assets already exist in `public/assets/images/` — no asset sourcing needed.

---

## Phase 0 — Foundation
- **Load fonts:** add Lexend (`wght@600`) + Inconsolata (`wght@400;500`) to the Google
  Fonts `<link>` in `src/layouts/Layout.astro:35`.
- **Add tokens to `global.css`** (already has `--5p-bg/sakura/orchid/ballad/cold`):
  - `--toe-bean-pink-100: #f6dadd`, `--navy-blue-100: #c3dbff`,
    `--midnight-blue-500: #2f4276`, `--navy-blue-500: #1f4172`, `--midnight-blue-600: #132043`.
  - `--text-xl: 56px` (hero H1) is already present.
- **Page-scoped font family:** within `.pillars-page`, set headings → `'Lexend', sans-serif`
  and body/`p` → `'Inconsolata', monospace`, overriding the global Pridi/Public Sans.

## Phase 1 — Hero (`._5p_hero__section`)
- Full-width inner card: bg `--toe-bean-pink-100`, radius 8px, margin 1rem.
- Top row (`space-between`, padding `1rem 4rem`): H1 `Five Pillars,<br>My Search for<br>Meaningful Impact.`
  (Lexend 600, 56px, color `--5p-cold`) on the left; subtitle on the right
  (`Nurturing personal and professional growth with purpose in the next phase of my career.`).
- **Five-icon row** (`hero_card__wrapper`, height 24rem, flex, space-around): 5 cards each
  `width:20%; position:relative; overflow:hidden`, each with one absolutely-positioned icon
  at a staggered `top` inset:

  | icon | asset | top inset (desktop / ≤991) |
  |---|---|---|
  | Ethics | `pillar_one.avif` | 50% |
  | Collaboration | `pillar_2.svg` | 30% / 45% |
  | Transparency | `pillar_3.svg` | 15% / 40% |
  | Balance | `pillar_4.svg` | 45% / 50% |
  | Happiness | `pillar_5.svg` | 30% / 60% |

- Meta row (`space-between`/flex-end): `reading_time.svg` + "5 minute read";
  `headphones.svg` + "10 minute listen" (Inconsolata `--text-sm`, color `--navy-blue-500`).

## Phase 2 — Intro + inline podcast (`._5p_intro__section`)
- Two columns (`space-between`, stacks ≤991):
  - **Left (60%):** `introduction.svg` wordmark + H2 "What is all this about?", then a
    **two-column** body (two `.text-block-98`, each 50%) holding the 6 intro paragraphs.
  - **Right (40%):** the audio card (bg `--toe-bean-pink-100`, radius 8px):
    `easy_listening.svg` + H2 "Listen instead" (color `--5p-orchid`), then the **Podbean iframe**:
    `https://www.podbean.com/player-v2/?i=vi7p2-160aa77-pb&from=pb6admin&square=1&share=1&download=1&rtl=0&fonts=Arial&skin=1b1b1b&font-color=auto&logo_link=episode_page&btn-skin=fb0584&size=280`
    (height 280, width 100%, `data-name="pb-iframe-player"`).
- **Replace** the current placeholder `<PodcastEmbed>` at the bottom; either update that
  component to take the real Podbean URL + render here, or inline the iframe. Remove the
  standalone bottom podcast section.

## Phases 3–7 — The five pillars
Shared row pattern: `.pillar-inner` 2-col grid, alternating image side; collapse to 1 column
≤991px. Each pillar gets its SVG **wordmark eyebrow** above the H2, body paragraphs, and a
**pull-quote** (Lexend, `--h5`, `border-left: 4px solid var(--5p-ballad)`).

- **P1 Ethics** (text left / art right): art is a layered composition — relative parent with
  `group_chat_v3.svg` as base + three absolutely-positioned bubbles. Preserve the production
  class→file mapping: `bubble_1`→`chat_bubble_3.svg`, `bubble_2`→`chat_bubble_2.svg`,
  `bubble_3`→`chat_bubble_1.svg`. Pull-quote: "Although this effort is constantly evolving…".
- **P2 Collaboration** (centered text flanked by two characters): far-left
  `collab_character_left_pencil.svg` and far-right `collab_character_right_brush.svg`
  (height ~600px, **`display:none` ≤991px**). Center: `collaboration.svg` wordmark + H2,
  then two cream cards (`--5p-bg`, 1px border `#2f42761a`, radius 4px) with decorative
  `collab_left_v2.svg` / `collab_right_v2.svg` and the pull-quote.
- **P3 Transparency** (art left / text right): single `transparency_v2.svg`; text is a
  two-column body (`.text-block-104` ×2) under `transparency.svg` wordmark + H2.
- **P4 Balance** (text left / art right): layered composition — `balance_character.svg` base +
  `balance_cat.svg` overlay + `balance_lines.svg` pinned to bottom (`inset:auto 0 0`).
  Pull-quote: "In the summer of 2023, I briefly lost about 70% of my eyesight…".
- **P5 Happiness** (art left / text right, 60% text): `happiness_group.svg` + `happiness.svg`
  wordmark + H2. Pull-quote: "A previous boss was a therapist in another life…".

(Body copy: the current page already has accurate paragraph text; reuse it, but add the
missing pull-quote sentences and the second intro/transparency column splits per the spec.)

## Phase 8 — "So, What's Next?" CTA (`._5p_next__section`)
- Two cards side by side (stack ≤767):
  - **Left (blue `--navy-blue-100`):** decorative `semi_circle_left.svg` (top-right) +
    `now_what.svg` wordmark + H2 "So, What's Next?" + 3 closing paragraphs.
  - **Right (pink `--toe-bean-pink-100`):** decorative `semi_circle_right.svg` + three link rows,
    each: a label with a 1px top border (`Want to collaborate?` / `Looking for my resume?` /
    `E-mail me?`) above `arrow_right_icon.svg` + link — `Contact me` (`/contact`),
    `View Resume` (`/resume`), `emilybackes.design@gmail.com`
    (`mailto:...?subject=Let's Chat!`).

## Phase 9 — Scroll-reveal animations
- Keep AOS (already installed + initialized in `PageLayout.astro`). **Stop wrapping whole
  sections** in `data-aos` (that's what blanks the page). Instead apply `data-aos` to the
  individual illustration layers production animates: the 5 hero icons (staggered
  `data-aos-delay`), the 3 chat bubbles, `balance_cat` + `balance_lines`, the collab decorative
  SVGs, and the two semicircles — using `fade`/`zoom-in`/`fade-left` to approximate the
  Webflow reveals. Verify AOS actually initializes (the page currently has a js-yaml
  frontmatter error in an unrelated MDX file in the dev log — confirm it doesn't break this route).

## Phase 10 — Document the design system in DESIGN.md
Per the decision that each custom page enriches `DESIGN.md`, add a **"5 Pillars page"**
section documenting: the Lexend/Inconsolata type pairing for this page family, the
`--5p-*` + `--toe-bean-pink-100` + `--navy-blue-100` palette, the layered-illustration
composition pattern (relative parent + absolute layers), SVG-wordmark eyebrows, the
pull-quote treatment, and the 991px/767px collapse rules.

## Phase 11 — Verify (screenshot diff loop)
- Rebuild, screenshot local at 1440px and 390px, compare against the saved
  `scratchpad/shots/prod-*.png` section by section; iterate until sections align.
- `npm run astro check` for type errors; confirm no console errors / broken image paths.

## Reference artifacts (in scratchpad)
- `PROD_SPEC.md` — full production DOM/CSS spec (exact classes, assets, text, layout).
- `VISUAL_DIFF.md` — section-by-section visual diff.
- `shots/` — prod vs local screenshots (desktop + mobile + per-section).

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build locally
npm run astro     # Run Astro CLI (e.g. `npm run astro check` for type checking)
```

No test runner is configured. Use `npm run astro check` for TypeScript diagnostics.

## Architecture

This is an **Astro 6** project (strict TypeScript mode) being built as Emily Backes' design portfolio. Currently at initial scaffold — the default Astro welcome page is still in place.

**Routing:** `src/pages/` maps directly to URL routes. `index.astro` is the homepage.

**Layouts:** `src/layouts/Layout.astro` is the base HTML shell (provides `<slot />` for page content). All pages wrap their content in this layout.

**Components:** `src/components/` holds reusable `.astro` components. Components are imported directly in page frontmatter.

**Assets:** `src/assets/` holds SVGs and images imported at build time (Astro processes these). Static files served as-is go in `public/`.

**Design spec:** `DESIGN.md` (project root) is the authoritative design document. All visual decisions — colors, typography, spacing, component styles — are defined there. Key points:

- **Dark-mode-first.** Background layers: `#111216` (bg) → `#1a1c23` (surface) → `#22242d` (elevated) → `#2f313a` (highest). No drop shadows; depth via background lightness only.
- **Accent color:** `pink-200` (`#f1b4bb`, "Toe Bean Pink") is the sole interactive accent — hovers, CTAs, active links. `brand` red (`#dd2a3b`) is for brand badges only, never interactive UI.
- **Fonts:** `Pridi` (serif, headings H1–H5 only, never below 1.44rem) and `Public Sans` (all body, nav, buttons, tags). No other typefaces.
- **Spacing tokens:** `xxs`/`xs`/`sm`/`md`/`lg`/`xl`/`xxl`/`xxxl` (rem scale) and `sp-1`–`sp-9` (px aliases).
- **Border radius:** `sm` (4px) for buttons/controls, `lg` (16px) for content cards, `full` (100%) for avatars.
- **CSS variables** should follow the token names defined in `DESIGN.md` (`--color-ink`, `--h1`, etc.).

Component patterns (nav, buttons, cards, SWOT grid, skill chips, testimonials) are fully specified in `DESIGN.md` — consult it before building any new UI.

# Migration Plan: emilybackes.design → Astro

**Source:** Webflow (https://emilybackes.design)  
**Target:** AstroJS 6, deployed to Cloudflare Pages  
**Scope:** 1:1 port — all main site pages, no experimental pages (added later)

---

## Decisions

| Decision | Choice |
|---|---|
| Content management | Markdown/MDX files in `src/content/` (Astro Content Collections) |
| Scroll-reveal animations | AOS (Animate on Scroll) library — replaces Webflow IX2 scroll-reveals |
| Icon animations | Lordicon (Lottie-based) — keep `<lord-icon>` web component; self-host JSON files |
| Deployment | Cloudflare Pages (static output — no SSR adapter needed) |
| Contact form | Formspree or Web3Forms (external POST endpoint) |
| URL typo fix | `/case-study/subscription-cancelletion` → `/case-study/subscription-cancellation` with `301` redirect via `_redirects` |
| Experimental pages | Out of scope for this port |

---

## Site Inventory

### Pages to port (24 total)

| Route | Type | Notes |
|---|---|---|
| `/` | Homepage | 8 sections, Rive embed, marquee, SWOT, case cards, testimonials |
| `/about` | Static page | Polaroid carousel, bio, skills |
| `/contact` | Form page | 3 fields; needs external form endpoint |
| `/resume` | Static page | PDF embed (Webflow CDN PDF → needs local copy) |
| `/the-5-pillars-of-emily` | Static page | Podbean embed |
| `/legal/terms-conditions` | Static page | |
| `/legal/privacy-policy` | Static page | |
| `/legal/credits` | Static page | |
| `/case-study/sage-designing-an-ai-powered-chatbot` | MDX | |
| `/case-study/folsom-psychology` | MDX | Has "rotate device" warning |
| `/case-study/subscription-cancellation` | MDX | Fixed slug; redirect from old URL |
| `/case-study/lago` | MDX | Has "rotate device" warning |
| `/case-study/sprocket-app` | MDX | Has "rotate device" warning |
| `/posts` | Paginated listing | Page 1 = `/posts`, page 2+ = `/posts/[page]` |
| `/post/[slug]` × 13 | MDX | All have Podbean embeds |

### Assets to download from Webflow CDN

All images live at `https://cdn.prod.website-files.com/654d00bcd3f29e5fc1116b3a/`. They must be downloaded and committed to `public/assets/`. Formats: `.webp`, `.png`, `.svg`, `.avif`.

Also download: Emily's resume PDF from the Webflow CDN.

**Lottie / Lordicon JSON files:** ✅ 36 files downloaded to `public/assets/icons/lottie/`. See the [Lottie File Mapping](#lottie-file-mapping) section below for the full per-page inventory.

**Two missing Lottie files** — the subscription cancellation case study references `CX%20phone.json` and `Trash.json` via relative paths, but both 404 on the live site (the lordicon player script is also missing from that page, so the icons are currently broken for all visitors). Re-download these two from [lordicon.com](https://lordicon.com) and save as `public/assets/icons/lottie/cx-phone.json` and `public/assets/icons/lottie/trash.json`.

---

## Tech Stack Additions

```bash
npm install @astrojs/mdx @astrojs/sitemap
npm install aos                    # scroll-reveal animations
npm install @types/aos             # TypeScript types
npm install @lordicon/element      # Lordicon Lottie web component
npm install lottie-web             # Lottie renderer (peer dep of @lordicon/element)
```

**`astro.config.mjs` updates:**
```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://emilybackes.design',
  integrations: [mdx(), sitemap()],
  output: 'static',      // default; explicit for clarity
});
```

---

## Target File Structure

```
src/
  content/
    config.ts                     # Zod schemas for collections
    case-studies/
      sage-ai-chatbot.mdx
      folsom-psychology.mdx
      subscription-cancellation.mdx
      lago.mdx
      sprocket-app.mdx
    posts/
      [13 blog post .mdx files]
  layouts/
    Layout.astro                  # Base HTML shell, fonts, global CSS
    PageLayout.astro              # Wraps Layout + Nav + Footer
    CaseStudyLayout.astro         # Extends PageLayout; adds case study chrome
    PostLayout.astro              # Extends PageLayout; adds blog post chrome
  components/
    Nav.astro                     # Desktop + mobile hamburger nav
    Footer.astro
    Marquee.astro                 # Horizontal scrolling ticker
    RiveEmbed.astro               # Wraps rive.app iframe
    PodcastEmbed.astro            # Wraps Podbean iframe
    SwotGrid.astro                # 4-quadrant SWOT component
    CaseStudyCard.astro           # Numbered case study card (.01–.05)
    BlogCard.astro                # Image-forward blog preview card
    TestimonialCard.astro
    PolaroidCarousel.astro        # About page photo loop
    RotateWarning.astro           # Mobile "rotate device" banner
  pages/
    index.astro
    about.astro
    contact.astro
    resume.astro
    the-5-pillars-of-emily.astro
    posts/
      index.astro                 # /posts (page 1)
      [page].astro                # /posts/2, /posts/3, …
    case-study/
      [slug].astro                # Dynamic route from content collection
    post/
      [slug].astro                # Dynamic route from content collection
    legal/
      terms-conditions.astro
      privacy-policy.astro
      credits.astro
  styles/
    global.css                    # CSS variables + reset
public/
  assets/
    images/                       # General site images
    case-studies/                 # Case study screenshots/mockups
    icons/                        # SVG icons
  resume.pdf                      # Downloaded from Webflow CDN
  _redirects                      # Cloudflare Pages redirects
  favicon.ico
  favicon.svg
```

---

## Content Collection Schemas (`src/content/config.ts`)

```ts
import { defineCollection, z } from 'astro:content';

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    number: z.string(),          // ".01", ".02", etc.
    tags: z.array(z.string()),
    excerpt: z.string(),
    coverImage: z.string(),
    hasRotateWarning: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.string(),
    coverImage: z.string(),
    excerpt: z.string(),
    podcastEmbedUrl: z.string().optional(),
  }),
});

export const collections = { 'case-studies': caseStudies, posts };
```

---

## Phase-by-Phase Plan

---

### Phase 0 — Project Configuration

**Goal:** Astro is configured and the design system CSS is in place before any page work starts.

1. Update `astro.config.mjs` with MDX + sitemap integrations, `site` URL, and explicit `output: 'static'`
2. Install packages: `@astrojs/mdx`, `@astrojs/sitemap`, `aos`, `@types/aos`, `@lordicon/element`, `lottie-web`
3. ✅ `src/styles/global.css` created with exact CSS custom property names from the live site (variable names match `docs/site-custom.css` 1:1 so it can be used as a direct reference). Includes: all color, typography, and spacing tokens; base reset; type scale; utility classes.
4. Add Google Fonts `<link>` preloads for Pridi and Public Sans in `Layout.astro` (only these two — remove the 12 other fonts Webflow loaded)
5. Create `src/content/config.ts` with schemas above
6. Add `_redirects` to `/public/`:
   ```
   /case-study/subscription-cancelletion /case-study/subscription-cancellation 301
   ```

---

### Phase 1 — Asset Migration

**Goal:** All images and the resume PDF are in `/public/assets/` before content work begins.

1. ✅ **Images downloaded** — 256 files (75 SVG, 66 AVIF, 61 WebP, 53 PNG, 1 GIF) crawled from the Webflow CDN across all 27 pages → `public/assets/images/`. Hash prefixes stripped from filenames. One collision handled: `arrow-right-circle_2.svg` (two CDN versions of the same name — verify which is correct when building the nav).
2. ✅ **Lottie JSON files downloaded** — 36 files → `public/assets/icons/lottie/`. See [Lottie File Mapping](#lottie-file-mapping) for full per-page inventory.
3. ✅ **CSS reference extracted** — `docs/site-custom.css` (281KB, 1,738 rule blocks of site-specific styles) and `docs/webflow-framework.css` (34KB boilerplate, ignore). Variable names in `src/styles/global.css` match the live site exactly for 1:1 lookup.
4. ❌ **Resume PDF** — download from Webflow CDN → `public/resume.pdf` (URL visible in the `/resume` page source).
5. ❌ **Update CDN references** — when building each page/component, replace any hardcoded `cdn.prod.website-files.com/654d00bcd3f29e5fc1116b3a/...` URLs with `/assets/images/[filename]` or `/assets/icons/lottie/[filename]`.

---

### Phase 2 — Content Authoring (MDX Files)

**Goal:** All 5 case studies and 12 blog posts are authored as `.mdx` files with correct frontmatter.

> ✅ **Scraped and written.** All files generated from the live site. Body text converted from Webflow HTML → Markdown; zero-width joiners stripped; CDN image URLs resolved to local `/assets/images/` paths. An additional 33 images from a secondary Webflow CDN bucket (`65e22b852e0904a423f24ac2`) were discovered and downloaded during scraping.

#### Case Studies (5 files in `src/content/case-studies/`) ✅

- `sage-designing-an-ai-powered-chatbot.mdx` — 988 words
- `folsom-psychology.mdx` — 1,088 words, `hasRotateWarning: true`
- `subscription-cancellation.mdx` — 716 words; **no cover image** (case study is an interactive prototype with no screenshots); the two Lordicon files (`cx-phone.json`, `trash.json`) are still broken and need re-sourcing from lordicon.com
- `lago.mdx` — 877 words, `hasRotateWarning: true`
- `sprocket-app.mdx` — 734 words, `hasRotateWarning: true`

#### Blog Posts (12 files in `src/content/posts/`) ✅

9 of 12 posts have `podcastEmbedUrl` set. Posts without a podcast embed: `how-to-apply-for-jobs-in-a-tough-market`, `breaking-the-config-seal`, `my-ux-ui-journey`.

All 12 slugs match the live URL slugs exactly. Note: the original browser crawl estimated 13 posts — the actual count is 12 (the listing page showed the newest post twice due to a featured slot).

---

### Phase 3 — Shared Layouts & Components

**Goal:** The site shell (nav, footer, layouts) is complete and reusable before building individual pages.

> **Before building any component in this phase:** open `https://emilybackes.design` with agent-browser, take a full-page screenshot, and take an annotated screenshot of the nav and footer. These two components appear on every page and must be pixel-accurate.

#### `src/layouts/Layout.astro` (update existing)
- Add `<link>` preloads for Pridi + Public Sans from Google Fonts
- Import `global.css`
- Add AOS init `<script>` (import `aos/dist/aos.css` + call `AOS.init()` on `DOMContentLoaded`)
- Accept `title` and `description` props for `<title>` and meta tags
- Add OG/Twitter meta tags

#### `src/layouts/PageLayout.astro` (new)
- Wraps `Layout.astro` with `<Nav />` above and `<Footer />` below the `<slot />`

#### `src/layouts/CaseStudyLayout.astro` (new)
- Extends `PageLayout.astro`
- Adds `<RotateWarning />` conditionally based on `hasRotateWarning` frontmatter

#### `src/layouts/PostLayout.astro` (new)
- Extends `PageLayout.astro`
- Renders post header (title, date, category tag)
- Renders `<PodcastEmbed />` if `podcastEmbedUrl` is set

#### `src/components/Nav.astro`
> Browse `https://emilybackes.design` — screenshot the desktop nav at full width, then resize to mobile and screenshot the hamburger + open overlay state. Note the exact logo dimensions, link spacing, and the "Let's Connect" button styling.
- Desktop: logo left, links right (`About`, `Case Studies` → `/#case-study-section`, `Journal`, `Let's Connect` CTA button)
- Mobile: hamburger button → full-screen overlay with same links
- Mobile nav uses vanilla JS for toggle (no Alpine dependency on main site)
- Links use CSS `pink-200` hover state per DESIGN.md spec

#### `src/components/Footer.astro`
> Scroll to the bottom of `https://emilybackes.design` and screenshot the footer. Check link order, logo placement, and spacing.
- Logo + nav links: 5 Pillars, Resume, Terms & Conditions, Privacy Policy, Credits
- Dark footer background (`--color-bg`)

#### `src/components/PodcastEmbed.astro`
- Accepts `url` prop
- Renders Podbean `<iframe>` (lazy-loaded)

#### `src/components/RiveEmbed.astro`
- Renders the `rive.app` community embed iframe
- Static URL: `https://rive.app/community/8999-17412-cat-simple-edit/embed`

#### `src/components/Marquee.astro`
> Browse `https://emilybackes.design` and screenshot the hero section. Note the marquee scroll speed, text content, and whether it pauses on hover.

#### `src/components/PolaroidCarousel.astro`
> Browse `https://emilybackes.design/about` and screenshot the polaroid section. Note the stacking angle of each photo, the loop speed, and how many photos are in the set.

#### `src/components/SwotGrid.astro`
> Browse `https://emilybackes.design` and scroll to the SWOT section. Screenshot the full grid and each quadrant hover state. Note the quadrant colors (from `docs/site-custom.css`: `.swot_quad__wrapper.quad_one` etc.) and the illustrated icon placement.

#### `src/components/CaseStudyCard.astro`
> Browse `https://emilybackes.design/#case-study-section` and screenshot all 5 cards. Note the `.01`–`.05` number positioning, tag chip layout, and hover state.

#### `src/components/BlogCard.astro`
> Browse `https://emilybackes.design` and screenshot the "Paws & Reflect" blog preview section. Also browse `https://emilybackes.design/posts` for the full listing card layout.

#### `src/components/TestimonialCard.astro`
> Browse `https://emilybackes.design` and scroll to the testimonials section. Screenshot the full row and a single card close-up.

#### `src/components/RotateWarning.astro`
> Browse `https://emilybackes.design/case-study/folsom-psychology` on a narrow viewport (set viewport to 375px wide). Screenshot the mobile rotate warning banner.
- Fixed/absolute banner shown on mobile for 4 case studies that have desktop-optimized layouts

---

### Phase 4 — Homepage

**Goal:** `src/pages/index.astro` replicates all 8 homepage sections.

> **Before building:** browse `https://emilybackes.design` with agent-browser and take a full-page screenshot (`--full` flag). Then take individual screenshots of each section as you build it, scrolling to that section before screenshotting. The homepage is the most visually complex page — do not rely on the scraped text alone.

The homepage uses `PageLayout.astro` and does not use a separate layout for the case study or blog sections.

#### Section 1: Hero / Marquee
> Screenshot: scroll to top of `https://emilybackes.design`. Note the viewport height, Rive embed dimensions, marquee text content and speed, and how the H1 and Rive animation are positioned relative to each other.
- Full-viewport hero with `<Marquee />` scrolling ticker
- H1: "Wrangler of Pixels. Herder of Cats. & Humans."
- `<RiveEmbed />` for the animated cat
- `data-aos="fade-up"` on headline

#### Section 2: Purr-ficiencies + SWOT
> Screenshot: scroll to the Purr-ficiencies section. Note the two-column split (skills list left, SWOT right), the skill item layout (Lottie icon + bold label + description), and all four SWOT quadrant colors and content. Hover over a quadrant to capture the hover state.
- Multi-column grid layout
- Skills tag chips (flat chips, `text-extra-sm`, uppercase, subtle borders)
- Career timeline snapshot
- `<SwotGrid />` component (4-quadrant: Strengths/Weaknesses/Opportunities/Threats)
  - Each quadrant: illustrated icon + category color + bullet list
- Links to `/the-5-pillars-of-emily` and `/resume`

#### Section 3: Case Catalog (`id="case-study-section"`)
> Screenshot: scroll to `#case-study-section`. Note the grid layout (numbered .01–.05), card proportions, tag chip placement, and hover state on a card. The large decorative number is in `--subtle` color at a much larger font size than the title.
- Section anchor — this is where the nav "Case Studies" link points
- 5 `<CaseStudyCard />` components in numbered grid
- Each card: number (.01–.05 in `--subtle`), category tags, Pridi H4 title, excerpt, "explore case study" link

#### Section 4: Blog Preview ("Paws & Reflect")
> Screenshot: scroll to the blog preview section. Note the heading style (section label + Pridi H2), the 2-card grid proportions, and the "Read the Blog" button placement.
- 2 `<BlogCard />` components (most recent 2 posts from content collection)
- "Read the Blog" button → `/posts`

#### Section 5: Experiments Promo Strip
> Screenshot: scroll to the experiments strip. It's a narrow full-width band — note background color, text style, and arrow/link treatment.
- Text CTA: "Don't click here" → `/experimental/ui-list` (link preserved even though experimental pages not ported yet — can 404 gracefully or be removed)

#### Section 6: Testimonials
> Screenshot: scroll to the testimonials section. Note the horizontal card row layout, avatar size and border-radius (full), card background color, and how the pull quote is styled differently from body text.
- 4 `<TestimonialCard />` components in horizontal card row
- Vidushi, Sherlyna, Nathan, Scharps
- Avatar (full-radius image), name, title, pull quote

#### Section 7: CTA
> Screenshot: scroll to the bottom CTA. Note the background treatment, heading size, `lets_cat.json` Lottie placement, and button style.
- Full-width section, centered: "Let's Chat." + "Get In Touch" button → `/contact`

#### Section 8: (handled by `<Footer />`)

**AOS:** Apply `data-aos` attributes to all sections per the Webflow scroll-reveal patterns — `fade-up` is the dominant effect; sections stagger with `data-aos-delay`.

---

### Phase 5 — Case Study Pages

**Goal:** Dynamic route renders all 5 case studies from MDX content collection.

> **Before building the template:** browse all 5 case study pages and take full-page screenshots of each. Every case study has a unique section structure — use the screenshots alongside the scraped MDX body (`src/content/case-studies/`) to confirm section order and layout. The live URLs:
> - `https://emilybackes.design/case-study/sage-designing-an-ai-powered-chatbot`
> - `https://emilybackes.design/case-study/folsom-psychology` — also set viewport to 375px to see the rotate warning
> - `https://emilybackes.design/case-study/subscription-cancelletion`
> - `https://emilybackes.design/case-study/lago`
> - `https://emilybackes.design/case-study/sprocket-app`
>
> Pay special attention to the hero layout (each case study has a different hero treatment), the stat/metric blocks with Lottie icons (see Lottie File Mapping section), and the "Outcomes & Challenges" section structure which varies per case study.

#### `src/pages/case-study/[slug].astro`
- Uses `getStaticPaths()` from `getCollection('case-studies')`
- Wraps content in `CaseStudyLayout.astro`
- Renders `<Content />` component (MDX body)
- Passes `hasRotateWarning` to layout

Each case study MDX body should be authored in Phase 2 — this phase wires the template.

---

### Phase 6 — Blog

**Goal:** Dynamic route for posts + paginated listing.

> **Before building:** browse these two URLs and screenshot both:
> - `https://emilybackes.design/posts` — the listing page. Note the card grid layout, number of cards per row, category tag chip style, and pagination controls at the bottom.
> - `https://emilybackes.design/post/how-to-conduct-effective-ux-interviews` — a post with a Podbean embed. Note the post header layout (cover image, title, date pill, category pill), body text width, and Podbean iframe placement relative to the content.

#### `src/pages/post/[slug].astro`
- Uses `getStaticPaths()` from `getCollection('posts')`
- Wraps content in `PostLayout.astro`
- Renders `<Content />` (MDX body)
- `PostLayout` handles `podcastEmbedUrl` → `<PodcastEmbed />`

#### `src/pages/posts/index.astro` (page 1)
- Fetches all posts, sorted by date descending
- Renders first N posts as `<BlogCard />` grid
- Pagination nav → `/posts/2`

#### `src/pages/posts/[page].astro` (pages 2+)
- Uses Astro's `paginate()` helper
- Same template as index, with prev/next pagination controls

> The current site shows ~8 posts per page based on the 2-page structure with 13 total posts. Match this.

---

### Phase 7 — Secondary Pages

**Goal:** All remaining pages are built.

#### `src/pages/about.astro`
> Browse `https://emilybackes.design/about` — take a full-page screenshot. The about page has several distinct zones: a hero/intro, a "Quick Facts" section with the 5 Lottie icons, a timeline/career section, and the polaroid photo carousel. Note the carousel photo count, stacking rotation angles, and animation loop timing. Reference `docs/scraped/about.md` for text content.
- Uses `PageLayout.astro`
- Bio section, skills/experience
- `<PolaroidCarousel />` component — CSS animation loop of stacked/rotated photos
- Reuses skill chips from homepage

#### `src/pages/contact.astro`
> Browse `https://emilybackes.design/contact` — screenshot the form at rest, then submit a test entry (or inspect the DOM) to see the success state with the `wired-lineal-1957-maneki-cat-light.json` animation. Note the form field label styles and the "send it" button.
- Uses `PageLayout.astro`
- Form fields: Name, Project, Email + Submit
- Form `action` points to Formspree or Web3Forms endpoint (sign up for free account, get endpoint URL, set as env variable `PUBLIC_FORM_ENDPOINT` in Cloudflare Pages dashboard)
- Form `method="POST"` with `enctype="application/x-www-form-urlencoded"`
- Add client-side success/error state (small JS block in the `.astro` file — no framework needed)

#### `src/pages/resume.astro`
> Browse `https://emilybackes.design/resume` — screenshot the page. Note whether it's an inline PDF viewer, a download button, or both. Reference `docs/scraped/resume.md` for the surrounding page text.
- Uses `PageLayout.astro`
- Renders `<iframe src="/resume.pdf" />` or a download link + embedded viewer

#### `src/pages/the-5-pillars-of-emily.astro`
> Browse `https://emilybackes.design/the-5-pillars-of-emily` — take a full-page screenshot. This page has a unique color palette (`--5p-*` variables) distinct from the rest of the site. Reference `docs/scraped/5-pillars.md` for text content.
- Uses `PageLayout.astro`
- Content + `<PodcastEmbed />` (Podbean embed)

#### `src/pages/legal/terms-conditions.astro`, `privacy-policy.astro`, `credits.astro`
> No screenshot needed — these are standard text pages. Reference `docs/scraped/legal-terms.md`, `docs/scraped/legal-privacy.md`, `docs/scraped/legal-credits.md` for content.
- Uses `PageLayout.astro`
- Static text content

---

### Phase 8 — Animations

**Goal:** AOS scroll-reveal is applied to match the Webflow IX2 animation feel.

> **Before adding AOS attributes:** scroll through `https://emilybackes.design` slowly and observe which elements animate on scroll, the direction (most are fade-up), and whether cards stagger. The site uses `once: true` — elements don't re-animate on scroll up. Match the feel, not the exact Webflow IX2 timing IDs.

1. In `Layout.astro`, register the Lordicon web component (runs client-side only):
   ```html
   <script>
     import { defineElement } from '@lordicon/element';
     import lottie from 'lottie-web';
     defineElement(lottie.loadAnimation);
   </script>
   ```
   This enables `<lord-icon src="/assets/icons/lottie/foo.json" trigger="hover" />` to work across all pages.

2. In `Layout.astro`, add AOS initialization:
   ```html
   <link rel="stylesheet" href="/node_modules/aos/dist/aos.css" />
   <script>
     import AOS from 'aos';
     document.addEventListener('DOMContentLoaded', () => AOS.init({
       duration: 600,
       once: true,
       offset: 80,
     }));
   </script>
   ```
   Or bundle via Astro's asset pipeline.

3. Apply `data-aos` attributes across components:
   - Most section content: `data-aos="fade-up"`
   - Cards in a grid: stagger with `data-aos-delay="100"`, `"200"`, `"300"`, etc.
   - Hero elements: `data-aos="fade-in"` (faster, `duration: 400`)
   - `once: true` prevents re-triggering on scroll up (matches Webflow default behavior)

4. Mobile nav animation: vanilla JS toggle of a CSS class (e.g., `.nav--open`) — no AOS needed.

---

### Phase 9 — Redirects, SEO & Sitemap

**Goal:** No broken links, proper SEO metadata, and `_redirects` in place.

1. **`public/_redirects`** (Cloudflare Pages redirect format):
   ```
   /case-study/subscription-cancelletion /case-study/subscription-cancellation 301
   ```

2. **Sitemap:** `@astrojs/sitemap` generates `/sitemap-index.xml` automatically from all static routes. Ensure `site` is set in `astro.config.mjs`.

3. **Meta tags:** `Layout.astro` accepts `title` and `description` props. Every page passes its own. Add:
   - `<meta property="og:title" />`
   - `<meta property="og:description" />`
   - `<meta property="og:image" />` (use cover image for posts/case studies)
   - `<meta name="twitter:card" content="summary_large_image" />`

4. **`robots.txt`:** Add `public/robots.txt` (allow all, point to sitemap).

---

### Phase 10 — Cloudflare Pages Deployment

**Goal:** Site is live on Cloudflare Pages, replacing or proxying the existing Webflow site.

1. Push repo to GitHub (if not already)
2. In Cloudflare Pages dashboard → New Project → Connect GitHub repo
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `>=22.12.0` (set via env var `NODE_VERSION=22`)
4. Add environment variable:
   - `PUBLIC_FORM_ENDPOINT` = your Formspree/Web3Forms endpoint URL
5. Set custom domain: `emilybackes.design` → point DNS to Cloudflare Pages CNAME

> **DNS cutover:** Once verified, update the `emilybackes.design` DNS records from Webflow's nameservers/IPs to Cloudflare Pages. Do this last — only after the Astro build is fully verified on the `.pages.dev` preview URL.

---

## Tricky Areas / Watch-outs

| Area | Issue | Approach |
|---|---|---|
| Webflow IX2 animations | 64 animated elements; Webflow's animation IDs can't be ported directly | AOS `data-aos` on each element; match the visual effect (fade-up dominant), don't try to match IDs |
| Case study content | Case studies are long, image-heavy Webflow CMS pages | Screenshot each case study page before content authoring; use `--full` screenshots to capture everything |
| Polaroid carousel (About) | CSS `animation: loop` in Webflow | Pure CSS `@keyframes` with `animation-iteration-count: infinite`; inspect the live CSS for exact transforms |
| Mobile nav | Webflow's built-in IX2 controls the overlay | Vanilla JS: toggle a class on `<body>` or nav element; CSS handles the open/closed transition |
| Rive embed | Hosted on rive.app's embed service | Keep as iframe — no change needed; just wrap in `<RiveEmbed />` for reusability |
| Podbean embeds | Each post has a unique Podbean `i=` parameter | Store per-post `podcastEmbedUrl` in MDX frontmatter; `PostLayout` renders it via `<PodcastEmbed />` |
| Contact form | Webflow handles forms natively; Cloudflare Pages does not | Use Formspree (free: 50/mo) or Web3Forms (free: 250/mo); set endpoint in env var |
| Case study image-heavy pages | Large `.webp`/`.avif` files on Webflow CDN | Download all; use Astro's `<Image />` component for automatic optimization during build |
| "Rotate device" warning | 4 case studies show a mobile UX warning | `<RotateWarning />` component, shown via CSS `@media (max-width: 768px)` or `hasRotateWarning` prop |
| Lordicon / Lottie icons | Animated icons via `<lord-icon>` web component backed by `.json` Lottie files; some may be from Lordicon CDN, others may be custom | Download all `.json` files → `public/assets/icons/lottie/`; register `@lordicon/element` once in `Layout.astro`; update all `src` attrs to local paths |
| Google Fonts — currently 14 loaded | Webflow loaded 14 Google Fonts (most unused) | Load only Pridi + Public Sans — eliminates ~200KB of unused font data |

---

## Lottie File Mapping

All 36 downloaded files in `public/assets/icons/lottie/`, mapped to the page and section where each is used. Reference these when building each page/component so `src` attributes point to the correct local paths.

### Homepage (`src/pages/index.astro`)

| Local filename | Section | Role |
|---|---|---|
| `Cat Loader 256.json` | Page loading overlay | Animated cat shown in `.loader_wrapper` while page loads, then dismissed |
| `wired-lineal-448-paws-animal-fff.json` | Purr-ficiencies heading | Section heading paw icon — also reused verbatim for Case Studies section heading and Blog "Paws & Reflect" section heading (3 instances, same file) |
| `wired-outline-35-edit-fff.json` | Purr-ficiencies / Skills | Skill icon: "Requirement Gathering & UI Design" |
| `wired-outline-981-consultation--normal.json` | Purr-ficiencies / Skills | Skill icon: "Interviewing and Understanding People" |
| `wired-outline-1325-code-fork-fff.json` | Purr-ficiencies / Skills | Skill icon: "Process Improvement" |
| `lets_cat.json` | CTA section | Decorative animation in the "Let's Chat" bottom CTA section |

### About Page (`src/pages/about.astro`) — "Quick Facts" section

| Local filename | Role |
|---|---|
| `wired-outline-448-paws-animal.json` | "I have 2 cats that I found on the street" |
| `wired-outline-1021-rules.json` | "I have strong opinions about how to load a dishwasher" |
| `wired-outline-1360-grocery-shelf.json` | "I bake and decorate cakes as a hobby" |
| `wired-outline-784-trumpet.json` | "I played the trumpet for 11 years" |
| `wired-outline-498-ambulance.json` | Personal health/medical fact |

### Contact Page (`src/pages/contact.astro`)

| Local filename | Role |
|---|---|
| `wired-lineal-1957-maneki-cat-light.json` | Form **success state** — plays inside `.w-form-done` after successful submission alongside "Thank you! Your submission has been sent & received!" |

### Case Study: Folsom Psychology (`folsom-psychology.mdx`)

| Local filename | Section | Role |
|---|---|---|
| `system-regular-15-ratio.json` | Mobile warning | "Rotate device" banner (`<RotateWarning />` component) — also shared with Lago and Sprocket |
| `wired-outline-18-location-pin_1.json` | Business stats | "Three office locations" |
| `wired-outline-153-bar-chart.json` | Business stats | "12 years in business" |
| `wired-outline-955-demand.json` | Business stats | Third business stat |
| `wired-outline-1422-polygon.json` | Research — "API Research" | First research area heading icon |
| `wired-outline-1419-polyline.json` | Research — UX interviews | Second research area heading icon |
| `wired-outline-1416-triangle.json` | Research — stakeholder interviews | Third research area heading icon ("Conducted 7 total interviews") |
| `fff_wired-outline-1387-page-view-column.json` | UX Findings | Finding: "Admins were flipping through 7 different software during one call" |
| `fff_wired-outline-45-clock-time.json` | UX Findings | Finding: "Average call time for scheduling new patients: 20–30 minutes" |
| `wired-outline-1676-telephone-call-hand.json` | UX Findings | Third UX finding (phone-related stat) |
| `ef9_wired-outline-1534-paper-boat.json` | Project Challenges | Section icon for challenges block |
| `ef9_wired-outline-12-layers.json` | Project Changes | Section icon for design changes block |

### Case Study: Lago (`lago.mdx`)

| Local filename | Section | Role |
|---|---|---|
| `system-regular-15-ratio.json` | Mobile warning | "Rotate device" banner (shared) |
| `wired-outline-1953-african-culture.json` | Context section | Nigeria health insurance background |
| `wired-outline-186-puzzle.json` | Process phase 3 | "Solution" phase card icon |
| `wired-outline-56-document.json` | My Responsibilities | "Created a standard interview template" ⚠️ see note |
| `wired-outline-35-edit.json` | My Responsibilities | "Wrote and established communication SOP for the entire project" |
| `wired-outline-478-computer-display.json` | My Responsibilities | "Built the project strategy workspace and whole team Kanban in Notion" |
| `wired-outline-970-video-conference.json` | My Responsibilities | Led meetings / video conferencing |
| `wired-outline-1534-paper-boat.json` | Outcomes & Challenges | Card 1 icon |
| `wired-outline-12-layers_fff.json` | Outcomes & Challenges | Card 2 icon |

### Case Study: Sprocket App (`sprocket-app.mdx`)

| Local filename | Section | Role |
|---|---|---|
| `system-regular-15-ratio.json` | Mobile warning | "Rotate device" banner (shared) |
| `wired-outline-500-fingerprint-security (1).json` | Business stats | "73% of bikes stolen at street level were reported locked by owners" |
| `wired-outline-1985-police-car.json` | Business stats | Bike theft / police reporting stat |
| `wired-outline-56-document.json` | Business stats | "154,009 bikes were reported stolen in the U.S. in 2019 (FBI)" ⚠️ see note |
| `wired-outline-1534-paper-boat_sprocket.json` | Challenges | Card 1: "project challenges / design biases" |
| `wired-outline-12-layers_sprocket.json` | Challenges | Card 2: second challenge card |

### Case Study: Subscription Cancellation (`subscription-cancellation.mdx`) — ❌ missing

| Local filename | Role |
|---|---|
| `cx-phone.json` | ❌ Not downloaded — 404 on live site. Re-download from lordicon.com |
| `trash.json` | ❌ Not downloaded — 404 on live site. Re-download from lordicon.com |

> Also missing from this case study: the `lordicon.js` player script was never included in the Webflow custom code embed, so both icons are invisible to current visitors.

### Case Study: Sage AI Chatbot

No Lottie files. No `<lord-icon>` elements found on this page.

---

> **⚠️ Note on `wired-outline-56-document.json`:** Both the Lago and Sprocket case studies use a file by this name, but from two different CDN hashes — meaning Webflow stored two different versions. The file on disk is the Sprocket version (last written). Both are a document icon and visually equivalent; if any discrepancy is noticed when building, rename one (e.g. `wired-outline-56-document-lago.json`) and update the Lago MDX accordingly.

---

## Effort Estimate

| Phase | Est. Hours |
|---|---|
| 0 — Configuration | 1–2 h |
| 1 — Asset migration | 2–4 h |
| 2 — Content authoring (MDX) | 6–10 h |
| 3 — Layouts & shared components | 3–5 h |
| 4 — Homepage | 4–6 h |
| 5 — Case study pages | 2–3 h |
| 6 — Blog | 2–3 h |
| 7 — Secondary pages | 2–4 h |
| 8 — Animations | 2–3 h |
| 9 — Redirects & SEO | 1 h |
| 10 — Deployment | 1–2 h |
| **Total** | **26–43 h** |

The wide range on Phase 2 (content authoring) depends on how much of the case study and blog content needs to be hand-copied vs. scraped/exported from Webflow.

# AI SEO Audit — emilybackes.design

*Audit date: 2026-06-20 · Skill: `ai-seo` v2.1.0 · Branch: `ai-seo-audit`*
*Scope: optimizing the portfolio to be **cited and surfaced by AI search** (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, Copilot). Companion to the traditional [`seo-audit.md`](./seo-audit.md).*

> **Recommendations only — nothing in this doc has been implemented.** Items are
> ranked P1 (highest leverage) → P3. Effort is rough: S = <1hr, M = a few hours, L = ongoing/off-site.

---

## Context

This is a personal **product-designer portfolio**, not a SaaS product, so the AI-SEO playbook is adapted (per `.agents/product-marketing.md`):

- **The "product" is Emily Backes as a Senior Product Designer (healthcare UX/UI).** "Buyers" are hiring managers, design leads, recruiters, and founders.
- **Two query intents matter for AI citation:**
  - **Entity / hiring queries** — "Emily Backes product designer," "healthcare UX designer Colorado," "senior product designer portfolio examples." Goal: AI recognizes Emily as a distinct, well-described entity and surfaces her correctly.
  - **Topical / peer queries** — "how to conduct UX interviews," "will AI take design jobs," "how to build a junior UX portfolio." Goal: the blog ("Paws & Reflect") gets cited as a source. This is the traffic engine (target: ~500 → 10,000 impressions/day).
- A portfolio's biggest AI-SEO lever differs from a SaaS site's: there's no pricing to expose, but **entity clarity (who is this person, what are they known for) and citable how-to/opinion content** are everything.

---

## Scorecard

| Pillar | Grade | One-line |
|--------|:-----:|----------|
| **Crawl / bot access** | A | `robots.txt` allows all; static HTML renders without JS — ideal for AI crawlers and agents. |
| **Structure (extractability)** | C+ | Posts are decently structured; case studies bury outcomes in narrative; no answer blocks, FAQs, or comparison tables anywhere. |
| **Authority (citability)** | C | Strong real metrics exist but aren't in extractable/dated stat blocks; no author bio on posts; freshness signals weak (posts dated 2024, no "updated" dates). |
| **Schema / entity** | C+ | Good foundation (WebSite + Person + BlogPosting) but the Person entity is thin, case studies have zero schema, and no FAQ/Breadcrumb/Review markup. |
| **Machine-readable files** | D | No `llms.txt`; no agent-readable "about/hire" summary. |
| **Off-site presence** | ? | Can't audit from the repo — see P3. This is where AI citations disproportionately come from. |

---

## P1 — Highest leverage

### 1.1 Strengthen the `Person` entity (homepage JSON-LD) — `M`
**Where:** `src/layouts/Layout.astro:39-56`

The homepage emits a `Person` with only `name`, `jobTitle`, `url`. For AI systems to confidently describe and recommend Emily, the entity needs disambiguating attributes. AI engines build an internal entity profile; sparse data = vague or absent mentions.

Recommend enriching `Person` with:
- `description` — the one-liner from product-marketing context.
- `image` — a real headshot URL (helps Knowledge-Graph-style recognition).
- `sameAs` — array of LinkedIn, Dribbble/Behance, GitHub, any speaking/press profiles. **This is the single most important field for entity resolution** — it's how AI links "Emily Backes" across the web to one person.
- `knowsAbout` — `["UX research", "product design", "healthcare software UX", "design systems", "AI product design", "usability testing"]`. Directly feeds topical/skill queries.
- `jobTitle` + `worksFor` (Organization) — note the homepage intentionally lists **Sortly** publicly ([[case-catalog-overrides-designmd]] / product-marketing note); keep that consistent here.
- `alumniOf` / credentials if applicable (UX training).

> Per the skill, structured data is "not required" for Google AI Overviews but materially helps ChatGPT/Claude/Perplexity build an accurate entity. For a personal brand, a rich `Person` is the highest-ROI schema on the site.

### 1.2 Add `llms.txt` at the site root — `S`
**Where:** new `public/llms.txt`

No `llms.txt` exists. Add a short context file (see [llmstxt.org](https://llmstxt.org)) giving AI systems a quick, parseable overview:
- Who Emily is (one-liner), what she does, current focus (healthcare UX/UI).
- Links to key pages: `/about`, `/resume`, the 5 Pillars, top case studies, `/contact`, blog index.
- A one-line description per case study (the measurable outcome — see 1.3).

This is trivial to maintain and is exactly the kind of file ChatGPT/Claude/Perplexity and autonomous agents parse when present. Link it from the sitemap.

### 1.3 Make case-study outcomes extractable — `M`
**Where:** `src/content/case-studies/*.mdx`, `src/pages/case-study/*.astro`

Case studies are the portfolio's most citable asset (comparison/definitive-guide-style content earns ~33%/~15% of AI citations) but currently they **lead with narrative, not the answer**:

> "Folsom Psychology needed serious help; they operated a growing business on spreadsheets."

The headline outcome (*cut patient scheduling time in half*) is in the title but the supporting numbers are buried in prose. AI extracts standalone passages — give it one.

Recommend, near the top of each case study, a **self-contained 40–60 word summary block** that states role, problem, what was done, and the measurable result with a number:
- *"As lead product designer, I redesigned Folsom Psychology's patient-intake workflow, replacing spreadsheet scheduling with a structured flow that cut new-patient scheduling time in half."*

Also add a small **stat block / outcome line** ("Result: ~$100k/yr returning revenue," "Result: signups doubled in 3 months") that reads correctly out of context. Stats with specific numbers are a +37–40% citation booster.

### 1.4 Add schema to case-study pages — `M`
**Where:** `src/pages/case-study/[slug].astro` and the five ported `src/pages/case-study/*.astro`

Case-study pages emit **no structured data**. Add `Article` (or `CreativeWork`) JSON-LD with `headline`, `description` (the excerpt), `author` (Person → reuse the entity from 1.1), `image`, and `about`/`keywords` from the tags. This gives AI engines topic + authorship context for the highest-value pages on the site. Also add `BreadcrumbList` (Home → Case Catalog → [study]) so the site hierarchy is machine-legible.

---

## P2 — Meaningful gains

### 2.1 Freshness signals on blog posts — `S–M`
**Where:** `src/layouts/PostLayout.astro:22-33`, post frontmatter

Posts are dated **2024** with `datePublished` only. AI systems weight recency heavily; undated/stale content loses to dated content.
- Add `dateModified` to the `BlogPosting` schema and a visible "Last updated: [date]" when a post is refreshed.
- Add `mainEntityOfPage` and a `publisher`/`author.url` (→ the Person entity) to the `BlogPosting`.
- Plan a quarterly refresh on the 2–3 highest-traffic evergreen posts (e.g. UX interviews, accessibility, portfolio advice) and bump the date.

### 2.2 Author attribution block on posts — `S`
**Where:** `PostLayout.astro` (visible) + schema

Schema names Emily as author, but there's no **visible author bio with credentials** on posts — an E-E-A-T and citability signal (+25–30%). Add a short byline/bio at the foot of each post: name, "Senior Product Designer (healthcare UX/UI), 10+ yrs across recruiting, ops, and design," link to `/about`. First-hand-experience framing ("from a recruiter who interviews daily" — already in one excerpt) is exactly right; make it consistent.

### 2.3 Add an FAQ section + `FAQPage` schema — `M`
**Where:** `/about` or `/contact`, and/or a `/hire` section

No FAQ exists. AI engines extract Q&A directly, and FAQs answer the literal entity/hiring queries:
- "What does Emily Backes do?" / "What industries has she designed for?" / "Is she available for hire?" / "What's her design process?" / "What are her notable results?"
Mark these up with `FAQPage`. Phrase questions the way people actually ask AI assistants. (Note the skill's guardrail: write these for humans too, not AI-only bait.)

### 2.4 Query-align the heading hierarchy on `/about` — `S`
**Where:** `src/pages/about.astro:92, 98, 103, 116`

`<h2>` is used **decoratively** for cat-photo captions ("Bowtie: President of SASS," "Tux: CEO (Cat EO)") and "QUICK"/"FACTS." Headings are a primary structural signal AI uses to understand a page; spending H2s on jokes dilutes it. Recommend demoting decorative captions to non-heading elements (or `<p>`/`<figcaption>`) and reserving H2/H3 for content that matches real queries ("Path to UX" is good). Keep the personality in the copy, not the heading tags.

### 2.5 Testimonials → `Review`/quotes — `S`
**Where:** `src/pages/index.astro:52-86`

Four named testimonials sit in plain markup. Expert quotes with name + title are a +30% citability signal. Consider representing them as structured quotes (e.g. `Review` with `author`, or `Person.review`) so AI can attribute "what others say about Emily" to named sources.

### 2.6 An agent-readable "hire/services" summary — `S`
**Where:** new `public/hire.md` (the portfolio analog of the skill's `/pricing.md`)

Agents increasingly pre-screen people/vendors programmatically. A short, public, parseable markdown — role sought, focus (healthcare/product), availability, location/remote, key outcomes, contact email — is the portfolio equivalent of exposing pricing. Keeps Emily in AI-mediated shortlists instead of being skipped for unparseable info.

---

## P3 — Ongoing / off-site (biggest long-term lever)

### 3.1 Off-site presence — `L`
The skill's data: **brands are 6.5× more likely to be cited via third-party sources than their own domain**, and AI engines lean on Wikipedia, Reddit, LinkedIn, review/community sites. For a designer that means:
- A complete, consistent **LinkedIn** (mirrors the Person entity — same titles, same `sameAs` URLs).
- **Dribbble/Behance** profiles linked from `sameAs`.
- Guest posts / community answers (Reddit r/UXDesign, Designer Hangout, Quora) on the same topics the blog covers — authentic participation only (the skill explicitly warns against fabricated/bulk mentions).
- Being included in "best UX portfolio examples" roundups (the portfolio is repeatedly called distinctive — that's link-bait-worthy in a good way).

### 3.2 Topical cluster / query fan-out — `L`
The blog already covers a solid cluster (UX interviews, personas, accessibility, AI-and-jobs, portfolios, job-hunting). To benefit from Google's query fan-out, deepen clusters rather than chase single keywords — e.g. for "UX interviews," ensure adjacent fan-out questions (recruiting screens vs. user interviews, avoiding leading questions, sample scripts) are covered across the cluster.

### 3.3 Monitor AI visibility — `L`
There's no AI-specific Search Console report. Establish a monthly DIY check: run ~15–20 priority queries (entity + topical) through ChatGPT, Perplexity, and Google AI Overviews; log whether Emily/the blog is cited and who else is. Optionally a tool (Otterly, Peec, ZipTie) later.

---

## What's already good (don't regress)

- **`robots.txt` allows all** (`public/robots.txt`) — GPTBot, PerplexityBot, ClaudeBot, Google-Extended, Bingbot can all crawl and therefore cite. Don't add AI-bot `Disallow` rules unless training-blocking is a deliberate choice (and even then, block only training-only crawlers like CCBot, never the search-and-cite bots).
- **Static output, no JS-gated content** (`output: 'static'`) — AI crawlers and autonomous agents see fully-rendered HTML. Major advantage; preserve it.
- **Semantic shell** — `lang="en"`, skip-link, `<main id="main-content">`, real heading tags, `alt` text on case-study covers. Good for the accessibility tree that agents read.
- **Existing schema baseline** — WebSite + Person (home), BlogPosting (posts) are the right starting types; the work above enriches rather than replaces them.
- **Real, specific metrics exist** ($100k retention, doubled signups, scheduling halved, ZenDesk replaced). The asset is there — the task is making it *extractable and dated*, not inventing it.

## Guardrails (from the skill — avoid)

- **Don't write AI-only content variants** or chunk pages into AI-bait fragments — risks Google's scaled-content-abuse policy. Every change above should serve human readers too.
- **Don't keyword-stuff** — it actively *reduces* AI visibility (−10%).
- **Don't fabricate citations or bulk-spam** Reddit/Wikipedia/Quora — authentic participation only.
- **Keep the public Sortly framing consistent** across the Person/Organization schema and any `llms.txt`/`hire.md` ([[current-role-healthcare-private]]) — the real healthcare employer stays private.

---

## Suggested sequence

1. **P1.2 `llms.txt`** + **P1.1 rich `Person`** — fastest entity wins, mostly additive.
2. **P1.3 + P1.4** — case-study summary blocks + `Article`/`Breadcrumb` schema (highest-citation pages).
3. **P2.1–2.3** — freshness, author bios, FAQ schema (blog citability).
4. **P2.4–2.6, P3** — heading cleanup, testimonials markup, off-site presence, monitoring.

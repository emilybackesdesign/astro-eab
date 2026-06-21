# Free Tools Strategy — Emily Backes Portfolio
*Last updated: 2026-06-20*

---

## Why Free Tools

Content posts build traffic slowly. Free tools do three things posts can't:

1. **Repeat visits** — people come back to use them, not just read them
2. **Natural links** — designers share useful tools; "check out this generator" is a common Design Twitter/LinkedIn pattern
3. **High-intent audience** — someone using a "portfolio readiness checker" is actively preparing to job search; exactly Emily's hiring audience in discovery mode

For a solo creator at a day job, tools also have a better effort-to-traffic ratio than posts over time — a post requires fresh content, a tool just keeps running.

**Lead capture goal:** For Emily's context, "leads" = hiring managers or recruiters who contact her, plus peer designers who return, share, and grow the audience. The contact CTA should be low-pressure: "Want feedback on your portfolio? I occasionally review them — say hi."

---

## Recommended Tools — Ranked

### Tool 1 — Portfolio Impact Statement Writer ⭐ Build First

**What it does:** Input your project + what you designed + raw outcomes/numbers → get 3 polished impact statement variations (short/headline/narrative) you can drop straight into a case study.

**Why it's the strongest tool:**
- The #1 designer portfolio pain point, universally. Everyone struggles to frame outcomes.
- Emily is one of the few designers who *has* real metrics ($100k retention, doubled signups, scheduling halved) — the tool literally teaches what her case studies demonstrate.
- No good version of this exists. The search space is wide open.
- Highly shareable: "I finally found something that helped me write my portfolio metrics" is a tweet that writes itself.
- Direct signal to hiring managers: a tool about measuring design impact is a strong authority marker.

**Inputs:**
- What type of project was it? (product redesign / new feature / design system / research project / other)
- What did you design or change? (1–2 sentences, plain language)
- What were the outcomes? (numbers if you have them, qualitative if not — e.g. "users said X" or "reduced step count from 7 to 3")
- Who was it for? (B2C / B2B / healthcare / internal)

**Outputs:** 3 variations —
- **Headline** (1 line, lead with the number): "Redesigned the subscription cancellation flow, recovering ~$100k/year in at-risk revenue."
- **Portfolio bullet** (2–3 lines, process + outcome): "Identified a 73% drop-off in the cancellation flow through session recordings and exit surveys. Redesigned the offer logic and UI, recovering approximately $100k/year in revenue that would have churned."
- **Case study opening** (narrative paragraph): Full story framing the problem, approach, and result.

**Build recommendation:** Claude API-powered generator. The conditional logic alone won't produce outputs worth using — the value is in natural language that sounds like a senior designer wrote it. Simple Astro page with a client-side form → fetch to a serverless function → Claude API → rendered output.

**Lead capture:** "Want me to look at your actual portfolio? I occasionally do portfolio reviews — reach out." → links to contact page.

**SEO targets:** "portfolio impact statement generator" / "how to write UX case study results" / "product designer portfolio metrics"

**Scorecard:**

| Factor | Score (1–5) |
|---|---|
| Search demand | 3 |
| Audience match to buyers | 5 |
| Uniqueness vs. existing | 5 |
| Natural path to Emily's brand | 5 |
| Build feasibility | 3 |
| Maintenance burden (inverse) | 4 |
| Link-building potential | 4 |
| Share-worthiness | 5 |
| **Total** | **34/40** |

---

### Tool 2 — Portfolio Readiness Assessment

**What it does:** 20-question interactive assessment about your portfolio → personalized score (out of 100) + a prioritized list of specific improvements, categorized by impact tier.

**Why it's strong:**
- Designers don't know if they're "ready." This converts that anxiety into a concrete to-do list.
- Quiz format creates an experience, not just a page — time-on-page is high.
- The hiring audience also benefits: "send this to the designer you're considering" is a natural use case.
- Email gate is justified: "Get your full report emailed to you" feels like a fair trade.
- Connects to Emily's authority as someone whose portfolio "hiring managers consistently single out."

**Assessment categories (4–5 questions each):**
1. **Case studies** — Do you have 3–5? Are they outcome-driven? Do they show process + decisions, not just screens?
2. **Clarity of role** — Is your title/level clear? Is your current/target industry apparent? Can a stranger tell in 10 seconds?
3. **Visual quality** — Is the presentation consistent? Does the typography breathe? Are mockups high-quality?
4. **Senior signals** — Does it show stakeholder management? Ambiguity navigation? Research synthesis? Business impact?
5. **Accessibility & craft** — Is it fast? Mobile-usable? Does the writing match the visual quality?

**Output format:**
- Score + band: "Ready to Apply (80–100)" / "Almost There (60–79)" / "Needs Work (40–59)" / "Starting Point (under 40)"
- Top 3 priority fixes with explanations
- 3 "quick wins" that take < 1 hour
- Optional email gate for the detailed breakdown report

**Build recommendation:** Pure Astro/JS — no API needed. Quiz state in localStorage, scoring logic client-side, results rendered on page. Use a clean accordion-style results layout. Gate the "full report" PDF via email (Tally or a simple serverless endpoint writing to an Airtable/sheet).

**SEO targets:** "senior product designer portfolio checklist" / "UX portfolio assessment" / "product designer portfolio review tool"

**Scorecard:**

| Factor | Score (1–5) |
|---|---|
| Search demand | 4 |
| Audience match to buyers | 5 |
| Uniqueness vs. existing | 3 |
| Natural path to Emily's brand | 5 |
| Build feasibility | 4 |
| Maintenance burden (inverse) | 4 |
| Link-building potential | 4 |
| Share-worthiness | 4 |
| **Total** | **33/40** |

---

### Tool 3 — UX Research Discussion Guide Generator

**What it does:** Input your research goal + product type + participant type → get a ready-to-use discussion guide with opening spiel, warm-up questions, core topic questions, follow-up probes, and a wrap-up.

**Why it's strong:**
- Directly extends Emily's "How to Conduct Effective UX Interviews" post — the tool is the complement to the article.
- Writing a discussion guide from scratch is one of the most avoided tasks in UX research. Most designers copy an old one or use a blank Google Doc.
- Repeat-use tool: designers come back every new research project.
- No good generator exists for this. Lots of template downloads, none interactive/customized.

**Inputs:**
- What are you trying to learn? (free text, 1–2 sentences)
- Product type (healthcare / SaaS / consumer app / e-commerce / internal tool)
- Who are you interviewing? (end users / clinicians / internal stakeholders / potential customers)
- Session length (30 / 45 / 60 min)
- Research method (generative discovery / usability testing / concept validation / jobs-to-be-done)

**Output:**
- Formatted discussion guide with all sections, estimated timing per section
- 6–8 core questions + follow-up probes for each
- Opening script the designer can read verbatim
- Warm-up questions tailored to participant type
- Downloadable as Markdown or plaintext

**Build recommendation:** Claude API-powered. Template-based guides for 5 product types × 5 research methods = 25 variants — possible to do statically but the quality drops. Claude produces natural, contextually appropriate questions.

**SEO targets:** "UX research discussion guide template" / "user interview guide generator" / "UX interview questions template"

**Scorecard:**

| Factor | Score (1–5) |
|---|---|
| Search demand | 4 |
| Audience match to buyers | 5 |
| Uniqueness vs. existing | 4 |
| Natural path to Emily's brand | 4 |
| Build feasibility | 3 |
| Maintenance burden (inverse) | 4 |
| Link-building potential | 4 |
| Share-worthiness | 4 |
| **Total** | **32/40** |

---

### Tool 4 — "Is This a UX Problem?" Decision Tree

**What it does:** Walk through a branching decision tree to diagnose whether a problem is a UX problem, a product strategy problem, a stakeholder alignment problem, or a technical constraint problem — and what to do next in each case.

**Why it's strong:**
- Opinionated and specific — Emily's operational background gives her unique authority to articulate when "doing more UX" won't fix it.
- Extremely shareable: Design leads love sharing diagnostic frameworks with their teams. Senior designers love validating their instincts.
- Novel — nothing like this exists.
- Strongly signals senior product-thinking to the hiring audience: knowing when NOT to do UX is a senior skill.

**Decision nodes (example path):**
1. "Has this problem been clearly defined by stakeholders?"
   - No → "Stakeholder alignment issue. Start here."
   - Yes → continue
2. "Do users actually have this problem, or did someone assume they do?"
   - Assumed → "Research problem. Do discovery before design."
   - Confirmed → continue
3. "Is the problem about how users experience the product, or what the product does?"
   - What it does → "Product strategy problem. Bring in PM."
   - How they experience it → continue
4. "Is the current experience technically constrained from improving?"
   - Yes → "Engineering dependency. Frame as a tradeoff, not a UX failure."
   - No → "This is a UX problem. Here's where to start."

Each terminal node links to a relevant blog post or resource.

**Build recommendation:** Pure Astro/JS — an interactive decision tree with animated state transitions. No API needed. This is the most fun/playful tool and should have the most personality — fits Emily's brand.

**SEO targets:** "is this a ux problem" / "UX vs product problem" / "design problem diagnosis"

**Scorecard:**

| Factor | Score (1–5) |
|---|---|
| Search demand | 2 |
| Audience match to buyers | 4 |
| Uniqueness vs. existing | 5 |
| Natural path to Emily's brand | 5 |
| Build feasibility | 4 |
| Maintenance burden (inverse) | 5 |
| Link-building potential | 4 |
| Share-worthiness | 5 |
| **Total** | **34/40** |

> Note: Tied with Tool 1 on score but lower search demand. Build it after Tool 1 — it's the "shareable/brand" tool; Tool 1 is the "search traffic" tool.

---

### Tool 5 — Healthcare UX Checklist

**What it does:** An interactive checklist for product designers working on healthcare software — covering clinical workflow considerations, HIPAA UX implications, accessibility baselines, patient vs. clinician context switches, and common failure modes.

**Why it builds the brand (not the traffic):**
- Very niche — search volume will be low but audience quality is extremely high.
- The *only* audience who uses this is designers working in health-tech — Emily's exact target hiring segment.
- No version of this exists. Health-tech hiring managers will share it internally.
- This is the "authority play" — not for traffic, for credibility with the people who hire her.

**Checklist categories:**
- Research & Discovery (clinical context, workflow observation, HIPAA-compliant research)
- Information Architecture (urgency-aware hierarchy, terminology alignment with clinical staff)
- Interaction Design (error tolerance for high-stakes actions, time-pressure context, fatigue patterns)
- Accessibility (WCAG AA minimum + clinical environment specifics: bright lighting, gloves, time pressure)
- Validation (usability testing with both patient and clinician participants, pilot protocols)

**Build recommendation:** Static interactive checklist — checkboxes with localStorage persistence (progress saved on return). Printable version available. No email gate — ungated for maximum reach in the healthcare design niche.

**SEO targets:** "healthcare UX checklist" / "health tech UX design" / "clinical software UX"

**Scorecard:**

| Factor | Score (1–5) |
|---|---|
| Search demand | 2 |
| Audience match to buyers | 5 |
| Uniqueness vs. existing | 5 |
| Natural path to Emily's brand | 5 |
| Build feasibility | 5 |
| Maintenance burden (inverse) | 5 |
| Link-building potential | 3 |
| Share-worthiness | 3 |
| **Total** | **33/40** |

---

## Build Phasing

### Phase 1 — Traffic + Authority (build with Tier 1 posts)
**Tool 1: Portfolio Impact Statement Writer**
- Highest share-worthiness + closes the biggest gap (no good version exists)
- Pairs with the "What Hiring Managers Look At" post (#2 on the content calendar)
- Needs: Astro page + serverless function + Claude API (Haiku tier for cost)

### Phase 2 — Return Visits + Email List
**Tool 2: Portfolio Readiness Assessment**
- Builds email list via optional gate
- Pairs with "Senior Product Designer Level-Up" pillar posts
- Needs: Quiz logic in Astro/JS + Tally or simple email capture endpoint

### Phase 3 — Shareability + Brand
**Tool 4: "Is This a UX Problem?" Decision Tree**
- The brand-building, shareable tool — personality-heavy
- Pairs with stakeholder management posts (Pillar 1)
- Needs: Interactive Astro component — no API

### Phase 4 — Repeat Use + SEO
**Tool 3: UX Research Discussion Guide Generator**
- Highest repeat-use potential (new project = new guide)
- Pairs with existing UX interviews post + new Pillar 1 content
- Needs: Astro page + serverless + Claude API

### Phase 5 — Niche Authority
**Tool 5: Healthcare UX Checklist**
- Build when Pillar 2 posts are live — this is the anchor resource for that cluster
- Purely static build, no API
- Link to it from all healthcare UX posts

---

## Tech Stack Notes (Astro 6)

**Static tools** (Tools 2, 4, 5): Pure Astro + vanilla JS or a lightweight React island. No external dependencies.

**AI-powered tools** (Tools 1, 3): Need a serverless endpoint. Options:
- **Netlify Functions / Vercel Edge Functions** — simplest if that's the deploy target
- **Astro API routes** — Astro 6 supports server-side routes; can call Claude API server-side and keep API key out of the client
- **Model to use:** `claude-haiku-4-5-20251001` for cost efficiency on generators; output quality is more than sufficient for structured generation tasks

**Shared infrastructure:**
- URL structure: `/tools/` hub page + `/tools/[slug]` per tool
- All tools should share the site's design system (dark-mode, Pridi/Public Sans, pink-200 accent)
- Each tool page has a brief intro paragraph (sets SEO context) + the interactive component + a "Made by Emily" CTA at the bottom

---

## Lead Capture

For Emily's goals, the lead capture hierarchy is:

1. **Email** (for Portfolio Readiness Assessment full report) — builds a list of peer designers who are actively job searching = Emily's network + future audience
2. **Contact page CTA** ("Want feedback on your portfolio? Say hi.") — low pressure, appears at the bottom of every tool
3. **Newsletter/follow CTA** — if a Paws & Reflect email list is ever set up

No hard gating on Tools 1, 3, 4, 5 — the goal for those is reach and sharing, not emails.

---

## Summary — Build Order

| # | Tool | Type | Paired With | Key Goal |
|---|---|---|---|---|
| 1 | Portfolio Impact Statement Writer | Generator (AI) | "What Hiring Managers Look At" post | Search traffic + shares |
| 2 | Portfolio Readiness Assessment | Interactive quiz | "Senior Product Designer Skills" post | Email list + return visits |
| 3 | "Is This a UX Problem?" Decision Tree | Interactive | Stakeholder management posts | Shares + brand |
| 4 | UX Research Discussion Guide Generator | Generator (AI) | UX interviews post | Repeat use + backlinks |
| 5 | Healthcare UX Checklist | Static checklist | Healthcare UX hub post | Niche authority |

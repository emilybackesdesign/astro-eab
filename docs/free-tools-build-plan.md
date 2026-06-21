# Free Tools Build Plan — Tools 2, 4 & 5
*Last updated: 2026-06-20*

Pure Astro/JS — no external APIs, no framework integrations. All state is client-side via vanilla JS + `localStorage`.

---

## Constraints & Conventions

- **Output mode:** `static` — no SSR, no server routes. All interactivity via `<script>` tags.
- **No React/Vue/Svelte** — vanilla JS only, consistent with existing components.
- **Styling:** CSS variables from `global.css`, Pridi (headings) + Public Sans (body), dark-mode first.
- **Layout:** All tool pages use `PageLayout.astro` with `leanFonts` prop.
- **Animation:** AOS for scroll entrance, CSS transitions for in-tool state changes.
- **Accessibility:** Every interactive element is keyboard-navigable; color is never the sole state indicator.

---

## File Structure

```
src/
├── pages/
│   └── tools/
│       ├── index.astro                        ← Tools hub page
│       ├── portfolio-readiness.astro          ← Tool 2
│       ├── is-this-a-ux-problem.astro         ← Tool 4
│       └── healthcare-ux-checklist.astro      ← Tool 5
├── components/
│   └── tools/
│       ├── ToolCard.astro                     ← Shared card for hub page
│       ├── PortfolioQuiz.astro                ← Tool 2 shell
│       ├── UxDecisionTree.astro               ← Tool 4 shell
│       └── HealthcareChecklist.astro          ← Tool 5 shell
└── data/
    └── tools/
        ├── portfolio-quiz.ts                  ← Questions + scoring data
        ├── ux-decision-tree.ts                ← Tree node data
        └── healthcare-checklist.ts            ← Checklist items data
```

---

## Shared Infrastructure

### `src/pages/tools/index.astro` — Hub Page

**Purpose:** SEO landing page + directory. Linked from Nav and blog posts.

**SEO:**
- `<title>`: "Free Tools for Product Designers — Emily Backes"
- `<description>`: "Free interactive tools to help product designers do better UX work, build stronger portfolios, and get hired."
- JSON-LD: `ItemList` schema with each tool as a `ListItem`

**Content above tools:**
```
Heading: "Free Tools for Product Designers"
Subhead: "No signup, no paywall. Use them, share them."
```

**Tool cards (3):** Use `ToolCard.astro` component. Each card:
- Tool name (Pridi heading)
- 1-line description
- Type badge: `Quiz` / `Interactive` / `Checklist`
- Estimated time to complete (e.g. "~5 min")
- CTA: "Use it free →" (pink-200 accent)

**Footer CTA:**
```
"These tools are based on my own work as a product designer.
If one helped you — I'd love to hear about it."
[Say hi →] → /contact
```

---

### `src/components/tools/ToolCard.astro`

Props:
```typescript
interface Props {
  title: string;
  description: string;
  href: string;
  badge: 'Quiz' | 'Interactive' | 'Checklist';
  timeEstimate: string; // e.g. "~5 min"
}
```

Renders a card matching the site's existing card style (`--elevated` bg, `--card-border` border, `--lg` border-radius), with `--toe-bean-pink-200` on hover.

---

## Tool 2 — Portfolio Readiness Assessment

**URL:** `/tools/portfolio-readiness`
**Type:** Interactive quiz → scored results
**Time:** ~5 minutes (20 questions)

### TypeScript Data Model (`src/data/tools/portfolio-quiz.ts`)

```typescript
export type QuestionOption = {
  label: string;
  points: 0 | 1 | 2 | 3;
};

export type Question = {
  id: string;
  category: CategoryId;
  text: string;
  options: [QuestionOption, QuestionOption, QuestionOption, QuestionOption];
};

export type CategoryId =
  | 'case-studies'
  | 'role-clarity'
  | 'visual-quality'
  | 'senior-signals'
  | 'craft';

export type Category = {
  id: CategoryId;
  label: string;
  icon: string; // emoji
  questionCount: 4;
};

export type ScoreBand = {
  label: string;
  slug: 'ship-ready' | 'almost-there' | 'needs-work' | 'starting-point';
  min: number; // 0–100 normalized
  headline: string;
  priority: string[];    // 2 top priority actions
  quickWins: string[];   // 3 quick wins (< 1 hour each)
  color: string;         // CSS var or hex
};
```

### Full Question Set

**Category 1: Case Studies** (weight: 30% of final score)

```typescript
{ id: 'cs-1', category: 'case-studies',
  text: 'How many case studies are in your portfolio?',
  options: [
    { label: "I don't have any yet", points: 0 },
    { label: 'I have 1–2', points: 1 },
    { label: 'I have 3–4', points: 2 },
    { label: 'I have 5 or more — but quality varies', points: 2 },
  ]
},
{ id: 'cs-2', category: 'case-studies',
  text: 'How do your case studies frame outcomes?',
  options: [
    { label: 'They show final designs without much context', points: 0 },
    { label: 'They explain what I did, but not the outcome', points: 1 },
    { label: 'Most include outcomes, but not all', points: 2 },
    { label: 'Every case study leads with a measurable outcome or clear business impact', points: 3 },
  ]
},
{ id: 'cs-3', category: 'case-studies',
  text: 'How much process depth do your case studies show?',
  options: [
    { label: 'Mostly screenshots and mockups', points: 0 },
    { label: 'Wireframes and a brief description of what happened', points: 1 },
    { label: 'Research, decisions, and final designs — but the "why" could be stronger', points: 2 },
    { label: 'Research → synthesis → key decisions → outcomes, with clear reasoning throughout', points: 3 },
  ]
},
{ id: 'cs-4', category: 'case-studies',
  text: 'Do your case studies show stakeholder complexity or constraints?',
  options: [
    { label: 'Not really — they focus on the design itself', points: 0 },
    { label: 'I mention stakeholders but don\'t go into detail', points: 1 },
    { label: 'Some case studies describe constraints and tradeoffs', points: 2 },
    { label: 'I clearly show how I navigated competing priorities, pushed back, or aligned stakeholders', points: 3 },
  ]
},
```

**Category 2: Role Clarity** (weight: 20%)

```typescript
{ id: 'rc-1', category: 'role-clarity',
  text: 'What does someone understand in the first 10 seconds on your portfolio?',
  options: [
    { label: "It's a bit ambiguous — I'm not sure", points: 0 },
    { label: "That I'm a designer, but maybe not my level or specialty", points: 1 },
    { label: "That I'm a product/UX designer with some background context", points: 2 },
    { label: 'My level, specialty, and what makes me different — immediately', points: 3 },
  ]
},
{ id: 'rc-2', category: 'role-clarity',
  text: 'Is your target role or industry visible in your portfolio?',
  options: [
    { label: "No — it's pretty generic", points: 0 },
    { label: 'It could be read into the work, but it\'s not explicit', points: 1 },
    { label: "I mention it somewhere but it's not front-and-center", points: 2 },
    { label: 'My case studies and copy clearly signal the types of roles and industries I\'m targeting', points: 3 },
  ]
},
{ id: 'rc-3', category: 'role-clarity',
  text: 'Does your portfolio tell a coherent career story?',
  options: [
    { label: "It's a collection of work without a connecting narrative", points: 0 },
    { label: 'There\'s a brief bio, but the trajectory isn\'t clear', points: 1 },
    { label: 'Someone can piece together my journey from the work and bio', points: 2 },
    { label: 'My portfolio shows where I\'ve been, where I am, and what I do best — as a coherent story', points: 3 },
  ]
},
{ id: 'rc-4', category: 'role-clarity',
  text: 'How prominent is your current title and level?',
  options: [
    { label: "My title isn't on the portfolio", points: 0 },
    { label: "It's in my resume but not the portfolio pages", points: 1 },
    { label: "It's visible but could be more prominent", points: 2 },
    { label: 'My current title, level, and company are clear and prominent above the fold', points: 3 },
  ]
},
```

**Category 3: Visual Quality** (weight: 15%)

```typescript
{ id: 'vq-1', category: 'visual-quality',
  text: 'How consistent is the visual presentation across your case studies?',
  options: [
    { label: 'Inconsistent — different styles and layouts across studies', points: 0 },
    { label: 'Some consistency, but it feels patchwork', points: 1 },
    { label: 'Mostly consistent, with a few rough spots', points: 2 },
    { label: 'Polished and consistent throughout — it feels like one designed thing', points: 3 },
  ]
},
{ id: 'vq-2', category: 'visual-quality',
  text: 'How polished are your mockups and presentation frames?',
  options: [
    { label: 'Raw screenshots with no polish', points: 0 },
    { label: 'Basic mockups, not particularly refined', points: 1 },
    { label: 'Clean mockups with some context frames', points: 2 },
    { label: 'High-quality device frames or context mockups that make the work look finished', points: 3 },
  ]
},
{ id: 'vq-3', category: 'visual-quality',
  text: 'How readable and intentional is the typography?',
  options: [
    { label: "I haven't thought much about it", points: 0 },
    { label: "It's the default template — nothing customized", points: 1 },
    { label: "I've made some typographic choices but nothing distinctive", points: 2 },
    { label: 'Clean, intentional, and scannable — hierarchy is clear at a glance', points: 3 },
  ]
},
{ id: 'vq-4', category: 'visual-quality',
  text: 'Does your portfolio work well on mobile?',
  options: [
    { label: "I haven't checked", points: 0 },
    { label: "It's technically accessible but not optimized", points: 1 },
    { label: 'It works — not perfect but functional', points: 2 },
    { label: 'The mobile experience is thoughtful and well-executed', points: 3 },
  ]
},
```

**Category 4: Senior Signals** (weight: 25%)

```typescript
{ id: 'ss-1', category: 'senior-signals',
  text: 'Do your case studies show research and synthesis — not just deliverables?',
  options: [
    { label: "No — they're mainly about the designs I made", points: 0 },
    { label: "I mention that research happened, but don't show the process", points: 1 },
    { label: 'I show some research artifacts but the synthesis is light', points: 2 },
    { label: 'I show how I gathered insight, synthesized it, and how it directly shaped design decisions', points: 3 },
  ]
},
{ id: 'ss-2', category: 'senior-signals',
  text: 'Do you demonstrate navigating ambiguity or messy constraints?',
  options: [
    { label: "Not really — my case studies start with a clear brief", points: 0 },
    { label: 'I hint at it but don\'t make it explicit', points: 1 },
    { label: 'One or two case studies show how I handled unclear requirements or constraints', points: 2 },
    { label: 'Multiple case studies show how I operated when things were messy — requirements, stakeholders, or constraints', points: 3 },
  ]
},
{ id: 'ss-3', category: 'senior-signals',
  text: 'Do your case studies show cross-functional collaboration and influence?',
  options: [
    { label: 'My case studies are entirely about my solo work', points: 0 },
    { label: "I mention the team but don't describe my role in it", points: 1 },
    { label: 'I describe cross-functional work in some case studies', points: 2 },
    { label: 'I clearly show how I influenced product decisions, aligned stakeholders, and drove outcomes across the team', points: 3 },
  ]
},
{ id: 'ss-4', category: 'senior-signals',
  text: 'Does your portfolio show design thinking — or just design deliverables?',
  options: [
    { label: "Mainly deliverables: wireframes, prototypes, final UI", points: 0 },
    { label: 'Some process is included but it\'s secondary to the visuals', points: 1 },
    { label: "The reasoning is present but not consistently clear", points: 2 },
    { label: 'Every major design decision has a clear "why" — grounded in research, user need, or business constraint', points: 3 },
  ]
},
```

**Category 5: Craft & Accessibility** (weight: 10%)

```typescript
{ id: 'ca-1', category: 'craft',
  text: 'How fast does your portfolio load?',
  options: [
    { label: "I haven't checked", points: 0 },
    { label: "It's probably slow — lots of unoptimized images", points: 1 },
    { label: "Decent — I've done some optimization", points: 2 },
    { label: "Fast — I've optimized images and it scores well on Core Web Vitals", points: 3 },
  ]
},
{ id: 'ca-2', category: 'craft',
  text: "How's the writing quality in your case studies?",
  options: [
    { label: "I know it could be better but haven't focused on it", points: 0 },
    { label: 'Functional but not compelling', points: 1 },
    { label: 'Reasonably well-written, some sections are rough', points: 2 },
    { label: 'Tight, active-voiced, and makes the work sound as good as it actually was', points: 3 },
  ]
},
{ id: 'ca-3', category: 'craft',
  text: 'Is your contact information easy to find and act on?',
  options: [
    { label: "It's only in my resume or a hard-to-find footer", points: 0 },
    { label: "There's a contact page but it's not prominently linked", points: 1 },
    { label: "There's a clear CTA, but it could be more prominent", points: 2 },
    { label: "There's a clear 'Let's talk' CTA visible throughout the site", points: 3 },
  ]
},
{ id: 'ca-4', category: 'craft',
  text: 'Have you gotten feedback from someone who hires designers?',
  options: [
    { label: "No — I've only shown it to designer friends", points: 0 },
    { label: 'A few peer designers have reviewed it', points: 1 },
    { label: "I've gotten recruiter feedback but not from a hiring manager", points: 2 },
    { label: "Yes — at least one hiring manager or design lead has given me specific feedback", points: 3 },
  ]
},
```

### Scoring Logic

```typescript
// Category weights
const WEIGHTS: Record<CategoryId, number> = {
  'case-studies':    0.30,
  'role-clarity':    0.20,
  'visual-quality':  0.15,
  'senior-signals':  0.25,
  'craft':           0.10,
};

// Max points per category: 4 questions × 3 pts = 12
// Weighted score per category: (earned / 12) × weight × 100
// Total: sum of all category weighted scores → 0–100
```

### Score Bands & Recommendations

| Band | Range | Label |
|---|---|---|
| Ship-Ready | 85–100 | "Your portfolio is doing the work." |
| Almost There | 65–84 | "Strong foundation. A few targeted fixes will make a real difference." |
| Needs Work | 40–64 | "The bones are there — now it needs clarity and depth." |
| Starting Point | 0–39 | "Before optimizing, focus on the foundation." |

**Ship-Ready (85–100):**
- Priority 1: "Your portfolio has the fundamentals — make sure your unique angle (industry, specialization, or superpower) is unmissable."
- Priority 2: "Add metrics to any case study that still lacks them."
- Quick wins: Polish your headline statement / make contact CTA visible above the fold / get one more hiring manager to review it.

**Almost There (65–84):**
- Priority 1: "Find the case study with the weakest 'why' and add the decision-making logic that's currently missing."
- Priority 2: "If role clarity scored low: rewrite your homepage headline before anything else."
- Quick wins: Add a single metric to your best case study / test mobile load time / ask one person who hires designers for 15 minutes of honest feedback.

**Needs Work (40–64):**
- Priority 1: "Pick your strongest project and rebuild that case study: research → decisions → outcomes. One great study beats three weak ones."
- Priority 2: "Write a clear one-liner above the fold that states your level, specialty, and what you do well."
- Quick wins: Add your current title to the homepage / add one number to one case study / fix the worst visual inconsistency.

**Starting Point (0–39):**
- Priority 1: "Before optimizing details, focus on the foundation: 2 solid case studies beat 6 thin ones every time."
- Priority 2: "Use a strong, well-designed portfolio template — visual presentation at this stage signals design judgment even before hiring managers read a word."
- Quick wins: Write a 2-sentence 'about' statement that names your level and target / add contact info to every page / share with one person who hires designers and listen — don't defend.

### State Management

```javascript
// localStorage key
const STORAGE_KEY = 'portfolio-quiz-v1';

// Persisted state shape
{
  answers: { [questionId: string]: number }, // points value of selected option
  currentIndex: number,                       // 0–19
  completed: boolean,
  score: number | null,                       // 0–100, null until complete
}
```

State is read on `DOMContentLoaded`. If `completed: true` exists in storage, show results immediately with an option to retake.

### Component States (visual state machine)

```
[intro] → [question-N] → [analyzing] → [results]
                ↑↓ (back button)
```

- **intro:** Tool description + "Start assessment" button
- **question-N:** Progress bar + category header + question text + 4 option buttons + Next/Back
- **analyzing:** Fake 1.5s delay with animated "Analyzing your portfolio…" (matches brand voice)
- **results:** Score dial (CSS `conic-gradient`) + band label + priority fixes + quick wins + CTA

### `src/components/tools/PortfolioQuiz.astro`

Shell template — renders static wrapper HTML, then a single `<script>` hydrates it:

```html
<div id="portfolio-quiz" class="tool-shell">
  <!-- All states rendered but hidden; JS toggles visibility -->
  <div class="quiz-intro" id="quiz-intro">...</div>
  <div class="quiz-question" id="quiz-question" hidden>...</div>
  <div class="quiz-analyzing" id="quiz-analyzing" hidden>...</div>
  <div class="quiz-results" id="quiz-results" hidden>...</div>
</div>
<script src="/src/scripts/portfolio-quiz.js" type="module"></script>
```

The data (`portfolio-quiz.ts`) is imported via the script. TypeScript compiled at build time.

---

## Tool 4 — "Is This a UX Problem?" Decision Tree

**URL:** `/tools/is-this-a-ux-problem`
**Type:** Interactive branching decision tree
**Time:** ~2 minutes

### TypeScript Data Model (`src/data/tools/ux-decision-tree.ts`)

```typescript
export type LeafType =
  | 'ux-design'
  | 'ux-polish'
  | 'stakeholder'
  | 'research'
  | 'strategy'
  | 'technical';

export type BranchNode = {
  type: 'branch';
  id: string;
  question: string;
  hint?: string;           // small explanatory text below question
  yesLabel?: string;       // defaults to "Yes"
  noLabel?: string;        // defaults to "No"
  yes: string;             // id of next node
  no: string;
};

export type LeafNode = {
  type: 'leaf';
  id: string;
  leafType: LeafType;
  verdict: string;         // bold headline result
  explanation: string;     // 2–3 sentences of guidance
  nextStep: string;        // 1 concrete action to take right now
  relatedPostSlug?: string; // optional link to a blog post
  relatedPostLabel?: string;
};

export type TreeNode = BranchNode | LeafNode;
```

### Full Tree Data

```typescript
export const TREE: Record<string, TreeNode> = {

  root: {
    type: 'branch',
    id: 'root',
    question: 'Have the key decision-makers agreed on what problem you\'re solving?',
    hint: 'Think: if you asked your PM and your engineering lead right now, would they give the same answer?',
    yes: 'has-user-evidence',
    no: 'leaf-stakeholder',
  },

  'has-user-evidence': {
    type: 'branch',
    id: 'has-user-evidence',
    question: 'Have you spoken to actual users about this problem in the last 3 months?',
    hint: 'Analytics data and support tickets count partially — direct conversation counts fully.',
    yes: 'is-experience-not-capability',
    no: 'leaf-research',
  },

  'is-experience-not-capability': {
    type: 'branch',
    id: 'is-experience-not-capability',
    question: 'Is the problem about how users experience the product — not what the product does?',
    hint: '"The flow is confusing" is a UX problem. "We need a completely different feature" is a product strategy problem.',
    yesLabel: 'Yes — it\'s about the experience',
    noLabel: 'No — it\'s about what the product does',
    yes: 'is-buildable',
    no: 'leaf-strategy',
  },

  'is-buildable': {
    type: 'branch',
    id: 'is-buildable',
    question: 'Is the current design technically buildable as designed?',
    hint: 'Has engineering confirmed the implementation is feasible, or is it still TBD?',
    yes: 'has-clear-direction',
    no: 'leaf-technical',
  },

  'has-clear-direction': {
    type: 'branch',
    id: 'has-clear-direction',
    question: 'Is there an agreed-upon design direction that addresses the user need?',
    hint: 'Not just "we know the general area" — an actual design approach your team has aligned on.',
    yesLabel: 'Yes — direction is clear',
    noLabel: 'No — still figuring it out',
    yes: 'leaf-ux-polish',
    no: 'leaf-ux-design',
  },

  // Leaf nodes

  'leaf-stakeholder': {
    type: 'leaf',
    id: 'leaf-stakeholder',
    leafType: 'stakeholder',
    verdict: 'This is a stakeholder alignment problem.',
    explanation: 'No amount of UX work fixes a problem stakeholders haven\'t agreed to solve. If the team isn\'t aligned on the problem statement, every design you produce will be evaluated against a different invisible standard.',
    nextStep: 'Stop designing and schedule a working session. Use a simple problem statement format: "We\'ve observed [observation]. We believe [hypothesis]. We\'ll know we\'re right if [metric]." Get everyone to sign off on that before any wireframes.',
    relatedPostSlug: 'when-your-stakeholders-want-the-wrong-thing',
    relatedPostLabel: 'When Your Stakeholders Want the Wrong Thing',
  },

  'leaf-research': {
    type: 'leaf',
    id: 'leaf-research',
    leafType: 'research',
    verdict: 'This is a research problem.',
    explanation: 'The problem looks like UX, but the real gap is knowledge. Designing without recent user contact means you\'re solving for your assumptions, not for your users. Analytics show you what — only interviews show you why.',
    nextStep: 'Before touching a wireframe, run 3–5 user interviews focused on this problem area. If time is short, even one well-structured 45-minute session will change what you design.',
    relatedPostSlug: 'how-to-conduct-effective-ux-interviews',
    relatedPostLabel: 'How to Conduct Effective UX Interviews',
  },

  'leaf-strategy': {
    type: 'leaf',
    id: 'leaf-strategy',
    leafType: 'strategy',
    verdict: 'This is a product strategy problem.',
    explanation: 'This is a roadmap decision, not a design decision. Design can inform it — and should — but it can\'t substitute for product strategy. Building the wrong thing perfectly is still building the wrong thing.',
    nextStep: 'Work with your PM to define the right product direction first. Bring your user research findings to that conversation — your data is the most valuable thing you can contribute at this stage.',
  },

  'leaf-technical': {
    type: 'leaf',
    id: 'leaf-technical',
    leafType: 'technical',
    verdict: 'This is an engineering feasibility constraint.',
    explanation: 'UX isn\'t the bottleneck here — technical feasibility is. Pushing on the design without addressing the constraint first will either result in a design that can\'t be built, or wasted design cycles.',
    nextStep: 'Work with engineering to understand the constraint fully. Then decide: adapt the design to what\'s buildable now, or advocate for the technical investment needed to solve the real problem. Both are valid — the wrong move is to keep designing without that conversation.',
  },

  'leaf-ux-polish': {
    type: 'leaf',
    id: 'leaf-ux-polish',
    leafType: 'ux-polish',
    verdict: 'This is a UX polish and craft problem.',
    explanation: 'The design direction is solid and everyone\'s aligned. You\'re in craft territory now. This is about hierarchy, clarity, edge cases, micro-interactions, and making something good feel inevitable.',
    nextStep: 'Focus a critique session on: visual hierarchy, empty states, error handling, and the moments of delight (or friction) that aren\'t in the happy path. These are the things that separate a good design from a great one.',
  },

  'leaf-ux-design': {
    type: 'leaf',
    id: 'leaf-ux-design',
    leafType: 'ux-design',
    verdict: 'This is squarely a UX design problem.',
    explanation: 'You\'ve confirmed the problem is real, the user research supports it, and it\'s about the experience — not the capability or the strategy. You have a genuine design problem to solve. Now run the process.',
    nextStep: 'Define the user need precisely (not the solution), run a structured design sprint or exploration phase, get something in front of users quickly. Don\'t skip straight to high-fidelity.',
  },
};

export const ROOT_ID = 'root';
```

### Leaf Node Color Map

```typescript
export const LEAF_COLORS: Record<LeafType, string> = {
  'ux-design':   'var(--toe-bean-pink-200)',   // pink — the "yes, you're in the right place" answer
  'ux-polish':   'var(--toe-bean-pink-300)',
  'stakeholder': 'var(--navy-blue-300)',
  'research':    'var(--navy-blue-200)',
  'strategy':    'var(--midnight-blue-300)',
  'technical':   'var(--subtle)',
};
```

### State Management

No localStorage — the tree is a fast 2-minute interaction. In-memory only.

```javascript
let currentNodeId = ROOT_ID;
let history = []; // stack of node IDs for back navigation
```

### Component States

```
[intro] → [branch-question] ↔ [branch-question] → [leaf-result]
                  ↑_____________back__________________|
```

Each transition animates with a CSS slide-in from the right (or left on back).

### `src/components/tools/UxDecisionTree.astro`

```html
<div id="ux-tree" class="tool-shell">
  <div class="tree-intro" id="tree-intro">
    <h2>Is this a UX problem?</h2>
    <p>Answer 4–5 yes/no questions to diagnose what kind of problem you're actually facing — and what to do next.</p>
    <button id="tree-start" class="btn-primary">Start the diagnosis →</button>
  </div>

  <div class="tree-question" id="tree-question" hidden>
    <div class="tree-progress" aria-label="Question depth indicator">
      <!-- Filled dots showing depth, rendered by JS -->
    </div>
    <div class="tree-breadcrumb" id="tree-breadcrumb">
      <!-- Previous answers shown as small chips -->
    </div>
    <h3 class="tree-q-text" id="tree-q-text"></h3>
    <p class="tree-q-hint" id="tree-q-hint"></p>
    <div class="tree-buttons">
      <button id="tree-yes" class="btn-tree-option">Yes</button>
      <button id="tree-no" class="btn-tree-option">No</button>
    </div>
    <button id="tree-back" class="btn-ghost">← Back</button>
  </div>

  <div class="tree-result" id="tree-result" hidden>
    <div class="result-badge" id="result-badge"></div>
    <h3 id="result-verdict"></h3>
    <p id="result-explanation"></p>
    <div class="result-next-step">
      <strong>Next step:</strong>
      <p id="result-next-step"></p>
    </div>
    <a id="result-post-link" class="btn-secondary" hidden></a>
    <div class="result-actions">
      <button id="tree-restart" class="btn-ghost">↩ Start over</button>
      <button id="tree-share" class="btn-secondary">Copy link to this result</button>
    </div>
  </div>
</div>
```

**Share feature:** When "Copy link to this result" is clicked, append `?result=leaf-ux-design` (or the relevant leaf ID) to the current URL and copy to clipboard. On page load, if `?result=` param exists, skip intro and jump directly to that leaf node.

---

## Tool 5 — Healthcare UX Checklist

**URL:** `/tools/healthcare-ux-checklist`
**Type:** Interactive checklist with localStorage persistence
**Time:** Reference tool — used over time, not completed in one sitting

### TypeScript Data Model (`src/data/tools/healthcare-checklist.ts`)

```typescript
export type Priority = 'must' | 'should' | 'consider';

export type ChecklistItem = {
  id: string;
  category: string;
  text: string;
  why: string;       // 1–2 sentences explaining why this matters in healthcare
  priority: Priority;
};

export type ChecklistCategory = {
  id: string;
  label: string;
  icon: string; // emoji
  items: ChecklistItem[];
};
```

### Full Checklist Content

**Category 1: Research & Discovery (8 items)**

```typescript
{ id: 'rd-1', priority: 'must',
  text: 'Observe clinical workflows in context before designing.',
  why: 'Healthcare workflows are deeply contextual — the difference between what people say they do and what they actually do in a clinical setting is enormous. Remote interviews miss physical environment, cognitive load, and interruption patterns.' },

{ id: 'rd-2', priority: 'must',
  text: 'Interview both patient-facing AND staff-facing users separately.',
  why: 'Their mental models, terminology, and goals are fundamentally different. Conflating them produces designs that serve neither.' },

{ id: 'rd-3', priority: 'must',
  text: 'Document the "paper workaround" — what people do instead of using the software.',
  why: 'Every workaround is a design requirement in disguise. If staff maintain a whiteboard or a personal spreadsheet, the software has failed to meet a real need.' },

{ id: 'rd-4', priority: 'must',
  text: 'Understand your regulatory environment (HIPAA, HITECH, FDA if applicable).',
  why: 'Regulatory requirements directly constrain UI decisions — from consent flows to audit logging to data display. Not knowing them early creates expensive late-stage rework.' },

{ id: 'rd-5', priority: 'should',
  text: 'Identify who has clinical authority to override a decision in your product flow.',
  why: 'Health software often has hierarchical decision authority (physician overrides nurse, attending overrides resident). Your UI needs to reflect this structure, not fight it.' },

{ id: 'rd-6', priority: 'should',
  text: 'Map the full care handoff chain — every touchpoint where your product is involved.',
  why: 'Patient data flows across multiple systems, roles, and physical locations. Designing for one moment without understanding the full chain leads to handoff failures.' },

{ id: 'rd-7', priority: 'should',
  text: 'Research the previous tool (even if it was paper or a spreadsheet) before designing the replacement.',
  why: 'Mental models built around existing tools are deeply ingrained in clinical staff. Ignoring them creates training overhead and adoption resistance.' },

{ id: 'rd-8', priority: 'consider',
  text: 'Include patients with limited health literacy or digital literacy in research.',
  why: 'Many patient populations have low digital fluency. Designing only for the typical user excludes the populations who often need the most support.' },
```

**Category 2: Information Architecture & Terminology (6 items)**

```typescript
{ id: 'ia-1', priority: 'must',
  text: 'Use terminology that matches what clinical staff actually say — not generic UI labels.',
  why: '"Visit" vs. "Encounter" vs. "Appointment" mean different things in different clinical contexts. Using the wrong term erodes trust and slows workflow.' },

{ id: 'ia-2', priority: 'must',
  text: 'Design for urgency-aware hierarchy — not just chronological order.',
  why: 'Clinical staff triage information by clinical urgency, not by date. A chronological list is almost always the wrong default in a clinical context.' },

{ id: 'ia-3', priority: 'must',
  text: 'Distinguish clearly between patient-facing language and clinical language in the same product.',
  why: '"Abnormal result" means something specific to a clinician and something terrifying to a patient. The same term appearing in both contexts without differentiation is a design failure.' },

{ id: 'ia-4', priority: 'should',
  text: 'Validate all clinical terminology with subject matter experts before usability testing.',
  why: 'Incorrect terminology in usability tests produces invalid results — participants focus on the terminology error rather than the UX you\'re trying to test.' },

{ id: 'ia-5', priority: 'should',
  text: 'Design for multi-patient context switching — a nurse manages multiple patients simultaneously.',
  why: 'Single-patient-at-a-time UX flows break down in real clinical environments where staff move between 4–8 patients.' },

{ id: 'ia-6', priority: 'consider',
  text: 'Plan for data sparseness — many fields will be blank for new or incomplete patient records.',
  why: 'Empty states in healthcare are not just an aesthetic concern — they affect clinical decision-making. Blank fields need to communicate "unknown" vs. "not applicable" vs. "not yet collected."' },
```

**Category 3: Interaction Design for Clinical Contexts (8 items)**

```typescript
{ id: 'id-1', priority: 'must',
  text: 'Every destructive or irreversible clinical action has a confirmation step that shows consequences.',
  why: 'A nurse accidentally archiving a patient record or a clinician submitting the wrong prescription are not undo-able errors in the real world. Confirmation dialogs in clinical software are safety-critical, not just UX convention.' },

{ id: 'id-2', priority: 'must',
  text: 'Design for high cognitive load — a nurse mid-shift is not the same as a user at home.',
  why: 'Clinical staff are often fatigued, interrupted, and cognitively taxed. Designs that work for a fresh, focused user in a test session often fail under real clinical conditions.' },

{ id: 'id-3', priority: 'must',
  text: 'Touch targets are a minimum of 44×44px — larger wherever possible.',
  why: 'Gloved hands, touchscreen interfaces in clinical environments, and hurried interaction all require generous touch targets. WCAG 2.5.5 is a floor, not a ceiling, here.' },

{ id: 'id-4', priority: 'must',
  text: 'Error messages tell users what happened AND what to do next.',
  why: 'In a clinical context, an error message that just says "Something went wrong" is potentially dangerous. Staff need to know whether to retry, call IT, or escalate to a clinical supervisor.' },

{ id: 'id-5', priority: 'must',
  text: 'Critical status indicators (urgent, critical, normal) are never communicated by color alone.',
  why: 'Color blindness affects ~8% of males. In a high-stakes clinical environment, relying solely on red for "critical" creates patient safety risk.' },

{ id: 'id-6', priority: 'should',
  text: 'Design for frequent interruptions — users should be able to leave mid-task and return to their place.',
  why: 'Clinical staff are interrupted constantly. Multi-step flows without progress saving force them to start over, adding time and risk.' },

{ id: 'id-7', priority: 'should',
  text: 'Time-sensitive actions have visible countdowns or timestamps that match how clinical staff track time.',
  why: 'Medication timing, vital sign recording, and care escalation windows all have precise clinical time requirements. Vague timestamps like "2 hours ago" are insufficient.' },

{ id: 'id-8', priority: 'consider',
  text: 'Test your interaction patterns under simulated time pressure.',
  why: 'A flow that takes 90 seconds in a calm usability test can take 4 minutes under real clinical time pressure. Budget time adds up across a shift.' },
```

**Category 4: Accessibility Beyond WCAG (6 items)**

```typescript
{ id: 'ax-1', priority: 'must',
  text: 'All text meets WCAG AA contrast (4.5:1 for body, 3:1 for large text) at every viewport size.',
  why: 'Clinical environments range from bright exam rooms to dimly lit monitoring stations. The same contrast that passes in a test environment may fail in real conditions.' },

{ id: 'ax-2', priority: 'must',
  text: 'The product is fully operable by keyboard.',
  why: 'Many clinical environments use barcode scanners, external keyboards, or touchpads that don\'t provide standard mouse interaction. Keyboard operability is a workflow requirement, not just an accessibility one.' },

{ id: 'ax-3', priority: 'must',
  text: 'Clinical status is communicated through at least two distinct visual channels (color + icon, color + text label).',
  why: 'Color alone for urgency classification fails color-blind users and users in suboptimal screen conditions. This goes beyond WCAG 1.4.1.' },

{ id: 'ax-4', priority: 'should',
  text: 'Test readability in high ambient light — directly in sunlight or under bright overhead lighting.',
  why: 'Clinical monitors often sit in bright environments. Designs that are readable in a dark testing room may wash out in real conditions.' },

{ id: 'ax-5', priority: 'should',
  text: 'Font sizes for critical clinical data (lab values, medication dosages) are never below 14px.',
  why: 'Small font sizes for safety-critical numbers create transcription errors. Clinical decision support content especially requires generous sizing.' },

{ id: 'ax-6', priority: 'consider',
  text: 'Test the product with users who have common age-related vision changes (if the user population includes older clinicians or patients).',
  why: 'Presbyopia, reduced contrast sensitivity, and slower processing speed affect a significant portion of clinical staff. Standard accessibility testing doesn\'t always catch these.' },
```

**Category 5: Validation & Testing (6 items)**

```typescript
{ id: 'vt-1', priority: 'must',
  text: 'Usability testing includes both patient-facing and staff-facing participants (not just one group).',
  why: 'Products that serve both populations routinely under-test one of them. Testing only with staff produces designs that confuse patients, and vice versa.' },

{ id: 'vt-2', priority: 'must',
  text: 'You have a documented go-live testing plan before deployment.',
  why: 'Healthcare software failures have direct patient safety implications. A structured pre-launch testing plan is table stakes — not optional.' },

{ id: 'vt-3', priority: 'must',
  text: 'At least one round of usability testing has occurred in or near the actual use environment.',
  why: 'Lab-based usability testing in a quiet room systematically underestimates the cognitive load, interruptions, and environmental constraints of real clinical use.' },

{ id: 'vt-4', priority: 'should',
  text: 'Testing sessions include realistic clinical scenarios — not generic "complete this task" prompts.',
  why: 'Generic task prompts don\'t activate the clinical mental models that drive real-world behavior. A nurse needs to be "in the scenario" for their decisions to reflect what they\'d do on shift.' },

{ id: 'vt-5', priority: 'should',
  text: 'You\'ve observed at least one live clinical workflow (not a simulation) before finalizing major design decisions.',
  why: 'Contextual observation reveals safety-critical details that no amount of interviewing or simulated testing surfaces.' },

{ id: 'vt-6', priority: 'consider',
  text: 'Testing participants include clinicians at different experience levels (new vs. veteran staff).',
  why: 'Experienced clinical staff develop strong workflow habits that compensate for poor UX — and mask it in testing. New staff are often better proxies for how the design actually performs.' },
```

### State Management

```javascript
const STORAGE_KEY = 'healthcare-checklist-v1';

// Persisted state shape
{
  checked: string[],      // array of item IDs that are checked
  lastUpdated: number,    // timestamp
}
```

On load: restore checked state from localStorage. On each checkbox change: update localStorage.

### UI Features

**Progress bar per category:** `X of Y completed` shown under each category header. A full category collapses to a summary "✓ All 8 complete" state.

**Overall progress:** Sticky header bar showing total checked/total (e.g. "18 / 34 complete") + a thin progress bar.

**Filter controls:** Three buttons — `All` / `Must` / `Should` / `Consider`. Active filter highlighted with pink-200 accent. Filters items by priority level.

**Export button:** Generates a plaintext version of the checklist with `[x]` / `[ ]` markers for each item. Copies to clipboard (no download needed — designers can paste into Notion/Figma/Docs).

**Reset:** Small "Reset all" link in the footer of the checklist. Triggers a `window.confirm()` dialog — "This will clear all your progress. Are you sure?" — before clearing localStorage.

**Print styles:** `@media print` — hide Nav, Footer, filter controls, export button. Show all items unfiltered. Add a "Healthcare UX Checklist — emilybackes.design" footer to each page.

### `src/components/tools/HealthcareChecklist.astro`

Renders the full checklist structure statically (all items in the HTML — good for SEO and no-JS fallback), then hydrates with a `<script>`:

```html
<div id="healthcare-checklist" class="tool-shell">
  <div class="checklist-header">
    <div class="checklist-progress-bar" id="checklist-progress-bar"></div>
    <p class="checklist-progress-label" id="checklist-progress-label">0 of 34 complete</p>
    <div class="checklist-filters" role="group" aria-label="Filter by priority">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="must">Must</button>
      <button class="filter-btn" data-filter="should">Should</button>
      <button class="filter-btn" data-filter="consider">Consider</button>
    </div>
    <button id="checklist-export" class="btn-secondary">Copy checklist</button>
  </div>

  <!-- Rendered per category -->
  {CATEGORIES.map(cat => (
    <section class="checklist-category" data-category={cat.id}>
      <h2>{cat.icon} {cat.label}</h2>
      <p class="category-progress" id={`progress-${cat.id}`}>0 of {cat.items.length}</p>
      <ul class="checklist-items">
        {cat.items.map(item => (
          <li class="checklist-item" data-priority={item.priority} data-id={item.id}>
            <label>
              <input type="checkbox" class="checklist-checkbox" data-id={item.id} />
              <span class="item-text">{item.text}</span>
              <span class="priority-badge" data-priority={item.priority}>{item.priority}</span>
            </label>
            <details class="item-why">
              <summary>Why this matters</summary>
              <p>{item.why}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  ))}

  <footer class="checklist-footer">
    <button id="checklist-reset" class="btn-text-danger">Reset all progress</button>
  </footer>
</div>
```

---

## SEO — All Tool Pages

Each tool page includes:

```astro
---
// In the page frontmatter
const title = "[Tool Name] — Free Tool for Product Designers | Emily Backes";
const description = "[1–2 sentence description of what the tool does and who it's for]";
---
<PageLayout title={title} description={description} leanFonts={true}>
```

JSON-LD per tool page:

```json
{
  "@type": "SoftwareApplication",
  "name": "[Tool Name]",
  "applicationCategory": "ProductivityApplication",
  "description": "...",
  "url": "https://emilybackes.design/tools/[slug]",
  "isAccessibleForFree": true,
  "author": { "@id": "https://emilybackes.design/#person" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

---

## Shared Tool Page Layout

Each tool page follows the same structure. The `PageLayout` wrapper handles Nav + Footer.

```
[PageLayout]
  ├── Hero section
  │   ├── Tool title (Pridi h1)
  │   ├── 1-sentence description
  │   ├── Type badge + time estimate
  │   └── (intro text explaining the tool's value)
  ├── Tool component (interactive)
  └── CTA footer
      ├── "If this was useful, share it." [Copy link]
      └── "Want me to look at your portfolio? Say hi." [→ /contact]
```

---

## Build Order

Build in this sequence — each tool builds on patterns established by the previous one.

### Step 1 — Data layer
1. `src/data/tools/portfolio-quiz.ts` — all questions and scoring
2. `src/data/tools/ux-decision-tree.ts` — all nodes
3. `src/data/tools/healthcare-checklist.ts` — all checklist items

### Step 2 — Hub infrastructure
4. `src/components/tools/ToolCard.astro`
5. `src/pages/tools/index.astro`

### Step 3 — Healthcare UX Checklist (simplest build, no state machine)
6. `src/components/tools/HealthcareChecklist.astro`
7. `src/pages/tools/healthcare-ux-checklist.astro`

### Step 4 — Decision Tree (medium complexity, no localStorage)
8. `src/components/tools/UxDecisionTree.astro`
9. `src/pages/tools/is-this-a-ux-problem.astro`

### Step 5 — Portfolio Quiz (most complex — state machine + localStorage + results)
10. `src/components/tools/PortfolioQuiz.astro`
11. `src/pages/tools/portfolio-readiness.astro`

---

## Acceptance Criteria

**All tools:**
- [ ] Passes `npm run astro check` (no TypeScript errors)
- [ ] Works with JS disabled (readable, graceful fallback — no broken layout)
- [ ] Keyboard navigable (Tab through all controls, Enter/Space activate buttons and checkboxes)
- [ ] `aria-label` / `role` on all interactive controls
- [ ] `prefers-reduced-motion` respected (no animations if reduced-motion is set)
- [ ] Mobile-responsive at 375px, 768px, 1280px

**Portfolio Quiz:**
- [ ] Progress saved across page refresh (localStorage)
- [ ] "Retake" resets localStorage and returns to intro state
- [ ] Score displayed correctly for all 4 bands (test with all-0, all-3, and mixed answers)
- [ ] Correct weighted score calculation (case studies at 30%, senior signals at 25%)

**Decision Tree:**
- [ ] All 6 leaf nodes reachable
- [ ] Back button correctly restores previous state
- [ ] `?result=` URL param correctly loads the result node on page load
- [ ] Share button copies correct URL with param to clipboard
- [ ] "Start over" resets to intro state

**Healthcare Checklist:**
- [ ] All 34 items rendered and checkable
- [ ] Checked state persists across refresh
- [ ] Each of the 3 priority filter buttons correctly shows/hides items
- [ ] Export copies a clean plaintext checklist to clipboard
- [ ] Reset confirms before clearing, then fully clears all checked state
- [ ] Print styles render cleanly with no interactive chrome

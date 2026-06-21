# The three-tool design practice: how I run research, prototypes, and a 760-icon system without losing the thread

Most design tooling posts are aspirational. This one is just what actually happened over eight weeks.

I run my entire product design practice on three tools that most people use in isolation: Obsidian for thinking, Claude Code for building, and Figma for designing. They talk to each other, and that is the point. A user interview I file on Monday becomes a prototype decision on Wednesday and a Figma frame on Friday, and nothing falls through the cracks, because every step leaves a breadcrumb the next step can read.

Here is how it works, and where it broke.

## The problem: good work that nobody could find again

Before this setup, my design work lived in fragments. Research in one app, prototypes in another, design files in a third, and decisions nowhere at all. I would finish a strong week and lose the reasoning behind it by the next sprint. Eight parallel workstreams in a single week with no signal of what mattered most. High-craft execution kept displacing high-value strategy, because the craft was visible and the strategy was not.

The question I kept coming back to: how do I make my own reasoning as easy to navigate as my deliverables?

## Obsidian: the design database

I treat Obsidian as a queryable database. Every day gets a structured note with a machine-readable summary at the top, open threads tracked as checkboxes, and dense wikilinks to every PRD, prototype, and research file it touches.

That structure is what makes the other two tools useful. When I built the mobile onboarding prototype, the daily note linked the PRD, the Figma file ID, the prototype code path, and four user interview transcripts in one place. Six wikilinks, one click each.

I enforce one rule hard: PascalCase for every file and folder. Boring, and it paid for itself the day I cleaned up naming across the vault. Seven folders renamed, 43 files moved, 40 files updated to fix their links, all in one pass, because the convention was mechanical enough to automate. Consistency is a feature you only notice when it is missing.

The research lives here too. Eight user interviews across two rounds, each filed with full transcripts and a standardized synthesis matrix. That structure surfaced the pattern that reshaped the whole onboarding flow: every single user in round one skipped adding items so they could build their folder structure first. The flow order was backwards. I would not have seen it scanning notes one at a time. I saw it because nine themes sat side by side in one table.

## Claude Code: the build engine

Claude Code is where notes become things.

The onboarding research turned into a working prototype you could click through. Five web screens in Astro, React 19, and Tailwind. Then seven mobile screens in Expo with a real state store and clean TypeScript. When round two confirmed users wanted a conversational, structure-first flow, I rebuilt the entire mobile chat experience: three mock personas, 50 industry-matched items each across five subcategories, and a real CSV import path that parses your columns and auto-detects which one holds the item name.

The most useful thing Claude Code does is the unglamorous heavy lifting. The production icon library had 786 custom SVGs scattered across two source sections with 80 near-duplicates. I scripted the audit: pull every asset, split vector from raster, dedupe by base name, and rebuild the file into 23 semantic categories. Then a second pass grouped the icons into 35 variant clusters so I could answer one design-system question before componentizing: how many visual states does each icon concept actually need? You cannot design a component API by eyeballing 760 icons. You can design one by counting.

I also taught Claude Code my own voice. I built a brand-voice skill from three of my live case studies, then ran three evals against it. The baseline defaulted to a generic third-person template. The skill-driven version sounded like me: outcome-first, honest about iteration, no em-dashes. This blog post is written through that skill. The tool learned the rules so I would stop re-explaining them.

## Figma: where it gets real

Figma is the source of truth for anything a developer or stakeholder sees.

The handshake between Figma and the other two tools is the whole game. Day one of the onboarding project, I pulled the brand tokens out of Figma, saved them to a reference note in Obsidian, and built the prototype against those exact values. The red, the type, the step palette all matched because the token never got re-typed by hand. Re-typing is where drift starts.

The icon system is the clearest example of the loop closing. I built a developer handoff grid in Figma with 240 new icons converted to named components, each old icon paired with its replacement, rotations and all. Then I recolored 659 vectors to a single hex in one operation. I also defined the stroke system that holds it together: a 20px icon in a 24px container at 1.5px stroke, scaling on a clean one-sixteenth-of-container ratio so every size lands on a round number. I wrote that rule into the vault so the next person does not have to reverse-engineer it.

## What broke, and what I changed

The honest part. The setup did not arrive clean.

My open threads became a graveyard. Three stakeholder-blocking decisions sat in my notes for days, rolled forward passively, then quietly vanished without resolution. More discipline was never going to fix it; structure did. Blocking decisions now carry an explicit follow-up date instead of a hopeful checkbox.

I also kept starting tasks that hit untracked prerequisites. Identify the work, hit an external dependency, move on without scheduling the dependency. So I added intention-setting to the daily template, a single goal callout filled at the start of a session, surfaced automatically at the top of every Claude Code session by a hook. One sentence of intent beats eight tabs of momentum.

The build had real bugs too. A state-store selector caused an infinite render loop in two screens. A modal race condition killed the document picker until I added a 350ms delay. A vector-centering bug in Figma threw two icons off-center until I measured the rendered path instead of trusting the node bounds. None of these are interesting on their own. What matters is that each one is written down, so the next time I hit it, the fix is a search away.

And I have learned to reject the clever answer when it is wrong. When a teammate proposed having AI auto-create folders from imported item data, I pushed back with the actual failure mode: 40 hammers spread across five real locations would collapse into one "Hammers" folder. Folder structure is organizational intent, not item taxonomy. At 800 items, the clever feature is worse than the problem it solves.

## The takeaway

The tools are ordinary. The connection between them is everything. Obsidian holds the reasoning, Claude Code does the building, Figma owns the truth, and every artifact links back to the decision that made it. Start loose in notes and finish tight in Figma. Never type the same value twice.

# One ratio made 760 icons look like a set

I inherited 786 production icons that nobody could keep consistent. By the time I finished, the whole library answered to a single number: one-sixteenth.

That number is the stroke ratio. Every icon in the system now sets its line weight to one-sixteenth of its own size, and the moment I committed to it, six different sizes stopped looking like six different design decisions and started looking like one family. This is a post about that math, why it works, and the three places it almost broke.

## The problem: a library with no rules

The starting state was 786 custom SVGs spread across two source sections of one Figma file, with 80 near-duplicates hiding in the pile. Some icons were drawn at a 1px stroke, some at 2px, some at weights that had clearly been eyeballed. At 16px they looked spindly. At 64px they looked like wireframes. The same magnifying glass appeared three times with three different line weights depending on which screen it had been built for.

When a stroke weight is decided per icon, every icon becomes a negotiation. Multiply that by 760 and you get a library that reads as noise even when each individual icon is fine. The fix had to be a rule that scaled, so I went looking for the relationship between an icon's size and the stroke that makes it feel right.

## The ratio: stroke equals size over sixteen

The standard icon in the system is 24px with a 1.5px stroke. I started there because 24px is the default size across the product, and 1.5px is the weight that reads as crisp at that scale on a retina display.

From those two numbers, the ratio falls out cleanly. 1.5 divided by 24 is one-sixteenth. Once I had that, every other size could be derived instead of guessed:

| Icon size | Stroke | Where it lives |
|---|---|---|
| 12px | 0.75px | Tight, compact UI |
| 16px | 1.0px | Secondary contexts |
| 24px | 1.5px | Standard, used by default |
| 32px | 2.0px | Feature highlights |
| 64px | 4.0px | Hero and empty states |

Every stroke in that column is its size divided by sixteen. The beauty is in the right-hand math: 12 over 16 gives 0.75, 16 over 16 gives 1.0, 32 over 16 gives 2.0, 64 over 16 gives 4.0. Every value lands on a clean number a developer can type without a second decimal place. A ratio that produces ugly fractions gets ignored in practice, so the fact that one-sixteenth produces 0.75, 1.0, 1.5, 2.0, and 4.0 is the reason it survived contact with real implementation.

The ratio also scales the way the eye expects. A 64px icon carries four times the stroke of a 16px icon, and at four times the size that stroke holds the same visual weight. Consistency at one size buys you consistency at all of them.

## The geometry underneath the stroke

A stroke rule only works if the icons sit in a predictable box, so the second decision was about the grid.

Every 24px icon is drawn inside a 20px live area, which leaves a 2px margin on every side. That padding does quiet work. It keeps a wide icon and a tall icon from colliding with their neighbors, and it gives circular icons room to breathe against square ones. When I standardized the library, I scaled all 760 icons to that 20px internal dimension with their aspect ratios locked, so a 24px-wide arrow and a 24px-tall document both resolve to the same visual mass.

Locking the aspect ratio matters more than it sounds. I sorted the original 24px icons into three proportion groups: 83 were wider than they were tall, 59 were taller than wide, and 70 were square. Scaling each group to the same height would have crushed the wide ones and stretched the tall ones. Scaling to fit the 20px box while preserving proportion keeps every glyph honest to its own shape while still reading as part of the set.

## Where the math broke, and what I did

A clean rule meets a messy reality in exactly the places you least expect. Three of them cost me real time.

The 12px stroke renders inconsistently. At 0.75px, Figma and SVG export are both technically correct. On a 1x display and on Android, that fraction of a pixel renders unevenly, so the line shimmers or thins out. The rule holds in the file and breaks on the device. My guidance is to treat 0.75px as the math and 1px as the floor: when a 12px icon ships into a non-retina context, round the stroke up to 1px and accept the small inconsistency rather than the rendering glitch. The cleanest theory yields to what the screen actually draws.

The lock icon collapses at 1.5px. A handful of compound icons carry interior detail too fine for the standard stroke. The lock is the canonical example. Its inner shackle and keyhole sit close enough that a 1.5px stroke fills the gap and the whole thing reads as a gray blob at 24px. For those few icons, I allow a 2px stroke on the interior elements only, and only when the icon is genuinely illegible at the standard weight. The exception earns its place by failing a legibility check, so it stays rare and never becomes a style choice.

The centering bug came last. When I scaled vectors down to the 20px box in Figma, two icons drifted off center. Resizing a vector node scales its path but can leave an internal path offset behind, so the bounding box looks centered while the rendered glyph is not. The fix was to measure the actual rendered path center with the absolute bounding box, then shift the child coordinates to match. It hit two icons out of 760, which is exactly the kind of small wrong that survives a glance and fails a grid.

## The payoff: a system that scales without me

Once the ratio and the grid were locked, the rest of the library became mechanical. I organized the 760 deduplicated icons into 23 semantic categories, clustered them into 35 variant groups to see how many real states each concept needed, and converted 240 of them into named components. Recoloring 659 vectors to a single hex took one operation, because every icon already shared the same structure.

A few rules ride on top of the math. Icons default to unfilled, and a filled variant keeps its stroke at the 700 color while filling the shape with the 500 of the same swatch, so light and dark versions stay related. Custom icons always start from the open-source base library rather than a blank canvas, which keeps a one-off addition on the same visual grid as everything around it. Gated features get a filled star in the upper-right corner of the container. Each of these is small. Together they mean a new icon arrives already consistent.

The deeper lesson is about where consistency comes from. A style guide that lists approved icons goes stale the day someone needs an icon it doesn't list. A ratio that derives the right answer from the size handles the icon you haven't drawn yet. Encode the relationship and the library maintains itself.

760 icons, six sizes, one number. The math did the work I used to do by hand.

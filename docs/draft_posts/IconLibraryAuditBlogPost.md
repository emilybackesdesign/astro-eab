# How I turned 786 scattered icons into 240 components

I opened the production icon file and found 786 icons with no index, no naming system, and 80 duplicates hiding in plain sight. Eight weeks later it was 240 named components sorted into 23 categories. Here is the audit that got me there.

## The starting state: a library nobody could see all of

The library had grown one screen at a time for years, which is how every real icon set grows. By the time I inherited it, the icons lived in two separate sections of one Figma file. A section labeled "Public" held 478 assets. A second section called "SRC Icons" held another 355. That is 833 on paper, and the first thing I learned is that the paper was wrong.

When I cross-referenced the file against the codebase, the counts disagreed in three directions at once. The repo exported 786 icons through one pipeline and another 367 as inline variants. Figma claimed 833. None of those numbers matched, and that disagreement was the whole problem in miniature. A library that three sources count three different ways is a library where every designer is guessing.

The guiding question I started with: what is actually in here, and which copy is the real one?

## First, make Figma agree with production

I treated the codebase as the source of truth, because the codebase is what users see. I pulled the full list of icons shipping in the product and checked each one against the file. Only 4 icons existed in code with no Figma equivalent. I sourced those from the repo, imported them as vector frames, and from that point the design file and the running product held the same inventory. Every later decision could trust the file.

## Then kill the duplicates

With both sections in one place, I merged them and matched icons by base name. 80 of them were duplicates, the same concept drawn twice because two designers on two screens each needed a magnifying glass and neither knew the other existed. I pulled all 80 into a dedicated "Duplicates" section so the decision about which copy survives stayed visible and reversible. The library dropped from 833 to 760 real, distinct icons.

Deduping first is what made everything after it cheap. Every hour spent organizing a duplicate is an hour you spend again on its twin.

## Sort by what they are

Before sorting by meaning, I sorted by type, because a raster image and a vector icon need completely different handling. I built an "Icons by Type" section that split the library into a vector group and a rasterized-image group. The split was scriptable: I matched on node type, sent the rectangle-backed raster assets one way and the true vectors the other, then sorted each group by pixel area so outliers surfaced at the edges. Anything wildly larger or smaller than its neighbors was usually a mistake worth catching.

## Organize by meaning

This is the step that makes a library usable. I built a categorized section, 18,000 pixels wide, that grouped all 760 icons into 23 semantic categories with live counts. Arrows and Navigation came in at 59. Files and Documents at 38. Sort, Filter, and View at 36. Check and Selection at 36. Alerts and Notifications at 34. Edit and Actions at 32. The long tail ran through Folders, Barcodes, Billing, Reports, Inventory, People, and a deliberate Other bucket for the genuine one-offs.

Categorizing by meaning is what lets a designer find the upload icon by thinking "upload," instead of scrolling a wall of glyphs hoping to recognize one. A semantic map turns a pile into a vocabulary.

## Audit the variants before building anything

The most important step looks like the least productive one. Before I componentized a single icon, I reorganized the whole library into 35 variant groups so I could answer one question per concept: how many real visual states does this icon need?

That question decides the component API. Folders turned out to need 18 distinct variants. Items and Inventory needed 18. Integrations needed 17. Knowing those counts up front meant I could design a folder component that actually accepts 18 states, rather than building a tidy three-state component and discovering on the fifteenth screen that it cannot represent what the product requires. Counting the states before writing the component is the difference between a system that holds and a system you rebuild in six months.

## Componentize and hand off

With the variant map settled, the build became mechanical. I converted 240 icons into named components, each one slotted into its semantic category. Then I built the artifact the developers actually needed: a swap reference grid with three columns, the icon name, the current production version on a dark background at 20 by 20, and the new component on white at 24 by 24. I split 18 dense sections into individual swap rows by their vertical position so every old-to-new mapping sat on its own line, documented the handful of icons that needed a rotation, and marked the ones to leave exactly as they were.

A handoff grid that pairs every old icon with its replacement removes the single most expensive question in a migration, which is "wait, which new icon replaces this old one?" Answer it once in the file and you answer it for every engineer who touches the swap.

## What slowed me down

The honest part. My first instinct was to import all 786 SVGs programmatically and skip the manual work entirely. That broke. Pulling hundreds of SVGs into Figma through the API produced unreliable, sometimes malformed results, so I stopped fighting it and used a Figma plugin to land the raw assets first, then scripted the organization on top of clean inputs. The lesson stuck: automate the step that is actually reliable, and do the flaky step by hand once.

Two icons also drifted off center when I rescaled them, because resizing a vector in Figma can leave the path offset inside its frame even when the bounding box looks correct. I caught both by measuring the rendered path against its container, a small wrong that survives a glance and fails a grid.

## The payoff

760 deduplicated icons, 23 categories, 35 variant groups, 240 components, and one file that the code, the design team, and the handoff all agree on. The audit took weeks of unglamorous counting, and the counting is exactly what made the system trustworthy.

An undocumented library is a library you rebuild every sprint. Count it once, name it once, and it starts working for you instead of against you.

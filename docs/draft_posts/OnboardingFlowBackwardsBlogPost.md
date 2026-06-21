# The onboarding flow was backwards, and eight interviews proved it

I built an onboarding flow that asked new users to add their first items right away. Eight user interviews later, I had to admit the order was wrong. Every single person did the opposite of what the flow wanted.

## The flow I shipped, and the assumption underneath it

The product is an inventory app, and the onboarding wizard walked a new user through a clean sequence: pick your category, look at a starter template, add a few items, done. It tested fine in the room. The logic felt obvious. You came here to track inventory, so let us get an item into the system fast and show you the payoff.

That logic carried one assumption I never examined: that people think in items first. I designed five screens around it before a single real user touched the flow.

The question I should have asked earlier: when someone opens an empty inventory app for the first time, what do they actually reach for?

## What the interviews showed

I ran 8 interviews across two rounds, four people each, sessions running 19 to 33 minutes. Round one was four users new to the product. Round two was four more, weeks later, to see whether the first patterns held. I filed every transcript in a structured note and synthesized round one into a results matrix that tracked 9 themes across all four participants in a single table.

The table is what made the pattern impossible to miss. Read one interview and you see one person's quirk. Line up four interviews as columns against nine themes as rows, and the strong signals light up across the whole row at once.

One row lit up completely. Every user skipped adding items during onboarding so they could build their folder structure first. All four. They wanted to recreate the shape of their real world, the warehouses, the vans, the job sites, before they put anything inside it. The flow asked for items. The humans reached for structure.

Tydreeona made the cost concrete. She wanted to create a subfolder, the mechanic for it was not discoverable, and she stayed blocked for her entire setup session. The flow was not slow for her. It was a wall, and she hit it at the exact step my design assumed would be the easy one.

## Why the order mattered so much

Structure-first is not a preference. It is how people reason about inventory. A folder is a decision about how the world is organized, and an item is a thing that lives inside that decision. Asking someone to add items before they have built their structure forces them to either dump everything into a default bucket and reorganize later, or stall at the empty screen trying to hold the whole hierarchy in their head.

Both of those are bad, and both are avoidable by flipping the sequence. When the flow lets a person build their folders first, every item they add after that has an obvious home. The structure becomes the scaffold the rest of onboarding climbs.

## Rebuilding the flow around the finding

I rebuilt the mobile onboarding experience to lead with structure and conversation. Instead of a rigid five-screen march, the new flow opens by asking what kind of work you do, then walks you through shaping your space before it ever asks for an item.

To make that feel real in the prototype, I built three mock personas, each with a distinct trade and a believable inventory: 50 items apiece, spread across five subcategories that matched their industry. A construction persona, an IT-equipment persona, an automotive persona, picked at random on launch so the flow felt populated and specific rather than abstract. A person setting up an automotive inventory sees automotive categories, which makes the structure-first step feel like recognition instead of homework.

The conversational framing did a second job. It surfaced the folder-building mechanic that had blocked Tydreeona, by making "let us set up your spaces" an explicit, spoken step rather than a button someone had to discover.

## What round two added

Round two mattered because a pattern from four people is a hypothesis, and a pattern from eight is a finding. The structure-first behavior held across the second group, and the interviews surfaced adjacent friction that pointed the same direction. People wanted to shape their world before they filled it, and the product kept asking them to fill it first.

The second round also taught me to standardize the research itself. I built a reusable interview template and a results-matrix template so every future session lands in the same structure. Consistent capture is what let me compare round two against round one in an afternoon instead of a week. The synthesis method became as reusable as the findings.

## What I would do differently

With more time, I would have run the first four interviews before I designed the five screens, not after. The structure-first insight was available the moment I talked to real users, and I spent a build cycle encoding an assumption I could have tested in a week of conversations. The research did not contradict a small detail of the flow. It inverted the spine of it.

I also rolled a few stakeholder-blocking decisions forward in my notes for days without resolving them, which is its own quiet way of letting a finding go stale. A research insight has a short shelf life if nobody schedules the decision it demands.

## The takeaway

Eight interviews, nine themes, one row that lit up across every column. The flow I shipped was confident and well-built, and it pointed users in the wrong direction because I designed the sequence before I understood the reasoning.

People build the container before they fill it. The onboarding I trusted asked them to do it backwards, and the only reason I know that is that I sat down and listened to eight of them in a row. Talk to users before you commit the spine of a flow, because the spine is the most expensive thing to bend later.

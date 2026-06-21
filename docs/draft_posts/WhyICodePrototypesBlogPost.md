# Why I code my prototypes instead of faking them

I build my prototypes as real, running apps. They parse real files, hold real state, and break in real ways. Building one by hand used to be slow enough that it stayed an engineer's job, and AI changed that. For the kind of questions I most need to answer, a running prototype is the only thing that actually tests the design, and Claude is what makes it a path a designer can take.

## The limit of a clickable mockup

A linked-screen prototype is wonderful for what it does. You can walk a stakeholder through a happy path, demo a flow in a meeting, and validate that the screens hang together in the right order. For a lot of design questions, that is enough, and I reach for it often.

It runs out of road the moment the design question is about behavior instead of appearance. A click-through cannot tell you what happens when a user uploads a messy spreadsheet, because the spreadsheet is fake and the upload is a hotspot pretending to advance to the next frame. It cannot tell you whether a multi-step flow holds its state when someone backs up and changes an answer, because there is no state, only a sequence of images. The questions I most need answered are exactly the ones a faked prototype is built to skip.

So when the design lives in the interaction, I build the interaction for real.

## What "real" actually meant here

For an onboarding project, I built two working prototypes. The web version ran on a genuine front-end stack with five fully interactive screens, both onboarding paths, and eight industry configurations that each changed the flow, the card labels, and the placeholder content. The mobile version ran as an actual mobile app with seven screens, a real state store, and a clean typed codebase. These were not mockups dressed up to look interactive. They were small applications that behaved like the product.

The payoff showed up in the part that no static prototype can reach: the data. I wired the mobile flow to parse a real spreadsheet on import. Pick an actual CSV off your device, and the prototype reads the columns, auto-detects which one holds the item name and which holds the quantity, and routes you to a validation screen. To test it honestly, I fed it a 516-row inventory file full of the mess real data carries, blank name fields, quantities written as both whole numbers and decimals, costs with and without a currency symbol, dates in three different formats. The prototype had to actually handle all of it, which meant the design had to actually have an answer for all of it.

That is the difference. A click-through lets you assume the data is clean. A running prototype makes you confront the data you will really get.

## The bugs were the point

Building the prototype for real surfaced problems that a mockup would have hidden until production, and finding them early was worth the whole effort.

The mobile state store caused an infinite render loop on two screens, because I had reached for the wrong shape of selector. A clickable prototype never would have flagged it, since it has no state to loop over. I caught it in an afternoon instead of in a developer's lap a month later. A document picker failed intermittently on import until I traced it to a timing collision with a closing menu, and the fix was a brief delay so one animation finished before the next began. A build dependency was quietly missing and a config option sat in the wrong section entirely. Every one of these was a real interaction bug, and every one of them is a question the design has to answer before the engineers inherit it.

When the prototype breaks, the design has a gap, and I would rather find the gap while it is still cheap to close. A bug in a running prototype is a free preview of a bug in production.

## The cost, and what changed it

Coding a prototype by hand is slow, and I will not pretend otherwise. It takes a real stack, real setup, and the patience to debug things that have nothing to do with the design question while you are trying to get to the design question. For most of design's history, that cost is what kept coded prototypes locked inside engineering, out of reach for a designer who wanted a working version of an idea by the end of the week.

The way the prototype gets built is what changed. I build these with Claude, describing the flow, the data, and the behavior I want, then reading back working code and steering it. The 516-row CSV parser, the state store, the validation screen: I made the design decisions and Claude wrote most of the code that runs them. The hours that used to disappear into syntax and setup now go into the design itself, and a coded prototype became something I can stand up in a day where it once took a sprint.

That shift is what makes this a viable path for designers and not only engineers. The slow part was always the typing, and the typing is the part AI is best at. A designer who can describe an interaction precisely can now hold a running version of it the same afternoon, where a few years ago the same idea meant filing a ticket and waiting on someone else's queue.

The calculus is simple once the cost drops. When the design question is about behavior, data, or state, the time I spend making it real goes straight into the thing I am trying to learn, and the prototype answers by either working or breaking. That is a far more honest verdict than "the screens looked right in the demo." For a flow where the only open question is screen order or visual hierarchy, a clickable mockup is still the right tool, because there is no behavior to test.

## How it fits the rest of the process

This is not an argument to start in code. I start loose, with sketches and low-fidelity exploration, because early ideas should be cheap to throw away. The coded prototype comes later, once I know roughly what the flow is and the open questions have become questions about how it behaves. Start loose, finish tight. The running app is the finishing-tight stage, the place where a design stops being a picture of a product and starts being a thing that runs.

It also feeds the work that comes after. A coded prototype is already most of the way to a real implementation conversation, and the styleguide and component decisions I make inside it carry forward instead of getting redrawn.

## What I would do differently

With more time, I would build the messy-data test file at the very start of the prototype, not partway through. I discovered the most useful bugs the moment the prototype met realistic data, and every day I tested against clean data first was a day I delayed the findings that mattered most.

## The takeaway

I code my prototypes because the questions I care about most live in behavior, data, and state, and those are the questions a clickable mockup is designed to avoid. A 516-row messy spreadsheet and an infinite render loop taught me more about a design than any linked-frame walkthrough could. The reason I can do this at all as a designer is that Claude absorbs the slow, syntax-heavy part and leaves me the design decisions.

Use the cheap prototype when the question is about how it looks. Build the real one when the question is about how it works. Building the real one used to mean waiting on an engineer, and now it means describing the idea clearly enough for AI to run it. The prototype that can break is the only one that can tell you the truth, and it is finally cheap enough for a designer to build.

# Every user had a feature they never found

I interviewed eight people about an inventory product, and every one of them was blocked by a problem the product had already solved. The feature existed. They just never found it. That is the most expensive kind of bug, because it never shows up in a crash log.

## The pattern that repeated eight times

Across two rounds of interviews, four users each, one finding held for all eight: every person had at least one major capability they needed, that shipped in the product, that they never discovered. The work was done. The engineering existed. The value sat one screen away from someone who would have paid for exactly that, and they walked right past it.

This is the quietest failure mode in software. A missing feature generates a feature request you can see. A hidden feature generates silence, a workaround, and eventually a churn you cannot explain. The user never tells you "I couldn't find the thing," because from inside their experience the thing was never there.

## Three people, three invisible features

Tyler wanted to create a subfolder. The product creates subfolders. The mechanic for it was buried where she never thought to look, and she stayed blocked for her entire setup session. She did not lack a feature. She lacked a path to a feature she already had.

Eric got blocked during the first week of a real job. The movement-tracking tools he needed, the pick lists and the return-to-origin flow, were live in the product the whole time. They stayed invisible at the precise moment he needed them, which is the only moment that counts. A feature that hides when the user reaches for it might as well not ship.

Ian opened the app every day with the same intent: log in, drill into his crew's folder, check the quantities. The product greeted him with a restocking feed instead, which was useful to someone, just not to him at that moment. His core daily workflow started two taps deep, behind a screen built for a different job.

## Why discoverability breaks even when design is good

None of these were ugly screens or broken features. Each capability was designed with care in isolation. The discoverability failed in the seams between features, and the seams are where products quietly fall apart.

A feature gets designed for the person who already knows it exists. The subfolder action makes perfect sense once you know subfolders are a concept. The pick list is obvious once you know to look for movement tools. The restocking feed is the right home screen for the user whose job is restocking. Every one of these decisions is locally correct and globally invisible to the newcomer who does not yet share the team's mental model of where things live.

The trap is that the people building the product can find everything, so the product feels complete from the inside. Discoverability is the one quality you cannot evaluate from your own desk, because you already know where the bodies are buried.

## The fix is surfacing, not adding

The instinct when users miss a feature is to add something: a tooltip, a tour, a banner. Tours mostly teach people to dismiss tours. The durable fix is to surface the right capability at the moment of need, inside the flow where the need appears.

Eric needed movement tools the week he started moving inventory, so the place to reveal them is the screen he lands on when a job begins, not a help article he would have to go looking for. Tydreeona needed subfolders while she was building her structure, so the create-subfolder action belongs visibly in the structure-building step, spoken aloud by the flow rather than hidden behind an icon. Ian needed his crew folder every morning, so the entry point should respect that his daily intent differs from the restocking user's, and meet him where he actually starts.

Surfacing means the product reads what the user is trying to do right now and offers the matching tool right there. A feature shown at the moment of need feels like the product is smart. The same feature buried in a menu feels like the product is missing it.

## How I found the pattern at all

I would not have seen this from analytics alone, because the signal of a hidden feature is an absence, and absences do not log events. I saw it because I watched eight people try to do real work and narrate where they got stuck. The subfolder wall, the invisible pick list, the wrong home screen all came out of people describing their own confusion in their own words.

I synthesized the interviews into a matrix that lined up themes across every participant, and discoverability stretched across the entire row. A problem that shows up once is a quirk. A problem that shows up in all eight columns is a structural truth about the product.

## What I would do differently

With more time, I would build a discoverability check into the design process itself, watching a brand-new user attempt each core task cold, before the feature ships, not months later in research. The cost of the hidden feature compounds the longer it stays hidden, because every user who churns over it churns silently and takes the explanation with them.

## The takeaway

Eight users, eight features they already owned and never found. The product was more capable than any of them realized, and that gap did more damage than a genuine missing feature ever could, because nobody filed a complaint about it.

Build the feature, then fight just as hard for the moment it appears. A capability the user cannot find at the moment they need it is a capability you paid to build and chose to hide.

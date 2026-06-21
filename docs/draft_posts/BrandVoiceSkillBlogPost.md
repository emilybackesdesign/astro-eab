# I taught an AI to write in my voice, and tested whether it worked

I write my own case studies, and I write them in a specific way. So I spent an afternoon encoding that way into a reusable instruction set for an AI, then ran three blind tests to see whether the output actually sounded like me. It did. Here is how I built it and how I checked.

## The problem with letting AI write your portfolio

Ask a general-purpose model to write a case study and you get a competent, generic artifact. Third-person bio voice. A "Key Takeaways" section nobody asked for. Outcomes phrased as "improved efficiency" instead of a real number. It reads like every other case study on the internet, which is the one thing a portfolio cannot afford to do.

My writing has rules, even the parts that feel like instinct. I lead with a quantified outcome. I state the problem in the user's own words before I talk about design. I write in the first person, always, because the work is mine and the page should sound like me saying so. I show the versions that failed before the one that worked. I end with an honest retrospective. I never use em dashes. The voice is consistent because the rules are consistent, and rules are exactly the kind of thing you can write down.

So I wrote them down, in a form an AI could follow every time.

## Building the skill from real evidence

I did not invent the rules from memory. I reverse-engineered them from three of my own case studies, the ones I already trusted, and looked for what they had in common.

The patterns were clear once I went looking. Every strong case study opened with a metric, not context. Every one named the specific person affected and described them in their actual pain state rather than as an abstract persona. Every one walked through the failed iterations on the way to the solution, because the failures are what make the success believable. Every one closed with a clear-eyed note on what I would do differently. The voice stayed warm and direct, cut the filler phrases, and let the numbers do the boasting so I did not have to.

I encoded all of it into a structured instruction set: a voice summary, a tone guide, sentence-rhythm rules, the case-study arc in order, a table of reusable sentence patterns, and an explicit do-and-don't list. The don't column mattered as much as the do. No vague wins, no generic "the client," no hedging, no em dashes. A voice is defined as much by what it refuses as by what it reaches for.

## Testing it like a feature, not a vibe

A writing tool is easy to fool yourself about. You read the output, it sounds fine, you call it done. So I treated the skill like any other feature and ran a small eval instead of trusting my gut.

I picked three different writing tasks that stretched the skill in different directions: a fresh case study about a checkout redesign, a short professional bio, and a description of a dashboard project. For each one I generated two versions, a baseline with no voice instructions and a version run through the skill, and compared them side by side.

The gap was obvious and consistent. The baseline bio defaulted to third person, describing me as if a stranger were summarizing my résumé. The skill version spoke in first person and led with the work. The baseline case study reached for the generic template, complete with a tidy takeaways section. The skill version opened on a metric, ran the failed iterations before the fix, and landed on a retrospective. Across all three tasks, the skill output read like me and the baseline read like the internet's idea of a designer.

Running the comparison is what turned "I think this works" into "I watched this work three times." A writing tool you have not tested against a baseline is a vibe, and a vibe is not something you can rely on at two in the morning before a portfolio deadline.

## Why this is a design problem, not a writing trick

It would be easy to file this under productivity hacks, and I think that undersells it. Encoding your voice is a design systems problem wearing a different outfit.

A design system captures the decisions a team would otherwise relitigate on every screen, so that consistency becomes the default and creative energy goes to the genuinely new problem. A voice skill does the same thing for writing. The decisions I would otherwise remake on every case study, how to open, when to admit failure, which words to cut, now live in one place and apply themselves. I get to spend my attention on the part that is actually hard, which is having something true to say about the work, while the structure takes care of itself.

The deeper payoff is that the rules became legible to me, too. Writing them down for the machine forced me to articulate things I had only ever done by feel. I now know why my case studies open on a number, and being able to name the rule makes me better at breaking it on purpose when a piece needs something different.

## What I would do differently

With more time, I would expand the eval set beyond three tasks and include adversarial cases, the kinds of writing where my own rules conflict, like a piece that needs warmth but has no clean metric to lead with. Three tests proved the skill works on the easy and medium cases. The hard cases are where I would actually learn its limits, and I stopped before I found them.

## The takeaway

I turned my writing instincts into an explicit instruction set, built it from three case studies I already trusted, and ran three blind comparisons that showed it reproducing my voice instead of the generic default. The skill writes the structure so I can spend my judgment on the substance.

A voice is a set of decisions, and decisions can be encoded. Write yours down once, test them like a feature, and you stop re-deciding who you sound like every time you open a blank page.

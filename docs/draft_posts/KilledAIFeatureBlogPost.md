# I killed an AI feature on purpose

A teammate proposed an AI feature that would have demoed beautifully. I argued against shipping it, and the argument came down to a single example: 40 hammers. Here is why the smartest version of a feature was the wrong one, and what I built instead.

## The proposal

The product lets people import their inventory from a spreadsheet. The idea on the table was to have AI read the imported items and automatically create a folder structure for them. Upload a thousand rows, and the system would group everything into folders on its own, no manual setup required. It is the kind of feature that lands instantly in a demo. Watch chaos become order while the user does nothing.

I understood the appeal, and I still pushed to cut it. The reason has to do with what a folder actually represents.

## The 40 hammers

Here is the example I kept coming back to. Imagine a company with 40 hammers. An AI grouping items by what they are would see 40 hammers and create one folder called Hammers. Tidy, obvious, and wrong.

In the real business, those 40 hammers are scattered across the places work happens. Some live in a Boston warehouse under hand tools. Some ride in a service van under equipment. Some sit in a Buffalo warehouse under maintenance. The hammer is the same object in all three places, and the location is the entire point. A field technician does not ask "where are all the hammers." They ask "what is in my van right now." Collapsing those three locations into one Hammers folder destroys the exact information the inventory exists to track.

A folder structure encodes organizational intent, the shape of how a business runs. The item taxonomy, what each thing is, runs perpendicular to that. An AI sorting by item type reads the wrong axis, confidently, and the more items it sorts the more wrong it gets. At 800 items, the failure mode is a structure so misaligned with reality that fixing it costs more than the manual setup would have in the first place. The feature that saves you ten minutes on day one costs you a day of untangling in month two.

## The principle the example revealed

The example crystallized a rule I now apply to any AI feature: let AI assist a judgment the user owns, and keep it away from judgments only the user can make.

What each item is, that is a question with a knowable answer, and AI is good at it. Where each item belongs, that is a question about how this specific business is organized, and only the people running it hold the answer. Folder structure sits squarely in the second category. Handing it to AI feels like automation and behaves like a guess dressed up as a decision.

The version that demos best optimizes for the magic moment. The version that earns trust optimizes for the moment two months later when the user has 800 items and needs the structure to still be true. I will trade a worse demo for a structure that holds every time.

## What I built instead

Cutting the auto-folder feature did not mean abandoning the problem. People importing a spreadsheet genuinely need help getting items into the right folders. So I designed for assistance with the human keeping the wheel.

On the upload screen, I added a path to import items into multiple folders, with a column picker after upload that lets the user point at the spreadsheet column that already encodes their structure. The information is almost always sitting right there in their data. Their job is to tell the system which column means "location," and the system's job is to respect that choice rather than invent its own.

The preview then shows a folder column with a status on every row: green where the folder already exists, amber where importing will create a new one. The user sees exactly what their import will do to their structure before it happens, row by row. The system does the tedious matching. The person keeps the decision about what their organization looks like, and nothing gets created behind their back.

## The same principle, applied again

I made the matching call a second time in the same flow, on the feature that fixes data errors with AI. The earlier version presented AI's corrected values as a done deal and asked the user to apply them in bulk. I rebuilt it so every suggested value is an editable input the user can accept, change, or override, with the original value shown as plain reference text beside it. I also added a row-level option to leave a row as an error on purpose, because sometimes the messy value is the correct one and the human is the only one who knows that.

The pattern is consistent across both decisions. AI proposes, surfaces, and does the grunt work. The human confirms, edits, and owns the outcome. The CTA even changed from "apply the fixes" to "save changes," so the button respects that the user might accept some suggestions, rewrite others, and reject the rest.

## What I would do differently

With more time, I would have brought the 40-hammers example to the very first conversation about the feature, before anyone got attached to the auto-folder demo. A concrete failure case kills a bad idea faster than any abstract principle, and I reached for it a meeting later than I should have.

## The takeaway

I cut an AI feature that would have impressed everyone in the room, because it answered the wrong question with total confidence. Folder structure is a decision about how a business runs, and 40 hammers in one folder is what happens when a machine makes that decision for you.

Let AI carry the tedious work and surface what it sees. Keep the judgments that encode human intent in human hands. The best feature I shipped that quarter is the one I talked everyone out of building.

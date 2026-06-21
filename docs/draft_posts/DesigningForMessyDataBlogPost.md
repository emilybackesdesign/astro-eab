# Designing for messy data

Most import flows are designed for a spreadsheet that does not exist: clean headers, consistent formats, every field filled in. Real data arrives broken in a dozen small ways, and the design that pretends otherwise hands the user a wall of errors and walks away. I built the version that meets the mess where it lives.

## The spreadsheet you actually get

To design the import flow honestly, I needed data that looked like what people really upload, so I built a test file with the texture of the real thing. A 516-row inventory spread across 18 product categories, and deliberately messy in the ways real exports always are.

Around six rows had a blank item name, because someone left a cell empty and never noticed. Quantities came in as whole numbers on some rows and decimals on others. Costs showed up with a currency symbol on some rows and bare numbers on the rest. Dates arrived in three different formats in the same column, slash-separated, dash-separated, and written out in words. None of this is exotic. This is what a spreadsheet looks like after three people have edited it across two years, and it is exactly the input the import flow has to survive.

Designing against clean sample data would have produced a flow that demos well and collapses on contact with a real customer's file. So I designed against the mess on purpose.

## The wall-of-errors trap

The default way to handle a messy import is to validate the file, count the problems, and present the user with a list of everything wrong. It feels responsible. It is also a wall, and the user hits it at the worst possible moment, right after they committed to importing and right before they get any value.

A list of 40 errors with no clear way through it does two things, both bad. It makes the user feel punished for data they may not have created, and it gives them no obvious path other than to abandon the import and go fix the spreadsheet by hand, which is the workflow they came here to escape. An import flow that bounces the messy file back to the user has failed at its one job.

The design goal became letting people fix, skip, and override their way through the mess inside the product, without leaving and without being made to feel like the problem is theirs.

## Make every correction editable

The flow includes an option to fix data errors with AI, and the first version of it presented the corrected values as a finished result the user applied in bulk. That is the wall again, just a politer one, because it assumes the machine's correction is always right and the user's job is to rubber-stamp it.

I rebuilt it so every suggested value is an editable input. The user can accept a suggestion, change it, or type something else entirely, and the original value sits beside it as plain reference text so they always know what the data said before anyone touched it. The validation runs on what they end up with, not on whether they accepted the suggestion as-is. The system offers its best guess and the human keeps the pen.

I also added a row-level option to leave a row as an error on purpose. Sometimes the value that looks wrong is actually correct, and the only one who knows that is the person who owns the data. Forcing every flagged row to be fixed before importing assumes the validator is smarter than the user about the user's own inventory, which it is not. A respectful import lets a person say "this one is fine, import it anyway" and move on.

Because the user can now accept some fixes, edit others, and deliberately skip the rest, the button that finishes the step changed from "apply the fixes" to "save changes." The label had to describe what the user actually did, which is rarely a clean bulk-apply and usually a mix of all three.

## Show consequences before they happen

The other half of designing for messy data is making the outcome visible before the user commits to it, so importing never feels like a leap into the dark.

When the flow imports items into folders, the preview shows a status on every row: green where the folder already exists, amber where the import will create a new one. A person scanning that preview can see, row by row, exactly what their import is about to do to their structure. The amber rows are a quiet warning that says "you are about to create twelve new folders, did you mean to," delivered before the damage rather than after.

That preview turns the import from a gamble into a decision. The user sees the consequence, adjusts the input if the consequence is wrong, and commits only when the preview matches their intent. Showing the result before the action is what lets someone trust a bulk operation over hundreds of rows.

## The header, and getting out of the way

Even the small layout choices bent toward the messy reality. The error drawer started as a single dense line cramming the row name, the error, and the controls together, and it read as clutter at exactly the moment the user needed clarity. I split it into two lines, the row name and its expander on top, the error state and the leave-as-error option below. A person fixing a hundred rows is doing repetitive, attention-heavy work, and the layout had to lower the cognitive load of each repetition rather than add to it.

## What I would do differently

With more time, I would build the messy test file before designing any of the screens, not partway through. The most useful design decisions, editable suggestions, row-level skipping, the consequence preview, all came directly from staring at real broken data and asking what a person would need to get through it. Every hour I spent designing against tidy sample rows was an hour designing for a file no customer will ever upload.

## The takeaway

Real data is messy, and the import flow is where that mess meets your product first. The design that assumes a clean spreadsheet greets paying customers with a wall of errors and a trip back to the spreadsheet they were trying to leave.

Let people fix, edit, skip, and override, and show them the consequences before they commit. Design for the spreadsheet you actually get, because that is the only one anyone is going to upload.

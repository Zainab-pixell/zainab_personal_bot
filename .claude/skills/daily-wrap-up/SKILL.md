---
name: daily-wrap-up
description: >-
  Read today's notes and write a short dated done/doing/next summary into the
  log/ directory. Use when the user asks to wrap up the day, close out today,
  or wants an end-of-day / daily summary.
---

# Daily Wrap-Up

## When to use

- The user asks to "wrap up the day", "do my daily wrap-up", "summarize
  today", or makes an equivalent end-of-day request.
- Normally run once per day, near the end of a work session.

## Steps

1. Determine today's date in Asia/Karachi, format `YYYY-MM-DD` (same
   convention used elsewhere in this project).
2. Find today's notes, in this order:
   - `notes/<date>.md`
   - a `## <date>` section inside `notes/NOTES.md`
   - If neither exists, ask the user where today's notes live — don't
     invent content.
3. Read the notes and sort their content into three buckets, one short
   line each (no more than ~15 words, no filler):
   - **Done** — finished today
   - **Doing** — in progress / partially done
   - **Next** — planned for the next session
   Omit a bucket entirely if nothing fits it.
4. Write the summary to `log/<date>.md` using the template below.
   Create `log/` if it doesn't exist yet. If `log/<date>.md` already
   exists, overwrite it — the wrap-up reflects the current state of
   today's notes, not a running history.
5. Tell the user in 1-2 sentences what was written and where.

## Template

```markdown
# Daily Wrap-Up — <date>

## Done
- ...

## Doing
- ...

## Next
- ...
```

## Example

Input `notes/2026-07-06.md`:

```
- Finished FBISE bot Drive delivery switch, tested end to end
- Started drafting daily-wrap-up skill
- Need to review grade 9-10 science activity format tomorrow
```

Output `log/2026-07-06.md`:

```markdown
# Daily Wrap-Up — 2026-07-06

## Done
- Finished FBISE bot Drive delivery switch, tested end to end

## Doing
- Drafting daily-wrap-up skill

## Next
- Review grade 9-10 science activity format
```

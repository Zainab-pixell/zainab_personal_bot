# zainab_personal_bot

Personal automation bot for Zainab Zaheer, running as a scheduled Claude Code cloud routine.

## What it does

Every hour, 9am-9pm (Asia/Karachi), it generates FBISE (Federal Board of Intermediate and Secondary Education, Pakistan)-aligned "Daily Real-Life Learning Activity" content for grades 1-10:

- Grades 1-8: English, Urdu, Mathematics, General Science
- Grades 9-10: English, Urdu, Mathematics, Physics, Chemistry, Biology

It tracks what's already been generated each day (via a Daily Activity Status table in a Gmail draft) so it never duplicates a subject/grade that's already done. The full result is kept as a single, continuously updated **Gmail draft** — it is never sent automatically, and calendar events are never created automatically, per an "ask before risky actions" rule.

## Files

- [`prompt.md`](prompt.md) — the exact system prompt driving the scheduled cloud agent.
- [`config.json`](config.json) — routine metadata (schedule, connectors, scope, style).

## Managing the routine

- View/run history: https://claude.ai/code/routines/trig_0136rLScj7TAAKq6faccFJTY
- To change schedule, scope, or delivery: update the routine via Claude Code, or edit `prompt.md`/`config.json` here and re-sync.
- To delete: use the routines page (https://claude.ai/code/routines) — the API does not support deletion.

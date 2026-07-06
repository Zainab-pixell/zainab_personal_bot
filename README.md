# zainab_personal_bot

Personal automation bot for Zainab Zaheer, running as a scheduled Claude Code cloud routine.

## What it does

Once daily, at 9am (Asia/Karachi), it generates FBISE (Federal Board of Intermediate and Secondary Education, Pakistan)-aligned "Daily Real-Life Learning Activity" content for grades 1-10:

- Grades 1-8: English, Urdu, Mathematics, General Science
- Grades 9-10: English, Urdu, Mathematics, Physics, Chemistry, Biology

The full day's content (all grades, all subjects) is generated in one run and output as that run's own response text — Zainab reads it via the routine's run-history page.

**Delivery note:** this was originally designed to use a Gmail draft (never auto-sent, per an "ask before risky actions" rule). Gmail could not be authorized for automated/routine use because the organization's connector policy disables "always allow" for it — only interactive/chat use works, not scheduled routines. Delivery was then switched to a Google Drive doc, but the Drive connector's authorization got stuck pending approval. Rather than block on that, delivery was switched again to plain run output (no connector at all) — the schedule also moved from hourly to once-daily since there's no longer a way to check whether a given day is already done. If Drive (or another connector) is later approved, delivery can be switched back to produce a per-day shareable link.

## Files

- [`prompt.md`](prompt.md) — the exact system prompt driving the scheduled cloud agent.
- [`config.json`](config.json) — routine metadata (schedule, connectors, scope, style).

## Managing the routine

- View/run history: https://claude.ai/code/routines/trig_0136rLScj7TAAKq6faccFJTY
- To change schedule, scope, or delivery: update the routine via Claude Code, or edit `prompt.md`/`config.json` here and re-sync.
- To delete: use the routines page (https://claude.ai/code/routines) — the API does not support deletion.

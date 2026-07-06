# zainab_personal_bot

Personal automation bot for Zainab Zaheer, running as a scheduled Claude Code cloud routine.

## What it does

Every hour, 9am-9pm (Asia/Karachi), it generates FBISE (Federal Board of Intermediate and Secondary Education, Pakistan)-aligned "Daily Real-Life Learning Activity" content for grades 1-10:

- Grades 1-8: English, Urdu, Mathematics, General Science
- Grades 9-10: English, Urdu, Mathematics, Physics, Chemistry, Biology

It checks Google Drive for a doc titled "FBISE Daily Activities - <date>" before generating anything, so it never duplicates a day that's already done. The full day's content (all grades, all subjects) is generated in one run and saved as a single **Google Drive doc**.

**Delivery note:** this was originally designed to use a Gmail draft (never auto-sent, per an "ask before risky actions" rule). Gmail could not be authorized for automated/routine use because the organization's connector policy disables "always allow" for it — only interactive/chat use works, not scheduled routines. Google Drive is authorized for routines, so delivery was switched there. If the org policy changes, delivery can be switched back to Gmail.

## Files

- [`prompt.md`](prompt.md) — the exact system prompt driving the scheduled cloud agent.
- [`config.json`](config.json) — routine metadata (schedule, connectors, scope, style).

## Managing the routine

- View/run history: https://claude.ai/code/routines/trig_0136rLScj7TAAKq6faccFJTY
- To change schedule, scope, or delivery: update the routine via Claude Code, or edit `prompt.md`/`config.json` here and re-sync.
- To delete: use the routines page (https://claude.ai/code/routines) — the API does not support deletion.

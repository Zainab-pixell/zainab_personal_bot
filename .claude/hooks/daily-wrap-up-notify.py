import json
import re
import sys


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return

    tool_input = data.get("tool_input") or {}
    tool_response = data.get("tool_response") or {}
    path = tool_input.get("file_path") or tool_response.get("filePath") or ""

    if not re.search(r"(^|[\\/])notes([\\/])", path):
        return

    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PostToolUse",
            "additionalContext": (
                "A file under notes/ was just saved (" + path + "). "
                "Run the Daily Wrap-Up skill (.claude/skills/daily-wrap-up/SKILL.md) now: "
                "read today's notes and write a short done/doing/next summary to log/<date>.md."
            ),
        }
    }))


if __name__ == "__main__":
    main()

import json
import os
import re
import shutil
import subprocess
import sys


WRAP_UP_PROMPT = (
    "Run the Daily Wrap-Up skill for this repo, following "
    ".claude/skills/daily-wrap-up/SKILL.md: determine today's date in "
    "Asia/Karachi timezone (YYYY-MM-DD), find today's notes (notes/<date>.md, "
    "or else a '## <date>' section inside notes/NOTES.md), sort their content "
    "into short Done/Doing/Next bullets, and write log/<date>.md using the "
    "skill's template (create log/ if needed, overwrite log/<date>.md if it "
    "already exists). If neither notes source exists for today, do nothing "
    "and create no file. Don't ask questions -- just do the wrap-up or skip "
    "silently."
)


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

    claude_bin = (
        shutil.which("claude")
        or shutil.which("claude.cmd")
        or shutil.which("claude.ps1")
    )
    if not claude_bin:
        print(json.dumps({
            "systemMessage": (
                "notes/ file saved (" + path + ") but the 'claude' CLI isn't "
                "on PATH -- Daily Wrap-Up was not run automatically."
            )
        }))
        return

    subprocess.Popen(
        [
            claude_bin, "-p", WRAP_UP_PROMPT,
            "--model", "claude-haiku-4-5",
            "--allowedTools", "Read,Write,Glob,Grep",
            "--permission-mode", "acceptEdits",
        ],
        cwd=os.getcwd(),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    print(json.dumps({
        "systemMessage": (
            "notes/ file saved (" + path + ") -- running Daily Wrap-Up in "
            "the background."
        )
    }))


if __name__ == "__main__":
    main()

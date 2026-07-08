#!/bin/bash
set -euo pipefail

# Only needed for Claude Code on the web (cloud sandboxes), including the
# scheduled routine runs that generate the daily PDF.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# prompt.md's PDF pipeline tries, in order: (a) pandoc, (b) a Python
# library (markdown+xhtml2pdf, fpdf2, reportlab, or weasyprint), then
# (c) wkhtmltopdf/soffice. Pre-install (a) and (b) here so the routine
# doesn't spend its run installing packages or fall back to (c).
export DEBIAN_FRONTEND=noninteractive

if ! command -v pandoc >/dev/null 2>&1; then
  apt-get update -qq
  apt-get install -y -qq pandoc
fi

# xhtml2pdf pulls a newer cryptography than the distro-managed one, which
# pip refuses to uninstall cleanly; --ignore-installed works around that.
python3 -m pip install --quiet --ignore-installed cryptography \
  markdown fpdf2 reportlab weasyprint xhtml2pdf

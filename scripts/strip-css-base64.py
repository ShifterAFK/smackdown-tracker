#!/usr/bin/env python3
"""Remove base64 data URIs from tracker-styles.css.

The VS artwork is already served from assets/img/ui/vs.webp by ui-assets.js,
so the inline base64 copy in CSS is redundant. This script is idempotent:
running it again after the first pass makes no further changes.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "css" / "tracker-styles.css"

PATTERN = re.compile(
    r"url\(\s*[\"']?data:image/[^;\"']+;base64,[A-Za-z0-9+/=]+[\"']?\s*\)",
    re.IGNORECASE,
)


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Missing source file: {SOURCE}")

    original = SOURCE.read_text(encoding="utf-8")
    updated = PATTERN.sub("none", original)

    if updated == original:
        print("No base64 data URIs found; nothing to change.")
        return

    SOURCE.write_text(updated, encoding="utf-8")
    before = len(original.encode("utf-8"))
    after = len(updated.encode("utf-8"))
    print(f"Removed base64 data URIs: {before} -> {after} bytes (-{before - after}).")


if __name__ == "__main__":
    main()

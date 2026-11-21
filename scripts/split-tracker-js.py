#!/usr/bin/env python3
"""Split tracker-app.js into module files using its existing '// Module:' markers.

The original tracker-app.js is kept untouched. Generated files are written to
assets/js/modules/ and an ordered manifest is written alongside them.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "js" / "tracker-app.js"
OUTPUT = ROOT / "assets" / "js" / "modules"
MANIFEST = OUTPUT / "order.json"


def slugify(value: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return value or "module"


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Missing source file: {SOURCE}")

    text = SOURCE.read_text(encoding="utf-8")
    lines = text.splitlines(keepends=True)

    marker_indexes = [
        index for index, line in enumerate(lines)
        if re.match(r"^\s*//\s*Module:\s*", line)
    ]

    if not marker_indexes:
        raise SystemExit("No '// Module:' markers found; nothing to split.")

    chunks: list[tuple[str, str]] = []

    preamble = "".join(lines[: marker_indexes[0]]).strip()
    if preamble:
        chunks.append(("core", preamble + "\n"))

    for position, start in enumerate(marker_indexes):
        end = marker_indexes[position + 1] if position + 1 < len(marker_indexes) else len(lines)
        title = re.match(r"^\s*//\s*Module:\s*(.+?)\s*$", lines[start]).group(1)
        body = "".join(lines[start:end]).strip() + "\n"
        chunks.append((slugify(title), body))

    OUTPUT.mkdir(parents=True, exist_ok=True)

    # Do not delete files that are not part of this splitter's generated output.
    # The modules directory also contains hand-maintained modules loaded by index.html.
    # Old generated files may remain on disk, but only entries in order.json are consumed.

    order: list[str] = []
    for index, (name, body) in enumerate(chunks):
        filename = f"{index:02d}-{name}.js"
        (OUTPUT / filename).write_text(body, encoding="utf-8")
        order.append(filename)

    MANIFEST.write_text(
        json.dumps({"source": "assets/js/tracker-app.js", "order": order}, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Split {len(chunks)} modules into {OUTPUT}")
    for filename in order:
        print(f"- {filename}")


if __name__ == "__main__":
    main()

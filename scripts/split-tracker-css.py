#!/usr/bin/env python3
"""Split tracker-styles.css into safe, ordered chunks at top-level rule boundaries.

The original tracker-styles.css is kept untouched. Generated files are written to
assets/css/modules/ and an ordered manifest is written alongside them.

Splitting only between complete top-level rules preserves the original cascade
order when the generated files are loaded in the same sequence.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "css" / "tracker-styles.css"
OUTPUT = ROOT / "assets" / "css" / "modules"
MANIFEST = OUTPUT / "order.json"
MAX_CHUNK_BYTES = 12000


def split_top_level(text: str) -> list[str]:
    """Return complete top-level CSS statements, preserving their original order."""
    statements: list[str] = []
    start = 0
    depth = 0
    in_comment = False
    in_string = False
    quote = ""
    index = 0

    while index < len(text):
        char = text[index]
        next_char = text[index + 1] if index + 1 < len(text) else ""

        if in_comment:
            if char == "*" and next_char == "/":
                in_comment = False
                index += 2
                continue
            index += 1
            continue

        if in_string:
            if char == "\\":
                index += 2
                continue
            if char == quote:
                in_string = False
            index += 1
            continue

        if char == "/" and next_char == "*":
            in_comment = True
            index += 2
            continue

        if char in ('"', "'"):
            in_string = True
            quote = char
            index += 1
            continue

        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                end = index + 1
                statement = text[start:end]
                if statement.strip():
                    statements.append(statement)
                start = end
        elif depth == 0 and char == ";":
            end = index + 1
            statement = text[start:end]
            if statement.strip():
                statements.append(statement)
            start = end

        index += 1

    tail = text[start:]
    if tail.strip():
        statements.append(tail)

    return statements


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Missing source file: {SOURCE}")

    text = SOURCE.read_text(encoding="utf-8")
    statements = split_top_level(text)

    if not statements:
        raise SystemExit("No CSS rules found; nothing to split.")

    chunks: list[str] = []
    current: list[str] = []
    current_size = 0

    for statement in statements:
        size = len(statement.encode("utf-8"))
        if current and current_size + size > MAX_CHUNK_BYTES:
            chunks.append("\n".join(current))
            current = []
            current_size = 0
        current.append(statement)
        current_size += size

    if current:
        chunks.append("\n".join(current))

    OUTPUT.mkdir(parents=True, exist_ok=True)

    # Do not delete files that are not part of this splitter's generated output.
    # Keep hand-maintained CSS modules safe; order.json defines the generated sequence.

    order: list[str] = []
    for index, body in enumerate(chunks):
        filename = f"{index:02d}-part.css"
        (OUTPUT / filename).write_text(body.strip() + "\n", encoding="utf-8")
        order.append(filename)

    MANIFEST.write_text(
        json.dumps({"source": "assets/css/tracker-styles.css", "order": order}, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Split {len(statements)} top-level rules into {len(chunks)} chunks in {OUTPUT}")
    for filename in order:
        print(f"- {filename}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Validate local asset references and JavaScript syntax for the tracker entry point."""
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


class EntrypointAssets(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.scripts: list[tuple[str, str]] = []
        self.styles: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key.lower(): value or "" for key, value in attrs}
        if tag.lower() == "script" and values.get("src"):
            self.scripts.append((values["src"], values.get("type", "").lower()))
        elif tag.lower() == "link" and values.get("href"):
            rel = set(values.get("rel", "").lower().split())
            if "stylesheet" in rel:
                self.styles.append(values["href"])


def local_path(root: Path, raw: str) -> Path | None:
    parsed = urlsplit(raw)
    if parsed.scheme or parsed.netloc:
        return None
    path = parsed.path
    if not path or path.startswith("/") or ".." in Path(path).parts:
        raise ValueError(f"Unsafe or unsupported local asset path: {raw}")
    return root / path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path.cwd(), help="Repository root (default: current directory)")
    parser.add_argument("--entry", default="index.html", help="HTML entry point relative to root")
    args = parser.parse_args()
    root = args.root.resolve()
    entry = root / args.entry
    if not entry.is_file():
        print(f"ERROR: entry point not found: {entry}", file=sys.stderr)
        return 1

    html = EntrypointAssets()
    html.feed(entry.read_text(encoding="utf-8"))
    errors: list[str] = []
    checked_scripts = 0
    checked_styles = 0
    node = shutil.which("node")

    for raw, script_type in html.scripts:
        try:
            path = local_path(root, raw)
        except ValueError as error:
            errors.append(str(error))
            continue
        if path is None:
            continue
        if not path.is_file():
            errors.append(f"Missing script asset: {raw}")
            continue
        if script_type == "application/json":
            continue
        checked_scripts += 1
        if not node:
            errors.append("Node.js is required to syntax-check JavaScript scripts")
            continue
        if script_type == "module":
            result = subprocess.run(
                [node, "--check", "--input-type=module"],
                input=path.read_text(encoding="utf-8"),
                text=True,
                capture_output=True,
                cwd=root,
            )
        else:
            result = subprocess.run(
                [node, "--check", str(path)],
                text=True,
                capture_output=True,
                cwd=root,
            )
        if result.returncode:
            detail = (result.stderr or result.stdout).strip()
            errors.append(f"JavaScript syntax error in {raw}: {detail}")

    for raw in html.styles:
        try:
            path = local_path(root, raw)
        except ValueError as error:
            errors.append(str(error))
            continue
        if path is None:
            continue
        if not path.is_file():
            errors.append(f"Missing stylesheet asset: {raw}")
        else:
            checked_styles += 1

    if errors:
        print("Tracker runtime validation FAILED:")
        for error in errors:
            print(f"- {error}")
        print(f"Checked {checked_scripts} JavaScript files and {checked_styles} stylesheets.")
        return 1

    print("Tracker runtime validation passed.")
    print(f"Checked {checked_scripts} JavaScript files and {checked_styles} stylesheets from {args.entry}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

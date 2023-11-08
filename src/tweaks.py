#!/usr/bin/env python3
import json
from enum import StrEnum, auto
from pathlib import Path
from typing import Any, Literal

import msgspec


class Category(StrEnum):
    aesthetic = auto()


class Author(msgspec.Struct):
    name: str
    email: str
    homepage: str


class Tweak(msgspec.Struct):
    title: str
    description: str
    author: Author
    variants: list[Literal["x32", "x64"]]
    category: Category
    version: str


def wrap_errors(func, path: Path):
    try:
        return func()
    except msgspec.ValidationError as e:
        print(path)
        print(e)
        exit(1)


index: Any = {}
for tweak in Path("public/tweaks/").iterdir():
    if not tweak.is_dir():
        continue
    meta_path = tweak / "tweak.json"
    meta: Tweak = wrap_errors(
        lambda: msgspec.json.decode(meta_path.read_text(), type=Tweak),
        meta_path,
    )
    files = []
    index[tweak.name] = files
    variant = "x64"
    if (tweak / "x32").is_dir():
        variant = "x32"
    for file in tweak.glob(f"{variant}/assets/**/*"):
        if not file.is_file():
            continue
        files.append(file.relative_to(tweak / variant / "assets").as_posix())

json.dump(index, open("public/tweaks/index.json", "w"))

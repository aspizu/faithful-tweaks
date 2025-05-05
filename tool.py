# pyright: reportUnusedCallResult=false, reportAny=false, reportUnknownLambdaType=false, reportExplicitAny=false, reportRedeclaration=false

import json
from argparse import ArgumentParser
from pathlib import Path


def generate_title_from_id(tweak_id: str) -> str:
    # Converts "cool-feature_mod" -> "Cool Feature Mod"
    return tweak_id.replace("_", " ").replace("-", " ").title()


index = (
    max(
        json.load(path.joinpath("tweak.json").open())["index"]
        for path in Path("public/tweaks").iterdir()
        if path.joinpath("tweak.json").is_file()
    )
    + 1
)

argparser = ArgumentParser()

argparser.add_argument(
    "--id", type=str, required=True, help="Unique identifier for the tweak"
)
argparser.add_argument(
    "--category", type=str, required=True, help="Category of the tweak"
)
argparser.add_argument(
    "--title",
    type=str,
    help="Title of the tweak (auto-generated from id if not provided)",
)
argparser.add_argument(
    "--description", type=str, default="", help="Short description of the tweak"
)
argparser.add_argument("--author", type=str, default="aspizu", help="Author's name")
argparser.add_argument(
    "--github", type=str, default="aspizu", help="Author's GitHub handle (optional)"
)
argparser.add_argument("--discord", type=str, help="Author's Discord (optional)")
argparser.add_argument("--email", type=str, help="Author's email (optional)")
argparser.add_argument("--link", type=str, help="Author's link (optional)")
argparser.add_argument(
    "--supported", nargs="+", default=["x32"], help="List of supported platforms"
)
argparser.add_argument("--new", action="store_true", help="Mark this tweak as new")

args = argparser.parse_args()

title = args.title or generate_title_from_id(args.id)

author = {"name": args.author}
if args.github:
    author["github"] = args.github
if args.discord:
    author["discord"] = args.discord
if args.email:
    author["email"] = args.email
if args.link:
    author["link"] = args.link

manifest = {
    "index": index,
    "id": args.id,
    "title": title,
    "description": args.description,
    "author": author,
    "category": args.category,
    "supported": args.supported,
}
if args.new:
    manifest["new"] = True

root = Path("public/tweaks").joinpath(args.id)
root.joinpath("x32").mkdir(parents=True, exist_ok=True)

with root.joinpath("tweak.json").open("w") as f:
    json.dump(manifest, f, indent=4)

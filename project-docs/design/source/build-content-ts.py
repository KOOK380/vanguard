"""
Builds src/content/generated/site-content.ts from project-docs/site-content.md (decision 259).

Run after merge-site-content.py:
    python project-docs/design/source/build-content-ts.py

- Every page with an <a id> anchor becomes a SourcePage: fields, captions, lists, tables, FAQs
  and text, grouped under its ### and #### headings.
- Nothing internal is copied: blockquotes (build, 3D build and internal notes, template banners),
  "Internal sources" blocks, code blocks and the development-only pages are left out.
- Every string is checked against site-content.md, so the data is word for word. The build stops
  if any string is not found.
- Writes project-docs/content-open-items.md: the "Before launch" table and every square-bracket
  placeholder left in published copy.
"""
import json, os, re, sys

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SRC = os.path.join(BASE, "project-docs", "site-content.md")
OUT = os.path.join(BASE, "src", "content", "generated", "site-content.ts")
REPORT = os.path.join(BASE, "project-docs", "content-open-items.md")

# Development reference pages that hold no site copy.
SKIP_PAGES = {"legal-build-requirements", "legal-adviser-notes"}
# Pages kept as data for the build but never rendered as pages (no placeholder check).
REFERENCE_PAGES = {"cms-case-study-template", "buttons-and-prefill", "3d-plant-hotspots", "page-layouts"}

md = open(SRC, encoding="utf-8").read().replace("\r\n", "\n")
lines = md.split("\n")

BOLD_LEAD = re.compile(r"^\*\*(.+?)\*\*\s*(.*)$")
FIELD = re.compile(r"^\*\*(.+?):\*\*\s+(.+)$")
CAPTION = re.compile(r"^\*\*([^*]+)\*\*$")
LIST_ITEM = re.compile(r"^(?:-|\d+\.)\s+(.*)$")


def list_item(raw):
    m = BOLD_LEAD.match(raw)
    item = {"raw": raw}
    if m:
        item["lead"] = m.group(1)
        item["rest"] = m.group(2)
    return item


def cells(row):
    return [c.strip() for c in row.strip().strip("|").split("|")]


def parse_blocks(chunk):
    """chunk: list of lines for one heading's body. Returns blocks."""
    blocks, para, i = [], [], 0
    skipping = False

    def flush():
        nonlocal para
        if not para:
            return
        text = para
        para = []
        if len(text) == 1 and FIELD.match(text[0]):
            m = FIELD.match(text[0])
            blocks.append({"kind": "field", "label": m.group(1), "value": m.group(2)})
        elif len(text) == 1 and CAPTION.match(text[0]):
            blocks.append({"kind": "caption", "text": CAPTION.match(text[0]).group(1)})
        elif len(text) == 2 and CAPTION.match(text[0]) and not text[1].startswith(("**", "-", "|")):
            blocks.append({"kind": "faq", "question": CAPTION.match(text[0]).group(1), "answer": text[1]})
        else:
            blocks.append({"kind": "text", "text": " ".join(text)})

    while i < len(chunk):
        line = chunk[i]
        s = line.strip()
        if skipping:
            if s == "---":
                skipping = False
            i += 1
            continue
        if s.startswith("```"):
            flush()
            i += 1
            while i < len(chunk) and not chunk[i].strip().startswith("```"):
                i += 1
            i += 1
            continue
        if s.startswith(">"):
            flush()
            if "Internal sources" in s:
                skipping = True
            while i < len(chunk) and chunk[i].strip().startswith(">"):
                i += 1
            continue
        if s.startswith("<a id=") or s == "---":
            flush()
            i += 1
            continue
        if not s:
            flush()
            i += 1
            continue
        if s.startswith("|"):
            flush()
            rows = []
            while i < len(chunk) and chunk[i].strip().startswith("|"):
                rows.append(chunk[i])
                i += 1
            head = cells(rows[0])
            body = [cells(r) for r in rows[2:]]
            blocks.append({"kind": "table", "head": head, "rows": body})
            continue
        if LIST_ITEM.match(s):
            flush()
            ordered = bool(re.match(r"^\d+\.", s))
            items = []
            while i < len(chunk) and LIST_ITEM.match(chunk[i].strip()):
                raw = LIST_ITEM.match(chunk[i].strip()).group(1)
                if raw.startswith("[ ]") or raw.startswith("[x]"):
                    raw = raw[3:].strip()
                items.append(list_item(raw))
                i += 1
            blocks.append({"kind": "list", "ordered": ordered, "items": items})
            continue
        para.append(s)
        i += 1
    flush()
    return blocks


def parse_page(pid, start, end):
    title = lines[start][3:].strip()
    page = {"id": pid, "title": title, "blocks": [], "sections": []}
    stack = [page]  # page, then ### section, then #### section
    body = []

    def commit():
        nonlocal body
        stack[-1]["blocks"].extend(parse_blocks(body))
        body = []

    for line in lines[start + 1 : end]:
        m = re.match(r"^(#{3,4}) (.+)$", line)
        if m:
            commit()
            level = len(m.group(1))
            sec = {"heading": m.group(2).strip(), "level": level, "blocks": [], "sections": []}
            while len(stack) > 1 and stack[-1]["level"] >= level:
                stack.pop()
            stack[-1]["sections"].append(sec)
            stack.append(sec)
        else:
            body.append(line)
    commit()
    return page


# Page boundaries: an <a id> line followed by a "## " heading.
pages = {}
anchors = [(i, re.match(r'<a id="([^"]+)"></a>', l).group(1)) for i, l in enumerate(lines) if re.match(r'<a id="([^"]+)"></a>', l)]
for n, (i, pid) in enumerate(anchors):
    j = i + 1
    while j < len(lines) and not lines[j].startswith("## "):
        j += 1
    end = anchors[n + 1][0] if n + 1 < len(anchors) else len(lines)
    if pid in SKIP_PAGES:
        continue
    pages[pid] = parse_page(pid, j, end)


# Word-for-word check: every string must occur in site-content.md.
def leaves(node, path="", out=None):
    out = [] if out is None else out
    if isinstance(node, dict):
        for k, v in node.items():
            if k in ("kind", "level", "ordered", "id"):
                continue
            leaves(v, f"{path}.{k}", out)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            leaves(v, f"{path}[{i}]", out)
    elif isinstance(node, str):
        out.append((path, node))
    return out


missing = [(p, s) for p, s in leaves(pages) if s and s not in md]
if missing:
    for p, s in missing[:20]:
        print("NOT VERBATIM", p, repr(s[:80]))
    sys.exit(1)

# Open items: the Before launch table, and placeholders left in published copy.
before = []
m = re.search(r"## Before launch\n(.*?)\n## ", md, flags=re.S)
if m:
    for row in m.group(1).split("\n"):
        if row.startswith("|") and not row.startswith("|---") and "Blocker" not in row:
            c = cells(row)
            before.append((c[0], c[1]))

PLACEHOLDER = re.compile(r"\[([^\]\[]+)\](?!\()")
holders = {}
for pid, page in pages.items():
    if pid in REFERENCE_PAGES:
        continue
    for path, s in leaves(page):
        for ph in PLACEHOLDER.findall(s):
            holders.setdefault((page["title"], ph), 0)
            holders[(page["title"], ph)] += 1

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8", newline="\n") as f:
    f.write("// GENERATED by project-docs/design/source/build-content-ts.py from project-docs/site-content.md.\n")
    f.write("// Do not edit. Change content/, run merge-site-content.py, then this script (decision 259).\n\n")
    f.write('import type { SourcePage } from "../source";\n\n')
    f.write("export const sourcePages: Record<string, SourcePage> = ")
    f.write(json.dumps(pages, ensure_ascii=False, indent=1))
    f.write(";\n")

with open(REPORT, "w", encoding="utf-8", newline="\n") as f:
    f.write("# Content open items\n\n")
    f.write("Generated by `design/source/build-content-ts.py` from `site-content.md`. Do not edit.\n\n")
    f.write("## Before launch\n\n| Blocker | Open fact |\n|---|---|\n")
    for a, b in before:
        f.write(f"| {a} | {b} |\n")
    f.write("\n## Placeholders in published copy\n\nSquare brackets that must be filled before launch. The site refuses to render them in production.\n\n| Page | Placeholder | Times |\n|---|---|---|\n")
    for (title, ph), n in sorted(holders.items()):
        f.write(f"| {title} | [{ph}] | {n} |\n")

print(f"pages {len(pages)}, strings {len(leaves(pages))}, placeholders {len(holders)}, before-launch {len(before)}")

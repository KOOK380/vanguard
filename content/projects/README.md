# Case study entries

One Markdown file per project, written by the CMS (decision 164) or by hand. The front matter follows the blank entry in `../case-study-template.md`. The site reads these files at build (`src/content/cms.ts`, decision 281).

- An entry appears only when `status: "Published"` and `client_approval`, `photo_permission`, `evidence`, `reviewed_by` and `reviewed_date` are all filled. A published entry that is incomplete stops the build.
- `/projects/` is off until the first entry is published. The menu shows Projects from three entries.
- Never add test or invented projects here. For testing, point `PROJECTS_DIR` at a folder outside the repository.
- Photo paths are under `public/`, such as `/images/projects/<slug>/1.webp`, 120 KB or less each.
- The projects page copy is still missing (open fact 72). Add it to `../case-study-template.md` under "Projects page" before publishing the first entry.

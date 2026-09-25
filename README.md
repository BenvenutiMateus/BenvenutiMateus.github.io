# Mateus Jardim Benvenuti

Personal academic website for my Statistics and Data Science studies at the Federal University of São Carlos (UFSCar), undergraduate research, and selected projects.

**Website:** [benvenutimateus.github.io](https://benvenutimateus.github.io)

## Features

- English and Portuguese pages, with a language switch that keeps visitors on the corresponding page.
- Research overview, selected project cards, study notes, presentations, and an academic timeline.
- CV preview and download, contact links, and a skills section.
- Responsive layout, light and dark themes, and local search through `Ctrl+K` (`Cmd+K` on macOS).
- Static content and language navigation that remain available without JavaScript.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Introduction, CV access, and featured work |
| `research.html` | Research problem, methodology, current work, and outputs |
| `projects.html` | Selected projects and repository links |
| `notes.html`, `presentations.html` | Academic materials |
| `background.html`, `contact.html` | Education, skills, contact information, and CV |
| `pt/` | Corresponding Portuguese pages |
| `content/site.json` | Shared profile data and content in both languages |
| `tools/build_site.py` | Static page and search-index generator |
| `style.css` | Shared styles and themes |
| `script.js` | Theme preference and footer year |
| `search.js`, `search-data.js` | Search interface and generated bilingual index |
| `assets/cv.pdf` | Current CV in English |
| `assets/projects/` | SVG workflow illustrations for project cards |

## Local preview

With Python 3 installed, run from the repository root:

```sh
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000). Press `Ctrl+C` to stop the server. You can also open `index.html` directly in a browser.

## Updating content

Edit `content/site.json`, then regenerate the static files:

```sh
python3 tools/build_site.py
```

The generator uses only the Python standard library. Commit both the source content and the generated HTML and `search-data.js`. GitHub Pages serves the generated files directly; no server-side application or deployment build is required. Direct changes to generated pages will be overwritten on the next generation.

Each project has shared repository, technology, image, and destination fields, plus an `en` and a `pt` content block. Keep descriptions factual, distinguish ongoing research from completed applications, and link to public evidence. The cards use workflow illustrations, not screenshots or measured research results.

Replace `assets/cv.pdf` to update the CV. The same file is linked from both language versions and is labeled as English. Profile links are maintained in the `profile` section. The optional `lattes` and `orcid` fields are omitted from the interface until their URLs are provided.

When changing page structure, edit `tools/build_site.py`; for presentation changes, edit `style.css`. After regeneration, check navigation and search in both languages, local links and anchors, the CV download, and the layout on mobile and desktop in both themes.

## Content sources

Education, experience, and skills are based on the CV in `assets/cv.pdf`. Project descriptions are based on the public repositories: [Marketplace Promotions](https://github.com/BenvenutiMateus/promocoes), [Genetica](https://github.com/BenvenutiMateus/Genetica), and [Mercado Livre Product Analysis](https://github.com/BenvenutiMateus/analises_ml).

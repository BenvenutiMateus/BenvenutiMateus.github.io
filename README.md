# Mateus Jardim Benvenuti

Source code for my personal academic website, featuring my background in Statistics and Data Science at the Federal University of São Carlos (UFSCar), research, and projects.

**Website:** [benvenutimateus.github.io](https://benvenutimateus.github.io)

## About the project

The website is built with HTML, CSS, and JavaScript, without frameworks or a build step. It consists of static pages hosted on GitHub Pages.

The interface includes a responsive layout, keyboard navigation, and light and dark themes. The browser saves the selected theme; when no preference is saved, the site follows the system setting. Local search is available through the magnifying glass button or the `Ctrl+K` shortcut (`Cmd+K` on macOS). Content and navigation remain accessible without JavaScript.

## Structure

| File or directory | Purpose |
| --- | --- |
| `index.html` | Personal introduction and profile photo |
| `research.html` | Undergraduate research project |
| `projects.html` | Selected projects |
| `notes.html` | Notes and study materials |
| `presentations.html` | Academic presentations |
| `background.html` | Education and academic activities |
| `contact.html` | Contact information |
| `style.css` | Shared styles, responsive layout, and themes |
| `script.js` | Theme selection and footer year updates |
| `search.js` | Local search and index of pages and topics |
| `assets/` | Website images |

## Local preview

Open `index.html` in a browser to preview the website. Alternatively, with Python 3 installed, run the following command from the repository root:

```sh
python3 -m http.server 8000
```

Visit [localhost:8000](http://localhost:8000). Press `Ctrl+C` in the terminal to stop the server.

## Maintenance

Edit content directly in the corresponding HTML file. Apply changes to the header, navigation, or footer consistently across all pages.

Shared styles are defined in `style.css`, and theme behavior is managed in `script.js`. Store new images in `assets/` and provide descriptive alternative text in the `alt` attribute.

To add a project, create a section in `projects.html` with a title, a short description, and links to the application, repository, or other relevant resources.

To publish notes or presentations, add the title, a short description, and a link to the material on the corresponding page. Update the `entries` index in `search.js` so that new content appears in search results.

Before publishing changes, check page navigation, links, the layout on smaller screens, search results, and both themes.

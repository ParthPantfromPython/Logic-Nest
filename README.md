# Logic Nest

A modern coding-channel portfolio for **Logic Nest** — designed to showcase your work, learning tracks, experiments, tutorials, and developer projects.

## What is included

- Polished responsive portfolio layout
- Customizable Logic Nest branding
- Favicon / brand icon support through `assets/icon.png`
- Learning tracks for Python, Web Development, and Problem Solving
- Dynamic project cards loaded from `projects.js`
- Project search and technology filters
- Live Demo and Source Code buttons
- Scroll animations and responsive mobile navigation
- GitHub Pages deployment workflow in `.github/workflows/pages.yml`
- No framework or build step required

## Add your icon

Upload your own icon as:

`assets/icon.png`

The website already points the favicon, Apple touch icon, and header brand image to this file. Your icon will replace the fallback `LN` mark automatically.

## Projects

Projects are currently driven by `projects.js`. Each project supports:

- `title`
- `description`
- `tags`
- `icon`
- `demo`
- `source`

Example:

```js
{
  title: "My New Project",
  description: "A short explanation of what I built.",
  tags: ["Python", "API"],
  icon: "PY",
  demo: "https://example.com",
  source: "https://github.com/yourname/project"
}
```

The next planned step is a secure owner-only admin system for managing these projects without editing code.

## Publish with GitHub Pages

The repository contains an Actions workflow that deploys the site whenever `main` changes. GitHub's current Pages setup requires the repository Pages source to be set to **GitHub Actions** once under **Settings → Pages → Build and deployment → Source**. After that, pushes to `main` deploy automatically. citeturn355065search0turn355065search1

The expected project URL is:

`https://ParthPantfromPython.github.io/Logic-Nest/`

## Local preview

Open `index.html` directly in a modern browser.

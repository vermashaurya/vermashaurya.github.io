# Shaurya Verma — Portfolio

Personal portfolio website. Interactive, professional, and a touch of personality.

**Live at:** [shaurya.online](https://shaurya.online)

![Tests](https://github.com/vermashaurya/vermashaurya.github.io/actions/workflows/playwright.yml/badge.svg)

---

## Stack

Built with vanilla HTML, CSS, and JavaScript

| Layer | Detail |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Custom CSS with CSS variables, responsive grid, dark/light theme |
| Scripting | Vanilla JS — scroll effects, chess puzzle, theme toggle, poke feature |
| Fonts | Playfair Display (headings) · Schibsted Grotesk (body) |
| Images | Compressed and converted to AVIF via [Squoosh](https://squoosh.app) |
| Performance | Audited with Google Lighthouse — 90+ across all categories |
| Testing | Playwright end-to-end via GitHub Actions CI |
| Hosting | GitHub Pages + Vercel + Custom domain via [shaurya.online](https://shaurya.online) |

---

## Features

- **Dark / Light theme** — persisted via localStorage
- **Poke feature** — silent form submission via Formspree, no page redirect
- **Cursor glow + tilt effects** — pointer-aware interactions on cards
- **Side navigation** — scroll-aware active state, visible on wide screens
- **Fully responsive** — optimised layouts from mobile to ultrawide
- **Interactive chess puzzle** — mate in one, with confetti on solve
- **CI pipeline** — Playwright tests run on every push via GitHub Actions

---

## Project Structure

```
portfolio-web/
├── index.html          # Single page markup
├── styles.css          # All styles, variables, and media queries
├── script.js           # All interactivity
├── assets/             # AVIF-optimised images, icons, chess pieces, resume PDF
└── tests/
    └── portfolio.spec.js   # Playwright UI tests
```

---

## Running Locally

No build step required — just open the file.

```bash
git clone https://github.com/vermashaurya/vermashaurya.github.io.git
cd vermashaurya.github.io
open index.html
```

Or serve it locally:

```bash
npx serve .
```

---

## Tests

End-to-end UI tests written with [Playwright](https://playwright.dev), covering navigation, section visibility, contact links, and resume download.

```bash
npm install
npx playwright test
```

CI runs automatically on every push via `.github/workflows/playwright.yml`.

---

## License

Feel free to take inspiration. <br>Happy Coding!

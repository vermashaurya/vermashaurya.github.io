# Shaurya Verma — Portfolio

Personal portfolio website. Interactive, professional, and a touch of personality.

**Live at:** [shaurya.online](https://shaurya.online)

![Uptime](https://img.shields.io/uptimerobot/status/m802907586-cd0c75503b185949c25b62b2?label=Status)
![Uptime](https://img.shields.io/uptimerobot/ratio/m802907586-cd0c75503b185949c25b62b2?label=Uptime)

<img src="assets/preview.avif" alt="Preview Image" width="600" />

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
| Monitoring | UptimeRobot (multi-region: Asia + US), status page, uptime API badge |

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

## Color Palette

![#140e0b](https://dummyimage.com/40x20/140e0b/000000?text=+) ![#1e1511](https://dummyimage.com/40x20/1e1511/000000?text=+) ![#f8efe6](https://dummyimage.com/40x20/f8efe6/000000?text=+) ![#d4c1b0](https://dummyimage.com/40x20/d4c1b0/000000?text=+) ![#f5a35c](https://dummyimage.com/40x20/f5a35c/000000?text=+) ![#ff6e54](https://dummyimage.com/40x20/ff6e54/000000?text=+) ![#91dbc0](https://dummyimage.com/40x20/91dbc0/000000?text=+)  
`#140e0b` `#1e1511` `#f8efe6` `#d4c1b0` `#f5a35c` `#ff6e54` `#91dbc0`

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

## Performance

<img src="assets/PageSpeed-Insights.avif" alt="PageSpeed Insights Score" width="600" />
Google Lighthouse: 

![Performance](https://img.shields.io/badge/Performance-99-brightgreen)
![Accessibility](https://img.shields.io/badge/Accessibility-98-brightgreen)
![Best Practices](https://img.shields.io/badge/BestPractices-100-brightgreen)
![SEO](https://img.shields.io/badge/SEO-100-brightgreen)
<!-- Performance 99 · Accessibility 98 · Best Practices 100 · SEO 100 --> 
---
## Monitoring

- **Uptime Monitoring** — Tracked via UptimeRobot (Asia + US regions)
- **Real-time Alerts** — Email and push notifications enabled
- **Status Page** — [/status](https://shaurya.online/status)
- **Performance Monitoring** — Vercel Speed Insights (real user metrics)

Primary monitoring on Asia region for majority user experience, with a secondary US monitor for global availability checks.

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

This project is licensed under the [MIT License](LICENSE). 
<br><br>
<img src="assets/favicon.avif" alt="Logo" width="120" /> <br>
[![License](https://img.shields.io/github/license/vermashaurya/vermashaurya.github.io)](LICENSE) [![Security](https://img.shields.io/badge/Security-Policy-blue)](SECURITY.md)<br>
Feel free to take inspiration. <br>Happy Coding!

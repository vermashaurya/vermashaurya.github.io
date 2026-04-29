const root = document.documentElement;
const pagesGrid = document.querySelector("[data-pages-grid]");
const topbar = document.querySelector(".topbar");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeToggleCopy = document.querySelector(".theme-toggle-copy");
const siteTotal = document.querySelector("[data-site-total]");
let lastScrollY = window.scrollY;

// Add new live entries here. The grid renders directly from this list.
const sites = [
  {
    name: "ML-Keras Bot",
    url: "https://vermashaurya.github.io/ML-Keras-Bot",
    domain: "vermashaurya.github.io/ML-Keras_bot",
    description: "Socket programming demo with a Keras-trained model for interactive predictions in a chat-like interface.",
    accent: "amber",
    tag: "Robotics",
    note: "GitHub Pages deployment",
    code: "ML"
  },
  {
    name: "OCR Lens",
    url: "https://vermashaurya.github.io/ocr-lens",
    domain: "vermashaurya.github.io/ocr-lens",
    description: "Text extraction utility with a cleaner utility-style surface and focused task flow.",
    accent: "lime",
    tag: "Engine",
    note: "Document capture utility",
    code: "OCR"
  },
  {
    name: "CNN Health",
    url: "https://vermashaurya.github.io/CNN-Health",
    domain: "vermashaurya.github.io/CNN-Health",
    description: "Health-focused computer vision interface with a sharper diagnostic demo feel.",
    accent: "mint",
    tag: "Vision",
    note: "CNN experiment online",
    code: "CNN"
  },
  {
    name: "AI Math Logic",
    url: "https://vermashaurya.github.io/ai-math-logic",
    domain: "vermashaurya.github.io/ai-math-logic",
    description: "Math-driven AI playground with logic-first interaction and clean problem flow.",
    accent: "sky",
    tag: "Logic",
    note: "GitHub Pages deployment",
    code: "AI"
  },
  {
    name: "Encryption Models",
    url: "https://vermashaurya.github.io/Encryption-models",
    domain: "vermashaurya.github.io/Encryption-models",
    description: "Encryption concepts presented through a compact, approachable interactive build.",
    accent: "coral",
    tag: "Crypto",
    note: "Security learning build",
    code: "EN"
  },
  {
    name: "FCC Websites",
    url: "https://vermashaurya.github.io/fcc-websites",
    domain: "vermashaurya.github.io/fcc-websites",
    description: "A collection of Frontend Mentor style practice sites with varied layouts and polish.",
    accent: "gold",
    tag: "Stack",
    note: "Multiple responsive pages",
    code: "WEB"
  },
  {
    name: "Web Engine",
    url: "https://vermashaurya.github.io/Web-Engine",
    domain: "vermashaurya.github.io/Web-Engine",
    description: "A more experimental web interface with systems flavor and motion-driven detail.",
    accent: "gold",
    tag: "Build",
    note: "Interactive concept online",
    code: "PHP"
  },
  {
    name: "Network Communication",
    url: "https://vermashaurya.github.io/network-communication",
    domain: "vermashaurya.github.io/network-communication",
    description: "Networking-oriented educational build with diagram-friendly structure and pacing.",
    accent: "rose",
    tag: "Comm",
    note: "Protocol concept site",
    code: "NET"
  },
  {
    name: "MyBookSurru",
    url: "https://mybooksurru.glide.page/",
    domain: "mybooksurru.glide.page",
    description: "A live book-centric product page with a simpler app-like hosted experience.",
    accent: "sky",
    tag: "App",
    note: "Hosted outside GitHub Pages",
    code: "GL"
  }
];

const setTheme = (theme) => {
  root.dataset.theme = theme;
  window.localStorage.setItem("portfolio-theme", theme);

  if (themeToggleCopy) {
    themeToggleCopy.textContent = theme === "light" ? "Dark" : "Light";
  }
};

const renderSites = () => {
  if (!pagesGrid) {
    return;
  }

  const markup = sites
    .map(
      (site, index) => `
        <article
          class="site-card"
          data-accent="${site.accent}"
          data-testid="site-card"
          style="--delay:${index * 70}ms"
        >
          <a
            class="site-card-link"
            href="${site.url}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open ${site.name}"
          >
            <div class="site-card-visual" aria-hidden="true">
              <div class="visual-grid"></div>
              <div class="visual-orbit"></div>
              <span class="visual-pill">${site.tag}</span>
              <span class="visual-code">${site.code}</span>
            </div>

            <div class="card-copy">
              <div class="card-head">
                <div class="card-labels">
                  <h2 class="card-title">${site.name}</h2>
                  <span class="card-domain">${site.domain}</span>
                </div>
                <span class="card-tag">${site.tag}</span>
              </div>

              <p class="card-description">${site.description}</p>
              <div class="card-note">${site.note}</div>
            </div>

            <span class="card-arrow" aria-hidden="true">↗</span>
          </a>
        </article>
      `
    )
    .join("");

  pagesGrid.innerHTML = markup;
};

const savedTheme = window.localStorage.getItem("portfolio-theme");
setTheme(savedTheme || "dark");
renderSites();

if (siteTotal) {
  siteTotal.textContent = String(sites.length);
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  setTheme(nextTheme);
});

const updateTopbar = () => {
  if (!topbar) {
    return;
  }

  const currentScrollY = window.scrollY;
  const nearTop = currentScrollY < 96;

  if (nearTop || currentScrollY < lastScrollY - 2) {
    topbar.classList.remove("is-hidden");
  } else if (currentScrollY > lastScrollY + 2) {
    topbar.classList.add("is-hidden");
  }

  lastScrollY = currentScrollY;
};

updateTopbar();
window.addEventListener("scroll", updateTopbar, { passive: true });

const root = document.documentElement;
const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const profileToggle = document.querySelector("[data-profile-toggle]");
const profilePanel = document.getElementById("profile-panel");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeToggleCopy = document.querySelector(".theme-toggle-copy");
const pokeButton = document.querySelector("[data-poke-button]");
const pokeNameInput = document.getElementById("poke-name");
const sideNav = document.querySelector(".side-nav");
const sideNavLinks = document.querySelectorAll("[data-section-link]");
const siteNavLinks = document.querySelectorAll(".site-nav a, .side-nav a, .footer-links a");
const revealElements = document.querySelectorAll(".reveal");
const stripTrack = document.querySelector(".strip-track");
const interactiveShells = document.querySelectorAll(
  ".interactive-shell, .portrait-orbit, .identity-card, .project-card"
);
const tiltItems = document.querySelectorAll("[data-tilt]");

const motionEnabled = () =>
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
  window.matchMedia("(pointer: fine)").matches &&
  window.innerWidth > 820;

let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;
let scrollFrame = false;
let lastScrollY = window.scrollY;

const setTheme = (theme) => {
  root.dataset.theme = theme;
  window.localStorage.setItem("portfolio-theme", theme);

  if (themeToggleCopy) {
    themeToggleCopy.textContent = theme === "light" ? "Dark" : "Light";
  }
};

const savedTheme = window.localStorage.getItem("portfolio-theme");
setTheme(savedTheme || "dark");

window.addEventListener("load", () => {
  window.requestAnimationFrame(() => {
    body.classList.add("site-ready");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

if (stripTrack) {
  stripTrack.innerHTML += stripTrack.innerHTML;
}

const setSectionLinkState = (activeId) => {
  sideNavLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.sectionLink === activeId);
  });
};

setSectionLinkState("top");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const { id } = entry.target;

      if (id === "experience" || id === "projects" || id === "skills" || id === "hobbies" || id === "contact") {
        setSectionLinkState(id);
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "-35% 0px -45% 0px",
  }
);

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

const closeProfilePanel = () => {
  if (!profilePanel || !header) {
    return;
  }

  profilePanel.hidden = true;
  header.classList.remove("is-profile-open");
  profileToggle?.setAttribute("aria-expanded", "false");
};

const openProfilePanel = () => {
  if (!profilePanel || !header) {
    return;
  }

  profilePanel.hidden = false;
  header.classList.add("is-profile-open");
  profileToggle?.setAttribute("aria-expanded", "true");
};

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  setTheme(nextTheme);
});

navToggle?.addEventListener("click", () => {
  const navOpen = header?.classList.toggle("is-nav-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(navOpen)));
});

profileToggle?.addEventListener("click", () => {
  if (!profilePanel) {
    return;
  }

  if (profilePanel.hidden) {
    openProfilePanel();
  } else {
    closeProfilePanel();
  }
});

document.addEventListener("click", (event) => {
  if (!header || !profilePanel || profilePanel.hidden) {
    return;
  }

  if (!header.contains(event.target)) {
    closeProfilePanel();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProfilePanel();
    header?.classList.remove("is-nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

siteNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("is-nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

pokeButton?.addEventListener("click", () => {
  const visitorName = pokeNameInput?.value.trim();
  const subject = visitorName ? `Portfolio poke from ${visitorName}` : "Portfolio poke";
  const bodyLines = [
    "Hey Shaurya,",
    "",
    visitorName
      ? `${visitorName} viewed your website and left you a poke.`
      : "Someone viewed your website and left you a poke.",
    "",
    "Sent from your portfolio popover.",
  ];

  window.location.href =
    `mailto:verma.shaurya2003@gmail.com?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(bodyLines.join("\n"))}`;
});

const updatePointer = () => {
  root.style.setProperty("--cursor-x", `${pointerX}px`);
  root.style.setProperty("--cursor-y", `${pointerY}px`);
};

window.addEventListener("pointermove", (event) => {
  pointerX = event.clientX;
  pointerY = event.clientY;
  updatePointer();
});

interactiveShells.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    item.style.setProperty("--mx", `${x}%`);
    item.style.setProperty("--my", `${y}%`);
  });
});

tiltItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    if (!motionEnabled()) {
      return;
    }

    const rect = item.getBoundingClientRect();
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    const elevate = item.classList.contains("identity-card") ? -6 : -4;

    item.style.transform =
      `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${elevate}px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

const updateChrome = () => {
  const currentScrollY = window.scrollY;
  const isCompact = currentScrollY > 8;
  const isMobile = window.innerWidth <= 820;

  if (header) {
    header.classList.toggle("is-compact", isCompact);

    if (isMobile || currentScrollY < 110 || currentScrollY < lastScrollY - 2) {
      header.classList.remove("is-hidden");
    } else if (currentScrollY > lastScrollY + 2) {
      header.classList.add("is-hidden");
    }
  }

  if (sideNav) {
    sideNav.classList.toggle("is-visible", !isMobile && currentScrollY > window.innerHeight * 0.45);
  }

  if (currentScrollY < 180) {
    setSectionLinkState("top");
  }

  lastScrollY = currentScrollY;
};

const handleScrollEffects = () => {
  updateChrome();
  scrollFrame = false;
};

const requestScrollFrame = () => {
  if (scrollFrame) {
    return;
  }

  scrollFrame = true;
  window.requestAnimationFrame(handleScrollEffects);
};

window.addEventListener("scroll", requestScrollFrame, { passive: true });
window.addEventListener("resize", () => {
  header?.classList.remove("is-nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
  requestScrollFrame();
});

updatePointer();
updateChrome();

const chessBoard = document.getElementById("chess-board");
const chessStatus = document.getElementById("chess-status");
const chessSuccess = document.getElementById("chess-success");
const chessReset = document.getElementById("chess-reset");
const confettiLayer = document.getElementById("chess-confetti");

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
const pieceAssets = {
  K: { src: "assets/chess/white-king.svg", alt: "White king" },
  Q: { src: "assets/chess/white-queen.svg", alt: "White queen" },
  B: { src: "assets/chess/white-bishop.svg", alt: "White bishop" },
  k: { src: "assets/chess/black-king.svg", alt: "Black king" },
  q: { src: "assets/chess/black-queen.svg", alt: "Black queen" },
  b: { src: "assets/chess/black-bishop.svg", alt: "Black bishop" },
  p: { src: "assets/chess/black-pawn.svg", alt: "Black pawn" },
};

const initialPieces = {
  g1: "K",
  h5: "Q",
  b1: "B",
  d7: "b",
  h8: "k",
  b4: "q",
  g7: "p",
  h7: "p",
};

let boardState = {};
let selectedSquare = null;
let legalTargets = [];
let draggedSquare = null;
let puzzleLocked = false;

const clonePieces = () => ({ ...initialPieces });

const toCoords = (square) => ({
  file: files.indexOf(square[0]),
  rank: Number(square[1]) - 1,
});

const toSquare = (fileIndex, rankIndex) => `${files[fileIndex]}${rankIndex + 1}`;

const insideBoard = (fileIndex, rankIndex) =>
  fileIndex >= 0 && fileIndex < 8 && rankIndex >= 0 && rankIndex < 8;

const isWhitePiece = (piece) => piece && piece === piece.toUpperCase();

const getSquareColor = (file, rank) => {
  const fileIndex = files.indexOf(file);
  return (fileIndex + rank) % 2 === 0 ? "dark" : "light";
};

const pushRayTargets = (targets, file, rank, fileStep, rankStep) => {
  let nextFile = file + fileStep;
  let nextRank = rank + rankStep;

  while (insideBoard(nextFile, nextRank)) {
    const nextSquare = toSquare(nextFile, nextRank);
    const occupant = boardState[nextSquare];

    if (occupant && isWhitePiece(occupant)) {
      break;
    }

    targets.push(nextSquare);

    if (occupant) {
      break;
    }

    nextFile += fileStep;
    nextRank += rankStep;
  }
};

const getPieceTargets = (square, piece) => {
  const targets = [];
  const { file, rank } = toCoords(square);

  if (piece === "K") {
    for (let fileStep = -1; fileStep <= 1; fileStep += 1) {
      for (let rankStep = -1; rankStep <= 1; rankStep += 1) {
        if (fileStep === 0 && rankStep === 0) {
          continue;
        }

        const nextFile = file + fileStep;
        const nextRank = rank + rankStep;

        if (!insideBoard(nextFile, nextRank)) {
          continue;
        }

        const nextSquare = toSquare(nextFile, nextRank);
        const occupant = boardState[nextSquare];

        if (occupant && isWhitePiece(occupant)) {
          continue;
        }

        targets.push(nextSquare);
      }
    }
  }

  if (piece === "Q") {
    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ].forEach(([fileStep, rankStep]) => {
      pushRayTargets(targets, file, rank, fileStep, rankStep);
    });
  }

  if (piece === "Q" || piece === "B") {
    [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ].forEach(([fileStep, rankStep]) => {
      pushRayTargets(targets, file, rank, fileStep, rankStep);
    });
  }

  return targets;
};

const setMessage = (message) => {
  if (chessStatus) {
    chessStatus.textContent = message;
  }
};

const clearConfetti = () => {
  if (confettiLayer) {
    confettiLayer.innerHTML = "";
  }
};

const launchConfetti = () => {
  if (!confettiLayer) {
    return;
  }

  clearConfetti();

  const colors = ["#f5a35c", "#ff6e54", "#91dbc0", "#ffd166", "#ffffff"];

  for (let index = 0; index < 28; index += 1) {
    const bit = document.createElement("span");
    bit.className = "confetti-bit";
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.background = colors[index % colors.length];
    bit.style.setProperty("--confetti-x", `${(Math.random() - 0.5) * 140}px`);
    bit.style.setProperty("--confetti-rotate", `${180 + Math.random() * 540}deg`);
    bit.style.animationDelay = `${Math.random() * 0.18}s`;
    confettiLayer.appendChild(bit);
  }

  window.setTimeout(clearConfetti, 1900);
};

const resetPuzzle = () => {
  boardState = clonePieces();
  selectedSquare = null;
  legalTargets = [];
  draggedSquare = null;
  puzzleLocked = false;
  setMessage("Hint: Move the Queen");
  chessSuccess?.classList.add("hidden");
  clearConfetti();
  renderBoard();
};

const handleCorrectMove = () => {
  puzzleLocked = true;
  setMessage("That is mate. Qxh7# is the finish.");
  chessSuccess?.classList.remove("hidden");
  launchConfetti();
  renderBoard();
};

const handleWrongMove = () => {
  puzzleLocked = true;
  setMessage("Not mate. Hit reset and try the knight move again.");
  chessSuccess?.classList.add("hidden");
  renderBoard();
};

const finishMove = (from, to) => {
  const piece = boardState[from];

  if (!piece) {
    return;
  }

  delete boardState[from];
  boardState[to] = piece;
  selectedSquare = null;
  legalTargets = [];
  draggedSquare = null;

  if (piece === "Q" && from === "h5" && to === "h7") {
    handleCorrectMove();
    return;
  }

  handleWrongMove();
};

const activateSquare = (square) => {
  if (puzzleLocked) {
    return;
  }

  const piece = boardState[square];

  if (selectedSquare && legalTargets.includes(square)) {
    finishMove(selectedSquare, square);
    return;
  }

  if (!piece || !isWhitePiece(piece)) {
    selectedSquare = null;
    legalTargets = [];
    renderBoard();
    return;
  }

  selectedSquare = square;
  legalTargets = getPieceTargets(square, piece);
  setMessage(piece === "Q" ? "Correct piece. Find the checkmate" : "The winning move comes from the queen on h5.");
  renderBoard();
};

const onDragStart = (event, square) => {
  if (puzzleLocked) {
    event.preventDefault();
    return;
  }

  const piece = boardState[square];

  if (!piece || !isWhitePiece(piece)) {
    event.preventDefault();
    return;
  }

  selectedSquare = square;
  draggedSquare = square;
  legalTargets = getPieceTargets(square, piece);
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", square);
  renderBoard();
};

const onDrop = (event, square) => {
  event.preventDefault();

  if (puzzleLocked || !draggedSquare) {
    return;
  }

  if (legalTargets.includes(square)) {
    finishMove(draggedSquare, square);
    return;
  }

  draggedSquare = null;
  renderBoard();
};

function renderBoard() {
  if (!chessBoard) {
    return;
  }

  chessBoard.innerHTML = "";

  ranks.forEach((rank) => {
    files.forEach((file) => {
      const square = `${file}${rank}`;
      const piece = boardState[square];
      const pieceAsset = piece ? pieceAssets[piece] : null;
      const cell = document.createElement("button");

      cell.type = "button";
      cell.className = `chess-square ${getSquareColor(file, rank)}`;
      cell.dataset.square = square;
      cell.setAttribute("aria-label", square);

      if (selectedSquare === square) {
        cell.classList.add("selected");
      }

      if (legalTargets.includes(square)) {
        cell.classList.add("target");
      }

      if (pieceAsset) {
        const img = document.createElement("img");
        img.className = "chess-piece";
        img.src = pieceAsset.src;
        img.alt = pieceAsset.alt;
        img.draggable = false;
        cell.classList.add("has-piece");
        cell.appendChild(img);
      }

      if (draggedSquare === square) {
        cell.classList.add("dragging");
      }

      if (piece && isWhitePiece(piece) && !puzzleLocked) {
        cell.draggable = true;
        cell.addEventListener("dragstart", (event) => onDragStart(event, square));
        cell.addEventListener("dragend", () => {
          draggedSquare = null;
          renderBoard();
        });
      }

      cell.addEventListener("dragover", (event) => {
        if (selectedSquare && legalTargets.includes(square)) {
          event.preventDefault();
        }
      });

      cell.addEventListener("drop", (event) => onDrop(event, square));
      cell.addEventListener("click", () => activateSquare(square));
      chessBoard.appendChild(cell);
    });
  });
}

if (chessBoard && chessStatus && chessSuccess && chessReset) {
  chessReset.addEventListener("click", resetPuzzle);
  resetPuzzle();
}

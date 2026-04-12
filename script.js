const revealElements = document.querySelectorAll(".reveal");

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

const stripTrack = document.querySelector(".strip-track");

if (stripTrack) {
  stripTrack.innerHTML += stripTrack.innerHTML;
}

const root = document.documentElement;
const interactiveShells = document.querySelectorAll(".interactive-shell, .scene-stack");
const parallaxItems = document.querySelectorAll(".parallax");
const tiltItems = document.querySelectorAll("[data-tilt]");

let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;
let frameRequested = false;

const updateMotion = () => {
  const xRatio = (pointerX / window.innerWidth - 0.5) * 2;
  const yRatio = (pointerY / window.innerHeight - 0.5) * 2;

  root.style.setProperty("--cursor-x", `${pointerX}px`);
  root.style.setProperty("--cursor-y", `${pointerY}px`);

  parallaxItems.forEach((item) => {
    const depth = Number(item.dataset.depth || 10);
    const moveX = xRatio * depth;
    const moveY = yRatio * depth + window.scrollY * 0.01;
    item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });

  frameRequested = false;
};

const requestMotionFrame = () => {
  if (frameRequested) {
    return;
  }

  frameRequested = true;
  window.requestAnimationFrame(updateMotion);
};

window.addEventListener("pointermove", (event) => {
  pointerX = event.clientX;
  pointerY = event.clientY;
  requestMotionFrame();
});

window.addEventListener("scroll", requestMotionFrame, { passive: true });
window.addEventListener("resize", requestMotionFrame);
requestMotionFrame();

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
    const rect = item.getBoundingClientRect();
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    item.style.transform =
      `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

const chessBoard = document.getElementById("chess-board");
const chessStatus = document.getElementById("chess-status");
const chessSuccess = document.getElementById("chess-success");
const chessReset = document.getElementById("chess-reset");

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
const pieceSymbols = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "♙",
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟",
};

const initialPieces = {
  g1: "K",
  h5: "Q",
  f1: "R",
  c4: "B",
  g5: "N",
  h8: "k",
  e8: "r",
  e7: "b",
  f7: "p",
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

  if (piece === "N") {
    const jumps = [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
    ];

    jumps.forEach(([fileStep, rankStep]) => {
      const nextFile = file + fileStep;
      const nextRank = rank + rankStep;

      if (!insideBoard(nextFile, nextRank)) {
        return;
      }

      const nextSquare = toSquare(nextFile, nextRank);
      const occupant = boardState[nextSquare];

      if (occupant && isWhitePiece(occupant)) {
        return;
      }

      targets.push(nextSquare);
    });
  }

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

  if (piece === "Q" || piece === "R") {
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

  if (piece === "P") {
    const nextRank = rank + 1;

    if (insideBoard(file, nextRank)) {
      const forwardSquare = toSquare(file, nextRank);

      if (!boardState[forwardSquare]) {
        targets.push(forwardSquare);
      }
    }

    [-1, 1].forEach((fileStep) => {
      const nextFile = file + fileStep;

      if (!insideBoard(nextFile, nextRank)) {
        return;
      }

      const nextSquare = toSquare(nextFile, nextRank);
      const occupant = boardState[nextSquare];

      if (occupant && !isWhitePiece(occupant)) {
        targets.push(nextSquare);
      }
    });
  }

  return targets;
};

const setMessage = (message) => {
  chessStatus.textContent = message;
};

const resetPuzzle = () => {
  boardState = clonePieces();
  selectedSquare = null;
  legalTargets = [];
  draggedSquare = null;
  puzzleLocked = false;
  setMessage("Hint: the final move is a knight capture.");
  chessSuccess.classList.add("hidden");
  renderBoard();
};

const handleCorrectMove = () => {
  puzzleLocked = true;
  setMessage("That is mate.");
  chessSuccess.classList.remove("hidden");
  renderBoard();
};

const handleWrongMove = () => {
  puzzleLocked = true;
  setMessage("Not mate. Hit reset and try again.");
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

  if (piece === "N" && from === "g5" && to === "f7") {
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
  setMessage(piece === "N" ? "Try dragging the knight to its mating square." : "The winning move comes from the knight.");
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

const renderBoard = () => {
  if (!chessBoard) {
    return;
  }

  chessBoard.innerHTML = "";

  ranks.forEach((rank) => {
    files.forEach((file) => {
      const square = `${file}${rank}`;
      const piece = boardState[square];
      const cell = document.createElement("button");

      cell.type = "button";
      cell.className = `chess-square ${getSquareColor(file, rank)}`;
      cell.dataset.square = square;

      if (selectedSquare === square) {
        cell.classList.add("selected");
      }

      if (legalTargets.includes(square)) {
        cell.classList.add("target");
      }

      if (piece) {
        cell.classList.add("has-piece");
        cell.textContent = pieceSymbols[piece];
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
};

if (chessBoard && chessStatus && chessSuccess && chessReset) {
  chessReset.addEventListener("click", resetPuzzle);
  resetPuzzle();
}

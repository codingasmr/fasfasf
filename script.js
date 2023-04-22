var grid = document.getElementById("grid");
var testMode = false; //Turn this variable to true to see where the mines are
generateGrid();

function generateGrid() {
  //generate 10 by 10 grid
  grid.innerHTML = "";
  for (var i = 0; i < 10; i++) {
    row = grid.insertRow(i);
    for (var j = 0; j < 10; j++) {
      cell = row.insertCell(j);
      cell.onclick = function () { clickCell(this); };
      var mine = document.createAttribute("data-mine");
      mine.value = "false";
      cell.setAttributeNode(mine);
    }
  }
  addMines();
}

function addMines() {
  //Add mines randomly
  for (var i = 0; i < 20; i++) {
    var row = Math.floor(Math.random() * 10);
    var col = Math.floor(Math.random() * 10);
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("data-mine", "true");
    if (testMode) cell.innerHTML = "X";
  }
}

function revealMines() {
  //Highlight all mines in red
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var cell = grid.rows[i].cells[j];
      if (cell.getAttribute("data-mine") == "true") cell.className = "mine";
    }
  }
}

function checkLevelCompletion() {
  var levelComplete = true;
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if ((grid.rows[i].cells[j].getAttribute("data-mine") == "false") && (grid.rows[i].cells[j].innerHTML == "")) levelComplete = false;
    }
  }
  if (levelComplete) {
    alert("You Win!");
    revealMines();
  }
}

const grid = document.getElementById("grid");
const testMode = false; // set to true to see where the mines are
const ROWS = 10;
const COLS = 10;
const NUM_MINES = 20;

function generateGrid() {
  // generate a ROWS x COLS grid
  for (let i = 0; i < ROWS; i++) {
    const row = grid.insertRow(i);
    for (let j = 0; j < COLS; j++) {
      const cell = row.insertCell(j);
      cell.onclick = () => clickCell(cell);
      cell.dataset.mine = false;
    }
  }
}

function addMines() {
  // add NUM_MINES mines randomly
  const cells = Array.from(grid.querySelectorAll("td"));
  const mineCells = Array.from({ length: NUM_MINES }, () => {
    const idx = Math.floor(Math.random() * cells.length);
    return cells.splice(idx, 1)[0];
  });
  mineCells.forEach((cell) => {
    cell.dataset.mine = true;
    if (testMode) cell.innerHTML = "X";
  });
}

function revealMines() {
  // highlight all mines in red
  grid.querySelectorAll('[data-mine="true"]').forEach((cell) => {
    cell.classList.add("mine");
  });
}

function checkLevelCompletion() {
  // check if all non-mine cells have been clicked
  const levelComplete = grid.querySelectorAll('[data-mine="false"]:not([class="clicked"])').length === 0;
  if (levelComplete) {
    alert("You Win!");
    revealMines();
  }
}

function clickCell(cell) {
  // check if the clicked cell is a mine
  if (cell.dataset.mine === "true") {
    revealMines();
    alert("Game Over");
  } else {
    cell.classList.add("clicked");
    // count and display the number of adjacent mines
    const adjacentCells = [];
    const cellRow = cell.parentNode.rowIndex;
    const cellCol = cell.cellIndex;
    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, ROWS - 1); i++) {
      for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, COLS - 1); j++) {
        adjacentCells.push(grid.rows[i].cells[j]);
      }
    }
    const mineCount = adjacentCells.filter((cell) => cell.dataset.mine === "true").length;
    cell.innerHTML = mineCount || "";
    if (mineCount === 0) {
      // reveal all adjacent cells as they do not have a mine
      adjacentCells.forEach((cell) => {
        if (!cell.classList.contains("clicked")) clickCell(cell);
      });
    }
    checkLevelCompletion();
  }
}

generateGrid();
addMines();

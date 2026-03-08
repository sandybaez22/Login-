const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartBtn = document.querySelector("#restart");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

statusText.textContent = "Turno de: " + currentPlayer;

cells.forEach(cell => {
    cell.addEventListener("click", cellClick);
});

restartBtn.addEventListener("click", restartGame);

function cellClick() {

    const index = this.dataset.index;

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();

}

function checkWinner() {

    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {

        const condition = winConditions[i];

        const a = board[condition[0]];
        const b = board[condition[1]];
        const c = board[condition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }

    }

    if (roundWon) {
        statusText.textContent = "Ganó " + currentPlayer + " 🎉";
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "Empate 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Turno de: " + currentPlayer;

}

function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";

    statusText.textContent = "Turno de: " + currentPlayer;

    cells.forEach(cell => cell.textContent = "");

}
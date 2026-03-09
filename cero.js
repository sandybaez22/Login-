const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const backBtn = document.getElementById("back");

const menu = document.getElementById("menu");
const game = document.getElementById("game");

const vsPC = document.getElementById("vs-pc");
const vsPlayer = document.getElementById("vs-player");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "";

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

vsPC.addEventListener("click", () => {
    mode = "pc";
    startGame();
});

vsPlayer.addEventListener("click", () => {
    mode = "player";
    startGame();
});

function startGame() {
    menu.style.display = "none";
    game.style.display = "block";
    statusText.textContent = "Turno de: " + currentPlayer;
}

cells.forEach(cell => {
    cell.addEventListener("click", cellClick);
});

function cellClick() {

    const index = this.dataset.index;

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);

    checkWinner();

    if (!gameActive) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Turno de: " + currentPlayer;

    if (mode === "pc" && currentPlayer === "O" && gameActive) {
        setTimeout(pcMove, 500);
    }
}

function pcMove() {

    let empty = [];

    board.forEach((cell, index) => {
        if (cell === "") {
            empty.push(index);
        }
    });

    let random = empty[Math.floor(Math.random() * empty.length)];

    board[random] = "O";
    cells[random].textContent = "O";
    cells[random].classList.add("O");

    checkWinner();

    if (gameActive) {
        currentPlayer = "X";
        statusText.textContent = "Turno de: X";
    }
}

function checkWinner() {

    for (let condition of winConditions) {

        let a = board[condition[0]];
        let b = board[condition[1]];
        let c = board[condition[2]];

        if (a !== "" && a === b && b === c) {

            if (mode === "pc") {

                if (a === "X") {
                    statusText.textContent = "¡Ganaste! 🎉";
                } else {
                    statusText.textContent = "¡La máquina gana! 🤖";
                }

            } else {

                statusText.textContent = "¡Jugador " + a + " gana! 🎉";

            }

            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "Empate 🤝";
        gameActive = false;
    }
}

restartBtn.addEventListener("click", () => {

    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Turno de: X";
});

backBtn.addEventListener("click", () => {

    menu.style.display = "block";
    game.style.display = "none";

    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "";
});
const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
let knopka = document.querySelector(".knopka")
let container = document.querySelector(".container")
knopka.addEventListener("click", (e)=>{
  container.classList.add("active");
    
})
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];


const playButton = document.querySelector(".i");
const music = document.querySelector("#backgroundMusic");

playButton.addEventListener("click", (e) => {
    music.play();
  });
function createCell(index) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => makeMove(index));
    board.appendChild(cell);
}

function makeMove(index) {
    if (boardState[index] === '' && !checkWinner()) {
        boardState[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            message.textContent = ` ${currentPlayer} yuti!`;
            message.style.color = "white"
            
        } else if (boardState.every(cell => cell !== '')) {
            message.textContent = 'Durang!';
            message.style.color = "white"
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = boardState[index];
    });
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    message.textContent = '';
    renderBoard();
}

resetButton.addEventListener('click', resetGame);

// Создание игрового поля
for (let i = 0; i < 9; i++) {
    createCell(i);
}

renderBoard();

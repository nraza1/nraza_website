const playerOne = 'X';
const playerTwo = 'O';

let currentPlayer = playerOne;

let gameType;

let gameOver = false;

let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');

document.querySelector('#singlePlayer').addEventListener('click', function() {
  gameType = 'single';
  document.querySelector('#singlePlayer').classList.add('selected');
  document.querySelector('#multiplayer').classList.remove('selected');
});

document.querySelector('#multiplayer').addEventListener('click', function() {
  gameType = 'multi';
  document.querySelector('#multiplayer').classList.add('selected');
  document.querySelector('#singlePlayer').classList.remove('selected');
});

function handleCellClick(e) {
  const index = parseInt(e.target.getAttribute('data-index'));

  if (board[index] === '' && !gameOver) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkForWin();
    switchPlayers();
    if (gameType === 'single' && !gameOver) {
      computerTurn();
    }
  }
}

function checkForWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      gameOver = true;
      const winner = board[a];
      displayGameOver(`${winner} wins!`);
    }
  }
  if (!board.includes('') && !gameOver) {
    gameOver = true;
    displayGameOver('Draw!');
  }
}

function computerTurn() {
  const availableCells = getAvailableCells();
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const randomCell = availableCells[randomIndex];
  board[randomCell] = playerTwo;
  cells[randomCell].textContent = playerTwo;
  checkForWin();
  switchPlayers();
}

function getAvailableCells() {
  const availableCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      availableCells.push(i);
    }
  }
  return availableCells;
}

function switchPlayers() {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
}

function displayGameOver(message) {
  const gameover = document.querySelector('.gameover');
  gameover.style.display = 'block';
  const text = gameover.querySelector('.text');
  text.textContent = message;
}

function handleRestartClick() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = playerOne;
  gameOver = false;
  cells.forEach(cell => cell.textContent = '');
  document.querySelector('.gameover').style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

document.querySelector('.restart').addEventListener('click', handleRestartClick);

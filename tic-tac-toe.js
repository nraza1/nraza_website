const cells = document.querySelectorAll('td');
let currentPlayer = 'X';
let numMoves = 0;

cells.forEach(cell => {
  cell.addEventListener('click', handleMove);
});

function handleMove(event) {
  const cell = event.target;
  
  // If the cell is already occupied, do nothing
  if (cell.textContent !== '') {
    return;
  }
  
  // Make the move and update the game state
  cell.textContent = currentPlayer;
  numMoves++;
  
  // Check if the game is over
  if (checkWin() || numMoves === 9) {
    endGame();
    return;
  }
  
  // Switch to the next player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
  // If it's the computer's turn, make a move
  if (currentPlayer === 'O') {
    setTimeout(makeComputerMove, 500);
  }
}

function checkWin() {
  const board = Array.from(cells).map(cell => cell.textContent);
  const winningLines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  
  return false;
}

function endGame() {
  const winner = checkWin() ? currentPlayer : 'Tie';
  alert(`Game over! ${winner} wins.`);
  
  // Clear the board
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  numMoves = 0;
}

function makeComputerMove() {
  const availableCells = Array.from(cells).filter(cell => cell.textContent === '');
  const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
  randomCell.click();
}

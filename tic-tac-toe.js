let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

function drawBoard() {
  for (let i = 0; i < board.length; i++) {
    document.getElementById(`cell-${i}`).innerText = board[i];
  }
}

function getAvailableMoves() {
  return board.reduce((moves, cell, index) => {
    if (cell === '') {
      moves.push(index);
    }
    return moves;
  }, []);
}

function checkWin(board, player) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombos.some(combo =>
    combo.every(cell => board[cell] === player)
  );
}

function getComputerMove() {
  let move;

  // check if the center cell is available
  if (board[4] === '') {
    move = 4;
  } else {
    // get a list of all available moves
    const availableMoves = getAvailableMoves();

    // loop through the available moves and choose one that prevents the user from winning
    for (let i = 0; i < availableMoves.length; i++) {
      const testBoard = [...board];
      testBoard[availableMoves[i]] = 'O';
      if (!checkWin(testBoard, 'X')) {
        move = availableMoves[i];
        break;
      }
    }

    // if no move was found to prevent user from winning, choose a random available move
    if (move === undefined) {
      move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
  }

  return move;
}

function play(cellIndex) {
  if (board[cellIndex] !== '') {
    return;
  }

  board[cellIndex] = currentPlayer;
  drawBoard();

  if (checkWin(board, currentPlayer)) {
    alert(`${currentPlayer} wins!`);
    reset();
    return;
  }

  if (getAvailableMoves().length === 0) {
    alert('Draw!');
    reset();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (currentPlayer === 'O') {
    const computerMove = getComputerMove();
    board[computerMove] = currentPlayer;
    drawBoard();

    if (checkWin(board, currentPlayer)) {
      alert(`${currentPlayer} wins!`);
      reset();
      return;
    }

    if (getAvailableMoves().length === 0) {
      alert('Draw!');
      reset();
      return;
    }

    currentPlayer = 'X';
  }
}

function reset() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  drawBoard();
}

drawBoard();

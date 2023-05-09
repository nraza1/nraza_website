// Define variables for game settings
let isSinglePlayer = true;
let isGameActive = false;

// Define variables for game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Define variables for DOM elements
const gameBoardElement = document.querySelector('#game-board');
const singlePlayerButton = document.querySelector('#singlePlayer');
const multiPlayerButton = document.querySelector('#multiPlayer');
const playButton = document.querySelector('#play');
const newGameButton = document.querySelector('#newGame');

// Define function to render the game board
function renderGameBoard() {
  let boardHTML = '';
  for (let i = 0; i < gameBoard.length; i++) {
    const tile = gameBoard[i];
    const tileHTML = `<div class="tile" data-index="${i}">${tile}</div>`;
    boardHTML += tileHTML;
  }
  gameBoardElement.innerHTML = boardHTML;
}

// Define function to handle tile click events
function handleTileClick(event) {
  const tileIndex = event.target.dataset.index;
  if (gameBoard[tileIndex] === '' && isGameActive) {
    gameBoard[tileIndex] = currentPlayer;
    renderGameBoard();
    checkGameStatus();
    if (isSinglePlayer && isGameActive) {
      computerMove();
    } else {
      toggleCurrentPlayer();
    }
  }
}

// Define function to handle computer move
function computerMove() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * gameBoard.length);
  } while (gameBoard[randomIndex] !== '');
  gameBoard[randomIndex] = 'O';
  renderGameBoard();
  checkGameStatus();
  toggleCurrentPlayer();
}

// Define function to toggle current player
function toggleCurrentPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Define function to check game status
function checkGameStatus() {
  const winningConditions = [    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      isGameActive = false;
      showWinningAnimation(winningConditions[i]);
      return;
    }
  }

  if (!gameBoard.includes('')) {
    isGameActive = false;
    showDrawAnimation();
  }
}

// Define function to show winning animation
function showWinningAnimation(winningTilesIndices) {
  const winningTiles = getWinningTiles(winningTilesIndices);
  for (let i = 0; i < winningTiles.length; i++) {
    const tile = winningTiles[i];
    tile.classList.add('winning-tile');
  }
}

// Define function to show draw animation
function showDrawAnimation() {
  gameBoardElement.classList.add('draw');
}

// Define function to get the winning tiles
function getWinningTiles(winningTilesIndices) {
    const winningTiles = [];
    for (let i = 0; i < winningTilesIndices.length; i++) {
      const index = winningTilesIndices[i];
      const tile = gameBoardElement.querySelector(`[data-index="${index}"]`);
      winningTiles.push(tile);
    }
    return winningTiles;
  }
  
  // Define function to handle single player button click
  function handleSinglePlayerClick() {
    isSinglePlayer = true;
    renderGameBoard();
    toggleGameSettings();
  }
  
  // Define function to handle multi player button click
  function handleMultiPlayerClick() {
    isSinglePlayer = false;
    renderGameBoard();
    toggleGameSettings();
  }
  
  // Define function to handle play button click
  function handlePlayClick() {
    isGameActive = true;
    renderGameBoard();
    toggleGameSettings();
  }
  
  // Define function to handle new game button click
  function handleNewGameClick() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = false;
    gameBoardElement.classList.remove('draw');
    const winningTiles = gameBoardElement.querySelectorAll('.winning-tile');
    for (let i = 0; i < winningTiles.length; i++) {
      const tile = winningTiles[i];
      tile.classList.remove('winning-tile');
    }
    renderGameBoard();
    toggleGameSettings();
  }
  
  // Define function to toggle game settings
  function toggleGameSettings() {
    singlePlayerButton.disabled = isGameActive;
    multiPlayerButton.disabled = isGameActive;
    playButton.disabled = isGameActive || gameBoard.includes('');
    newGameButton.disabled = !isGameActive;
  }

singlePlayerButton.addEventListener('click', handleSinglePlayerClick);
multiPlayerButton.addEventListener('click', handleMultiPlayerClick);
playButton.addEventListener('click', handlePlayClick);
newGameButton.addEventListener('click', handleNewGameClick);

renderGameBoard();


const gameBoard = (() => {
  const board = Array(9).fill(null); // Empty 9-cell board

  const getBoard = () => board;
  const updateCell = (index, symbol) => {
    board[index] = symbol;
  };
  const isCellEmpty = (index) => board[index] === null;
  const resetBoard = () => board.fill(null); // Resets board for a new game

  return { getBoard, updateCell, isCellEmpty, resetBoard };
})();

const Player = (name, symbol) => {
  return { name, symbol, score: 0 }; // Score tracking can be handled in the controller
};

const gameController = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let currentPlayer = player1;
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const makeMove = (index) => {
    if (!gameBoard.isCellEmpty(index) || gameOver) return;

    gameBoard.updateCell(index, currentPlayer.symbol);
    domBoard.renderBoard();

    if (checkWin()) {
      console.log(`${currentPlayer.name} wins!`);
      gameOver = true;
      currentPlayer.score++; // Increment the winner's score
    } else if (gameBoard.getBoard().every((cell) => cell !== null)) {
      console.log("It's a draw!");
      gameOver = true;
    } else {
      switchPlayer();
    }
  };

  const checkWin = function () {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];
    let isWin = false;
    winningCombinations.forEach((combo) => {
      const [a, b, c] = combo;
      if (
        gameBoard.getBoard()[a] === currentPlayer.symbol &&
        gameBoard.getBoard()[b] === currentPlayer.symbol &&
        gameBoard.getBoard()[c] === currentPlayer.symbol
      ) {
        isWin = true;
      }
    });
    return isWin;
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    gameOver = false;
    currentPlayer = player1;
    domBoard.renderBoard(); // Re-render the cleared board
  };

  return { makeMove, checkWin, resetGame, currentPlayer };
})();

const domBoard = (() => {
  const renderBoard = () => {
    const cells = document.querySelectorAll(".cell");
    const board = gameBoard.getBoard();

    cells.forEach((cell, index) => {
      cell.textContent = board[index] !== null ? board[index] : "";
    });
  };

  const addCellListeners = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        gameController.makeMove(index);
      });
    });
  };

  return { renderBoard, addCellListeners };
})();

// Initialize game by adding cell listeners and rendering the empty board
domBoard.addCellListeners();
domBoard.renderBoard();



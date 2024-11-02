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
  return { name, symbol, score: 0 }; // factory function for creating user
};

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
        gameFlow.makeMove(index);
      });
    });
  };

  const popForm = () => {
    const dialog = document.querySelector("dialog");
    const submitButton = document.querySelector("#submitButton");

    window.addEventListener("DOMContentLoaded", () => {
      dialog.showModal();
    });

    // Update the listener to close the dialog and extract names correctly
    submitButton.addEventListener("click", () => {
      const names = extractNames();
      if (names.name1 && names.name2) {
        // Check if names are provided
        gameFlow.initializePlayers(names.name1, names.name2); // Initialize players with names
        dialog.close();
      } else {
        alert("Please enter names for both players!");
      }
    });
  };

  const extractNames = () => {
    let name1 = document.querySelector("#one").value;
    let name2 = document.querySelector("#two").value;
    return { name1, name2 };
  };

  return { extractNames, popForm, renderBoard, addCellListeners };
})();

const gameFlow = (() => {
  let player1, player2; // Declare players here
  let currentPlayer;
  let gameOver = false;

  const initializePlayers = (name1, name2) => {
    player1 = Player(name1, "X");
    player2 = Player(name2, "O"); // Use different symbols for players
    currentPlayer = player1; // Set current player
    domBoard.addCellListeners(); // Add cell listeners only after players are initialized
    domBoard.renderBoard(); // Render the board
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = () => {
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

    return winningCombinations.some((combo) => {
      const [a, b, c] = combo;
      return (
        gameBoard.getBoard()[a] === currentPlayer.symbol &&
        gameBoard.getBoard()[b] === currentPlayer.symbol &&
        gameBoard.getBoard()[c] === currentPlayer.symbol
      );
    });
  };

  const makeMove = (index) => {
    if (!gameBoard.isCellEmpty(index) || gameOver) return;

    gameBoard.updateCell(index, currentPlayer.symbol);
    domBoard.renderBoard();

    if (checkWin()) {
      console.log(`${currentPlayer.name} wins!`);
      gameOver = true;
    } else if (gameBoard.getBoard().every((cell) => cell !== null)) {
      console.log("It's a draw!");
      gameOver = true;
    } else {
      switchPlayer();
    }
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    gameOver = false;
    currentPlayer = player1;
    domBoard.renderBoard(); // Re-render the cleared board
  };

  return { initializePlayers, makeMove, checkWin, resetGame };
})();

// Initialize game
domBoard.popForm();

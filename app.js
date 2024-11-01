"use strict";

const gameBoard = (function () {
  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return {
    getBoard: () => board,
    getOptions: () => board.filter((cell) => cell !== "X" && cell !== "O"),
    makeMove: (index, symbol) => {
      board[index] = symbol;
    },
  };
})();

const playerFactory = (function () {
  return function (userName, userTurn) {
    return {
      name: userName,
      turn: userTurn,
      input: null,
      score: 0,
    };
  };
})();

function displayBoard() {
  const arr1 = gameBoard.getBoard().slice(0, 3).join(" ");
  const arr2 = gameBoard.getBoard().slice(3, 6).join(" ");
  const arr3 = gameBoard.getBoard().slice(6, 9).join(" ");
  console.log(`${arr1}\n${arr2}\n${arr3}`);
}

// IIFE to handle the game flow
const gameFlow = (function () {
  let gameOver = false;
  let moveIndex = 0;
  const testInputs = [1, 5, 2, 8, 3];
  const user1 = playerFactory("Player 1", true);
  const user2 = playerFactory("Player 2", false);

  // Separate each task into its own IIFE
  const takeInputs = (function () {
    return function () {
      if (moveIndex >= testInputs.length) {
        console.log("All test inputs have been used. Ending the game.");
        gameOver = true;
        return;
      }
      const currentUser = user1.turn ? user1 : user2;
      currentUser.input = testInputs[moveIndex++];
      console.log(`${currentUser.name} chooses ${currentUser.input}`);
    };
  })();

  const validateInput = (function () {
    return function () {
      const currentUser = user1.turn ? user1 : user2;
      if (gameBoard.getOptions().includes(currentUser.input)) {
        gameBoard.makeMove(currentUser.input - 1, user1.turn ? "X" : "O");
        user1.turn = !user1.turn;
        user2.turn = !user2.turn;
      } else {
        console.log(
          `Cell ${currentUser.input} is already occupied. Please choose a different cell.`,
        );
      }
      checkWin();
    };
  })();

  const checkWin = (function () {
    return function () {
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
      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
          gameBoard.getBoard()[a] === gameBoard.getBoard()[b] &&
          gameBoard.getBoard()[b] === gameBoard.getBoard()[c]
        ) {
          console.log(`Player ${gameBoard.getBoard()[a]} wins!`);
          gameOver = true;
          return true;
        }
      }
      if (gameBoard.getOptions().length === 0) {
        console.log("It's a draw!");
        gameOver = true;
      }
      return false;
    };
  })();

  // Function to play the game, utilizing smaller IIFEs
  function play() {
    while (!gameOver) {
      console.log(
        user1.turn ? `${user1.name}'s turn (X)` : `${user2.name}'s turn (O)`,
      );
      displayBoard();
      takeInputs();
      validateInput();
    }
  }

  // Start the game
  play();
})();

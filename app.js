"use strict";

let gameBoard = (function () {
  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return {
    getBoard: () => board,
    getOptions: () => board.filter((cell) => cell !== "X" && cell !== "O"),
    makeMove: (index, symbol) => {
      board[index] = symbol;
    },
  };
})();

// Function to display the board
function displayBoard() {
  let arr1 = gameBoard.getBoard().slice(0, 3).join(" ");
  let arr2 = gameBoard.getBoard().slice(3, 6).join(" ");
  let arr3 = gameBoard.getBoard().slice(6, 9).join(" ");
  console.log(`${arr1}\n${arr2}\n${arr3}`);
}

// Factory function for user creation
const user = function (userName, userTurn) {
  return {
    name: userName,
    turn: userTurn,
    input: null,
    score: 0,
  };
};

(function gameFlow() {
  let gameOver = false;
  let moveIndex = 0;
  const testInputs = [1, 5, 2, 8, 3];

  // Initialize users within gameFlow
  const user1 = user("Player 1", true);
  const user2 = user("Player 2", false);

  while (!gameOver) {
    console.log(
      user1.turn ? `${user1.name}'s turn (X)` : `${user2.name}'s turn (O)`,
    );
    displayBoard();
    takeInputs();
    validateInput();
  }

  function takeInputs() {
    if (moveIndex >= testInputs.length) {
      console.log("All test inputs have been used. Ending the game.");
      gameOver = true;
      return;
    }

    const currentUser = user1.turn ? user1 : user2;
    currentUser.input = testInputs[moveIndex++];
    console.log(`${currentUser.name} chooses ${currentUser.input}`);
  }

  function validateInput() {
    let currentUser = user1.turn ? user1 : user2;

    if (gameBoard.getOptions().includes(currentUser.input)) {
      gameBoard.makeMove(currentUser.input - 1, user1.turn ? "X" : "O");
      user1.turn = !user1.turn;
      user2.turn = !user2.turn;
    } else {
      console.log(
        `Cell ${currentUser.input} is already occupied. Please choose a different cell.`,
      );
    }

    if (checkWin()) {
      console.log("Game Over");
      displayBoard();
      gameOver = true;
      return;
    }

    if (gameBoard.getOptions().length === 0) {
      console.log("It's a draw!");
      displayBoard();
      gameOver = true;
    }
  }

  function checkWin() {
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
        gameBoard.getBoard()[a] === "X" ? user1.score++ : user2.score++;
        gameOver = true;
        return true;
      }
    }
    return false;
  }
})();

"use strict";

let gameOver = false;
// Example sequence of moves for testing
const testInputs = [1, 5, 2, 8, 3];
let moveIndex = 0;

// DONE WITHOUT ANY GLITCH
let gameBoard = (function gameBoardFunction() {
  const board = {
    board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };
  return board;
})();

// DONE WITHOUT ANY GLITCH
function displayBoard() {
  let arr1 = gameBoard.board.slice(0, 3).join(" ");
  let arr2 = gameBoard.board.slice(3, 6).join(" ");
  let arr3 = gameBoard.board.slice(6, 9).join(" ");
  console.log(`${arr1}\n${arr2}\n${arr3}`);
}

// DONE WITHOUT ANY GLITCH
const user = function (userName, userTurn) {
  const userInfo = {
    name: userName,
    turn: userTurn,
    input: null,
  };
  return userInfo;
};

// DONE WITHOUT ANY GLITCH
const user1 = user("Player 1", true);
const user2 = user("Player 2", false);

// Assembling all functions to make it work
(function gameFlow() {
  while (!gameOver) {
    console.log(
      //console.clear(); // Clear the console for each new turn
      user1.turn ? `${user1.name}'s turn (X)` : `${user2.name}'s turn (O)`,
    );
    displayBoard();
    takeInputs();
    validateInput();
  }
})();

function possibleInput() {
  let options = gameBoard.board.filter((item) => {
    return item !== "X" && item !== "O";
  });
  console.log("These are possible options:");
  console.log(options);
  return options;
}

// Modified takeInputs function for testing
function takeInputs() {
  // Check if all test inputs have been used
  if (moveIndex >= testInputs.length) {
    console.log("All test inputs have been used. Ending the game.");
    gameOver = true;
    return;
  }

  // Useing moves from testInputs array instead of using prompt
  const currentUser = user1.turn ? user1 : user2; // Get the current user
  currentUser.input = testInputs[moveIndex++];
  console.log(`${currentUser.name} chooses ${currentUser.input}`);
}

function validateInput() {
  console.log("Checking input validity...");
  let currentUser = user1.turn ? user1 : user2; // Get the current user

  if (possibleInput().includes(currentUser.input)) {
    gameBoard.board[currentUser.input - 1] = user1.turn ? "X" : "O";
    user1.turn = !user1.turn; // Switch turns
    user2.turn = !user2.turn;
  } else {
    console.log(
      `Cell ${currentUser.input} is already occupied with '${gameBoard.board[currentUser.input - 1]}'. Please choose a different cell.`,
    );
  }

  if (checkWin()) {
    console.log("Game Over");
    displayBoard(); // Show the final board state
    return;
  }

  if (possibleInput().length === 0) {
    console.log("It's a draw!");
    displayBoard(); // Show the final board state
    gameOver = true; // End the game
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
      gameBoard.board[a] === gameBoard.board[b] &&
      gameBoard.board[b] === gameBoard.board[c]
    ) {
      console.log(`Player ${gameBoard.board[a]} wins!`);
      gameOver = true;
      return true;
    }
  }
  return false;
}

"use strict";

//iife to create a board and some functions reltaed to it
const gameBoard = (function () {
  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return {
    //will return board
    getBoard: () => board,
    //will take all the elements of board except the one which has X and O
    getOptions: () => board.filter((cell) => cell !== "X" && cell !== "O"),
    //this will change the board and mark the element at that specific index with X or O depending on which user is doing it
    makeMove: (index, symbol) => {
      board[index] = symbol;
    },
  };
})();

//iife which will return a ff for creating user
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

//this function will split the board into 3 arrays and display it such that it looks like a board , will remove it as it's just for console testing purpose
function displayBoard() {
  const arr1 = gameBoard.getBoard().slice(0, 3).join(" ");
  const arr2 = gameBoard.getBoard().slice(3, 6).join(" ");
  const arr3 = gameBoard.getBoard().slice(6, 9).join(" ");
  console.log(`${arr1}\n${arr2}\n${arr3}`);
}

// IIFE to handle the game flow this is what i'm concerned about coz allmost all iife are created inside of it so not sure if this is the right approach or not
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

  //will check if the input entered by the user is possible like preoccupied or not and if it's possible change the board array with the user input
  const validateInput = (function () {
    return function () {
      const currentUser = user1.turn ? user1 : user2;
      if (gameBoard.getOptions().includes(currentUser.input)) {
        gameBoard.makeMove(currentUser.input - 1, user1.turn ? "X" : "O");
        //changing the turn of both values (if true then make it false and vice versa)
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
      //take each array of array winningCombinations and deconstruct them to a,b,c and finally match it with board
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

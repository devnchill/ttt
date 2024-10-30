"use strict";
let gameBoard = (function gameBoardFunction() {
  const gameBoard = {
    board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };
  return gameBoard;
})();

function displayBoard() {
  let arr1 = gameBoard.board.slice(0, 3).join(" ");
  console.log(arr1);
  let arr2 = gameBoard.board.slice(3, 6).join(" ");
  console.log(arr2);
  let arr3 = gameBoard.board.slice(6, 9).join(" ");
  console.log(arr3);
}

const user = function (userName, userTurn) {
  const userInfo = {
    name: userName,
    turn: userTurn,
    input: null,
  };
  return userInfo;
};

const user1 = user("a", true);
const user2 = user("b", false);

function gameFlow() {
  displayBoard();
  if (user1.turn == true) {
    console.log("User1's turn");
    user1.input = 3;
    if (possibleInput().includes(user1.input)) {
      let index = user1.input - 1;
      gameBoard.board[index] = "markedByA";
      console.log(gameBoard.board);
      user1.turn = false;
    } else {
      alert("Invalid input");
      return;
    }
  } else {
    console.log("User2's turn");
    user2.input = 3;
    if (possibleInput().includes(user2.input)) {
      let index = user2.input - 1;
      gameBoard.board[index] = "markedByA";
      console.log(gameBoard.board);
      user2.turn = false;
    } else {
      alert("Invalid input");
      return;
    }
  }
}

function possibleInput() {
  let options = gameBoard.board.filter((item) => {
    return item != "markedByA" && item != "markedByB";
  });
  return options;
}

//console.log(possibleInput());
gameFlow();

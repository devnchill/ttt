"use strict";
let gameBoard = (function gameBoardFunction() {
  const gameBoard = {
    board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };
  return gameBoard;
})();

function displayBoard() {
  let arr1 = gameBoard.board.slice(0, 3).join(" ");
  let arr2 = gameBoard.board.slice(3, 6).join(" ");
  let arr3 = gameBoard.board.slice(6, 9).join(" ");
  console.log(`${arr1}\n${arr2}\n${arr3}`);
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

(function gameFlow() {
  displayBoard();
})();

function possibleInput() {
  let options = gameBoard.board.filter((item) => {
    return item !== "markedByA" && item !== "markedByB";
  });
  return options;
}

function takeInputs() {
  user1.input = 2;
  user2.input = 5;
}

function validateInput() {
  switch (user1.turn) {
    case true:
      if (possibleInput().includes(user1.input)) {
        gameBoard.board[user1.input] = "markedByA";
        user1.turn = false;
        user2.turn = true;
      }
      break;
    case false:
      if (possibleInput().includes(user2.input)) {
        gameBoard.board[user2.input] = "markedByA";
        user2.turn = false;
        user1.turn = true;
      }
    default:
      console.log("Neither worked inside validateInput");
      break;
  }
}

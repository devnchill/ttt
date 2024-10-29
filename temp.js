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

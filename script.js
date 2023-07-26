const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const addMark = (index, mark) => {
    if (board[index] !== "") return false;
    board[index] = mark;
  };

  const getMark = (index) => {
    if (index < 0 || index > 8) return;
    return board[index];
  };

  const getBoard = () => {
    return board;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { addMark, getMark, resetBoard, getBoard };
})();

const Player = (name, mark) => {
  this.name = name;
  this.mark = mark;
  const getName = () => name;
  const getMark = () => mark;
  return { getName, getMark };
};

const gameController = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");

  let currentPlayer = player1;
  let gameOver = false;

  const changePlayer = () => {
    return currentPlayer === player1 ? player2 : player1;
  };

  const checkWinner = (board, playerMark) => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], //rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], //columns
      [2, 4, 6],
      [0, 4, 8], //diagonals
    ];

    for (const combo of winCombos) {
      if (
        board.getMark(combo[0]) === playerMark &&
        board.getMark(combo[1]) === playerMark &&
        board.getMark(combo[2]) === playerMark
      ) {
        return true;
      }
    }
    return false;
  };

  const handleMove = (index) => {
    if (gameOver) {
      return;
    }

    const board = gameBoard.getBoard();
    const validMove = gameBoard.addMark(index, currentPlayer.getMark());

    if (validMove) {
      //Display the move on the board DOM

      if (checkWinner(gameBoard, currentPlayer.getMark())) {
        gameOver = true;
      } else if (!board.includes("")) {
        gameOver = true; //tie
      } else {
        currentPlayer = changePlayer();
        //Display the current turn
      }
    }
  };

  const initializeGame = () => {
    gameBoard.resetBoard();
    currentPlayer = player1;
    gameOver = false;
    //Display the current turn
  };
  const resetGame = () => {
    gameBoard.resetBoard();
    currentPlayer = player1;
    gameOver = false;
    //Display the current turn || new game screen
  };

  return { handleMove, initializeGame, resetGame };
})();

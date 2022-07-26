import Ship from "./ship";

function createBoard() {
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    const x = [];
    board.push(x);
    for (let j = 0; j < 10; j += 1) {
      const y = [];
      x.push(y);
    }
  }
  return board;
}

export default function GameBoard() {
  this.board = createBoard();
  this.computerBoard = createBoard();
  this.placeShip = (length, name, x, y, board, direction) => {
    const ship = new Ship(length, name);
    if (name === "carrier") {
      if (direction === "horizontal") {
        board[x][y].push(ship);
        board[x][y + 1].push(ship);
        board[x][y + 2].push(ship);
        board[x][y + 3].push(ship);
        board[x][y + 4].push(ship);
      } else {
        board[x][y].push(ship);
        board[x + 1][y].push(ship);
        board[x + 2][y].push(ship);
        board[x + 3][y].push(ship);
        board[x + 4][y].push(ship);
      }
    } else if (name === "battleship") {
      if (direction === "horizontal") {
        board[x][y].push(ship);
        board[x][y + 1].push(ship);
        board[x][y + 2].push(ship);
        board[x][y + 3].push(ship);
      } else {
        board[x][y].push(ship);
        board[x + 1][y].push(ship);
        board[x + 2][y].push(ship);
        board[x + 3][y].push(ship);
      }
    } else if (name === "cruiser" || name === "submarine") {
      if (direction === "horizontal") {
        board[x][y].push(ship);
        board[x][y + 1].push(ship);
        board[x][y + 2].push(ship);
      } else {
        board[x][y].push(ship);
        board[x + 1][y].push(ship);
        board[x + 2][y].push(ship);
      }
    } else if (name === "destroyer") {
      if (direction === "horizontal") {
        board[x][y].push(ship);
        board[x][y + 1].push(ship);
      } else {
        board[x][y].push(ship);
        board[x + 1][y].push(ship);
      }
    }
    return board;
  };
  this.reciveAttack = (x, y, board) => {
    // checks if ship is there
    if (!board[x][y].includes("miss") && board[x][y].length) {
      board[x][y][0].hitF(x, y);
      // checks if position is empty
    } else if (!board[x][y].length) {
      board[x][y].push("miss");
    }
    return board;
  };
  this.randomizeComputerBoard = () => {
    const directionArr = ["horizontal", "vertical"];
    let z = Math.floor(Math.random() * 2);
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (directionArr[z] === "horizontal") {
      while (y > 5) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    } else {
      while (x > 5) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    }
    this.placeShip(5, "carrier", x, y, this.computerBoard, directionArr[z]);

    z = Math.floor(Math.random() * 2);
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    if (directionArr[z] === "horizontal") {
      while (y > 4 || this.computerBoard[x][y].length || this.computerBoard[x][y + 1].length
        || this.computerBoard[x][y + 2].length || this.computerBoard[x][y + 3].length
        || this.computerBoard[x][y + 4].length) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    } else {
      while (x > 4 || this.computerBoard[x][y].length || this.computerBoard[x + 1][y].length
        || this.computerBoard[x + 2][y].length || this.computerBoard[x + 3][y].length) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    }
    this.placeShip(4, "battleship", x, y, this.computerBoard, directionArr[z]);

    z = Math.floor(Math.random() * 2);
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    if (directionArr[z] === "horizontal") {
      while (y > 3 || this.computerBoard[x][y].length || this.computerBoard[x][y + 1].length
        || this.computerBoard[x][y + 2].length) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    } else {
      while (x > 3 || this.computerBoard[x][y].length || this.computerBoard[x + 1][y].length
        || this.computerBoard[x + 2][y].length) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    }
    this.placeShip(3, "cruiser", x, y, this.computerBoard, directionArr[z]);

    if (directionArr[z] === "horizontal") {
      while (y > 3 || this.computerBoard[x][y].length || this.computerBoard[x][y + 1].length
        || this.computerBoard[x][y + 2].length) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    } else {
      while (x > 3 || this.computerBoard[x][y].length || this.computerBoard[x + 1][y].length
        || this.computerBoard[x + 2][y].length) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    }
    this.placeShip(3, "submarine", x, y, this.computerBoard, directionArr[z]);

    if (directionArr[z] === "horizontal") {
      while (y > 2 || this.computerBoard[x][y].length || this.computerBoard[x][y + 1].length) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    } else {
      while (x > 2 || this.computerBoard[x][y].length || this.computerBoard[x + 1][y].length) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    }
    this.placeShip(2, "destroyer", x, y, this.computerBoard, directionArr[z]);
  };
}

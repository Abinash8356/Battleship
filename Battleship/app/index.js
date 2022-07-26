
import "./style.css";
import GameBoard from "./factories/gameboard";
import Player from "./factories/player";

function renderGameBoard(player) {
  for (let i = 0; i < 10; i += 1) {
    const x = document.createElement("div");
    x.classList.add("x");
    x.style.width = "350px";
    x.style.height = "35px";
    const board = document.querySelector(`.${player}`);
    board.appendChild(x);
    for (let j = 0; j < 10; j += 1) {
      const y = document.createElement("div");
      y.classList.add("y");
      y.classList.add(`${player}`);
      y.setAttribute("id", `${player}${0 + i},${0 + j}`);
      y.style.width = "35px";
      y.style.height = "35px";
      x.appendChild(y);
    }
  }
}


renderGameBoard("player");
renderGameBoard("computer");

const playerGameboard = new GameBoard();


function renderShipPlaceBoard() {
  for (let i = 0; i < 10; i += 1) {
    const x = document.createElement("div");
    x.classList.add("place-x");
    x.style.width = "350px";
    x.style.height = "35px";
    const board = document.querySelector(".modal-board");
    board.appendChild(x);
    for (let j = 0; j < 10; j += 1) {
      const y = document.createElement("div");
      y.classList.add("place-y");
      y.setAttribute("id", `${0 + i},${0 + j}`);
      y.style.width = "35px";
      y.style.height = "35px";
      x.appendChild(y);
    }
  }
}

renderShipPlaceBoard();

const ships = document.querySelectorAll(".ship");
const squares = document.querySelectorAll(".place-y");
ships.forEach((ship) => {
  
  ship.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
  
  ship.addEventListener("dblclick", () => {
    if (!ship.classList.contains("vertical")) {
      ship.style.flexDirection = "column";
      ship.classList.remove("horizontal");
      ship.classList.add("vertical");
      if (ship.id === "carrier") {
        ship.style.height = "175px";
        ship.style.width = "35px";
      } else if (ship.id === "battleship") {
        ship.style.height = "140px";
        ship.style.width = "35px";
      } else if (ship.id === "cruiser" || ship.id === "submarine") {
        ship.style.height = "105px";
        ship.style.width = "35px";
      } else if (ship.id === "destroyer") {
        ship.style.height = "70px";
        ship.style.width = "35px";
      }
    } else if (ship.classList.contains("vertical")) {
      ship.style.flexDirection = "row";
      ship.classList.remove("vertical");
      ship.classList.add("horizontal");
      if (ship.id === "carrier") {
        ship.style.height = "35px";
        ship.style.width = "175px";
      } else if (ship.id === "battleship") {
        ship.style.height = "35px";
        ship.style.width = "140px";
      } else if (ship.id === "cruiser" || ship.id === "submarine") {
        ship.style.height = "35px";
        ship.style.width = "105px";
      } else if (ship.id === "destroyer") {
        ship.style.height = "35px";
        ship.style.width = "70  px";
      }
    }
  });
});


squares.forEach((square) => {
  square.addEventListener("dragenter", (e) => {
    e.target.classList.add("drag-over");
    e.preventDefault();
  });
  square.addEventListener("dragover", (e) => {
    e.target.classList.add("drag-over");
    e.preventDefault();
  });
  square.addEventListener("dragleave", (e) => {
    e.target.classList.remove("drag-over");
  });
  square.addEventListener("drop", (e) => {
    e.target.classList.remove("drag-over");

    
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);

    if (e.target.classList.value === "place-y") {
      // add ships to gameboard
      const x = parseInt(e.target.id.slice(0, 1), 10);
      const y = parseInt(e.target.id.slice(2), 10);
      
      if (draggable.classList.contains("horizontal")) {
        if (draggable.id === "carrier" && playerGameboard.board[0][y + 4]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(5, "carrier", x, y, playerGameboard.board, "horizontal");
        } else if (draggable.id === "battleship" && playerGameboard.board[0][y + 3]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(4, "battleship", x, y, playerGameboard.board, "horizontal");
        } else if (draggable.id === "cruiser" && playerGameboard.board[0][y + 2]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(3, "cruiser", x, y, playerGameboard.board, "horizontal");
        } else if (draggable.id === "submarine" && playerGameboard.board[0][y + 2]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(3, "submarine", x, y, playerGameboard.board, "horizontal");
        } else if (draggable.id === "destroyer" && playerGameboard.board[0][y + 1]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(2, "destroyer", x, y, playerGameboard.board, "horizontal");
        }
      } else if (draggable.classList.contains("vertical")) {
        if (draggable.id === "carrier" && playerGameboard.board[x + 4]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(5, "carrier", x, y, playerGameboard.board, "vertical");
        } else if (draggable.id === "battleship" && playerGameboard.board[x + 3]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(4, "battleship", x, y, playerGameboard.board, "vertical");
        } else if (draggable.id === "cruiser" && playerGameboard.board[x + 2]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(3, "cruiser", x, y, playerGameboard.board, "vertical");
        } else if (draggable.id === "submarine" && playerGameboard.board[x + 2]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(3, "submarine", x, y, playerGameboard.board, "vertical");
        } else if (draggable.id === "destroyer" && playerGameboard.board[x + 1]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(2, "destroyer", x, y, playerGameboard.board, "vertical");
        }
      }
    }
  });
});

const shipsContainer = document.querySelector(".ships");
shipsContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});
shipsContainer.addEventListener("drop", (e) => {
  
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);

  
  if (e.target.classList.value === "ships") {
    e.target.appendChild(draggable);
  }
});

const start = document.querySelector(".start");
start.addEventListener("click", () => {
  if (!shipsContainer.children.length) {
    const placeShipsModal = document.querySelector(".place-ships-modal");
    placeShipsModal.style.display = "none";
    playerGameboard.board.forEach((ex) => {
      ex.forEach((ey) => {
        if (ey.length) {
          const ship = document.getElementById(`player${playerGameboard.board.indexOf(ex)},${ex.indexOf(ey)}`);
          ship.style.backgroundColor = "rgb(163, 163, 163)";
        }
      });
    });
  }
});


const computerGameboard = new GameBoard();
computerGameboard.randomizeComputerBoard();

function computerAttack() {
  
  let player = new Player();

  let playerSquare = playerGameboard.board[player.x][player.y];
  let playerDomSquare = document.getElementById(`player${player.x},${player.y}`);
  
  if (!playerSquare.includes("miss") && playerSquare.length && !playerSquare[0].hit.find((hitF) => hitF[0] === player.x && hitF[1] === player.y)) {
    playerDomSquare.style.backgroundColor = "rgb(255, 133, 133)";
    player.computerRandomAttack(playerGameboard.board);
    
  } else if (!playerSquare.includes("miss") && !playerSquare.length) {
    playerDomSquare.style.backgroundColor = "rgb(133, 255, 179)";
    player.computerRandomAttack(playerGameboard.board);
    
  } else {
    let expression;
    
    if (playerSquare[0] !== "miss") {
      expression = playerSquare[0].hit.find((hitF) => hitF[0] === player.x
      && hitF[1] === player.y);
    }
    while ((playerSquare.length && playerSquare.includes("miss")) || (playerSquare.length && expression)) {
      
      player = new Player();
      console.log(player.x, player.y);
      playerSquare = playerGameboard.board[player.x][player.y];
      
      if (!playerSquare.includes("miss") && playerSquare.length) {
        
        expression = playerSquare[0].hit.find((hitF) => hitF[0] === player.x
        && hitF[1] === player.y);
      }
    }
    playerDomSquare = document.getElementById(`player${player.x},${player.y}`);
    
    if (!playerSquare.includes("miss") && playerSquare.length) {
      playerDomSquare.style.backgroundColor = "rgb(255, 133, 133)";
      player.computerRandomAttack(playerGameboard.board);
    
    } else if (!playerSquare.includes("miss") && !playerSquare.length) {
      playerDomSquare.style.backgroundColor = "rgb(133, 255, 179)";
      player.computerRandomAttack(playerGameboard.board);
    }
  }
}

function isGameOver(gameboard, someBoard, player) {
  const win = document.querySelector(".win");
  const modal = document.querySelector(".modal");
  let carrierIsSunk;
  let battleshipIsSunk;
  let cruiserIsSunk;
  let submarineIsSunk;
  let destroyerIsSunk;
  const board = `${[someBoard]}`;
  gameboard[board].forEach((row) => {
    row.forEach((square) => {
      if (square.length && !square.includes("miss")) {
        if (square[0].name === "carrier" && square[0].isSunk() === true) {
          carrierIsSunk = true;
        } else if (square[0].name === "battleship" && square[0].isSunk() === true) {
          battleshipIsSunk = true;
        } else if (square[0].name === "cruiser" && square[0].isSunk() === true) {
          cruiserIsSunk = true;
        } else if (square[0].name === "submarine" && square[0].isSunk() === true) {
          submarineIsSunk = true;
        } else if (square[0].name === "destroyer" && square[0].isSunk() === true) {
          destroyerIsSunk = true;
        }
      }
    });
  });
  if (carrierIsSunk && battleshipIsSunk && cruiserIsSunk && submarineIsSunk && destroyerIsSunk && modal.style.display !== "block") {
    
    player === "player" ? win.textContent = "You Win" : win.textContent = "Computer Wins";
    modal.style.display = "block";
  }
}

computerGameboard.computerBoard.forEach((row) => {
  row.forEach((square) => {
    const x = computerGameboard.computerBoard.indexOf(row);
    const y = row.indexOf(square);
    const div = document.getElementById(`computer${x},${y}`);
    div.addEventListener("click", () => {
      
      if (!square.includes("miss") && square.length && !square[0].hit.find((hitF) => hitF[0] === x && hitF[1] === y)) {
        div.style.backgroundColor = "rgb(255, 133, 133";
        computerGameboard.reciveAttack(x, y, computerGameboard.computerBoard);
        console.log(computerGameboard.computerBoard);

        isGameOver(computerGameboard, "computerBoard", "player");

        
        if (square[0].isSunk()) {
          
          computerGameboard.computerBoard.forEach((xRow) => {
            xRow.forEach((ySquare) => {
              
              if (!ySquare.includes("miss") && ySquare.length) {
                
                if (ySquare[0].isSunk()) {
                  const ship = document.getElementById(`computer${computerGameboard.computerBoard.indexOf(xRow)},${xRow.indexOf(ySquare)}`);
                  ship.style.backgroundColor = "rgb(163, 163, 163)";
                }
              }
            });
          });
        }
        
        computerAttack();

        isGameOver(playerGameboard, "board", "computer");

        
      } else if (!square.includes("miss") && !square.length) {
       
        div.style.backgroundColor = "rgb(133, 255, 179)";
        computerGameboard.reciveAttack(x, y, computerGameboard.computerBoard);

        isGameOver(computerGameboard, "computerBoard", "player");

        
        computerAttack();

        isGameOver(playerGameboard, "board", "computer");
      }
    });
  });
});

const playAgain = document.querySelector(".play-again");

playAgain.addEventListener("click", () => {
  
  location.reload();
});

// const array = [[7, 8], [7, 7]];

// console.log(array.find((hitF) => hitF.includes(7) && hitF.includes(7)));

import GameBoard from "./gameboard";

const gameboard = new GameBoard();

export default function Player() {
  this.turn = "player";
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
  console.log(this.x, this.y);
  this.computerRandomAttack = (board) => {
    this.turn = "computer";
    gameboard.reciveAttack(this.x, this.y, board);
  };
}

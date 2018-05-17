class Game {
  constructor() {
    this.playerX = new Player('X');
    this.playerO = new Player('O');
    this.activePlayer = this.playerO;
    this.boardGrid = this.newBoardGrid();
  }

  newBoardGrid() {
    this.boardGrid = [[null, null, null], [null, null, null], [null, null, null]];
  }

  switchPlayers() {
    this.activePlayer = this.activePlayer === this.playerO ? this.playerX : this.playerO;
  }
}

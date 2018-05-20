class Game {
  constructor() {
    this.playerX = new Player('X');
    this.playerO = new Player('O');
    this.activePlayer = this.playerO;
    this.occupiedBoxes = [];
  }

  switchPlayers() {
    this.activePlayer = this.activePlayer === this.playerO ? this.playerX : this.playerO;
  }

  // TODO: See if player is needed
  occupyBox(boxId, player) {
    this.occupiedBoxes.push(boxId);
  }

  boxIsEmpty(boxId) {
    return !this.occupiedBoxes.includes(boxId);
  }
}

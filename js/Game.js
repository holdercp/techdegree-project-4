// Handles game logic
class Game {
  constructor() {
    this.playerX = new Player('X');
    this.playerO = new Player('O');
    this.activePlayer = this.playerO;
    this.occupiedBoxes = [];
    this.winningSequences = [
      // Horizontal
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      // Vertical
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['3', '6', '9'],
      // Diagonal
      ['1', '5', '9'],
      ['3', '5', '7'],
    ];
  }

  switchPlayers() {
    this.activePlayer = this.activePlayer === this.playerO ? this.playerX : this.playerO;
  }

  occupyBox(boxId, player) {
    this.occupiedBoxes.push(boxId);
    player.occupyBox(boxId);
  }

  boxIsEmpty(boxId) {
    return !this.occupiedBoxes.includes(boxId);
  }

  checkForWin() {
    return this.winningSequences.some(sequence =>
      sequence.every(boxId => this.activePlayer.occupiedBoxes.includes(boxId)));
  }

  checkForTie() {
    return this.occupiedBoxes.length === 9;
  }
}

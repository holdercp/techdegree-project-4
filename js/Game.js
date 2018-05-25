// Removes a specific elem from an array
function removeFromArray(arr, elem) {
  const index = arr.indexOf(elem);

  if (index !== -1) {
    arr.splice(index, 1);
  }
}

class Game {
  constructor(computerPlayer) {
    this.playerO = new Player('O');
    this.playerX = new Player('X', computerPlayer);
    this.activePlayer = this.playerO;
    this.openBoxes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
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

  // Add the clicked box to both the player's occupied boxes and the game's
  occupyBox(boxId, player) {
    removeFromArray(this.openBoxes, boxId);
    this.occupiedBoxes.push(boxId);
    player.occupyBox(boxId);
  }

  boxIsEmpty(boxId) {
    return !this.occupiedBoxes.includes(boxId);
  }

  selectComputerMove() {
    return this.openBoxes[Math.floor(Math.random() * this.openBoxes.length)];
  }

  // Checks if the player has a winning sequence of occupied boxes
  checkForWin() {
    const winningSequence = sequence =>
      sequence.every(boxId => this.activePlayer.occupiedBoxes.includes(boxId));

    return this.winningSequences.some(winningSequence);
  }

  // This should be called only after checkForWin()
  checkForTie() {
    return this.occupiedBoxes.length === 9;
  }
}

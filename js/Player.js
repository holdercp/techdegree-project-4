class Player {
  constructor(icon, computerPlayer = false) {
    this.icon = icon.toUpperCase();
    this.computerPlayer = computerPlayer;

    if (this.icon === 'O') {
      this.id = 'player1';
      this.name = 'Player 1';
      this.iconImg = 'img/o.svg';
    } else {
      this.id = 'player2';
      this.name = this.computerPlayer ? 'HAL' : 'Player 2';
      this.iconImg = 'img/x.svg';
    }

    this.occupiedBoxes = [];
  }

  occupyBox(boxId) {
    this.occupiedBoxes.push(boxId);
  }
}

class Player {
  constructor(icon) {
    this.icon = icon.toUpperCase();

    if (this.icon === 'O') {
      this.id = 'player1';
      this.name = 'Player 1';
      this.iconImg = 'img/o.svg';
    } else {
      this.id = 'player2';
      this.name = 'Player 2';
      this.iconImg = 'img/x.svg';
    }

    this.occupiedBoxes = [];
  }

  occupyBox(boxId) {
    this.occupiedBoxes.push(boxId);
  }
}

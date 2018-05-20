class Player {
  constructor(icon) {
    this.icon = icon.toUpperCase();
    this.iconImg = this.icon === 'X' ? 'img/x.svg' : 'img/o.svg';
    this.occupiedBoxes = [];
  }

  occupyBox(boxId) {
    this.occupiedBoxes.push(boxId);
  }
}

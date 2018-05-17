class Player {
  constructor(icon) {
    this.icon = icon.toUpperCase();
    this.iconImg = this.icon === 'X' ? 'img/x.svg' : 'img/o.svg';
  }
}

class Player {
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
    this.iconImg = `/img/${this.icon.toLowerCase()}.svg`;
  }
}

export default Player;

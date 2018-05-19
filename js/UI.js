const UI = {
  body: document.querySelector('body'),
  activeScreen: document.getElementById('board'),

  renderScreens() {
    const startHTML = `
      <div class="screen screen-start" id="start" style="display: none;">
        <header>
          <h1>Tic Tac Toe</h1>
          <a href="#" class="button">Start game</a>
        </header>
      </div>`;

    const winHTML = `
      <div class="screen screen-win" id="finish" style="display: none;">
        <header>
          <h1>Tic Tac Toe</h1>
          <p class="message"></p>
          <a href="#" class="button">New game</a>
        </header>
      </div>`;

    this.body.insertAdjacentHTML('beforeend', startHTML);
    this.body.insertAdjacentHTML('beforeend', winHTML);
  },

  startGameHandler(screen) {
    screen.addEventListener('click', (e) => {
      if (e.target.className === 'button') {
        this.displayScreen('board');
        game = new Game();
        this.hilightPlayer(game.activePlayer);
        this.addHandlers();
      }
    });
  },

  displayScreen(id) {
    const screen = document.getElementById(id);
    screen.style = 'display: block;';
    this.activeScreen.style = 'display: none;';
    this.activeScreen = screen;
    this.startGameHandler(screen);
  },

  hilightPlayer(player) {
    if (player.icon === 'O') {
      document.getElementById('player1').classList.add('active');
      document.getElementById('player2').classList.remove('active');
    } else {
      document.getElementById('player2').classList.add('active');
      document.getElementById('player1').classList.remove('active');
    }
  },

  clickBoxHandler(e) {
    game.switchPlayers();
    UI.hilightPlayer(game.activePlayer);
  },

  hoverBoxHandler(e) {
    if (e.type === 'mouseover') {
      e.target.style.backgroundImage = `url(${game.activePlayer.iconImg})`;
    }
    if (e.type === 'mouseout') e.target.style.backgroundImage = '';
  },

  addHandlers() {
    document.querySelectorAll('.box').forEach((box) => {
      box.addEventListener('mouseover', this.hoverBoxHandler);
      box.addEventListener('mouseout', this.hoverBoxHandler);
      box.addEventListener('click', this.clickBoxHandler);
    });
  },
};

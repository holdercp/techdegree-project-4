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
    if (game.boxIsEmpty(e.target.id)) {
      // Add UI classes
      const boxFilledClass = game.activePlayer.icon === 'O' ? 'box-filled-1' : 'box-filled-2';
      e.target.classList.add(boxFilledClass);

      // Keep track of who occupies the box
      game.occupyBox(e.target.id, game.activePlayer);

      // Check for win
      if (game.checkForWin()) {
        console.log('Win!');
      } else if (game.checkForTie()) {
        console.log('Tie!');
      }

      // Take care of rest of turn
      game.switchPlayers();
      UI.hilightPlayer(game.activePlayer);
    }
  },

  hoverBoxHandler(e) {
    if (game.boxIsEmpty(e.target.id)) {
      switch (e.type) {
        case 'mouseover':
          e.target.style.backgroundImage = `url(${game.activePlayer.iconImg})`;
          break;
        case 'mouseout':
          e.target.style.backgroundImage = '';
          break;
        default:
          break;
      }
    }
  },

  addHandlers() {
    document.querySelectorAll('.box').forEach((box) => {
      box.addEventListener('mouseover', this.hoverBoxHandler);
      box.addEventListener('mouseout', this.hoverBoxHandler);
      box.addEventListener('click', this.clickBoxHandler);
    });
  },
};

const UI = {
  body: document.querySelector('body'),
  activeScreen: document.getElementById('board'),

  startHTML: `
    <div class="screen screen-start" id="start" style="display: none;">
      <header>
        <h1>Tic Tac Toe</h1>
        <a href="#" class="button">Start game</a>
      </header>
    </div>`,

  winHTML: `
    <div class="screen screen-win" id="finish" style="display: none;">
      <header>
        <h1>Tic Tac Toe</h1>
        <p class="message"></p>
        <a href="#" class="button">New game</a>
      </header>
    </div>`,

  renderScreens() {
    this.body.insertAdjacentHTML('afterbegin', this.winHTML);
    this.body.insertAdjacentHTML('afterbegin', this.startHTML);
  },

  startGameHandler(screen) {
    screen.addEventListener('click', (e) => {
      if (e.target.className === 'button') {
        UI.reset();
        UI.displayScreen('board');
        game = new Game();
        UI.hilightPlayer(game.activePlayer);
        UI.addHandlers();
      }
    });
  },

  displayScreen(id) {
    const screen = document.getElementById(id);
    this.activeScreen.style = 'display: none;';
    screen.style = 'display: block;';
    this.activeScreen = screen;
    if (screen.querySelector('.button')) this.startGameHandler(screen);
  },

  reset() {
    // Clears classes on finish screen
    document.getElementById('finish').className = 'screen screen-win';

    // Clear classes and bg imgs on boxes
    document.querySelectorAll('.box').forEach((box) => {
      box.className = 'box';
      box.style.backgroundImage = '';
    });
  },

  updateFinishScreen(gameWinner) {
    const screen = document.getElementById('finish');
    const message = screen.querySelector('.message');
    if (gameWinner === 'tie') {
      message.textContent = "It's a Tie!";
    } else {
      message.textContent = 'Winner!';
    }
    screen.classList.add(`screen-win-${gameWinner}`);
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
        UI.updateFinishScreen(game.activePlayer.icon === 'O' ? 'one' : 'two');
        UI.displayScreen('finish');
      } else if (game.checkForTie()) {
        UI.updateFinishScreen('tie');
        UI.displayScreen('finish');
      } else {
        // Take care of rest of turn
        game.switchPlayers();
        UI.hilightPlayer(game.activePlayer);
      }
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

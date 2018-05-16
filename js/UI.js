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
};

const UI = {
  body: document.querySelector('body'),
  activeView: document.getElementById('board'),

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
        this.displayView('board');
        game = new Game();
      }
    });
  },

  displayView(id) {
    const view = document.getElementById(id);
    view.style = 'display: block;';
    this.activeView.style = 'display: none;';
    this.activeView = view;
    this.startGameHandler(view);
  },
};

const UI = {
  body: document.querySelector('body'),

  startHTML: `
    <div class="screen screen-start" id="start">
      <header>
        <h1>Tic Tac Toe</h1>
        <a href="#" class="button">Start game</a>
      </header>
    </div>`,

  winHTML: `
    <div class="screen screen-win" id="finish">
      <header>
        <h1>Tic Tac Toe</h1>
        <p class="message"></p>
        <a href="#" class="button">New game</a>
      </header>
    </div>`,

  renderScreen(html, id, hide = false) {
    this.body.insertAdjacentHTML('beforeend', html);
    if (hide) this.hide(id);
    this.startGameHandler(id);
  },

  startGameHandler(id) {
    const screen = document.getElementById(id);
    screen.addEventListener('click', (e) => {
      if (e.target.className === 'button') {
        this.hide(id);
        this.show('board');
        game = new Game();
      }
    });
  },

  show(id) {
    const screen = document.getElementById(id);
    screen.style = 'display: block;';
  },

  hide(id) {
    const screen = document.getElementById(id);
    screen.style = 'display: none;';
  },
};

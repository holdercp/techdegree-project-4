const UI = {
  body: document.querySelector('body'),
  activeScreen: document.getElementById('start'),
  boardHTML: `
    <div class="board" id="board">
      <header>
        <h1>Tic Tac Toe</h1>
        <ul>
          <li class="players" id="player1">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-200.000000, -60.000000)" fill="#000000">
                  <g transform="translate(200.000000, 60.000000)">
                    <path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </li>
          <li class="players" id="player2">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-718.000000, -60.000000)" fill="#000000">
                  <g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)">
                    <path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </li>
        </ul>
      </header>
      <ul class="boxes">
        <li id="1" class="box"></li>
        <li id="2" class="box"></li>
        <li id="3" class="box"></li>
        <li id="4" class="box"></li>
        <li id="5" class="box"></li>
        <li id="6" class="box"></li>
        <li id="7" class="box"></li>
        <li id="8" class="box"></li>
        <li id="9" class="box"></li>
      </ul>
    </div>
  `,

  startHTML: `
    <div class="screen screen-start" id="start" style="display: none;>
      <header>
        <h1>Tic Tac Toe</h1>
        <a href="#" class="button">Start game</a>
      </header>
    </div>`,

  winHTML: `
    <div class="screen screen-win" id="finish" style="display: none;>
      <header>
        <h1>Tic Tac Toe</h1>
        <p class="message"></p>
        <a href="#" class="button">New game</a>
      </header>
    </div>`,

  renderScreens() {
    this.body.insertAdjacentHTML('beforeend', this.boardHTML);
    this.body.insertAdjacentHTML('beforeend', this.startHTML);
    this.body.insertAdjacentHTML('beforeend', this.winHTML);
  },

  startGameHandler(screen) {
    screen.addEventListener('click', (e) => {
      if (e.target.className === 'button') {
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
    this.startGameHandler(screen);
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
      console.log(game.activePlayer);

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

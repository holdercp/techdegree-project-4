const UI = {
  body: document.querySelector('body'),
  activeScreen: document.getElementById('board'),

  startHTML: `
    <div class="screen screen-start" id="start" style="display: none;">
      <header>
        <h1>Tic Tac Toe</h1>
        <div class="player-name-container">
          <div class="player-name">
            <label for="player1Name" class="player-name__label">Player 1 Name</label>
            <input id="player1Name" type="text" class="player-name__input">
          </div>
          <div class="player-name">
            <label for="player2Name" class="player-name__label">Player 2 Name</label>
            <input id="player2Name" type="text" class="player-name__input">

            <label for="computerPlayer" class="computer-player__label">Computer Player</label>
            <input id="computerPlayer" type="checkbox" class="computer-player__checkbox">
          </div>
        </div>
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

  displayScreen(id) {
    const screen = document.getElementById(id);
    this.activeScreen.style = 'display: none;';
    screen.style = 'display: block;';
    this.activeScreen = screen;
  },

  updateFinishScreen(gameWinner) {
    const screen = document.getElementById('finish');
    const message = screen.querySelector('.message');
    if (gameWinner === 'tie') {
      message.textContent = "It's a Tie!";
    } else {
      message.textContent = `${UI.game.activePlayer.name} Wins!`;
    }
    screen.classList.add(`screen-win-${gameWinner}`);
  },

  reset() {
    // Resets classes on finish screen
    document.getElementById('finish').className = 'screen screen-win';

    // Reset classes, bg imgs, and enables clicks on boxes
    document.querySelectorAll('.box').forEach((box) => {
      box.className = 'box';
      box.style.backgroundImage = '';
      box.style.pointerEvents = 'initial';
    });
  },

  hilightPlayer(player) {
    const hilightedBox = document.querySelector('.active');
    if (hilightedBox) hilightedBox.classList.remove('active');
    document.getElementById(player.id).classList.add('active');
  },

  enableBox(boxId) {
    document.getElementById(boxId).style.pointerEvents = 'initial';
  },

  disableBox(boxId) {
    document.getElementById(boxId).style.pointerEvents = 'none';
  },

  startGameHandler() {
    const player1Name = document.getElementById('player1Name').value;
    const player2Name = document.getElementById('player2Name').value;
    const computerPlayer = document.getElementById('computerPlayer').checked;

    UI.game = new Game(computerPlayer);

    if (player1Name) UI.game.playerO.name = player1Name;
    if (player2Name && !computerPlayer) UI.game.playerX.name = player2Name;

    document.getElementById('player1').querySelector('.player-name__display').textContent =
      UI.game.playerO.name;
    document.getElementById('player2').querySelector('.player-name__display').textContent =
      UI.game.playerX.name;

    UI.reset();
    UI.displayScreen('board');
    UI.hilightPlayer(UI.game.activePlayer);
  },

  clickBoxHandler(e) {
    if (UI.game.boxIsEmpty(e.target.id)) {
      // Add UI classes
      const boxFilledClass =
        UI.game.activePlayer.id === 'player1' ? 'box-filled-1' : 'box-filled-2';
      e.target.classList.add(boxFilledClass);

      // Keep track of who occupies the box
      UI.game.occupyBox(e.target.id, UI.game.activePlayer);

      // Check for win
      if (UI.game.checkForWin()) {
        UI.updateFinishScreen(UI.game.activePlayer.id === 'player1' ? 'one' : 'two');
        UI.displayScreen('finish');
      } else if (UI.game.checkForTie()) {
        UI.updateFinishScreen('tie');
        UI.displayScreen('finish');
      } else {
        // Take care of rest of turn
        UI.game.switchPlayers();
        UI.hilightPlayer(UI.game.activePlayer);

        if (UI.game.activePlayer.computerPlayer) {
          const boxId = UI.game.selectComputerMove();
          UI.game.openBoxes.forEach(UI.disableBox);
          window.setTimeout(() => {
            document.getElementById(boxId).click();
          }, 500);
        } else {
          UI.game.openBoxes.forEach(UI.enableBox);
        }
      }
    }
  },

  hoverBoxHandler(e) {
    if (UI.game.boxIsEmpty(e.target.id)) {
      switch (e.type) {
        case 'mouseover':
          e.target.style.backgroundImage = `url(${UI.game.activePlayer.iconImg})`;
          break;
        case 'mouseout':
          e.target.style.backgroundImage = '';
          break;
        default:
          break;
      }
    }
  },

  computerPlayerHandler(e) {
    const player2NameInput = document.getElementById('player2Name');
    if (e.target.checked) {
      player2NameInput.setAttribute('disabled', 'disabled');
    } else {
      player2NameInput.removeAttribute('disabled');
    }
  },

  addHandlers() {
    document.querySelectorAll('.box').forEach((box) => {
      box.addEventListener('mouseover', this.hoverBoxHandler);
      box.addEventListener('mouseout', this.hoverBoxHandler);
      box.addEventListener('click', this.clickBoxHandler);
    });

    document.querySelectorAll('.button').forEach((button) => {
      button.addEventListener('click', this.startGameHandler);
    });

    document
      .getElementById('computerPlayer')
      .addEventListener('change', this.computerPlayerHandler);
  },
};

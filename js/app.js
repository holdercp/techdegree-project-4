(function runGame() {
  let game;

  UI.hide('board');
  UI.renderScreen(UI.startHTML, 'start');
  UI.renderScreen(UI.winHTML, 'finish', true);
}());

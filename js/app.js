(function runGame() {
  // Create global for game instance
  let game;

  UI.renderScreens();
  UI.addGameHandlers();
  UI.displayScreen('start');
}());

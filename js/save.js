// Load game state
function loadGame() {
  const saved = localStorage.getItem("europaIncrementalis");
  if (saved) {
    Object.assign(game, JSON.parse(saved));
    game.lastUpdate = Date.now(); // Prevent time exploits
  }
}

// Save game state
function saveGame() {
  localStorage.setItem("europaIncrementalis", JSON.stringify(game));
}

// Auto-save every 30 seconds
setInterval(saveGame, 30000);

// Load on startup
loadGame();
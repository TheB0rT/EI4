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

document.getElementById("reset").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all progress?")) {
    // Clear saved data
    localStorage.removeItem("europaIncrementalis");
    
    // Reset game state to defaults
    Object.assign(game, {
      gold: 10,
      goldPerSecond: 0.5,
      manpower: 1000,
      manpowerPerSecond: 0.3,
      provinces: 1,
      lastUpdate: Date.now()
    });
    
    // Force UI update
    updateUI();
    console.log("Game reset complete!");
  }
});
// Core game state
const game = {
  gold: 10,
  goldPerSecond: 0.5,
  provinces: 1,
  lastUpdate: Date.now()
};

// Main game loop
let lastUIUpdate = 0;

function gameLoop() {
  const now = Date.now();
  const deltaTime = (now - game.lastUpdate) / 1000;
  game.lastUpdate = now;
  
  game.gold += game.goldPerSecond * deltaTime;

  // Update UI max 10 times/sec (smoother but efficient)
  if (now - lastUIUpdate > 100) {
    updateUI();
    lastUIUpdate = now;
  }
  
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
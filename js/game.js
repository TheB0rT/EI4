const game = {
  gold: 10,
  goldPerSecond: 0.5,
  manpower: 1000,
  manpowerPerSecond: 1,
  provinces: 1,
  lastUpdate: Date.now()
};

function gameLoop() {
  const now = Date.now();
  const deltaTime = (now - game.lastUpdate) / 1000;
  game.lastUpdate = now;
  
  game.gold += game.goldPerSecond * deltaTime;
  game.manpower += game.manpowerPerSecond * deltaTime;
  updateUI(); // Now works!
  requestAnimationFrame(gameLoop);
}

gameLoop();
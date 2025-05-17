window.game = {
  gold: 10,
  goldPerSecond: 0.5,
  manpower: 1000,
  manpowerPerSecond: 0.3,
  provinces: 1,
  lastUpdate: Date.now()
};

function gameLoop() {
  const now = Date.now();
  const deltaTime = (now - game.lastUpdate) / 1000;
  game.lastUpdate = now;
  
  game.gold += game.goldPerSecond * deltaTime;
  const manpowerIncrease = game.manpowerPerSecond * deltaTime;
game.manpower += manpowerIncrease;
  updateUI(); // Now works!
  requestAnimationFrame(gameLoop);
}

gameLoop();
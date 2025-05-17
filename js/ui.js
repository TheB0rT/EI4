function updateUI() {
  document.getElementById("gold").textContent = game.gold.toFixed(1);
  document.getElementById("gps").textContent = game.goldPerSecond.toFixed(1);
  document.getElementById("provinces").textContent = game.provinces;
}

// Initialize buttons
document.getElementById("tax").addEventListener("click", () => {
  game.gold += 1;
  updateUI();
});

document.getElementById("conquer").addEventListener("click", () => {
  if (game.gold >= 50) {
    game.gold -= 50;
    game.provinces++;
    game.goldPerSecond += 0.5;
    updateUI();
  }
});

// Confirm UI loaded
console.log("UI initialized");
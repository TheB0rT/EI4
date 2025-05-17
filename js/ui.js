let lastManpower = 0;
const manpowerElement = document.getElementById("manpower");
  manpowerElement.textContent = Math.floor(game.manpower);
  
  // Show +1 effect when manpower increases
  if (Math.floor(game.manpower) > Math.floor(lastManpower)) {
    const popup = document.createElement("div");
    popup.textContent = "+1";
    popup.className = "manpower-popup";
    manpowerElement.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
  }
  lastManpower = game.manpower;
}
function updateUI() {
  document.getElementById("gold").textContent = game.gold.toFixed(1);
  document.getElementById("gps").textContent = game.goldPerSecond.toFixed(1);
  document.getElementById("manpower").textContent = game.manpower.toFixed(0);
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
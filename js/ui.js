let lastManpower = 0;

function updateUI() {
  document.getElementById("gold").textContent = game.gold.toFixed(1);
  document.getElementById("gps").textContent = game.goldPerSecond.toFixed(1);
  document.getElementById("manpower").textContent = game.manpower.toFixed(0);
  document.getElementById("provinces").textContent = game.provinces;
}

// In updateUI():
const currentManpower = Math.floor(game.manpower);
  document.getElementById("manpower").textContent = currentManpower;

// +1 Popup Effect
if (Math.floor(game.manpower) > Math.floor(lastManpower)) {
  const popup = document.createElement("div");
  popup.textContent = "+1";
  popup.className = "manpower-popup";
  document.querySelector(".manpower-container").appendChild(popup);
  setTimeout(() => popup.remove(), 1000);
}
lastManpower = game.manpower;


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
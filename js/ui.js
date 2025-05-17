let lastManpower = game.manpower;

function updateUI() {
  // Update all displays
  document.getElementById("gold").textContent = Math.floor(game.gold);
  document.getElementById("manpower").textContent = Math.floor(game.manpower);
  document.getElementById("provinces").textContent = game.provinces;
  
   // Update tooltips
  document.getElementById("gold-box").title = `Gold per second: ${game.goldPerSecond.toFixed(1)}`;
  document.getElementById("manpower-box").title = `Manpower per second: ${game.manpowerPerSecond.toFixed(1)}`;
 
  // Manpower display with popup logic
  const currentManpower = Math.floor(game.manpower);
  document.getElementById("manpower").textContent = currentManpower;

  // Popup effect
  const currentManpower = Math.floor(game.manpower);
  if (currentManpower > Math.floor(lastManpower)) {
    const popup = document.createElement("div");
    popup.textContent = `+${currentManpower - Math.floor(lastManpower)}`;
    popup.className = "manpower-popup";
    document.querySelector(".manpower-popups").innerHTML = '';
    document.querySelector(".manpower-popups").appendChild(popup);
  }
  lastManpower = game.manpower;
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
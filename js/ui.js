function updateUI() {
    document.getElementById("gold").textContent = Math.floor(game.gold);
    document.getElementById("manpower").textContent = Math.floor(game.manpower);
    document.getElementById("monarch-points").textContent = Math.floor(game.monarchPoints);
    document.getElementById("province-count").textContent = game.provinces;
    document.getElementById("gps").textContent = game.goldPerSecond.toFixed(1); // Show 1 decimal
}
// Button Actions
document.getElementById("conquer-province").addEventListener("click", () => {
    if (game && game.gold >= 50) {
        game.gold -= 50;
        game.provinces += 1;
        game.goldPerSecond += 0.5;
        updateUI();
    }
});

document.getElementById("tax-province").addEventListener("click", () => {
    if (game) {
        game.gold += 1;
        updateUI();
    }
});
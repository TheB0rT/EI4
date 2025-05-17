function saveGame() {
    if (!game) return;
    localStorage.setItem("europaIncrementalisSave", JSON.stringify(game));
}

function loadGame() {
    const save = localStorage.getItem("europaIncrementalisSave");
    if (save) {
        try {
            const parsed = JSON.parse(save);
            // Validate loaded game
            if (typeof parsed.gold === 'number' && typeof parsed.goldPerSecond === 'number') {
                game = parsed;
                game.lastUpdate = Date.now(); // Prevent time exploit
                updateUI();
                return true;
            }
        } catch (e) {
            console.error("Failed to load save", e);
        }
    }
    return false;
}

// Auto-save every 30 seconds
setInterval(saveGame, 30000);
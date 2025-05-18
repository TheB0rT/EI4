// save.js - Updated reset handler
function initializeSaveSystem() {
    if (!window.gameAPI?.state) {
        setTimeout(initializeSaveSystem, 100);
        return;
    }

    const game = window.gameAPI.state;

    function loadGame() {
        try {
            const saved = localStorage.getItem("europaIncrementalis");
            if (saved) {
                const parsed = JSON.parse(saved);
                Object.assign(game, {
                    gold: parsed.gold || 10,
                    manpower: parsed.manpower || 1000,
                    provinces: parsed.provinces || 1,
                    goldPerSecond: parsed.goldPerSecond || 0.5,
                    manpowerPerSecond: parsed.manpowerPerSecond || 0.5,
                    lastUpdate: Date.now()
                });
                console.log("Loaded saved game");
            }
        } catch (e) {
            console.error("Failed to load save:", e);
            localStorage.removeItem("europaIncrementalis");
        }
    }

    function saveGame() {
        const saveData = {
            version: 2,
            gold: game.gold,
            manpower: game.manpower,
            provinces: game.provinces,
            goldPerSecond: game.goldPerSecond,
            manpowerPerSecond: game.manpowerPerSecond,
            timestamp: Date.now()
        };
        localStorage.setItem("europaIncrementalis", JSON.stringify(saveData));
    }

    setInterval(saveGame, 30000);

    document.getElementById("reset").addEventListener("click", () => {
        if (confirm("Reset all progress?")) {
            localStorage.removeItem("europaIncrementalis");
            window.gameAPI.resetGame();
            if (typeof game.updateUI === 'function') {
                game.updateUI();
            }
        }
    });

    loadGame();
    console.log("Save system initialized");
}

initializeSaveSystem();
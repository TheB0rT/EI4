// ui.js - User Interface
document.addEventListener("DOMContentLoaded", function() {
    // Wait for gameAPI to be ready
    const initInterval = setInterval(() => {
        if (window.gameAPI?.state) {
            clearInterval(initInterval);
            initializeUI();
        }
    }, 100);

    function initializeUI() {
        const game = window.gameAPI.state;
        let lastManpower = game.manpower;

        function updateTaxButton() {
            const goldGain = 1 * game.provinces;
            const taxBtn = document.getElementById("tax");
            taxBtn.textContent = `Tax Province (+${goldGain} Gold)`;
            taxBtn.title = `Collect taxes from all provinces (Gains ${goldGain} Gold)`;
        }

        // Register UI update callback
        game.updateUI = function() {
            document.getElementById("gold").textContent = Math.floor(game.gold);
            document.getElementById("manpower").textContent = Math.floor(game.manpower);
            document.getElementById("provinces").textContent = game.provinces;
            
            // Update tooltips
            document.getElementById("gold-box").title = `Gold/sec: ${game.goldPerSecond.toFixed(1)}`;
            document.getElementById("manpower-box").title = `Manpower/sec: ${game.manpowerPerSecond.toFixed(1)}`;
            
            // Handle popups
            if (Math.floor(game.manpower) > Math.floor(lastManpower)) {
                const popup = document.createElement("div");
                popup.className = "manpower-popup";
                popup.textContent = `+${Math.floor(game.manpower) - Math.floor(lastManpower)}`;
                document.querySelector(".manpower-popups").innerHTML = '';
                document.querySelector(".manpower-popups").appendChild(popup);
            }
            lastManpower = game.manpower;
            
            // Update tax button whenever UI updates
            updateTaxButton();
        };

        // Button handlers
        document.getElementById("tax").addEventListener("click", () => {
            const goldGain = 1 * game.provinces;
            game.gold += goldGain;
            game.updateUI();
        });

        document.getElementById("conquer").addEventListener("click", () => {
            if (game.gold >= 50 && game.manpower >= 200) {
                game.gold -= 50;
                game.manpower -= 200;
                game.provinces++;
                game.goldPerSecond += 0.5;
                game.manpowerPerSecond += 0.5;
                game.updateUI();
            }
        });

        // Initial UI update
        updateTaxButton();
        game.updateUI();
        console.log("UI initialized");
    }
});
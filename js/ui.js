// ui.js - Updated to use sound-enabled methods
document.addEventListener("DOMContentLoaded", function() {
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
            const goldGain = game.provinces;
            const taxBtn = document.getElementById("tax");
            taxBtn.textContent = `Tax Province (+${goldGain} Gold)`;
            taxBtn.title = `Collect taxes from all provinces (Gains ${goldGain} Gold)`;
        }

        game.updateUI = function() {
            document.getElementById("gold").textContent = Math.floor(game.gold);
            document.getElementById("manpower").textContent = Math.floor(game.manpower);
            document.getElementById("provinces").textContent = game.provinces;
            
            document.getElementById("gold-box").title = `Gold/sec: ${game.goldPerSecond.toFixed(1)}`;
            document.getElementById("manpower-box").title = `Manpower/sec: ${game.manpowerPerSecond.toFixed(1)}`;
            
            if (Math.floor(game.manpower) > Math.floor(lastManpower)) {
                const popup = document.createElement("div");
                popup.className = "manpower-popup";
                popup.textContent = `+${Math.floor(game.manpower) - Math.floor(lastManpower)}`;
                document.querySelector(".manpower-popups").innerHTML = '';
                document.querySelector(".manpower-popups").appendChild(popup);
            }
            lastManpower = game.manpower;
            
            updateTaxButton();
        };

        // Updated button handlers
        document.getElementById("tax").addEventListener("click", () => {
            window.gameAPI.collectTax();
            game.updateUI();
        });

        document.getElementById("conquer").addEventListener("click", () => {
            if (window.gameAPI.conquerProvince()) {
                game.updateUI();
            }
        });

        updateTaxButton();
        game.updateUI();
        console.log("UI initialized");
    }
});
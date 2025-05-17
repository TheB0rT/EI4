// UI State
let lastManpower = game.manpower;

// Main UI Update Function
function updateUI() {
    // Update resource displays
    document.getElementById("gold").textContent = Math.floor(game.gold);
    document.getElementById("manpower").textContent = Math.floor(game.manpower);
    document.getElementById("provinces").textContent = game.provinces;

    // Update tooltips with current rates
    updateTooltips();

    // Handle manpower popups
    handleManpowerPopups();
}

// Update Tooltips with Current Rates
function updateTooltips() {
    document.getElementById("gold-box").title = `Gold per second: ${game.goldPerSecond.toFixed(1)}`;
    document.getElementById("manpower-box").title = `Manpower per second: ${game.manpowerPerSecond.toFixed(1)}`;
}

// Handle Manpower Popup Effects
function handleManpowerPopups() {
    const currentManpower = Math.floor(game.manpower);
    const popupContainer = document.querySelector(".manpower-popups");
    
    if (currentManpower > Math.floor(lastManpower)) {
        const increaseAmount = currentManpower - Math.floor(lastManpower);
        const popup = createPopupElement(increaseAmount);
        
        // Clear previous popups and add new one
        popupContainer.innerHTML = '';
        popupContainer.appendChild(popup);
    }
    lastManpower = game.manpower;
}

// Create Popup Element
function createPopupElement(amount) {
    const popup = document.createElement("div");
    popup.className = "manpower-popup";
    popup.textContent = `+${amount}`;
    return popup;
}

// Button Event Listeners
function initializeButtons() {
    // Tax Province Button
    document.getElementById("tax").addEventListener("click", () => {
        game.gold += 1;
        updateUI();
    });

    // Conquer Province Button
    document.getElementById("conquer").addEventListener("click", () => {
        if (game.gold >= 50) {
            game.gold -= 50;
            game.provinces++;
            game.goldPerSecond += 0.5;document.addEventListener("DOMContentLoaded", function() {
    // 1. Verify game API is available
    if (!window.gameAPI) {
        console.error("Game API not found! Check loading order.");
        return;
    }

    // 2. Game state reference
    const game = window.gameAPI.state;
    let lastManpower = game.manpower;

    // 3. Core UI Functions
    function updateUI() {
        try {
            // Update displays
            document.getElementById("gold").textContent = Math.floor(game.gold);
            document.getElementById("manpower").textContent = Math.floor(game.manpower);
            document.getElementById("provinces").textContent = game.provinces;
            
            // Update tooltips
            updateTooltips();
            
            // Handle popups
            handleManpowerPopups();
        } catch (e) {
            console.error("UI Update Error:", e);
        }
    }

    function updateTooltips() {
        document.getElementById("gold-box").title = 
            `Gold per second: ${game.goldPerSecond.toFixed(1)}`;
        document.getElementById("manpower-box").title = 
            `Manpower per second: ${game.manpowerPerSecond.toFixed(1)}`;
    }

    function handleManpowerPopups() {
        const currentManpower = Math.floor(game.manpower);
        const popupContainer = document.querySelector(".manpower-popups");
        
        if (currentManpower > Math.floor(lastManpower)) {
            const increase = currentManpower - Math.floor(lastManpower);
            const popup = document.createElement("div");
            popup.className = "manpower-popup";
            popup.textContent = `+${increase}`;
            
            popupContainer.innerHTML = '';
            popupContainer.appendChild(popup);
        }
        lastManpower = game.manpower;
    }

    // 4. Button Handlers
    function setupButtons() {
        // Tax Button
        document.getElementById("tax").addEventListener("click", function() {
            game.gold += 1;
            updateUI();
        });

        // Conquer Button
        document.getElementById("conquer").addEventListener("click", function() {
            if (game.gold >= 50) {
                game.gold -= 50;
                game.provinces++;
                game.goldPerSecond += 0.5;
                updateUI();
            }
        });

        // Reset Button (handled by save.js)
    }

    // 5. Initialize
    function initialize() {
        setupButtons();
        updateUI();
        console.log("UI initialized successfully");
        
        // Register our update callback
        gameAPI.init({
            updateUI: updateUI
        });
    }

    initialize();
});
            updateUI();
        }
    });

    // Reset Button (handled in save.js)
}

// Initialize UI
function initializeUI() {
    updateUI();
    initializeButtons();
    console.log("UI initialized successfully");
}

// Start the UI
initializeUI();
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
            game.goldPerSecond += 0.5;
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
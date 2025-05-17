// Default game state
const DEFAULT_GAME_STATE = {
    gold: 10,
    manpower: 100,
    monarchPoints: 0,
    provinces: 1,
    goldPerSecond: 0.5,
    lastUpdate: Date.now()
};

// Current game state (initially null)
let game = null;

// Initialize a new game
function newGame() {
    game = JSON.parse(JSON.stringify(DEFAULT_GAME_STATE)); // Deep copy
    updateUI();
}

// Main game loop
function gameLoop() {
    if (!game) return;
    
    const now = Date.now();
    const deltaTime = (now - game.lastUpdate) / 1000;
    game.lastUpdate = now;

    game.gold += game.goldPerSecond * deltaTime;
    updateUI();
    requestAnimationFrame(gameLoop);
}

// Start everything
function initGame() {
    loadGame(); // Try loading first
    if (!game) newGame(); // Fallback to new game
    gameLoop();
}

// Call init when page loads
window.addEventListener('load', initGame);
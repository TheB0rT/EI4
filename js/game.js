// game.js - Fixed Version
window.gameAPI = (function() {
    const state = {
        gold: 10,
        goldPerSecond: 0.5,
        manpower: 1000,
        manpowerPerSecond: 0.5,
        provinces: 1,
        lastUpdate: Date.now(),
        updateUI: null
    };

    function gameLoop() {
        const now = Date.now();
        const deltaTime = (now - state.lastUpdate) / 1000;
        state.lastUpdate = now;
        
        // Increment resources
        state.gold += state.goldPerSecond * deltaTime;
        state.manpower += state.manpowerPerSecond * deltaTime;
        
        // Update UI if callback exists
        if (typeof state.updateUI === 'function') {
            state.updateUI();
        }
        
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop immediately
    gameLoop();

    return {
        state: state,
        init: function(uiCallbacks) {
            if (uiCallbacks.updateUI) {
                state.updateUI = uiCallbacks.updateUI;
            }
        }
    };
})();
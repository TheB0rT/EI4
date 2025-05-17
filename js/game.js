// game.js - Core Game Engine
window.gameAPI = {
    state: {
        gold: 10,
        goldPerSecond: 0.5,
        manpower: 1000,
        manpowerPerSecond: 0.3,
        provinces: 1,
        lastUpdate: Date.now()
    },
    init: function() {
        // Game loop
        const gameLoop = () => {
            const now = Date.now();
            const deltaTime = (now - this.state.lastUpdate) / 1000;
            this.state.lastUpdate = now;
            
            this.state.gold += this.state.goldPerSecond * deltaTime;
            this.state.manpower += this.state.manpowerPerSecond * deltaTime;
            
            if (typeof this.state.updateUI === 'function') {
                this.state.updateUI();
            }
            requestAnimationFrame(gameLoop.bind(this));
        };
        gameLoop();
    }
};
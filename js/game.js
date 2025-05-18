// game.js - Version with Sound Implementation
window.gameAPI = (function() {
    const state = {
        gold: 10,
        goldPerSecond: 0.5,
        manpower: 1000,
        manpowerPerSecond: 0.5,
        provinces: 1,
        lastUpdate: Date.now(),
        updateUI: null,
        sounds: {
            conquer: new Audio('sounds/conquer.mp3'),
            tax: new Audio('sounds/tax.mp3'),
            reset: new Audio('sounds/reset.mp3')
        }
    };

    // Initialize sounds
    function initSounds() {
        Object.values(state.sounds).forEach(sound => {
            sound.load();
            sound.volume = 0.5;
        });
    }

    function gameLoop() {
        const now = Date.now();
        const deltaTime = (now - state.lastUpdate) / 1000;
        state.lastUpdate = now;
        
        state.gold += state.goldPerSecond * deltaTime;
        state.manpower += state.manpowerPerSecond * deltaTime;
        
        if (typeof state.updateUI === 'function') {
            state.updateUI();
        }
        
        requestAnimationFrame(gameLoop);
    }

    function playSound(soundName) {
        if (state.sounds[soundName]) {
            state.sounds[soundName].currentTime = 0;
            state.sounds[soundName].play().catch(e => console.log("Audio play failed:", e));
        }
    }

    gameLoop();
    initSounds();

    return {
        state: state,
        init: function(uiCallbacks) {
            if (uiCallbacks.updateUI) {
                state.updateUI = uiCallbacks.updateUI;
            }
        },
        playSound: playSound,
        conquerProvince: function() {
            if (state.gold >= 50 && state.manpower >= 200) {
                state.gold -= 50;
                state.manpower -= 200;
                state.provinces++;
                state.goldPerSecond += 0.5;
                state.manpowerPerSecond += 0.5;
                this.playSound('conquer');
                return true;
            }
            return false;
        },
        collectTax: function() {
            const goldGain = state.provinces;
            state.gold += goldGain;
            this.playSound('tax');
            return goldGain;
        },
        resetGame: function() {
            Object.assign(state, {
                gold: 10,
                goldPerSecond: 0.5,
                manpower: 1000,
                manpowerPerSecond: 0.5,
                provinces: 1,
                lastUpdate: Date.now()
            });
            this.playSound('reset');
        }
    };
})();
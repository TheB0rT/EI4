// game.js - Updated with better sound error handling
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
            conquer: null,
            tax: null,
            reset: null
        },
        soundEnabled: true
    };

    function initSounds() {
        try {
            // Initialize audio objects only when needed
            state.sounds.conquer = createAudio('sounds/conquer.mp3');
            state.sounds.tax = createAudio('sounds/tax.mp3');
            state.sounds.reset = createAudio('sounds/reset.mp3');
        } catch (e) {
            console.warn("Sound initialization failed:", e);
            state.soundEnabled = false;
        }
    }

    function createAudio(src) {
        const audio = new Audio();
        audio.src = src;
        audio.volume = 0.5;
        audio.preload = 'auto';
        audio.load();
        return audio;
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
        if (!state.soundEnabled || !state.sounds[soundName]) return;
        
        try {
            const sound = state.sounds[soundName];
            sound.currentTime = 0;
            sound.play().catch(e => {
                console.warn(`Failed to play ${soundName}:`, e);
                state.soundEnabled = false;
            });
        } catch (e) {
            console.warn(`Sound error with ${soundName}:`, e);
            state.soundEnabled = false;
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
                playSound('conquer');
                return true;
            }
            return false;
        },
        collectTax: function() {
            const goldGain = state.provinces;
            state.gold += goldGain;
            playSound('tax');
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
            playSound('reset');
        }
    };
})();
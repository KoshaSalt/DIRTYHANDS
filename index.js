// index.js

// Imports the Nostalgist library installed via npm
import { Nostalgist } from 'nostalgist';

async function launchDirtyhands() {
    const romFilename = 'dirtyhands.bin';

    try {
        // Launches the Sega Genesis emulator
        await Nostalgist.launch({
            core: 'genesis_plus_gx', 
            rom: romFilename,
            element: document.getElementById('game-container'),
            retroarchConfig: {
                // Explicitly use a reliable public CDN for The Core files 
                // to prevent GitHub Pages 403/Not Found errors.
                cdnUrl: 'https://cdn.jsdelivr.net/npm/nostalgist@latest/dist/' 
            }
        });

        // Hide the loading header on successful launch
        document.querySelector('h1').style.display = 'none';
        console.log(`Dirtyhands launched successfully using genesis_plus_gx core.`);

    } catch (error) {
        console.error("Failed to launch emulator:", error);
        document.querySelector('h1').textContent = 'Error: Failed to launch Dirtyhands. Check console for details.';
    }
}

launchDirtyhands();

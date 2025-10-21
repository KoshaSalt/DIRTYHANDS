// index.js

// REMOVE: import { Nostalgist } from 'nostalgist';

// The function is now a standard script that runs after the page loads
function launchDirtyhands() {
    const romFilename = 'dirtyhands.bin';

    // We use a listener to ensure all HTML and script dependencies (like Nostalgist) are ready
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            // Nostalgist is available globally here
            await Nostalgist.launch({
                core: 'genesis_plus_gx', 
                rom: romFilename,
                element: document.getElementById('game-container'),
                retroarchConfig: {
                    // This explicitly sets a reliable CDN URL for the core files (fixing your 403 issues)
                    cdnUrl: 'https://cdn.jsdelivr.net/npm/nostalgist@latest/dist/' 
                }
            });

            document.querySelector('h1').style.display = 'none';
            console.log(`Dirtyhands launched successfully.`);

        } catch (error) {
            console.error("Failed to launch emulator:", error);
            document.querySelector('h1').textContent = 'Error: Failed to launch Dirtyhands. Check console for details.';
        }
    });
}

launchDirtyhands();

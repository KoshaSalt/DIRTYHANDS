// index.js

// 🚨🚨 DELETE THIS LINE: import { Nostalgist } from 'nostalgist'; 🚨🚨

// The 'Nostalgist' object is now available globally because it was loaded 
// via the <script src="https://unpkg.com/nostalgist"></script> tag in index.html.

function launchDirtyhands() {
    const romFilename = 'dirtyhands.bin';

    // We use a listener to ensure all HTML and script dependencies (like Nostalgist) are ready
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            // Note: Nostalgist is used directly here
            await Nostalgist.launch({
                core: 'genesis_plus_gx', 
                rom: romFilename,
                element: document.getElementById('game-container'),
                retroarchConfig: {
                    // Ensures core assets load correctly from a stable CDN
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

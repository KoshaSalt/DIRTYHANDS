// index.js

// 1. DELETE the 'import' line if it is still present.
// 2. The function is now asynchronous and runs immediately when the script is reached.

async function launchDirtyhands() {
    const romFilename = 'dirtyhands.bin';

    try {
        // The element #game-container is guaranteed to exist because the script is at the end of <body>
        await Nostalgist.launch({
            core: 'genesis_plus_gx', 
            rom: romFilename,
            element: document.getElementById('game-container'), // THIS should now find the element
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
}

launchDirtyhands();

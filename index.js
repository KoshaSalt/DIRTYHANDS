// index.js
// This function will only run AFTER the entire page has loaded, 
// guaranteeing the 'game-container' element exists.

window.onload = async function launchDirtyhands() {
    const romFilename = 'dirtyhands.bin';

    try {
        await Nostalgist.launch({
            core: 'genesis_plus_gx', 
            rom: romFilename,
            // The element is now guaranteed to be found
            element: document.getElementById('game-container'), 
            retroarchConfig: {
                // Stable CDN URL for core assets
                cdnUrl: 'https://cdn.jsdelivr.net/npm/nostalgist@latest/dist/' 
            }
        });

        document.querySelector('h1').style.display = 'none';
        console.log(`Dirtyhands launched successfully.`);

    } catch (error) {
        console.error("Failed to launch emulator:", error);
        document.querySelector('h1').textContent = 'Error: Failed to launch Dirtyhands. Check console for details.';
    }
};

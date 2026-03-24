// Permet de charger les scripts JS sans avoir à le faire manuellement dans le HTML

let scriptsFiles = [
    "mobs.js",
    "map.js",
    "message.js",
    "giveItems.js",
    "fight.js",
    "changeLevel.js",
    "hud.js",
    "xp.js",
    "inventory.js",
    "profile.js",
    "playerMovement.js",
    "saveMenu.js",
    "merchant.js",
    "audio.js",
    "settings.js"
];

function loadScript(index) {
    if (index >= scriptsFiles.length) {
        return;
    }

    const script = document.createElement('script');
    script.src = './JavaScript/' + scriptsFiles[index];
    script.onload = () => loadScript(index + 1);
    document.body.appendChild(script);
}

loadScript(0);
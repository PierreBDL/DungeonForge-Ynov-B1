// Permet de charger les scripts JS sans avoir à le faire manuellement dans le HTML

let scriptsFiles = [
    "Entities/mobs.js",
    "Map/generateMap.js",
    "Map/map.js",
    "Ui/message.js",
    "giveItems.js",
    "fight.js",
    "Map/changeLevel.js",
    "Ui/xp.js",
    "Ui/hud.js",
    "useItems.js",
    "Ui/inventory.js",
    "Ui/profile.js",
    "Entities/playerMovement.js",
    "Ui/saveMenu.js",
    "Entities/merchant.js",
    "audio.js",
    "Ui/settings.js",
    "gameOver.js"
];

function loadScript(index) {
    if (index >= scriptsFiles.length) {
        return;
    }

    const script = document.createElement('script');
    script.src = '../JavaScript/Scripts/' + scriptsFiles[index];
    script.onload = () => loadScript(index + 1);
    document.body.appendChild(script);
}

loadScript(0);
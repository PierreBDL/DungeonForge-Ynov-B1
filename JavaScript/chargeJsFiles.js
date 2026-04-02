// Permet de charger les scripts JS sans avoir à le faire manuellement dans le HTML

let scriptsFiles = [
    "Scripts/Entities/mobs.js",
    "Scripts/Map/generateMap.js",
    "Scripts/Map/map.js",
    "Scripts/Ui/message.js",
    "Scripts/giveItems.js",
    "Scripts/fight.js",
    "Scripts/Map/changeLevel.js",
    "Scripts/Ui/xp.js",
    "Scripts/Ui/hud.js",
    "Scripts/useItems.js",
    "Scripts/Ui/inventory.js",
    "Scripts/Ui/profile.js",
    "Scripts/Entities/playerMovement.js",
    "Scripts/Ui/saveMenu.js",
    "Scripts/Entities/merchant.js",
    "Common/audio.js",
    "Common/settings.js",
    "Scripts/gameOver.js"
];

function loadScript(index) {
    if (index >= scriptsFiles.length) {
        return;
    }

    const script = document.createElement('script');
    script.src = '../JavaScript/' + scriptsFiles[index];
    script.onload = () => loadScript(index + 1);
    document.body.appendChild(script);
}

loadScript(0);
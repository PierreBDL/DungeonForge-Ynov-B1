let currentLevel = 0;

function changeLevel() {
    currentLevel++;
    actualMap = generateBSPMap(25, 18, 3); // nouvelle map aléatoire à chaque niveau
    originTile = CELL_TYPES.FLOOR;
    initPlayer();
    initEnnemies();
    loadMap();
}
let currentLevel = 0;

function changeLevel () {

    // Changement de carte
    currentLevel++;
    if (currentLevel >= maps.length) {
        currentLevel = 0; // Retourner au début
    }
    
    actualMap = maps[currentLevel];

    originTile = CELL_TYPES.FLOOR; // Remettre la tuile à sol
    initPlayer(); // Repositionner joueur
    initEnnemies(); // Recharger ennemis
    loadMap(); // Recharger la carte
}
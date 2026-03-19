function changeLevel () {

    // Si on est à la carte 1 -> on passe à la carte 2
    if (actualMap === map) {
        actualMap = map2;
    } else {
        // Sinon, on revien à la carte 1
        actualMap = map;
    }

    originTile = CELL_TYPES.FLOOR; // Remettre la tuile à sol
    initPlayer(); // Repositionner joueur
    initEnnemies(); // Recharger ennemis
    loadMap(); // Recharger la carte
}
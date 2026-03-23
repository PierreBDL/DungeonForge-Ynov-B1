/* -------------------------------------------- */
/*              Afficher carte                  */
/* -------------------------------------------- */

let currentLevel = 0;

function changeLevel () {

    // Si on était pas danns un niveau spécial -> on peut incrémenter
    if (inSpecialLevel === false) {
        // Changement de carte
        currentLevel++;
        if (currentLevel >= maps.length) {
            currentLevel = 0; // Retourner au début
        }
    }
    
    actualMap = maps[currentLevel];

    originTile = CELL_TYPES.FLOOR; // Remettre la tuile à sol
    initPlayer(); // Repositionner joueur
    initEnnemies(); // Recharger ennemis
    loadMap(); // Recharger la carte
}

/* -------------------------------------------- */
/*      Changer pour une carte spécifique       */
/* -------------------------------------------- */

let inSpecialLevel = false; // Si on est dans un niveau spécial, cette variable permettra de reprendre où on s'est arrêté

// Sauvegarde des infos du niveau source
let savedLevel = 0;
let savedPlayerX = 0;
let savedPlayerY = 0;

function changeSpecialLevel (targetLevel) {

    // Sauvegarder des infos du niveau source
    savedLevel = currentLevel;
    savedPlayerX = Player.x;
    savedPlayerY = Player.y;

    inSpecialLevel = true;
    actualMap = targetLevel;

    originTile = CELL_TYPES.FLOOR;
    initPlayer(); // Repositionner joueur
    initEnnemies(); // Recharger ennemis
    loadMap(); // Recharger la carte
}

function returnFromSpecialLevel() {
    inSpecialLevel = false;
    currentLevel = savedLevel;
    actualMap = maps[currentLevel];

    originTile = CELL_TYPES.FLOOR;

    // Reprendre où on était
    Player.x = savedPlayerX;
    Player.y = savedPlayerY;
    actualMap[Player.y][Player.x] = CELL_TYPES.PLAYER;

    initEnnemies();
    loadMap();
}
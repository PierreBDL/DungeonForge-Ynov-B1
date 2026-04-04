/* -------------------------------------------- */
/*              Afficher carte                  */
/* -------------------------------------------- */

let currentLevel = 0;

function changeLevel () {

    // Effacer le joueur
    for (let y = 0; y < actualMap.length; y++) {
        for (let x = 0; x < actualMap[y].length; x++) {
            if (actualMap[y][x] === CELL_TYPES.PLAYER) {
                actualMap[y][x] = CELL_TYPES.FLOOR;
            }
        }
    }

    // Vérifier si on est dans un niveau spécial
    if (!inSpecialLevel) {
        currentLevel++;
        numberOfRooms++; // Incréémenttation du nombre de salles visité
        actualMap = generateBSPMap(25, 18, 3, currentLevel);
        nextLevelEnnemy(); // Augmenter le niveau des ennemis
    } else {
        actualMap = maps[currentLevel];
    }

    // Réinitialisation du sol et des ennemis
    originTile = CELL_TYPES.FLOOR;
    ennemies = {};

    // Replacer le joueur et les ennemis
    initPlayer();
    initEnnemies();

    // Afficher la carte
    loadMap();

    // Changer la musique
    playMusicType("fond");
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
    
    // Changer la musique au type "pnj"
    playMusicType("pnj");
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
    
    // Revenir à la musique de combat
    playMusicType("combat");
}
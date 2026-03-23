const CELL_TYPES = {
    WALL: 0,
    FLOOR: 1,
    DOOR: 2,
    STAIRS_DOWN: 3,
    CHEST: 4,
    PLAYER: 5,
    ENNEMY: 6,
    CHEST_OPEN: 7,
    MERCHANT: 8
};

/* -------------------------------------------- */
/*                   Cartes                     */
/* -------------------------------------------- */

let maps = [
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 4, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 6, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 1, 4, 0, 0, 6, 0, 0],
        [0, 6, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 6, 1, 6, 1, 0, 0, 0, 0, 0, 1, 6, 1, 1, 1, 1, 4, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 6, 1, 1, 1, 0],
        [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 6, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 4, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 1, 6, 1, 1, 6, 1, 1, 1, 0, 0, 0, 0, 0, 1, 6, 1, 6, 1, 0],
        [0, 1, 1, 1, 4, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 3, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 5, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
        // Marchand
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 7, 1, 1, 1, 1, 1, 7, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 0, 8, 0, 1, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
];

actualMap = maps[0]; // Carte actuelle

/* -------------------------------------------- */
/*             Chercher le joueur               */
/* -------------------------------------------- */

function initPlayer() {
    for (let i = 0; i < actualMap.length; i++) {
        for (let j = 0; j < actualMap[i].length; j++) {
            if (actualMap[i][j] === CELL_TYPES.PLAYER) {
                Player.x = j;
                Player.y = i;
                return;
            }
        }
    }
}


/* -------------------------------------------- */
/*            Chercher les ennemies             */
/* -------------------------------------------- */

let ennemies = {};

function initEnnemies() {
    ennemies = {};
    for (let i = 0; i < actualMap.length; i++) {
        for (let j = 0; j < actualMap[i].length; j++) {
            if (actualMap[i][j] === CELL_TYPES.ENNEMY) {
                let key = "ennemy_" + i + "_" + j;
                ennemies[key] = {
                    x: j, y: i,
                    name: "Ennemi",
                    stats: { hp: Ennemy.stats.hp, maxHp: Ennemy.stats.maxHp, attack: Ennemy.stats.attack, defense: Ennemy.stats.defense },
                    attackTypes: Ennemy.attackTypes,
                };
            }
        }
    }
}

/* -------------------------------------------- */
/*              Afficher carte                  */
/* -------------------------------------------- */

function loadMap () {
    // Supprimer la carte actuelle (éviter d'afficher plusieurs cartes)
    const carte = document.getElementById('map');
    carte.innerHTML = "";

    // Changer la taille de grid dans css
    carte.style.gridTemplateColumns = 'repeat(' + actualMap[0].length + ', 50px)';
    carte.style.gridTemplateRows = 'repeat(' + actualMap.length + ', 50px)';

    // Parcours de toute la matrice
    for (let i = 0; i < actualMap.length; i++) {
        for (let j = 0; j < actualMap[i].length; j++) {
            let cellType = actualMap[i][j];
            // Création d'une div pour chaque tuile
            let cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            // Donner une classe en fonction du type pour donner un style en css
            switch (cellType) {
                case CELL_TYPES.WALL:
                    cellElement.classList.add('wall');
                    break;
                case CELL_TYPES.FLOOR:
                    cellElement.classList.add('floor');
                    break;
                case CELL_TYPES.DOOR:
                    cellElement.classList.add('door');
                    break;
                case CELL_TYPES.STAIRS_DOWN:
                    cellElement.classList.add('stairs-down');
                    break;
                case CELL_TYPES.CHEST:
                    cellElement.classList.add('chest');
                    break;
                case CELL_TYPES.PLAYER:
                    cellElement.classList.add('player');
                    break;
                case CELL_TYPES.ENNEMY:
                    cellElement.classList.add('ennemy');
                    break;
                case CELL_TYPES.CHEST_OPEN:
                    cellElement.classList.add('chest-open');
                    break;
                case CELL_TYPES.MERCHANT:
                    cellElement.classList.add('merchant');
                    break;
            }
            document.getElementById('map').appendChild(cellElement);
        }
    }
}

initPlayer(); // Chercher le joueur au premier chargement de la carte
initEnnemies(); // Chercher les ennemies au chargement de la carte
loadMap(); // Charger la carte au début

const CELL_TYPES = {
    WALL: 0,
    FLOOR: 1,
    DOOR: 2,
    STAIRS_DOWN: 3,
    CHEST: 4,
    PLAYER: 5
};

/* -------------------------------------------- */
/*                    Carte                     */
/* -------------------------------------------- */

let map = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
[0, 1, 4, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
[0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
[0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
[0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 0],
[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3, 1, 0],
[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
[0, 1, 1, 1, 0, 0, 0, 0, 1, 4, 0, 0, 2, 0, 0],
[0, 2, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
[0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


/* -------------------------------------------- */
/*              Afficher carte                  */
/* -------------------------------------------- */

function loadMap () {
    // Supprimer la carte actuelle (éviter d'afficher plusieurs cartes)
    const carte = document.getElementById('map');
    carte.innerHTML = "";

    // Changer la taille de grid dans css
    carte.style.gridTemplateColumns = 'repeat(' + map[0].length + ', 50px)';
    carte.style.gridTemplateRows = 'repeat(' + map.length + ', 50px)';

    // Parcours de toute la matrice
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let cellType = map[i][j];
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
                    // Mettre les coodonnées du joueur à jour
                    Player.x = j;
                    Player.y = i;
                    break;
            }
            document.getElementById('map').appendChild(cellElement);
        }
    }
}

loadMap(); // Charger la carte au début

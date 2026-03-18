document.addEventListener('keyup', (e) => {
    let moveX = Player.x;
    let moveY = Player.y;

    if (e.key === "w" || e.key === "ArrowUp") {
        moveY -= 1;
    } else if (e.key === "s" || e.key === "ArrowDown") {
        moveY += 1;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
        moveX -= 1;
    } else if (e.key === "d" || e.key === "ArrowRight") {
        moveX += 1;
    }

    moveOnMap(moveX, moveY);
});

/* -------------------------------------------- */
/*            Bouger sur la carte               */
/* -------------------------------------------- */

let originTile = CELL_TYPES.FLOOR;;

function moveOnMap (x, y) {
    if (y >= 0 && y < map.length && x >= 0 && x < map[y].length && map[y][x] !== CELL_TYPES.WALL && map[y][x] !== CELL_TYPES.ENNEMY) {
        
        // Sauvegarde de la tuile de destination
        let nextTile = map[y][x];

        // Remettre la tuile d'origine
        map[Player.y][Player.x] = originTile;

        // Enregistrer prochaine destination
        originTile = nextTile;

        // Afficher une notif si c'est un coffre via l'orverlay message
        if (map[y][x] === CELL_TYPES.CHEST) {
            // Gagnés dans le coffre
            giveItems({gold: 10, xp:20, potion_vie:1});
        }

        // Afficher une notif si c'est un coffre via l'orverlay message
        if (map[y][x] === CELL_TYPES.ENNEMY) {
            printMessage("Vous êtes tombé sur un ennemi")
        }

        // Dépacer joueur
        map[y][x] = CELL_TYPES.PLAYER;

        // MAJ position du joueur
        Player.x = x;
        Player.y = y;

        // Afficher la carte mise à jour
        loadMap();
    }
}


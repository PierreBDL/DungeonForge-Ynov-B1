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

function moveOnMap (x, y) {
    if (y >= 0 && y < map.length && x >= 0 && x < map[y].length && map[y][x] !== CELL_TYPES.WALL) {
        let originTile = CELL_TYPES.FLOOR;

        // Afficher une notif si c'est un coffre via l'orverlay message
        if (map[y][x] === CELL_TYPES.CHEST) {
            printMessage("Vous êtes tombé sur un coffre !")
        }

        // Si on était sur un coffre => remettre le coffre
        if (map[Player.y][Player.x] === CELL_TYPES.CHEST) {
            originTile = CELL_TYPES.CHEST;
        }

        // MAJ carte en fonction de la tuile
        map[Player.y][Player.x] = originTile;

        // Dépacer joueur
        map[y][x] = CELL_TYPES.PLAYER;

        // MAJ position du joueur
        Player.x = x;
        Player.y = y;

        // Afficher la carte mise à jour
        loadMap();
    }
}


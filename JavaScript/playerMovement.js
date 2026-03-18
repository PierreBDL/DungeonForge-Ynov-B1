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
            let items = {gold: 10, xp:20, potion_vie:1} // Gagnés dans le coffre

            let message = "Vous êtes tombé sur un coffre ! Vous obtenez : <br>";

            // Création de la liste des items + cocaténation dans le message + balises HTML
            let keys_items = Object.entries(items);

            for (let i = 0; i < keys_items.length; i++) {
                switch (keys_items[i][0]) {
                    case "gold":
                        Player.gold += keys_items[i][1];
                        message += (keys_items[i][1] + " Pièces d'or");
                        break;
                    case "xp":
                        Player.stats.xp += keys_items[i][1];
                        message += (keys_items[i][1] + " points d'expérience");
                        break;
                    case "potion_vie":
                        // Ajouter autant de potion que ce qu'il y a dans l'inventaire
                        for (let j = 0; j < keys_items[i][1]; j++) {
                            // Tant qu'on a de la place dans l'inventaire
                            if (Player.inventory.length <= 10) {
                                Player.inventory.push("potion_vie")
                            } else {
                                break;
                            }
                        }
                        message += (keys_items[i][1] + " potion(s) de soin");
                        break
                }

                // Ajout d'un saut de ligne
                if (i < keys_items.length) {
                    message += "<br>"
                }
            }

            printMessage(message)
        }

        // Si on était sur un coffre => remettre le coffre
        if (map[Player.y][Player.x] === CELL_TYPES.CHEST) {
            originTile = CELL_TYPES.CHEST;
        }

        // Afficher une notif si c'est un coffre via l'orverlay message
        if (map[y][x] === CELL_TYPES.ENNEMY) {
            printMessage("Vous êtes tombé sur un ennemie")
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


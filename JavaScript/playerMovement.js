
/* -------------------------------------------- */
/*        Touches de clavier pressées           */
/* -------------------------------------------- */

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
    } else {
        return;
    }

    moveOnMap(moveX, moveY);
});

/* -------------------------------------------- */
/*            Bouger sur la carte               */
/* -------------------------------------------- */

let originTile = CELL_TYPES.FLOOR; // Type de tuile qu'il y avait avant sous le joueur
let isInFight = false; // Le combat est démarré ou non
let currentEnnemy = null; // Ennemi du combat

function moveOnMap(x, y) {

    // Vérifier si on sort des limites
    if (y < 0 || y >= map.length || x < 0 || x >= map[y].length) {
        return;
    }

    /* -------------------------------------------- */

    // Ne pas bouger si on a un message
    if (document.getElementById("message").style.display === "flex") {
        return;
    }

    /* -------------------------------------------- */

    // Si on est en combat -> ne pas bouger
    if (isInFight === true) {
        return;
    }

    /* -------------------------------------------- */

    // Afficher une notif si c'est un ennemi via l'orverlay message
    if (map[y][x] === CELL_TYPES.ENNEMY) {
        // printMessage("Vous êtes tombé sur un ennemi");
        let keyEnnemy = "ennemy_" + y + "_" + x; // Sélectionner l'ennemi devant le joueur
        currentEnnemy = ennemies[keyEnnemy]; // Créer un objet ennemi
        fight(currentEnnemy); // Lancer le combat
        return; // Ne pas bouger
    }

    /* -------------------------------------------- */


    // S'arrêter si c'est un mur
    if (map[y][x] === CELL_TYPES.WALL) {
        return;
    }

    /* -------------------------------------------- */

    // Sauvegarde de la tuile de destination
    let nextTile = map[y][x];

    // Remettre la tuile d'origine
    map[Player.y][Player.x] = originTile;

    // Enregistrer prochaine destination
    originTile = nextTile;

    /* -------------------------------------------- */

    // Afficher une notif si c'est un coffre via l'orverlay message
    if (nextTile === CELL_TYPES.CHEST) {
        // Gagnés dans le coffre
        giveItems("Vous êtes tombé sur un coffre ! Vous obtenez : <br>", { gold: 10, xp: 20, potion_vie: 1 });
        // Indiquer que le coffre a déjà été récupéré
        originTile = CELL_TYPES.CHEST_OPEN;
    }

    /* -------------------------------------------- */

    // Dépacer joueur
    map[y][x] = CELL_TYPES.PLAYER;

    // MAJ position du joueur
    Player.x = x;
    Player.y = y;

    // Afficher la carte mise à jour
    loadMap();
}


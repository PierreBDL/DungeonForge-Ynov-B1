
/* -------------------------------------------- */
/*        Touches de clavier pressées           */
/* -------------------------------------------- */

document.addEventListener('keyup', (e) => {
    let moveX = Player.x;
    let moveY = Player.y;

    e.preventDefault(); // Empêcher le scroll avec les flèches

    if (e.key === "w" || e.key === "ArrowUp" || e.key === "z") {
        moveY -= 1;
    } else if (e.key === "s" || e.key === "ArrowDown") {
        moveY += 1;
    } else if (e.key === "a" || e.key === "ArrowLeft" || e.key === "q") {
        moveX -= 1;
    } else if (e.key === "d" || e.key === "ArrowRight") {
        moveX += 1;
    } else {
        return;
    }

    moveOnMap(moveX, moveY);
});

/* -------------------------------------------- */
/*            Mouvement sur mobile              */
/* -------------------------------------------- */

function initMobileDPad() {
    const directions = {
        'moveUp':    { x: 0,  y: -1 },
        'moveDown':  { x: 0,  y: 1  },
        'moveLeft':  { x: -1, y: 0  },
        'moveRight': { x: 1,  y: 0  }
    };

    Object.keys(directions).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const nextX = Player.x + directions[id].x;
                const nextY = Player.y + directions[id].y;
                moveOnMap(nextX, nextY);
            });
        }
    });
}

window.addEventListener('load', initMobileDPad);

/* -------------------------------------------- */
/*            Bouger sur la carte               */
/* -------------------------------------------- */

let originTile = CELL_TYPES.FLOOR; // Type de tuile qu'il y avait avant sous le joueur
let isInFight = false; // Le combat est démarré ou non
let currentEnnemy = null; // Ennemi du combat

function moveOnMap(x, y) {

    // Vérifier si on sort des limites
    if (y < 0 || y >= actualMap.length || x < 0 || x >= actualMap[y].length) {
        return;
    }

    /* -------------------------------------------- */

    // Vérifier si le joueur est mort
    if (Player.stats.hp <= 0) {
        return;
    }

    /* -------------------------------------------- */

    // Changer de carte si on est au niveau d'un escalier
    if (actualMap[y][x] === CELL_TYPES.STAIRS_DOWN) {
        if (inSpecialLevel) {
            returnFromSpecialLevel(); // On change de carte pour revenir à celle avant la spéciale
        } else {
            changeLevel(); // On change de carte normale
        }
        return;
    }

    /* -------------------------------------------- */

    // Marchand
    if (actualMap[y][x] === CELL_TYPES.MERCHANT) {
        merchantFunction();
        return; // Eviter de marcher sur le marchand
    }

    // Porte du marchand
    if (actualMap[y][x] === CELL_TYPES.MERCHANT_DOOR) {
        changeSpecialLevel(merchantMap);
        return;
    }

    // Ne pas bouger si le marchand est ouvert
    if (document.getElementById("merchantWindow").style.display === "flex") {
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

    // Si l'inventaire ou le profil est ouvert -> ne pas bouger
    if (inventoryIsOpen === true || profileIsOpen === true) {
        return;
    }

    /* -------------------------------------------- */

    // Si les paramètres sont ouverts -> ne pas bouger
    if (isSettingsOpen === true) {
        return;
    }

    /* -------------------------------------------- */

    // Afficher une notif si c'est un ennemi via l'orverlay message
    if (actualMap[y][x] === CELL_TYPES.ENNEMY) {
        // printMessage("Vous êtes tombé sur un ennemi");
        let keyEnnemy = "ennemy_" + y + "_" + x; // Sélectionner l'ennemi devant le joueur
        currentEnnemy = ennemies[keyEnnemy]; // Créer un objet ennemi
        fight(currentEnnemy); // Lancer le combat
        
        // Lancer musique de combat
        playMusicType("combat");

        return; // Ne pas bouger
    }

    /* -------------------------------------------- */


    // S'arrêter si c'est un mur
    if (actualMap[y][x] === CELL_TYPES.WALL) {
        return;
    }

    /* -------------------------------------------- */

    // Sauvegarde de la tuile de destination
    let nextTile = actualMap[y][x];

    // Remettre la tuile d'origine
    actualMap[Player.y][Player.x] = originTile;

    // Enregistrer prochaine destination
    originTile = nextTile;

    /* -------------------------------------------- */

    // Afficher une notif si c'est un coffre via l'orverlay message
    if (nextTile === CELL_TYPES.CHEST) {
        // Indiquer que le coffre a déjà été récupéré
        originTile = CELL_TYPES.CHEST_OPEN;
        // Gagnés dans le coffre - système de loot selon le niveau
        const loot = generateChestLoot(currentLevel);
        giveItems("Vous êtes tombé sur un coffre ! Vous obtenez : <br>", loot);
    }

    /* -------------------------------------------- */

    // Dépacer joueur
    actualMap[y][x] = CELL_TYPES.PLAYER;

    // Anciennes coordonnées du joueur avant déplacement
    let x_ancien = Player.x;
    let y_ancien = Player.y;

    // MAJ position du joueur
    Player.x = x;
    Player.y = y;

    // Afficher la carte mise à jour
    updateCell(Player.x, Player.y); // nouvelle position
    updateCell(x_ancien, y_ancien); // ancienne position
}

/* -------------------------------------------- */
/*            Générateur de coffre              */
/* -------------------------------------------- */

function generateChestLoot(level) {
    // Base: or, exp, et potions aléatoires
    const loot = {
        gold: 15 + (level * 5),           // Augmente avec le niveau
        xp: 25 + (level * 10),            // Augmente avec le niveau
    };

    // 50% de chance d'avoir une potion
    const potions = ["potion_vie", "potion_poison", "potion_force", "potion_armure"];
    if (Math.random() < 0.5) {
        const randomPotion = potions[Math.floor(Math.random() * potions.length)];
        loot[randomPotion] = 1;
    }

    // À partir du niveau 3, possibilité de trouver un équipement rare
    if (level >= 3 && Math.random() < 0.3) {
        const equipment = getRandomEquipment(level);
        loot.equipment = equipment;
    }

    return loot;
}

/* -------------------------------------------- */
/*            Générateur d'équipement           */
/* -------------------------------------------- */

function getRandomEquipment(level) {
    const weapons = [
        { type: "weapon", name: "épée", bonus: 10 },
        { type: "weapon", name: "épée_longue", bonus: 18 },
        { type: "weapon", name: "hache", bonus: 15 },
    ];

    const armors = [
        { type: "armor", name: "cuirasse", bonus: 6 },
        { type: "armor", name: "armure_lourde", bonus: 12 },
        { type: "armor", name: "robe_magique", bonus: 8, attackBonus: 5 },
    ];

    const accessories = [
        { type: "accessory", name: "bague_force", attackBonus: 12 },
        { type: "accessory", name: "amulette", defenseBonus: 10 },
    ];

    const allEquipment = [...weapons, ...armors, ...accessories];
    return allEquipment[Math.floor(Math.random() * allEquipment.length)];
}


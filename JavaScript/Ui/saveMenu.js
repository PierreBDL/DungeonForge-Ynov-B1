/* -------------------------------------------- */
/*       Regarder s'il y a une sauvegarde       */
/* -------------------------------------------- */


function areThereASave () {
    const exists = localStorage.getItem("saveExists");

    if (exists === "true") {
        isSaveExist = true;
    } else {
        isSaveExist = false;
    }
}



/* -------------------------------------------- */
/*            Système de sauvegarde             */
/* -------------------------------------------- */

let isSaveExist = false;

function save() {

    /* Stats Joueur */
    localStorage.setItem("hp", Player.stats.hp);
    localStorage.setItem("maxHp", Player.stats.maxHp);
    localStorage.setItem("attack", Player.stats.attack);
    localStorage.setItem("defense", Player.stats.defense);
    localStorage.setItem("speed", Player.stats.speed);
    localStorage.setItem("xp", Player.stats.xp);
    localStorage.setItem("xpToNext", Player.stats.xpToNext);

    /* Niveaux et or */
    localStorage.setItem("gold", Player.gold);
    localStorage.setItem("level", level);
    localStorage.setItem("pointsUpdate", pointsUpdate);

    /* Inventaire */
    localStorage.setItem("inventory", JSON.stringify(Player.inventory));

    /* Equipement */
    localStorage.setItem("equipment", JSON.stringify(Player.equipment));

    /* Position du joueur */
    localStorage.setItem("playerX", Player.x);
    localStorage.setItem("playerY", Player.y);

    /* Carte */
    localStorage.setItem("mapActual", currentLevel);
    localStorage.setItem("mapData", JSON.stringify(actualMap));
    localStorage.setItem("ennemies", JSON.stringify(ennemies));

    // Indiquer qu'il y a une sauvegarde
    localStorage.setItem("saveExists", "true");
    areThereASave();
}

/* -------------------------------------------- */
/*             Bouton de sauvegarde             */
/* -------------------------------------------- */

const btnSave = document.getElementById("saveBtn");

btnSave.addEventListener("click", save);


/* -------------------------------------------- */
/*           Système de restauration            */
/* -------------------------------------------- */

function restore() {

    // Si il n'y a pas de sauvegarde, ne pas restaurer
    if (isSaveExist === false) {
        return;
    }

    /* Stats Joueur */
    Player.stats.hp = Number(localStorage.getItem("hp"));
    Player.stats.maxHp = Number(localStorage.getItem("maxHp"));
    Player.stats.attack = Number(localStorage.getItem("attack"));
    Player.stats.defense = Number(localStorage.getItem("defense"));
    Player.stats.speed = Number(localStorage.getItem("speed"));
    Player.stats.xp = Number(localStorage.getItem("xp"));
    Player.stats.xpToNext = Number(localStorage.getItem("xpToNext"));

    /* Niveau et Or */
    Player.gold = Number(localStorage.getItem("gold"));
    level = Number(localStorage.getItem("level"));
    pointsUpdate = Number(localStorage.getItem("pointsUpdate"));

    /* Inventaire */
    Player.inventory = JSON.parse(localStorage.getItem("inventory")) || [];

    /* Equipement */
    Player.equipment = JSON.parse(localStorage.getItem("equipment")) || {
        weapon: null, armor: null, accessory: null
    };

    /* Carte */
    currentLevel = Number(localStorage.getItem("mapActual"));
    actualMap = JSON.parse(localStorage.getItem("mapData"));
    ennemies = JSON.parse(localStorage.getItem("ennemies")) || {};

    /* Position Joueur */
    Player.x = Number(localStorage.getItem("playerX"));
    Player.y = Number(localStorage.getItem("playerY"));

    /* Remettre le joueur sur la carte */
    actualMap[Player.y][Player.x] = CELL_TYPES.PLAYER;

    /* Recharger l’UI et la carte */
    loadMap();
    UpdateHUD();
    completProfile();
    inventory();

}

/* -------------------------------------------- */
/*            Bouton de restauration            */
/* -------------------------------------------- */

const restoreBtn = document.getElementById("restoreBtn");

restoreBtn.addEventListener("click", restore);

areThereASave()
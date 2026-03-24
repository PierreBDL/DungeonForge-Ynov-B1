/* -------------------------------------------- */
/*            Système de sauvegarde             */
/* -------------------------------------------- */

function save () {
    localStorage.setItem("hp", Player.stats.hp); // Vie
    localStorage.setItem("maxHp", Player.stats.maxHp); // Or
    localStorage.setItem("attack", Player.stats.attack); // Attaque
    localStorage.setItem("defense", Player.stats.defense); // Défence
    localStorage.setItem("gold", Player.gold); // Or
    localStorage.setItem("xp", Player.stats.xp); // Expérience
    localStorage.setItem("level", level); // Niveau

    // Carte
    let matriceMap = JSON.stringify(maps[currentLevel])
    localStorage.setItem("mapActual", currentLevel);
    localStorage.setItem("mapData", matriceMap);

    // Joueur
    localStorage.setItem("playerX", Player.x);
    localStorage.setItem("playerY", Player.y);
}

/* -------------------------------------------- */
/*             Bouton de sauvegarde             */
/* -------------------------------------------- */

const btnSave = document.getElementById("saveBtn");

btnSave.addEventListener("click", save);


/* -------------------------------------------- */
/*            Système de sauvegarde             */
/* -------------------------------------------- */

function restore () {
    Player.stats.hp = Number(localStorage.getItem("hp")); // Vie
    Player.stats.maxHp = Number(localStorage.getItem("maxHp")); // Or
    Player.stats.attack = Number(localStorage.getItem("attack")); // Attaque
    Player.stats.defense = Number(localStorage.getItem("defense")); // Défence
    Player.gold = Number(localStorage.getItem("gold")); // Or
    Player.stats.xp = Number(localStorage.getItem("xp")); // Expérience
    level = Number(localStorage.getItem("level")); // Niveau

    // Carte
    currentLevel = Number(localStorage.getItem("mapActual"));
    let matriceMap = localStorage.getItem("mapData");
    maps[currentLevel] = JSON.parse(matriceMap);
    actualMap = maps[currentLevel];

    // Joueur
    Player.x = Number(localStorage.getItem("playerX"));
    Player.y = Number(localStorage.getItem("playerY"));

    loadMap(); // Recharger la carte
    UpdateHUD(); // MAJ HUD
}

/* -------------------------------------------- */
/*             Bouton de sauvegarde             */
/* -------------------------------------------- */

const restoreBtn = document.getElementById("restoreBtn");

restoreBtn.addEventListener("click", restore);

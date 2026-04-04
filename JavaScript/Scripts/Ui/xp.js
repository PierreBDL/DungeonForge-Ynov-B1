let level = 1; // Niveau du joueur

function nextLevel() {
    /* -------------------------------------------- */
    /*         Regarder si niveau suivant           */
    /* -------------------------------------------- */

    while (Player.stats.xp >= Player.stats.xpToNext) {
        Player.stats.xp = Player.stats.xp - Player.stats.xpToNext;
        level++;
        UpdateStatsNextLevel(); // Mise à jour des stats

        // Soigner le joueur
        Player.stats.hp = Player.stats.maxHp;
    }

    // MAJ UI
    UpdateHUD();
}


/* -------------------------------------------- */
/*             Augmentation niveau              */
/* -------------------------------------------- */

let pointsUpdate = 0; // Points pour améliorer les compétences

function UpdateStatsNextLevel() {
    pointsUpdate += 5;

    UpdatePointsUiProfile(); // MAJ de l'UI des points dans le profil

    Player.stats.xpToNext = Math.floor(Player.stats.xpToNext * 1.2); // Augmenter de 20% l'expérience nécessaire pour augmenter de niveau
}

function UpdatePointsUiProfile() {
    const points = document.getElementById("pointsLevel");
    if (points) {
        points.innerText = "Points disponibles : " + pointsUpdate;
    }
}


/* -------------------------------------------- */
/*             Augmentation stats               */
/* -------------------------------------------- */

function updateStats(stat) {
    // Si on n'a pas de points -> partir
    if (pointsUpdate <= 0) {
        return;
    }

    // En fonction de la stat :
    switch (stat) {
        case "hp":
            Player.stats.maxHp += 5;
            pointsUpdate -= 1;
            break;
        case "attack":
            Player.stats.attack += 2;
            pointsUpdate -= 1;
            break;
        case "defense":
            Player.stats.defense += 2;
            pointsUpdate -= 1;
            break;
    }

    completProfile(); // MAJ du profil
}

/*
    Player.stats.maxHp += 20,
    Player.stats.attack += 3,
    Player.stats.defense += 2
*/

/* -------------------------------------------- */
/*     Regarder si niveau suivant (ennemi)      */
/* -------------------------------------------- */

function nextLevelEnnemy() {

    Ennemy.stats.level++;
    
    // Vie
    Ennemy.stats.maxHp = 40 + (Ennemy.stats.level * 15);
    Ennemy.stats.hp = Ennemy.stats.maxHp;
    
    // Attaque
    Ennemy.stats.attack = 12 + (Ennemy.stats.level * 2);
    
    // Défence
    Ennemy.stats.defense = 3 + (Ennemy.stats.level * 1);

    // Augmenter les attaques aléatoires
    let attacks = Object.keys(Ennemy.attackTypes);
    for (let attackName of attacks) {
        // Augmentation de base selon le niveau
        Ennemy.attackTypes[attackName] += (Ennemy.stats.level * 1.5);
    }
}
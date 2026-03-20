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

        // MAJ UI
        UpdateHUD ();
    }
}


/* -------------------------------------------- */
/*             Augmentation stats               */
/* -------------------------------------------- */

function UpdateStatsNextLevel() {
    Player.stats.maxHp += 20;
    Player.stats.attack += 3;
    Player.stats.defense += 2;

    Player.stats.xpToNext = Math.floor(Player.stats.xpToNext * 1.2); // Augmenter de 20% l'expérience nécessaire pour augmenter de niveau
}
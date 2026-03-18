function fight () {
    const fightWindow = document.getElementById("fight");
    fightWindow.style.display = "flex";

    // Bloquer les mouvement
    isInFight = true;

    /* -------------------------------------------- */
    /*                   Joueur                     */
    /* -------------------------------------------- */

    // Initialiser le nom
    const playerName = document.getElementById("name-player");
    playerName.innerText = Player.name;

    // Initialiser la vie
    const playerHp = document.getElementById("player-health-text");
    playerHp.innerText = (Player.stats.hp + " / " + Player.stats.maxHp);

    // Gestion de la bare de vie
    const playerHpBar = document.getElementById("player-health");
    let widthPlayerHpBar = ((Player.stats.hp / Player.stats.maxHp) * 100);
    playerHpBar.style.width = widthPlayerHpBar + "px";


    /* -------------------------------------------- */
    /*                   Ennemie                    */
    /* -------------------------------------------- */

    // Initialiser le nom
    const EnnemyName = document.getElementById("name-ennemy");
    EnnemyName.innerText = Ennemy.name;

    // Initialiser la vie
    const EnnemyHp = document.getElementById("ennemy-health-text");
    EnnemyHp.innerText = (Ennemy.stats.hp + " / " + Ennemy.stats.maxHp);

    // Gestion de la bare de vie
    const EnnemyHpBar = document.getElementById("ennemy-health");
    let widthEnnemyHpBar = ((Ennemy.stats.hp / Ennemy.stats.maxHp) * 100);
    EnnemyHpBar.style.width = widthEnnemyHpBar + "px";
}
function fight() {
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
    printHealth(Player, "player");


    /* -------------------------------------------- */
    /*                   Ennemie                    */
    /* -------------------------------------------- */

    // Initialiser le nom
    const EnnemyName = document.getElementById("name-ennemy");
    EnnemyName.innerText = Ennemy.name;

    // Initialiser la vie
    printHealth(Ennemy, "ennemy");
}

/* -------------------------------------------- */
/*                  Actions                     */
/* -------------------------------------------- */

// Fuir

const btnGiveUp = document.getElementById("giveUp");

btnGiveUp.addEventListener("click", () => {
    // Enlever de la vie quand on fuit
    Player.stats.health = Player.stats.health * 0.8;

    // Arrêter le combat
    isInFight = false;
    closeFight();
});


/* -------------------------------------------- */
/*             Fermeture combat                 */
/* -------------------------------------------- */

function closeFight () {
    const fightWindow = document.getElementById("fight");
    fightWindow.style.display = "none";

    // Remettre le texte par défaut
    const fightText = document.getElementById("fight-text");
    fightText.innerHTML = "Combat en cours" ;
}

/* -------------------------------------------- */
/*                 Attaquer                     */
/* -------------------------------------------- */

const btnAttack = document.getElementById("attack");

btnAttack.addEventListener("click", () => {
    dammageAmount = (Player.stats.attack - Ennemy.stats.defense);
    Ennemy.stats.hp -= dammageAmount;

    // MAJ vie
    printHealth(Ennemy, "ennemy")

    // Texte
    const fightText = document.getElementById("fight-text");
    fightText.innerHTML = fightText.textContent + "<br>" + Player.name + " inflige " + dammageAmount + " dégats à " + Ennemy.name + "<br>";
});

/* -------------------------------------------- */
/*              Afficher la vie                 */
/* -------------------------------------------- */

function printHealth(targetObject, target) {
    // Texte vie
    const Hp = document.getElementById(target + "-health-text");
    Hp.innerText = (targetObject.stats.hp + " / " + targetObject.stats.maxHp);

    // Gestion de la bare de vie
    const HpBar = document.getElementById(target + "-health");
    let widthEnnemyHpBar = ((targetObject.stats.hp / targetObject.stats.maxHp) * 100);
    HpBar.style.width = widthEnnemyHpBar + "px";
}
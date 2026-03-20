function fight(ennemy) {
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
    EnnemyName.innerText = ennemy.name || "Ennemy"; // Si ennemi.name est vide -> mettre "Ennemy"

    // Initialiser la vie
    printHealth(ennemy, "ennemy");
}

/* -------------------------------------------- */
/*                     Fuir                     */
/* -------------------------------------------- */

// Fuir

const btnGiveUp = document.getElementById("giveUp");

btnGiveUp.addEventListener("click", () => {
    // Enlever de la vie quand on fuit
    Player.stats.hp = Math.floor(Player.stats.hp * 0.8);

    // Arrêter le combat
    isInFight = false;
    closeFight();
});


/* -------------------------------------------- */
/*             Fermeture combat                 */
/* -------------------------------------------- */

function closeFight() {
    const fightWindow = document.getElementById("fight");
    fightWindow.style.display = "none";

    // Remettre le texte par défaut
    const fightText = document.getElementById("fight-text");
    fightText.innerHTML = "Combat en cours";
}

/* -------------------------------------------- */
/*                 Attaquer                     */
/* -------------------------------------------- */

let turnFight = 0;

const btnAttack = document.getElementById("attack");

btnAttack.addEventListener("click", () => {
    // Tour de combat
    turnFight++;

    // Joueur attaque l'ennemi
    attackPhase(Player, currentEnnemy);

    // Voir si l'ennemi n'a plus de PV
    if (currentEnnemy.stats.hp <= 0) {
        // Donner le butin
        giveItems("Vous avez vaincu un ennemi ! Vous obtenez : <br>", { gold: 10, xp: 20 });

        // Rendre la moitié de sa vie au joueur
        Player.stats.hp = Player.stats.maxHp * 0.5;

        // Supprimer ennemie de la carte
        map[currentEnnemy.y][currentEnnemy.x] = CELL_TYPES.FLOOR;
        let keyCurrentEnnemy = "ennemy_" + currentEnnemy.y + "_" + currentEnnemy.x;
        delete ennemies[keyCurrentEnnemy];

        currentEnnemy = null;

        // Mettre le tour de combat à zéro
        turnFight = 0;

        // Arrêter le combat
        isInFight = false;
        loadMap(); // Recharger la carte pour supprimer l'ennemi
        closeFight();

        // Regarder si on passe un niveau avec l'expérience
        nextLevel();

    } else {
        // Ennemi attaque le joueur
        attackPhase(currentEnnemy, Player);

        // Si le joueur n'a plus de PV
        if (Player.stats.hp <= 0) {
            // Réinitialiser la vie de l'ennemi
            currentEnnemy.stats.hp = currentEnnemy.stats.maxHp;

            // Redonner la moitier de ses PVs au joueur
            Player.stats.hp = Player.stats.maxHp * 0.5;

            // Mettre le tour de combat à zéro
            turnFight = 0;

            isInFight = false;
            closeFight();
        }
    }
});


/* -------------------------------------------- */
/*              Attaque ennemi                  */
/* -------------------------------------------- */

function attackPhase(attacker, target) {

    let dammageAmount = 0;

    // Si l'ennemi attaque le joueur
    if (attacker === currentEnnemy) {
        // Récupérer les noms des attaques
        let TypesAttack = Object.keys(currentEnnemy.attackTypes);

        // Choisir une attaque aléatoire
        let attackEnnemyChooseIndex = Math.floor(Math.random() * TypesAttack.length);
        let attackEnnemyChoose = TypesAttack[attackEnnemyChooseIndex];

        // Calculer + infliger les dégats
        dammageAmount = (currentEnnemy.attackTypes[attackEnnemyChoose] - Player.stats.defense);
        Player.stats.hp -= dammageAmount;

        // MAJ vie de la vie du joueur
        printHealth(Player, "player");
    } else {
        // Si le joueur attaque l'ennemi

        // Calculer + infliger les dégats
        dammageAmount = (Player.stats.attack - currentEnnemy.stats.defense);
        currentEnnemy.stats.hp -= dammageAmount;

        // MAJ vie de la vie de l'ennemie
        printHealth(currentEnnemy, "ennemy")
    }

    // Si l'attaque est négative à cause de la défence -> attaqye de 1
    if (dammageAmount <= 0) {
        dammageAmount = 1;
    }

    // Texte
    const fightText = document.getElementById("fight-text");
    fightText.innerHTML = fightText.innerHTML + "<br> " + turnFight + ": " + attacker.name + " inflige " + dammageAmount + " dégats à " + target.name;

    // Scroller vers le bas
    fightText.scrollTop = fightText.scrollHeight;
}

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
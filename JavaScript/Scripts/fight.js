function fight(ennemy) {
    const fightWindow = document.getElementById("fight");
    fightWindow.style.display = "flex";

    // Bloquer les mouvements
    isInFight = true;

    // Réinitialiser les valeurs de défense
    Player.isDefending = false;
    currentEnnemy.isDefending = false;
    currentEnnemy.poisonTurnsLeft = 0;
    currentEnnemy.isPoisoned = false;

    /* -------------------------------------------- */
    /*                   Joueur                     */
    /* -------------------------------------------- */

    // Initialiser le nom
    const playerName = document.getElementById("name-player");
    playerName.innerText = Player.name;

    // Initialiser la vie
    printHealth(Player, "player");


    /* -------------------------------------------- */
    /*                    Ennemi                    */
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
/*                   Défendre                   */
/* -------------------------------------------- */

const btnDefend = document.getElementById("defend");

btnDefend.addEventListener("click", () => {

    // Si on a plus de vie -> game over
    checkPlayerDeath();

    // Tour de combat
    turnFight++;

    // Joueur se met en défense
    Player.isDefending = true;
    const fightText = document.getElementById("fight-text");
    fightText.innerHTML = fightText.innerHTML + "<br> " + turnFight + ": " + Player.name + " se met en défense!";
    fightText.scrollTop = fightText.scrollHeight;

    // Ennemi attaque le joueur (avec défense réduite)
    attackPhase(currentEnnemy, Player);

    // Réinitialiser la défense
    Player.isDefending = false;

    // Si le joueur n'a plus de PV
    checkPlayerDeath();
});


/* -------------------------------------------- */
/*              Utiliser un objet               */
/* -------------------------------------------- */

const btnUseItem = document.getElementById("useItem");

btnUseItem.addEventListener("click", () => {

    // Si on a plus de vie -> game over
    checkPlayerDeath();

    // Vérifier qu'il y a des objets dans l'inventaire
    if (Player.inventory.length === 0) {
        printMessage("Votre inventaire est vide!");
        return;
    }

    // Ouvrir l'inventaire
    const inventoryOverlay = document.getElementById("inventory");
    inventoryOverlay.style.display = "flex";
    inventoryIsOpen = true;
    inventory();

    // Marquer que nous sommes en utilisation d'objet en combat
    itemUsedInFight = true;
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
let isPlayerDead = false;
let itemUsedInFight = false;

const btnAttack = document.getElementById("attack");

btnAttack.addEventListener("click", () => {

    // Si on a plus de vie -> game over
    checkPlayerDeath();

    // Tour de combat
    turnFight++;

    // Joueur attaque l'ennemi
    attackPhase(Player, currentEnnemy);

    // Si l'ennemi n'existe plus ou si le joueur est mort -> ne pas continuer le combat
    if (!currentEnnemy || Player.stats.hp <= 0) {
        return;
    };

    // Voir si l'ennemi n'a plus de PV
    if (currentEnnemy.stats.hp <= 0) {

        // Donner le butin
        giveItems("Vous avez vaincu un ennemi ! Vous obtenez : <br>", { gold: 10, xp: 20 });

        // Supprimer ennemie de la carte
        actualMap[currentEnnemy.y][currentEnnemy.x] = CELL_TYPES.FLOOR;
        let keyCurrentEnnemy = "ennemy_" + currentEnnemy.y + "_" + currentEnnemy.x;
        delete ennemies[keyCurrentEnnemy];
        currentEnnemy = null;

        // Compter la mort
        numberOfKills++;

        // Mettre le tour de combat à zéro
        turnFight = 0;

        // Arrêter le combat
        isInFight = false;
        closeFight();

        loadMap(); // Recharger la carte pour supprimer l'ennemi

        // Regarder si on passe un niveau avec l'expérience
        nextLevel();

        return;
    }

    // Ennemi attaque le joueur
    attackPhase(currentEnnemy, Player);

    // Si le joueur n'a plus de PV
    if (Player.stats.hp <= 0) {

        // Game Over
        checkPlayerDeath();
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

        // Si le joueur se défend, réduire les dégâts de 50%
        if (Player.isDefending) {
            dammageAmount = Math.floor(dammageAmount * 0.5);
        }

        // Si trop de défence, on fait 1 dégat
        if (dammageAmount <= 0) {
            dammageAmount = 1;
        }

        // Arrondir les dégats
        dammageAmount = Math.floor(dammageAmount);

        Player.stats.hp -= dammageAmount;

        // MAJ vie de la vie du joueur
        printHealth(Player, "player");
    } else {
        // Si le joueur attaque l'ennemi

        // Calculer + infliger les dégats
        dammageAmount = (Player.stats.attack - currentEnnemy.stats.defense);

        // Si l'ennemi se défend, réduire les dégâts de 50%
        if (currentEnnemy.isDefending) {
            dammageAmount = Math.floor(dammageAmount * 0.5);
        }

        currentEnnemy.stats.hp -= dammageAmount;

        // Arrondir les dégats
        dammageAmount = Math.floor(dammageAmount);

        // MAJ vie de la vie de l'ennemie
        printHealth(currentEnnemy, "ennemy")
    }

    // Si l'attaque est négative à cause de la défence -> attaque de 1
    if (dammageAmount <= 0) {
        dammageAmount = 1;
    }

    // Texte
    const fightText = document.getElementById("fight-text");
    fightText.innerHTML = fightText.innerHTML + "<br> " + turnFight + ": " + attacker.name + " inflige " + dammageAmount + " dégats à " + target.name;


    // Animation de l'attaque
    const targetElement = document.getElementById(target === Player ? "player" : "ennemy");
    targetElement.classList.add("damage-flash");

    setTimeout(() => {
        targetElement.classList.remove("damage-flash");
    }, 400);

    // Appliquer le poison de l'ennemi
    if (currentEnnemy && currentEnnemy.isPoisoned && currentEnnemy.poisonTurnsLeft > 0) {
        let poisonDamage = 5;
        currentEnnemy.stats.hp -= poisonDamage;
        currentEnnemy.poisonTurnsLeft--;

        fightText.innerHTML = fightText.innerHTML + "<br> L'ennemi subit " + poisonDamage + " dégâts du poison! (Tours restants: " + currentEnnemy.poisonTurnsLeft + ")";

        // Si l'ennemi n'a plus de poison
        if (currentEnnemy.poisonTurnsLeft <= 0) {
            currentEnnemy.isPoisoned = false;
            fightText.innerHTML = fightText.innerHTML + "<br> Le poison s'est dissipé.";
        }

        printHealth(currentEnnemy, "ennemy");
    }

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
    let widthEnnemyHpBar = Math.max(0, (targetObject.stats.hp / targetObject.stats.maxHp) * 100);
    HpBar.style.width = widthEnnemyHpBar + "%";
}


/* -------------------------------------------- */
/*         Vérifier la vie du joueur            */
/* -------------------------------------------- */

function checkPlayerDeath() {
    if (Player.stats.hp <= 0) {
        Player.stats.hp = 0;
        printHealth(Player, "player");
        gameOver();
        // Mettre le tour de combat à zéro
        turnFight = 0;
        isInFight = false;
    }
}
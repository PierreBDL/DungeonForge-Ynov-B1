let partie = 0;
let numberOfRooms = 0;
let numberOfKills = 0;

// Charger les scores sauvegardés
let scores = {};

if (localStorage.getItem("scores")) {
    scores = JSON.parse(localStorage.getItem("scores"));
    partie = Object.keys(scores).length > 0 ? Math.max(...Object.keys(scores).map(k => parseInt(k.split("_")[1]) || 0)) : 0;
}

function gameOver() {
    partie++;
    scores["partie_" + partie] = {
        rooms: numberOfRooms,
        kills: numberOfKills,
        level: level,
        gold: Player.gold
    };

    // Sauvegarder
    localStorage.setItem("scores", JSON.stringify(scores));

    // Réinitialiser les compteurs
    numberOfRooms = 0;
    numberOfKills = 0;

    // Réinitialiser les stats du joueur
    Player.stats.hp = 100;
    Player.stats.maxHp = 100;
    Player.stats.attack = 15;
    Player.stats.defense = 5;
    Player.stats.xp = 0;
    Player.stats.xpToNext = 10;
    Player.gold = 0;
    Player.inventory = [];
    level = 1;
    pointsUpdate = 0;

    // Fermer le combat
    isInFight = false;
    currentEnnemy = null;
    turnFight = 0;
    closeFight();

    // Remettre à la première carte
    currentLevel = 0;
    actualMap = maps[0];
    originTile = CELL_TYPES.FLOOR;
    initPlayer();
    initEnnemies();
    loadMap();
    UpdateHUD();

    // Afficher le game over
    showGameOver();
}

function showGameOver() {
    const overlay = document.getElementById("gameOverOverlay");
    overlay.style.display = "flex";
    showScores();
}

function hideGameOver() {
    const overlay = document.getElementById("gameOverOverlay");
    overlay.style.display = "none";
}

function showScores() {
    const container = document.getElementById("scoresContainer");

    // Vider les scores précédents
    container.innerHTML = "";

    const keys = Object.keys(scores).reverse(); // Plus récent en premier

    if (keys.length === 0) {
        container.innerHTML = "<div class='score-empty'>Aucune partie jouée</div>";
        return;
    }

    keys.forEach((key, i) => {
        const score = scores[key];
        const lignScore = document.createElement("div");
        lignScore.classList.add("score-row");
        if (i === 0) lignScore.classList.add("score-row-latest");
        lignScore.innerHTML = `
            <span class="score-partie">${key.replace("_", " ")}</span>
            <span class="score-stat">${score.kills} kills</span>
            <span class="score-stat">${score.rooms} salles</span>
            <span class="score-stat">Niv. ${score.level}</span>
            <span class="score-stat">${score.gold}G</span>
            <span class="score-date">${new Date().toLocaleString()}</span>
        `;
        container.appendChild(lignScore);
    });
}
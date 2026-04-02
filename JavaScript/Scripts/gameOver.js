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
        gold: Player.gold,
        date: new Date().getTime()
    };

    // Sauvegarder les scores
    localStorage.setItem("scores", JSON.stringify(scores));
    
    // Supprimer la sauvegarde pour éviter la triche
    localStorage.removeItem("saveExists");

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
    
    // Rediriger vers le menu principal
    window.location.href = "../../index.html";
}

function showScores() {
    const container = document.getElementById("scoresContainer");

    // Vider les scores précédents
    container.innerHTML = "";

    const keys = Object.keys(scores).reverse();

    // Si aucun score n'est présent, afficher un message
    if (keys.length === 0) {
        container.innerHTML = "<div class='score-empty'>Aucune partie enregistrée.</div>";
        return;
    }

    // Créer une ligne d'en-tête pour le tableau
    const headerRow = document.createElement("div");
    headerRow.classList.add("score-row", "score-header");

    headerRow.innerHTML = `
        <span class="score-partie">Parties</span>
        <span class="score-stat">Kills</span>
        <span class="score-stat">Salles</span>
        <span class="score-stat">Niveau</span>
        <span class="score-stat">Or</span>
        <span class="score-date">Date</span>
    `;
    container.appendChild(headerRow);

    keys.forEach((key, i) => {
        const score = scores[key];
        const lignScore = document.createElement("div");
        lignScore.classList.add("score-row");
        if (i === 0) lignScore.classList.add("score-row-latest");

        // Formater la date proprement
        const dateObj = new Date(score.date);
        const dateFormatted = dateObj.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short'
        }) + " " + dateObj.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        lignScore.innerHTML = `
            <span class="score-partie">${key.replace("_", " ")}</span>
            <span class="score-stat">${score.kills}</span>
            <span class="score-stat">${score.rooms}</span>
            <span class="score-stat">Niv. ${score.level}</span>
            <span class="score-stat">${score.gold}G</span>
            <span class="score-date">${dateFormatted}</span>
        `;
        container.appendChild(lignScore);
    });
}
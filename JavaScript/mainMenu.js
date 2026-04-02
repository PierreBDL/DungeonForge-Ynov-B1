/* -------------------------------------------- */
/*                 Paramètres                   */
/* -------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const settingsBtn = document.getElementById("settings-btn");
    const newGameBtn = document.getElementById("new-game-btn");
    const resumeBtn = document.getElementById("resume-btn");
    const quitBtn = document.getElementById("quit-btn");

    // Ouvrir les paramètres
    settingsBtn.addEventListener("click", () => {
        openSettings();
    });

    // Nouvelle aventure
    newGameBtn.addEventListener("click", () => {
        // Effacer la sauvegarde pour commencer un nouveau jeu
        localStorage.removeItem("saveExists");
        window.location.href = "./Html/game.html";
    });

    // Reprendre une partie
    resumeBtn.addEventListener("click", () => {
        // Vérifier s'il y a une sauvegarde
        const saveExists = localStorage.getItem("saveExists");
        if (saveExists === "true") {
            // Charger le jeu avec la sauvegarde
            window.location.href = "./Html/game.html";
        } else {
            alert("Aucune sauvegarde trouvée. Commencez une nouvelle aventure !");
        }
    });

    // Quitter
    quitBtn.addEventListener("click", () => {
        alert("On ne quitte pas DOMgeonForge !");
    });

    readOst();
});

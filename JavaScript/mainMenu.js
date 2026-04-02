/* -------------------------------------------- */
/*              État du menu                    */
/* -------------------------------------------- */

let menuActive = false;

// Fonction pour activer le menu
function activateMenu() {
    if (menuActive) return; // Éviter les appels multiples
    
    menuActive = true;
    const mainMenu = document.getElementById("main-menu");
    
    // Retirer la classe initial et ajouter la classe active
    mainMenu.classList.remove("menu-initial");
    mainMenu.classList.add("menu-active");
    
    // Lancer la musique
    readOst();
}

// Événements pour activer le menu
document.addEventListener("click", activateMenu);
document.addEventListener("keydown", activateMenu);

/* -------------------------------------------- */
/*                 Boutons Menu                 */
/* -------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const settingsBtn = document.getElementById("settings-btn");
    const newGameBtn = document.getElementById("new-game-btn");
    const resumeBtn = document.getElementById("resume-btn");
    const quitBtn = document.getElementById("quit-btn");

    // Ouvrir les paramètres
    settingsBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Empêcher la propagation
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
    
    // Initialiser le menu en état initial
    const mainMenu = document.getElementById("main-menu");
    mainMenu.classList.add("menu-initial");
});

/* -------------------------------------------- */
/*              Ouverture Profil                */
/* -------------------------------------------- */

const openCloseProfileBtn = document.getElementById("openCloseProfileBtn");
profileIsOpen = false;

openCloseProfileBtn.addEventListener("click", () => {
    const profileOverlay = document.getElementById("profile");

    profileOverlay.style.display = "flex";

    profileIsOpen = true;

    // Remplir le profil
    completProfile();
})

/* -------------------------------------------- */
/*              Fermeture Profil                */
/* -------------------------------------------- */

const closeProfileyBtn = document.getElementById("closeProfileyBtn");

closeProfileyBtn.addEventListener("click", closeProfile);

function closeProfile() {
    const profileOverlay = document.getElementById("profile");
    profileOverlay.style.display = "none";
    profileIsOpen = false;
}

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && profileIsOpen === true) {
        closeProfile();
    }
});

/* -------------------------------------------- */
/*               Remplir Profil                 */
/* -------------------------------------------- */

const profileBody = document.querySelector(".profile-body");

function completProfile() {
    // Vider le profil actuel
    profileBody.innerHTML = "";

    // Remplir le profil avec les infos
    let content = "";

    // Header avec photo
    content += `
        <div id='profile-content-header'>
            <img src='./Images/hero_portrait.svg' id='profile-image' alt='Héros'>
            <div class="profile-name">` + Player.name + `</div>
            <div class="profile-level">Niveau ` + level + `</div>
            <div id="pointsLevel"> Points disponibles : ` + pointsUpdate + ` </div>
        </div>
    `;

    // Stats
    content += `<div id="profile-content">`;

    // Vie
    content += `
        <div class='profile-stat'>
            <div class='profile-stat-label'> Vie </div>
            <div id="profile-health-bg">
                <div id="profile-health" style="width: ` + (Player.stats.hp / Player.stats.maxHp) * 100 + `%"></div>
            </div>
            <div class='profile-stat-value'>`+ Player.stats.hp + " / " + Player.stats.maxHp + `</div>
            <button class="profile-btn-update" id="update-hp"> + </button>
        </div>
    `;

    // Attaque
    content += `
        <div class='profile-stat'>
            <div class='profile-stat-label'> Attaque </div>
            <div class='profile-stat-value'>` + Player.stats.attack + `</div>
            <button class="profile-btn-update" id="update-attack"> + </button>
        </div>
    `;

    // Défense
    content += `
        <div class='profile-stat'>
            <div class='profile-stat-label'> Défence </div>
            <div class='profile-stat-value'>` + Player.stats.defense + `</div>
            <button class="profile-btn-update" id="update-defense"> + </button>
        </div>
    `;

    // Or
    content += `
        <div class='profile-stat'>
            <div class='profile-stat-label'> Or </div>
            <div class='profile-stat-value'>` + Player.gold + `</div>
        </div>
    `;

    content += "</div>"; // Fin de la div content

    // Mettre le contenu dans le profil
    profileBody.innerHTML = content;

    /* -------------------------------------------- */
    /*         Clique Amélioration Stats            */
    /* -------------------------------------------- */

    // Vie

    const hpUpdateBtn = document.getElementById("update-hp");

    hpUpdateBtn.addEventListener("click", () => updateStats("hp"));

    // Attaque

    const attackUpdateBtn = document.getElementById("update-attack");

    attackUpdateBtn.addEventListener("click", () => updateStats("attack"));

    // Défence

    const defenseUpdateBtn = document.getElementById("update-defense");

    defenseUpdateBtn.addEventListener("click", () => updateStats("defense"));
}

// Initialisation du profil au début du jeu
completProfile();


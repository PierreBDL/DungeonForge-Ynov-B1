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
            <img src='../Images/UI/hero_portrait.svg' id='profile-image' alt='Héros'>
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

    // Équipement
    content += `
        <div id="profile-equipment">
            <div class="profile-equipment-title">Équipement</div>
            <div class="profile-equipment-grid">
                <div class="equipment-slot">
                    <div class="slot-label">Arme</div>
                    <img id="equipment-weapon" src="${Player.equipment.weapon ? `../Images/Items/${Player.equipment.weapon}.svg` : '../Images/Items/weapon-empty.svg'}" alt="Arme" class="equipment-image">
                    <div class="slot-name" id="equipment-weapon-name">${Player.equipment.weapon || 'Aucun'}</div>
                </div>
                <div class="equipment-slot">
                    <div class="slot-label">Armure</div>
                    <img id="equipment-armor" src="${Player.equipment.armor ? `../Images/Items/${Player.equipment.armor}.svg` : '../Images/Items/armor-empty.svg'}" alt="Armure" class="equipment-image">
                    <div class="slot-name" id="equipment-armor-name">${Player.equipment.armor || 'Aucun'}</div>
                </div>
                <div class="equipment-slot">
                    <div class="slot-label">Accessoire</div>
                    <img id="equipment-accessory" src="${Player.equipment.accessory ? `../Images/Items/${Player.equipment.accessory}.svg` : '../Images/Items/accessory-empty.svg'}" alt="Accessoire" class="equipment-image">
                    <div class="slot-name" id="equipment-accessory-name">${Player.equipment.accessory || 'Aucun'}</div>
                </div>
            </div>
        </div>
    `;

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


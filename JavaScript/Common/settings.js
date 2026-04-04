// DOM

const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const settingsWindow = document.getElementById("settings");

// Global
let isSettingsOpen = false;

/* -------------------------------------------- */
/*        Ouverture/Fermeture paramètres        */
/* -------------------------------------------- */

function openSettings () {
    settingsWindow.style.display = "flex";
    isSettingsOpen = true;
}

function closeSettings () {
    settingsWindow.style.display = "none";
    isSettingsOpen = false;
}

/* -------------------------------------------- */
/*    Ouverture/Fermeture paramètres (events)   */
/* -------------------------------------------- */

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && isSettingsOpen === false) {
        // On ouvre les paramètres
        openSettings();
    } else if (inventoryIsOpen === true || profileIsOpen === true) {
            closeInventory();
            closeProfile();
            closeMerchant();
    } else if (e.key === 'Escape' && isSettingsOpen === true) {
        closeSettings();
    }
});

closeSettingsBtn.addEventListener('click', closeSettings);


/* -------------------------------------------- */
/*                 Paramètres                   */
/* -------------------------------------------- */

// Audio volume

const audioLevel = document.getElementById("settings-volume");

audioLevel.addEventListener('change', () => {
    volumeAudio(audioLevel.value);
    audioMute.checked = false; // On enlève le muet si on bouge le volume
});

// Audio muet ou non

const audioMute = document.getElementById("settings-mute");

audioMute.addEventListener('change', () => {
    volumeAudio(audioLevel.checked);
});

/* -------------------------------------------- */
/*        Bouton Quitter vers le menu           */
/* -------------------------------------------- */

const quitGameBtn = document.getElementById("quitGameBtn");

if (quitGameBtn) {
    quitGameBtn.addEventListener("click", () => {
        // Rediriger vers le menu principal
        window.location.href = "../index.html";
    });
}
// Audio du html
const audio = document.querySelector("audio");

let osts = [
    { name: "Tzar Burden of The Crown Soundtrack (CD-Rip) - Track 1.mp3", type: "fond" },
    { name: "Evoland 2 OST - Track 27 (Giros Lab).mp3", type: "pnj" },
    { name: "Evoland 2 OST - Track 36 (Tactics Time).mp3", type: "combat" },
    { name: "Evoland 2 OST - Track 01 (Title Screen).mp3", type: "menu"}
];

let currentOstIndex = 0;

/* -------------------------------------------- */
/*               Lire la musique                */
/* -------------------------------------------- */

function readOst () {
    // Vérifier que l'audio existe
    if (!audio) return;
    
    // Lancement de l'audio en boucle
    audio.play()
    audio.loop = true;
    audio.volume = 0.4;

    // MAJ du slider de volume
    if (audioLevel) audioLevel.value = audio.volume * 100;

    // On évite que l'audio redémarre en boucle
    window.removeEventListener('click', readOst);
    window.removeEventListener('keydown', readOst);

    // Sauvegarde
    saveSettings();
}

window.addEventListener('click', readOst);
window.addEventListener('keydown', readOst);

// Lancer la musique automatiquement si possible
setTimeout(() => {
    if (audio && audio.paused) {
        audio.play()
    }
}, 100);

/* -------------------------------------------- */
/*              Changer la musique              */
/* -------------------------------------------- */

function changeMusic() {
    // Sélectionner une musique différente de celle actuelle
    let newOstIndex;
    do {
        newOstIndex = Math.floor(Math.random() * osts.length);
    } while (newOstIndex === currentOstIndex && osts.length > 1);
    
    currentOstIndex = newOstIndex;
    
    // Changer l'audio
    audio.src = "../Audio/" + osts[currentOstIndex].name;
    audio.play();
    audio.loop = true;
    audio.volume = audioLevel.value / 100;
}

/* -------------------------------------------- */
/*     Jouer une musique d'un type spécifique   */
/* -------------------------------------------- */

function playMusicType(type) {
    // Vérifier que l'audio existe
    if (!audio) return;
    
    // Récupérer toutes les musiques du type demandé
    const musicsOfType = osts.filter(ost => ost.type === type);
    
    if (musicsOfType.length === 0) {
        return;
    }
    
    // Sélectionner une musique aléatoire du type
    const randomIndex = Math.floor(Math.random() * musicsOfType.length);
    const selectedMusic = musicsOfType[randomIndex];
    
    // Mettre à jour l'index courant
    currentOstIndex = osts.findIndex(ost => ost.name === selectedMusic.name);
    
    // Charger et jouer la musique
    audio.src = "../Audio/" + selectedMusic.name;
    audio.play();
    audio.loop = true;
    audio.volume = audioLevel.value / 100;
}

/* -------------------------------------------- */
/*  Pause ou Reprendre la musique  (paramètres) */
/* -------------------------------------------- */

function settingsAudio (isMute) {
    // Si on était en muet -> reprendre
    if (isMute === true) {
        audio.pause();
        audio.currentTime = 0; // On redémarre la musique
    } else if (isMute === false) {
        // Sinon on remet la musique
        audio.play();
    }

    // Sauvegarde des paramètres
    saveSettings();
}

/* -------------------------------------------- */
/*      Muet ou non la musique  (paramètres)    */
/* -------------------------------------------- */

function volumeAudio (audioLevel) {
    audio.volume = (audioLevel / 100);

    // On enlève le muet
    audio.muted = false; 

    // Sauvegarde des paramètres
    saveSettings();
}

/* -------------------------------------------- */
/*       Sauvegarder dans le local storage      */
/* -------------------------------------------- */

function saveSettings () {
    localStorage.setItem("audioLevel", audioLevel.value);
    localStorage.setItem("audioMute", audioMute.checked);
}


/* -------------------------------------------- */
/*        Récupérer dans le local storage       */
/* -------------------------------------------- */

function loadSettings () {
    const savedAudioLevel = localStorage.getItem("audioLevel");
    const savedAudioMute = localStorage.getItem("audioMute");
    if (savedAudioLevel !== null) {
        audioLevel.value = savedAudioLevel;
        volumeAudio(savedAudioLevel);
    }
    if (savedAudioMute !== null) {
        audioMute.checked = (savedAudioMute === 'true');
        settingsAudio(audioMute.checked);
    }
}

window.addEventListener('load', loadSettings);

// <audio src="./Audio/Tzar Burden of The Crown Soundtrack (CD-Rip) - Track 1.mp3" controls></audio>
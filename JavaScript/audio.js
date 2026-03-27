// Audio du html
const audio = document.querySelector("audio");

let osts = [
    "Tzar Burden of The Crown Soundtrack (CD-Rip) - Track 1.mp3"
];

/* -------------------------------------------- */
/*               Lire la musique                */
/* -------------------------------------------- */

function readOst () {
    // Lancement de l'audio en boucle
    audio.play()
    audio.loop = true;
    audio.volume = 0.5;

    // On évéte que l'audio redémarre en boucle
    window.removeEventListener('click', readOst);
    window.removeEventListener('keydown', readOst);
}

window.addEventListener('click', readOst);
window.addEventListener('keydown', readOst);

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
}

/* -------------------------------------------- */
/*      Muet ou non la musique  (paramètres)    */
/* -------------------------------------------- */

function volumeAudio (audioLevel) {
    audio.volume = (audioLevel / 100);

    // On enlève le muet
    audio.muted = false; 
}


// <audio src="./Audio/Tzar Burden of The Crown Soundtrack (CD-Rip) - Track 1.mp3" controls></audio>
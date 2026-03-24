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

// <audio src="./Audio/Tzar Burden of The Crown Soundtrack (CD-Rip) - Track 1.mp3" controls></audio>
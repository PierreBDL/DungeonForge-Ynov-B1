/* -------------------------------------------- */
/*              Afficher message                */
/* -------------------------------------------- */


async function printMessage(text) {
    const eventMessage = document.getElementById("message");
    const texteMessage = document.querySelector(".message-body");

    eventMessage.style.display = "flex";
    texteMessage.innerHTML = text;

    // Fermer le message au bout de 3sec
    setTimeout(closeMessage, 3000);
}

/* -------------------------------------------- */
/*             Fermer le message                */
/* -------------------------------------------- */

const closeMessageBtn = document.getElementById("closeMessageBtn");

closeMessageBtn.addEventListener("click", closeMessage);

function closeMessage() {
    const eventMessage = document.getElementById("message");
    eventMessage.style.display = "none";
}
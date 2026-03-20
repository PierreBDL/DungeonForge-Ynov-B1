/* -------------------------------------------- */
/*      Ouverture / Fermeture Inventaire        */
/* -------------------------------------------- */

const openCloseInventoryBtn = document.getElementById("openCloseInventoryBtn");
let inventoryIsOpen = false;

openCloseInventoryBtn.addEventListener("click", () => {
    const inventoryOverlay = document.getElementById("inventory");

    if (inventoryIsOpen === false) {
        inventoryOverlay.style.display = "flex";
        inventoryIsOpen = true;

        // Remplir l'inventaire
        inventory();
    } else {
        closeInventory(); // Fermer l'inventaire
    }
    
});

/* -------------------------------------------- */
/*            Fermer l'inventaire               */
/* -------------------------------------------- */

const closeInventoryBtn = document.getElementById("closeInventoryBtn");

closeInventoryBtn.addEventListener("click", closeInventory);

function closeInventory() {
    const inventoryOverlay = document.getElementById("inventory");
    inventoryOverlay.style.display = "none";
    inventoryIsOpen = false;
}

/* -------------------------------------------- */
/*             Contenu inventaire               */
/* -------------------------------------------- */

const inventoryDom = document.getElementById("inventoryLine");

function inventory () {

    inventoryDom.innerHTML = ""; // Vider les cases

    // Boucler sur l'inventaire
    for (let i = 0; i < 10; i++) {
        if (Player.inventory[i] === "potion_vie") { // On remplis avec le sprite
            inventoryDom.innerHTML += "<div class='inventoryCase'><img src='./Images/potion_vie.svg' alt='Potion de vie'></div>";
        } else { // Sinon, on fait un élément vide
            inventoryDom.innerHTML += "<div class='inventoryCase'></div>";
        }
    }
}

// Initialisation de l'inventaire au début du jeu
inventory();
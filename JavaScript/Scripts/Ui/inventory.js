/* -------------------------------------------- */
/*      Ouverture / Fermeture Inventaire        */
/* -------------------------------------------- */

const openCloseInventoryBtn = document.getElementById("openCloseInventoryBtn");
inventoryIsOpen = false;

openCloseInventoryBtn.addEventListener("click", () => {
    const inventoryOverlay = document.getElementById("inventory");
    inventoryIsOpen = true;

    inventoryOverlay.style.display = "flex";

    // Remplir l'inventaire
    inventory();
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

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && inventoryIsOpen === true) {
        closeInventory();
    }
});

/* -------------------------------------------- */
/*             Contenu inventaire               */
/* -------------------------------------------- */

const inventoryDom = document.getElementById("inventoryLine");

function inventory () {

    inventoryDom.innerHTML = ""; // Vider les cases

    // Boucler sur l'inventaire
    for (let i = 0; i < 10; i++) {
        if (Player.inventory[i] === "potion_vie") { // On remplis avec le sprite
            inventoryDom.innerHTML += "<div class='inventoryCase'><img src='../Images/Items/potion_vie.svg' alt='Potion de vie'></div>";
        } else if (Player.inventory[i] === "potion_poison") { // Potion de poison
            inventoryDom.innerHTML += "<div class='inventoryCase'><img src='../Images/Items/potion_poison.svg' alt='Potion de poison'></div>";
        } else { // Sinon, on fait un élément vide
            inventoryDom.innerHTML += "<div class='inventoryCase'></div>";
        }
    }

    useItems();
}

// Initialisation de l'inventaire au début du jeu
inventory();
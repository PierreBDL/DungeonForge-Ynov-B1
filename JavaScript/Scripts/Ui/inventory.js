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
            inventoryDom.innerHTML += `<div class='inventoryCase' data-index='${i}' data-item='${Player.inventory[i]}'><img src='../Images/Items/potion_vie.svg' alt='Potion de vie'></div>`;
        } else if (Player.inventory[i] === "potion_poison") { // Potion de poison
            inventoryDom.innerHTML += `<div class='inventoryCase' data-index='${i}' data-item='${Player.inventory[i]}'><img src='../Images/Items/potion_poison.svg' alt='Potion de poison'></div>`;
        } else if (Player.inventory[i] === "potion_force") {
            inventoryDom.innerHTML += `<div class='inventoryCase' data-index='${i}' data-item='${Player.inventory[i]}'><img src='../Images/Items/potion_force.svg' alt='Potion de force'></div>`;
        } else if (Player.inventory[i] === "potion_armure") {
            inventoryDom.innerHTML += `<div class='inventoryCase' data-index='${i}' data-item='${Player.inventory[i]}'><img src='../Images/Items/potion_armure.svg' alt='Potion d'armure'></div>`;
        } else if (Player.inventory[i] === "potion_vie_majeure") {
            inventoryDom.innerHTML += `<div class='inventoryCase' data-index='${i}' data-item='${Player.inventory[i]}'><img src='../Images/Items/potion_vie.svg' alt='Potion de soin majeure'></div>`;
        } else { // Sinon, on fait un élément vide
            inventoryDom.innerHTML += "<div class='inventoryCase'></div>";
        }
    }

    useItems();
}

/* -------------------------------------------- */
/*              Options des items               */
/* -------------------------------------------- */

function showItemOptions(index, itemName) {
    if (!itemName) return;

    const overlay = document.getElementById("itemOptionsOverlay");
    const throwBtn = document.getElementById("throwItemBtn");

    // Configurer le bouton "Jeter"
    throwBtn.onclick = () => throwItem(index, itemName);

    overlay.style.display = "flex";
}

function closeItemOptions() {
    document.getElementById("itemOptionsOverlay").style.display = "none";
}

function throwItem(index, itemName) {
    // Retirer l'item de l'inventaire
    Player.inventory.splice(index, 1);

    // Afficher un message
    printMessage("Vous avez jeté : " + itemName);

    // Rafraîchir l'inventaire
    inventory();

    // Fermer le menu
    closeItemOptions();
}

// Fermer le menu au clic en dehors
document.addEventListener("click", (e) => {
    const overlay = document.getElementById("itemOptionsOverlay");
    if (overlay && e.target === overlay) {
        closeItemOptions();
    }
});

// Initialisation de l'inventaire au début du jeu
inventory();
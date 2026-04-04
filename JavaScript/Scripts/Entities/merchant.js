/* -------------------------------------------- */
/*                  Marchand                    */
/* -------------------------------------------- */

function merchant (articleToSell = [
    { name: "Potion de vie", price: 20}, 
    { name: "Potion de poison", price: 35}, 
    { name: "Potion de force", price: 50}, 
    { name: "Potion d'armure", price: 50},
    { name: "Épée", price: 120},
    { name: "Épée Longue", price: 200},
    { name: "Hache", price: 180},
    { name: "Cuirasse", price: 150},
    { name: "Armure Lourde", price: 280},
    { name: "Robe Magique", price: 200},
    { name: "Bague de Force", price: 100},
    { name: "Amulette de Défense", price: 100}
]) {
    // Afficher le texte du marchand
    openMerchant();

    // DOM avec les articles
    let contentMerchant = "";

    // Articles
    let productToSell = articleToSell

    // Mettre les articles dans la boîte de dialogue du marchand
    for (let i = 0; i < productToSell.length; i++) {
        contentMerchant += addObjectMerchant(productToSell[i]);
    }

    // Mettre dans le DOM
    const merchantBody = document.querySelector(".merchant-body");
    merchantBody.innerHTML = contentMerchant;
}


/* -------------------------------------------- */
/*              Fenêtre marchand                */
/* -------------------------------------------- */

const windowMerchant = document.getElementById("merchant");
merchantIsOpen = false;

// Ouvrir
function openMerchant () {
    merchantIsOpen = true;
    windowMerchant.style.display = "flex";
}

// Fermer
const closeMerchantBtn = document.getElementById("closeMerchantBtn");

closeMerchantBtn.addEventListener("click", closeMerchant);

function closeMerchant() {
    windowMerchant.style.display = "none";
    merchantIsOpen = false;
}


/* -------------------------------------------- */
/*              Remplir marchand                */
/* -------------------------------------------- */

function addObjectMerchant (product) {
    let productContent = 
    `<div class="merchantProduct"> 
        <div class="productName">` + product.name + `</div>
        <div class="productPrice">` + product.price + `G</div>
        <button type="button" onclick="buyItem('` + product.name + "'," + product.price + `)"> Acheter </button>
    </div>
    `;

    return productContent;
}

/* -------------------------------------------- */
/*              Acheter marchand                */
/* -------------------------------------------- */

const btnBuy = document.querySelectorAll(".merchantProduct button");

function buyItem (name, price) {
    let messageMerchant = "";

    // Vérification si le joueur a assez d'or
    if (Player.gold < Number(price)) {
        messageMerchant = "Pas assez d'or";
    } else if (Player.inventory.length >= 10) { // Regarder si on a assez d'espace
        messageMerchant = "Pas assez d'espace dans l'inventaire";
    } else {
        // Donner l'article en fonction de la valeur (nom du produit)
        switch(name) {
            // Potions
            case "Potion de vie":
                Player.inventory.push("potion_vie");
                break;
            case "Potion de poison":
                Player.inventory.push("potion_poison");
                break;
            case "Potion de force":
                Player.inventory.push("potion_force");
                break;
            case "Potion d'armure":
                Player.inventory.push("potion_armure");
                break;
            
            // Armes
            case "Épée":
                Player.equipment.weapon = "epee";
                Player.stats.attack = Player.stats.attackBase + 10;
                break;
            case "Épée Longue":
                Player.equipment.weapon = "epee_longue";
                Player.stats.attack = Player.stats.attackBase + 18;
                break;
            case "Hache":
                Player.equipment.weapon = "hache";
                Player.stats.attack = Player.stats.attackBase + 15;
                break;
            
            // Armures
            case "Cuirasse":
                Player.equipment.armor = "cuirasse";
                Player.stats.defense = Player.stats.defenseBase + 6;
                break;
            case "Armure Lourde":
                Player.equipment.armor = "armure_lourde";
                Player.stats.defense = Player.stats.defenseBase + 12;
                break;
            case "Robe Magique":
                Player.equipment.armor = "robe_magique";
                Player.stats.defense = Player.stats.defenseBase + 8;
                Player.stats.attack += 5;
                break;
            
            // Accessoires
            case "Bague de Force":
                Player.equipment.accessory = "bague_force";
                Player.stats.attack += 12;
                break;
            case "Amulette de Défense":
                Player.equipment.accessory = "amulette_defense";
                Player.stats.defense += 10;
                break;
        }

        // Objet acheté
        messageMerchant = "Acheté : " + name;

        // On déduit le prix
        Player.gold -= price;
    }

    // Notification avec le message
    printMessage(messageMerchant);
}

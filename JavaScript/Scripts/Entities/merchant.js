/* -------------------------------------------- */
/*                  Marchand                    */
/* -------------------------------------------- */

// Liste complète des articles disponibles
const allMerchantItems = [
    { name: "Potion de vie", price: 20, description: "Restaure 50 points de vie. À utiliser en cas de besoin urgent." }, 
    { name: "Potion de poison", price: 35, description: "Empoisonne l'ennemi pendant 5 tours. Inflige 5 dégâts par tour." }, 
    { name: "Potion de force", price: 50, description: "Augmente l'attaque de +10 pendant 30 secondes. Parfait pour fini un combat." }, 
    { name: "Potion d\'armure", price: 50, description: "Augmente la défense de +8 pendant 30 secondes. Pour survivre plus longtemps." },
    { name: "Épée", price: 120, description: "Arme basique en acier. +10 d'attaque. Idéale pour débuter." },
    { name: "Épée Longue", price: 200, description: "Arme puissante et équilibrée. +18 d'attaque. L'une des meilleures armes." },
    { name: "Hache", price: 180, description: "Arme lourde avec puissance modérée. +15 d'attaque. Bonne puissance." },
    { name: "Cuirasse", price: 150, description: "Armure légère en cuivre. +6 de défense. Protection de base." },
    { name: "Armure Lourde", price: 280, description: "Armure renforcée en acier. +12 de défense. Meilleure protection." },
    { name: "Robe Magique", price: 200, description: "Armure mystique. +8 de défense et +5 d'attaque. Combat magique." },
    { name: "Bague de Force", price: 100, description: "Accessoire ésotérique. +12 d'attaque. Pour augmenter la puissance brute." },
    { name: "Amulette de Défense", price: 100, description: "Amulette protectrice. +10 de défense. Pour se protéger davantage." }
];

/* -------------------------------------------- */
/*             Articles aléatoires              */
/* -------------------------------------------- */
function getRandomMerchantInventory() {
    const shuffled = [...allMerchantItems].sort(() => Math.random() - 0.5);
    const count = 4 + Math.floor(Math.random() * 3); 
    return shuffled.slice(0, count);
}

function merchantFunction (articleToSell) {
    // Si pas d'articles spécifiés, en sélectionner aléatoirement
    if (!articleToSell) {
        articleToSell = getRandomMerchantInventory();
    }

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

// Ouvrir
function openMerchant () {
    document.getElementById("merchantWindow").style.display = "flex";
}

// Fermer
const closeMerchantBtn = document.getElementById("closeMerchantBtn");

closeMerchantBtn.addEventListener("click", closeMerchant);

function closeMerchant() {
    const windowMerchant = document.getElementById("merchantWindow");

    windowMerchant.style.display = "none";
}

/* -------------------------------------------- */
/*            Description d'article            */
/* -------------------------------------------- */

function showItemDetails(name, price, description) {
    const overlay = document.getElementById("itemDetailsOverlay");
    const itemName = document.getElementById("itemDetailsName");
    const itemPrice = document.getElementById("itemDetailsPrice");
    const itemDesc = document.getElementById("itemDetailsDescription");

    itemName.textContent = name;
    itemPrice.textContent = price + "G";
    itemDesc.textContent = description;

    overlay.style.display = "flex";
}

function closeItemDetails() {
    document.getElementById("itemDetailsOverlay").style.display = "none";
}

// Fermer la description au clic en dehors
document.addEventListener("click", (e) => {
    const overlay = document.getElementById("itemDetailsOverlay");
    if (e.target === overlay) {
        closeItemDetails();
    }
});


/* -------------------------------------------- */
/*              Remplir marchand                */
/* -------------------------------------------- */

function addObjectMerchant (product) {
    let productContent = 
    `<div class="merchantProduct"> 
        <div class="productName" onclick="showItemDetails('` + product.name.replace(/'/g, "\\'") + `', ` + product.price + `, '` + product.description.replace(/'/g, "\\'") + `')" style="cursor: pointer;"> 
            ` + product.name + ` 
        </div>
        <div class="productPrice" onclick="showItemDetails('` + product.name.replace(/'/g, "\\'") + `', ` + product.price + `, '` + product.description.replace(/'/g, "\\'") + `')" style="cursor: pointer;">` + product.price + `G</div>
        <button type="button" onclick="buyItem('` + product.name.replace(/'/g, "\\'") + "'," + product.price + `)"> Acheter </button>
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

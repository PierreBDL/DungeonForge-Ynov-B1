/* -------------------------------------------- */
/*                  Marchand                    */
/* -------------------------------------------- */

function merchant (articleToSell = [{ name: "Potion de vie", price: 20}, { name: "Potion de vie", price: 20}, { name: "Potion de vie", price: 20}, { name: "Epée", price: 120}]) {
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
            case "Potion de vie":
                Player.inventory.push("potion_vie");
                break;
            case "Epée":
                Player.equipment.weapon = "epee";
                Player.stats.attack += 10; // Augmenter l'attaque
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

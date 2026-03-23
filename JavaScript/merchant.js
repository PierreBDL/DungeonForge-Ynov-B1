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
        <button type="button" value="` + product.name + `"> Acheter </button>
    </div>
    `;

    return productContent;
}
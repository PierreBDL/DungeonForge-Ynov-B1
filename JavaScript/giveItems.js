function giveItems(messageToPrint, contentChest) {
    let message = messageToPrint;

    // Création de la liste des items + cocaténation dans le message + balises HTML
    let keys_items = Object.entries(contentChest);

    for (let i = 0; i < keys_items.length; i++) {
        const itemKey = keys_items[i][0]; // Nom ("Key") de l'objet
        const itemQty = keys_items[i][1]; // Quantité récupéré
        const item = items[itemKey];

        if (!item) continue;

        item.give(itemQty)
        message += item.message(itemQty)

        // Ajout d'un saut de ligne
        if (i < keys_items.length) {
            message += "<br>"
        }
    }

    printMessage(message);

    // Regarder si on passe un niveau avec l'expérience
    nextLevel();
}
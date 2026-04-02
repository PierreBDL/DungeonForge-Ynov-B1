function giveItems(messageToPrint, contentChest) {
    let message = messageToPrint;

    // Création de la liste des items + cocaténation dans le message + balises HTML
    let keys_items = Object.entries(contentChest);

    for (let i = 0; i < keys_items.length; i++) {
        switch (keys_items[i][0]) {
            case "gold":
                Player.gold += keys_items[i][1];
                message += (keys_items[i][1] + " Pièces d'or");
                break;
            case "xp":
                Player.stats.xp += keys_items[i][1];
                message += (keys_items[i][1] + " points d'expérience");
                break;
            case "potion_vie":
                // Ajouter autant de potion que ce qu'il y a dans l'inventaire
                for (let j = 0; j < keys_items[i][1]; j++) {
                    // Tant qu'on a de la place dans l'inventaire
                    if (Player.inventory.length <= 10) {
                        Player.inventory.push("potion_vie")
                    } else {
                        break;
                    }
                }
                message += (keys_items[i][1] + " potion(s) de soin");
                break
        }

        // Ajout d'un saut de ligne
        if (i < keys_items.length) {
            message += "<br>"
        }
    }

    printMessage(message);

    // Regarder si on passe un niveau avec l'expérience
    nextLevel();
}
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
                    if (Player.inventory.length < 10) {
                        Player.inventory.push("potion_vie")
                    } else break;
                }
                message += (keys_items[i][1] + " potion(s) de soin");
                break;
            case "potion_poison":
                for (let j = 0; j < keys_items[i][1]; j++) {
                    if (Player.inventory.length < 10) {
                        Player.inventory.push("potion_poison")
                    } else break;
                }
                message += (keys_items[i][1] + " potion(s) de poison");
                break;
            case "potion_force":
                for (let j = 0; j < keys_items[i][1]; j++) {
                    if (Player.inventory.length < 10) {
                        Player.inventory.push("potion_force")
                    } else break;
                }
                message += (keys_items[i][1] + " potion(s) de force");
                break;
            case "potion_armure":
                for (let j = 0; j < keys_items[i][1]; j++) {
                    if (Player.inventory.length < 10) {
                        Player.inventory.push("potion_armure")
                    } else break;
                }
                message += (keys_items[i][1] + " potion(s) d'armure");
                break;
            case "equipment":
                // Équipement: { type: "weapon", name: "épée", bonus: 10 }
                const equipData = keys_items[i][1];
                message += applyEquipment(equipData);
                break;
        }

        // Ajout d'un saut de ligne
        if (i < keys_items.length - 1) {
            message += "<br>"
        }
    }

    printMessage(message);

    // Regarder si on passe un niveau avec l'expérience
    nextLevel();
}

/* -------------------------------------------- */
/*                Equipement                    */
/* -------------------------------------------- */

function applyEquipment(equipData) {
    if (!equipData.type || !equipData.name) return "";

    switch(equipData.type) {
        case "weapon":
            Player.equipment.weapon = equipData.name;
            Player.stats.attack = Player.stats.attackBase + (equipData.bonus || 0);
            return 'Arme : ' + equipData.name;
        case "armor":
            Player.equipment.armor = equipData.name;
            Player.stats.defense = Player.stats.defenseBase + (equipData.bonus || 0);
            return 'Armure : ' + equipData.name;
        case "accessory":
            Player.equipment.accessory = equipData.name;
            if (equipData.attackBonus) Player.stats.attack += equipData.attackBonus;
            if (equipData.defenseBonus) Player.stats.defense += equipData.defenseBonus;
            return 'Accessoire : ' + equipData.name;
    }
    return "";
}
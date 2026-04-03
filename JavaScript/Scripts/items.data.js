const items = {
    gold: {
        name: "Or",
        give: (qty) => { Player.gold += qty },
        message: (qty) => { return `${qty} Pièces d'or`}
    },
    xp: {
        name: "Expérience",
        give: (qty) => { Player.stats.xp += qty },
        message: (qty) => `${qty} points d'expérience`
    },
    potion_vie: {
        name: "Potion de vie",
        give: (qty) => {
            for (let j = 0; j < qty; j++) {
                if (Player.inventory.length < 10) {
                    Player.inventory.push("potion_vie")
                } else break;
            }
            inventory(); // Rafraîchir l'affichage
        },
        message: (qty) => `${qty} potion(s) de soin`,
        effect: (index) => {
            Player.inventory.splice(index, 1);
            inventory();
            Player.stats.hp += 50
            if (Player.stats.hp > Player.stats.maxHp) {
                Player.stats.hp = Player.stats.maxHp
            }
            printMessage("Potion de vie consommé vous regagnez 50PVs.");
        }
    },
    potion_poison: {
        name: "Potion de poison",
        give: (qty) => {
            for (let j = 0; j < qty; j++) {
                if (Player.inventory.length < 10) {
                    Player.inventory.push("potion_poison")
                } else break;
            }
            inventory(); // Rafraîchir l'affichage
        },
        message: (qty) => `${qty} potion(s) de poison`,
        effect: (index) => {
            Player.inventory.splice(index, 1);
            inventory();
            // Appliquer le poison à l'ennemi s'il est en combat
            if (currentEnnemy) {
                currentEnnemy.poisonTurnsLeft = 5;
                currentEnnemy.isPoisoned = true;
                printMessage("Vous avez empoisonné l'ennemi! Il subit 5 dégâts par tour pendant 5 tours.");
            }
        }
    }
}
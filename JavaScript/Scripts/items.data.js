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
            printMessage("Potion de vie consommée. Vous regagnez 50 PVs.");
        }
    },
    potion_vie_majeure: {
        name: "Potion de soin majeure",
        give: (qty) => {
            for (let j = 0; j < qty; j++) {
                if (Player.inventory.length < 10) {
                    Player.inventory.push("potion_vie_majeure")
                } else break;
            }
            inventory();
        },
        message: (qty) => `${qty} potion(s) de soin majeure`,
        effect: (index) => {
            Player.inventory.splice(index, 1);
            inventory();
            Player.stats.hp = Player.stats.maxHp;
            printMessage("Potion de soin majeure consommée. Vous êtes complètement guéri!");
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
    },
    potion_force: {
        name: "Potion de force",
        give: (qty) => {
            for (let j = 0; j < qty; j++) {
                if (Player.inventory.length < 10) {
                    Player.inventory.push("potion_force")
                } else break;
            }
            inventory();
        },
        message: (qty) => `${qty} potion(s) de force`,
        effect: (index) => {
            Player.inventory.splice(index, 1);
            inventory();
            Player.stats.attack += 10;
            setTimeout(() => {
                Player.stats.attack -= 10;
                printMessage("L'effet de la potion de force s'est dissipé.");
            }, 30000); // 30 secondes
            printMessage("Potion de force consommée! Votre attaque augmente de 10 pendant 30s.");
        }
    },
    potion_armure: {
        name: "Potion d'armure",
        give: (qty) => {
            for (let j = 0; j < qty; j++) {
                if (Player.inventory.length < 10) {
                    Player.inventory.push("potion_armure")
                } else break;
            }
            inventory();
        },
        message: (qty) => `${qty} potion(s) d'armure`,
        effect: (index) => {
            Player.inventory.splice(index, 1);
            inventory();
            Player.stats.defense += 8;
            setTimeout(() => {
                Player.stats.defense -= 8;
                printMessage("L'effet de la potion d'armure s'est dissipé.");
            }, 30000); // 30 secondes
            printMessage("Potion d'armure consommée! Votre défense augmente de 8 pendant 30s.");
        }
    }
}
function useItems () {

    const inventoryCases = document.querySelectorAll(".inventoryCase");

    // Parcourir toutes les cases de l'inventaire
    inventoryCases.forEach((item, index) => {

        // Créer une fonction pour gérer le clic
        const handleItemClick = () => {

            let altImage = item.querySelector('img')?.alt;
            if (!altImage) {
                return;
            };
            let message = "";


            switch (altImage) {
                case "Potion de vie":
                    // Ne pas utiliser la potion si on a les PVs au max
                    if (Player.stats.hp < Player.stats.maxHp) {
                        Player.stats.hp += 50; // Soigner le joueur

                        // Si on dépasse les PVs -> Remmettre les PVs au max
                        if (Player.stats.hp > Player.stats.maxHp) {
                            Player.stats.hp = Player.stats.maxHp;
                        }

                        Player.inventory.splice(index, 1); // Suppression dans l'inventaire
                        message = "Vous avez gagné 50 PVs";

                        // Si on est en combat
                        if (itemUsedInFight && isInFight && currentEnnemy) {
                            const fightText = document.getElementById("fight-text");
                            turnFight++;
                            fightText.innerHTML = fightText.innerHTML + "<br> " + turnFight + ": " + Player.name + " utilise une potion de vie!";
                            printHealth(Player, "player");
                            fightText.scrollTop = fightText.scrollHeight;
                            printMessage(message);

                            // Fermer l'inventaire
                            const inventoryOverlay = document.getElementById("inventory");
                            inventoryOverlay.style.display = "none";
                            inventoryIsOpen = false;
                            itemUsedInFight = false;

                            // Ennemi attaque le joueur
                            attackPhase(currentEnnemy, Player);

                            // Si le joueur n'a plus de PV
                            if (Player.stats.hp <= 0) {
                                Player.stats.hp = 0;
                                turnFight = 0;
                                isInFight = false;
                            }
                            return;
                        }

                        // Redessiner l'inventaire pour voir les changements immédiatement
                        inventory();
                    } else {
                        message = "Vie déjà au maximum";
                    }
                    break;

                case "Potion de poison":
                    if (itemUsedInFight && isInFight && currentEnnemy) {
                        // Utilisation en combat
                        currentEnnemy.poisonTurnsLeft = 5;
                        currentEnnemy.isPoisoned = true;
                        Player.inventory.splice(index, 1); // Suppression dans l'inventaire
                        message = "Vous avez empoisonné l'ennemi! Il subit 5 dégâts par tour pendant 5 tours.";
                        
                        const fightText = document.getElementById("fight-text");
                        turnFight++;
                        fightText.innerHTML = fightText.innerHTML + "<br> " + turnFight + ": " + Player.name + " utilise une potion de poison!";
                        fightText.scrollTop = fightText.scrollHeight;
                        printMessage(message);

                        // Fermer l'inventaire
                        const inventoryOverlay = document.getElementById("inventory");
                        inventoryOverlay.style.display = "none";
                        inventoryIsOpen = false;
                        itemUsedInFight = false;

                        // Ennemi attaque le joueur
                        attackPhase(currentEnnemy, Player);

                        // Si le joueur n'a plus de PV
                        if (Player.stats.hp <= 0) {
                            Player.stats.hp = 0;
                            turnFight = 0;
                            isInFight = false;
                        }
                        return;
                    } else {
                        message = "Vous ne pouvez utiliser le poison que pendant un combat!";
                    }
                    break;

                default:
                    break;
            }

            // Afficher le message s'il y a quelque chose à afficher
            if (message != "") {
                printMessage(message);
            }
        };

        // Copier l'élément pour supprimer les anciens listeners
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        // Ajouter le listener au nouvel élément
        newItem.addEventListener("click", handleItemClick);
    })

}
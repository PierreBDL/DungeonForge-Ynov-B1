function useItems () {

    const inventoryCases = document.querySelectorAll(".inventoryCase");

    // Parcourir toutes les cases de l'inventaire
    inventoryCases.forEach((item, index) => {

        // On vérifie l'objet cliqué
        item.addEventListener("click", () => {

            let altImage = item.querySelector('img').alt;
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

                        inventory(); // On redessine l'inventaire
                    } else {
                        message = "Vie déjà au maximum";
                    }
                    break;

                default:
                    break;
            }

            // Afficher le message s'il y a quelque chose à afficher
            if (message != "") {
                printMessage(message);
            }
        })
    })

}
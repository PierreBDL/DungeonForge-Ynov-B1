const items = {
  gold: {
    name: "Or",
    give: (qty) => { Player.gold += qty },
    message: (qty) => `${qty} Pièces d'or`
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
        printMessage("Potion de vie consommé vous regagnez 50HP.");
    }
  }
}
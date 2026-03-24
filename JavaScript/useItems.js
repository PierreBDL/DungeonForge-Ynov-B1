const inventoryCases = document.getElementById("inventoryLine");

console.log(Player.inventory.push("potion_vie"))
console.log(Player.inventory.push("potion_vie"))
console.log(Player.inventory.push("potion_vie"))

console.log(inventoryCases)

console.log(Player.inventory)


inventoryCases.addEventListener('click', (e) => {
    const caseClick = e.target.closest('.inventoryCase')
    if (!caseClick) return;

    const index = caseClick.dataset.index;
    const img = caseClick.querySelector('img');
    const altValue = img ? img.alt : null;

    console.log("Case n°", index, "— item :", altValue);

    if (altValue === 'Potion de vie') {
        console.log("Potion de vie consommé")
        Player.inventory.splice(index, 1);
        inventory();
    }
});
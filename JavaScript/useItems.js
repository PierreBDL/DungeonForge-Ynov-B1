const inventoryCases = document.getElementById("inventoryLine");

inventoryCases.addEventListener('click', (e) => {
    const caseClick = e.target.closest('.inventoryCase')
    if (!caseClick) return;

    const index = caseClick.dataset.index;
    const img = caseClick.querySelector('img');
    const altValue = img ? img.alt : null;

    // Vérifier le nom de l'objet 
    if (altValue === 'Potion de vie') {
        Player.inventory.splice(index, 1);
        inventory();
        printMessage(altValue + " consommé vous regagnez 50HP.")
        Player.stats.hp += 50;
    }
});
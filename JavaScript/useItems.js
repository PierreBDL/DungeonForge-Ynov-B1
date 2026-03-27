const inventoryCases = document.getElementById("inventoryLine");

inventoryCases.addEventListener('click', (e) => {
    const caseClick = e.target.closest('.inventoryCase')
    if (!caseClick) return;

    const index = caseClick.dataset.index;
    const img = caseClick.querySelector('img');
    const altValue = img ? img.alt : null;

    // Vérifier le nom de l'objet 
    if (altValue === 'Potion de vie') {
        items.potion_vie.effect()
    }
});
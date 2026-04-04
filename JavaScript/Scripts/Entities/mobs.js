/* JOUEUR */

let Player = {
    name: 'Héros',
    x: 2, y: 2, // Position sur la grille
    stats: {
        hp: 150, 
        maxHp: 150,
        attack: 20,
        attackBase: 20,
        defense: 8,
        defenseBase: 8,
        speed: 1,
        level: 1,
        xp: 0,
        xpToNext: 100
    },
    inventory: [],
    equipment: {
        weapon: null,
        armor: null,
        accessory: null
    },
    gold: 50
};


/* ENNEMI */

let Ennemy = {
    name: 'Ennemy',
    x: 0, y: 0, // Position sur la grille
    stats: {
        hp: 40, 
        maxHp: 40,
        attack: 12,
        defense: 3,
        level: 1
    },
    inventory: [],
    equipment: {
        weapon: null,
        armor: null,
        accessory: null
    },
    attackTypes: {
        "Coup de poing": 5,
        "Coup de pied": 8,
        "Griffe": 12
    }
};
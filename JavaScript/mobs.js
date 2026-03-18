/* JOUEUR */

let Player = {
    name: 'Héros',
    x: 2, y: 2, // Position sur la grille
    stats: {
        hp: 100, 
        maxHp: 100,
        attack: 15,
        attackBase: 15,
        defense: 5,
        defenseBase: 5,
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
    gold: 0
};


/* ENNEMI */

let Ennemy = {
    name: 'Ennemy',
    x: 0, y: 0, // Position sur la grille
    stats: {
        hp: 100, 
        maxHp: 100,
        attack: 15,
        defense: 5,
    },
    inventory: [],
    equipment: {
        weapon: null,
        armor: null,
        accessory: null
    },
};
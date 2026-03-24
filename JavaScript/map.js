/* -------------------------------------------- */
/*          Génération procédurale BSP          */
/* -------------------------------------------- */

class BSPNode {
    constructor(x, y, w, h) {
        this.x = x; this.y = y;
        this.w = w; this.h = h;
        this.left = null; this.right = null;
        this.room = null;
    }

    split(depth) {
        if (depth === 0 || this.w < 8 || this.h < 8) return;
        const horiz = this.h >= this.w ? true : (this.w >= this.h ? false : Math.random() < 0.5);
        if (horiz) {
            const cut = Math.floor(3 + Math.random() * (this.h - 6));
            this.left  = new BSPNode(this.x, this.y, this.w, cut);
            this.right = new BSPNode(this.x, this.y + cut, this.w, this.h - cut);
        } else {
            const cut = Math.floor(3 + Math.random() * (this.w - 6));
            this.left  = new BSPNode(this.x, this.y, cut, this.h);
            this.right = new BSPNode(this.x + cut, this.y, this.w - cut, this.h);
        }
        this.left.split(depth - 1);
        this.right.split(depth - 1);
    }

    getLeaves(arr) {
        if (!this.left && !this.right) { arr.push(this); return; }
        if (this.left)  this.left.getLeaves(arr);
        if (this.right) this.right.getLeaves(arr);
    }

    createRoom(grid, W, H) {
        const rw = Math.max(3, Math.floor(2 + Math.random() * (this.w - 4)));
        const rh = Math.max(3, Math.floor(2 + Math.random() * (this.h - 4)));
        const rx = this.x + Math.floor(1 + Math.random() * (this.w - rw - 1));
        const ry = this.y + Math.floor(1 + Math.random() * (this.h - rh - 1));
        this.room = { x: rx, y: ry, w: rw, h: rh };
        for (let y = ry; y < ry + rh; y++)
            for (let x = rx; x < rx + rw; x++)
                if (y > 0 && y < H - 1 && x > 0 && x < W - 1)
                    grid[y][x] = CELL_TYPES.FLOOR;
    }

    getCenter() {
        const r = this.room || { x: this.x + Math.floor(this.w / 2), y: this.y + Math.floor(this.h / 2), w: 1, h: 1 };
        return { x: Math.floor(r.x + r.w / 2), y: Math.floor(r.y + r.h / 2) };
    }

    connectChildren(grid, W, H) {
        if (!this.left || !this.right) return;
        this.left.connectChildren(grid, W, H);
        this.right.connectChildren(grid, W, H);
        const a = this.left.getCenter();
        const b = this.right.getCenter();
        digCorridor(a, b, grid, W, H);
    }
}

function digCorridor(a, b, grid, W, H) {
    let cx = a.x, cy = a.y;
    while (cx !== b.x) {
        if (cy > 0 && cy < H - 1 && cx > 0 && cx < W - 1)
            if (grid[cy][cx] === CELL_TYPES.WALL) grid[cy][cx] = CELL_TYPES.FLOOR;
        cx += cx < b.x ? 1 : -1;
    }
    while (cy !== b.y) {
        if (cy > 0 && cy < H - 1 && cx > 0 && cx < W - 1)
            if (grid[cy][cx] === CELL_TYPES.WALL) grid[cy][cx] = CELL_TYPES.FLOOR;
        cy += cy < b.y ? 1 : -1;
    }
}

function generateBSPMap(W = 25, H = 18, depth = 3) {
    const grid = Array.from({ length: H }, () => Array(W).fill(CELL_TYPES.WALL));

    const root = new BSPNode(1, 1, W - 2, H - 2);
    root.split(depth);

    const leaves = [];
    root.getLeaves(leaves);
    leaves.forEach(l => l.createRoom(grid, W, H));
    root.connectChildren(grid, W, H);

    // Placement des entités
    const rooms = leaves.filter(l => l.room).map(l => l.room);
    const shuffled = rooms.sort(() => Math.random() - 0.5);

    // Trouver une case sol sûre dans une salle donnée
    function getSafeSpot(room) {
        const spots = [];
        for (let y = room.y; y < room.y + room.h; y++)
            for (let x = room.x; x < room.x + room.w; x++)
                if (grid[y][x] === CELL_TYPES.FLOOR) spots.push({ x, y });
        if (spots.length === 0) return null;
        return spots[Math.floor(Math.random() * spots.length)];
    }

    // Joueur dans la première salle (1 seul, toujours sur sol)
    const first = shuffled[0];
    const playerSpot = getSafeSpot(first);
    if (playerSpot) grid[playerSpot.y][playerSpot.x] = CELL_TYPES.PLAYER;

    // Escalier dans la dernière salle (1 seul, toujours sur sol)
    const last = shuffled[shuffled.length - 1];
    const stairsSpot = getSafeSpot(last);
    if (stairsSpot) grid[stairsSpot.y][stairsSpot.x] = CELL_TYPES.STAIRS_DOWN;

    // Salles intermédiaires — ennemis, coffres et portes en quantité variable
    shuffled.slice(1, -1).forEach((room) => {
        // Récupérer toutes les cases sol disponibles dans la salle
        const positions = [];
        for (let y = room.y; y < room.y + room.h; y++)
            for (let x = room.x; x < room.x + room.w; x++)
                if (grid[y][x] === CELL_TYPES.FLOOR) positions.push({ x, y });

        // Mélanger les positions disponibles
        positions.sort(() => Math.random() - 0.5);
        let idx = 0;

        // 1 à 3 ennemis par salle
        const nbEnnemies = 1 + Math.floor(Math.random() * 3);
        for (let e = 0; e < nbEnnemies && idx < positions.length; e++, idx++)
            grid[positions[idx].y][positions[idx].x] = CELL_TYPES.ENNEMY;

        // 0 à 2 coffres par salle
        const nbChests = Math.floor(Math.random() * 3);
        for (let c = 0; c < nbChests && idx < positions.length; c++, idx++)
            grid[positions[idx].y][positions[idx].x] = CELL_TYPES.CHEST;

        // 0 à 1 porte par salle (40% de chance)
        if (Math.random() < 0.4 && idx < positions.length)
            grid[positions[idx].y][positions[idx].x] = CELL_TYPES.DOOR;
    });

    return grid;
}

/* -------------------------------------------- */
/*                 Carte actuelle               */
/* -------------------------------------------- */

let actualMap = generateBSPMap(25, 18, 3);

/* -------------------------------------------- */
/*             Chercher le joueur               */
/* -------------------------------------------- */

function initPlayer() {
    for (let i = 0; i < actualMap.length; i++) {
        for (let j = 0; j < actualMap[i].length; j++) {
            if (actualMap[i][j] === CELL_TYPES.PLAYER) {
                Player.x = j;
                Player.y = i;
                return;
            }
        }
    }
}

/* -------------------------------------------- */
/*            Chercher les ennemis              */
/* -------------------------------------------- */

let ennemies = {};

function initEnnemies() {
    ennemies = {};
    for (let i = 0; i < actualMap.length; i++) {
        for (let j = 0; j < actualMap[i].length; j++) {
            if (actualMap[i][j] === CELL_TYPES.ENNEMY) {
                let key = "ennemy_" + i + "_" + j;
                ennemies[key] = {
                    x: j, y: i,
                    name: "Ennemi",
                    stats: { hp: Ennemy.stats.hp, maxHp: Ennemy.stats.maxHp, attack: Ennemy.stats.attack, defense: Ennemy.stats.defense },
                    attackTypes: Ennemy.attackTypes,
                };
            }
        }
    }
}

/* -------------------------------------------- */
/*              Afficher la carte               */
/* -------------------------------------------- */

function loadMap() {
    const carte = document.getElementById('map');
    carte.innerHTML = "";
    carte.style.gridTemplateColumns = 'repeat(' + actualMap[0].length + ', 50px)';
    carte.style.gridTemplateRows = 'repeat(' + actualMap.length + ', 50px)';

    for (let i = 0; i < actualMap.length; i++) {
        for (let j = 0; j < actualMap[i].length; j++) {
            let cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            switch (actualMap[i][j]) {
                case CELL_TYPES.WALL:        cellElement.classList.add('wall'); break;
                case CELL_TYPES.FLOOR:       cellElement.classList.add('floor'); break;
                case CELL_TYPES.DOOR:        cellElement.classList.add('door'); break;
                case CELL_TYPES.STAIRS_DOWN: cellElement.classList.add('stairs-down'); break;
                case CELL_TYPES.CHEST:       cellElement.classList.add('chest'); break;
                case CELL_TYPES.PLAYER:      cellElement.classList.add('player'); break;
                case CELL_TYPES.ENNEMY:      cellElement.classList.add('ennemy'); break;
                case CELL_TYPES.CHEST_OPEN:  cellElement.classList.add('chest-open'); break;
            }
            carte.appendChild(cellElement);
        }
    }
}

/* -------------------------------------------- */
/*               Initialisation                 */
/* -------------------------------------------- */

initPlayer();
initEnnemies();
loadMap();

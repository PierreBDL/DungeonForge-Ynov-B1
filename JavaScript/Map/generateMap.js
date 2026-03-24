/* -------------------------------------------- */
/* Génération procédurale BSP                   */
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

        const horiz = this.h >= this.w ? true : 
                     (this.w >= this.h ? false : Math.random() < 0.5);

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
        if (!this.left && !this.right) {
            arr.push(this);
            return;
        }
        if (this.left)  this.left.getLeaves(arr);
        if (this.right) this.right.getLeaves(arr);
    }

    createRoom(grid, W, H) {
        const rw = Math.max(3, Math.floor(2 + Math.random() * (this.w - 4)));
        const rh = Math.max(3, Math.floor(2 + Math.random() * (this.h - 4)));
        const rx = this.x + Math.floor(1 + Math.random() * (this.w - rw - 1));
        const ry = this.y + Math.floor(1 + Math.random() * (this.h - rh - 1));

        this.room = { x: rx, y: ry, w: rw, h: rh };

        for (let y = ry; y < ry + rh; y++) {
            for (let x = rx; x < rx + rw; x++) {
                if (y > 0 && y < H - 1 && x > 0 && x < W - 1) {
                    grid[y][x] = CELL_TYPES.FLOOR;
                }
            }
        }
    }

    getCenter() {
        const r = this.room || {
            x: this.x + Math.floor(this.w / 2),
            y: this.y + Math.floor(this.h / 2),
            w: 1, h: 1
        };
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

/* -------------------------------------------- */
/* Corridor                                     */
/* -------------------------------------------- */

function digCorridor(a, b, grid, W, H) {
    let cx = a.x, cy = a.y;

    while (cx !== b.x) {
        if (grid[cy][cx] === CELL_TYPES.WALL)
            grid[cy][cx] = CELL_TYPES.FLOOR;
        cx += cx < b.x ? 1 : -1;
    }

    while (cy !== b.y) {
        if (grid[cy][cx] === CELL_TYPES.WALL)
            grid[cy][cx] = CELL_TYPES.FLOOR;
        cy += cy < b.y ? 1 : -1;
    }
}

/* -------------------------------------------- */
/* Flood Fill                                   */
/* -------------------------------------------- */

function floodFill(start, grid, W, H) {
    const visited = Array.from({ length: H }, () => Array(W).fill(false));
    const queue = [start];
    visited[start.y][start.x] = true;

    while (queue.length > 0) {
        const { x, y } = queue.shift();
        const dirs = [
            { x: 1, y: 0 }, { x: -1, y: 0 },
            { x: 0, y: 1 }, { x: 0, y: -1 }
        ];

        for (const d of dirs) {
            const nx = x + d.x;
            const ny = y + d.y;

            if (
                nx >= 0 && nx < W &&
                ny >= 0 && ny < H &&
                !visited[ny][nx] &&
                grid[ny][nx] !== CELL_TYPES.WALL
            ) {
                visited[ny][nx] = true;
                queue.push({ x: nx, y: ny });
            }
        }
    }

    return visited;
}

/* -------------------------------------------- */
/* Connectivity                                 */
/* -------------------------------------------- */

function ensureConnectivity(grid, W, H) {
    let playerPos = null;

    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            if (grid[y][x] === CELL_TYPES.PLAYER) {
                playerPos = { x, y };
            }
        }
    }

    if (!playerPos) return;

    let visited = floodFill(playerPos, grid, W, H);

    for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
            if (grid[y][x] !== CELL_TYPES.WALL && !visited[y][x]) {

                let found = false;
                for (let r = 1; r < 10 && !found; r++) {
                    for (let dy = -r; dy <= r && !found; dy++) {
                        for (let dx = -r; dx <= r && !found; dx++) {

                            let nx = x + dx;
                            let ny = y + dy;

                            if (
                                nx >= 0 && nx < W &&
                                ny >= 0 && ny < H &&
                                visited[ny][nx]
                            ) {
                                digCorridor({ x, y }, { x: nx, y: ny }, grid, W, H);
                                visited = floodFill(playerPos, grid, W, H);
                                found = true;
                            }
                        }
                    }
                }
            }
        }
    }
}

/* -------------------------------------------- */
/* Génération de la carte                       */
/* -------------------------------------------- */

function generateBSPMap(W = 25, H = 18, depth = 3) {

    const grid = Array.from({ length: H }, () => Array(W).fill(CELL_TYPES.WALL));

    const root = new BSPNode(1, 1, W - 2, H - 2);
    root.split(depth);

    const leaves = [];
    root.getLeaves(leaves);

    leaves.forEach(l => l.createRoom(grid, W, H));
    root.connectChildren(grid, W, H);

    const rooms = leaves.filter(l => l.room).map(l => l.room);
    const shuffled = rooms.sort(() => Math.random() - 0.5);

    /* Placement du joueur */
    const firstRoom = shuffled[0];
    const safePlayer = getSafeSpot(firstRoom, grid);
    grid[safePlayer.y][safePlayer.x] = CELL_TYPES.PLAYER;

    /* Placement escalier */
    const lastRoom = shuffled[shuffled.length - 1];
    const safeStairs = getSafeSpot(lastRoom, grid);
    grid[safeStairs.y][safeStairs.x] = CELL_TYPES.STAIRS_DOWN;

    /* Connectivité */
    ensureConnectivity(grid, W, H);

    /* Spawn des entités APRÈS la connectivité */
    shuffled.slice(1, -1).forEach(room => {

        const positions = [];
        for (let y = room.y; y < room.y + room.h; y++)
            for (let x = room.x; x < room.x + room.w; x++)
                if (grid[y][x] === CELL_TYPES.FLOOR) positions.push({ x, y });

        positions.sort(() => Math.random() - 0.5);
        let idx = 0;

        const nbEnnemies = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < nbEnnemies && idx < positions.length; i++, idx++)
            grid[positions[idx].y][positions[idx].x] = CELL_TYPES.ENNEMY;

        const nbChests = Math.floor(Math.random() * 3);
        for (let i = 0; i < nbChests && idx < positions.length; i++, idx++)
            grid[positions[idx].y][positions[idx].x] = CELL_TYPES.CHEST;

        if (Math.random() < 0.4 && idx < positions.length)
            grid[positions[idx].y][positions[idx].x] = CELL_TYPES.DOOR;
    });

    return grid;
}

/* -------------------------------------------- */
/* Safe spot dans une room                      */
/* -------------------------------------------- */

function getSafeSpot(room, grid) {
    const spots = [];

    for (let y = room.y; y < room.y + room.h; y++)
        for (let x = room.x; x < room.x + room.w; x++)
            if (grid[y][x] === CELL_TYPES.FLOOR) spots.push({ x, y });

    return spots[Math.floor(Math.random() * spots.length)];
}
📄 Explication du générateur BSP (Binary Space Partitioning)
🔹 1. Classe BSPNode
class BSPNode {

➡️ Définit une classe représentant un nœud BSP (une zone rectangulaire de la carte).

constructor(x, y, w, h) {

➡️ Constructeur avec :

x, y : position du coin supérieur gauche
w, h : largeur et hauteur
this.x = x; this.y = y;
this.w = w; this.h = h;

➡️ Stocke les dimensions et la position.

this.left = null; this.right = null;

➡️ Sous-nœuds (division de la zone).

this.room = null;

➡️ Contiendra une salle générée dans cette zone.

🔹 2. Méthode split(depth)
split(depth) {

➡️ Divise récursivement la zone.

if (depth === 0 || this.w < 8 || this.h < 8) return;

➡️ Stoppe si :

profondeur atteinte
zone trop petite
const horiz = this.h >= this.w ? true : (this.w >= this.h ? false : Math.random() < 0.5);

➡️ Choisit orientation de coupe :

horizontale si hauteur ≥ largeur
sinon verticale
ou aléatoire
➤ Coupe horizontale
const cut = Math.floor(3 + Math.random() * (this.h - 6));

➡️ Position de coupe avec marges

this.left  = new BSPNode(this.x, this.y, this.w, cut);
this.right = new BSPNode(this.x, this.y + cut, this.w, this.h - cut);

➡️ Crée deux sous-zones

➤ Coupe verticale
const cut = Math.floor(3 + Math.random() * (this.w - 6));
this.left  = new BSPNode(this.x, this.y, cut, this.h);
this.right = new BSPNode(this.x + cut, this.y, this.w - cut, this.h);
this.left.split(depth - 1);
this.right.split(depth - 1);

➡️ Continue récursivement

🔹 3. Récupération des feuilles
getLeaves(arr) {
if (!this.left && !this.right) { arr.push(this); return; }

➡️ Si feuille → ajout au tableau

if (this.left)  this.left.getLeaves(arr);
if (this.right) this.right.getLeaves(arr);

➡️ Parcours récursif

🔹 4. Création des salles
createRoom(grid, W, H) {
const rw = Math.max(3, Math.floor(2 + Math.random() * (this.w - 4)));
const rh = Math.max(3, Math.floor(2 + Math.random() * (this.h - 4)));

➡️ Taille aléatoire de la salle

const rx = this.x + Math.floor(1 + Math.random() * (this.w - rw - 1));
const ry = this.y + Math.floor(1 + Math.random() * (this.h - rh - 1));

➡️ Position aléatoire dans la zone

this.room = { x: rx, y: ry, w: rw, h: rh };
grid[y][x] = CELL_TYPES.FLOOR;

➡️ Remplit la salle avec du sol

🔹 5. Centre de la salle
getCenter() {
const r = this.room || { ... };

➡️ Si pas de salle → centre de la zone

return { x: ..., y: ... };

➡️ Retourne le centre

🔹 6. Connexion des salles
connectChildren(grid, W, H) {
if (!this.left || !this.right) return;

➡️ Ignore si pas de sous-nœuds

this.left.connectChildren(...);
this.right.connectChildren(...);

➡️ Connexion récursive

const a = this.left.getCenter();
const b = this.right.getCenter();
digCorridor(a, b, grid, W, H);

➡️ Creuse un couloir

🔹 7. Création des couloirs
function digCorridor(a, b, grid, W, H) {
Horizontal
while (cx !== b.x)

➡️ Avance horizontalement

grid[cy][cx] = CELL_TYPES.FLOOR;
Vertical
while (cy !== b.y)

➡️ Avance verticalement

🔹 8. Génération complète
function generateBSPMap(W = 20, H = 15, depth = 3) {
const grid = Array.from({ length: H }, () => Array(W).fill(CELL_TYPES.WALL));

➡️ Grille remplie de murs

const root = new BSPNode(1, 1, W - 2, H - 2);

➡️ Zone principale

root.split(depth);

➡️ Division BSP

root.getLeaves(leaves);
leaves.forEach(l => l.createRoom(grid, W, H));

➡️ Génère les salles

root.connectChildren(grid, W, H);

➡️ Relie les salles

🔹 9. Placement des entités
const rooms = leaves.filter(l => l.room).map(l => l.room);
const shuffled = rooms.sort(() => Math.random() - 0.5);

➡️ Mélange aléatoire

Joueur
grid[...] = CELL_TYPES.PLAYER;
Escalier
grid[...] = CELL_TYPES.STAIRS_DOWN;
Contenu des salles
if (i % 3 === 0) CHEST
else ENNEMY
🔹 10. Initialisation de la carte
let actualMap = generateBSPMap(25, 18, 3);
🔹 11. Initialisation du joueur
function initPlayer() {

➡️ Parcourt la grille pour trouver le joueur

Player.x = j;
Player.y = i;
🔹 12. Initialisation des ennemis
let ennemies = {};
function initEnnemies() {

➡️ Parcourt la carte

if (actualMap[i][j] === CELL_TYPES.ENNEMY)

➡️ Crée un objet ennemi avec stats

🔹 13. Affichage de la carte
function loadMap() {
carte.innerHTML = "";

➡️ Reset affichage

gridTemplateColumns / Rows

➡️ Définit la grille CSS

let cellElement = document.createElement('div');

➡️ Crée une case HTML

cellElement.classList.add(...)

➡️ Ajoute une classe selon le type

🔹 14. Initialisation globale
initPlayer();
initEnnemies();
loadMap();

➡️ Lance :

Placement du joueur
Génération des ennemis
Affichage
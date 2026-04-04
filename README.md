<div align="center">
  <h1 align="center">⚔️ DungeonForge</h1>
  <p align="center">
    Jeu de donjon au tour par tour avec niveaux générés procéduralement, combats tactiques et système de butin dynamique.
    <br />
    <br />
    <a href="https://github.com/issues">🐛 Signaler un bug</a>
    ·
    <a href="https://github.com/issues">💡 Demander une fonctionnalité</a>
    ·
    <a href="https://pierrebdl.github.io/DungeonForge-Ynov-B1/">🎮 Jouer maintenant</a>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/language-JavaScript%20%7C%20HTML%20%7C%20CSS-F7DF1E?style=for-the-badge&labelColor=000000" />
    <img src="https://img.shields.io/badge/platform-Web%20%7C%20Navigateur-0078D4?style=for-the-badge&labelColor=000000" />
    <img src="https://img.shields.io/badge/status-Jouable-28A745?style=for-the-badge&labelColor=000000" />
  </p>
</div>

---

### 🔍 Vue d'ensemble

`DungeonForge` est un jeu de donjon tactique créé en JavaScript pur. Naviguez à travers plusieurs niveaux générés de manière procédurale, combattez des ennemis au tour par tour, découvrez des objets et équipements. Le je devient de plus en plus difficiles en descendant dans les profondeurs du donjon.

Le jeu propose une économie de butin dynamique avec un système de marchand, et une difficulté progressive qui évolue avec votre progression. Toute votre progression est sauvegardée localement dans le navigateur avec `localStorage`.

> **Jouez en ligne** depuis ce repo, ou lancez localement dans votre navigateur. Aucune installation requise (à part pour le développement local).

### ✨ Fonctionnalités

- **Niveaux générés procéduralement** : Algorithme BSP crée des donjons uniques
- **Combat au tour par tour** : Système de combat stratégique avec positionnement et modifications de stats
- **Difficulté dynamique** : Stats des ennemis évoluent avec votre progression (PV, ATK, DEF)
- **Système d'équipement et objets** : 8 pièces d'équipement avec bonus statistiques + 6 potions consommables
- **Marchand PNJ** : Sélection aléatoire de 4-6 objets par visite parmi 12 disponibles
- **Tables de butin** : Coffres et ennemis lâchent de l'équipement en fonction du niveau
- **Mécanique de poison** : Système d'effet (5 tours, 5 dégâts/tour)
- **Gestion d'inventaire** : Ramasser, équiper, utiliser et lancer des objets
- **Système de profil** : Afficher vos stats et votre équipement actuel
- **Bande sonore audio** : 5 pistes musicalesqui change en fonction du contexte (combat / marchand / musique de fond ou menu)
- **Persistance navigateur** : Niveaux déverrouillés et progression sauvegardés avec `localStorage`

### 🎮 Jouer

Jouez ici : [**DungeonForge**](./index.html)

### 📊 Stats de jeu

| Nom | Valeur |
|---|---|
| Types d'ennemis | Escalade procédurale |
| Pièces d'équipement | 8 |
| Objets consommables | 6 |
| Stats du joueur initial | 150 PV, 20 ATK, 8 DEF |

---

### 🧰 Prérequis

- Un navigateur moderne (Chrome, Firefox, Safari, Edge) sur ordinateur ou mobile
- Aucune dépendance externe ou installation

---

### 🚀 Installation et utilisation

#### Option 1 — Jouer en ligne

- Ouvrez [**DungeonForge**](https://pierrebdl.github.io/DungeonForge-Ynov-B1/) directement dans votre navigateur
- Votre progression est automatiquement sauvegardée

#### Option 2 — Lancer localement depuis la source

1. Clonez ou téléchargez ce repository
   ```bash
   git clone https://github.com/PierreBDL/DungeonForge-Ynov-B1.git
   cd DungeonForge-Ynov-B1
   ```

2. Démarrez un serveur HTTP local (recommandé) :
   ```bash
   # Avec Python 3
   python -m http.server 8000

   # Ou avec Node.js
   npx http-server

   # Ou avec PHP
   php -S localhost:8000
   ```

3. Ouvrez votre navigateur à :
   ```text
   http://localhost:8000
   ```

---

### 📖 Comment jouer

1. **Commencez votre aventure**
   - Ouvrez DungeonForge dans votre navigateur
   - Cliquez sur **Jouer** depuis le menu principal
   - Débutez au niveau 1 avec des ennemis basiques

2. **Naviguez dans le donjon**
   - Utilisez les **Flèches** ou **ZQSD** ou **WASD** pour vous déplacer
   - Évitez les murs et explorez chaque niveau

3. **Engagez le combat**
   - Le combat est au tour par tour : vous bougez, les ennemis répondent
   - Vos stats (PV, ATK, DEF) influencent le calcul des dégâts
   - Vainquez tous les ennemis ou vous les ignorez pour progresser au prochain niveau
   - Si vous fuyez, vous perdez des PV

4. **Collectez des objets et équipements**
   - Ouvrez les coffres pour trouver du butin
   - Les ennemis lâchent du butin quand ils sont vaincus
   - Achetez de l'équipement pour augmenter vos stats

5. **Visitez le marchand**
   - Le marchand apparaît dans 70% des niveaux
   - Achetez parmi 4-6 objets sélectionnés aléatoirement
   - Les objets du marchand ont des bonus statistiques

6. **Utilisez votre inventaire**
   - Appuyez sur le bouton en bas à gauche pour ouvrir l'inventaire
   - Cliquez sur les objets pour voir les options :
     - **Utiliser** (Uniquement en combat) : Consommer des potions en combat
     - **Jeter** (Uniquement hors combat) : Jeter les objets inutiles
   - Potions : vie, guérison majeure, poison, force, armure

7. **Consultez votre profil**
   - Appuyez sur le bouton en bas à gauche pour voir les stats du personnage
   - Visualisez les objets équipés
   - Suivez votre niveau et les points d'amélioration disponibles

8. **Progressez à travers les niveaux**
   - Les ennemis deviennent plus forts à chaque niveau
   - Choisissez vos équipement méthodiquement

---

### 🎮 Contrôles

| Touche | Action |
|---|---|
| **Flèches** ou **ZQSD** ou **WASD** | Déplacer le personnage |
| **Échap** | Ouvrir les paramètres |
| **Clic souris** | Sélectionner des objets / Options du menu |

---

**Récompenses échelonnées :**
- Or : `15 + (niveau × 10)` par victoire
- XP : `30 + (niveau × 15)` par victoire

---

### 📁 Structure du projet

```
.
├── index.html                           # Lanceur du jeu
├── README.md                            # Ce fichier
├── Audio                                # 5 musiques de fond (combat, marchand, menu, etc.)
├── Css/
│   ├── game.css                         # Style de l'interface de jeu
│   ├── headerFooter.css                 # Styles communs
│   └── index.css                        # Styles du menu principal
├── Html/game.html                       # Interface de jeu (grille, HUD, overlays)
├── Images/
│   ├── Items/                           # 15 sprites SVG (objets, équipements)
│   ├── Fight/                           # Assets de combat
│   ├── Tiles/                           # Tileset du donjon
│   └── UI/                              # Éléments d'interface
└── JavaScript/
    ├── chargeJsFiles.js                 # Chargeur de scripts
    ├── mainMenu.js                      # Logique du menu
    ├── Common/
    │   ├── audio.js                     # Système sonore
    │   └── settings.js                  # Paramètres du jeu
    └── Scripts/
        ├── fight.js                     # Moteur de combat
        ├── gameOver.js                  # Écran de fin de partie
        ├── items.data.js                # Définitions des objets
        ├── useItems.js                  # Logique de consommation d'objets
        ├── giveItems.js                 # Distribution d'objets
        ├── Entities/
        │   ├── mobs.js                  # Joueur et ennemis
        │   ├── merchant.js              # Système du marchand (12 objets)
        │   └── playerMovement.js        # Déplacement et interactions
        ├── Map/
        │   ├── generateMap.js           # Générateur de donjon BSP
        │   ├── map.js                   # Données des niveaux + Affichage de la carte
        │   └── changeLevel.js           # Transitions entre niveaux
        └── Ui/
            ├── hud.js                   # Affichage HUD (Barre expérience)
            ├── inventory.js             # Interface d'inventaire
            ├── profile.js               # Profil du personnage + équipement
            ├── message.js               # Système de notifications
            ├── xp.js                    # Suivi de l'expérience
            └── saveMenu.js              # Système de sauvegarde/chargement
```

---

### 🛠️ Stack technique

| Couche | Technologie |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript vanilla |
| **Génération de donjon** | Algorithme BSP (Binary Space Partitioning) |
| **Rendu** | Grille CSS (25×18 tiles, 40px par tile) |
| **Audio** | Web Audio API |
| **Gestion d'état** | Variables globales + localStorage |
| **Persistance** | localStorage du navigateur (niveau, objets, stats) |

---

### 💾 Système de sauvegarde

Votre progression est sauvegardée dans `localStorage` :
- Niveau actuel et position du personnage
- Inventaire et objets équipés
- Stats du personnage (PV, ATK, DEF, XP, Or)
- Niveaux actuel
- Etc

Réinitialisation de la progression lors de la mort du personnage

---

<div align="center">

**Développé par DOMgeonForge** — Projet scolaire pour le cours JavaScript, B1 - Informatique (YNOV)

**DungeonForge**

</div>
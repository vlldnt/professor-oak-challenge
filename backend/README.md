# 🛠️ Backend - Professor Oak Challenge API

> API REST Node.js avec Express.js et SQLite pour le système de jeu Pokémon

## 📋 Structure du projet

\`\`\`
backend/
├── 📁 src/
│   ├── 📁 controllers/      # Contrôleurs des routes API
│   │   ├── authController.js    # Authentification JWT
│   │   └── gameController.js    # Logique de jeu
│   ├── 📁 db/               # Configuration base de données
│   │   └── database.js          # Setup SQLite
│   ├── 📁 middleware/       # Middlewares Express
│   │   └── auth.js              # Middleware authentification
│   └── 📁 models/           # Modèles de données (si besoin)
├── 📄 server.js             # Point d'entrée serveur
├── 📄 package.json          # Dépendances npm
└── 📄 .env                  # Variables d'environnement
\`\`\`

## 🚀 Démarrage rapide

### Installation des dépendances
\`\`\`bash
cd backend
npm install
\`\`\`

### Configuration de l'environnement
Créez un fichier \`.env\` :
\`\`\`env
PORT=3001
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_in_production
BCRYPT_ROUNDS=12
TOKEN_EXPIRY=24h
DB_NAME=professor_oak_challenge.db
CORS_ORIGIN=http://localhost:5173
\`\`\`

### Démarrage du serveur
\`\`\`bash
# Mode développement
npm run dev

# Mode production
npm start
\`\`\`

## 📡 Endpoints API

### 🔐 Authentification (/api/auth)

#### POST /api/auth/register
Inscription d'un nouvel utilisateur
\`\`\`json
{
  "username": "ash_ketchum",
  "email": "ash@pokemon.com",
  "password": "motdepasse123"
}
\`\`\`

#### POST /api/auth/login
Connexion utilisateur
\`\`\`json
{
  "email": "ash@pokemon.com",
  "password": "motdepasse123"
}
\`\`\`

#### GET /api/auth/verify
Vérification du token JWT (Header: Authorization: Bearer <token>)

### 🎮 Données de jeu (/api/game)

#### GET /api/game/user/:id
Récupération des statistiques utilisateur

#### PUT /api/game/user/:id
Mise à jour des statistiques utilisateur

#### POST /api/game/catch-pokemon
Capture d'un Pokémon
\`\`\`json
{
  "pokemonName": "Pikachu"
}
\`\`\`

## 🗄️ Schéma de base de données

### Table \`users\`
- \`id\` (INTEGER PRIMARY KEY)
- \`username\` (TEXT UNIQUE)
- \`email\` (TEXT UNIQUE)
- \`password_hash\` (TEXT)
- \`created_at\` (DATETIME)

### Table \`user_stats\`
- \`id\` (INTEGER PRIMARY KEY)
- \`user_id\` (INTEGER FK)
- \`pokemon_caught\` (INTEGER)
- \`badges_earned\` (INTEGER)
- \`battles_won\` (INTEGER)
- \`hours_played\` (INTEGER)

### Table \`caught_pokemon\`
- \`id\` (INTEGER PRIMARY KEY)
- \`user_id\` (INTEGER FK)
- \`pokemon_name\` (TEXT)
- \`caught_at\` (DATETIME)

## 🔒 Sécurité

- **bcrypt** : Hachage des mots de passe (12 rounds)
- **JWT** : Authentification par tokens
- **CORS** : Protection cross-origin
- **Validation** : Sanitisation des entrées
- **Middleware** : Protection des routes sensibles

## 🛠️ Scripts disponibles

\`\`\`json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "jest"
}
\`\`\`

## 📦 Dépendances principales

- **express** - Framework web
- **sqlite3** - Base de données
- **bcrypt** - Hachage mots de passe
- **jsonwebtoken** - Authentification JWT
- **cors** - Gestion CORS
- **dotenv** - Variables d'environnement

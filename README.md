# 🎯 Professor Oak Challenge

> *Embarquez dans l'ultime aventure Pokémon et devenez un maître dresseur !*

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?style=for-the-badge&logo=sqlite)](https://sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 Table des matières

- [🎮 Aperçu du projet](#-aperçu-du-projet)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies utilisées](#️-technologies-utilisées)
- [📦 Installation](#-installation)
- [🚀 Démarrage rapide](#-démarrage-rapide)
- [🔧 Configuration](#-configuration)
- [📡 API Endpoints](#-api-endpoints)
- [🌐 Internationalisation](#-internationalisation)
- [📱 Interface utilisateur](#-interface-utilisateur)
- [🔒 Authentification](#-authentification)
- [🗄️ Base de données](#️-base-de-données)
- [📸 Captures d'écran](#-captures-décran)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)

## 🎮 Aperçu du projet

**Professor Oak Challenge** est une application web full-stack inspirée de l'univers Pokémon, développée avec React et Node.js. L'application permet aux utilisateurs de vivre une expérience immersive de dresseur Pokémon avec un système complet de capture, de statistiques et de progression.

### 🎯 Objectifs du projet

- Créer une interface moderne et responsive avec **React** et **Tailwind CSS**
- Implémenter une API REST robuste avec **Express.js** et **SQLite**
- Gérer l'authentification sécurisée avec **JWT** et **bcrypt**
- Offrir une expérience multilingue avec **i18next** (Français/Anglais)
- Assurer la persistance des données utilisateur avec **localStorage**

## ✨ Fonctionnalités

### 🔐 Authentification
- [x] **Inscription** avec validation des données
- [x] **Connexion** sécurisée avec JWT
- [x] **Persistance de session** avec localStorage
- [x] **Déconnexion** avec nettoyage des données
- [x] **Protection des routes** API

### 🎮 Gameplay
- [x] **Capture de Pokémon** aléatoire
- [x] **Système de statistiques** (Pokémon capturés, badges, combats, heures)
- [x] **Tableau de bord** personnalisé
- [x] **Suivi de progression** en temps réel
- [x] **Historique d'activité** utilisateur

### 🌍 Interface
- [x] **Design responsive** mobile-first
- [x] **Thème moderne** avec gradients et animations
- [x] **Navigation intuitive** avec menu hamburger mobile
- [x] **Messages de feedback** utilisateur
- [x] **Chargement et états d'erreur** gérés

### 🌐 Internationalisation
- [x] **Support multilingue** Français/Anglais
- [x] **Changement dynamique** de langue
- [x] **Traductions complètes** de l'interface
- [x] **Détection automatique** de la langue navigateur

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Bibliothèque UI moderne avec hooks
- **Vite** - Build tool ultra-rapide pour le développement
- **Tailwind CSS** - Framework CSS utility-first
- **i18next** - Gestion de l'internationalisation
- **Fetch API** - Communication avec l'API REST

### Backend
- **Node.js 22** - Runtime JavaScript côté serveur
- **Express.js 4** - Framework web minimaliste et flexible
- **SQLite 3** - Base de données embarquée légère
- **JWT** - Authentification par tokens JSON
- **bcrypt** - Hachage sécurisé des mots de passe
- **CORS** - Gestion des requêtes cross-origin
- **dotenv** - Gestion des variables d'environnement

### Outils de développement
- **ESLint** - Linting du code JavaScript
- **Prettier** - Formatage automatique du code
- **npm** - Gestionnaire de paquets

## 📦 Installation

### Prérequis

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Git** pour cloner le repository

### 1. Cloner le repository

\`\`\`bash
git clone https://github.com/votre-username/professor-oak-challenge.git
cd professor-oak-challenge
\`\`\`

### 2. Installation des dépendances

#### Backend
\`\`\`bash
cd backend
npm install
\`\`\`

#### Frontend
\`\`\`bash
cd ../frontend
npm install
\`\`\`

## 🚀 Démarrage rapide

### 1. Configuration de l'environnement

Créez un fichier \`.env\` dans le dossier \`backend\` :

\`\`\`env
PORT=3001
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_in_production
BCRYPT_ROUNDS=12
TOKEN_EXPIRY=24h
DB_NAME=professor_oak_challenge.db
CORS_ORIGIN=http://localhost:5173
\`\`\`

### 2. Démarrage des serveurs

#### Terminal 1 - Backend API
\`\`\`bash
cd backend
npm start
# ou pour le développement avec auto-reload
npm run dev
\`\`\`

#### Terminal 2 - Frontend React
\`\`\`bash
cd frontend
npm run dev
\`\`\`

### 3. Accès à l'application

- **Frontend** : [http://localhost:5173](http://localhost:5173)
- **Backend API** : [http://localhost:3001](http://localhost:3001)

## 🔧 Configuration

### Variables d'environnement (.env)

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| \`PORT\` | Port du serveur backend | 3001 |
| \`NODE_ENV\` | Environnement d'exécution | development |
| \`JWT_SECRET\` | Clé secrète pour JWT | ⚠️ À changer en production |
| \`BCRYPT_ROUNDS\` | Niveau de hachage bcrypt | 12 |
| \`TOKEN_EXPIRY\` | Durée de validité JWT | 24h |
| \`DB_NAME\` | Nom du fichier SQLite | professor_oak_challenge.db |
| \`CORS_ORIGIN\` | Origine autorisée CORS | http://localhost:5173 |

## 📡 API Endpoints

### 🔐 Authentification

| Méthode | Endpoint | Description | Body |
|---------|----------|-------------|------|
| POST | \`/api/auth/register\` | Inscription utilisateur | \`{username, email, password}\` |
| POST | \`/api/auth/login\` | Connexion utilisateur | \`{email, password}\` |
| GET | \`/api/auth/verify\` | Vérification token | - |

### 🎮 Données de jeu

| Méthode | Endpoint | Description | Body |
|---------|----------|-------------|------|
| GET | \`/api/game/user/:id\` | Statistiques utilisateur | - |
| PUT | \`/api/game/user/:id\` | Mise à jour stats | \`{stats object}\` |
| POST | \`/api/game/catch-pokemon\` | Capturer Pokémon | \`{pokemonName}\` |

### 📝 Exemples de requêtes

#### Inscription
\`\`\`bash
curl -X POST http://localhost:3001/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"username":"ash_ketchum","email":"ash@pokemon.com","password":"motdepasse123"}'
\`\`\`

#### Connexion
\`\`\`bash
curl -X POST http://localhost:3001/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"ash@pokemon.com","password":"motdepasse123"}'
\`\`\`

## 🌐 Internationalisation

L'application supporte deux langues :

- 🇫🇷 **Français** (par défaut)
- 🇬🇧 **Anglais**

### Changement de langue

Les utilisateurs peuvent changer de langue via les boutons **FR/EN** dans le header. La préférence est sauvegardée dans le localStorage.

### Ajout de nouvelles langues

1. Modifiez \`frontend/src/i18n.js\`
2. Ajoutez les traductions dans l'objet \`resources\`
3. Mettez à jour les boutons de langue dans \`Header.jsx\`

## 📱 Interface utilisateur

### 🎨 Design System

- **Couleurs** : Palette moderne avec bleu, violet et dégradés
- **Typographie** : Police système avec hiérarchie claire
- **Espacement** : Système basé sur Tailwind CSS (rem)
- **Composants** : Design cohérent avec réutilisabilité

### 📱 Responsive Design

- **Mobile First** : Optimisé pour les petits écrans
- **Breakpoints** : sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation** : Menu hamburger sur mobile, horizontal sur desktop

### 🎭 États de l'interface

- **Chargement** : Spinners et états de loading
- **Succès** : Messages verts avec icônes
- **Erreur** : Messages rouges avec indications claires
- **Vide** : États d'absence de données

## 🔒 Authentification

### 🛡️ Sécurité implémentée

- **Hachage bcrypt** : Mots de passe sécurisés (12 rounds)
- **JWT Tokens** : Authentification stateless
- **CORS Protection** : Contrôle des origines autorisées
- **Validation** : Données d'entrée sanitisées
- **Middleware Auth** : Protection des routes sensibles

### 🔑 Flux d'authentification

1. **Inscription** → Hachage mot de passe → Génération JWT
2. **Connexion** → Vérification bcrypt → Retour JWT + user data
3. **Persistance** → Sauvegarde localStorage → Auto-login
4. **Protection** → Middleware vérifie JWT → Accès autorisé/refusé

## 🗄️ Base de données

### 📊 Schéma SQLite

#### Table \`users\`
\`\`\`sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

#### Table \`user_stats\`
\`\`\`sql
CREATE TABLE user_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  pokemon_caught INTEGER DEFAULT 0,
  badges_earned INTEGER DEFAULT 0,
  battles_won INTEGER DEFAULT 0,
  hours_played INTEGER DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
\`\`\`

#### Table \`caught_pokemon\`
\`\`\`sql
CREATE TABLE caught_pokemon (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  pokemon_name TEXT NOT NULL,
  caught_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
\`\`\`

## 📸 Captures d'écran

### 🏠 Page d'accueil
- Interface moderne avec hero section
- Navigation responsive avec menu mobile
- Boutons de changement de langue FR/EN

### 🔐 Page de connexion
- Formulaire élégant avec validation
- États de chargement et messages d'erreur
- Redirection automatique après connexion

### 🏆 Dashboard utilisateur
- Affichage des statistiques en cartes
- Informations utilisateur centrées
- Bouton de capture Pokémon interactif

## 🤝 Contribution

### 🔄 Workflow de développement

1. **Fork** le repository
2. **Créez** une branche feature (\`git checkout -b feature/ma-feature\`)
3. **Committez** vos changements (\`git commit -m 'Ajout de ma feature'\`)
4. **Push** vers la branche (\`git push origin feature/ma-feature\`)
5. **Ouvrez** une Pull Request

### 📝 Standards de code

- **ESLint** : Respect des règles de linting
- **Commits** : Messages clairs et descriptifs
- **Tests** : Ajout de tests pour les nouvelles features
- **Documentation** : Mise à jour du README si nécessaire

### 🐛 Signalement de bugs

Utilisez les **GitHub Issues** avec le template :
- Description du problème
- Étapes de reproduction
- Comportement attendu vs actuel
- Environnement (OS, navigateur, versions)

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👥 Équipe

Développé avec ❤️ par l'équipe Professor Oak Challenge

### 🙏 Remerciements

- **Nintendo/Game Freak** pour l'univers Pokémon inspirant
- **React Team** pour la bibliothèque exceptionnelle
- **Tailwind CSS** pour le framework CSS moderne
- **Communauté Open Source** pour les outils utilisés

---

<div align="center">
  <h3>🎯 Attrapez-les tous ! 🎯</h3>
  <p><i>Devenez le meilleur dresseur Pokémon avec Professor Oak Challenge</i></p>
  
  <a href="http://localhost:5173">🚀 Démarrer l'aventure</a> •
  <a href="#-api-endpoints">📡 Documentation API</a> •
  <a href="#-contribution">🤝 Contribuer</a>
</div>

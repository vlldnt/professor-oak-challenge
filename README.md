# 🎯 Professor Oak Challenge

> *Suivez votre progression et relevez l'ultime défi Pokémon !*

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?style=for-the-badge&logo=sqlite)](https://sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🎮 Qu'est-ce que le Professor Oak Challenge ?

Le **Professor Oak Challenge** consiste à compléter un Pokédex à 100 % dès que possible, en attrapant et en faisant évoluer tous les Pokémon disponibles avant de battre le premier champion d'arène. Cela demande une connaissance approfondie du jeu et beaucoup de patience. C'est un défi de complétion extrême pour les fans hardcore.

Cette application web vous permet de **suivre votre progression** dans ce défi légendaire avec un tableau de bord personnalisé.

## 🛠️ Technologies utilisées

### 🎨 Frontend
| Technologie | Version | Badge | Utilité |
|-------------|---------|-------|---------|
| **React** | 18.x | ![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white) | Framework JavaScript pour interfaces utilisateur réactives |
| **Vite** | 5.x | ![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white) | Build tool ultra-rapide avec Hot Module Replacement (HMR) |
| **Tailwind CSS** | 3.x | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Framework CSS utility-first pour styling rapide et responsive |
| **i18next** | 23.x | ![i18next](https://img.shields.io/badge/i18next-23.x-26A69A?style=flat-square&logo=i18next&logoColor=white) | Internationalisation (FR/EN) pour interface multilingue |
| **React Router** | 6.x | ![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245?style=flat-square&logo=react-router&logoColor=white) | Navigation client-side avec routes protégées |

### ⚙️ Backend
| Technologie | Version | Badge | Utilité |
|-------------|---------|-------|---------|
| **Node.js** | 22.x | ![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js&logoColor=white) | Runtime JavaScript serveur haute performance |
| **Express.js** | 4.x | ![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white) | Framework web minimaliste pour API REST |
| **SQLite** | 3.x | ![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?style=flat-square&logo=sqlite&logoColor=white) | Base de données embarquée, parfaite pour développement |
| **JWT** | 9.x | ![JWT](https://img.shields.io/badge/JWT-9.x-000000?style=flat-square&logo=json-web-tokens&logoColor=white) | Tokens sécurisés pour authentification stateless |
| **bcrypt** | 6.x | ![bcrypt](https://img.shields.io/badge/bcrypt-6.x-FF6B6B?style=flat-square&logo=npm&logoColor=white) | Hash sécurisé des mots de passe (protection contre rainbow tables) |
| **CORS** | 2.x | ![CORS](https://img.shields.io/badge/CORS-2.x-4CAF50?style=flat-square&logo=checkmarx&logoColor=white) | Gestion des politiques cross-origin pour frontend/backend |

### 📚 Documentation & DevTools
| Technologie | Version | Badge | Utilité |
|-------------|---------|-------|---------|
| **Swagger UI** | 5.x | ![Swagger](https://img.shields.io/badge/Swagger-5.x-85EA2D?style=flat-square&logo=swagger&logoColor=black) | Documentation API interactive auto-générée |
| **Swagger JSDoc** | 6.x | ![OpenAPI](https://img.shields.io/badge/OpenAPI-6.x-6BA539?style=flat-square&logo=openapiinitiative&logoColor=white) | Annotations JSDoc pour générer specs OpenAPI |
| **dotenv** | 17.x | ![dotenv](https://img.shields.io/badge/dotenv-17.x-ECD53F?style=flat-square&logo=dotenv&logoColor=black) | Gestion des variables d'environnement (.env) |
| **nodemon** | 3.x | ![nodemon](https://img.shields.io/badge/nodemon-3.x-76D04B?style=flat-square&logo=nodemon&logoColor=white) | Rechargement automatique du serveur en développement |

### 🗄️ Architecture de données
```
users (SQLite)
├── id (UUID)
├── email (unique, regex validé)  
├── username (unique)
├── password (bcrypt hash)
└── timestamps (created_at, updated_at)

user_guides (SQLite)
├── id (UUID)
├── user_id (FK → users)
├── guide_name (Pokemon Red/Blue, Yellow...)
└── started_at (timestamp)

captures (SQLite) [En développement]
├── id (UUID)
├── user_id (FK → users)
├── pokemon_id (Pokédex #)
├── pokemon_name
├── level
└── caught_at (timestamp)
```

---

## 📚 Documentation des routes implémentées

### � Auth — Authentification
| Méthode | URL                    | Description               | Status |
|---------|------------------------|---------------------------|--------|
| POST    | /api/auth/register     | Inscription utilisateur   | ✅     |
| POST    | /api/auth/login        | Connexion utilisateur     | ✅     |
| GET     | /api/auth/verify       | Vérifier token JWT        | ✅     |

### � Users — Gestion des comptes
| Méthode | URL                           | Description                      | Status |
|---------|-------------------------------|----------------------------------|--------|
| GET     | /api/users                    | Lister tous les utilisateurs     | ✅     |
| GET     | /api/users/:id                | Récupérer un utilisateur par ID  | ✅     |
| GET     | /api/users/by-username/:name  | Récupérer par nom d'utilisateur  | ✅     |
| PATCH   | /api/users/:id                | Modifier utilisateur (partiel)   | ✅     |
| DELETE  | /api/users/:id                | Supprimer un utilisateur         | ✅     |

### 🗺️ Guides — Défis Pokémon
| Méthode | URL                              | Description                      | Status |
|---------|----------------------------------|----------------------------------|--------|
| POST    | /api/game/user/:userId/guides    | Créer un guide pour utilisateur  | ✅     |
| GET     | /api/game/user/:userId/current-guide | Guide actuel de l'utilisateur | ✅     |

### 🐱‍👤 Captures — Pokémons capturés (À implémenter)
| Méthode | URL                          | Description                      | Status |
|---------|------------------------------|----------------------------------|--------|
| POST    | /api/game/catch-pokemon      | Ajouter une capture              | 🔄     |
| GET     | /api/game/caught-pokemon     | Voir captures de l'utilisateur   | 🔄     |
| DELETE  | /api/game/captures/:id       | Supprimer une capture            | ❌     |

### 📊 Stats — Statistiques utilisateur
| Méthode | URL                     | Description                      | Status |
|---------|-------------------------|----------------------------------|--------|
| GET     | /api/game/user/:userId  | Récupérer stats utilisateur      | ✅     |
| PUT     | /api/game/user/:userId  | Mettre à jour les statistiques   | ✅     |

**Légende :**
- ✅ Implémenté et testé
- 🔄 Partiellement implémenté  
**Notes techniques :**
- Authentification JWT avec tokens Bearer
- Validation des données (email regex, password bcrypt)
- CRUD complet pour utilisateur connecté seulement
- Base de données SQLite avec relations users ↔ guides ↔ captures
- Documentation API complète sur `/api-docs` (Swagger)

**Sécurité :**
- Un utilisateur ne peut voir/modifier que ses propres données
- Tokens JWT avec expiration (24h par défaut)  
- Passwords hashés avec bcrypt (12 rounds)
- Validation stricte des entrées (email regex, longueur password)
- Headers CORS configurés pour localhost uniquement

**Performance :**
- SQLite embarquée : pas de serveur DB externe requis
- Vite HMR : rechargement instantané en développement
- JWT stateless : pas de sessions serveur à gérer
- Tailwind purge : CSS optimisé en production

---

Projet sous licence MIT — voir [`LICENSE`](LICENSE) pour plus de détails.


<div align="center">
  <h3>🎯 Relevez le défi ultime ! 🎯</h3>
  <p><i>Suivez votre progression vers les 151 Pokémon avec Professor Oak Challenge</i></p>
  
  <a href="http://localhost:5173">🚀 Commencer le suivi</a>
</div>

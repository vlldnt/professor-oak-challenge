# 🎯 Professor Oak Challenge

> *Suivez votre progression et relevez l'ultime défi Pokémon !*

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?style=for-the-badge&logo=sqlite)](https://sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🎮 Qu'est-ce que le Professor Oak Challenge ?

Le **Professor Oak Challenge** consiste à compléter un Pokédex à 100 % dès que possible, en attrapant et en faisant évoluer tous les Pokémon disponibles avant de battre le premier champion d'arène. Cela demande une connaissance approfondie du jeu et beaucoup de patience. C'est un défi de complétion extrême pour les fans hardcore.

Cette application web vous permet de **suivre votre progression** dans ce défi légendaire avec un tableau de bord personnalisé, des statistiques détaillées et un historique complet de votre aventure.

## 🛠️ Technologies utilisées
- React 18
- Vite
- Tailwind CSS
- i18next
- Node.js 22
- Express.js 4
- SQLite 3
- JWT
- bcrypt

---

## 📚 Documentation des routes principales

### 👤 users — gestion des comptes
| Méthode | URL           | Description                  |
|---------|---------------|------------------------------|
| POST    | /users        | Créer un compte              |
| GET     | /users/:id    | Récupérer un utilisateur     |
| PUT     | /users/:id    | Mettre à jour un utilisateur |
| DELETE  | /users/:id    | Supprimer un utilisateur     |

- Création d'un user : email (regex email), username (string, 20 max), mdp (1 MAJ, 1 chiffre, min 8, bcrypt)
- CRUD complet pour l'utilisateur connecté (un user ne peut voir que ses infos)

### 🗺️ user_guides — guides suivis par l’utilisateur
| Méthode | URL                        | Description                      |
|---------|----------------------------|----------------------------------|
| POST    | /users/:userId/guides      | Créer un guide pour un utilisateur|
| GET     | /users/:userId/guides      | Lister les guides d’un utilisateur|
| GET     | /guides/:guideId           | Récupérer un guide spécifique     |
| DELETE  | /guides/:guideId           | Supprimer un guide               |

- Un utilisateur peut créer, réinitialiser ou supprimer ses guides.
- La base de données gère la relation entre user et guides.

### 🐱‍👤 captures — pokémons capturés dans un guide
| Méthode | URL                          | Description                      |
|---------|------------------------------|----------------------------------|
| POST    | /guides/:guideId/captures    | Ajouter une capture              |
| GET     | /guides/:guideId/captures    | Voir toutes les captures d’un guide|
| GET     | /captures/:captureId         | Récupérer une capture spécifique |
| DELETE  | /captures/:captureId         | Supprimer une capture            |

- Un guide peut contenir plusieurs pokémons capturés.
- Un pokémon collecté peut être supprimé (erreur, correction, etc).
- Les 3 tables sont liées à l'utilisateur connecté (user A, B, C...)

---

Projet sous licence MIT — voir [`LICENSE`](LICENSE) pour plus de détails.


<div align="center">
  <h3>🎯 Relevez le défi ultime ! 🎯</h3>
  <p><i>Suivez votre progression vers les 151 Pokémon avec Professor Oak Challenge</i></p>
  
  <a href="http://localhost:5173">🚀 Commencer le suivi</a>
</div>

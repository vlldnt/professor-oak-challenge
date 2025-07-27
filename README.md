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

### Frontend
- **React 18** - Bibliothèque UI moderne avec hooks
- **Vite** - Build tool ultra-rapide pour le développement
- **Tailwind CSS** - Framework CSS utility-first
- **i18next** - Gestion de l'internationalisation

### Backend
- **Node.js 22** - Runtime JavaScript côté serveur
- **Express.js 4** - Framework web minimaliste et flexible
- **SQLite 3** - Base de données embarquée légère
- **JWT** - Authentification par tokens JSON
- **bcrypt** - Hachage sécurisé des mots de passe

## 🔐 Authentification

### Fonctionnalités de compte
- **Inscription** sécurisée avec validation des données
- **Connexion** protégée par JWT et bcrypt
- **Persistance de session** avec localStorage
- **Déconnexion** avec nettoyage automatique des données
- **Protection des données** utilisateur

## 📊 Suivi de progression

### Tableau de bord personnalisé
- **Pokémon capturés** - Compteur en temps réel avec objectif 151
- **Badges obtenus** - Progression à travers les arènes (0/8)
- **Combats gagnés** - Historique des victoires
- **Heures jouées** - Temps total consacré au défi

### Historique d'activité
- **Journal des captures** avec horodatage
- **Évolutions réalisées** et niveaux atteints
- **Étapes importantes** du défi franchies
- **Statistiques détaillées** par période

### Fonctionnalités de suivi
- **Mise à jour manuelle** des données de progression
- **Sauvegarde automatique** dans la base de données
- **Synchronisation** entre sessions
- **Export des données** pour backup

## 🌐 Interface utilisateur

### Design moderne et responsive
- **Mobile First** - Optimisé pour smartphones et tablettes
- **Navigation intuitive** avec menu hamburger mobile
- **Thème cohérent** avec couleurs Pokémon (rouge, bleu, jaune)
- **Animations fluides** et transitions élégantes
- **Messages de feedback** pour chaque action utilisateur

### États de l'interface
- **Chargement** avec spinners et indicateurs visuels
- **Succès** avec notifications vertes et icônes
- **Erreurs** avec messages clairs et solutions
- **Données vides** avec invitations à l'action

## 🌍 Internationalisation

### Support multilingue
- **🇫🇷 Français** (langue par défaut)
- **🇬🇧 Anglais** (traduction complète)

### Fonctionnalités i18n
- **Changement dynamique** via boutons FR/EN dans le header
- **Détection automatique** de la langue du navigateur
- **Persistance** de la préférence utilisateur
- **Traductions complètes** de l'interface et des messages

### Éléments traduits
- Navigation et menus
- Formulaires et labels
- Messages d'erreur et de succès
- Statistiques et données de jeu
- Documentation utilisateur

---

## 🚀 Démarrage rapide

### 1. Serveur backend (Terminal 1)
```bash
cd backend
npm run dev
```

### 2. Interface frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

### 3. Accès à l'application
- **Interface** : [http://localhost:5173](http://localhost:5173)
- **API** : [http://localhost:3001](http://localhost:3001)

---

## 📄 Licence

Projet sous licence **MIT** - voir [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">
  <h3>🎯 Relevez le défi ultime ! 🎯</h3>
  <p><i>Suivez votre progression vers les 151 Pokémon avec Professor Oak Challenge</i></p>
  
  <a href="http://localhost:5173">🚀 Commencer le suivi</a>
</div>

# ⚛️ Frontend - Professor Oak Challenge UI

> Interface utilisateur React moderne avec Tailwind CSS et internationalisation

## 📋 Structure du projet

```
frontend/
├── 📁 public/              # Assets statiques
│   └── vite.svg                # Favicon Vite
├── 📁 src/
│   ├── 📁 components/       # Composants réutilisables
│   │   ├── Header.jsx           # Navigation + langue
│   │   └── Footer.jsx           # Pied de page
│   ├── 📁 pages/            # Pages de l'application
│   │   ├── Home.jsx             # Page d'accueil
│   │   ├── About.jsx            # À propos
│   │   ├── Features.jsx         # Fonctionnalités
│   │   ├── Contact.jsx          # Contact
│   │   ├── Login.jsx            # Connexion
│   │   └── Dashboard.jsx        # Tableau de bord
│   ├── 📁 services/         # Services API
│   │   └── apiService.js        # Communication backend
│   ├── 📁 assets/           # Images et médias
│   │   └── react.svg            # Logo React
│   ├── 📄 App.jsx           # Composant principal
│   ├── 📄 main.jsx          # Point d'entrée React
│   ├── 📄 index.css         # Styles globaux
│   ├── 📄 App.css           # Styles App
│   └── 📄 i18n.js           # Configuration i18next
├── 📄 index.html            # Template HTML
├── 📄 package.json          # Dépendances npm
├── 📄 vite.config.js        # Configuration Vite
├── 📄 tailwind.config.js    # Configuration Tailwind
├── 📄 postcss.config.js     # Configuration PostCSS
└── 📄 eslint.config.js      # Configuration ESLint
```

## 🚀 Démarrage rapide

### Installation des dépendances
```bash
cd frontend
npm install
```

### Démarrage du serveur de développement
```bash
npm run dev
```

### Build de production
```bash
npm run build
```

### Prévisualisation du build
```bash
npm run preview
```

## 🎨 Design System

### 🎨 Couleurs principales
- **Primary Blue** : `from-blue-500 to-blue-600`
- **Primary Purple** : `from-purple-500 to-purple-600`
- **Success Green** : `from-green-500 to-green-600`
- **Error Red** : `from-red-500 to-red-600`
- **Gradients** : `from-blue-500 via-purple-600 to-teal-500`

### 📱 Breakpoints Tailwind
- **sm** : 640px (tablettes)
- **md** : 768px (petits laptops)
- **lg** : 1024px (laptops)
- **xl** : 1280px (desktops)

### 🧩 Composants principaux

#### Header.jsx
- Navigation responsive avec menu hamburger
- Commutateur de langue FR/EN
- Affichage du profil utilisateur connecté
- Bouton de déconnexion

#### Dashboard.jsx
- Affichage des informations utilisateur
- Cartes de statistiques animées
- Bouton de capture Pokémon interactif
- Gestion des états de chargement

#### Login.jsx
- Formulaire de connexion avec validation
- Messages de succès/erreur
- Redirection automatique après connexion
- États de chargement avec spinner

## 🌐 Internationalisation (i18next)

### Langues supportées
- 🇫🇷 **Français** (par défaut)
- 🇬🇧 **Anglais**

### Configuration i18n.js
```javascript
const resources = {
  en: { translation: { /* traductions anglaises */ } },
  fr: { translation: { /* traductions françaises */ } }
}
```

### Utilisation dans les composants
```jsx
import { useTranslation } from 'react-i18next'

function MonComposant() {
  const { t, i18n } = useTranslation()
  
  return (
    <h1>{t('welcomeTitle')}</h1>
    <button onClick={() => i18n.changeLanguage('en')}>
      English
    </button>
  )
}
```

## 📡 Service API (apiService.js)

### Méthodes d'authentification
- `login(credentials)` - Connexion utilisateur
- `register(userData)` - Inscription utilisateur
- `verify()` - Vérification token
- `logout()` - Déconnexion

### Méthodes de jeu
- `getUserStats()` - Récupération statistiques
- `catchPokemon(pokemonName)` - Capture Pokémon
- `getCaughtPokemon()` - Liste Pokémon capturés

### Gestion des tokens
- `setToken(token)` - Sauvegarde localStorage
- `getToken()` - Récupération token
- `removeToken()` - Suppression token
- `isAuthenticated()` - Vérification authentification

## 🎭 États de l'interface

### États de chargement
- Spinners animés avec Tailwind
- Messages "Chargement..." contextuels
- Désactivation des boutons pendant les requêtes

### États de succès
- Messages verts avec icônes
- Animations de confirmation
- Auto-disparition après 3 secondes

### États d'erreur
- Messages rouges avec détails
- Possibilité de retry
- Gestion des erreurs réseau

### États vides
- Messages informatifs
- Suggestions d'actions
- Redirections appropriées

## 📱 Responsive Design

### Mobile First
- Design optimisé pour mobile d'abord
- Menu hamburger sur petits écrans
- Cards empilées verticalement
- Touch-friendly buttons

### Tablettes et Desktop
- Navigation horizontale
- Layout en grille
- Utilisation de l'espace disponible
- Hover effects

## 🛠️ Scripts disponibles

```json
{
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview"
}
```

## 📦 Dépendances principales

### Production
- **react** - Bibliothèque UI
- **react-dom** - Rendu DOM React
- **react-i18next** - Internationalisation
- **i18next** - Core i18n
- **i18next-browser-languagedetector** - Détection langue navigateur

### Développement
- **@vitejs/plugin-react** - Plugin Vite pour React
- **vite** - Build tool moderne
- **eslint** - Linting JavaScript
- **tailwindcss** - Framework CSS
- **autoprefixer** - Auto-préfixes CSS
- **postcss** - Transformation CSS

## 🎯 Fonctionnalités avancées

### Persistance de session
- Sauvegarde automatique localStorage
- Restauration de session au reload
- Nettoyage à la déconnexion

### Gestion des erreurs
- Try-catch sur toutes les requêtes API
- Messages d'erreur utilisateur-friendly
- Logs en console pour le debug

### Optimisations performance
- Lazy loading des composants
- Optimisation des re-renders
- Cache des requêtes API

### Accessibilité
- Semantic HTML5
- ARIA labels appropriés
- Contrast ratios conformes
- Navigation clavier+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

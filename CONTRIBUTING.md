# 🤝 Contribuer au Professor Oak Challenge

Merci de votre intérêt pour contribuer au **Professor Oak Challenge** ! Ce guide vous aidera à démarrer.

## 📋 Table des matières

- [🌟 Types de contributions](#-types-de-contributions)
- [🚀 Démarrage rapide](#-démarrage-rapide)
- [📝 Processus de contribution](#-processus-de-contribution)
- [🔧 Standards de développement](#-standards-de-développement)
- [🐛 Signalement de bugs](#-signalement-de-bugs)
- [💡 Suggestions de fonctionnalités](#-suggestions-de-fonctionnalités)
- [📚 Documentation](#-documentation)

## 🌟 Types de contributions

Nous accueillons tous types de contributions :

### 🐛 Correction de bugs
- Résolution de problèmes existants
- Amélioration de la stabilité
- Optimisation des performances

### ✨ Nouvelles fonctionnalités
- Ajout de nouvelles pages/composants
- Amélioration de l'expérience utilisateur
- Intégration de nouvelles API

### 📚 Documentation
- Amélioration du README
- Ajout d'exemples de code
- Traduction en d'autres langues

### 🎨 Design et UI/UX
- Amélioration du design
- Optimisation responsive
- Accessibilité

## 🚀 Démarrage rapide

### 1. Fork du repository
```bash
# Forker le repo sur GitHub, puis cloner votre fork
git clone https://github.com/VOTRE_USERNAME/professor-oak-challenge.git
cd professor-oak-challenge
```

### 2. Configuration de l'environnement
```bash
# Installation des dépendances backend
cd backend
npm install

# Installation des dépendances frontend
cd ../frontend
npm install
```

### 3. Configuration des variables d'environnement
```bash
# Copier le fichier .env d'exemple
cp backend/.env.example backend/.env
# Modifier les valeurs selon vos besoins
```

### 4. Démarrage en mode développement
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 📝 Processus de contribution

### 1. Créer une branche
```bash
# Créer une branche pour votre fonctionnalité
git checkout -b feature/ma-nouvelle-fonctionnalite

# Ou pour un bug fix
git checkout -b fix/correction-bug-xyz
```

### 2. Développer votre contribution
- Écrivez du code propre et commenté
- Suivez les conventions de nommage
- Testez votre code sur plusieurs navigateurs
- Assurez-vous que les fonctionnalités existantes fonctionnent

### 3. Tester vos modifications
```bash
# Frontend - Vérifier le linting
cd frontend
npm run lint

# Backend - Tester les endpoints (si tests disponibles)
cd backend
npm test
```

### 4. Commiter vos changements
```bash
# Utiliser des messages de commit clairs
git add .
git commit -m "feat: ajout système de capture Pokémon avancé"

# Ou pour un bug fix
git commit -m "fix: correction affichage statistiques sur mobile"
```

### 5. Pousser et créer une Pull Request
```bash
# Pousser votre branche
git push origin feature/ma-nouvelle-fonctionnalite

# Créer une Pull Request sur GitHub
```

## 🔧 Standards de développement

### 📝 Conventions de nommage

#### Branches
- `feature/description-courte` - Nouvelles fonctionnalités
- `fix/description-probleme` - Corrections de bugs
- `docs/amelioration-doc` - Améliorations documentation
- `refactor/composant-xyz` - Refactoring de code

#### Commits
Utilisez le format conventionnel :
- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Changements documentation
- `style:` - Formatage, point-virgules manquants, etc.
- `refactor:` - Refactoring sans changement de fonctionnalité
- `test:` - Ajout ou modification de tests
- `chore:` - Maintenance, dépendances, etc.

#### Code JavaScript/React
```javascript
// Noms de composants en PascalCase
function UserDashboard() {}

// Noms de variables/fonctions en camelCase
const userName = 'ash_ketchum'
const handleUserLogin = () => {}

// Constantes en UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:3001'
```

### 🎨 Standards CSS/Tailwind
- Utiliser Tailwind CSS autant que possible
- Classes personnalisées dans `index.css` si nécessaire
- Mobile-first approach
- Utiliser les variables CSS pour les couleurs

### 📱 Responsive Design
- Tester sur au moins 3 tailles d'écran
- Mobile (320px-640px)
- Tablette (640px-1024px)
- Desktop (1024px+)

### ♿ Accessibilité
- Utiliser des éléments sémantiques HTML5
- Ajouter des attributs ARIA appropriés
- Contraste minimum WCAG AA
- Navigation clavier fonctionnelle

## 🐛 Signalement de bugs

### Avant de signaler un bug
1. **Vérifiez** que le bug n'a pas déjà été signalé
2. **Testez** sur la dernière version
3. **Reproduced** le problème de manière consistante

### Format de rapport de bug
```markdown
## 🐛 Description du bug
Description claire et concise du problème.

## 🔄 Étapes de reproduction
1. Aller à '...'
2. Cliquer sur '...'
3. Faire défiler jusqu'à '...'
4. Voir l'erreur

## ✅ Comportement attendu
Description de ce qui devrait se passer.

## 📱 Environnement
- OS: [ex. Windows 11, macOS 12, Ubuntu 20.04]
- Navigateur: [ex. Chrome 96, Firefox 94, Safari 15]
- Version: [ex. v1.2.3]
- Appareil: [ex. iPhone 13, Desktop]

## 📸 Captures d'écran
Si applicable, ajoutez des captures d'écran.

## 📋 Informations supplémentaires
Tout autre contexte ou information utile.
```

## 💡 Suggestions de fonctionnalités

### Format de suggestion
```markdown
## ✨ Résumé de la fonctionnalité
Description courte de la fonctionnalité souhaitée.

## 🎯 Problème à résoudre
Quel problème cette fonctionnalité résoudrait-elle ?

## 💡 Solution proposée
Description détaillée de la solution souhaitée.

## 🔄 Alternatives considérées
Autres solutions que vous avez envisagées.

## 📋 Critères d'acceptation
- [ ] Critère 1
- [ ] Critère 2
- [ ] Critère 3

## 🎨 Maquettes/Wireframes
Si applicable, ajoutez des maquettes ou wireframes.
```

## 📚 Documentation

### Amélioration de la documentation
- README principal et sous-projets
- Commentaires dans le code
- Documentation API
- Guides d'utilisation

### Traductions
Nous accueillons les traductions en d'autres langues :
- Modifier `frontend/src/i18n.js`
- Ajouter les traductions dans l'objet `resources`
- Tester l'affichage sur différentes longueurs de texte

## 🎖️ Reconnaissance des contributeurs

Tous les contributeurs sont reconnus :
- Nom dans les commits Git
- Mention dans les release notes
- Badge "Contributor" sur GitHub

## 📞 Contact

- **GitHub Issues** : Pour les bugs et suggestions
- **Discussions** : Pour les questions générales
- **Email** : [votre-email@example.com] pour les questions privées

## 📄 Code de conduite

Ce projet suit le [Code de Conduite des Contributeurs](CODE_OF_CONDUCT.md). En participant, vous acceptez de respecter ce code.

---

### 🙏 Merci de contribuer !

Chaque contribution, petite ou grande, nous aide à améliorer le **Professor Oak Challenge** pour tous les dresseurs Pokémon ! 🎯⚡

<div align="center">
  <h3>🎮 Ensemble, attrapons-les tous ! 🎮</h3>
</div>

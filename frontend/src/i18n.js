import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      about: "About",
      features: "Features",
      contact: "Contact",
      dashboard: "Dashboard",
      signIn: "Sign In",
      
      // Home page
      welcomeTitle: "Welcome to the",
      professorOakChallenge: "Professor Oak Challenge",
      heroDescription: "Embark on the ultimate challenge to become a true Pokémon master. Discover, collect, and evolve every available Pokémon before each badge — no shortcuts, just pure mastery!",
      startJourney: "Start Your Journey",
      learnMore: "Learn More",
      
      // Features
      collectPokemon: "Detailed Red & Blue Guide",
      collectDescription: "Complete step-by-step guide for Pokémon Red and Blue versions with detailed strategies and locations.",
      trainBattle: "Track Your Progress",
      trainDescription: "Keep track of your advancement through the Professor Oak Challenge with detailed statistics and milestones.",
      becomeChampion: "Catch Every Available Pokémon",
      championDescription: "Capture and evolve every Pokémon available before each gym badge to complete the ultimate challenge.",
      
      // Stats
      yourProgress: "Your Progress",
      pokemonCaught: "Pokémon Caught",
      badgesEarned: "Badges Earned",
      battlesWon: "Battles Won",
      hoursPlayed: "Hours Played",
      
      // Login page
      welcomeBack: "Welcome Back, Trainer!",
      signInDescription: "Sign in to continue your Pokémon journey",
      emailAddress: "Email Address",
      password: "Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      orContinueWith: "Or continue with",
      noAccount: "Don't have an account?",
      startJourneyHere: "Start your journey here",
      
      // Footer
      footerDescription: "Embark on the ultimate Pokémon adventure and become a master trainer.",
      quickLinks: "Quick Links",
      gameFeatures: "Game Features",
      connect: "Connect",
      pokedex: "Pokédex",
      battleSystem: "Battle System",
      gymLeaders: "Gym Leaders",
      eliteFour: "Elite Four",
      discord: "Discord",
      twitter: "Twitter",
      github: "GitHub",
      reddit: "Reddit",
      copyright: "Gotta catch 'em all!",

      // Features page translations
      featuresTitle: "Game Features",
      featuresSubtitle: "Discover all the amazing features that make your Pokémon journey unforgettable",
      
      // Core Features
      coreFeatures: "Core Features",
      pokemonCollection: "Pokémon Collection",
      pokemonCollectionDesc: "Catch and collect all 151 original Pokémon from the Kanto region. Each Pokémon has unique stats, abilities, and evolution paths.",
      
      battleSystem: "Advanced Battle System",
      battleSystemDesc: "Engage in strategic turn-based battles with type advantages, status effects, and special moves. Master the art of Pokémon combat.",
      
      gymChallenges: "Gym Challenges",
      gymChallengesDesc: "Face off against 8 powerful Gym Leaders, each specializing in different Pokémon types. Earn badges to prove your worth.",
      
      // Advanced Features
      advancedFeatures: "Advanced Features",
      pokemonTraining: "Pokémon Training",
      pokemonTrainingDesc: "Level up your Pokémon through battles and experience. Evolve them into more powerful forms and unlock new abilities.",
      
      itemManagement: "Item Management",
      itemManagementDesc: "Collect and use various items like Poké Balls, Potions, and TMs to enhance your journey and strengthen your team.",
      
      worldExploration: "World Exploration",
      worldExplorationDesc: "Explore the vast Kanto region with cities, routes, caves, and legendary locations. Each area holds secrets and wild Pokémon.",
      
      // Stats
      totalPokemon: "Total Pokémon",
      gymBadges: "Gym Badges",
      battleMoves: "Battle Moves",
      explorationAreas: "Exploration Areas"
    }
  },
  fr: {
    translation: {
      // Navigation
      home: "Accueil",
      about: "À propos",
      features: "Fonctionnalités",
      contact: "Contact",
      dashboard: "Tableau de Bord",
      signIn: "Connexion",
      
      // Home page
      welcomeTitle: "Bienvenue dans le",
      professorOakChallenge: "Professor Oak Challenge",
      heroDescription: "Embarquez dans le défi ultime pour devenir un vrai maître Pokémon. Découvrez, capturez et faites évoluer tous les Pokémon disponibles avant chaque badge — aucun raccourci, que de la pure maîtrise !",
      startJourney: "Commencer l'Aventure",
      learnMore: "En Savoir Plus",
      
      // Features
      collectPokemon: "Guide Détaillé Rouge & Bleu",
      collectDescription: "Guide complet étape par étape pour les versions Pokémon Rouge et Bleu avec stratégies détaillées et emplacements.",
      trainBattle: "Suivez Votre Progression",
      trainDescription: "Gardez un suivi de votre avancée dans le Professor Oak Challenge avec des statistiques détaillées et des jalons.",
      becomeChampion: "Capturez Tous les Pokémon Disponibles",
      championDescription: "Capturez et faites évoluer tous les Pokémon disponibles avant chaque badge d'arène pour compléter le défi ultime.",
      
      // Stats
      yourProgress: "Votre Progression",
      pokemonCaught: "Pokémon Capturés",
      badgesEarned: "Badges Obtenus",
      battlesWon: "Combats Gagnés",
      hoursPlayed: "Heures Jouées",
      
      // Login page
      welcomeBack: "Bon Retour, Dresseur !",
      signInDescription: "Connectez-vous pour continuer votre aventure Pokémon",
      emailAddress: "Adresse Email",
      password: "Mot de Passe",
      rememberMe: "Se souvenir de moi",
      forgotPassword: "Mot de passe oublié ?",
      orContinueWith: "Ou continuer avec",
      noAccount: "Pas de compte ?",
      startJourneyHere: "Commencez votre aventure ici",
      
      // Footer
      footerDescription: "Embarquez dans l'ultime aventure Pokémon et devenez un maître dresseur.",
      quickLinks: "Liens Rapides",
      gameFeatures: "Fonctionnalités du Jeu",
      connect: "Se Connecter",
      pokedex: "Pokédex",
      battleSystem: "Système de Combat",
      gymLeaders: "Champions d'Arène",
      eliteFour: "Conseil des 4",
      discord: "Discord",
      twitter: "Twitter",
      github: "GitHub",
      reddit: "Reddit",
      copyright: "Attrapez-les tous !",

      // Features page translations
      featuresTitle: "Fonctionnalités du Jeu",
      featuresSubtitle: "Découvrez toutes les fonctionnalités incroyables qui rendent votre aventure Pokémon inoubliable",
      
      // Core Features
      coreFeatures: "Fonctionnalités Principales",
      pokemonCollection: "Collection de Pokémon",
      pokemonCollectionDesc: "Capturez et collectionnez les 151 Pokémon originaux de la région de Kanto. Chaque Pokémon a des stats, capacités et évolutions uniques.",
      
      battleSystem: "Système de Combat Avancé",
      battleSystemDesc: "Participez à des combats stratégiques au tour par tour avec des avantages de type, effets de statut et attaques spéciales.",
      
      gymChallenges: "Défis d'Arène",
      gymChallengesDesc: "Affrontez 8 puissants Champions d'Arène, chacun spécialisé dans différents types de Pokémon. Gagnez des badges pour prouver votre valeur.",
      
      // Advanced Features
      advancedFeatures: "Fonctionnalités Avancées",
      pokemonTraining: "Entraînement Pokémon",
      pokemonTrainingDesc: "Montez en niveau vos Pokémon à travers les combats et l'expérience. Faites-les évoluer vers des formes plus puissantes.",
      
      itemManagement: "Gestion d'Objets",
      itemManagementDesc: "Collectionnez et utilisez divers objets comme les Poké Balls, Potions et CTs pour améliorer votre aventure.",
      
      worldExploration: "Exploration du Monde",
      worldExplorationDesc: "Explorez la vaste région de Kanto avec ses villes, routes, grottes et lieux légendaires. Chaque zone recèle des secrets.",
      
      // Stats
      totalPokemon: "Total Pokémon",
      gymBadges: "Badges d'Arène",
      battleMoves: "Attaques de Combat",
      explorationAreas: "Zones d'Exploration"
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n

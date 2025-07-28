import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      guides: "Guides",
      contact: "Contact",
      dashboard: "Dashboard",
      signIn: "Sign In",
      
      // Home page
      welcomeTitle: "Welcome to the",
      professorOakChallenge: "Professor Oak Challenge",
      heroDescription: "Embark on the ultimate challenge to become a true Pokémon master. Discover, collect, and evolve every available Pokémon before each badge — no shortcuts, just pure mastery!",
      startJourney: "Start Your Journey",
      learnMore: "Learn More",
      
      // Home page guides overview
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
      
      // Guides page
      guidesTitle: "Game Guides",
      guidesSubtitle: "Complete guides for your Pokémon adventure through Generation 1 games",
      generation1: "Generation 1 Guides",
      pokemonRed: "Pokémon Red",
      pokemonBlue: "Pokémon Blue", 
      pokemonYellow: "Pokémon Yellow",
      // Red/Blue Guide Specific
      pokedexTitle: "Pokédex (001-151)",
      part1Title: "Part 1 - Pre Badge #1 from Brock",
      oakChallengeGuide: "Professor Oak Challenge Guide",
      introText: "This first part will cover everything you can do BEFORE you get that first badge from Brock. This is probably the most daunting part of the challenge…",
      levellingTips: "Levelling Tips",
      timeInvestmentTitle: "Time Investment:",
      timeInvestment: "This will be the longest part of your challenge and is made even more painful without any way to rematch trainers or run/cycle.",
      strategyTitle: "Strategy:",
      strategy: "The real killers are getting that fully evolved starter and Pidgeot. Continuously battle using the same pokemon until it runs out of PP or is KO'd.",
      proTipTitle: "Pro Tip:",
      proTip: "DON'T evolve Pidgey until it learns Wing Attack at Lv28 otherwise Pidgeotto won't learn it until Lv31 and will level very slowly due to limited PP.",
      extraExpTitle: "Extra Experience:",
      extraExp: "Defeat the trainers in Brock's gym for extra experience, just don't talk to Brock until you've completed this section!",
      palletTownTitle: "Pallet Town - Starter Choices",
      palletTownText: "Choose your starter wisely! Each has pros and cons: Bulbasaur evolves fastest but is harder to train early, while Charmander and Squirtle take longer to fully evolve. Don’t evolve your starter before getting the Pokédex, or it may not register. You have until Brock to fully evolve your choice.",
      importantTitle: "Important:",
      importantText: "There is a glitch in these games where your starter won't register if you evolve it prior to getting the pokedex. Go to Viridian City, grab the parcel from the Pokemart, deliver it to Professor Oak and grab that important pokedex and some pokeballs first!",
      route1Title: "Route 1",
      route1Text: "Only two pokemon to catch and evolve here. You can of course opt to hold out a little longer to get them at slightly higher levels but it's negligible extra work that a couple of Metapod/Kakuna can't fix.",
      route22Title: "Route 22",
      route22Text: "Pass through Viridian City and go West to Route 22 where you can catch the following Pokémon. The rarity of the Nidoran varies between versions with the male being more common in Red version but the female more commonly found in Blue version.",
      tipTitle: "Tip:",
      tipText: "Catch another Spearow for a trade later on. You can battle your rival here for extra experience. Nidorina and Nidorino can't evolve any further just yet.",
      viridianForestTitle: "Viridian Forest",
      viridianForestText: "Back into Viridian City, head north this time and skip over Route 2 to Viridian Forest. Depending on your version, one of these bugs will be rarer than the others. Red will find Weedle more frequently while Blue has Caterpie as the common bug.",
      strategyBugTitle: "Strategy:",
      strategyBugText: "You can catch Metapod and Kakuna but as they won't have any attacking moves, the better strategy is to level Caterpie/Weedle up to level 9, evolve them and then train the cocoons one more level.",
      endPart1: "End of Part 1",
      caught: "Caught:",
      remaining: "Remaining:",
      // About section (integrated in Home)
      aboutTitle: "About the",
      challenge: "Challenge",
      aboutDescription: "The Professor Oak Challenge is an epic quest inspired by the legendary Pokémon professor himself.",
      ourMission: "Our Mission",
      missionDescription1: "We believe that every trainer deserves the chance to become a Pokémon master. Our platform provides the tools, knowledge, and community needed to excel in your journey.",
      missionDescription2: "From catching your first Pokémon to facing the Elite Four, we're here to guide you through every step of your adventure in the Kanto region.",
      completePokedex: "Complete Pokédex tracking",
      battleGuides: "Battle strategy guides",
      communityForums: "Community forums",
      progressTracking: "Progress tracking tools",
      ourGoal: "Our Goal",
      goalDescription: "Help 10,000+ trainers become Pokémon masters by providing the ultimate training platform and community support."
    }
  },
  fr: {
    translation: {
      // Navigation
      home: "Accueil",
      guides: "Guides",
      contact: "Contact",
      dashboard: "Tableau de Bord",
      signIn: "Connexion",
      
      // Home page
      welcomeTitle: "Bienvenue dans le",
      professorOakChallenge: "Professor Oak Challenge",
      heroDescription: "Embarquez dans le défi ultime pour devenir un vrai maître Pokémon. Découvrez, capturez et faites évoluer tous les Pokémon disponibles avant chaque badge — aucun raccourci, que de la pure maîtrise !",
      startJourney: "Commencer l'Aventure",
      learnMore: "En Savoir Plus",
      
      // Home page guides overview
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
      
      // Guides page
      guidesTitle: "Guides de Jeu",
      guidesSubtitle: "Guides complets pour votre aventure Pokémon à travers les jeux de Génération 1",
      generation1: "Guides Génération 1",
      pokemonRed: "Pokémon Rouge",
      pokemonBlue: "Pokémon Bleu",
      pokemonYellow: "Pokémon Jaune",
      // Red/Blue Guide Specific
      pokedexTitle: "Pokédex (001-151)",
      part1Title: "Partie 1 - Avant le 1er badge de Pierre",
      oakChallengeGuide: "Guide du Professor Oak Challenge",
      introText: "Cette première partie couvre tout ce que vous pouvez faire AVANT d'obtenir le premier badge de Pierre. C'est probablement la partie la plus longue du challenge…",
      levellingTips: "Conseils de leveling",
      timeInvestmentTitle: "Temps à investir :",
      timeInvestment: "Ce sera la partie la plus longue de votre challenge, d'autant plus pénible qu'il n'est pas possible de réaffronter les dresseurs ou de courir/pédaler.",
      strategyTitle: "Stratégie :",
      strategy: "Le vrai challenge est d'obtenir votre starter et un Roucarnage au max. Enchaînez les combats avec le même Pokémon jusqu'à ce qu'il n'ait plus de PP ou soit KO.",
      proTipTitle: "Astuce :",
      proTip: "N'évoluez PAS Roucool avant qu'il apprenne Cru-Aile au niveau 28 sinon Roucoups ne l'apprendra qu'au niveau 31 et progressera très lentement à cause du manque de PP.",
      extraExpTitle: "Expérience bonus :",
      extraExp: "Battez les dresseurs de l'arène de Pierre pour de l'expérience supplémentaire, mais ne parlez pas à Pierre avant d'avoir tout fini !",
      palletTownTitle: "Bourg Palette - Starters",
      palletTownText: "Choisissez bien votre starter ! Chacun a ses avantages : Bulbizarre évolue plus vite mais est difficile à entraîner au début, Salamèche et Carapuce prennent plus de temps à évoluer. N’évoluez pas votre starter avant d’avoir le Pokédex, sinon il risque de ne pas être enregistré. Vous avez jusqu’à Pierre pour le faire évoluer au maximum.",
      importantTitle: "Important :",
      importantText: "Il y a un bug dans ces jeux : votre starter ne sera pas enregistré si vous le faites évoluer avant d'obtenir le Pokédex. Allez à Jadielle, prenez le colis au Pokémart, livrez-le au Professeur Chen et récupérez le Pokédex et quelques Pokéballs avant d'évoluer !",
      route1Title: "Route 1",
      route1Text: "Seulement deux Pokémon à capturer et faire évoluer ici. Vous pouvez attendre un peu pour les avoir à un niveau supérieur mais ça ne change pas grand-chose, quelques Chrysacier/Coconfort suffisent.",
      route22Title: "Route 22",
      route22Text: "Traversez Jadielle puis allez à l'ouest sur la Route 22 pour capturer les Pokémon suivants. La rareté des Nidoran varie selon la version : le mâle est plus courant sur Rouge, la femelle sur Bleu.",
      tipTitle: "Astuce :",
      tipText: "Capturez un autre Piafabec pour un échange plus tard. Vous pouvez affronter votre rival ici pour de l'expérience. Nidorina et Nidorino ne peuvent pas encore évoluer.",
      viridianForestTitle: "Forêt de Jade",
      viridianForestText: "Retournez à Jadielle, puis partez au nord (ignorez la Route 2) vers la Forêt de Jade. Selon la version, l'un des insectes sera plus rare. Sur Rouge, Aspicot est plus fréquent, sur Bleu c'est Chenipan.",
      strategyBugTitle: "Stratégie :",
      strategyBugText: "Vous pouvez capturer Chrysacier et Coconfort mais ils n'ont pas d'attaques. Le mieux est de monter Chenipan/Aspicot au niveau 9, les faire évoluer puis entraîner les cocons un niveau de plus.",
      endPart1: "Fin de la Partie 1",
      caught: "Capturés :",
      remaining: "Restants :",
      // About section (integrated in Home)
      aboutTitle: "À propos du",
      challenge: "Challenge",
      aboutDescription: "Le Professor Oak Challenge est une quête épique inspirée du légendaire professeur Pokémon lui-même.",
      ourMission: "Notre Mission",
      missionDescription1: "Nous croyons que chaque dresseur mérite la chance de devenir un maître Pokémon. Notre plateforme fournit les outils, connaissances et communauté nécessaires pour exceller dans votre aventure.",
      missionDescription2: "De la capture de votre premier Pokémon à l'affrontement du Conseil des 4, nous sommes là pour vous guider à chaque étape de votre aventure dans la région de Kanto.",
      completePokedex: "Suivi complet du Pokédex",
      battleGuides: "Guides de stratégie de combat",
      communityForums: "Forums communautaires",
      progressTracking: "Outils de suivi de progression",
      ourGoal: "Notre Objectif",
      goalDescription: "Aider plus de 10 000 dresseurs à devenir des maîtres Pokémon en fournissant la plateforme d'entraînement ultime et le soutien communautaire."
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

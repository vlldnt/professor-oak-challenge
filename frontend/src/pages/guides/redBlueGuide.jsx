import { useTranslation } from 'react-i18next'
import pokemonList from '../../assets/data/pokemonList.json'

function Gen1Guide({ setActiveTab }) {
  const { t, i18n } = useTranslation()

  // Helper function to get Pokemon data by ID
  const getPokemon = (id) => {
    return pokemonList.find(p => p.id === id.toString().padStart(3, '0'))
  }

  // Helper function to display Pokemon with image
  const PokemonCard = ({ id, evolution = null }) => {
    const pokemon = getPokemon(id)
    if (!pokemon) return null

    const imagePath = `/src/assets/images/pokemons/${pokemon.id}.png`
    const name = i18n.language === 'fr' ? pokemon.name_fr : pokemon.name_en

    return (
      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border">
        <img 
          src={imagePath} 
          alt={name}
          className="w-12 h-12 object-contain"
        />
        <div>
          <span className="text-sm font-medium text-gray-900">#{pokemon.id}</span>
          <p className="font-semibold text-gray-800">{name}</p>
          {evolution && (
            <p className="text-xs text-gray-600">{evolution}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
      {/* Back Button */}
      <div className="mb-6">
        <button 
          onClick={() => {
            console.log('Bouton retour cliqué', setActiveTab)
            if (setActiveTab) {
              setActiveTab('guides')
            } else {
              console.error('setActiveTab n\'est pas défini')
            }
          }}
          className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 px-4 py-2 rounded-lg transition-all border border-blue-300 hover:border-blue-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">{i18n.language === 'fr' ? 'Retour aux Guides' : 'Back to Guides'}</span>
        </button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {i18n.language === 'fr' ? 'Guide Génération 1' : 'Generation 1 Guide'}
          </h1>
          <button 
            onClick={() => setActiveTab && setActiveTab('guides')}
            className="hidden md:flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg transition-all text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{i18n.language === 'fr' ? 'Fermer' : 'Close'}</span>
          </button>
        </div>
        <p className="text-lg text-gray-600">
          {i18n.language === 'fr' 
            ? 'Guide complet du Professor Oak Challenge pour Pokémon Rouge/Bleu'
            : 'Complete Professor Oak Challenge guide for Pokémon Red/Blue'
          }
        </p>
      </div>

      {/* Part 1 */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {i18n.language === 'fr' 
            ? 'Partie 1 - Avant le 1er Badge de Pierre'
            : 'Part 1 - Pre Badge #1 from Brock'
          }
        </h2>
        
        <div className="mb-6 p-4 bg-amber-100 border-l-4 border-amber-500 rounded">
          <p className="text-amber-800 font-medium">
            {i18n.language === 'fr'
              ? 'Cette première partie couvre tout ce que vous pouvez faire AVANT d\'obtenir le premier badge de Pierre. C\'est probablement la partie la plus intimidante du défi...'
              : 'This first part will cover everything you can do BEFORE you get that first badge from Brock. This is probably the most daunting part of the challenge...'
            }
          </p>
        </div>
      </div>

      {/* Starter Choices */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {i18n.language === 'fr' ? 'Choix du Starter (Bourg Palette)' : 'Starter Choices (Pallet Town)'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <PokemonCard id={1} evolution="Lv.16 → Lv.32" />
          <PokemonCard id={4} evolution="Lv.16 → Lv.36" />
          <PokemonCard id={7} evolution="Lv.16 → Lv.36" />
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            {i18n.language === 'fr'
              ? '⚠️ Il y a un bug dans ces jeux où votre starter ne sera pas enregistré si vous l\'évoluez avant d\'obtenir le Pokédex. Allez d\'abord à Jadielle récupérer le colis et le Pokédex !'
              : '⚠️ There is a glitch where your starter won\'t register if you evolve it prior to getting the Pokédex. Go to Viridian City first to grab the parcel and Pokédex!'
            }
          </p>
        </div>
      </div>

      {/* Route 1 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Route 1</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <PokemonCard id={16} evolution="Lv.18 → Lv.36" />
          <PokemonCard id={19} evolution="Lv.20" />
        </div>
        <p className="text-sm text-gray-600">
          {i18n.language === 'fr'
            ? 'Seulement deux Pokémon à capturer et faire évoluer ici. Vous pouvez attendre un peu pour les avoir à des niveaux plus élevés mais ce n\'est pas nécessaire.'
            : 'Only two Pokémon to catch and evolve here. You can opt to hold out for higher levels but it\'s negligible extra work.'
          }
        </p>
      </div>

      {/* Route 22 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Route 22</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <PokemonCard id={29} evolution="Lv.16" />
          <PokemonCard id={32} evolution="Lv.16" />
          <PokemonCard id={21} evolution="Lv.20" />
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            {i18n.language === 'fr'
              ? '💡 La rareté des Nidoran varie selon la version : le mâle est plus commun dans Rouge, la femelle dans Bleue. Capturez un Piafabec supplémentaire pour un échange plus tard.'
              : '💡 Nidoran rarity varies between versions: male is more common in Red, female in Blue. Catch an extra Spearow for a trade later.'
            }
          </p>
        </div>
      </div>

      {/* Viridian Forest */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {i18n.language === 'fr' ? 'Forêt de Jade' : 'Viridian Forest'}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <PokemonCard id={10} evolution="Lv.7 → Lv.10" />
          <PokemonCard id={13} evolution="Lv.7 → Lv.10" />
          <PokemonCard id={25} evolution="Pierre Foudre" />
        </div>
        <div className="bg-green-50 p-4 rounded-lg space-y-2">
          <p className="text-sm text-gray-700">
            {i18n.language === 'fr'
              ? '🐛 Selon votre version, un de ces insectes sera plus rare. Rouge trouve Aspicot plus fréquemment, Bleue a Chenipan comme insecte commun.'
              : '🐛 Depending on your version, one bug will be rarer. Red finds Weedle more frequently, Blue has Caterpie as the common bug.'
            }
          </p>
          <p className="text-sm text-gray-700">
            {i18n.language === 'fr'
              ? '⚡ Vous ne pouvez pas obtenir de Pierre Foudre maintenant, donc Pikachu restera non-évolué pour l\'instant.'
              : '⚡ You can\'t get a Thunderstone yet so Pikachu will stay unevolved for now.'
            }
          </p>
        </div>
      </div>

      {/* Training Tips */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {i18n.language === 'fr' ? 'Conseils d\'Entraînement' : 'Levelling Tips'}
        </h3>
        <div className="bg-purple-50 p-6 rounded-lg space-y-3">
          <p className="text-sm text-gray-700">
            {i18n.language === 'fr'
              ? '⏰ Ce sera la partie la plus longue de votre défi, rendue encore plus pénible sans possibilité de refaire les combats de dresseurs ou de courir/faire du vélo.'
              : '⏰ This will be the longest part of your challenge, made even more painful without any way to rematch trainers or run/cycle.'
            }
          </p>
          <p className="text-sm text-gray-700">
            {i18n.language === 'fr'
              ? '💡 Les vrais défis sont d\'obtenir votre starter complètement évolué et Roucarnage. Battez continuellement avec le même Pokémon jusqu\'à épuisement des PP ou KO.'
              : '💡 The real killers are getting that fully evolved starter and Pidgeot. Battle continuously using the same Pokémon until it runs out of PP or is KO\'d.'
            }
          </p>
          <p className="text-sm text-gray-700">
            {i18n.language === 'fr'
              ? '🎯 Conseil : N\'évoluez PAS Roucool tant qu\'il n\'a pas appris Cru-Aile au niveau 28, sinon Roucoups ne l\'apprendra qu\'au niveau 31.'
              : '🎯 Tip: DON\'T evolve Pidgey until it learns Wing Attack at Lv28, otherwise Pidgeotto won\'t learn it until Lv31.'
            }
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-2">
          {i18n.language === 'fr' ? 'Fin de la Partie 1' : 'End of Part 1'}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">
              {i18n.language === 'fr' ? 'Capturés : 21' : 'Caught: 21'}
            </p>
            <p className="text-sm opacity-90">
              {i18n.language === 'fr' ? 'Restants : 130' : 'Remaining: 130'}
            </p>
          </div>
          <div className="text-4xl">🎯</div>
        </div>
      </div>
    </div>
  )
}

export default Gen1Guide

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
    const name = i18n.language === 'fr' ? pokemon.name.fr : pokemon.name.en

    return (
      <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm border">
        <img 
          src={imagePath} 
          alt={name}
          className="w-10 h-10 object-contain flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-600">#{pokemon.id}</span>
            <p className="font-medium text-gray-800 text-sm truncate">{name}</p>
          </div>
          {evolution && (
            <p className="text-xs text-gray-500 mt-1">{evolution}</p>
          )}
        </div>
      </div>
    )
  }

  // Helper function to display evolution chains horizontally
  const EvolutionChain = ({ startId }) => {
    const buildEvolutionChain = (pokemonId) => {
      const chain = []
      let currentPokemon = getPokemon(pokemonId)
      
      while (currentPokemon) {
        chain.push(currentPokemon)
        
        // Special case: Don't show Pikachu's evolution since Thunder Stone isn't available yet
        if (currentPokemon.id === '025') {
          break
        }
        
        if (currentPokemon.evolution) {
          // Trouver le Pokémon suivant dans la chaîne
          const nextId = parseInt(currentPokemon.id) + 1
          const nextPokemon = getPokemon(nextId)
          if (nextPokemon && nextPokemon.name.fr === currentPokemon.evolution.name.fr) {
            currentPokemon = nextPokemon
          } else {
            break
          }
        } else {
          break
        }
      }
      
      return chain
    }

    const chain = buildEvolutionChain(startId)

    return (
      <div className="bg-white rounded-lg shadow-sm border mb-2 inline-block">
        <div className="flex items-center space-x-2">
          {chain.map((pokemon, index) => {
            const imagePath = `/src/assets/images/pokemons/${pokemon.id}.png`
            const name = i18n.language === 'fr' ? pokemon.name.fr : pokemon.name.en
            
            return (
              <div key={pokemon.id} className="flex items-center space-x-3">
                <div className="text-center">
                  <img 
                    src={imagePath} 
                    alt={name}
                    className="w-12 h-12 object-contain mx-auto mb-1"
                  />
                  <div className="text-xs font-medium text-gray-600">#{pokemon.id}</div>
                  <div className="font-medium text-gray-800 text-sm">{name}</div>
                </div>
                
                {/* Flèche d'évolution */}
                {index < chain.length - 1 && (
                  <div className="flex flex-col items-center px-2">
                    <div className="text-blue-500 text-lg">→</div>
                    {pokemon.evolution && (
                      <div className="text-xs text-blue-600 font-medium mt-1">
                        {pokemon.evolution.level && `Niv.${pokemon.evolution.level}`}
                        {pokemon.evolution.stone && (
                          i18n.language === 'fr' ? pokemon.evolution.stone.fr : pokemon.evolution.stone.en
                        )}
                        {pokemon.evolution.trade && (i18n.language === 'fr' ? 'Échange' : 'Trade')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-6 py-8">
      {/* Main Content */}
      <div className="w-full">
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
          <p className="text-sm text-gray-600 mb-4">
            {i18n.language === 'fr'
              ? 'Choisissez votre starter et faites-le évoluer complètement. Chaque ligne d\'évolution est cruciale pour votre collection :'
              : 'Choose your starter and evolve it completely. Each evolution line is crucial for your collection:'
            }
          </p>
          <div className="space-y-4 mb-4">
            <EvolutionChain startId={1} />
            <EvolutionChain startId={4} />
            <EvolutionChain startId={7} />
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
          <p className="text-sm text-gray-600 mb-4">
            {i18n.language === 'fr'
              ? 'Premiers Pokémon sauvages disponibles sur la Route 1. Capturez et évoluez ces espèces :'
              : 'First wild Pokémon available on Route 1. Catch and evolve these species:'
            }
          </p>
          <div className="space-y-4 mb-4">
            <EvolutionChain startId={16} />
            <EvolutionChain startId={19} />
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
          <p className="text-sm text-gray-600 mb-4">
            {i18n.language === 'fr'
              ? 'Route accessible à l\'ouest de Jadielle. Trouvez ces Pokémon et leurs évolutions :'
              : 'Route accessible west of Viridian City. Find these Pokémon and their evolutions:'
            }
          </p>
          <div className="space-y-4 mb-4">
            <EvolutionChain startId={29} />
            <EvolutionChain startId={32} />
            <EvolutionChain startId={21} />
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
          <p className="text-sm text-gray-600 mb-4">
            {i18n.language === 'fr'
              ? 'Dans la forêt, capturez ces Pokémon insectes et Pikachu. Chaque espèce a son importance :'
              : 'In the forest, catch these bug Pokémon and Pikachu. Each species is important:'
            }
          </p>
          <div className="space-y-4 mb-4">
            <EvolutionChain startId={10} />
            <EvolutionChain startId={13} />
            <EvolutionChain startId={25} />
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
    </div>
  )
}

export default Gen1Guide

import { useTranslation } from 'react-i18next'

function Features() {
  const { t } = useTranslation()

  const coreFeatures = [
    {
      title: t('pokemonCollection'),
      description: t('pokemonCollectionDesc'),
      icon: "🔴",
      color: "from-red-500 to-pink-500"
    },
    {
      title: t('battleSystem'),
      description: t('battleSystemDesc'),
      icon: "⚔️",
      color: "from-orange-500 to-red-500"
    },
    {
      title: t('gymChallenges'),
      description: t('gymChallengesDesc'),
      icon: "🏆",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  const advancedFeatures = [
    {
      title: t('pokemonTraining'),
      description: t('pokemonTrainingDesc'),
      icon: "💪",
      color: "from-green-500 to-teal-500"
    },
    {
      title: t('itemManagement'),
      description: t('itemManagementDesc'),
      icon: "🎒",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: t('worldExploration'),
      description: t('worldExplorationDesc'),
      icon: "🗺️",
      color: "from-purple-500 to-pink-500"
    }
  ]

  const gameStats = [
    { label: t('totalPokemon'), value: "151", icon: "🔴" },
    { label: t('gymBadges'), value: "8", icon: "🏅" },
    { label: t('battleMoves'), value: "165", icon: "⚡" },
    { label: t('explorationAreas'), value: "20+", icon: "🌍" }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t('featuresTitle')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('featuresSubtitle')}
        </p>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {gameStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Core Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {t('coreFeatures')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {coreFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-6 mx-auto`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {t('advancedFeatures')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {advancedFeatures.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 border border-gray-100">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-6 mx-auto`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          {t('startJourney')}
        </h2>
        <p className="text-xl mb-6 opacity-90">
          {t('heroDescription')}
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
          {t('startJourney')}
        </button>
      </div>
    </div>
  )
}

export default Features

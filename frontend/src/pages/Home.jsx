import { useTranslation } from 'react-i18next'

function Home() {
  const { t } = useTranslation()

  const features = [
    {
      title: t('collectPokemon'),
      description: t('collectDescription'),
      icon: "�",
      color: "from-red-500 to-pink-500"
    },
    {
      title: t('trainBattle'),
      description: t('trainDescription'),
      icon: "📊",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: t('becomeChampion'),
      description: t('championDescription'),
      icon: "⚡",
      color: "from-purple-500 to-indigo-500"
    }
  ]

  const stats = [
    { label: t('pokemonCaught'), value: "42", max: "151" },
    { label: t('badgesEarned'), value: "3", max: "8" },
    { label: t('battlesWon'), value: "127", max: "∞" },
    { label: t('hoursPlayed'), value: "24", max: "∞" }
  ]

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16 lg:px-8">
      {/* Hero Section */}
      <div className="text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          {t('welcomeTitle')}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {' '}{t('professorOakChallenge')}
          </span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {t('heroDescription')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
            {t('startJourney')}
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all">
            {t('learnMore')}
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-20 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('aboutTitle')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}{t('challenge')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('aboutDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('ourMission')}</h3>
            <p className="text-gray-600 mb-4">
              {t('missionDescription1')}
            </p>
            <p className="text-gray-600 mb-6">
              {t('missionDescription2')}
            </p>
            <ul className="space-y-2">
              {[
                t('completePokedex'),
                t('battleGuides'),
                t('communityForums'),
                t('progressTracking')
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{t('ourGoal')}</h4>
              <p className="text-gray-600">
                {t('goalDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-20 grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">{t('yourProgress')}</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stat.value}
                {stat.max !== "∞" && <span className="text-gray-400">/{stat.max}</span>}
              </div>
              <div className="text-gray-600">{stat.label}</div>
              {stat.max !== "∞" && (
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${(parseInt(stat.value) / parseInt(stat.max)) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

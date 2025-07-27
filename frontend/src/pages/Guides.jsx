import { useTranslation } from 'react-i18next'

function Guides({ setActiveTab }) {
  const { t, i18n } = useTranslation()

  const gen1Guides = [
    {
      title: t('pokemonRed'),
      description: t('redDescription'),
      image: `/src/assets/images/guides/red-${i18n.language}.webp`,
      color: "from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700",
      route: "gen1-guide"
    },
    {
      title: t('pokemonBlue'),
      description: t('blueDescription'),
      image: `/src/assets/images/guides/blue-${i18n.language}.webp`,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      route: "gen1-guide"
    },
    {
      title: t('pokemonYellow'),
      description: t('yellowDescription'),
      image: `/src/assets/images/guides/yellow-${i18n.language}.webp`,
      color: "from-yellow-500 to-yellow-600",
      hoverColor: "hover:from-yellow-600 hover:to-yellow-700",
      route: "gen1-guide"
    }
  ]

  const handleGuideClick = (route) => {
    if (setActiveTab) {
      setActiveTab(route)
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t('guidesTitle')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('guidesSubtitle')}
        </p>
      </div>

      {/* Generation 1 Guides */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {t('generation1')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {gen1Guides.map((guide, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-auto overflow-hidden">
                <img 
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {guide.title}
                </h3>
                
                {/* Action Button */}
                <button 
                  onClick={() => handleGuideClick(guide.route)}
                  className={`w-full bg-gradient-to-r ${guide.color} ${guide.hoverColor} text-white py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105`}
                >
                  {i18n.language === 'fr' ? 'Voir le Guide' : 'View Guide'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          {i18n.language === 'fr' ? 'Plus de Guides Bientôt !' : 'More Guides Coming Soon!'}
        </h2>
        <p className="text-xl mb-6 opacity-90">
          {i18n.language === 'fr' 
            ? 'Nous travaillons sur des guides pour les générations suivantes et des contenus spécialisés.'
            : 'We are working on guides for future generations and specialized content.'
          }
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
            {i18n.language === 'fr' ? 'Génération 2' : 'Generation 2'}
          </span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
            {i18n.language === 'fr' ? 'Génération 3' : 'Generation 3'}
          </span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
            {i18n.language === 'fr' ? 'Génération 4' : 'Generation 4'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Guides

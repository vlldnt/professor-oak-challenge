import { useTranslation } from 'react-i18next'

function Guides({ setActiveTab }) {
  const { t, i18n } = useTranslation()

  const gen1Guides = [
    {
      images: [
        `/src/assets/images/guides/red-${i18n.language}.webp`,
        `/src/assets/images/guides/blue-${i18n.language}.webp`
      ],
      color: "from-red-500 to-blue-600",
      hoverColor: "hover:from-red-600 hover:to-blue-700",
      route: "gen1-guide",
      available: true
    },
    {
      images: [
        `/src/assets/images/guides/yellow-${i18n.language}.webp`
      ],
      color: "from-yellow-500 to-yellow-600",
      hoverColor: "hover:from-yellow-600 hover:to-yellow-700",
      route: "gen1-guide",
      available: false
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
        <div className="grid md:grid-cols-2 gap-8">
          {gen1Guides.map((guide, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer flex flex-col items-center"
              onClick={() => handleGuideClick(guide.route)}
            >
              {/* Images Container */}
              <div className="flex flex-row justify-center items-center gap-2 pt-6 pb-2">
                {guide.images.map((img, idx) => (
                  <div key={idx} className="relative flex items-center justify-center">
                    <img
                      src={img}
                      alt={guide.title}
                      className="w-32 h-32 object-contain rounded-lg border-2 border-gray-200 shadow-sm bg-white hover:scale-110 transition-transform duration-300"
                      style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.07)' }}
                    />
                    {/* Badge version avec nom complet */}
                    {guide.images.length > 1 && idx === 0 && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded shadow">{t('pokemonRed')}</span>
                    )}
                    {guide.images.length > 1 && idx === 1 && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded shadow">{t('pokemonBlue')}</span>
                    )}
                    {guide.images.length === 1 && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded shadow">{t('pokemonYellow')}</span>
                    )}
                  </div>
                ))}
              </div>
              {/* Unique Action Button */}
              <div className="p-5 pt-2 w-full flex flex-col items-center">
                {guide.available ? (
                  <button
                    onClick={e => { e.stopPropagation(); handleGuideClick(guide.route); }}
                    className={`w-full bg-gradient-to-r ${guide.color} ${guide.hoverColor} text-white py-2 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 text-base`}
                  >
                    {i18n.language === 'fr' ? 'Voir le Guide' : 'View Guide'}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 py-2 px-4 rounded-lg font-semibold text-base opacity-70 cursor-not-allowed"
                  >
                    {i18n.language === 'fr' ? 'Bientôt disponible' : 'Coming soon'}
                  </button>
                )}
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

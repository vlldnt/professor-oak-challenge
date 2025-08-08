import { useTranslation } from 'react-i18next'

function Guides({ setActiveTab }) {
  const { t, i18n } = useTranslation()

  const gen1GuideImages = [
    {
      src: `/src/assets/images/guides/red-${i18n.language}.webp`,
      label: t('pokemonRed'),
      color: 'bg-red-500',
      version: 'red',
      available: true
    },
    {
      src: `/src/assets/images/guides/blue-${i18n.language}.webp`,
      label: t('pokemonBlue'),
      color: 'bg-blue-500',
      version: 'blue',
      available: true
    },
    {
      src: `/src/assets/images/guides/yellow-${i18n.language}.webp`,
      label: t('pokemonYellow'),
      color: 'bg-yellow-400',
      version: 'yellow',
      available: false
    }
  ];

  const handleGuideClick = (version) => {
    window.localStorage.setItem('oak-guide-version', version);
    if (typeof window.setVersion === 'function') {
      window.setVersion(version);
    }
    if (setActiveTab) {
      setActiveTab('gen1-guide');
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
        <div className="grid md:grid-cols-1 gap-8">
          <div className="bg-gradient-to-br from-red-100 via-blue-100 to-yellow-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105 flex flex-col items-center border-4 border-yellow-200">
            <div className="flex flex-row justify-center items-center gap-8 pt-8 pb-6">
              {gen1GuideImages.map((imgObj, idx) => (
                <div
                  key={idx}
                  className={`relative flex flex-col items-center justify-center group ${imgObj.available ? 'cursor-pointer' : 'opacity-60'}`}
                  onClick={() => {
                    if (imgObj.available) {
                      handleGuideClick(imgObj.version);
                    }
                  }}
                >
                  <img
                    src={imgObj.src}
                    alt={imgObj.label}
                    className="w-[200px] h-[200px] object-contain rounded-lg border-2 border-gray-200 shadow-sm bg-white group-hover:scale-110 transition-transform duration-300"
                    style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.07)' }}
                  />
                  {!imgObj.available && (
                    <span className="absolute bottom-2 right-2 bg-gray-300 text-gray-700 text-lg font-extrabold px-5 py-2 rounded shadow transition-transform duration-300 group-hover:scale-110">
                      {i18n.language === 'fr' ? 'Indisponible' : 'Unavailable'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
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
          {['2', '3', '4'].map((gen) => (
            <span key={gen} className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {i18n.language === 'fr' ? `Génération ${gen}` : `Generation ${gen}`}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Guides;

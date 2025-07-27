import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-screen-xl mx-auto px-6 py-12 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              <h3 className="text-xl font-bold">{t('professorOakChallenge')}</h3>
            </div>
            <p className="text-gray-400 mb-4">
              {t('footerDescription')}
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tableau de bord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Fonctionnalités du Jeu</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Pokédex</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Système de Combat</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Champions d'Arène</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conseil des 4</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Communauté</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reddit</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 Professor Oak Challenge. Gotta catch 'em all!</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

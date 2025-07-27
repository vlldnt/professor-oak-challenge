import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import apiService from '../services/apiService'

function Header({ activeTab, setActiveTab, currentUser, setCurrentUser }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, i18n } = useTranslation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setIsMobileMenuOpen(false)
  }

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  const handleLogout = () => {
    apiService.logout()
    setCurrentUser(null)
    setActiveTab('home')
  }

  const menuItems = ['home', 'features', 'contact', 'dashboard']

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
            <h1 className="text-xl font-bold text-gray-800">{t('professorOakChallenge')}</h1>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {t(tab)}
              </button>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 border-l border-gray-300 pl-6">
              <button
                onClick={() => changeLanguage('fr')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  i18n.language === 'fr'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  i18n.language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
            </div>
            
            {/* User Info / Login Button */}
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-800">{currentUser.username}</p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : '👤'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('login')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'login'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                }`}
              >
                {t('signIn')}
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {menuItems.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {t(tab)}
                </button>
              ))}
              
              {/* Mobile Login Button */}
              <button
                onClick={() => handleTabClick('login')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'text-white bg-blue-600'
                    : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                {t('signIn')}
              </button>

              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium text-gray-700">Langue / Language:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => changeLanguage('fr')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      i18n.language === 'fr'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      i18n.language === 'en'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header

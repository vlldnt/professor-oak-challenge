import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import apiService from '../services/apiService'

function Dashboard({ currentUser }) {
  const { t } = useTranslation()
  const [userStats, setUserStats] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (currentUser) {
      loadUserStats()
    }
  }, [currentUser])

  const loadUserStats = async () => {
    try {
      setIsLoading(true)
      const stats = await apiService.getUserStats()
      setUserStats(stats)
    } catch (error) {
      setError(`Erreur lors du chargement des statistiques: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCatchPokemon = async () => {
    try {
      const pokemonNames = ['Pikachu', 'Charmander', 'Squirtle', 'Bulbasaur', 'Eevee', 'Snorlax', 'Charizard', 'Blastoise']
      const randomPokemon = pokemonNames[Math.floor(Math.random() * pokemonNames.length)]
      
      const result = await apiService.catchPokemon(randomPokemon)
      setSuccessMessage(result.message)
      
      // Recharger les statistiques après avoir attrapé un Pokémon
      await loadUserStats()
      
      // Effacer le message après 3 secondes
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      setError(`Erreur lors de la capture: ${error.message}`)
    }
  }

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès restreint</h2>
          <p className="text-gray-600 mb-6">Vous devez être connecté pour accéder au tableau de bord.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Se connecter
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🏆 Tableau de Bord - Professor Oak Challenge
        </h1>
        
        {/* Informations utilisateur connecté - Seulement nom et email */}
        <div className="max-w-md mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {currentUser?.username ? currentUser.username.charAt(0).toUpperCase() : '👤'}
              </span>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">
                {currentUser?.username || 'Utilisateur'}
              </h2>
              <p className="text-gray-600">
                📧 {currentUser?.email || 'email@example.com'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          🎉 {successMessage}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Pokémon Capturés</h3>
          <p className="text-3xl font-bold text-blue-600">{userStats?.stats?.pokemonCaught || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">🏅</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Badges Gagnés</h3>
          <p className="text-3xl font-bold text-green-600">{userStats?.stats?.badgesEarned || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">⚔️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Combats Gagnés</h3>
          <p className="text-3xl font-bold text-red-600">{userStats?.stats?.battlesWon || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">⏰</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Heures Jouées</h3>
          <p className="text-3xl font-bold text-purple-600">{userStats?.stats?.hoursPlayed || 0}h</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Capture Pokemon */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🎯 Capturer un Pokémon</h3>
          <p className="text-gray-600 mb-4">
            Tentez votre chance pour capturer un Pokémon aléatoire !
          </p>
          <button
            onClick={handleCatchPokemon}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
          >
            🎯 Lancer une Pokéball
          </button>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">👤 Informations du Dresseur</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Nom d'utilisateur:</span> {currentUser?.username || 'N/A'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {currentUser?.email || 'N/A'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">ID Dresseur:</span> #{currentUser?.id || 'N/A'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Niveau:</span> Débutant
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Région:</span> Kanto
            </p>
          </div>
          
          <button
            onClick={loadUserStats}
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            🔄 Actualiser les données
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 Activité Récente</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
            <span className="text-gray-700">Connexion au système</span>
            <span className="text-sm text-gray-500">Il y a quelques instants</span>
          </div>
          {userStats?.stats?.pokemonCaught > 0 && (
            <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded">
              <span className="text-gray-700">🎉 Pokémon capturé avec succès</span>
              <span className="text-sm text-gray-500">Récemment</span>
            </div>
          )}
          <div className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded">
            <span className="text-gray-700">📊 Statistiques mises à jour</span>
            <span className="text-sm text-gray-500">Maintenant</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

import React from 'react'

function Dashboard({ currentUser }) {
  if (!currentUser) {
    return (
      <div className="max-w-screen-md mx-auto px-6 py-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès restreint</h2>
          <p className="text-gray-600 mb-6">Vous devez être connecté pour accéder au tableau de bord.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-screen-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">👤 Tableau de bord</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Informations utilisateur</h2>
        <div className="space-y-4">
          <div>
            <span className="font-medium">Nom d'utilisateur :</span>
            <span className="ml-2">{currentUser.username}</span>
          </div>
          <div>
            <span className="font-medium">Guide en cours :</span>
            <span className="ml-2">{currentUser.currentGuide ? currentUser.currentGuide : '(rien commencé)'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

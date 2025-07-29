import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import apiService from '../services/apiService'

function Dashboard({ currentUser }) {
  const { t } = useTranslation()
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editField, setEditField] = useState(null)
  const [form, setForm] = useState({ email: '', username: '', password: '' })

  useEffect(() => {
    if (currentUser) {
      loadUserInfo()
    }
  }, [currentUser])

  const loadUserInfo = async () => {
    setIsLoading(true)
    setError('')
    try {
      const info = await apiService.getUserInfo()
      setUserInfo(info)
      setForm({ email: info.email, username: info.username, password: '' })
    } catch (err) {
      setError('Erreur chargement utilisateur : ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (field) => {
    setEditField(field)
    setSuccess('')
    setError('')
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async (field) => {
    setIsLoading(true)
    setError('')
    setSuccess('')
    try {
      let result
      if (field === 'email') {
        result = await apiService.updateEmail(form.email)
      } else if (field === 'username') {
        result = await apiService.updateUsername(form.username)
      } else if (field === 'password') {
        result = await apiService.updatePassword(form.password)
      }
      setSuccess(result.message || 'Modifié avec succès')
      setEditField(null)
      await loadUserInfo()
    } catch (err) {
      setError('Erreur modification : ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

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

  if (isLoading) {
    return (
      <div className="max-w-screen-md mx-auto px-6 py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-screen-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">👤 Tableau de bord</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Informations utilisateur</h2>
        <div className="space-y-4">
          {/* Email */}
          <div>
            <span className="font-medium">Email :</span>
            {editField === 'email' ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                />
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleSave('email')}
                >
                  Sauver
                </button>
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setEditField(null)}
                >
                  Annuler
                </button>
              </div>
            ) : (
              <span className="ml-2">{userInfo?.email}</span>
            )}
            {editField !== 'email' && (
              <button
                className="ml-4 text-blue-600 underline"
                onClick={() => handleEdit('email')}
              >
                Modifier
              </button>
            )}
          </div>
          {/* Username */}
          <div>
            <span className="font-medium">Nom d'utilisateur :</span>
            {editField === 'username' ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                />
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleSave('username')}
                >
                  Sauver
                </button>
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setEditField(null)}
                >
                  Annuler
                </button>
              </div>
            ) : (
              <span className="ml-2">{userInfo?.username}</span>
            )}
            {editField !== 'username' && (
              <button
                className="ml-4 text-blue-600 underline"
                onClick={() => handleEdit('username')}
              >
                Modifier
              </button>
            )}
          </div>
          {/* Password */}
          <div>
            <span className="font-medium">Mot de passe :</span>
            {editField === 'password' ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                  placeholder="Nouveau mot de passe"
                />
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleSave('password')}
                >
                  Sauver
                </button>
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setEditField(null)}
                >
                  Annuler
                </button>
              </div>
            ) : (
              <span className="ml-2">********</span>
            )}
            {editField !== 'password' && (
              <button
                className="ml-4 text-blue-600 underline"
                onClick={() => handleEdit('password')}
              >
                Modifier
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

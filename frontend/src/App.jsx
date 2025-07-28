import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Guides from './pages/Guides'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Gen1Guide from './pages/guides/guideRedBlue'
import apiService from './services/apiService'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [currentUser, setCurrentUser] = useState(null)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    window.history.pushState({ tab }, '', `#${tab}`)
  }

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.tab) {
        setActiveTab(event.state.tab)
      } else {
        setActiveTab('home')
      }
    }

    window.addEventListener('popstate', handlePopState)

    window.history.replaceState({ tab: activeTab }, '', `#${activeTab}`)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [activeTab])

  useEffect(() => {
    const savedUser = apiService.getCurrentUser()
    if (savedUser && apiService.isAuthenticated()) {
      setCurrentUser(savedUser)
    }

    const hash = window.location.hash.substring(1)
    if (hash && ['home', 'guides', 'gen1-guide', 'contact', 'login', 'dashboard'].includes(hash)) {
      setActiveTab(hash)
    }
  }, [])

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />
      case 'guides':
        return <Guides setActiveTab={handleTabChange} />
      case 'gen1-guide':
        return <Gen1Guide setActiveTab={handleTabChange} />
      case 'contact':
        return <Contact />
      case 'login':
        return <Login setActiveTab={handleTabChange} setCurrentUser={setCurrentUser} />
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />
      default:
        return <Home />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser} 
        />
      <main className="max-w-screen-xl mx-auto">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  )
}

export default App

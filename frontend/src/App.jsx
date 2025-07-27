import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import apiService from './services/apiService'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const savedUser = apiService.getCurrentUser()
    if (savedUser && apiService.isAuthenticated()) {
      setCurrentUser(savedUser)
    }
  }, [])

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />
      case 'about':
        return <About />
      case 'features':
        return <Features />
      case 'contact':
        return <Contact />
      case 'login':
        return <Login setActiveTab={setActiveTab} setCurrentUser={setCurrentUser} />
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
          setActiveTab={setActiveTab} 
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

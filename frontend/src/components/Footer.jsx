function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Professor Oak Challenge</h3>
            <p className="text-gray-400">
              Embark on the ultimate Pokémon adventure and become a master trainer.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Game Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Pokédex</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Battle System</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gym Leaders</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Elite Four</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Connect</h4>
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

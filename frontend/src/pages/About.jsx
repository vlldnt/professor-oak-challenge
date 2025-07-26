function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About the 
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {' '}Challenge
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The Professor Oak Challenge is an epic quest inspired by the legendary Pokémon professor himself.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
          <p className="text-gray-600 mb-4">
            We believe that every trainer deserves the chance to become a Pokémon master. Our platform provides
            the tools, knowledge, and community needed to excel in your journey.
          </p>
          <p className="text-gray-600 mb-6">
            From catching your first Pokémon to facing the Elite Four, we're here to guide you through
            every step of your adventure in the Kanto region.
          </p>
          <ul className="space-y-2">
            {[
              "Complete Pokédex tracking",
              "Battle strategy guides",
              "Community forums",
              "Progress tracking tools"
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Our Goal</h4>
            <p className="text-gray-600">
              Help 10,000+ trainers become Pokémon masters by providing the ultimate
              training platform and community support.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Get in 
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {' '}Touch
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about your Pokémon journey? We're here to help!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            {[
              {
                icon: "📧",
                title: "Email Support",
                detail: "support@professoroakchallenge.com",
                description: "Get help with your account or gameplay questions"
              },
              {
                icon: "💬",
                title: "Discord Community",
                detail: "Join our Discord server",
                description: "Chat with other trainers and get real-time help"
              },
              {
                icon: "🐦",
                title: "Twitter Updates",
                detail: "@ProfOakChallenge",
                description: "Follow us for the latest news and updates"
              },
              {
                icon: "📍",
                title: "Location",
                detail: "Pallet Town, Kanto Region",
                description: "Visit Professor Oak's Laboratory"
              }
            ].map((contact, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="text-2xl">{contact.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{contact.title}</h4>
                  <p className="text-blue-600 font-medium">{contact.detail}</p>
                  <p className="text-gray-600 text-sm">{contact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trainer Name
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your trainer name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>General Question</option>
                <option>Technical Support</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Account Issues</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea 
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us how we can help you on your Pokémon journey..."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact

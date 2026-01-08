export default function FeaturesSection() {
  const features = [
    {
      icon: '🔐',
      title: 'Sécurité Maximale',
      description: 'Chiffrement des données, sessions sécurisées, authentification forte avec bcrypt.'
    },
    {
      icon: '📱',
      title: 'Accessibilité',
      description: 'Interface responsive optimisée pour mobile, tablette et desktop.'
    },
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Chargement ultra-rapide grâce à Next.js 14 et optimisation des assets.'
    },
    {
      icon: '📊',
      title: 'Transparence',
      description: 'Accès instantané aux résultats avec historique et progression.'
    },
    {
      icon: '🎯',
      title: 'Simplicité',
      description: 'Interface intuitive conçue pour les parents et les élèves.'
    },
    {
      icon: '🛡️',
      title: 'Confidentialité',
      description: 'Protection des données scolaires sensibles selon les normes en vigueur.'
    }
  ]

  return (
    <section id="fonctionnalites" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités <span className="text-secondary">Avancées</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une plateforme conçue pour la sécurité, la simplicité et l'efficacité
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

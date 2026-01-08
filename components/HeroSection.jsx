import Link from 'next/link'

export default function HeroSection() {
  return (
    <section id="accueil" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <img 
              src="/images/logo.png" 
              alt="SecureWay Results" 
              className="h-24 w-auto"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SecureWay <span className="text-secondary">Results</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Votre voie sécurisée vers les résultats scolaires
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Une plateforme fiable et sécurisée permettant aux écoles de publier les résultats académiques 
            et aux parents/élèves d'y accéder facilement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#ecoles" 
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Pour les écoles
            </Link>
            <Link 
              href="/login" 
              className="px-6 py-3 bg-secondary text-primary font-medium rounded-lg hover:bg-amber-500 transition-colors"
            >
              Accéder aux résultats
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

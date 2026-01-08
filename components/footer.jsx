import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img 
                src="/images/logo.png" 
                alt="SecureWay Results" 
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="text-xl font-semibold">
                SecureWay<span className="text-secondary">Results</span>
              </span>
            </Link>
            <p className="text-gray-300 max-w-md">
              Votre voie sécurisée vers les résultats scolaires
            </p>
          </div>
          
          <div className="text-gray-300">
            <p className="font-medium mb-2">Contact</p>
            <p>codjosamuelstein@gmail.com</p>
            <p>+229 01 49 11 49 51</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              Copyright © 2026 SecureWay Results. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/#apropos" className="hover:text-white transition-colors">
                À propos
              </Link>
              <Link href="/#contact" className="hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/login" className="hover:text-white transition-colors">
                Espace parents
              </Link>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500 text-center">
            Développé avec 🟩 par Samuel • Application Teacher Corner
          </p>
        </div>
      </div>
    </footer>
  )
}

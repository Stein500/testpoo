import LoginForm from '@/components/LoginForm'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await getSession()
  
  // Si déjà connecté, rediriger vers le dashboard
  if (session?.isLoggedIn) {
    redirect('/dashboard')
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/images/logo.png" 
              alt="SecureWay Results" 
              className="h-20 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Connexion Espace Parents
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accédez aux résultats scolaires de votre enfant
          </p>
        </div>
        
        <div className="glass-card p-8">
          <LoginForm />
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              🔐 Identifiants de démonstration
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-mono font-bold">CE1-1</div>
                <div className="text-gray-600">Fifamè</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-mono font-bold">CE1-2</div>
                <div className="text-gray-600">Emmanuel</div>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Utilisez le prénom de l'élève comme mot de passe
            </p>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Problème de connexion ?</p>
            <p className="mt-1">
              Contactez l'école: 
              <span className="font-medium text-primary"> codjosamuelstein@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

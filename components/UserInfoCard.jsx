'use client'

import { useRouter } from 'next/navigation'

export default function UserInfoCard({ user }) {
  const router = useRouter()
  
  const handleLogout = async () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
      router.refresh()
    }
  }
  
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gradient-to-br from-accent-green to-emerald-500 rounded-xl">
          <span className="text-2xl text-white">👤</span>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">
            {user.nomEleve.split(' ').pop()}
          </h3>
          <p className="text-sm text-gray-600">{user.classe}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Matricule</p>
            <p className="font-semibold">{user.matricule}</p>
          </div>
          <div>
            <p className="text-gray-500">École</p>
            <p className="font-semibold">{user.ecole}</p>
          </div>
        </div>
        
        <div>
          <p className="text-gray-500 text-sm mb-1">Parent/Référent</p>
          <p className="font-semibold">{user.nomParent}</p>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full mt-6 py-2 px-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-medium rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
        >
          🚪 Se déconnecter
        </button>
      </div>
    </div>
  )
}

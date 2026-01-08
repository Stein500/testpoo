import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSession } from '@/lib/session'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SecureWay Results - Plateforme Scolaire Sécurisée',
  description: 'Plateforme sécurisée pour la consultation des résultats scolaires',
}

export default async function RootLayout({ children }) {
  const session = await getSession()
  
  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50`}>
        <Header session={session} />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

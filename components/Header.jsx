'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Header({ session }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/#apropos', label: 'À propos' },
    { href: '/#fonctionnalites', label: 'Fonctionnalités' },
    { href: '/#ecoles', label: 'Pour les écoles' },
    { href: '/#parents', label: 'Pour les parents' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/images/logo.png" 
                alt="SecureWay Results" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-semibold text-gray-900">
                SecureWay<span className="text-secondary">Results</span>
              </span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === link.href
                      ? 'text-primary bg-gray-100'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {session?.isLoggedIn ? (
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                  <span className="text-sm text-gray-600">
                    Bienvenue, <span className="font-semibold text-accent-green">{session.nomEleve.split(' ').pop()}</span>
                  </span>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 bg-accent-green text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Tableau de bord
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="ml-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Consulter les résultats
                </Link>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu panel */}
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <img 
                  src="/images/logo.png" 
                  alt="SecureWay Results" 
                  className="h-8 w-auto"
                />
                <span className="text-lg font-semibold">
                  SecureWay<span className="text-secondary">Results</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-primary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {session?.isLoggedIn ? (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Connecté en tant que</p>
                <p className="font-medium text-primary">{session.nomEleve}</p>
              </div>
            ) : null}
          </div>
          
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  pathname === link.href
                    ? 'text-primary bg-gray-100'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
             
             {session?.isLoggedIn ? (
               <>
                 <Link
                   href="/dashboard"
                   onClick={() => setMobileMenuOpen(false)}
                   className="block px-3 py-2 text-base font-medium bg-accent-green text-white rounded-lg hover:bg-green-600"
                 >
                   Tableau de bord
                 </Link>
                 <button
                   onClick={() => {
                     handleLogout()
                     setMobileMenuOpen(false)
                   }}
                   className="w-full text-left px-3 py-2 text-base font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                 >
                   Déconnexion
                 </button>
               </>
             ) : (
               <Link
                 href="/login"
                 onClick={() => setMobileMenuOpen(false)}
                 className="block px-3 py-2 text-base font-medium bg-primary text-white rounded-lg hover:bg-gray-800"
               >
                 Consulter les résultats
               </Link>
             )}
           </nav>
         </div>
       </div>
     </>
   )
 }

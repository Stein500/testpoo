import { NextResponse } from 'next/server'
import { getSession } from './lib/session'

export async function middleware(request) {
  const session = await getSession()
  const { pathname } = request.nextUrl

  // Routes protégées
  const protectedRoutes = ['/dashboard']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Routes d'authentification
  const authRoutes = ['/login']
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Redirection si non connecté et tentative d'accès à une route protégée
  if (isProtectedRoute && !session?.isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirection si déjà connecté et tentative d'accès à une route d'authentification
  if (isAuthRoute && session?.isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
  ],
}

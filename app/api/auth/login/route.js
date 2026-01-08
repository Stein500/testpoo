import { NextResponse } from 'next/server'
import { users, verifyPassword } from '@/lib/users'
import { createSession } from '@/lib/session'

// Rate limiting store (simple in-memory)
const loginAttempts = new Map()
const MAX_ATTEMPTS = 5
const LOCK_TIME = 15 * 60 * 1000 // 15 minutes

export async function POST(request) {
  try {
    const { matricule, password, recaptchaToken } = await request.json()
    
    // Validation des champs requis
    if (!matricule || !password) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }
    
    // Rate limiting par IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const attempts = loginAttempts.get(ip) || []
    
    // Nettoyer les anciennes tentatives
    const recentAttempts = attempts.filter(time => now - time < LOCK_TIME)
    
    if (recentAttempts.length >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: 'Trop de tentatives. Veuillez réessayer dans 15 minutes.' },
        { status: 429 }
      )
    }
    
    // Vérification reCAPTCHA - seulement en production
    if (process.env.NODE_ENV === 'production') {
      if (!recaptchaToken) {
        loginAttempts.set(ip, [...recentAttempts, now])
        return NextResponse.json(
          { error: 'Veuillez compléter la vérification reCAPTCHA' },
          { status: 400 }
        )
      }
      
      const recaptchaResponse = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: recaptchaToken,
          }).toString(),
        }
      )
      
      const recaptchaData = await recaptchaResponse.json()
      
      if (!recaptchaData.success) {
        loginAttempts.set(ip, [...recentAttempts, now])
        return NextResponse.json(
          { error: 'Échec de la vérification reCAPTCHA' },
          { status: 400 }
        )
      }
    }
    
    // Recherche de l'utilisateur
    const user = users.find(u => u.matricule === matricule)
    
    if (!user) {
      loginAttempts.set(ip, [...recentAttempts, now])
      return NextResponse.json(
        { error: 'Matricule ou mot de passe incorrect' },
        { status: 401 }
      )
    }
    
    // Vérification du mot de passe
    const isValid = await verifyPassword(password, user.passwordHash)
    
    if (!isValid) {
      loginAttempts.set(ip, [...recentAttempts, now])
      return NextResponse.json(
        { error: 'Matricule ou mot de passe incorrect' },
        { status: 401 }
      )
    }
    
    // Création de la session
    await createSession(user)
    
    // Réinitialiser les tentatives pour cette IP
    loginAttempts.delete(ip)
    
    return NextResponse.json({
      success: true,
      user: {
        matricule: user.matricule,
        nomEleve: user.nomEleve,
        classe: user.classe
      }
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

import { sealData, unsealData } from 'iron-session'
import { cookies } from 'next/headers'

const sessionPassword = process.env.SESSION_SECRET
const sessionOptions = {
  password: sessionPassword,
  cookieName: 'secureway-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 semaine
    path: '/',
  }
}

export async function getSession() {
  const cookieStore = cookies()
  const encryptedSession = cookieStore.get(sessionOptions.cookieName)?.value
  
  if (!encryptedSession) {
    return { isLoggedIn: false }
  }
  
  try {
    const session = await unsealData(encryptedSession, {
      password: sessionPassword,
    })
    return session
  } catch (error) {
    console.error('Session error:', error)
    return { isLoggedIn: false }
  }
}

export async function createSession(user) {
  const session = {
    isLoggedIn: true,
    matricule: user.matricule,
    nomEleve: user.nomEleve,
    nomParent: user.nomParent,
    fichierPDF: user.fichierPDF,
    classe: user.classe,
    ecole: user.ecole,
    loginTime: Date.now()
  }
  
  const encryptedSession = await sealData(session, {
    password: sessionPassword,
  })
  
  const cookieStore = cookies()
  cookieStore.set(sessionOptions.cookieName, encryptedSession, {
    ...sessionOptions.cookieOptions,
    expires: new Date(Date.now() + sessionOptions.cookieOptions.maxAge * 1000)
  })
}

export async function destroySession() {
  const cookieStore = cookies()
  cookieStore.delete(sessionOptions.cookieName)
}

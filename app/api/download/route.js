import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { createReadStream, statSync } from 'fs'
import { join } from 'path'

export async function GET(request) {
  try {
    // Vérifier la session
    const session = await getSession()
    
    if (!session?.isLoggedIn) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }
    
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')
    
    if (!filename) {
      return NextResponse.json(
        { error: 'Nom de fichier manquant' },
        { status: 400 }
      )
    }
    
    // Vérifier que l'utilisateur a le droit d'accéder à ce fichier
    if (session.fichierPDF !== filename) {
      return NextResponse.json(
        { error: 'Accès non autorisé à ce fichier' },
        { status: 403 }
      )
    }
    
    // Chemin du fichier PDF
    const filePath = join(process.cwd(), 'uploads', 'bulletins', filename)
    
    // Vérifier si le fichier existe
    try {
      const stats = statSync(filePath)
      
      // Créer un stream du fichier
      const fileStream = createReadStream(filePath)
      
      // Configurer les headers pour le téléchargement
      const headers = new Headers()
      headers.set('Content-Type', 'application/pdf')
      headers.set('Content-Disposition', `attachment; filename="${filename}"`)
      headers.set('Content-Length', stats.size.toString())
      
      return new Response(fileStream, { headers })
      
    } catch (err) {
      console.error('Fichier non trouvé:', err)
      return NextResponse.json(
        { error: 'Fichier non trouvé' },
        { status: 404 }
      )
    }
    
  } catch (error) {
    console.error('Erreur de téléchargement:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

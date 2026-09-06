import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const resendKey = process.env.RESEND_API_KEY
    
    if (!resendKey) {
      return NextResponse.json({ 
        success: false, 
        error: "RESEND_API_KEY est introuvable sur Vercel. L'environnement Vercel n'a pas accès à la clé." 
      })
    }

    const resend = new Resend(resendKey)

    const { data, error } = await resend.emails.send({
      from: 'Vyna Boutique <contact@vyynaa.com>',
      to: 'attoufanemaiga60@gmail.com',
      subject: 'Test Diagnostic Vyna',
      html: '<h1>Test Diagnostic</h1><p>Si vous recevez ce mail, le système fonctionne !</p>'
    })

    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: "L'API Resend a retourné une erreur.",
        details: error
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: "L'e-mail a été envoyé avec succès !",
      data: data
    })

  } catch (err: any) {
    return NextResponse.json({ 
      success: false, 
      error: "Le code a crashé.",
      details: err.message
    })
  }
}

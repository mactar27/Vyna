import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Flutterwave checkout API - initie un paiement et retourne le lien de paiement
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, amount, currency = 'XAF', customerName, customerEmail, customerPhone } = body

    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    if (!secretKey || secretKey === 'VOTRE_SECRET_KEY_FLUTTERWAVE') {
      return NextResponse.json(
        { error: 'Flutterwave non configuré. Ajoutez FLUTTERWAVE_SECRET_KEY dans .env.' },
        { status: 503 }
      )
    }

    const txRef = `VYNA_${orderId}_${Date.now()}`
    const normalizedCurrency = currency === 'XOF' ? 'XAF' : currency
    const normalizedPhone = String(customerPhone || '').replace(/\s+/g, '').replace(/^\+/, '')

    const flutterwaveRes = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        tx_ref: txRef,
        amount: Number(amount),
        currency: normalizedCurrency,
        redirect_url: `${appUrl}/commande/succes?order=${orderId}`,
        payment_options: 'card,account,ussd,qr,barter,mobilemoneyghana,mobilemoneyuganda,mobilemoneyrwanda,mobilemoneytanzania,mobilemoneyzambia,mobilemoneyfranco,mobilemoneykenya,mobilemoneyug,mobilemoneycameroon,mobilemoney',
        customer: {
          email: customerEmail,
          phonenumber: normalizedPhone,
          name: customerName,
        },
        customizations: {
          title: 'Vyna Boutique',
          description: `Commande Vyna #${orderId}`,
          logo: `${appUrl}/apple-icon.png`,
        },
      }),
    })

    const data = await flutterwaveRes.json()

    if (!flutterwaveRes.ok || data?.status !== 'success') {
      console.error('Flutterwave error:', data)
      return NextResponse.json(
        { error: data?.message || 'Erreur lors de l\'initialisation du paiement.' },
        { status: 400 }
      )
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { paymentTransactionId: txRef },
    })

    return NextResponse.json({
      payment_url: data.data?.link,
      payment_token: txRef,
    })
  } catch (err) {
    console.error('Flutterwave initiate error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

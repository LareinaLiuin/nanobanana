import { NextRequest, NextResponse } from 'next/server'
import { createPaymentSession } from '@/lib/creem'

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId, userEmail } = await request.json()

    if (!priceId || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: priceId, userId, userEmail' },
        { status: 400 }
      )
    }

    const paymentLink = await createPaymentSession(priceId, userId, userEmail)

    return NextResponse.json(paymentLink)
  } catch (error) {
    console.error('Payment session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    )
  }
}
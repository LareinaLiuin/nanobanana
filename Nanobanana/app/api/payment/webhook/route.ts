import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { handleWebhook } from '@/lib/creem'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('creem-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing Creem signature' },
      { status: 400 }
    )
  }

  try {
    const result = await handleWebhook(body, signature)

    if (result.success) {
      return NextResponse.json({ received: true })
    } else {
      return NextResponse.json(
        { error: result.error || 'Webhook processing failed' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
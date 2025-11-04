import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { verifyPayment } from '@/lib/creem'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const paymentId = searchParams.get('payment_id')
  const sessionId = searchParams.get('session_id')

  if (!paymentId) {
    return NextResponse.redirect('/pricing?error=missing_payment_id')
  }

  try {
    // Verify the payment
    const payment = await verifyPayment(paymentId)

    // Get user from session
    const supabase = createServerSupababaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect('/login?message=Please login to complete payment')
    }

    // Update user subscription status in database
    // TODO: Implement user subscription update in your database
    console.log('Payment verified for user:', user.id, 'Payment:', payment)

    // Redirect to success page
    return NextResponse.redirect('/pricing?success=true')
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.redirect('/pricing?error=payment_verification_failed')
  }
}
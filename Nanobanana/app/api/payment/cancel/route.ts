import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  // Log the cancellation
  console.log('Payment cancelled, session:', sessionId)

  // Redirect back to pricing page with cancellation message
  return NextResponse.redirect('/pricing?cancelled=true')
}
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (!error && data.session) {
        const redirectTo = `${origin}${next}`
        return NextResponse.redirect(redirectTo)
      }

      console.error('Google auth error:', error)
    } catch (error) {
      console.error('Google auth callback error:', error)
    }
  }

  // Return the user to an error page with some instructions
  const redirectTo = `${origin}/auth/auth-code-error`
  return NextResponse.redirect(redirectTo)
}
import { createClient } from '@supabase/supabase-js'
import { NextResponse, NextRequest } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)

  // Get auth token from request headers or cookies
  const authToken = requestHeaders.get('authorization')?.replace('Bearer ', '')

  // Update request headers with supabase auth
  if (authToken) {
    requestHeaders.set('supabase-auth-token', authToken)
  }

  // Allow access to public routes
  const publicRoutes = [
    '/',
    '/auth/auth-code-error',
    '/api/auth/login',
    '/api/auth/github',
    '/api/auth/logout',
  ]

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // For protected routes, verify the user session
  try {
    const { data: { user }, error } = await supabase.auth.getUser(authToken)

    if (error || !user) {
      // Redirect to home page if not authenticated
      const loginUrl = new URL('/', request.url)
      loginUrl.searchParams.set('message', 'Please login to access this page')
      return NextResponse.redirect(loginUrl)
    }

    // Add user info to headers for downstream usage
    requestHeaders.set('x-user-id', user.id)
    requestHeaders.set('x-user-email', user.email || '')

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    console.error('Middleware auth error:', error)

    // Redirect to home page on error
    const loginUrl = new URL('/', request.url)
    loginUrl.searchParams.set('message', 'Authentication error')
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
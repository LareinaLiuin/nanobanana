'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Authentication Error
          </CardTitle>
          <CardDescription>
            There was a problem signing you in. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 text-center">
            <p className="mb-2">
              This could happen for several reasons:
            </p>
            <ul className="text-left space-y-1">
              <li>• The authorization code has expired</li>
              <li>• There was a problem with the GitHub OAuth flow</li>
              <li>• The authentication session was interrupted</li>
            </ul>
          </div>
          <div className="space-y-2">
            <Link href="/" className="block w-full">
              <Button className="w-full">
                Go back to Homepage
              </Button>
            </Link>
            <Link href="/" className="block w-full">
              <Button variant="outline" className="w-full">
                Try Login Again
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
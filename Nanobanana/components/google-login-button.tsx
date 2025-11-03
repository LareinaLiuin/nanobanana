'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Chrome } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

interface GoogleLoginButtonProps {
  redirectTo?: string
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showIcon?: boolean
  children?: React.ReactNode
}

export function GoogleLoginButton({
  redirectTo,
  className,
  variant = 'default',
  size = 'default',
  showIcon = true,
  children,
}: GoogleLoginButtonProps) {
  const [loading, setLoading] = useState(false)
  const { loginWithGoogle } = useAuth()
  const { toast } = useToast()

  const handleLogin = async () => {
    try {
      setLoading(true)
      await loginWithGoogle(redirectTo)
    } catch (error) {
      console.error('Google login error:', error)
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'Failed to login with Google',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogin}
      disabled={loading}
      variant={variant}
      size={size}
      className={cn('gap-2', className)}
    >
      {showIcon && (
        <Chrome
          className={cn(
            'h-4 w-4',
            loading && 'animate-spin'
          )}
        />
      )}
      {children || (loading ? 'Signing in...' : 'Sign in with Google')}
    </Button>
  )
}
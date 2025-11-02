'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Github } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

interface GitHubLoginButtonProps {
  redirectTo?: string
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showIcon?: boolean
  children?: React.ReactNode
}

export function GitHubLoginButton({
  redirectTo,
  className,
  variant = 'default',
  size = 'default',
  showIcon = true,
  children,
}: GitHubLoginButtonProps) {
  const [loading, setLoading] = useState(false)
  const { loginWithGitHub } = useAuth()
  const { toast } = useToast()

  const handleLogin = async () => {
    try {
      setLoading(true)
      await loginWithGitHub(redirectTo)
    } catch (error) {
      console.error('GitHub login error:', error)
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'Failed to login with GitHub',
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
        <Github
          className={cn(
            'h-4 w-4',
            loading && 'animate-spin'
          )}
        />
      )}
      {children || (loading ? 'Signing in...' : 'Sign in with GitHub')}
    </Button>
  )
}
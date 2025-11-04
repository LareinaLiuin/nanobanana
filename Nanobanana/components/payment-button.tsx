'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { createPaymentSession } from '@/lib/creem'
import { useAuth } from '@/contexts/auth-context'

interface PaymentButtonProps {
  priceId: string
  planName: string
  price: string
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  children?: React.ReactNode
  disabled?: boolean
}

export function PaymentButton({
  priceId,
  planName,
  price,
  className,
  variant = 'default',
  size = 'default',
  children,
  disabled = false,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const handlePayment = async () => {
    if (disabled || !user) return

    try {
      setLoading(true)

      // Get user info from auth context
      const userId = user.id
      const userEmail = user.email || 'user@example.com'

      const paymentLink = await createPaymentSession(priceId, userId, userEmail)

      // Redirect to payment page
      if (paymentLink.url) {
        window.location.href = paymentLink.url
      } else {
        throw new Error('No payment URL returned')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast({
        title: 'Payment Failed',
        description: error instanceof Error ? error.message : 'Failed to process payment',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      className={className}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || `Subscribe to ${planName}`}
    </Button>
  )
}
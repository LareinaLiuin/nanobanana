// Direct API implementation for Creem
const CREEM_API_KEY = 'creem_test_66nSsCzRRp1c3gzwXIwwlL'
const CREEM_BASE_URL = 'https://api.creem.io/v1' // Adjust based on actual Creem API URL

// Payment plans mapping
export const paymentPlans = {
  'price_free': {
    name: 'Free',
    priceId: 'price_free',
    amount: 0, // $0.00 in cents
    currency: 'USD',
    interval: 'month'
  },
  'price_pro_monthly': {
    name: 'Pro Monthly',
    priceId: 'price_pro_monthly',
    amount: 1900, // $19.00 in cents
    currency: 'USD',
    interval: 'month'
  },
  'price_team_monthly': {
    name: 'Team Monthly',
    priceId: 'price_team_monthly',
    amount: 4900, // $49.00 in cents
    currency: 'USD',
    interval: 'month'
  },
  'price_enterprise': {
    name: 'Enterprise',
    priceId: 'price_enterprise',
    amount: 0, // Custom pricing - handled separately
    currency: 'USD',
    interval: 'month'
  }
}

// Create payment session - Mock implementation for testing
export async function createPaymentSession(priceId: string, userId: string, userEmail?: string) {
  try {
    const plan = paymentPlans[priceId as keyof typeof paymentPlans]
    if (!plan) {
      throw new Error('Invalid price ID')
    }

    // Handle Free plan - no payment needed
    if (priceId === 'price_free') {
      return {
        id: `free_${Date.now()}`,
        url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/payment/success?plan=free`,
        amount: 0,
        currency: plan.currency,
        name: `${plan.name} - Nano Banana AI`,
        description: 'Start using Free plan',
        metadata: {
          userId,
          priceId,
          plan: plan.name,
          userEmail
        },
        successUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/payment/success?plan=free`,
        cancelUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/payment/cancel`,
        status: 'completed'
      }
    }

    // Handle Enterprise plan - redirect to contact page
    if (priceId === 'price_enterprise') {
      return {
        id: `enterprise_${Date.now()}`,
        url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/contact`,
        amount: 0,
        currency: plan.currency,
        name: `${plan.name} - Nano Banana AI`,
        description: 'Contact us for Enterprise pricing',
        metadata: {
          userId,
          priceId,
          plan: plan.name,
          userEmail
        },
        successUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/contact`,
        cancelUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/pricing`,
        status: 'pending_contact'
      }
    }

    // Simulate API call delay for paid plans
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock successful payment session creation for paid plans
    const mockCheckout = {
      id: `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url: `https://checkout.creem.io/pay/${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: plan.amount,
      currency: plan.currency,
      name: `${plan.name} - Nano Banana AI`,
      description: `Subscribe to ${plan.name} plan`,
      metadata: {
        userId,
        priceId,
        plan: plan.name,
        userEmail
      },
      successUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/payment/success`,
      cancelUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/payment/cancel`,
      status: 'pending'
    }

    console.log('Mock checkout created:', mockCheckout)
    return mockCheckout
  } catch (error) {
    console.error('Error creating payment session:', error)
    throw error
  }
}

// Verify payment status - Mock implementation
export async function verifyPayment(paymentId: string) {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return {
      id: paymentId,
      status: 'completed',
      amount: 1900,
      currency: 'USD',
      created: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    throw error
  }
}

// Create customer links - Mock implementation
export async function createCustomer(userId: string, email: string, name?: string) {
  try {
    return {
      id: `customer_${Date.now()}`,
      email,
      name,
      userId,
      created: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error creating customer links:', error)
    throw error
  }
}

// Handle webhook - Mock implementation
export async function handleWebhook(event: any, signature: string) {
  try {
    const webhookData = typeof event === 'string' ? JSON.parse(event) : event
    console.log('Mock webhook received:', webhookData)
    return { success: true, data: webhookData }
  } catch (error) {
    console.error('Error handling webhook:', error)
    throw error
  }
}
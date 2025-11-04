'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Zap, Crown, Star } from 'lucide-react'
import { GitHubLoginButton } from '@/components/github-login-button'
import { GoogleLoginButton } from '@/components/google-login-button'
import { PaymentButton } from '@/components/payment-button'
import { useAuth } from '@/contexts/auth-context'

const plans = [
  {
    name: 'Free',
    price: 'Free',
    description: 'Perfect for trying out Nano Banana AI',
    priceId: 'price_free',
    features: [
      '10 AI edits per month',
      'Basic image processing',
      'Standard quality output',
      'Community support',
      'Watermarked images'
    ],
    excluded: [],
    popular: false,
    color: 'bg-gray-50 border-gray-200'
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For professionals and content creators',
    priceId: 'price_pro_monthly',
    features: [
      'Unlimited AI edits',
      'Advanced image processing',
      'High-quality output',
      'Priority support',
      'No watermarks',
      'Batch processing',
      'Custom styles',
      'API access'
    ],
    excluded: [],
    popular: true,
    color: 'bg-blue-50 border-blue-200'
  },
  {
    name: 'Team',
    price: '$49',
    period: '/month',
    description: 'For teams and small businesses',
    priceId: 'price_team_monthly',
    features: [
      'Everything in Pro',
      '5 team members',
      'Team collaboration',
      'Shared workspace',
      'Admin dashboard',
      'Usage analytics',
      'Priority customer support',
      'Custom branding'
    ],
    excluded: [],
    popular: false,
    color: 'bg-purple-50 border-purple-200'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs',
    priceId: 'price_enterprise',
    features: [
      'Everything in Team',
      'Unlimited team members',
      'Custom AI models',
      'On-premise deployment',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations',
      'White-label options'
    ],
    excluded: [],
    popular: false,
    color: 'bg-green-50 border-green-200'
  }
]

export default function PricingClient() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock the full power of AI image editing with Nano Banana AI.
              Start free and scale as you grow.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''} ${plan.color} hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                  {plan.name === 'Enterprise' && <Crown className="h-6 w-6 text-green-600" />}
                  {plan.name === 'Team' && <Zap className="h-6 w-6 text-purple-600" />}
                  {plan.name}
                </CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">{plan.period}</span>}
                </div>
                <CardDescription className="text-sm">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.excluded.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 opacity-50">
                      <div className="h-5 w-5 border-2 border-gray-300 rounded-full flex-shrink-0 mt-0.5"></div>
                      <span className="text-sm text-gray-500 line-through">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-3">
                  {plan.name === 'Free' ? (
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started Free
                    </Button>
                  ) : user ? (
                    <PaymentButton
                      priceId={plan.priceId}
                      planName={plan.name}
                      price={plan.price}
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Subscribe to {plan.name}
                    </PaymentButton>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-center text-sm text-gray-500 mb-2">
                        Login to subscribe
                      </div>
                      <div className="flex gap-2">
                        <GitHubLoginButton
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-xs"
                          showIcon={true}
                        >
                          GitHub
                        </GitHubLoginButton>
                        <GoogleLoginButton
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-xs"
                          showIcon={true}
                        >
                          Google
                        </GoogleLoginButton>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our pricing and features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and various local payment methods through Creem.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! Our Free plan is always available with no time limit, so you can try before you buy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely. You can cancel your subscription at any time, and you'll continue to have access until the end of your billing period.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
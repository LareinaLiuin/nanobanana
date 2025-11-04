# Creem Payment Integration Setup Guide

This guide explains how to set up Creem payment integration for the Nano Banana AI project.

## Overview

The Nano Banana AI project now supports premium subscription plans through Creem payment processing. Users can:

- View pricing plans on the `/pricing` page
- Subscribe to Pro, Team, or Enterprise plans
- Pay securely through Creem's payment system
- Get redirected back after successful/failed payments

## Prerequisites

- A Creem account (sign up at [creem.io](https://creem.io))
- Creem API keys and webhook secret
- Nano Banana project running locally

## Step 1: Get Your Creem Credentials

1. Sign in to your [Creem dashboard](https://dashboard.creem.io)
2. Navigate to **Settings** → **API Keys**
3. Copy your credentials:
   - **API Key**: Used for creating payment sessions
   - **Secret Key**: Used for webhook verification
   - **Webhook Secret**: Used to secure webhook endpoints

## Step 2: Configure Environment Variables

Update your `.env.local` file with your Creem credentials:

```env
# Creem Payment Configuration
# Get these from your Creem dashboard → Settings → API Keys
CREEM_API_KEY=ck_live_your_actual_api_key_here
CREEM_SECRET_KEY=sk_live_your_actual_secret_key_here
CREEM_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here
```

### Finding Your Creem Credentials

1. **API Key**: Dashboard → Settings → API Keys → Publishable Key
2. **Secret Key**: Dashboard → Settings → API Keys → Secret Key
3. **Webhook Secret**: Dashboard → Settings → Webhooks → Webhook Secret

## Step 3: Configure Pricing Plans

The pricing plans are defined in `app/pricing/page.tsx`:

```typescript
const plans = [
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    priceId: 'price_pro_monthly', // This should match your Creem price ID
    features: [...]
  },
  // ... other plans
]
```

### To update pricing plans:

1. Go to your **Creem dashboard** → **Products**
2. Create products for each plan (Pro, Team, Enterprise)
3. Copy the **Price IDs** from Creem
4. Update the `priceId` values in `app/pricing/page.tsx`

## Step 4: Configure Webhooks

Set up webhooks in your Creem dashboard to receive payment events:

1. Go to **Creem dashboard** → **Settings** → **Webhooks**
2. Add webhook endpoint: `https://yourdomain.com/api/payment/webhook`
3. For local testing, use: `http://localhost:3000/api/payment/webhook`
4. Enable these webhook events:
   - `payment.succeeded`
   - `payment.failed`
   - `payment.canceled`

## Step 5: Test the Payment Flow

### Local Testing:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000/pricing](http://localhost:3000/pricing)

3. Sign in with GitHub or Google

4. Click "Subscribe to Pro" (or any paid plan)

5. You'll be redirected to Creem's payment page

6. Complete the test payment using Creem's test card details

### Production Testing:

1. Deploy your application to production
2. Update webhook endpoints to your production domain
3. Test with real payment methods

## Payment Flow Architecture

```
User clicks Subscribe
       ↓
PaymentButton component
       ↓
createPaymentSession() (lib/creem.ts)
       ↓
Creem API → Payment URL
       ↓
Redirect to Creem checkout
       ↓
User completes payment
       ↓
Webhook to /api/payment/webhook
       ↓
Update user subscription status
       ↓
Redirect to success/cancel page
```

## Files Involved

- **`app/pricing/page.tsx`** - Pricing page with payment buttons
- **`components/payment-button.tsx`** - Payment button component
- **`lib/creem.ts`** - Creem API integration
- **`app/api/payment/create/route.ts`** - Create payment session API
- **`app/api/payment/success/route.ts`** - Payment success handler
- **`app/api/payment/cancel/route.ts`** - Payment cancel handler
- **`app/api/payment/webhook/route.ts`** - Webhook event handler

## Security Considerations

- Never expose the `CREEM_SECRET_KEY` on the client side
- Always verify webhook signatures using `CREEM_WEBHOOK_SECRET`
- Use HTTPS in production for all API endpoints
- Validate user authentication before creating payment sessions

## Troubleshooting

### Common Issues

1. **"Payment session creation failed"**:
   - Check that `CREEM_API_KEY` is correctly set
   - Verify the price ID exists in your Creem dashboard
   - Ensure user is authenticated

2. **"Webhook verification failed"**:
   - Check that `CREEM_WEBHOOK_SECRET` matches your dashboard
   - Ensure webhook URL is accessible from Creem's servers

3. **"No payment URL returned"**:
   - Verify Creem API connectivity
   - Check price ID validity
   - Review Creem dashboard for any API restrictions

### Debug Mode

To enable debug logging, add this to your environment:
```env
NODE_ENV=development
DEBUG=creem:*
```

## Next Steps

1. Set up user subscription tracking in your database
2. Implement subscription management (upgrade/downgrade/cancel)
3. Add usage-based billing for API calls
4. Set up customer support workflows
5. Configure email notifications for payment events

## Support

If you encounter issues:

1. Check the [Creem documentation](https://docs.creem.io)
2. Review your Creem dashboard for API errors
3. Check server logs for detailed error messages
4. Ensure all environment variables are correctly configured

---

## Environment Variables Reference

```env
# Required for payment processing
CREEM_API_KEY=ck_live_your_api_key          # Creem publishable API key
CREEM_SECRET_KEY=sk_live_your_secret_key    # Creem secret API key
CREEM_WEBHOOK_SECRET=whsec_your_webhook_secret # Webhook verification secret

# Optional configuration
NODE_ENV=production                         # Set to 'production' for live mode
```
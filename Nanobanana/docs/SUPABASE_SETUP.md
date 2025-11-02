# Supabase GitHub Authentication Setup Guide

This guide will walk you through setting up GitHub OAuth authentication with Supabase for the Nano Banana project.

## Prerequisites

- A Supabase account (free tier is sufficient)
- A GitHub account
- Nano Banana project set up locally

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with your GitHub account or create a new account
4. Click "New Project"
5. Choose your organization
6. Fill in project details:
   - **Project Name**: `nanobanana-auth` (or your preferred name)
   - **Database Password**: Use a strong password and save it
   - **Region**: Choose the closest region to your users
7. Click "Create new project"
8. Wait for the project to be provisioned (2-3 minutes)

## Step 2: Configure GitHub OAuth in Supabase

1. In your Supabase project dashboard, go to **Authentication** → **Providers**
2. Find **GitHub** in the list and click it
3. **Enable** the GitHub provider
4. You'll need to create a GitHub OAuth App first (see Step 3)
5. After creating the GitHub OAuth App, enter:
   - **Client ID**: Your GitHub OAuth App Client ID
   - **Client Secret**: Your GitHub OAuth App Client Secret
6. Click **Save**

## Step 3: Create a GitHub OAuth App

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in the form:
   - **Application name**: `Nano Banana AI`
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**:
     ```
     https://[YOUR-SUPABASE-PROJECT-ID].supabase.co/auth/v1/callback
     ```
     *Get this URL from your Supabase project settings → API → URL*
4. Click "Register application"
5. **Copy the Client ID** - you'll need this for Supabase
6. Click "Generate a new client secret"
7. **Copy the Client Secret** - save this securely (you won't see it again)

## Step 4: Configure Environment Variables

Update your `.env.local` file with your Supabase and GitHub credentials:

```env
# Supabase Configuration
# Get these from your Supabase project settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# GitHub OAuth Configuration
# Get these from your GitHub OAuth App settings
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### Finding Your Supabase Credentials

1. **Supabase URL**: Project settings → API → Project URL
2. **Anon Key**: Project settings → API → `anon` public key
3. **Service Role Key**: Project settings → API → `service_role` key (keep this secret!)

## Step 5: Database Setup (Optional)

If you want to store user profiles or additional user data:

1. Go to **Table Editor** in Supabase dashboard
2. Click "Create a new table"
3. Example table for user profiles:
   ```sql
   CREATE TABLE user_profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     username TEXT UNIQUE,
     full_name TEXT,
     avatar_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

## Step 6: Test the Authentication

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. Click "Sign in with GitHub" or "Start Editing"

4. You should be redirected to GitHub for authorization

5. After authorizing, you'll be redirected back to your app

6. The user profile should appear in the header

## Step 7: Production Deployment

For production deployment:

1. **Update environment variables** in your hosting platform:
   - `NEXTAUTH_URL`: Your production domain
   - `NEXT_PUBLIC_SUPABASE_URL`: Your production Supabase URL
   - Update GitHub OAuth App callback URL to your production domain

2. **Configure GitHub OAuth App for production**:
   - Add your production URL: `https://your-domain.com`
   - Update callback URL: `https://your-domain.com/api/auth/callback`

3. **Configure Supabase for production**:
   - Add your production URL to allowed redirect URLs in Supabase auth settings

## Features Implemented

- ✅ GitHub OAuth login/logout
- ✅ Server-side authentication with session management
- ✅ Protected API routes
- ✅ User profile display with avatar
- ✅ Authentication middleware
- ✅ Error handling for auth failures
- ✅ Responsive UI components

## Troubleshooting

### Common Issues

1. **"Invalid redirect_uri" error**:
   - Check that your GitHub OAuth App callback URL matches exactly
   - Ensure it's the Supabase callback URL, not your app URL

2. **"Missing environment variables" error**:
   - Verify all required variables are in `.env.local`
   - Restart your development server after updating env vars

3. **Authentication not persisting**:
   - Check browser console for errors
   - Verify cookies are being set
   - Ensure your redirect URLs are properly configured

4. **CORS issues**:
   - Add your domain to Supabase auth settings → Site URL
   - Add to Redirect URLs list

### Debug Mode

To enable debug logging, add this to your Supabase client configuration:

```typescript
const supabase = createClient(url, key, {
  auth: {
    debug: true, // Enable debug logs
  },
})
```

## Security Considerations

- Never expose the `SUPABASE_SERVICE_ROLE_KEY` on the client side
- Use Row Level Security (RLS) in Supabase for data access control
- Validate user permissions on the server side
- Keep your GitHub Client Secret secure
- Use HTTPS in production

## Next Steps

1. Implement Row Level Security (RLS) policies in Supabase
2. Add user role management
3. Implement protected routes that require specific permissions
4. Add email verification if needed
5. Set up logging and monitoring for authentication events

---

## Support

If you run into issues:

1. Check the [Supabase Auth documentation](https://supabase.com/docs/guides/auth)
2. Review [GitHub OAuth App documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
3. Check browser console and server logs for error details
4. Ensure all environment variables are correctly set
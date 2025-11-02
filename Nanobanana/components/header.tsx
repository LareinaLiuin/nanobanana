'use client'

import Link from "next/link"
import { GitHubLoginButton } from "./github-login-button"
import { UserProfile } from "./user-profile"
import { useAuth } from "@/contexts/auth-context"

export default function Header() {
  const { user, loading } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🍌</span>
            <span className="text-gray-900">Nano Banana</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#examples" className="text-gray-600 hover:text-gray-900 transition">
              Examples
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition">
              Testimonials
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-gray-900 transition">
              FAQ
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition">
              Pricing
            </Link>
          </nav>

          {/* Authentication */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : user ? (
              <UserProfile />
            ) : (
              <>
                <GitHubLoginButton
                  variant="ghost"
                  size="sm"
                  className="text-gray-900 hover:bg-gray-100 rounded-full"
                >
                  Sign In
                </GitHubLoginButton>
                <GitHubLoginButton
                  variant="default"
                  size="sm"
                  className="bg-primary hover:bg-yellow-500 rounded-full"
                >
                  Start Editing
                </GitHubLoginButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

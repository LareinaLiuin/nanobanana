import Link from "next/link"

export default function Header() {
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

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-full transition">
              Sign In
            </button>
            <button className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-yellow-500 rounded-full transition">
              Start Editing
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

/**
 * Header Component
 * Site header with navigation
 */

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-centre justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-900">
            Disaster Recovery
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/services" className="hover:text-blue-600">Services</Link>
            <Link href="/locations" className="hover:text-blue-600">Locations</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/contact" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Emergency Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

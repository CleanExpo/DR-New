import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-900">
            Disaster Recovery
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">
              Services
            </Link>
            <Link href="/service-areas" className="text-gray-700 hover:text-blue-600 font-medium">
              Service Areas
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
          </nav>

          {/* Emergency CTA */}
          <Link
            href="tel:1300309361"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            1300 309 361
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-around py-3 border-t border-gray-200 bg-gray-50">
        <Link href="/services" className="text-sm text-gray-700 hover:text-blue-600 font-medium">
          Services
        </Link>
        <Link href="/service-areas" className="text-sm text-gray-700 hover:text-blue-600 font-medium">
          Areas
        </Link>
        <Link href="/contact" className="text-sm text-gray-700 hover:text-blue-600 font-medium">
          Contact
        </Link>
      </nav>
    </header>
  );
}

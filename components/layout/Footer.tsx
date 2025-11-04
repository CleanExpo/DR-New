/**
 * Footer Component
 * Simple footer for the website
 */

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Disaster Recovery</h3>
            <p className="text-gray-400">Professional restoration services in Brisbane, Ipswich & Logan</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services/water-damage" className="hover:text-white">Water Damage</Link></li>
              <li><Link href="/services/fire-damage" className="hover:text-white">Fire Damage</Link></li>
              <li><Link href="/services/mold-remediation" className="hover:text-white">Mold Remediation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Areas</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/locations" className="hover:text-white">Service Areas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">24/7 Emergency Response</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Disaster Recovery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

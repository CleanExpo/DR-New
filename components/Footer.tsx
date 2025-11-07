import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Disaster Recovery</h3>
            <p className="text-gray-400 mb-4">
              IICRC Master Restorer providing 24/7 emergency restoration services across Brisbane, Ipswich, and Logan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about-phil-mcgurk" className="text-gray-400 hover:text-white">
                  About Phill McGurk
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="text-gray-400 hover:text-white">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/water-damage-restoration" className="text-gray-400 hover:text-white">
                  Water Damage
                </Link>
              </li>
              <li>
                <Link href="/services/fire-damage-restoration" className="text-gray-400 hover:text-white">
                  Fire Damage
                </Link>
              </li>
              <li>
                <Link href="/services/mould-remediation" className="text-gray-400 hover:text-white">
                  Mould Remediation
                </Link>
              </li>
              <li>
                <Link href="/services/storm-damage" className="text-gray-400 hover:text-white">
                  Storm Damage
                </Link>
              </li>
            </ul>
          </div>

          {/* NRPG & CARSI */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Contractors</h4>
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-bold text-blue-400 mb-2">NRPG</h5>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about-nrpg" className="text-gray-400 hover:text-white text-sm">
                      About NRPG
                    </Link>
                  </li>
                  <li>
                    <Link href="/nrpg" className="text-gray-400 hover:text-white text-sm">
                      Member Benefits
                    </Link>
                  </li>
                  <li>
                    <Link href="/nrpg" className="text-gray-400 hover:text-white text-sm">
                      Join Network
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-bold text-green-400 mb-2">CARSI</h5>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about-carsi" className="text-gray-400 hover:text-white text-sm">
                      About CARSI
                    </Link>
                  </li>
                  <li>
                    <Link href="/carsi" className="text-gray-400 hover:text-white text-sm">
                      Online Training
                    </Link>
                  </li>
                  <li>
                    <Link href="/training" className="text-gray-400 hover:text-white text-sm">
                      Course Catalog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:1300309361" className="text-gray-400 hover:text-white">
                  1300 309 361
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span className="text-gray-400">
                  4/17 Tile St<br />
                  Wacol, QLD 4076
                </span>
              </li>
              <li className="text-yellow-400 font-semibold">
                24/7 Emergency Service
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Disaster Recovery. All rights reserved.</p>
          <p className="mt-2 text-sm">
            IICRC Master Restorer | Brisbane | Ipswich | Logan
          </p>
        </div>
      </div>
    </footer>
  );
}

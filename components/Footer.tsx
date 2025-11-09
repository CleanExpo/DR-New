import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

/**
 * FOOTER WITH CONSISTENT NAP
 * Critical for local SEO - NAP must be identical across all pages
 */
export default function Footer() {
  // MASTER NAP - DO NOT CHANGE
  const NAP = {
    businessName: 'Disaster Recovery Brisbane',
    phone: '1300 309 361',
    phoneHref: 'tel:1300309361',
    email: 'admin@disasterrecovery.com.au',
    address: {
      street: '4/17 Tile St',
      locality: 'Wacol',
      region: 'QLD',
      postcode: '4076',
      country: 'Australia'
    },
    serviceAreas: ['Brisbane', 'Ipswich', 'Logan', 'QLD']
  };

  return (
    <footer className="bg-gray-900 text-white py-12" itemScope itemType="https://schema.org/LocalBusiness">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Company Info - Structured Data */}
          <div>
            <h3 className="text-xl font-bold mb-4" itemProp="name">{NAP.businessName}</h3>
            <p className="text-gray-400 mb-4" itemProp="description">
              IICRC Master Restorer providing 24/7 emergency restoration services across Brisbane, Ipswich, and Logan.
            </p>
            <meta itemProp="url" content="https://dr-new-ten.vercel.app" />
            <meta itemProp="priceRange" content="$$" />
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

          {/* Contact - NAP Structured Data */}
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <a
                  href={NAP.phoneHref}
                  className="text-gray-400 hover:text-white"
                  itemProp="telephone"
                >
                  {NAP.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <a
                  href={`mailto:${NAP.email}`}
                  className="text-gray-400 hover:text-white"
                  itemProp="email"
                >
                  {NAP.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" aria-hidden="true" />
                <span className="text-gray-400">
                  <span itemProp="streetAddress">{NAP.address.street}</span><br />
                  <span itemProp="addressLocality">{NAP.address.locality}</span>, <span itemProp="addressRegion">{NAP.address.region}</span> <span itemProp="postalCode">{NAP.address.postcode}</span>
                  <meta itemProp="addressCountry" content={NAP.address.country} />
                </span>
              </li>
              <li className="text-yellow-400 font-semibold">
                24/7 Emergency Service
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          {/* Service Areas - Local SEO */}
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">Service Areas</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'Hamilton Brisbane',
                'Ascot Brisbane',
                'New Farm Brisbane',
                'Toowong Brisbane',
                'Karalee Ipswich',
                'Brookwater Ipswich',
                'Springfield Lakes',
                'Logan Central',
                'Brisbane CBD',
                'Fortitude Valley',
                'West End Brisbane',
                'Indooroopilly',
                'Paddington Brisbane',
                'Taringa',
                'All Brisbane Suburbs',
                'All Ipswich Suburbs',
                'All Logan Suburbs'
              ].map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                  itemProp="areaServed"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} {NAP.businessName}. All rights reserved.</p>
            <p className="mt-2 text-sm">
              IICRC Master Restorer | Brisbane | Ipswich | Logan | Queensland
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Emergency Water Damage | Fire Damage | Flood Recovery | Storm Damage | Mould Remediation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

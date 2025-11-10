import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

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
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info Column */}
          <div>
            <h3 className="text-xl font-bold mb-4" itemProp="name">{NAP.businessName}</h3>
            <p className="text-gray-400 mb-4" itemProp="description">
              IICRC Master Restorer providing 24/7 emergency restoration services across Brisbane, Ipswich, and Logan.
            </p>
            <meta itemProp="url" content="https://disasterrecovery.com.au" />
            <meta itemProp="priceRange" content="$$" />

            {/* Emergency Badge */}
            <div className="mt-4 p-3 bg-red-600 rounded-lg text-center">
              <div className="text-sm font-semibold">24/7 Emergency Service</div>
              <div className="text-xl font-bold">{NAP.phone}</div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/water-damage-restoration" className="text-gray-400 hover:text-white transition-colors">
                  Water Damage Restoration
                </Link>
              </li>
              <li>
                <Link href="/services/fire-damage-restoration" className="text-gray-400 hover:text-white transition-colors">
                  Fire Damage Restoration
                </Link>
              </li>
              <li>
                <Link href="/services/mould-remediation" className="text-gray-400 hover:text-white transition-colors">
                  Mould Remediation
                </Link>
              </li>
              <li>
                <Link href="/services/storm-damage-restoration" className="text-gray-400 hover:text-white transition-colors">
                  Storm Damage
                </Link>
              </li>
              <li>
                <Link href="/services/flood-water-restoration" className="text-gray-400 hover:text-white transition-colors">
                  Flood Restoration
                </Link>
              </li>
              <li>
                <Link href="/services/commercial-water-damage" className="text-gray-400 hover:text-white transition-colors">
                  Commercial Services
                </Link>
              </li>
              <li>
                <Link href="/services/24-7-emergency-water-damage" className="text-gray-400 hover:text-white transition-colors">
                  24/7 Emergency Response
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Locations</h4>
            <ul className="space-y-2">
              <li className="text-sm font-semibold text-gray-400">Brisbane</li>
              <li>
                <Link href="/locations/hamilton" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Hamilton
                </Link>
              </li>
              <li>
                <Link href="/locations/ascot" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Ascot
                </Link>
              </li>
              <li>
                <Link href="/locations/new-farm" className="text-gray-400 hover:text-white transition-colors text-sm">
                  New Farm
                </Link>
              </li>
              <li>
                <Link href="/locations/brisbane" className="text-gray-400 hover:text-white transition-colors text-sm">
                  All Brisbane Suburbs
                </Link>
              </li>
              <li className="text-sm font-semibold text-gray-400 mt-3">Other Areas</li>
              <li>
                <Link href="/locations/ipswich" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Ipswich
                </Link>
              </li>
              <li>
                <Link href="/locations/logan" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Logan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Insurance Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <a
                    href={NAP.phoneHref}
                    className="text-gray-400 hover:text-white transition-colors"
                    itemProp="telephone"
                  >
                    {NAP.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <a
                    href={`mailto:${NAP.email}`}
                    className="text-gray-400 hover:text-white transition-colors"
                    itemProp="email"
                  >
                    {NAP.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" aria-hidden="true" />
                  <span className="text-gray-400 text-sm">
                    <span itemProp="streetAddress">{NAP.address.street}</span><br />
                    <span itemProp="addressLocality">{NAP.address.locality}</span>, <span itemProp="addressRegion">{NAP.address.region}</span> <span itemProp="postalCode">{NAP.address.postcode}</span>
                    <meta itemProp="addressCountry" content={NAP.address.country} />
                  </span>
                </li>
              </ul>
            </div>

            <h4 className="text-lg font-semibold mb-3">Insurance Partners</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/insurance/allianz" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Allianz
                </Link>
              </li>
              <li>
                <Link href="/insurance/suncorp" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Suncorp
                </Link>
              </li>
              <li>
                <Link href="/insurance/racq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  RACQ
                </Link>
              </li>
              <li>
                <Link href="/insurance/qbe" className="text-gray-400 hover:text-white transition-colors text-sm">
                  QBE
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold">
                  View All Partners →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* IICRC Certification Badge */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-center md:text-left">
              <div className="bg-blue-900 text-white px-6 py-4 rounded-lg inline-block">
                <div className="text-sm font-semibold">IICRC Certified</div>
                <div className="text-xl font-bold">Master Restorer</div>
                <div className="text-xs text-gray-300 mt-1">Phill McGurk - Brisbane</div>
              </div>
            </div>
            <div className="text-center md:text-left text-gray-400 text-sm max-w-md">
              <p>
                One of the few IICRC Master Restorer certified professionals in Queensland, providing expert restoration services with the highest industry standards.
              </p>
            </div>
          </div>
        </div>

        {/* Service Areas Tags */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-lg font-semibold text-white mb-4 text-center">We Service</h4>
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

        {/* Bottom Bar - Copyright & Legal */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left text-gray-400">
              <p>&copy; {new Date().getFullYear()} {NAP.businessName}. All rights reserved.</p>
              <p className="mt-1 text-sm">
                IICRC Master Restorer | Brisbane | Ipswich | Logan | Queensland
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-gray-500">
            Emergency Water Damage | Fire Damage | Flood Recovery | Storm Damage | Mould Remediation | 24/7 Response
          </p>
        </div>
      </div>
    </footer>
  );
}

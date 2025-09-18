import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="footer-navigation" className="bg-gray-900 text-white" role="contentinfo" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/images/logos/disaster-recovery-logo.png"
                alt="Disaster Recovery Brisbane"
                width={200}
                height={60}
                className="h-16 w-auto bg-white rounded-lg p-2"
              
            quality={80}
          
            loading="lazy"
          
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional disaster recovery services across Brisbane, Ipswich, and Logan.
              24/7 emergency response for water damage, fire damage, and mould remediation.
            </p>
          </div>

          {/* Services */}
          <div role="navigation" aria-labelledby="footer-services-heading">
            <h4 id="footer-services-heading" className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/water-damage" className="text-gray-300 hover:text-primary-400 transition-colors">Water Damage Restoration</Link></li>
              <li><Link href="/services/fire-damage" className="text-gray-300 hover:text-primary-400 transition-colors">Fire Damage Restoration</Link></li>
              <li><Link href="/services/mould-remediation" className="text-gray-300 hover:text-primary-400 transition-colors">Mould Remediation</Link></li>
              <li><Link href="/services/storm-damage" className="text-gray-300 hover:text-primary-400 transition-colors">Storm Damage Repair</Link></li>
              <li><Link href="/services/biohazard" className="text-gray-300 hover:text-primary-400 transition-colors">Biohazard Cleanup</Link></li>
              <li><Link href="/services/sewage" className="text-gray-300 hover:text-primary-400 transition-colors">Sewage Cleanup</Link></li>
              <li><Link href="/services/commercial" className="text-gray-300 hover:text-primary-400 transition-colors">Commercial Restoration</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div role="navigation" aria-labelledby="footer-areas-heading">
            <h4 id="footer-areas-heading" className="text-lg font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2">
              <li><Link href="/locations/brisbane" className="text-gray-300 hover:text-primary-400 transition-colors">Brisbane CBD</Link></li>
              <li><Link href="/locations/brisbane" className="text-gray-300 hover:text-primary-400 transition-colors">North Brisbane</Link></li>
              <li><Link href="/locations/brisbane" className="text-gray-300 hover:text-primary-400 transition-colors">South Brisbane</Link></li>
              <li><Link href="/locations/brisbane" className="text-gray-300 hover:text-primary-400 transition-colors">West Brisbane</Link></li>
              <li><Link href="/locations/brisbane" className="text-gray-300 hover:text-primary-400 transition-colors">East Brisbane</Link></li>
              <li><Link href="/locations/ipswich" className="text-gray-300 hover:text-primary-400 transition-colors">Ipswich</Link></li>
              <li><Link href="/locations/logan" className="text-gray-300 hover:text-primary-400 transition-colors">Logan</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div role="navigation" aria-labelledby="footer-quick-links-heading">
            <h4 id="footer-quick-links-heading" className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link href="/pricing" className="text-gray-300 hover:text-primary-400 transition-colors">Pricing</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-primary-400 transition-colors">FAQ</Link></li>
              <li><Link href="/reviews" className="text-gray-300 hover:text-primary-400 transition-colors">Reviews</Link></li>
              <li><Link href="/insurance-guide" className="text-gray-300 hover:text-primary-400 transition-colors">Insurance Guide</Link></li>
              <li><Link href="/insurance-partners" className="text-gray-300 hover:text-primary-400 transition-colors">Insurance Partners</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div role="navigation" aria-labelledby="footer-contact-heading">
            <h4 id="footer-contact-heading" className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-emergency-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div>
                  <p className="text-emergency-400 font-bold">24/7 Emergency</p>
                  <a href="tel:1300309361" className="text-white font-bold text-lg hover:text-primary-400 transition-colors" aria-label="Call emergency number 1300 309 361">1300 309 361</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <div>
                  <p className="text-gray-300">Email</p>
                  <a href="mailto:admin@disasterrecovery.com.au" className="text-white hover:text-primary-400 transition-colors" aria-label="Email admin@disasterrecovery.com.au">admin@disasterrecovery.com.au</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p className="text-gray-300">Address</p>
                  <p className="text-white">4/17 Tile St<br/>Wacol, QLD 4076</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 7a1 1 0 012 0v4a1 1 0 01-1 1H7a1 1 0 010-2h1V7z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p className="text-gray-300">Opening Hours</p>
                  <p className="text-white">24/7 Emergency<br/>Water Damage Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" role="navigation" aria-label="Legal links">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Disaster Recovery Brisbane. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Terms of Service</Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Accessibility</Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
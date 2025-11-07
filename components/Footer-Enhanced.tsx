import Link from 'next/link';
import { Phone, Mail, MapPin, Shield, Clock, Award, Facebook, Linkedin } from 'lucide-react';

export default function FooterEnhanced() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-white">
                    Disaster Recovery
                  </div>
                  <div className="text-xs text-neutral-400">
                    Master Restorer
                  </div>
                </div>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                IICRC & RAI Master Restorer providing 24/7 emergency restoration services across Brisbane, Ipswich, and Logan.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-premium-500/10 border border-premium-500/20 rounded-lg">
                <Award className="w-4 h-4 text-premium-400" />
                <span className="text-xs font-semibold text-premium-400">IICRC Master</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-success-500/10 border border-success-500/20 rounded-lg">
                <Shield className="w-4 h-4 text-success-400" />
                <span className="text-xs font-semibold text-success-400">RAI Certified</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2">
              Quick Links
              <div className="h-px flex-1 bg-gradient-to-r from-primary-500/30 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about-phil-mcgurk"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Phill McGurk
                </Link>
              </li>
              <li>
                <Link
                  href="/service-areas"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Service Areas
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/book-service"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Book Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2">
              Services
              <div className="h-px flex-1 bg-gradient-to-r from-primary-500/30 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/water-damage-restoration"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Water Damage
                </Link>
              </li>
              <li>
                <Link
                  href="/services/fire-damage-restoration"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Fire Damage
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mould-remediation"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Mould Remediation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/storm-damage"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Storm Damage
                </Link>
              </li>
              <li>
                <Link
                  href="/services/commercial"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Commercial Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2">
              Contact
              <div className="h-px flex-1 bg-gradient-to-r from-primary-500/30 to-transparent"></div>
            </h3>
            <div className="space-y-4">
              {/* Emergency Phone */}
              <Link
                href="tel:1300309361"
                className="flex items-start gap-3 p-3 bg-emergency-500/10 border border-emergency-500/20 rounded-lg hover:bg-emergency-500/20 transition-colors duration-200 group"
              >
                <Phone className="w-5 h-5 text-emergency-400 flex-shrink-0 mt-0.5 group-hover:animate-pulse" />
                <div>
                  <div className="text-xs text-emergency-400 font-semibold mb-0.5">
                    24/7 Emergency
                  </div>
                  <div className="text-white font-bold text-lg">
                    1300 309 361
                  </div>
                </div>
              </Link>

              {/* Address */}
              <div className="flex items-start gap-3 text-neutral-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary-400" />
                <div className="text-sm leading-relaxed">
                  <strong className="text-white block mb-1">Brisbane Office</strong>
                  4/17 Tile St<br />
                  Wacol, QLD 4076
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 text-neutral-400">
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5 text-success-400" />
                <div className="text-sm">
                  <strong className="text-white block mb-1">Available</strong>
                  24 Hours, 7 Days a Week
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-neutral-500 text-sm text-center md:text-left">
              <p>
                &copy; {currentYear} Disaster Recovery Brisbane. All rights reserved.
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                IICRC & RAI Master Restorer | ABN: [Your ABN] | QBCC Licence: [Your Licence]
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/legal/privacy-policy"
                className="text-neutral-500 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal/terms-of-service"
                className="text-neutral-500 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-neutral-500 hover:text-white transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency CTA Strip */}
      <div className="bg-gradient-to-r from-emergency-600 to-emergency-700 py-4">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-sm md:text-base">
                Emergency? We're Available Right Now
              </span>
            </div>
            <Link
              href="tel:1300309361"
              className="inline-flex items-center gap-2 px-6 py-2 bg-white text-emergency-600 font-bold rounded-lg hover:bg-neutral-100 transition-colors duration-200 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Call 1300 309 361
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import {
  BUSINESS_NAME,
  PHONE,
  EMAIL,
  ADDRESS,
  ABN,
  CERTIFICATIONS,
  SERVICE_AREAS,
  SERVICES,
  SOCIAL_MEDIA
} from '@/lib/constants';
import {
  MapPin,
  Mail,
  Phone as PhoneIcon,
  Clock,
  Shield,
  Award,
  Facebook,
  Instagram,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="lg" darkMode />
              <div>
                <h3 className="text-lg font-bold">{BUSINESS_NAME}</h3>
                <p className="text-sm text-gray-400">Brisbane Emergency Response</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-red-500" />
                <a href={`tel:${PHONE}`} className="hover:text-white transition-colors">
                  {PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-500" />
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
                  {EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-500" />
                <span>24/7 Emergency Response</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {SERVICES.map((service, index) => (
                <li key={index}>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Service Areas</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {SERVICE_AREAS.map((area, index) => (
                <li key={index} className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-blue-500" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications & Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Certifications</h4>
            <div className="space-y-2">
              {CERTIFICATIONS.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <Shield className="h-4 w-4 text-yellow-500" />
                  {cert}
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <h5 className="font-semibold">Follow Us</h5>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_MEDIA.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_MEDIA.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_MEDIA.google.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Google Business"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency CTA */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="bg-red-600 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Emergency? Call Now!</h3>
            <a
              href={`tel:${PHONE}`}
              className="text-2xl font-bold hover:text-red-200 transition-colors"
            >
              {PHONE}
            </a>
            <p className="text-sm mt-2 text-red-100">
              Available 24/7 • Response within 1 hour • Brisbane Metro
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <p>&copy; {currentYear} {BUSINESS_NAME}. All rights reserved.</p>
            <p>ABN: {ABN}</p>
          </div>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
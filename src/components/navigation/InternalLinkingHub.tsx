'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Droplets, Flame, Wind, Home, Building2,
  MapPin, Clock, DollarSign, FileText, Shield,
  ChevronRight, ArrowRight, TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceHub {
  title: string;
  icon: React.ElementType;
  description: string;
  mainLink: string;
  subLinks: Array<{
    label: string;
    href: string;
    badge?: string;
  }>;
}

interface LocationHub {
  city: string;
  services: number;
  featured?: boolean;
  link: string;
}

const serviceHubs: ServiceHub[] = [
  {
    title: 'Water Damage Restoration',
    icon: Droplets,
    description: 'Complete water damage solutions for Brisbane properties',
    mainLink: '/services/water-damage-restoration',
    subLinks: [
      { label: 'Emergency Water Extraction', href: '/services/water-extraction-brisbane' },
      { label: 'Flood Damage Repair', href: '/services/flood-damage-brisbane' },
      { label: 'Burst Pipe Cleanup', href: '/services/burst-pipe-emergency' },
      { label: 'Ceiling Water Damage', href: '/services/ceiling-water-damage' },
      { label: 'Hardwood Floor Drying', href: '/services/hardwood-floor-water-damage' },
      { label: 'Sunday Emergency Service', href: '/emergency/sunday-water-damage-brisbane', badge: '24/7' }
    ]
  },
  {
    title: 'Fire & Smoke Restoration',
    icon: Flame,
    description: 'Professional fire damage recovery and smoke remediation',
    mainLink: '/services/fire-damage-restoration',
    subLinks: [
      { label: 'Smoke Odor Removal', href: '/services/smoke-odor-removal' },
      { label: 'Soot Cleaning', href: '/services/soot-damage-cleaning' },
      { label: 'Kitchen Fire Restoration', href: '/services/kitchen-fire-damage' },
      { label: 'Electrical Fire Damage', href: '/services/electrical-fire-restoration' },
      { label: 'Insurance Fire Claims', href: '/services/fire-insurance-claims', badge: 'Guide' }
    ]
  },
  {
    title: 'Mould Remediation',
    icon: Wind,
    description: 'Safe and effective mould removal for healthier properties',
    mainLink: '/services/mould-remediation',
    subLinks: [
      { label: 'Black Mould Removal', href: '/services/black-mould-removal-brisbane' },
      { label: 'Bathroom Mould Treatment', href: '/services/bathroom-mould-removal' },
      { label: 'Attic Mould Remediation', href: '/services/attic-mould-remediation' },
      { label: 'Commercial Mould Services', href: '/services/commercial-mould-removal' },
      { label: 'Mould Testing & Inspection', href: '/services/mould-testing-brisbane', badge: 'Free' }
    ]
  }
];

const locationHubs: LocationHub[] = [
  { city: 'Brisbane CBD', services: 47, featured: true, link: '/locations/brisbane-cbd' },
  { city: 'Ipswich', services: 38, featured: true, link: '/locations/ipswich' },
  { city: 'Logan', services: 42, featured: true, link: '/locations/logan' },
  { city: 'Gold Coast', services: 35, link: '/locations/gold-coast' },
  { city: 'Sunshine Coast', services: 31, link: '/locations/sunshine-coast' },
  { city: 'Moreton Bay', services: 28, link: '/locations/moreton-bay' },
  { city: 'Redlands', services: 24, link: '/locations/redlands' },
  { city: 'Toowoomba', services: 22, link: '/locations/toowoomba' }
];

const emergencyPages = [
  { label: 'Sunday Emergency Service', href: '/emergency/sunday-water-damage-brisbane', badge: 'Open Now' },
  { label: 'After Hours Restoration', href: '/emergency/after-hours-restoration', badge: '24/7' },
  { label: 'Public Holiday Response', href: '/emergency/public-holiday-response' },
  { label: '3AM Emergency Service', href: '/emergency/3am-emergency-services' },
  { label: 'Weekend Commercial Service', href: '/emergency/weekend-commercial-restoration' }
];

const guides = [
  { label: 'Water Damage Complete Guide', href: '/guides/water-damage-restoration-brisbane', badge: 'Popular' },
  { label: 'Insurance Claims Guide', href: '/guides/insurance-claims-brisbane' },
  { label: 'Mould Prevention Guide', href: '/guides/mould-prevention-brisbane' },
  { label: 'Emergency Response Checklist', href: '/guides/emergency-checklist' }
];

export default function InternalLinkingHub() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Comprehensive Disaster Recovery Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Explore our complete range of services across Brisbane, Ipswich, and Logan
          </motion.p>
        </div>

        {/* Service Hubs */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {serviceHubs.map((hub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  {/* Hub Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <hub.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{hub.title}</h3>
                      <p className="text-sm text-gray-600">{hub.description}</p>
                    </div>
                  </div>

                  {/* Main Link */}
                  <Link
                    href={hub.mainLink}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-4"
                  >
                    View All Services
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>

                  {/* Sub Links */}
                  <div className="space-y-2 border-t pt-4">
                    {hub.subLinks.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        className="flex items-center justify-between py-1.5 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3" />
                          {link.label}
                        </span>
                        {link.badge && (
                          <Badge variant="outline" className="text-xs">
                            {link.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Location Hub Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Service Locations Across Southeast Queensland
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {locationHubs.map((location, index) => (
              <Link
                key={index}
                href={location.link}
                className={`
                  relative p-4 rounded-lg border-2 hover:shadow-lg transition-all
                  ${location.featured
                    ? 'border-blue-600 bg-blue-50 hover:bg-blue-100'
                    : 'border-gray-200 bg-white hover:border-blue-400'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{location.city}</h4>
                    <p className="text-sm text-gray-600">{location.services} services</p>
                  </div>
                  <MapPin className={`w-5 h-5 ${location.featured ? 'text-blue-600' : 'text-gray-400'}`} />
                </div>
                {location.featured && (
                  <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white">
                    Primary
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Emergency & Time-Based Pages */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-red-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                  <h3 className="font-bold text-lg text-gray-900">Emergency Services</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  24/7 emergency response for when disaster strikes at any time
                </p>
                <div className="space-y-2">
                  {emergencyPages.map((page, index) => (
                    <Link
                      key={index}
                      href={page.href}
                      className="flex items-center justify-between py-2 text-sm hover:text-red-600 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3" />
                        {page.label}
                      </span>
                      {page.badge && (
                        <Badge className="bg-red-100 text-red-700 border-red-200">
                          {page.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resource Guides */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                  <h3 className="font-bold text-lg text-gray-900">Ultimate Guides</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive resources to help you navigate disaster recovery
                </p>
                <div className="space-y-2">
                  {guides.map((guide, index) => (
                    <Link
                      key={index}
                      href={guide.href}
                      className="flex items-center justify-between py-2 text-sm hover:text-green-600 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3" />
                        {guide.label}
                      </span>
                      {guide.badge && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          {guide.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Related Services Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Can\'t find what you\'re looking for?
          </h3>
          <p className="text-gray-600 mb-6">
            We offer comprehensive disaster recovery services across all of Southeast Queensland
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Sewage Cleanup', 'Biohazard Cleaning', 'Storm Damage', 'Vandalism Repair', 'Trauma Cleaning'].map(service => (
              <Badge key={service} variant="outline" className="px-4 py-2">
                {service}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
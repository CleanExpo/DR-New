'use client';

import Link from 'next/link';
import { MapPin, Phone, Droplets, Flame, AlertTriangle, Wind } from 'lucide-react';
import { FluidCTA, FluidCTAGroup, FluidEmergencyBanner } from '@/components/fluid-cta';

export default function IpswichRegionalPage() {
  const locations = [
  {
    "name": "Ipswich",
    "slug": "ipswich"
  },
  {
    "name": "Karalee",
    "slug": "karalee"
  },
  {
    "name": "Brookwater",
    "slug": "brookwater"
  },
  {
    "name": "Springfield Lakes",
    "slug": "springfield-lakes"
  }
];

  const services = [
    { name: 'Water Damage Restoration', slug: 'water-damage-restoration', icon: Droplets, color: 'blue' },
    { name: 'Fire Damage Restoration', slug: 'fire-damage-restoration', icon: Flame, color: 'red' },
    { name: 'Mould Remediation', slug: 'mould-remediation', icon: AlertTriangle, color: 'green' },
    { name: 'Storm Damage Restoration', slug: 'storm-damage-restoration', icon: Wind, color: 'cyan' },
  ];

  return (
    <div className="min-h-screen">
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="24/7 Emergency Restoration Ipswich - Master Restorer Response"
        sticky
      />

      {/* Hero Section */}
      <section className="relative min-h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Ipswich Emergency Restoration Services
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-blue-200">
              Professional disaster recovery serving Ipswich, Karalee, Brookwater, Springfield Lakes
            </p>
            <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
              <FluidCTA
                text="Call 1300 309 361 Now"
                href="tel:1300309361"
                variant="emergency"
                size="xl"
                icon="phone"
                magnetic
                ripple
                pulse
              />
              <FluidCTA
                text="Get Emergency Help"
                href="/get-help"
                variant="secondary"
                size="xl"
                icon="arrow"
                magnetic
                ripple
              />
            </FluidCTAGroup>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Emergency Services Across Ipswich
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <service.icon className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-base md:text-lg font-bold mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600">24/7 Emergency Service</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Serving All Ipswich Areas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="bg-gray-50 rounded-lg p-4 md:p-6 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 group text-center"
              >
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm md:text-base font-bold text-gray-900">{location.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">View Services</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-red-700 to-red-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Need Emergency Restoration in Ipswich?
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8">
              Available 24/7 for immediate assistance throughout all Ipswich areas
            </p>
            <FluidCTA
              text="Call 1300 309 361 Now"
              href="tel:1300309361"
              variant="emergency"
              size="xl"
              icon="phone"
              magnetic
              ripple
              pulse
              className="bg-white text-red-600 hover:bg-gray-100"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { MapPin, Phone, Droplets, Flame, AlertTriangle, Wind } from 'lucide-react';
import { FluidCTA, FluidCTAGroup, FluidEmergencyBanner } from '@/components/fluid-cta';

export default function BrisbaneRegionalPage() {
  const locations = [
  {
    "name": "Brisbane CBD",
    "slug": "brisbane"
  },
  {
    "name": "Hamilton",
    "slug": "hamilton"
  },
  {
    "name": "Ascot",
    "slug": "ascot"
  },
  {
    "name": "New Farm",
    "slug": "new-farm"
  },
  {
    "name": "Toowong",
    "slug": "toowong"
  },
  {
    "name": "Mount Cotton",
    "slug": "mount-cotton"
  },
  {
    "name": "Capalaba",
    "slug": "capalaba"
  },
  {
    "name": "Sheldon",
    "slug": "sheldon"
  },
  {
    "name": "Burbank",
    "slug": "burbank"
  },
  {
    "name": "Sunnybank",
    "slug": "sunnybank"
  },
  {
    "name": "Algester",
    "slug": "algester"
  },
  {
    "name": "Bulimba",
    "slug": "bulimba"
  },
  {
    "name": "Teneriffe",
    "slug": "teneriffe"
  },
  {
    "name": "West End",
    "slug": "west-end"
  },
  {
    "name": "Graceville",
    "slug": "graceville"
  },
  {
    "name": "Pullenvale",
    "slug": "pullenvale"
  },
  {
    "name": "Paddington",
    "slug": "paddington"
  },
  {
    "name": "Brookfield",
    "slug": "brookfield"
  },
  {
    "name": "Westlake",
    "slug": "westlake"
  },
  {
    "name": "Chapel Hill",
    "slug": "chapel-hill"
  },
  {
    "name": "Greenslopes",
    "slug": "greenslopes"
  },
  {
    "name": "Camp Hill",
    "slug": "camp-hill"
  },
  {
    "name": "Tarragindi",
    "slug": "tarragindi"
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
        message="24/7 Emergency Restoration Brisbane - Master Restorer Response"
        sticky
      />

      {/* Hero Section */}
      <section className="relative min-h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Brisbane Emergency Restoration Services
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-blue-200">
              Professional disaster recovery serving Brisbane CBD, Hamilton, Ascot, New Farm, Toowong, Mount Cotton, Capalaba, Sheldon, Burbank, Sunnybank, Algester, Bulimba, Teneriffe, West End, Graceville, Pullenvale, Paddington, Brookfield, Westlake, Chapel Hill, Greenslopes, Camp Hill, Tarragindi
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
            Emergency Services Across Brisbane
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
            Serving All Brisbane Areas
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
              Need Emergency Restoration in Brisbane?
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8">
              Available 24/7 for immediate assistance throughout all Brisbane areas
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

import { Metadata } from 'next';
import {
  DramaticHeroSection,
  EmergencyCallToAction,
  ServiceCard,
  ServiceCardGrid,
  CompactTrustBadges,
} from '@/components/dramatic';
import { Droplets, Flame, Wind, CloudRain, Clock, Shield, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hamilton Brisbane Emergency Restoration | IICRC Master Restorer | 30-Min Response',
  description:
    'Emergency restoration Hamilton Brisbane. IICRC Master Restorer Phill McGurk. Water damage, fire damage, flood restoration. 30-min response. Prestige properties specialist. Call 1300 309 361 24/7.',
  keywords:
    'hamilton brisbane restoration, water damage hamilton, fire damage hamilton, emergency restoration hamilton, master restorer hamilton, luxury home restoration brisbane',
  openGraph: {
    title: 'Hamilton Emergency Restoration | Master Restorer 24/7 | 30-Minute Response',
    description:
      "IICRC Master Restorer serving Hamilton's prestige properties. Emergency water, fire, flood restoration.",
    type: 'website',
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/hamilton',
  },
};

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Disaster Recovery Hamilton Brisbane',
  description:
    "IICRC Master Restorer providing 24/7 emergency water damage, fire damage, and flood restoration services in Hamilton, Brisbane. Specializing in high-value residential properties.",
  telephone: '+61-1300-309-361',
  email: 'info@disasterrecoverybrisbane.com.au',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4/17 Tile St',
    addressLocality: 'Wacol',
    addressRegion: 'QLD',
    postalCode: '4076',
    addressCountry: 'AU',
  },
  areaServed: {
    '@type': 'City',
    name: 'Hamilton',
    containedInPlace: {
      '@type': 'City',
      name: 'Brisbane',
    },
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -27.438,
    longitude: 153.065,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
};

export default function HamiltonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <div className="min-h-screen bg-white">
        {/* Dramatic Hero Section */}
        <DramaticHeroSection
          imageSrc="/images/suburbs/hamilton-luxury-property-water-damage-restoration.webp"
          imageAlt="Hamilton Brisbane emergency water damage restoration services - IICRC Master Restorer Phill McGurk providing 24/7 restoration for Hamilton luxury riverside properties and prestige homes"
          title="Hamilton Emergency Restoration"
          subtitle="24/7 Water Damage • Fire Damage • Flood Restoration for Hamilton's Prestige Properties"
          showPhoneCTA={true}
          secondaryCtaText="Get Emergency Help"
          secondaryCtaLink="/get-help"
          badgeText="IICRC MASTER RESTORER BRISBANE"
          badgeColor="red"
          overlayIntensity="dark"
          minHeight="min-h-[600px]"
        />

        {/* Trust Indicators Bar */}
        <section className="py-8 bg-slate-900 text-white border-y border-red-600">
          <div className="container mx-auto px-4">
            <CompactTrustBadges />
          </div>
        </section>

        {/* Services for Hamilton */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Emergency Restoration Services in Hamilton
              </h2>
              <p className="text-xl text-gray-600">
                Specialized disaster recovery for Hamilton's high-value riverside properties
              </p>
            </div>

            <ServiceCardGrid columns={2}>
              <ServiceCard
                icon={<Droplets className="w-16 h-16" />}
                iconColor="blue"
                title="Water Damage Restoration"
                description="Emergency water extraction for flood, burst pipes, storm damage. Specialized hardwood floor drying for Hamilton riverside properties."
                features={[
                  'Emergency water extraction',
                  'Structural drying - thermal imaging',
                  'Hardwood floor restoration',
                  'Ceiling & wall cavity drying',
                ]}
                link="/services/water-damage"
                linkText="Learn More About Water Damage"
                borderColor="blue"
              />

              <ServiceCard
                icon={<Flame className="w-16 h-16" />}
                iconColor="red"
                title="Fire Damage Restoration"
                description="Complete fire restoration for Hamilton homes. Smoke damage cleaning, soot removal, odor elimination, contents restoration."
                features={[
                  'Smoke & soot damage cleaning',
                  'Odor elimination & air purification',
                  'Contents restoration & pack-out',
                  'Structural cleaning',
                ]}
                link="/services/fire-damage"
                linkText="Learn More About Fire Damage"
                borderColor="red"
              />

              <ServiceCard
                icon={<Wind className="w-16 h-16" />}
                iconColor="green"
                title="Mould Remediation"
                description="Professional mould inspection and removal. IICRC-certified remediation for Hamilton properties. Air quality restoration."
                features={[
                  'Professional mould inspection',
                  'IICRC-certified remediation',
                  'Air quality restoration',
                  'Moisture source repair',
                ]}
                link="/services/mould-remediation"
                linkText="Learn More About Mould Removal"
                borderColor="green"
              />

              <ServiceCard
                icon={<CloudRain className="w-16 h-16" />}
                iconColor="cyan"
                title="Storm Damage Restoration"
                description="Emergency storm response for Hamilton. Roof tarping, wind/hail damage repair, tree impact restoration, water intrusion."
                features={[
                  'Emergency roof tarping & board-up',
                  'Wind and hail damage repair',
                  'Tree impact damage restoration',
                  'Water intrusion repair',
                ]}
                link="/services/storm-damage"
                linkText="Learn More About Storm Damage"
                borderColor="cyan"
              />
            </ServiceCardGrid>
          </div>
        </section>

        {/* Why Choose Us - Hamilton Specific */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
              Why Hamilton Property Owners Choose Us
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 border border-blue-200 hover:shadow-xl transition-shadow">
                <Award className="w-16 h-16 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Master Restorer Certified</h3>
                <p className="text-gray-700">
                  Phill McGurk is one of the limited number of IICRC Master Restorers in Brisbane and Queensland. The
                  highest professional certification for disaster restoration.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-white rounded-lg p-8 border border-red-200 hover:shadow-xl transition-shadow">
                <Clock className="w-16 h-16 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">30-Minute Hamilton Response</h3>
                <p className="text-gray-700">
                  Located near Hamilton with dedicated emergency dispatch. Average response time under 30 minutes to
                  minimize damage and protect your property investment.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-8 border border-green-200 hover:shadow-xl transition-shadow">
                <Shield className="w-16 h-16 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Luxury Home Specialists</h3>
                <p className="text-gray-700">
                  Extensive experience with Hamilton's prestigious riverside properties. Specialized techniques for
                  high-value homes, architectural features, and premium finishes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Insurance Work Our Specialty</h2>
              <p className="text-xl text-gray-300">Direct billing with all major Australian insurance companies</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors">
                <h3 className="text-xl font-bold mb-3 text-blue-400">No Upfront Costs</h3>
                <p className="text-gray-300">
                  We bill your insurance company directly. No out-of-pocket expenses for approved claims.
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Claims Assistance</h3>
                <p className="text-gray-300">
                  Complete documentation and support throughout the entire insurance claims process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <EmergencyCallToAction
          title="Hamilton Emergency? Call Now"
          subtitle="Available 24/7 for immediate emergency restoration assistance"
          showTrustIndicators={true}
          serviceAreas="Serving Hamilton • Ascot • New Farm • Toowong • All Brisbane"
          variant="default"
        />
      </div>
    </>
  );
}

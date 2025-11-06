// Dynamic Location Pages - Brisbane, Ipswich, Logan Service Areas
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Define service locations
const LOCATIONS = {
  brisbane: {
    name: 'Brisbane',
    region: 'Greater Brisbane',
    description: 'Professional disaster recovery and restoration services throughout Brisbane and surrounding suburbs.',
    suburbs: ['Hamilton', 'Ascot', 'New Farm', 'Toowong', 'CBD', 'Fortitude Valley', 'Milton', 'South Bank'],
    phone: '1300 309 361',
    emergencyAvailable: true,
    coordinates: { lat: -27.4698, lng: 153.0251 }
  },
  ipswich: {
    name: 'Ipswich',
    region: 'Ipswich Region',
    description: 'Rapid emergency restoration services for Ipswich and western Brisbane suburbs.',
    suburbs: ['Karalee', 'Brookwater', 'Springfield Lakes', 'Ipswich CBD', 'Yamanto', 'Leichhardt'],
    phone: '1300 309 361',
    emergencyAvailable: true,
    coordinates: { lat: -27.6144, lng: 152.7614 }
  },
  logan: {
    name: 'Logan',
    region: 'Logan City',
    description: '24/7 disaster recovery services for Logan and southern Brisbane communities.',
    suburbs: ['Springwood', 'Logan Central', 'Shailer Park', 'Woodridge', 'Browns Plains', 'Underwood'],
    phone: '1300 309 361',
    emergencyAvailable: true,
    coordinates: { lat: -27.6394, lng: 153.1094 }
  },
  'gold-coast': {
    name: 'Gold Coast',
    region: 'Gold Coast Region',
    description: 'Expert restoration services for Gold Coast properties and businesses.',
    suburbs: ['Surfers Paradise', 'Southport', 'Robina', 'Burleigh Heads', 'Broadbeach', 'Coolangatta'],
    phone: '1300 309 361',
    emergencyAvailable: true,
    coordinates: { lat: -28.0167, lng: 153.4000 }
  },
  'sunshine-coast': {
    name: 'Sunshine Coast',
    region: 'Sunshine Coast Region',
    description: 'Comprehensive disaster restoration across the Sunshine Coast.',
    suburbs: ['Maroochydore', 'Caloundra', 'Noosa', 'Mooloolaba', 'Kawana Waters', 'Nambour'],
    phone: '1300 309 361',
    emergencyAvailable: true,
    coordinates: { lat: -26.6500, lng: 153.0667 }
  },
  toowoomba: {
    name: 'Toowoomba',
    region: 'Toowoomba Region',
    description: 'Professional disaster recovery for Toowoomba and Darling Downs properties.',
    suburbs: ['Toowoomba CBD', 'Rangeville', 'Wilsonton', 'Newtown', 'Kearneys Spring', 'Highfields'],
    phone: '1300 309 361',
    emergencyAvailable: true,
    coordinates: { lat: -27.5598, lng: 151.9507 }
  }
};

type LocationParams = {
  params: {
    location: string;
  };
};

// Generate static paths for all locations
export async function generateStaticParams() {
  return Object.keys(LOCATIONS).map((location) => ({
    location
  }));
}

// Generate metadata for each location
export async function generateMetadata({ params }: LocationParams): Promise<Metadata> {
  const locationData = LOCATIONS[params.location as keyof typeof LOCATIONS];

  if (!locationData) {
    return {
      title: 'Location Not Found'
    };
  }

  return {
    title: `${locationData.name} Disaster Recovery | 24/7 Emergency Restoration Services`,
    description: `${locationData.description} IICRC Master Restorer certified. Call ${locationData.phone} for immediate assistance.`,
    keywords: `disaster recovery ${locationData.name.toLowerCase()}, water damage restoration ${locationData.name.toLowerCase()}, fire damage ${locationData.name.toLowerCase()}, emergency restoration ${locationData.name.toLowerCase()}, IICRC certified ${locationData.name.toLowerCase()}`,
    openGraph: {
      title: `${locationData.name} Emergency Restoration - 24/7 Response`,
      description: `Professional disaster recovery services for ${locationData.name}. IICRC Master Restorer approved.`,
      type: 'website'
    },
    alternates: {
      canonical: `https://disasterrecovery.com.au/locations/${params.location}`
    }
  };
}

export default function LocationPage({ params }: LocationParams) {
  const locationData = LOCATIONS[params.location as keyof typeof LOCATIONS];

  if (!locationData) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Disaster Recovery ${locationData.name}`,
    "description": locationData.description,
    "telephone": locationData.phone,
    "areaServed": {
      "@type": "City",
      "name": locationData.name,
      "containedInPlace": {
        "@type": "State",
        "name": "Queensland"
      }
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": locationData.coordinates.lat,
      "longitude": locationData.coordinates.lng
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  const services = [
    {
      title: 'Water Damage Restoration',
      href: '/services/water-damage',
      description: 'Emergency water extraction and structural drying',
      icon: '💧'
    },
    {
      title: 'Fire Damage Restoration',
      href: '/services/fire-damage',
      description: 'Complete fire and smoke damage recovery',
      icon: '🔥'
    },
    {
      title: 'Mould Remediation',
      href: '/services/mould-remediation',
      description: 'Professional mould removal and prevention',
      icon: '🦠'
    },
    {
      title: 'Storm Damage Repair',
      href: '/services/storm-damage',
      description: 'Emergency storm damage restoration',
      icon: '⛈️'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {locationData.name} Disaster Recovery
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-red-100">
                24/7 Emergency Restoration Services
              </p>
              <p className="text-lg mb-8 text-red-50">
                {locationData.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/get-help"
                  className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors"
                >
                  Get Emergency Help Now
                </Link>
                <a
                  href={`tel:${locationData.phone.replace(/\s/g, '')}`}
                  className="bg-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-900 transition-colors border-2 border-white"
                >
                  Call {locationData.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                We Service {locationData.region}
              </h2>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Suburbs We Cover:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {locationData.suburbs.map((suburb) => (
                    <div key={suburb} className="flex items-center text-gray-700">
                      <span className="mr-2 text-red-600">✓</span>
                      {suburb}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Our Services in {locationData.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                    <div className="mt-4 text-red-600 font-semibold">
                      Learn More →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Why Choose Us in {locationData.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    🏆 IICRC Master Restorer Certified
                  </h3>
                  <p className="text-gray-600">
                    One of a limited number of Master Restorers in Brisbane and QLD. Highest level of professional certification.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    ⚡ Rapid Response
                  </h3>
                  <p className="text-gray-600">
                    24/7 emergency service with rapid response times. Every minute counts in disaster recovery.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    💼 Insurance Approved
                  </h3>
                  <p className="text-gray-600">
                    Work directly with all major insurance companies. We handle the claims process for you.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    🔧 Advanced Equipment
                  </h3>
                  <p className="text-gray-600">
                    Latest technology and equipment for efficient restoration and minimal disruption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Emergency in {locationData.name}?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              We're available 24/7 for immediate assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-help"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors"
              >
                Request Emergency Service
              </Link>
              <a
                href={`tel:${locationData.phone.replace(/\s/g, '')}`}
                className="bg-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-900 transition-colors border-2 border-white"
              >
                Call {locationData.phone} Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

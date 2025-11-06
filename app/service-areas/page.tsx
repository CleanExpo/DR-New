import { Metadata } from 'next';
import Link from 'next/link';
import { MapPinIcon, ClockIcon, PhoneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Service Areas Brisbane, Ipswich & Logan | 24/7 Emergency Response | Disaster Recovery',
  description: 'Professional disaster recovery services across Brisbane, Ipswich, Logan and surrounding areas. Master Restorer Phill McGurk provides IICRC-certified emergency restoration to high-value residential and commercial properties. 24/7 rapid response.',
  keywords: 'disaster recovery Brisbane, emergency restoration Ipswich, water damage Logan, fire damage Brisbane, restoration services Queensland, Hamilton, Ascot, New Farm, Toowong, Karalee, Brookwater, Springfield Lakes, Brisbane CBD',
  openGraph: {
    title: 'Brisbane, Ipswich & Logan Disaster Recovery Service Areas',
    description: 'Master Restorer Phill McGurk serves Brisbane, Ipswich, Logan with 24/7 emergency disaster recovery. IICRC-certified restoration for residential and commercial properties.',
    type: 'website'
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/service-areas'
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Disaster Recovery and Restoration Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Disaster Recovery Australia",
    "telephone": "+61-1300-309-361",
    "url": "https://disasterrecovery.com.au"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Brisbane",
      "containedInPlace": {
        "@type": "State",
        "name": "Queensland"
      }
    },
    {
      "@type": "City",
      "name": "Ipswich",
      "containedInPlace": {
        "@type": "State",
        "name": "Queensland"
      }
    },
    {
      "@type": "City",
      "name": "Logan",
      "containedInPlace": {
        "@type": "State",
        "name": "Queensland"
      }
    }
  ],
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://disasterrecovery.com.au",
    "availableLanguage": "English",
    "serviceType": "Emergency Response"
  }
};

export default function ServiceAreasPage() {
  const brisbaneSuburbs = [
    { name: 'Hamilton', type: 'High-Value Residential', responseTime: '< 30 min' },
    { name: 'Ascot', type: 'High-Value Residential', responseTime: '< 30 min' },
    { name: 'New Farm', type: 'High-Value Residential', responseTime: '< 30 min' },
    { name: 'Toowong', type: 'High-Value Residential', responseTime: '< 30 min' },
    { name: 'Brisbane CBD', type: 'Commercial', responseTime: '< 20 min' },
    { name: 'Fortitude Valley', type: 'Commercial', responseTime: '< 25 min' },
    { name: 'Milton', type: 'Commercial', responseTime: '< 25 min' },
    { name: 'Paddington', type: 'Residential', responseTime: '< 35 min' },
    { name: 'Teneriffe', type: 'Residential', responseTime: '< 30 min' },
    { name: 'West End', type: 'Mixed', responseTime: '< 30 min' },
    { name: 'South Brisbane', type: 'Commercial', responseTime: '< 25 min' },
    { name: 'Woolloongabba', type: 'Mixed', responseTime: '< 30 min' }
  ];

  const ipswichSuburbs = [
    { name: 'Karalee', type: 'High-Value Residential', responseTime: '< 40 min' },
    { name: 'Brookwater', type: 'High-Value Residential', responseTime: '< 45 min' },
    { name: 'Springfield Lakes', type: 'High-Value Residential', responseTime: '< 40 min' },
    { name: 'Ipswich CBD', type: 'Commercial', responseTime: '< 35 min' },
    { name: 'Springfield Central', type: 'Commercial', responseTime: '< 40 min' },
    { name: 'North Ipswich', type: 'Industrial', responseTime: '< 40 min' },
    { name: 'Ripley', type: 'Residential', responseTime: '< 45 min' },
    { name: 'Augustine Heights', type: 'Residential', responseTime: '< 45 min' }
  ];

  const loganSuburbs = [
    { name: 'Logan Central', type: 'Commercial', responseTime: '< 45 min' },
    { name: 'Springwood', type: 'Mixed', responseTime: '< 40 min' },
    { name: 'Underwood', type: 'Mixed', responseTime: '< 40 min' },
    { name: 'Shailer Park', type: 'Residential', responseTime: '< 45 min' },
    { name: 'Browns Plains', type: 'Mixed', responseTime: '< 45 min' },
    { name: 'Loganholme', type: 'Commercial', responseTime: '< 40 min' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/optimised/damage/3D-Storm-Damage.png')] opacity-10 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Brisbane, Ipswich & Logan
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2">
                Service Areas
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Master Restorer Phill McGurk provides IICRC-certified disaster recovery services across South East Queensland.
              Specializing in high-value residential and commercial property restoration with 24/7 emergency response.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:1300309361"
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/50 hover:scale-105"
              >
                <PhoneIcon className="w-5 h-5" />
                1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                Request Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Service Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Emergency Response</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">&lt; 1 Hour</div>
              <div className="text-sm text-gray-600">Average Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">IICRC</div>
              <div className="text-sm text-gray-600">Master Restorer</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Insurance Approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brisbane Service Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <MapPinIcon className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">Brisbane Service Areas</h2>
          </div>

          <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
            <h3 className="font-bold text-lg text-blue-900 mb-2">Specializing in High-Value Properties</h3>
            <p className="text-gray-700">
              Master Restorer Phill McGurk provides expert disaster recovery services to Brisbane's premier residential suburbs
              including Hamilton, Ascot, New Farm, and Toowong. Trusted by insurance companies and high net worth property owners
              for certified restoration excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brisbaneSuburbs.map((suburb, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{suburb.name}</h3>
                    <p className="text-sm text-gray-600">{suburb.type}</p>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 text-blue-600" />
                  <span>Response: {suburb.responseTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ipswich Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <MapPinIcon className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">Ipswich Service Areas</h2>
          </div>

          <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
            <h3 className="font-bold text-lg text-blue-900 mb-2">Premium Residential Restoration</h3>
            <p className="text-gray-700">
              Serving Ipswich's premier communities including Karalee, Brookwater, and Springfield Lakes.
              Expert handling of luxury homes and estates with certified disaster recovery services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ipswichSuburbs.map((suburb, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{suburb.name}</h3>
                    <p className="text-sm text-gray-600">{suburb.type}</p>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 text-blue-600" />
                  <span>Response: {suburb.responseTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logan Service Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <MapPinIcon className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">Logan Service Areas</h2>
          </div>

          <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
            <h3 className="font-bold text-lg text-blue-900 mb-2">Commercial & Residential Restoration</h3>
            <p className="text-gray-700">
              Comprehensive disaster recovery services for Logan Central and surrounding commercial districts.
              Rapid response for commercial properties, retail spaces, and residential developments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loganSuburbs.map((suburb, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{suburb.name}</h3>
                    <p className="text-sm text-gray-600">{suburb.type}</p>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 text-blue-600" />
                  <span>Response: {suburb.responseTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Emergency Restoration Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/services/water-damage"
              className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-all hover:scale-105"
            >
              <h3 className="font-bold text-xl mb-2 text-blue-400">Water Damage</h3>
              <p className="text-gray-300 text-sm">24/7 emergency water extraction and structural drying</p>
            </Link>
            <Link
              href="/services/fire-damage"
              className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-all hover:scale-105"
            >
              <h3 className="font-bold text-xl mb-2 text-red-400">Fire Damage</h3>
              <p className="text-gray-300 text-sm">Complete fire and smoke damage restoration</p>
            </Link>
            <Link
              href="/services/mould-remediation"
              className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-all hover:scale-105"
            >
              <h3 className="font-bold text-xl mb-2 text-green-400">Mould Remediation</h3>
              <p className="text-gray-300 text-sm">Professional mould removal and prevention</p>
            </Link>
            <Link
              href="/services/storm-damage"
              className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-all hover:scale-105"
            >
              <h3 className="font-bold text-xl mb-2 text-cyan-400">Storm Damage</h3>
              <p className="text-gray-300 text-sm">Emergency storm and wind damage repair</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why Property Owners Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Master Restorer</h3>
              <p className="text-gray-600">
                Phill McGurk is one of the limited number of Master Restorers in Brisbane & Queensland.
                IICRC-certified with extensive experience in high-value property restoration.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Rapid Response</h3>
              <p className="text-gray-600">
                24/7 emergency dispatch with average response time under 1 hour for Brisbane metro areas.
                Immediate action to minimize damage and prevent secondary issues.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Insurance Approved</h3>
              <p className="text-gray-600">
                Trusted by all major insurance companies. We handle all documentation and work directly
                with insurers to ensure maximum coverage for your restoration needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Need Emergency Restoration?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Available 24/7 across Brisbane, Ipswich, and Logan.
            Master Restorer Phill McGurk and team are ready to respond immediately.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:1300309361"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/50 hover:scale-105"
            >
              <PhoneIcon className="w-6 h-6" />
              Call Now: 1300 309 361
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Online Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

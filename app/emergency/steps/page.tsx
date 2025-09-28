import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, AlertTriangle, Clock, Shield, Camera, FileText, Users, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Emergency Water Damage Response Brisbane | 24/7 Immediate Action Steps',
  description: 'Critical emergency steps for water damage in Brisbane. Professional disaster recovery response within 30 minutes. Call 1300 309 361 for immediate assistance.',
  keywords: 'emergency water damage Brisbane, urgent flood response, immediate water extraction, 24/7 disaster recovery, emergency restoration Brisbane',
  openGraph: {
    title: 'Emergency Water Damage Response Brisbane | 24/7 Immediate Action Steps',
    description: 'Critical emergency steps for water damage in Brisbane. Professional response within 30 minutes.',
    url: 'https://dr-new-ten.vercel.app/emergency/steps',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Disaster Recovery Brisbane'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/emergency/steps'
  }
};

const emergencySteps = [
  {
    step: 1,
    title: "Ensure Safety First",
    description: "Turn off electricity to affected areas if safe to do so. Avoid standing water near electrical sources.",
    icon: Shield,
    time: "Immediate",
    critical: true
  },
  {
    step: 2,
    title: "Stop the Water Source",
    description: "Turn off main water valve if possible. For burst pipes, locate the isolation valve for that area.",
    icon: AlertTriangle,
    time: "Within 5 minutes",
    critical: true
  },
  {
    step: 3,
    title: "Document the Damage",
    description: "Take photos and videos from multiple angles before moving anything. This is crucial for insurance claims.",
    icon: Camera,
    time: "Within 15 minutes",
    critical: false
  },
  {
    step: 4,
    title: "Call Professional Help",
    description: "Contact certified water damage restoration professionals immediately. Don't wait - time is critical.",
    icon: Phone,
    time: "Within 30 minutes",
    critical: true
  }
];

const dangerSigns = [
  "Water near electrical outlets or appliances",
  "Visible structural damage or sagging ceilings",
  "Sewage or contaminated water (Category 3)",
  "Gas smell or visible gas meter damage",
  "Mold smell or visible growth",
  "Water temperature above normal (potential hot water system failure)"
];

const whatNotToDo = [
  "Don't enter flooded areas without turning off electricity",
  "Don't use electrical appliances in wet areas",
  "Don't attempt to remove standing water without proper equipment",
  "Don't throw away damaged items until insurance assessment",
  "Don't wait more than 24 hours to call professionals",
  "Don't use household fans on Category 2 or 3 water damage"
];

export default function EmergencyStepsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': 'https://dr-new-ten.vercel.app/emergency/steps',
    name: 'Emergency Water Damage Response Steps Brisbane',
    description: 'Critical steps to take immediately after discovering water damage in Brisbane properties',
    image: 'https://dr-new-ten.vercel.app/images/emergency-water-damage-response.jpg',
    totalTime: 'PT30M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'AUD',
      value: '0'
    },
    tool: [
      'Camera or phone for documentation',
      'Flashlight for dark areas',
      'Main water shut-off tool',
      'Emergency contact numbers'
    ],
    supply: [
      'Insurance policy information',
      'Emergency contact numbers',
      'Property layout knowledge'
    ],
    step: emergencySteps.map(step => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.description,
      image: `https://dr-new-ten.vercel.app/images/step-${step.step}-${step.title.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      position: step.step
    })),
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How quickly should I call for water damage restoration in Brisbane?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Call within the first hour if possible, but definitely within 24 hours. Brisbane\'s humid climate accelerates mold growth and secondary damage. Our certified Master Restorer responds within 30 minutes to emergency calls.'
          }
        },
        {
          '@type': 'Question',
          name: 'Will my insurance cover emergency water damage in Queensland?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most policies cover sudden water damage like burst pipes, but flood damage requires separate flood insurance. Contact your insurer immediately to confirm coverage. We work directly with all major insurers and can assist with claims documentation.'
          }
        },
        {
          '@type': 'Question',
          name: 'What should I do if water damage occurs after hours in Brisbane?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Call our 24/7 emergency line immediately at 1300 309 361. Water damage doesn\'t wait for business hours, and neither do we. Our emergency response team is available around the clock for Brisbane, Ipswich, and Logan properties.'
          }
        }
      ]
    },
    provider: {
      '@type': 'LocalBusiness',
      name: 'Disaster Recovery Brisbane',
      telephone: '1300309361',
      url: 'https://dr-new-ten.vercel.app',
      areaServed: [
        'Brisbane',
        'Ipswich',
        'Logan',
        'New Farm',
        'Hamilton',
        'Ascot',
        'Toowong',
        'Springfield Lakes',
        'Brookwater'
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Emergency Header */}
        <div className="bg-red-600 text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
                <div>
                  <h1 className="text-xl font-bold">EMERGENCY WATER DAMAGE?</h1>
                  <p className="text-red-100">Follow these critical steps immediately</p>
                </div>
              </div>
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now: 1300 309 361
              </Link>
            </div>
          </div>
        </div>

        {/* Immediate Action Steps */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Immediate Action Steps - First 30 Minutes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Time is critical in water damage situations. Follow these steps in order to minimize damage and ensure safety.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {emergencySteps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.step}
                    className={`bg-white rounded-lg p-6 shadow-lg border-l-4 ${
                      step.critical ? 'border-red-500' : 'border-blue-500'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.critical ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          {step.step}
                        </span>
                        <div className={`text-xs font-semibold ${
                          step.critical ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {step.time}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-red-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6" />
                  Immediate Danger Signs
                </h3>
                <p className="text-red-800 mb-6">
                  If you notice any of these signs, evacuate immediately and call emergency services:
                </p>
                <ul className="space-y-3">
                  {dangerSigns.map((sign, index) => (
                    <li key={index} className="flex items-start gap-3 text-red-800">
                      <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  What NOT to Do
                </h3>
                <p className="text-gray-700 mb-6">
                  Avoid these common mistakes that can worsen damage or create safety hazards:
                </p>
                <ul className="space-y-3">
                  {whatNotToDo.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <div className="w-5 h-5 mt-0.5 flex-shrink-0 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✕</span>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Brisbane Specific Information */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                Brisbane-Specific Emergency Considerations
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">High-Risk Areas</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• River proximity zones (South Bank, New Farm)</li>
                    <li>• Low-lying areas (St Lucia, Toowong)</li>
                    <li>• Creek-adjacent suburbs (Breakfast Creek area)</li>
                    <li>• Historical flood zones (1974, 2011 flood maps)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Seasonal Risks</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Storm season (October - April)</li>
                    <li>• La Niña weather patterns</li>
                    <li>• King tide events</li>
                    <li>• Severe weather warnings from BOM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 24/7 Response */}
        <section className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <Clock className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h3 className="text-3xl font-bold mb-4">24/7 Emergency Response</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our certified Master Restorer and emergency team respond within 30 minutes to water damage calls across Brisbane, Ipswich, and Logan.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">30min</div>
                <div className="text-gray-300">Average Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-gray-300">Emergency Availability</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
                <div className="text-gray-300">Insurance Approved</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Emergency: 1300 309 361
              </Link>
              <Link
                href="/brisbane"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-3"
              >
                <Users className="w-5 h-5" />
                Learn About Our Services
              </Link>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Additional Emergency Resources
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                href="/services/water-damage-restoration"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <FileText className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Water Damage Process</h4>
                <p className="text-gray-600">Complete restoration process from assessment to completion</p>
              </Link>
              <Link
                href="/emergency"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <Clock className="w-8 h-8 text-green-600 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Response Times & Fees</h4>
                <p className="text-gray-600">24/7 emergency response times and transparent pricing</p>
              </Link>
              <Link
                href="/faq"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <Users className="w-8 h-8 text-purple-600 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">FAQ</h4>
                <p className="text-gray-600">Common questions about water damage restoration</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
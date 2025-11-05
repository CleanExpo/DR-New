/**
 * Reusable Suburb Page Component Template
 * Production-ready component for rendering all 40+ suburb pages
 * Accepts SuburbPageConfig and renders complete, SEO-optimised page
 */

'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone, Clock, Shield, Users, MapPin, Award, CheckCircle,
  AlertTriangle, Building, Waves, Home, TreePine, Car, Zap,
} from 'lucide-react';
import { SuburbTemplate, FAQItem } from './types';
import { generateLocalBusinessSchema, generateFAQSchema, generateBreadcrumbSchema } from './schema-generator';
import { generateSEOConfig, generateInternalLinkingMap, generateOpenGraphTags } from './seo-generator';

export interface SuburbPageProps {
  suburb: SuburbTemplate;
  intro: string;
  heroIntro: string;
  disasterTypes: Array<{
    heading: string;
    content: string;
    featured?: boolean;
  }>;
  whyChooseUs: Array<string>;
  emergencyResponse: {
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  servicesAvailable: Array<{
    type: string;
    description: string;
  }>;
  faqItems: FAQItem[];
  nearbySuburbs: Array<{
    name: string;
    slug: string;
  }>;
}

/**
 * Icon mapping for disaster types
 */
const disasterIconMap: Record<string, any> = {
  'water-damage': Waves,
  'fire-damage': Zap,
  'mould': Shield,
  'storm-damage': AlertTriangle,
  'flood': Waves,
  'subsidence': Building,
  'storm-surge': Waves,
};

/**
 * Get gradient colors based on region
 */
function getRegionGradient(region: string): string {
  const gradients: Record<string, string> = {
    'inner-brisbane': 'from-blue-900 via-purple-900 to-blue-800',
    'outer-brisbane': 'from-green-900 via-blue-900 to-green-800',
    'bayside': 'from-cyan-900 via-blue-900 to-cyan-800',
    'riverside': 'from-blue-900 via-indigo-900 to-blue-800',
    'ipswich': 'from-orange-900 via-yellow-900 to-orange-800',
    'logan': 'from-red-900 via-orange-900 to-red-800',
  };

  return gradients[region] || 'from-blue-900 via-purple-900 to-blue-800';
}

/**
 * Main Suburb Page Component
 */
export function SuburbPageTemplate({
  suburb,
  intro,
  heroIntro,
  disasterTypes,
  whyChooseUs,
  emergencyResponse,
  servicesAvailable,
  faqItems,
  nearbySuburbs,
}: SuburbPageProps) {
  // Generate SEO data
  const seoConfig = generateSEOConfig(suburb);
  const schema = generateLocalBusinessSchema(suburb, faqItems);
  const faqSchema = generateFAQSchema(faqItems);
  const breadcrumbSchema = generateBreadcrumbSchema(suburb);

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className={`relative bg-gradient-to-r ${getRegionGradient(suburb.region)} text-white py-20`}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Location Badge */}
              <div className="flex items-centre justify-centre gap-3 mb-6 flex-wrap">
                <MapPin className="w-5 h-5 text-yellow-300" />
                <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-semibold text-sm">
                  {suburb.name} • Postcode {suburb.postcode}
                </span>
                <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-semibold text-sm">
                  {suburb.responseTime} Response
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-centre">
                {suburb.name} Disaster Recovery
                <span className="block text-yellow-300 text-3xl md:text-5xl mt-2">
                  24/7 Emergency Response
                </span>
              </h1>

              <p className="text-xl text-centre mb-8 leading-relaxed max-w-4xl mx-auto">
                {heroIntro}
              </p>

              {/* Key Stats */}
              <div className="grid md:grid-cols-4 gap-4 mb-12 text-centre">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Clock className="w-8 h-8 mb-2 text-yellow-300 mx-auto" />
                  <div className="text-2xl font-bold">{suburb.responseTime}</div>
                  <div className="text-white/80 text-sm">Response Time</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Phone className="w-8 h-8 mb-2 text-yellow-300 mx-auto" />
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-white/80 text-sm">Always Available</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Award className="w-8 h-8 mb-2 text-yellow-300 mx-auto" />
                  <div className="text-2xl font-bold">Master</div>
                  <div className="text-white/80 text-sm">Restorer Certified</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Shield className="w-8 h-8 mb-2 text-yellow-300 mx-auto" />
                  <div className="text-2xl font-bold">49</div>
                  <div className="text-white/80 text-sm">5-Star Reviews</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-centre">
                <Link
                  href="tel:1300309361"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-centre gap-3 shadow-lg"
                >
                  <Phone className="w-6 h-6" />
                  Emergency: 1300 309 361
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Disaster Recovery in {suburb.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{intro}</p>
            </div>
          </div>
        </section>

        {/* Disaster Types Section */}
        {disasterTypes.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
                Common Disasters in {suburb.name}
              </h2>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {disasterTypes.map((disaster, idx) => {
                  const riskType = suburb.disasterRisks[idx]?.type || 'water-damage';
                  const IconComponent = disasterIconMap[riskType] || AlertTriangle;

                  return (
                    <div
                      key={idx}
                      className={`rounded-lg p-8 border-l-4 ${
                        disaster.featured
                          ? 'bg-red-50 border-red-600 shadow-lg'
                          : 'bg-white border-blue-600 shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <IconComponent className={`w-8 h-8 flex-shrink-0 ${
                          disaster.featured ? 'text-red-600' : 'text-blue-600'
                        }`} />
                        <h3 className="text-xl font-semibold text-gray-900">{disaster.heading}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{disaster.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Us Section */}
        {whyChooseUs.length > 0 && (
          <section className="py-16 bg-blue-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
                Why {suburb.name} Residents Choose Us
              </h2>

              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                {whyChooseUs.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white rounded-lg p-6 shadow-sm">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Emergency Response Section */}
        {emergencyResponse.steps.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
                Our {suburb.name} Emergency Response Process
              </h2>

              <div className="max-w-4xl mx-auto">
                <div className="space-y-6">
                  {emergencyResponse.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-centre justify-centre h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-lg">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Services Available Section */}
        {servicesAvailable.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
                Services Available in {suburb.name}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {servicesAvailable.map((service, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-8 shadow-md border-l-4 border-blue-600">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.type}</h3>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <Link
                      href={`/services/${service.type.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-centre gap-2"
                    >
                      Learn More →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
                Frequently Asked Questions
              </h2>

              <div className="max-w-4xl mx-auto space-y-6">
                {faqItems.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600 cursor-pointer"
                  >
                    <summary className="flex items-centre justify-between font-semibold text-gray-900 text-lg">
                      {faq.question}
                      <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Nearby Areas Section */}
        {nearbySuburbs.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
                Also Serving Nearby Areas
              </h2>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {nearbySuburbs.map((nearbySuburb, idx) => (
                  <Link
                    key={idx}
                    href={`/${suburb.regionParent}/${nearbySuburb.slug}`}
                    className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-centre border-t-4 border-blue-600"
                  >
                    <Home className="w-8 h-8 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {nearbySuburb.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">Disaster Recovery Services</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Emergency CTA Section */}
        <section className="py-20 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-centre">
            <AlertTriangle className="w-20 h-20 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Emergency Disaster in {suburb.name}?
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Don't wait. Every minute counts when disaster strikes. Our Master Restorer team responds 24/7
              to protect your property and minimise damage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-centre">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-centre justify-centre gap-3"
              >
                <Phone className="w-6 h-6" />
                Call Now: 1300 309 361
              </Link>
              <Link
                href="/emergency-contact"
                className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-centre justify-centre gap-3"
              >
                <MapPin className="w-6 h-6" />
                Emergency Contact
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

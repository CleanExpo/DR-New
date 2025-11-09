import { Metadata } from 'next';
import {
  DramaticHeroSection,
  EmergencyCallToAction,
  ServiceCard,
  ServiceCardGrid,
  TrustIndicatorBar,
} from '@/components/dramatic';
import { Flame, Wind, Home, Droplets, Wrench, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// SEO Metadata
export const metadata: Metadata = generateSEO({
  title: 'Fire Damage Restoration Brisbane | 24/7 Emergency Response | Master Restorer',
  description:
    '24/7 fire damage restoration Brisbane. IICRC Master Restorer Phill McGurk. Smoke removal, soot cleanup, complete restoration. 60-min response. All insurers approved. Call 1300 309 361.',
  keywords: [
    'fire damage restoration Brisbane',
    'smoke damage cleanup',
    'fire restoration Ipswich',
    'soot removal Brisbane',
    'emergency fire response',
    'IICRC fire certified',
    'Master Restorer Brisbane',
    'insurance fire claims',
  ],
  canonical: 'https://disasterrecovery.com.au/services/fire-damage-restoration',
  openGraph: {
    title: 'Fire Damage Restoration Brisbane - IICRC Master Restorer - 24/7',
    description: 'Emergency fire & smoke damage restoration. 60-minute response. Master certified. All insurers.',
    images: [{ url: '/images/hero/fire-damage-restoration.jpg', alt: 'Fire Damage Restoration Brisbane' }],
    type: 'website',
  },
});

// FAQ data
const fireDamageFAQs = [
  {
    question: 'How quickly can you respond to fire damage emergencies in Brisbane?',
    answer:
      'We respond within 60 minutes for Brisbane CBD and inner suburbs (Hamilton, Ascot, New Farm, Toowong). Greater Brisbane, Ipswich, and Logan receive response within 90 minutes. Call 1300 309 361 24/7 - our Master Restorer team arrives with professional equipment.',
  },
  {
    question: 'Will insurance cover fire damage restoration costs?',
    answer:
      'Yes! Most home and business insurance policies cover fire damage restoration. We work directly with all major insurers including Suncorp, RACQ, Allianz, QBE, NRMA. We handle direct billing - no upfront costs for insurance work.',
  },
  {
    question: 'Can smoke odour be completely eliminated?',
    answer:
      'Yes, with professional techniques. We use thermal fogging, hydroxyl treatment, and ozone generators to eliminate smoke odour completely. Our IICRC-certified process ensures no lingering smells remain.',
  },
  {
    question: 'What areas do you service for fire damage restoration?',
    answer:
      'All Brisbane suburbs, Ipswich, and Logan. Priority 60-minute response to Hamilton, Ascot, New Farm, Toowong, Paddington, Bulimba. Full coverage includes Brisbane CBD, West End, Fortitude Valley, Ipswich CBD, Springfield Lakes, Logan Central, and all surrounding areas.',
  },
];

// Service schema
const serviceSchema = generateServiceSchema({
  name: 'Fire Damage Restoration Brisbane',
  description:
    '24/7 emergency fire and smoke damage restoration across Brisbane, Ipswich, Logan. IICRC Master Restorer certified. Complete soot removal, odour elimination, structural repairs. Insurance approved.',
  image: '/images/hero/fire-damage-restoration.jpg',
  areaServed: ['Brisbane', 'Ipswich', 'Logan', 'Hamilton', 'Ascot', 'New Farm', 'Toowong'],
});

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  { name: 'Fire Damage Restoration', url: 'https://disasterrecovery.com.au/services/fire-damage-restoration' },
]);

export default function FireDamageRestorationPage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <StructuredData data={serviceSchema} />
      <StructuredData data={generateFAQSchema(fireDamageFAQs)} />
      <StructuredData data={breadcrumbSchema} />

      {/* Dramatic Hero Section */}
      <DramaticHeroSection
        imageSrc="/images/hero/fire-damage-hero.jpg"
        imageAlt="Emergency fire damage restoration Brisbane - IICRC Master Restorer - 24/7 smoke and soot removal, complete fire restoration for residential and commercial properties"
        title="Fire & Smoke Damage Restoration"
        subtitle="60-minute emergency response • Complete soot removal • Odour elimination • Insurance approved"
        showPhoneCTA={true}
        secondaryCtaText="Get Fire Assessment"
        secondaryCtaLink="/get-help"
        badgeText="IICRC MASTER RESTORER"
        badgeColor="red"
        overlayIntensity="dark"
        minHeight="min-h-[500px]"
      />

      {/* Trust Indicators */}
      <TrustIndicatorBar variant="blue" showAll={true} />

      {/* Main Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-full">
              🔥 24/7 Fire Emergency Service
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete Fire Damage Restoration Brisbane
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <strong>IICRC Master Restorer Phill McGurk</strong> responds to fire emergencies with proven expertise
              in smoke removal, soot cleanup, odour elimination, and complete structural restoration
            </p>
          </div>

          <ServiceCardGrid columns={3}>
            <ServiceCard
              icon={<Flame className="w-16 h-16" />}
              iconColor="red"
              title="Emergency Fire Response"
              description="Immediate 24/7 response to secure property, assess damage, begin emergency repairs. Board-up, tarping, debris removal."
              features={['60-min response', 'Property securing', 'Safety assessment', 'Insurance documentation']}
              link="/emergency/fire-damage-brisbane"
              linkText="Emergency Service"
              borderColor="red"
            />

            <ServiceCard
              icon={<Wind className="w-16 h-16" />}
              iconColor="orange"
              title="Smoke & Soot Cleanup"
              description="Professional smoke damage cleaning. Thermal fogging, hydroxyl treatment, complete soot removal from all surfaces."
              features={['Smoke odour removal', 'Soot cleaning', 'Air purification', 'Contents restoration']}
              link="#smoke-removal"
              linkText="Learn More"
              borderColor="orange"
            />

            <ServiceCard
              icon={<Home className="w-16 h-16" />}
              iconColor="red"
              title="Structural Restoration"
              description="Complete fire damage repairs. Structural assessment, rebuilding, electrical, plumbing. Full property restoration."
              features={[
                'Structural repairs',
                'Complete rebuild',
                'Electrical & plumbing',
                'Painting & finishing',
              ]}
              link="#restoration"
              linkText="Learn More"
              borderColor="red"
            />
          </ServiceCardGrid>
        </div>
      </section>

      {/* Fire Restoration Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Fire Damage Restoration Process</h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: '1',
                title: 'Emergency Response & Assessment',
                description:
                  'Immediate dispatch. Property securing, board-up, tarping. Comprehensive damage assessment and documentation.',
                time: 'Within 60 minutes',
              },
              {
                step: '2',
                title: 'Water Damage Mitigation',
                description:
                  'Extract water from firefighting efforts. Industrial drying equipment. Prevent mould growth.',
                time: 'Hours 1-24',
              },
              {
                step: '3',
                title: 'Smoke & Soot Removal',
                description:
                  'Professional cleaning of all surfaces. HEPA filtration. Thermal fogging for odour. Hydroxyl treatment.',
                time: 'Days 1-5',
              },
              {
                step: '4',
                title: 'Complete Restoration',
                description:
                  'Structural repairs, rebuilding, electrical, plumbing. Painting, flooring, final finishing.',
                time: 'Week 2+',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <span className="text-sm text-red-600 font-semibold">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Additional Fire Services</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <Droplets className="w-10 h-10 text-blue-600 mb-3" />
                <CardTitle>Water Damage from Firefighting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {['Emergency water extraction', 'Structural drying', 'Dehumidification', 'Mould prevention'].map(
                    (item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <Wrench className="w-10 h-10 text-green-600 mb-3" />
                <CardTitle>Contents Restoration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    'Furniture cleaning & restoration',
                    'Electronics ultrasonic cleaning',
                    'Document restoration',
                    'Textile cleaning',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Fire Damage Restoration FAQs</h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {fireDamageFAQs.map((faq, index) => (
              <details
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group"
              >
                <summary className="font-bold text-lg cursor-pointer text-gray-900 list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <EmergencyCallToAction
        title="Fire Damage Emergency?"
        subtitle="Every minute counts - Call our Master Restorer NOW"
        showTrustIndicators={true}
        serviceAreas="Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs"
        variant="full"
      />
    </div>
  );
}

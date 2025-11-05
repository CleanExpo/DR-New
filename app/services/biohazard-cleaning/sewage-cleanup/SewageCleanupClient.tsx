'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { dialogue, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateLocalBusinessWithServices, generateFAQSchema } from '@/lib/seo';
import { Shield, CheckCircle2, MessageSquare, AlertTriangle, Clock } from 'lucide-react';

export default function SewageCleanupClient() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery - Sewage Cleanup',
    description: 'Emergency sewage cleanup services in Brisbane, Ipswich, Logan. Category 3 water damage, contamination removal. IICRC certified Master Restorer.',
    telephone: '1300 309 361',
    address: {
      streetAddress: 'Servicing All Areas',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4000',
      addressCountry: 'AU'
    },
    coordinates: {
      latitude: -27.4705,
      longitude: 153.0260
    },
    url: 'https://dr-new-ten.vercel.app/services/biohazard-cleaning/sewage-cleanup',
    image: '/images/sewage-cleanup.jpg',
    hours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59',
    services: [
      {
        name: 'Sewage Cleanup & Removal',
        description: 'Emergency sewage backup cleanup, removal, and decontamination for residential and commercial properties.',
        areaServed: ['Brisbane', 'Ipswich', 'Logan', 'Gold Coast']
      },
      {
        name: 'Category 3 Water Damage',
        description: 'Professional handling of Category 3 (blackwater) contamination and biohazard cleanup.',
        areaServed: ['Brisbane', 'Ipswich', 'Logan']
      }
    ]
  };

  const faqs = [
    {
      question: 'How quickly can you respond to sewage backup emergencies?',
      answer: 'We provide 24/7 emergency response for sewage cleanup with teams typically arriving within 1 hour in Brisbane, Ipswich, and Logan metro areas. Immediate response is critical to prevent health hazards and structural damage.'
    },
    {
      question: 'Is sewage cleanup covered by insurance?',
      answer: 'Most homeowner and commercial property insurance policies cover sewage backup and Category 3 water damage. We work directly with all major insurers and can help manage your claim from start to finish, including documentation and direct billing.'
    },
    {
      question: 'What is Category 3 water damage?',
      answer: 'Category 3 water, also called "blackwater," is grossly contaminated and may contain pathogenic, toxigenic, or other harmful agents. This includes sewage backup, flooding from rivers or streams, and toilet overflows with feces. It requires specialised cleanup protocols.'
    },
    {
      question: 'What does sewage cleanup involve?',
      answer: 'Sewage cleanup involves immediate water extraction, removal of contaminated materials, complete sanitization with hospital-grade disinfectants, structural drying, odour elimination, and air quality restoration. All work follows IICRC S500 standards for Category 3 water damage.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessWithServices(businessInfo)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-900 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre mb-6">
              <AlertTriangle className="h-16 w-16 text-yellow-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Emergency Sewage Cleanup Brisbane, Ipswich & Logan
            </h1>
            <p className="text-xl mb-8 text-red-100">
              Fast sewage backup cleanup and Category 3 water damage restoration. IICRC certified Master Restorer. Available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-centre">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                onClick={() => setShowQuoteDialog(true)}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Emergency Response Now
              </Button>
            </div>
            <p className="mt-4 text-sm text-red-200">
              <Clock className="inline h-4 w-4 mr-1" />
              1-hour emergency response time in metro areas
            </p>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-8 bg-yellow-50 border-y-2 border-yellow-400">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Sewage is a Health Emergency</h3>
                <p className="text-gray-700">
                  Sewage contains harmful bacteria, viruses, and pathogens. DO NOT attempt cleanup yourself.
                  Professional decontamination is required to protect your health and safely restore your property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-centre">
                <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">1-Hour Response</h3>
                <p className="text-sm text-gray-600">Emergency teams available 24/7</p>
              </Card>
              <Card className="p-6 text-centre">
                <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">IICRC Certified</h3>
                <p className="text-sm text-gray-600">Master Restorer Phill McGurk</p>
              </Card>
              <Card className="p-6 text-centre">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Category 3 Specialists</h3>
                <p className="text-sm text-gray-600">Proper biohazard protocols</p>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mb-6">Professional Sewage Cleanup & Decontamination</h2>
            <p className="text-lg text-gray-700 mb-8">
              When you experience sewage backup in Brisbane, Ipswich, or Logan, Disaster Recovery provides emergency
              Category 3 water damage cleanup with proper biohazard protocols and complete decontamination.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Our Services</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Emergency sewage extraction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Category 3 water damage restoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Complete biohazard decontamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Structural drying and dehumidification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Odour elimination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Insurance claim assistance</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>IICRC certified Master Restorer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Proper Category 3 protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Hospital-grade disinfection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Industrial water extraction equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Complete odour removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Air quality restoration</span>
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="p-6 bg-red-50 border-red-200">
              <h3 className="text-xl font-bold mb-4">Our Emergency Sewage Cleanup Process</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">1.</span>
                  <div>
                    <strong>Immediate Response:</strong> Our emergency team arrives within 1 hour with industrial extraction equipment and full protective gear.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">2.</span>
                  <div>
                    <strong>Safety Assessment:</strong> We assess contamination levels, identify affected areas, and establish containment zones.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">3.</span>
                  <div>
                    <strong>Sewage Extraction:</strong> Complete removal of all sewage and contaminated water using industrial-grade equipment.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">4.</span>
                  <div>
                    <strong>Material Removal:</strong> Safe disposal of contaminated porous materials that cannot be properly decontaminated.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">5.</span>
                  <div>
                    <strong>Deep Decontamination:</strong> Hospital-grade antimicrobial treatment of all surfaces following IICRC S500 standards.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">6.</span>
                  <div>
                    <strong>Structural Drying:</strong> Professional drying and dehumidification to prevent mould growth and structural damage.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">7.</span>
                  <div>
                    <strong>Odour Elimination:</strong> Complete odour removal using ozone generators and professional deodorization techniques.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">8.</span>
                  <div>
                    <strong>Final Verification:</strong> Air quality testing and final inspection to ensure complete decontamination.
                  </div>
                </li>
              </ol>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-10">Sewage Cleanup FAQs</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">Sewage Emergency? Get Help Now!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't risk your health. Professional sewage cleanup available 24/7 with 1-hour response time.
          </p>
          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            onClick={() => setShowQuoteDialog(true)}
          >
            <MessageSquare className="mr-2" />
            Emergency Response Now
          </Button>
        </div>
      </section>

      {/* Quote dialogue */}
      <dialogue open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Emergency Sewage Cleanup</DialogTitle>
            <DialogDescription>
              Immediate emergency response available 24/7. Our team will arrive within 1 hour.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-centre gap-3 p-3 bg-red-50 rounded-lg border-2 border-red-200">
              <AlertTriangle className="h-5 w-5 text-red-700" />
              <div>
                <p className="font-semibold text-red-900">Emergency Service</p>
                <p className="text-sm text-red-700">1-hour response time</p>
              </div>
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700">
              Request Emergency Service
            </Button>
          </div>
        </DialogContent>
      </dialogue>
    </div>
  );
}

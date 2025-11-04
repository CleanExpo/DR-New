'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateLocalBusinessWithServices, generateFAQSchema } from '@/lib/seo';
import { Shield, CheckCircle2, MessageSquare, Heart, Clock } from 'lucide-react';

export default function DeathCleanupClient() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery - Death & Decomposition Cleanup',
    description: 'Compassionate death and decomposition cleanup services in Brisbane, Ipswich, Logan. Unattended death cleanup, biohazard removal. IICRC certified Master Restorer.',
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
    url: 'https://dr-new-ten.vercel.app/services/biohazard-cleaning/death-cleanup',
    image: '/images/death-cleanup.jpg',
    hours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59',
    services: [
      {
        name: 'Unattended Death Cleanup',
        description: 'Professional, compassionate cleanup for unattended death situations with complete biohazard removal.',
        areaServed: ['Brisbane', 'Ipswich', 'Logan', 'Gold Coast']
      },
      {
        name: 'Decomposition Cleanup',
        description: 'Complete decomposition cleanup, decontamination, and odour removal services.',
        areaServed: ['Brisbane', 'Ipswich', 'Logan']
      }
    ]
  };

  const faqs = [
    {
      question: 'How quickly can you respond to unattended death cleanup?',
      answer: 'We provide 24/7 emergency response for death cleanup with compassionate teams typically arriving within 2 hours in Brisbane, Ipswich, and Logan areas. We understand the urgency and sensitivity of these situations.'
    },
    {
      question: 'Is death cleanup covered by insurance?',
      answer: 'Most homeowner and property insurance policies cover unattended death and decomposition cleanup costs. We work directly with all major insurers and can help manage your claim with sensitivity and professionalism.'
    },
    {
      question: 'What does death cleanup involve?',
      answer: 'Death cleanup involves complete removal of all biohazards, bodily fluids, decomposition materials, and contaminated items. We use hospital-grade disinfectants, remove odours, and restore the property. All biohazardous waste is properly disposed of according to Queensland regulations.'
    },
    {
      question: 'How do you handle odours from decomposition?',
      answer: 'We use professional-grade ozone generators, thermal foggers, and enzyme-based cleaners to completely eliminate decomposition odours. Our IICRC certified process ensures thorough deodorization and sanitization of all affected areas.'
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
      <section className="relative bg-gradient-to-r from-slate-800 to-slate-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Death & Decomposition Cleanup Brisbane, Ipswich & Logan
            </h1>
            <p className="text-xl mb-8 text-slate-300">
              Compassionate, professional death cleanup services. Unattended death, decomposition removal. IICRC certified Master Restorer. Available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowQuoteDialog(true)}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Request Compassionate Service
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              <Heart className="inline h-4 w-4 mr-1" />
              Handled with care, dignity, and complete professionalism
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">24/7 Response</h3>
                <p className="text-sm text-gray-600">2-hour emergency response time</p>
              </Card>
              <Card className="p-6 text-center">
                <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Compassionate Care</h3>
                <p className="text-sm text-gray-600">Trauma-informed, respectful service</p>
              </Card>
              <Card className="p-6 text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">IICRC Certified</h3>
                <p className="text-sm text-gray-600">Master Restorer Phill McGurk</p>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mb-6">Professional Death & Decomposition Cleanup</h2>
            <p className="text-lg text-gray-700 mb-8">
              When you need compassionate death cleanup services in Brisbane, Ipswich, or Logan, Disaster Recovery
              provides professional, discreet biohazard removal with complete care and respect during difficult times.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Our Services</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Unattended death cleanup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Decomposition removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Complete biohazard decontamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Odour elimination and sanitization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Property restoration</span>
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
                    <span>Compassionate, trauma-informed approach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Complete discretion and confidentiality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>IICRC certified Master Restorer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Hospital-grade disinfection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Complete odour removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Proper disposal protocols</span>
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-xl font-bold mb-4">Our Compassionate Process</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <div>
                    <strong>Immediate Response:</strong> Our team arrives discreetly within 2 hours, prepared with all necessary equipment and protective gear.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <div>
                    <strong>Assessment & Planning:</strong> We assess the situation with sensitivity and create a comprehensive cleanup plan.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <div>
                    <strong>Biohazard Removal:</strong> Complete removal of all contaminated materials, bodily fluids, and affected items.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">4.</span>
                  <div>
                    <strong>Deep Cleaning & Sanitization:</strong> Hospital-grade disinfection of all surfaces and structural elements.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">5.</span>
                  <div>
                    <strong>Odour Elimination:</strong> Professional deodorization using ozone and thermal fogging technology.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">6.</span>
                  <div>
                    <strong>Final Restoration:</strong> Property restored to safe, habitable condition with verification testing.
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
            <h2 className="text-3xl font-bold text-center mb-10">Death Cleanup FAQs</h2>
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
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Compassionate Death Cleanup Services?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Professional, respectful service available 24/7. We handle everything with care and dignity.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowQuoteDialog(true)}
          >
            <MessageSquare className="mr-2" />
            Request Compassionate Service
          </Button>
        </div>
      </section>

      {/* Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Death Cleanup Services</DialogTitle>
            <DialogDescription>
              Compassionate, professional assistance available 24/7. Complete discretion and care.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-700" />
              <div>
                <p className="font-semibold">Compassionate Service Request</p>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Request Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

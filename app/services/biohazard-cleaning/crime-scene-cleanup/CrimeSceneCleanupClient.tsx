'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateLocalBusinessWithServices, generateFAQSchema } from '@/lib/seo';
import { Shield, CheckCircle2, MessageSquare, Lock, Clock } from 'lucide-react';

export default function CrimeSceneCleanupClient() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery - Crime Scene Cleanup',
    description: 'Professional crime scene cleanup services in Brisbane, Ipswich, Logan. Discreet, trauma-informed biohazard removal. IICRC certified Master Restorer.',
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
    url: 'https://dr-new-ten.vercel.app/services/biohazard-cleaning/crime-scene-cleanup',
    image: '/images/crime-scene-cleanup.jpg',
    hours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59',
    services: [
      {
        name: 'Crime Scene Cleanup',
        description: 'Complete crime scene decontamination and biohazard removal with discretion and care.',
        areaServed: ['Brisbane', 'Ipswich', 'Logan', 'Gold Coast']
      },
      {
        name: 'Trauma Scene Cleaning',
        description: 'Trauma-informed cleaning services for sensitive situations.',
        areaServed: ['Brisbane', 'Ipswich', 'Logan']
      }
    ]
  };

  const faqs = [
    {
      question: 'How quickly can you respond to crime scene cleanup emergencies?',
      answer: 'We offer 24/7 emergency response for crime scene cleanup with discreet teams typically arriving within 2 hours in Brisbane, Ipswich, and Logan metro areas. Our rapid, professional response ensures the scene is safely decontaminated.'
    },
    {
      question: 'Is crime scene cleanup covered by insurance?',
      answer: 'Most homeowner and property insurance policies cover crime scene cleanup costs. We work directly with all major insurers and can help manage your claim discreetly and professionally from start to finish.'
    },
    {
      question: 'What does crime scene cleanup involve?',
      answer: 'Crime scene cleanup involves complete removal of all biohazards, blood, bodily fluids, and contaminated materials. We use hospital-grade disinfectants and follow strict IICRC protocols. All waste is disposed of according to Queensland health regulations.'
    },
    {
      question: 'Is your service discreet and confidential?',
      answer: 'Absolutely. We use unmarked vehicles, maintain strict confidentiality, and work with sensitivity and respect. Our trauma-informed team understands the importance of discretion during difficult times.'
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
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Lock className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Crime Scene Cleanup Brisbane, Ipswich & Logan
            </h1>
            <p className="text-xl mb-8 text-slate-300">
              Discreet, professional crime scene cleanup and trauma cleaning services. IICRC certified Master Restorer. Available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowQuoteDialog(true)}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Request Discreet Service
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              <Lock className="inline h-4 w-4 mr-1" />
              All services provided with complete confidentiality
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
                <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">100% Discreet</h3>
                <p className="text-sm text-gray-600">Unmarked vehicles, confidential service</p>
              </Card>
              <Card className="p-6 text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">IICRC Certified</h3>
                <p className="text-sm text-gray-600">Master Restorer Phill McGurk</p>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mb-6">Professional Crime Scene Cleanup</h2>
            <p className="text-lg text-gray-700 mb-8">
              When you need expert crime scene cleanup services in Brisbane, Ipswich, or Logan, Disaster Recovery
              provides discreet, trauma-informed biohazard removal with complete professionalism and care.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Our Services</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Complete biohazard removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Blood and bodily fluid cleanup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Trauma scene decontamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Odour removal and sanitization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Proper waste disposal</span>
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
                    <span>Trauma-informed approach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Complete confidentiality</span>
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
                    <span>Proper disposal protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Compassionate service</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Crime Scene Cleanup FAQs</h2>
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
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Discreet Crime Scene Cleanup?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Professional, compassionate service available 24/7. Complete confidentiality guaranteed.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowQuoteDialog(true)}
          >
            <MessageSquare className="mr-2" />
            Request Confidential Service
          </Button>
        </div>
      </section>

      {/* Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Crime Scene Cleanup Services</DialogTitle>
            <DialogDescription>
              Discreet, professional assistance available 24/7. Complete confidentiality.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-700" />
              <div>
                <p className="font-semibold">Confidential Service Request</p>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Request Discreet Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

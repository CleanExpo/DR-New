'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { dialogue, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateLocalBusinessWithServices, generateFAQSchema } from '@/lib/seo';
import { Shield, CheckCircle2, MessageSquare, AlertCircle, Clock } from 'lucide-react';

export default function MedicalWasteClient() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery - Medical Waste Cleanup',
    description: 'Professional medical waste cleanup services in Brisbane, Ipswich, Logan. Safe disposal, sharps removal, infectious materials. IICRC certified.',
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
    url: 'https://dr-new-ten.vercel.app/services/biohazard-cleaning/medical-waste',
    image: '/images/medical-waste.jpg',
    hours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59',
    services: [
      {
        name: 'Medical Waste Cleanup',
        description: 'Safe cleanup and disposal of medical waste, sharps, medications, and infectious materials.',
        areaServed: ['Brisbane', 'Ipswich', 'Logan', 'Gold Coast']
      },
      {
        name: 'Clinical Waste Removal',
        description: 'Professional handling and disposal of clinical waste following Queensland health regulations.',
        areaServed: ['Brisbane', 'Ipswich', 'Logan']
      }
    ]
  };

  const faqs = [
    {
      question: 'How quickly can you respond to medical waste cleanup?',
      answer: 'We provide 24/7 emergency response for medical waste cleanup with trained teams typically arriving within 2 hours in Brisbane, Ipswich, and Logan metro areas. Our rapid response ensures safe handling and proper disposal.'
    },
    {
      question: 'What types of medical waste can you handle?',
      answer: 'We handle all categories of medical waste including sharps (needles, syringes), infectious materials, pharmaceuticals, chemotherapy waste, contaminated equipment, and biological waste. All waste is disposed of according to Queensland health regulations.'
    },
    {
      question: 'Is medical waste cleanup covered by insurance?',
      answer: 'Coverage depends on the circumstances. Home hoarding situations with medical waste, or contamination from medical events may be covered. We work with all major insurers and can help determine coverage and manage claims.'
    },
    {
      question: 'How do you dispose of medical waste safely?',
      answer: 'We follow strict Queensland health regulations for medical waste disposal. Sharps go in approved puncture-resistant containers, infectious materials are properly bagged and labelled, and all waste is transported to licensed medical waste disposal facilities. We provide full documentation and certificates of disposal.'
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
      <section className="relative bg-gradient-to-r from-teal-900 to-teal-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre mb-6">
              <AlertCircle className="h-16 w-16 text-teal-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Medical Waste Cleanup Brisbane, Ipswich & Logan
            </h1>
            <p className="text-xl mb-8 text-teal-100">
              Professional medical waste cleanup and safe disposal services. Sharps, infectious materials, pharmaceuticals. IICRC certified. Available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-centre">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => setShowQuoteDialog(true)}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Request Safe Disposal Service
              </Button>
            </div>
            <p className="mt-4 text-sm text-teal-200">
              <Shield className="inline h-4 w-4 mr-1" />
              Full compliance with Queensland health regulations
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-centre">
                <Clock className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">24/7 Response</h3>
                <p className="text-sm text-gray-600">2-hour emergency response time</p>
              </Card>
              <Card className="p-6 text-centre">
                <Shield className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Certified Safe</h3>
                <p className="text-sm text-gray-600">Full regulatory compliance</p>
              </Card>
              <Card className="p-6 text-centre">
                <AlertCircle className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Proper Disposal</h3>
                <p className="text-sm text-gray-600">Licensed medical waste facilities</p>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mb-6">Professional Medical Waste Cleanup & Disposal</h2>
            <p className="text-lg text-gray-700 mb-8">
              When you need medical waste cleanup services in Brisbane, Ipswich, or Logan, Disaster Recovery
              provides safe, compliant handling and disposal of sharps, infectious materials, and pharmaceuticals
              following all Queensland health regulations.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Our Services</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Sharps collection and disposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Infectious waste removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Pharmaceutical waste disposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Contaminated equipment cleanup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Biological waste handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Decontamination and sanitization</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>IICRC certified professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Queensland health compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Licensed disposal facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Proper containment protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Full documentation provided</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Safe, professional service</span>
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="p-6 bg-teal-50 border-teal-200 mb-12">
              <h3 className="text-xl font-bold mb-4">Our Safe Medical Waste Disposal Process</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold text-teal-600">1.</span>
                  <div>
                    <strong>Assessment:</strong> Our trained team arrives with proper protective equipment and approved medical waste containers.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-teal-600">2.</span>
                  <div>
                    <strong>Safe Collection:</strong> We identify and categorise all medical waste including sharps, infectious materials, and pharmaceuticals.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-teal-600">3.</span>
                  <div>
                    <strong>Proper Containment:</strong> All waste is placed in approved puncture-resistant sharps containers and biohazard bags with proper labelling.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-teal-600">4.</span>
                  <div>
                    <strong>Area Decontamination:</strong> Complete cleaning and sanitization of all areas where medical waste was stored or found.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-teal-600">5.</span>
                  <div>
                    <strong>Licensed Transport:</strong> All medical waste is transported to Queensland-approved medical waste disposal facilities.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-teal-600">6.</span>
                  <div>
                    <strong>Documentation:</strong> You receive certificates of disposal and full documentation for your records.
                  </div>
                </li>
              </ol>
            </Card>

            <Card className="p-6 bg-yellow-50 border-yellow-200">
              <h3 className="text-xl font-bold mb-4 flex items-centre gap-2">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
                Common Medical Waste We Handle
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">Sharps</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Needles and syringes</li>
                    <li>• Lancets and scalpels</li>
                    <li>• Broken glass vials</li>
                    <li>• IV catheters</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Infectious Materials</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Blood-soaked bandages</li>
                    <li>• Contaminated gloves</li>
                    <li>• Used medical equipment</li>
                    <li>• Biological specimens</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Pharmaceuticals</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Expired medications</li>
                    <li>• Chemotherapy drugs</li>
                    <li>• Controlled substances</li>
                    <li>• Unused prescriptions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Contaminated Items</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Soiled bedding</li>
                    <li>• Contaminated clothing</li>
                    <li>• Medical devices</li>
                    <li>• Disposable equipment</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-10">Medical Waste Cleanup FAQs</h2>
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
      <section className="py-16 bg-gradient-to-r from-teal-900 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">Need Medical Waste Cleanup Services?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Safe, compliant medical waste disposal available 24/7. Licensed facilities, full documentation provided.
          </p>
          <Button
            size="lg"
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => setShowQuoteDialog(true)}
          >
            <MessageSquare className="mr-2" />
            Request Safe Disposal Service
          </Button>
        </div>
      </section>

      {/* Quote dialogue */}
      <dialogue open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Medical Waste Cleanup Services</DialogTitle>
            <DialogDescription>
              Professional medical waste disposal available 24/7. Full regulatory compliance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-centre gap-3 p-3 bg-teal-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-teal-700" />
              <div>
                <p className="font-semibold">Safe Disposal Request</p>
                <p className="text-sm text-gray-600">Licensed & compliant service</p>
              </div>
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Request Service
            </Button>
          </div>
        </DialogContent>
      </dialogue>
    </div>
  );
}

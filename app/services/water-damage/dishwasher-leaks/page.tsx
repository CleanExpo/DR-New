'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  CheckCircle,
  Phone,
  Clock,
  Shield,
  Droplets,
  Home,
  Wrench,
  AlertTriangle,
  FileText,
  DollarSign,
  Users
} from 'lucide-react';
import ServicePageLayout from '@/components/services/ServicePageLayout';
import QuoteDialog from '@/components/QuoteDialog';

export default function DishwasherLeaksPage() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  return (
    <ServicePageLayout
      heroImage="/images/services/water-damage/dishwasher-leak-hero.jpg"
      heroTitle="Dishwasher Leak Water Damage Restoration"
      heroDescription="Professional dishwasher leak cleanup and water damage restoration in Brisbane. 24/7 emergency response to prevent kitchen and floor damage."
    >
      {/* Emergency Alert */}
      <Alert className="mb-8 border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-lg">
          <strong>Dishwasher Leaking?</strong> Turn off water supply immediately. Our emergency team responds within 60 minutes in Brisbane, Ipswich, and Logan.
        </AlertDescription>
      </Alert>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <Card className="border-2 border-blue-500 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Phone className="h-6 w-6 text-blue-600" />
              Emergency Response
            </h3>
            <p className="mb-4">Immediate dishwasher leak cleanup available 24/7</p>
            <a href="tel:1300309361" className="inline-block">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Call 1300 309 361 Now
              </Button>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-green-600" />
              Insurance Claims
            </h3>
            <p className="mb-4">We work with all insurance companies</p>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => setShowQuoteDialog(true)}
            >
              Get Insurance Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Common Dishwasher Leak Issues */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Common Dishwasher Leak Problems We Fix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-3 text-lg">Leak Sources</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Droplets className="h-5 w-5 text-blue-500 mt-0.5" />
                  <span>Door seal failures causing front leaks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplets className="h-5 w-5 text-blue-500 mt-0.5" />
                  <span>Supply line ruptures flooding kitchen</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplets className="h-5 w-5 text-blue-500 mt-0.5" />
                  <span>Drain hose blockages causing overflow</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplets className="h-5 w-5 text-blue-500 mt-0.5" />
                  <span>Pump seal deterioration</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-lg">Damage We Repair</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Home className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Kitchen cabinet water damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Home className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Swollen kickboards and toe kicks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Home className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Warped timber and vinyl flooring</span>
                </li>
                <li className="flex items-start gap-2">
                  <Home className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Subfloor saturation and rot</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Immediate Steps */}
      <Card className="mb-12 border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            Immediate Steps for Dishwasher Leaks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold mb-2">1. Stop the Water</h4>
              <ul className="space-y-1 text-sm">
                <li>• Turn off dishwasher immediately</li>
                <li>• Close water supply valve</li>
                <li>• Disconnect power at breaker</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">2. Limit Damage</h4>
              <ul className="space-y-1 text-sm">
                <li>• Remove items from cabinets</li>
                <li>• Mop up standing water</li>
                <li>• Place towels to contain spread</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">3. Document & Call</h4>
              <ul className="space-y-1 text-sm">
                <li>• Take photos for insurance</li>
                <li>• Note time and extent</li>
                <li>• Call us: 1300 309 361</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Our Process */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Our Dishwasher Leak Restoration Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Emergency Water Extraction",
                description: "Remove all standing water from kitchen and affected areas",
                time: "0-2 hours"
              },
              {
                step: 2,
                title: "Cabinet & Floor Assessment",
                description: "Inspect cabinets, kickboards, flooring, and subfloor for damage",
                time: "2-4 hours"
              },
              {
                step: 3,
                title: "Structural Drying",
                description: "Deploy specialized drying equipment for cabinets and floors",
                time: "24-72 hours"
              },
              {
                step: 4,
                title: "Restoration & Repairs",
                description: "Replace damaged materials and restore kitchen to pre-loss condition",
                time: "2-5 days"
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                  <Badge variant="secondary" className="mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.time}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Why Kitchen Water Damage is Serious */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Why Dishwasher Leaks Need Immediate Attention</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Hidden Damage Risks
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Water spreads under cabinets unseen</li>
                <li>• Particle board swells and disintegrates</li>
                <li>• Subfloor damage requires major repairs</li>
                <li>• Mould grows in 24-48 hours</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Cost Escalation Timeline
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Day 1: Simple water extraction</li>
                <li>• Day 3: Cabinet replacement needed</li>
                <li>• Week 1: Flooring replacement</li>
                <li>• Week 2: Subfloor and mould remediation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Areas */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Brisbane Dishwasher Leak Response Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-bold mb-2">Brisbane Suburbs</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• CBD & Inner City</li>
                <li>• Northern Suburbs</li>
                <li>• Southern Suburbs</li>
                <li>• Eastern Suburbs</li>
                <li>• Western Suburbs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Ipswich Areas</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Ipswich Central</li>
                <li>• Springfield</li>
                <li>• Redbank</li>
                <li>• Karalee</li>
                <li>• Brookwater</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Logan Region</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Logan Central</li>
                <li>• Springwood</li>
                <li>• Beenleigh</li>
                <li>• Shailer Park</li>
                <li>• Underwood</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don't Let Dishwasher Leaks Damage Your Kitchen
          </h2>
          <p className="text-xl mb-6">
            Fast response prevents costly cabinet and floor replacement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1300309361">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Phone className="mr-2" />
                Call 1300 309 361
              </Button>
            </a>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setShowQuoteDialog(true)}
            >
              Get Free Assessment
            </Button>
          </div>
          <div className="mt-8 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>60 Min Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Insurance Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>IICRC Certified</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <QuoteDialog
        isOpen={showQuoteDialog}
        onClose={() => setShowQuoteDialog(false)}
        serviceType="Dishwasher Leak Water Damage"
      />
    </ServicePageLayout>
  );
}
import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle, AlertTriangle, Droplets, Train } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Annerley Water Damage Restoration - 24/7 Emergency Response | Brisbane Master Restorer',
  description: 'Emergency water damage restoration Annerley Brisbane. Master Restorer Phill McGurk provides 24/7 response for flooding, burst pipes, storm damage near Fairfield station. Insurance approved.',
  keywords: 'Annerley water damage restoration, emergency water damage Annerley Brisbane, burst pipe Annerley, flood restoration Annerley QLD, Fairfield station area water damage'
};

export default function AnnerleyWaterDamagePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre items-centre mb-6">
              <Droplets className="h-12 w-12 mr-4 text-blue-300" />
              <Train className="h-12 w-12 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Annerley Water Damage Restoration
              <span className="block text-blue-300 text-3xl mt-4">Inner South Brisbane Emergency Service</span>
            </h1>
            <p className="text-xl mb-8">
              Professional water damage restoration for Annerley properties near Fairfield station and Ipswich Road.
              Master Restorer Phill McGurk provides immediate 24/7 emergency response for residential and commercial water damage.
            </p>

            <div className="bg-blue-500 text-white p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">ANNERLEY WATER EMERGENCY?</p>
              <p className="text-xl">Call Now - 24/7 Service</p>
              <p className="text-lg">Inner South Rapid Response</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-centre">
              <div>
                <Train className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Transport Hub</p>
                <p className="text-sm">Near Fairfield station</p>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Master Restorer</p>
                <p className="text-sm">Queensland certified</p>
              </div>
              <div>
                <Clock className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Fast Response</p>
                <p className="text-sm">60-90 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Annerley Area Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Annerley Water Damage Services
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Annerley Service Coverage</h3>
                <p className="text-lg mb-4">
                  Annerley is a vibrant inner-south suburb with diverse housing from heritage homes
                  to modern developments. Located along major transport corridors, properties here
                  face unique water damage challenges we're equipped to handle.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Fairfield station precinct</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Ipswich Road commercial strip</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Cracknell Road residential area</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Junction Park vicinity</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Droplets className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Annerley Water Damage Risks</h3>
                <p className="text-lg mb-4">
                  Annerley's mix of older homes and busy commercial areas creates specific
                  water damage scenarios we regularly address.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Older home plumbing failures</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Storm water drainage issues</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Commercial property flooding</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Unit complex water damage</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Service Features */}
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50">
              <h3 className="text-2xl font-bold text-centre mb-6">
                Comprehensive Annerley Water Damage Solutions
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 text-centre">
                  <Train className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-bold text-lg mb-2">Transport Corridor</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Near Fairfield station</li>
                    <li>• Ipswich Road businesses</li>
                    <li>• Quick access response</li>
                    <li>• Commercial expertise</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-centre">
                  <Droplets className="h-10 w-10 mx-auto mb-4 text-green-600" />
                  <h4 className="font-bold text-lg mb-2">Residential Focus</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Heritage home care</li>
                    <li>• Modern unit blocks</li>
                    <li>• Family home protection</li>
                    <li>• Content restoration</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-centre">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-purple-600" />
                  <h4 className="font-bold text-lg mb-2">Complete Service</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• 24/7 emergency response</li>
                    <li>• Water extraction</li>
                    <li>• Structural drying</li>
                    <li>• Insurance support</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Annerley Property Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Annerley Property Water Damage Expertise
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-8 border-l-4 border-l-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">
                Annerley Heritage Homes
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Common Issues:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Original timber floor damage</li>
                    <li>Aged plumbing systems</li>
                    <li>Roof and gutter failures</li>
                    <li>Under-house flooding</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">specialised Care:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Heritage-appropriate methods</li>
                    <li>Timber preservation</li>
                    <li>Character feature protection</li>
                    <li>Insurance documentation</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-green-600">
              <h3 className="text-2xl font-bold mb-4 text-green-800">
                Commercial Properties - Ipswich Road
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Business Types:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Retail stores</li>
                    <li>Professional offices</li>
                    <li>Restaurants and cafes</li>
                    <li>Service businesses</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Rapid Solutions:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>After-hours response</li>
                    <li>minimise downtime</li>
                    <li>Stock protection</li>
                    <li>Quick reopening</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-purple-600">
              <h3 className="text-2xl font-bold mb-4 text-purple-800">
                Modern Developments & Units
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Property Features:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Multi-level complexes</li>
                    <li>Shared facilities</li>
                    <li>Modern construction</li>
                    <li>Body corporate properties</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Our Approach:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Multi-unit coordination</li>
                    <li>Body corporate liaison</li>
                    <li>Rapid containment</li>
                    <li>neighbour protection</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Response Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Our Annerley Emergency Response Process
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="p-6">
                <div className="flex items-centre mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Step 1: Emergency Call</h3>
                </div>
                <p className="text-gray-700">
                  24/7 hotline answers immediately. We dispatch our Annerley team while providing
                  critical first-response guidance over the phone.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-centre mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Step 2: Rapid Arrival</h3>
                </div>
                <p className="text-gray-700">
                  60-90 minute response to Annerley. Our team arrives with industrial equipment
                  ready for immediate water extraction.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-centre mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Droplets className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Step 3: Water Extraction</h3>
                </div>
                <p className="text-gray-700">
                  Industrial pumps and extractors remove standing water. We begin drying processes
                  immediately to prevent secondary damage.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-centre mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Step 4: Full Restoration</h3>
                </div>
                <p className="text-gray-700">
                  Complete restoration to pre-damage condition. We handle repairs, insurance claims,
                  and ensure your Annerley property is fully restored.
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-blue-50">
              <h3 className="text-2xl font-bold text-centre mb-6">
                Why Annerley Residents Choose Us
              </h3>
              <div className="grid md:grid-cols-4 gap-4 text-centre">
                <div>
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <p className="font-semibold">Master Restorer</p>
                  <p className="text-sm text-gray-600">Highest certification</p>
                </div>
                <div>
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="font-semibold">24/7 Service</p>
                  <p className="text-sm text-gray-600">Always available</p>
                </div>
                <div>
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="font-semibold">Local Team</p>
                  <p className="text-sm text-gray-600">Know Annerley well</p>
                </div>
                <div>
                  <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="font-semibold">Insurance</p>
                  <p className="text-sm text-gray-600">Approved contractor</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            Annerley Water Damage Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let water damage worsen. Get immediate professional help from Queensland's Master Restorer.
          </p>
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-8 py-6">
                Get Emergency Help Now
              </Button>
            </Link>
            <p className="text-lg">
              Inner South Specialist • 24/7 Response • Master Restorer Certified
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
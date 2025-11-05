import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle, AlertTriangle, Droplets } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Seven Hills Water Damage Restoration - 24/7 Emergency Response | Master Restorer',
  description: 'Emergency water damage restoration Seven Hills Brisbane. Master Restorer Phill McGurk provides 24/7 emergency response for burst pipes, flooding, and water damage. Insurance approved. Call now for immediate help.',
  keywords: 'Seven Hills water damage restoration, emergency water damage Seven Hills, burst pipe repair Seven Hills Brisbane, flood restoration Seven Hills, water damage repair Seven Hills QLD'
};

export default function SevenHillsWaterDamagePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre items-centre mb-6">
              <Droplets className="h-12 w-12 mr-4 text-blue-300" />
              <MapPin className="h-12 w-12 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Seven Hills Water Damage Restoration
              <span className="block text-blue-300 text-3xl mt-4">24/7 Emergency Response</span>
            </h1>
            <p className="text-xl mb-8">
              Professional water damage restoration services in Seven Hills, Brisbane.
              Master Restorer Phill McGurk provides immediate emergency response for residential and commercial properties.
            </p>

            <div className="bg-blue-500 text-white p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">EMERGENCY WATER DAMAGE?</p>
              <p className="text-xl">Call Now - 24/7 Response</p>
              <p className="text-lg">Master Restorer on Call</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-centre">
              <div>
                <Clock className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Rapid Response</p>
                <p className="text-sm">60-90 min arrival</p>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Master Restorer</p>
                <p className="text-sm">Certified Expert</p>
              </div>
              <div>
                <Star className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Insurance Approved</p>
                <p className="text-sm">Direct billing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seven Hills Area Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Water Damage Services in Seven Hills, Brisbane
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Seven Hills Coverage Area</h3>
                <p className="text-lg mb-4">
                  Seven Hills is a residential suburb in Brisbane's eastern corridor, known for its family homes
                  and established properties. Our water damage restoration team knows the unique challenges of
                  Seven Hills properties, from older plumbing systems to sloping blocks prone to water runoff.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>All Seven Hills streets and estates</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Near Moreton Bay College area</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Seven Hills Reserve vicinity</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Rapid response from Brisbane East</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Droplets className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Common Water Issues in Seven Hills</h3>
                <p className="text-lg mb-4">
                  Seven Hills properties face specific water damage risks due to the suburb's topography
                  and housing stock. We specialise in addressing these local challenges.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Aging pipe infrastructure in older homes</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Storm water runoff on sloping blocks</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Retaining wall water seepage</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Roof leaks during storm season</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Service Features */}
            <Card className="p-8 bg-blue-50">
              <h3 className="text-2xl font-bold text-centre mb-6">
                Our Seven Hills Water Damage Restoration Services
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-centre">
                  <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-centre justify-centre">
                    <Phone className="h-10 w-10 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Emergency Response</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 24/7 availability</li>
                    <li>• 60-90 minute response</li>
                    <li>• Immediate water extraction</li>
                    <li>• Emergency tarping</li>
                  </ul>
                </div>
                <div className="text-centre">
                  <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-centre justify-centre">
                    <Shield className="h-10 w-10 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Professional Restoration</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Master Restorer certified</li>
                    <li>• Structural drying</li>
                    <li>• Mould prevention</li>
                    <li>• Content restoration</li>
                  </ul>
                </div>
                <div className="text-centre">
                  <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-centre justify-centre">
                    <Star className="h-10 w-10 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Insurance Support</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Direct insurance billing</li>
                    <li>• Claims documentation</li>
                    <li>• Detailed reporting</li>
                    <li>• Photo evidence</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Response Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Our Seven Hills Emergency Response Process
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6 border-l-4 border-l-blue-600">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Immediate Contact</h3>
                  <p className="text-gray-700">
                    Call our 24/7 emergency line. We'll dispatch our Seven Hills response team immediately
                    while providing you with crucial first steps to minimise damage.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-blue-600">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Rapid Assessment</h3>
                  <p className="text-gray-700">
                    Our Master Restorer arrives within 60-90 minutes to assess the damage, identify water sources,
                    and begin immediate containment measures.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-blue-600">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <span className="text-blue-600 font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Water Extraction</h3>
                  <p className="text-gray-700">
                    Using industrial-grade equipment, we extract standing water and begin the drying process
                    to prevent secondary damage and mould growth.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-blue-600">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <span className="text-blue-600 font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Complete Restoration</h3>
                  <p className="text-gray-700">
                    We restore your Seven Hills property to pre-damage condition, handling everything from
                    structural repairs to content restoration and final cleaning.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Why Seven Hills Residents Choose Our Services
          </h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-centre">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-lg mb-2">Master Restorer</h3>
              <p className="text-sm text-gray-700">
                Phill McGurk is one of the limited Master Restorers in Queensland
              </p>
            </Card>

            <Card className="p-6 text-centre">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-bold text-lg mb-2">Local Knowledge</h3>
              <p className="text-sm text-gray-700">
                We know Seven Hills properties and respond quickly from Brisbane East
              </p>
            </Card>

            <Card className="p-6 text-centre">
              <Clock className="h-12 w-12 mx-auto mb-4 text-orange-600" />
              <h3 className="font-bold text-lg mb-2">24/7 Available</h3>
              <p className="text-sm text-gray-700">
                Emergency response any time, including weekends and holidays
              </p>
            </Card>

            <Card className="p-6 text-centre">
              <Star className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-bold text-lg mb-2">Insurance Approved</h3>
              <p className="text-sm text-gray-700">
                Work with all major insurers with direct billing available
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            Water Damage Emergency in Seven Hills?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait - water damage worsens rapidly. Get immediate help from Queensland's Master Restorer.
          </p>
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-8 py-6">
                Get Emergency Help Now
              </Button>
            </Link>
            <p className="text-lg">
              24/7 Emergency Response • Master Restorer • Insurance Approved
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
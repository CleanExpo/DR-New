import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle, AlertTriangle, Droplets, Hospital } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Greenslopes Water Damage Restoration - 24/7 Emergency Service | Brisbane Master Restorer',
  description: 'Emergency water damage restoration Greenslopes Brisbane. Master Restorer Phill McGurk provides 24/7 response for hospital precinct, residential and commercial properties. Insurance approved.',
  keywords: 'Greenslopes water damage restoration, emergency water damage Greenslopes Brisbane, Greenslopes Private Hospital water damage, flood restoration Greenslopes QLD, burst pipe Greenslopes'
};

export default function GreenslopesWaterDamagePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center mb-6">
              <Droplets className="h-12 w-12 mr-4 text-blue-300" />
              <Hospital className="h-12 w-12 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Greenslopes Water Damage Restoration
              <span className="block text-blue-300 text-3xl mt-4">Hospital Precinct & Residential Specialist</span>
            </h1>
            <p className="text-xl mb-8">
              Expert water damage restoration for Greenslopes, including the hospital precinct,
              commercial properties, and residential homes. Master Restorer Phill McGurk provides
              critical emergency response 24/7.
            </p>

            <div className="bg-orange-500 text-white p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">WATER DAMAGE EMERGENCY?</p>
              <p className="text-xl">24/7 Immediate Response</p>
              <p className="text-lg">Hospital & Medical Facility Expert</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Hospital className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Medical Specialist</p>
                <p className="text-sm">Hospital certified</p>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Master Restorer</p>
                <p className="text-sm">Advanced certification</p>
              </div>
              <div>
                <Clock className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Priority Response</p>
                <p className="text-sm">60-90 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Greenslopes Area Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Greenslopes Water Damage Services
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Greenslopes Coverage Areas</h3>
                <p className="text-lg mb-4">
                  Greenslopes is home to major medical facilities, established residential areas,
                  and growing commercial precincts. Our specialized team understands the critical
                  nature of water damage in this diverse suburb.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Greenslopes Private Hospital precinct</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Logan Road commercial strip</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Chatsworth Road businesses</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Residential streets and units</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Hospital className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Critical Facility Expertise</h3>
                <p className="text-lg mb-4">
                  Greenslopes Private Hospital and surrounding medical facilities require
                  specialized water damage response to maintain critical operations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Hospital-grade sanitation protocols</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Medical equipment protection</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Minimal operational disruption</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Compliance with health standards</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Medical Facility Focus */}
            <Card className="p-8 bg-gradient-to-r from-red-50 to-blue-50">
              <h3 className="text-2xl font-bold text-center mb-6">
                Specialized Greenslopes Medical Facility Services
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <Hospital className="h-10 w-10 mx-auto mb-4 text-red-600" />
                  <h4 className="font-bold text-lg mb-2">Hospital Response</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Priority emergency service</li>
                    <li>• Infection control protocols</li>
                    <li>• Critical area protection</li>
                    <li>• 24/7 availability</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Droplets className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-bold text-lg mb-2">Medical Suites</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Equipment preservation</li>
                    <li>• Document recovery</li>
                    <li>• Sterile environment restoration</li>
                    <li>• Rapid response teams</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-green-600" />
                  <h4 className="font-bold text-lg mb-2">Compliance</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Health regulation adherence</li>
                    <li>• Certified procedures</li>
                    <li>• Documentation for audits</li>
                    <li>• Insurance coordination</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Greenslopes Property Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Water Damage Solutions for All Greenslopes Properties
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-8 border-l-4 border-l-red-600">
              <h3 className="text-2xl font-bold mb-4 text-red-800">
                Medical & Healthcare Facilities
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Facility Types:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Greenslopes Private Hospital</li>
                    <li>Medical specialist suites</li>
                    <li>Dental practices</li>
                    <li>Allied health clinics</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Specialized Services:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Priority response protocols</li>
                    <li>Sterile environment restoration</li>
                    <li>Equipment decontamination</li>
                    <li>Minimal disruption strategies</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">
                Greenslopes Residential Properties
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Common Issues:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Hillside water runoff damage</li>
                    <li>Aging infrastructure in older homes</li>
                    <li>Unit complex plumbing failures</li>
                    <li>Storm water ingress</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Our Response:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>24/7 emergency service</li>
                    <li>Slope-specific solutions</li>
                    <li>Heritage home expertise</li>
                    <li>Modern apartment specialists</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-green-600">
              <h3 className="text-2xl font-bold mb-4 text-green-800">
                Commercial Properties
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Business Types:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Logan Road retailers</li>
                    <li>Professional offices</li>
                    <li>Restaurants and cafes</li>
                    <li>Service businesses</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Business Solutions:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>After-hours emergency service</li>
                    <li>Rapid business reopening</li>
                    <li>Inventory protection</li>
                    <li>Insurance claim assistance</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Greenslopes Trusts Our Emergency Service
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Hospital className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <h3 className="font-bold text-lg mb-2">Medical Certified</h3>
                <p className="text-sm text-gray-700">
                  Approved for hospital and healthcare facility work
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-bold text-lg mb-2">Local Knowledge</h3>
                <p className="text-sm text-gray-700">
                  Know Greenslopes terrain and property challenges
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Shield className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-lg mb-2">Master Restorer</h3>
                <p className="text-sm text-gray-700">
                  Phill McGurk's advanced expertise and certification
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Clock className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-bold text-lg mb-2">Priority Response</h3>
                <p className="text-sm text-gray-700">
                  60-90 minute emergency arrival Greenslopes
                </p>
              </Card>
            </div>

            <Card className="mt-8 p-8 bg-red-50">
              <h3 className="text-2xl font-bold text-center mb-6">
                Greenslopes Hospital Precinct Emergency Protocol
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">Priority 1</div>
                  <p className="font-semibold">Medical Facilities</p>
                  <p className="text-sm text-gray-600">Immediate response</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">60 Min</div>
                  <p className="font-semibold">Target Response</p>
                  <p className="text-sm text-gray-600">Hospital precinct</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">Certified</div>
                  <p className="font-semibold">Health Standards</p>
                  <p className="text-sm text-gray-600">Compliant procedures</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Greenslopes Water Damage Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Medical facility, commercial property, or home - get immediate expert help from Queensland's Master Restorer.
          </p>
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-xl px-8 py-6">
                Get Emergency Help Now
              </Button>
            </Link>
            <p className="text-lg">
              Hospital Precinct Specialist • 24/7 Response • Master Restorer Certified
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
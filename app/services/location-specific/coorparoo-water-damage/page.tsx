import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle, AlertTriangle, Droplets, Building } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Coorparoo Water Damage Restoration - 24/7 Emergency Response | Master Restorer Brisbane',
  description: 'Emergency water damage restoration Coorparoo Brisbane. Master Restorer Phill McGurk provides 24/7 emergency response for flooding, burst pipes, storm damage. Commercial and residential specialist.',
  keywords: 'Coorparoo water damage restoration, emergency water damage Coorparoo, burst pipe repair Coorparoo Brisbane, flood restoration Coorparoo QLD, commercial water damage Coorparoo'
};

export default function CoorparooWaterDamagePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre items-centre mb-6">
              <Droplets className="h-12 w-12 mr-4 text-blue-300" />
              <Building className="h-12 w-12 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Coorparoo Water Damage Restoration
              <span className="block text-blue-300 text-3xl mt-4">Commercial & Residential Emergency Service</span>
            </h1>
            <p className="text-xl mb-8">
              Professional water damage restoration for Coorparoo's businesses and homes.
              Master Restorer Phill McGurk delivers rapid emergency response for shopping precincts, offices, and residential properties.
            </p>

            <div className="bg-red-500 text-white p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">URGENT WATER DAMAGE?</p>
              <p className="text-xl">Call Now - 24/7 Service</p>
              <p className="text-lg">Coorparoo Rapid Response Team</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-centre">
              <div>
                <Building className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Commercial Expert</p>
                <p className="text-sm">Shopping centres & offices</p>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Master Restorer</p>
                <p className="text-sm">Certified professional</p>
              </div>
              <div>
                <Clock className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">60-90 Minutes</p>
                <p className="text-sm">Emergency response</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coorparoo Area Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Water Damage Services Throughout Coorparoo
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Coorparoo Service Areas</h3>
                <p className="text-lg mb-4">
                  Coorparoo is a major commercial and residential hub with diverse property types.
                  From busy shopping precincts to quiet residential streets, we provide specialised
                  water damage restoration for all Coorparoo properties.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Coorparoo Square shopping precinct</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Old Cleveland Road businesses</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Cavendish Road commercial area</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Residential streets and apartments</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Building className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Coorparoo Property Types</h3>
                <p className="text-lg mb-4">
                  Our expertise covers Coorparoo's diverse property portfolio, from heritage homes
                  to modern commercial complexes.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Shopping centre water damage</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Office building pipe bursts</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Apartment complex flooding</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Heritage home water issues</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Commercial Focus Section */}
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-2xl font-bold text-centre mb-6">
                Coorparoo Commercial Water Damage Expertise
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 text-centre">
                  <Building className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-bold text-lg mb-2">Retail & Shopping</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Coorparoo Square emergencies</li>
                    <li>• Store flood response</li>
                    <li>• Minimal business disruption</li>
                    <li>• After-hours service</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-centre">
                  <Droplets className="h-10 w-10 mx-auto mb-4 text-purple-600" />
                  <h4 className="font-bold text-lg mb-2">Office Buildings</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Multi-floor water extraction</li>
                    <li>• Document drying services</li>
                    <li>• IT equipment protection</li>
                    <li>• Weekend emergency response</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-centre">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-green-600" />
                  <h4 className="font-bold text-lg mb-2">Property Management</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Body corporate approved</li>
                    <li>• Tenant coordination</li>
                    <li>• Insurance liaison</li>
                    <li>• Compliance documentation</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Coorparoo Specific Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Comprehensive Coorparoo Water Damage Solutions
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-8 border-l-4 border-l-purple-600">
              <h3 className="text-2xl font-bold mb-4 text-purple-800">
                Coorparoo Square & Commercial Precincts
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Common Emergencies:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Fire sprinkler system activation</li>
                    <li>Roof leaks affecting multiple stores</li>
                    <li>Parking area flooding</li>
                    <li>HVAC system water damage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Rapid Solutions:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Large-scale water extraction</li>
                    <li>Multiple team deployment</li>
                    <li>Business continuity focus</li>
                    <li>Coordinated tenant support</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">
                Coorparoo Residential Properties
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Property Types:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Post-war homes</li>
                    <li>Modern townhouses</li>
                    <li>Apartment complexes</li>
                    <li>Character Queenslanders</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Services Provided:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>24/7 emergency response</li>
                    <li>Complete water extraction</li>
                    <li>Structural drying</li>
                    <li>Contents restoration</li>
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
            Our Coorparoo Emergency Response Process
          </h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-centre hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-centre justify-centre">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Emergency Call</h3>
              <p className="text-sm text-gray-700">
                24/7 hotline with immediate Coorparoo dispatch
              </p>
            </Card>

            <Card className="p-6 text-centre hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-centre justify-centre">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Rapid Arrival</h3>
              <p className="text-sm text-gray-700">
                60-90 minute response to all Coorparoo locations
              </p>
            </Card>

            <Card className="p-6 text-centre hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-centre justify-centre">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Extract & Dry</h3>
              <p className="text-sm text-gray-700">
                Industrial equipment for immediate water removal
              </p>
            </Card>

            <Card className="p-6 text-centre hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-centre justify-centre">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Full Restoration</h3>
              <p className="text-sm text-gray-700">
                Complete repair and restoration to pre-damage state
              </p>
            </Card>
          </div>

          <Card className="mt-8 p-8 bg-blue-50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-centre mb-6">
              Why Coorparoo Chooses Our Services
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span><strong>Master Restorer:</strong> Phill McGurk's advanced certification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span><strong>Commercial Experience:</strong> Coorparoo Square specialist</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span><strong>Local Team:</strong> Based in Brisbane's eastern suburbs</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span><strong>Insurance Approved:</strong> All major insurers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span><strong>24/7 Service:</strong> Always available for emergencies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span><strong>Rapid Response:</strong> 60-90 minutes to Coorparoo</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            Coorparoo Water Damage Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Commercial or residential - get immediate professional help from Queensland's Master Restorer.
          </p>
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-8 py-6">
                Get Emergency Help Now
              </Button>
            </Link>
            <p className="text-lg">
              Commercial Specialist • 24/7 Response • Insurance Approved
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
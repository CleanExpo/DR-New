import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle, AlertTriangle, Droplets, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Camp Hill Water Damage Restoration - 24/7 Emergency Service | Brisbane Master Restorer',
  description: 'Emergency water damage restoration Camp Hill Brisbane. Master Restorer Phill McGurk provides 24/7 response for burst pipes, flooding, storm damage. Heritage home specialists. Insurance approved.',
  keywords: 'Camp Hill water damage restoration, emergency water damage Camp Hill Brisbane, burst pipe Camp Hill, flood restoration Camp Hill QLD, heritage home water damage Camp Hill'
};

export default function CampHillWaterDamagePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center mb-6">
              <Droplets className="h-12 w-12 mr-4 text-blue-300" />
              <Home className="h-12 w-12 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Camp Hill Water Damage Restoration
              <span className="block text-blue-300 text-3xl mt-4">Heritage Homes & Modern Properties</span>
            </h1>
            <p className="text-xl mb-8">
              Expert water damage restoration for Camp Hill's character homes and contemporary residences.
              Master Restorer Phill McGurk delivers immediate emergency response with specialized heritage property experience.
            </p>

            <div className="bg-orange-500 text-white p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">WATER DAMAGE EMERGENCY?</p>
              <p className="text-xl">24/7 Immediate Response</p>
              <p className="text-lg">Camp Hill Specialist Team</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Home className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Heritage Expert</p>
                <p className="text-sm">Queenslander specialist</p>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Master Certified</p>
                <p className="text-sm">Queensland's best</p>
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

      {/* Camp Hill Area Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Water Damage Restoration Services in Camp Hill
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Camp Hill Coverage</h3>
                <p className="text-lg mb-4">
                  Camp Hill is renowned for its elevated position, character Queenslanders, and mix of heritage
                  and modern homes. Our water damage team specializes in the unique requirements of Camp Hill's
                  diverse property portfolio, from 1920s Queenslanders to contemporary family homes.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Bennett's Road heritage precinct</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Martha Street residential area</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Near Camp Hill Marketplace</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>White's Hill Reserve vicinity</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Home className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Camp Hill Property Challenges</h3>
                <p className="text-lg mb-4">
                  Camp Hill's elevated position and heritage properties present unique water damage risks.
                  We understand these local challenges and provide specialized solutions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Heritage Queenslander timber damage</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Under-house flooding on slopes</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Aging copper and galvanized pipes</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Storm damage to character roofing</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Specialized Services for Camp Hill */}
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50">
              <h3 className="text-2xl font-bold text-center mb-6">
                Specialized Camp Hill Water Damage Services
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <Home className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-bold text-lg mb-2">Queenslander Restoration</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Timber floor drying</li>
                    <li>• VJ wall restoration</li>
                    <li>• Heritage feature protection</li>
                    <li>• Under-house water extraction</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Droplets className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-bold text-lg mb-2">Modern Home Solutions</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Plasterboard drying</li>
                    <li>• Carpet water extraction</li>
                    <li>• Modern material restoration</li>
                    <li>• Advanced drying systems</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-bold text-lg mb-2">Complete Protection</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Mould prevention treatment</li>
                    <li>• Structural assessment</li>
                    <li>• Contents restoration</li>
                    <li>• Insurance documentation</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Camp Hill Specific Scenarios */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Common Water Damage Scenarios in Camp Hill
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-8 border-l-4 border-l-green-600">
              <h3 className="text-2xl font-bold mb-4 text-green-800">
                Heritage Queenslander Water Damage
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Common Issues:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Water damage to original timber floors</li>
                    <li>VJ wall swelling and separation</li>
                    <li>Under-house flooding affecting stumps</li>
                    <li>Heritage roof leak damage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Our Solutions:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Specialized timber drying techniques</li>
                    <li>Heritage-appropriate restoration</li>
                    <li>Preservation of original features</li>
                    <li>Expert insurance claim support</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">
                Modern Camp Hill Home Flooding
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Typical Challenges:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Burst pipes in walls and ceilings</li>
                    <li>Hot water system failures</li>
                    <li>Storm water ingress</li>
                    <li>Bathroom and laundry leaks</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Rapid Response:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Immediate water extraction</li>
                    <li>Advanced drying equipment</li>
                    <li>Moisture monitoring technology</li>
                    <li>Complete restoration service</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Local Knowledge Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Camp Hill Residents Trust Our Team
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-bold text-lg mb-2">Local Knowledge</h3>
                <p className="text-sm text-gray-700">
                  We know Camp Hill's unique property types and challenges
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Home className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-lg mb-2">Heritage Experts</h3>
                <p className="text-sm text-gray-700">
                  Specialized in Queenslander and character home restoration
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Clock className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                <h3 className="font-bold text-lg mb-2">Rapid Response</h3>
                <p className="text-sm text-gray-700">
                  60-90 minute emergency response to Camp Hill
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Shield className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-bold text-lg mb-2">Master Restorer</h3>
                <p className="text-sm text-gray-700">
                  Phill McGurk - Queensland's certified water damage expert
                </p>
              </Card>
            </div>

            <Card className="mt-8 p-8 bg-blue-50">
              <h3 className="text-2xl font-bold text-center mb-6">
                Camp Hill Emergency Response Guarantee
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <p className="font-semibold">Emergency Service</p>
                  <p className="text-sm text-gray-600">Always available</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">60-90</div>
                  <p className="font-semibold">Minute Response</p>
                  <p className="text-sm text-gray-600">Camp Hill area</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <p className="font-semibold">Insurance Approved</p>
                  <p className="text-sm text-gray-600">All major insurers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Master</div>
                  <p className="font-semibold">Restorer Certified</p>
                  <p className="text-sm text-gray-600">Highest qualification</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Water Damage Emergency in Camp Hill?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Protect your Camp Hill property with immediate professional response. Master Restorer available 24/7.
          </p>
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-8 py-6">
                Get Emergency Help Now
              </Button>
            </Link>
            <p className="text-lg">
              Heritage Home Specialists • Master Restorer • Insurance Approved
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
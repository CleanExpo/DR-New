import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle, AlertTriangle, Droplets, Building2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'South Brisbane Water Damage Restoration - 24/7 Emergency Service | Cultural Precinct Specialist',
  description: 'Emergency water damage restoration South Brisbane. Master Restorer Phill McGurk provides 24/7 response for cultural precinct, high-rise apartments, commercial properties. Insurance approved.',
  keywords: 'South Brisbane water damage restoration, emergency water damage South Brisbane, cultural precinct water damage, Brisbane Convention Centre flooding, South Bank water damage'
};

export default function SouthBrisbaneWaterDamagePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center mb-6">
              <Droplets className="h-12 w-12 mr-4 text-blue-300" />
              <Building2 className="h-12 w-12 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              South Brisbane Water Damage Restoration
              <span className="block text-blue-300 text-3xl mt-4">Cultural Precinct & High-Rise Specialist</span>
            </h1>
            <p className="text-xl mb-8">
              Expert water damage restoration for South Brisbane's cultural precinct, high-rise apartments,
              and commercial properties. Master Restorer Phill McGurk provides critical 24/7 emergency response.
            </p>

            <div className="bg-purple-500 text-white p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">WATER DAMAGE EMERGENCY?</p>
              <p className="text-xl">24/7 Immediate Response</p>
              <p className="text-lg">High-Rise & Commercial Expert</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Building2 className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">High-Rise Expert</p>
                <p className="text-sm">Multi-level specialist</p>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Master Restorer</p>
                <p className="text-sm">Advanced certification</p>
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

      {/* South Brisbane Area Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            South Brisbane Water Damage Services
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">South Brisbane Coverage</h3>
                <p className="text-lg mb-4">
                  South Brisbane is a dynamic precinct featuring cultural venues, high-rise living,
                  and major commercial developments. Our specialized team understands the unique
                  water damage challenges of this riverside location.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Cultural Centre precinct</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Brisbane Convention Centre area</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>High-rise apartment towers</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Grey Street dining precinct</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Building2 className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">High-Rise Challenges</h3>
                <p className="text-lg mb-4">
                  South Brisbane's numerous high-rise buildings present unique water damage
                  scenarios requiring specialized equipment and expertise.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Multi-floor water migration</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Balcony and facade leaks</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Fire sprinkler activation</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Basement parking flooding</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Specialized Services */}
            <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50">
              <h3 className="text-2xl font-bold text-center mb-6">
                Specialized South Brisbane Services
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <Building2 className="h-10 w-10 mx-auto mb-4 text-purple-600" />
                  <h4 className="font-bold text-lg mb-2">High-Rise Response</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Multi-floor extraction</li>
                    <li>• Vertical water tracking</li>
                    <li>• Elevator shaft drying</li>
                    <li>• Body corporate liaison</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Star className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-bold text-lg mb-2">Cultural Venues</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Gallery protection</li>
                    <li>• Theatre restoration</li>
                    <li>• Sensitive materials</li>
                    <li>• Minimal disruption</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Droplets className="h-10 w-10 mx-auto mb-4 text-green-600" />
                  <h4 className="font-bold text-lg mb-2">Commercial</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Restaurant recovery</li>
                    <li>• Office restoration</li>
                    <li>• Convention centre</li>
                    <li>• Weekend service</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            South Brisbane Water Damage Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            High-rise, cultural venue, or commercial property - get immediate expert help from Queensland's Master Restorer.
          </p>
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-8 py-6">
                Get Emergency Help Now
              </Button>
            </Link>
            <p className="text-lg">
              High-Rise Specialist • Cultural Precinct Expert • 24/7 Response
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
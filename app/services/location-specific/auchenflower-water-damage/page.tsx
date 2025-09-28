import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle, AlertTriangle, Droplets, Home, TreePine } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Auchenflower Water Damage Restoration - 24/7 Emergency Response | Brisbane Master Restorer',
  description: 'Emergency water damage restoration Auchenflower Brisbane. Master Restorer Phill McGurk provides 24/7 response for riverside properties, heritage homes. Wesley Hospital area specialist.',
  keywords: 'Auchenflower water damage restoration, emergency water damage Auchenflower Brisbane, Wesley Hospital area flooding, riverside property water damage, Auchenflower heritage home restoration'
};

export default function AuchenflowerWaterDamagePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center mb-6">
              <Droplets className="h-12 w-12 mr-4 text-blue-300" />
              <TreePine className="h-12 w-12 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Auchenflower Water Damage Restoration
              <span className="block text-blue-300 text-3xl mt-4">Riverside & Heritage Property Specialist</span>
            </h1>
            <p className="text-xl mb-8">
              Professional water damage restoration for Auchenflower's prestigious riverside properties and heritage homes.
              Master Restorer Phill McGurk provides immediate 24/7 emergency response near Wesley Hospital.
            </p>

            <div className="bg-green-500 text-white p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">AUCHENFLOWER EMERGENCY?</p>
              <p className="text-xl">24/7 Rapid Response</p>
              <p className="text-lg">Riverside Property Expert</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <TreePine className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Riverside Expert</p>
                <p className="text-sm">Premium properties</p>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Master Restorer</p>
                <p className="text-sm">Elite certification</p>
              </div>
              <div>
                <Clock className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">60 Minutes</p>
                <p className="text-sm">Priority response</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auchenflower Area Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Auchenflower Premium Water Damage Services
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Auchenflower Coverage</h3>
                <p className="text-lg mb-4">
                  Auchenflower is one of Brisbane's most prestigious suburbs, featuring riverside
                  mansions, heritage properties, and proximity to Wesley Hospital. Our expertise
                  matches the high standards expected in this exclusive area.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Riverside Drive properties</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Wesley Hospital precinct</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Heritage-listed homes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Luxury apartment complexes</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Home className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Premium Property Challenges</h3>
                <p className="text-lg mb-4">
                  Auchenflower's high-value properties require specialized care and discretion
                  during water damage restoration.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Riverside flooding risks</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Heritage feature preservation</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Luxury finishes protection</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Pool and spa system damage</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Premium Services */}
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50">
              <h3 className="text-2xl font-bold text-center mb-6">
                Auchenflower Premium Restoration Services
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <Home className="h-10 w-10 mx-auto mb-4 text-green-600" />
                  <h4 className="font-bold text-lg mb-2">Luxury Homes</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Premium material care</li>
                    <li>• Art & antique protection</li>
                    <li>• Discretionary service</li>
                    <li>• High-end finishes</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <TreePine className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-bold text-lg mb-2">Riverside Properties</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Flood mitigation</li>
                    <li>• Foundation protection</li>
                    <li>• Garden restoration</li>
                    <li>• Retaining wall care</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-purple-600" />
                  <h4 className="font-bold text-lg mb-2">Elite Service</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Priority response</li>
                    <li>• White glove service</li>
                    <li>• Insurance concierge</li>
                    <li>• Complete discretion</li>
                  </ul>
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
            Auchenflower Water Damage Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Premium property restoration with the discretion and expertise you expect. Master Restorer available 24/7.
          </p>
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-xl px-8 py-6">
                Get Emergency Help Now
              </Button>
            </Link>
            <p className="text-lg">
              Riverside Specialist • Heritage Expert • Premium Service
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
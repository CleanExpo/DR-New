import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle, AlertTriangle, Droplets, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Red Hill Water Damage Restoration - 24/7 Emergency | Heritage Queenslander Specialist',
  description: 'Emergency water damage restoration Red Hill Brisbane. Master Restorer Phill McGurk provides 24/7 response for heritage Queenslanders, character homes, hillside properties. Insurance approved.',
  keywords: 'Red Hill water damage restoration, emergency water damage Red Hill Brisbane, Queenslander water damage, heritage home restoration Red Hill, Paddington Terrace flooding'
};

export default function RedHillWaterDamagePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre items-centre mb-6">
              <Droplets className="h-12 w-12 mr-4 text-blue-300" />
              <Home className="h-12 w-12 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Red Hill Water Damage Restoration
              <span className="block text-blue-300 text-3xl mt-4">Heritage Queenslander & Character Home Expert</span>
            </h1>
            <p className="text-xl mb-8">
              specialised water damage restoration for Red Hill's prestigious heritage homes and Queenslanders.
              Master Restorer Phill McGurk provides expert 24/7 emergency response for character properties.
            </p>

            <div className="bg-red-600 text-white p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">RED HILL WATER EMERGENCY?</p>
              <p className="text-xl">24/7 Heritage Expert Response</p>
              <p className="text-lg">Character Home Specialist</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-centre">
              <div>
                <Home className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Heritage Expert</p>
                <p className="text-sm">Queenslander specialist</p>
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

      {/* Red Hill Area Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Red Hill Heritage Property Water Damage Services
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Red Hill Coverage</h3>
                <p className="text-lg mb-4">
                  Red Hill is renowned for its elevated position, stunning city views, and
                  concentration of heritage Queenslanders. Our expertise matches the prestige
                  and heritage value of this exclusive inner-city suburb.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Paddington Terrace properties</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Musgrave Road heritage homes</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Kennedy Terrace estates</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Character-filled residential streets</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Home className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Heritage Property Challenges</h3>
                <p className="text-lg mb-4">
                  Red Hill's heritage Queenslanders and elevated positions create unique
                  restoration requirements we specialise in.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Original timber floor damage</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>VJ wall and ceiling issues</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Heritage roof complications</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Steep block water runoff</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            Red Hill Water Damage Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Heritage home expertise with the care your character property deserves. Master Restorer available 24/7.
          </p>
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-xl px-8 py-6">
                Get Emergency Help Now
              </Button>
            </Link>
            <p className="text-lg">
              Heritage Queenslander Expert • Character Home Specialist • 24/7 Response
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
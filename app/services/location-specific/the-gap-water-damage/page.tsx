import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle, AlertTriangle, Droplets, Mountain } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Gap Water Damage Restoration - 24/7 Emergency Service | Brisbane Hills Specialist',
  description: 'Emergency water damage restoration The Gap Brisbane. Master Restorer Phill McGurk provides 24/7 response for hillside properties, family homes. Bushland setting expertise.',
  keywords: 'The Gap water damage restoration, emergency water damage The Gap Brisbane, bushland property flooding, hillside water damage The Gap, storm damage restoration The Gap'
};

export default function TheGapWaterDamagePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre items-centre mb-6">
              <Droplets className="h-12 w-12 mr-4 text-blue-300" />
              <Mountain className="h-12 w-12 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Gap Water Damage Restoration
              <span className="block text-blue-300 text-3xl mt-4">Bushland & Hillside Property Expert</span>
            </h1>
            <p className="text-xl mb-8">
              specialised water damage restoration for The Gap's unique bushland setting and sloping properties.
              Master Restorer Phill McGurk provides immediate 24/7 emergency response to this western Brisbane suburb.
            </p>

            <div className="bg-green-600 text-white p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">THE GAP EMERGENCY?</p>
              <p className="text-xl">24/7 Rapid Response</p>
              <p className="text-lg">Hillside Property Specialist</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-centre">
              <div>
                <Mountain className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Hillside Expert</p>
                <p className="text-sm">Slope challenges</p>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Master Restorer</p>
                <p className="text-sm">Certified specialist</p>
              </div>
              <div>
                <Clock className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">90 Minutes</p>
                <p className="text-sm">Western suburbs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Gap Area Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            The Gap Water Damage Services
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">The Gap Coverage Area</h3>
                <p className="text-lg mb-4">
                  The Gap's bushland setting and hillside properties create unique water damage
                  challenges. Our team specialises in the specific needs of this leafy western suburb.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Waterworks Road corridor</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Settlement Road area</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Payne Road properties</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Bushland estate homes</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Mountain className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Hillside Property Challenges</h3>
                <p className="text-lg mb-4">
                  The Gap's sloping terrain and bushland proximity present specific water
                  damage risks we're equipped to handle.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Storm water runoff damage</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Retaining wall failures</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Under-house flooding</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Tree root pipe damage</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            The Gap Water Damage Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            specialised hillside and bushland property restoration. Master Restorer available 24/7.
          </p>
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 text-xl px-8 py-6">
                Get Emergency Help Now
              </Button>
            </Link>
            <p className="text-lg">
              Hillside Specialist • Storm Damage Expert • 24/7 Response
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
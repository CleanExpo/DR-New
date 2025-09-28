import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle, AlertTriangle, Droplets, Factory } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Wacol Water Damage Restoration - 24/7 Emergency | Industrial & Residential Specialist',
  description: 'Emergency water damage restoration Wacol Brisbane. Master Restorer Phill McGurk provides 24/7 response for industrial facilities, residential properties, flood-prone areas. Insurance approved.',
  keywords: 'Wacol water damage restoration, emergency water damage Wacol Brisbane, industrial water damage Wacol, flood restoration Wacol QLD, warehouse water damage'
};

export default function WacolWaterDamagePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center mb-6">
              <Droplets className="h-12 w-12 mr-4 text-blue-300" />
              <Factory className="h-12 w-12 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Wacol Water Damage Restoration
              <span className="block text-blue-300 text-3xl mt-4">Industrial & Residential Emergency Service</span>
            </h1>
            <p className="text-xl mb-8">
              Professional water damage restoration for Wacol's industrial facilities and residential areas.
              Master Restorer Phill McGurk provides critical 24/7 emergency response for warehouses and homes.
            </p>

            <div className="bg-orange-600 text-white p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">WACOL WATER EMERGENCY?</p>
              <p className="text-xl">24/7 Industrial Response</p>
              <p className="text-lg">Warehouse & Home Specialist</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Factory className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Industrial Expert</p>
                <p className="text-sm">Warehouse specialist</p>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Master Restorer</p>
                <p className="text-sm">Certified professional</p>
              </div>
              <div>
                <Clock className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">90 Minutes</p>
                <p className="text-sm">Southwest response</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wacol Area Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Wacol Water Damage Services
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Wacol Service Coverage</h3>
                <p className="text-lg mb-4">
                  Wacol combines industrial zones, residential neighborhoods, and flood-prone
                  riverside areas. Our team specializes in both large-scale industrial and
                  residential water damage restoration.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Industrial estates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Residential neighborhoods</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Brisbane River corridor</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Wolston Road businesses</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Factory className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Industrial & Flood Challenges</h3>
                <p className="text-lg mb-4">
                  Wacol's industrial facilities and flood history require specialized
                  water damage expertise and rapid response capabilities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Warehouse flooding</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Industrial equipment damage</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>River flood impacts</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Stock and inventory protection</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Service Features */}
            <Card className="p-8 bg-gradient-to-r from-orange-50 to-blue-50">
              <h3 className="text-2xl font-bold text-center mb-6">
                Wacol Specialized Services
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <Factory className="h-10 w-10 mx-auto mb-4 text-orange-600" />
                  <h4 className="font-bold text-lg mb-2">Industrial</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Warehouse extraction</li>
                    <li>• Equipment drying</li>
                    <li>• Stock salvage</li>
                    <li>• Large-scale response</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Droplets className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-bold text-lg mb-2">Flood Response</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• Rapid deployment</li>
                    <li>• Mud removal</li>
                    <li>• Sanitization</li>
                    <li>• Structural drying</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-green-600" />
                  <h4 className="font-bold text-lg mb-2">Complete Service</h4>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• 24/7 emergency</li>
                    <li>• Insurance support</li>
                    <li>• Full restoration</li>
                    <li>• Mould prevention</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Wacol Water Damage Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Industrial facility or residential property - get immediate professional help from Queensland's Master Restorer.
          </p>
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-xl px-8 py-6">
                Get Emergency Help Now
              </Button>
            </Link>
            <p className="text-lg">
              Industrial Specialist • Flood Expert • 24/7 Response
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
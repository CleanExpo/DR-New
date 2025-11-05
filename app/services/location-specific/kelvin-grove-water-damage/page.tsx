import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle, AlertTriangle, Droplets, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kelvin Grove Water Damage Restoration - 24/7 Emergency | QUT Area Specialist',
  description: 'Emergency water damage restoration Kelvin Grove Brisbane. Master Restorer Phill McGurk provides 24/7 response for QUT campus area, student accommodation, urban village. Insurance approved.',
  keywords: 'Kelvin Grove water damage restoration, emergency water damage Kelvin Grove Brisbane, QUT water damage, Kelvin Grove Urban Village flooding, student accommodation water damage'
};

export default function KelvinGroveWaterDamagePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre items-centre mb-6">
              <Droplets className="h-12 w-12 mr-4 text-blue-300" />
              <GraduationCap className="h-12 w-12 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kelvin Grove Water Damage Restoration
              <span className="block text-blue-300 text-3xl mt-4">QUT Campus & Urban Village Expert</span>
            </h1>
            <p className="text-xl mb-8">
              Expert water damage restoration for Kelvin Grove Urban Village, QUT campus vicinity,
              and student accommodation. Master Restorer Phill McGurk provides 24/7 emergency response.
            </p>

            <div className="bg-orange-500 text-white p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">KELVIN GROVE EMERGENCY?</p>
              <p className="text-xl">24/7 Immediate Response</p>
              <p className="text-lg">Student & Campus Specialist</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-centre">
              <div>
                <GraduationCap className="h-10 w-10 mx-auto mb-2 text-blue-300" />
                <p className="font-bold">Campus Expert</p>
                <p className="text-sm">QUT area specialist</p>
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

      {/* Kelvin Grove Area Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Kelvin Grove Water Damage Services
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Kelvin Grove Coverage</h3>
                <p className="text-lg mb-4">
                  Kelvin Grove combines education facilities, modern urban living, and diverse
                  accommodation types. Our team specialises in the unique needs of this dynamic precinct.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>QUT Kelvin Grove campus</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Kelvin Grove Urban Village</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Student accommodation blocks</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Musk Avenue commercial area</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <GraduationCap className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Campus Area Challenges</h3>
                <p className="text-lg mb-4">
                  High-density living and educational facilities present unique water damage
                  scenarios requiring specialised response.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Student accommodation flooding</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Multi-level apartment damage</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>Commercial kitchen incidents</span>
                  </li>
                  <li className="flex items-centre">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <span>High-density plumbing issues</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            Kelvin Grove Water Damage Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Campus, student accommodation, or urban village - get immediate expert help 24/7.
          </p>
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-xl px-8 py-6">
                Get Emergency Help Now
              </Button>
            </Link>
            <p className="text-lg">
              QUT Area Specialist • Student Accommodation Expert • 24/7 Response
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
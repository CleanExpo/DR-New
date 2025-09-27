import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Shield, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '24 Hour Emergency Water Damage Restoration Hamilton Ascot New Farm Brisbane Master Restorer',
  description: '24/7 emergency water damage restoration Hamilton Ascot New Farm Brisbane. Master Restorer Phill McGurk responds within 60 minutes. Call now for immediate help with burst pipes, ceiling leaks, flooding in premium Brisbane suburbs.',
  keywords: 'emergency water damage restoration Hamilton Brisbane, 24 hour water damage repair Ascot, emergency flood restoration New Farm, Brisbane water damage restoration 24 hours, Hamilton emergency restoration service'
};

export default function EmergencyWaterDamageRestorationHamiltonAscotNewFarmPage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Hero Section */}
      <section className="bg-gradient-to-b from-red-900 to-red-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center mb-6">
              <Phone className="h-12 w-12 mr-4 text-yellow-400 animate-pulse" />
              <Clock className="h-12 w-12 mr-4 text-yellow-400" />
              <MapPin className="h-12 w-12 text-yellow-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              24 Hour Emergency Water Damage Restoration
              <span className="block text-yellow-400">Hamilton • Ascot • New Farm • Brisbane</span>
            </h1>
            <p className="text-xl mb-8">
              Water pouring through your ceiling? Burst pipe flooding your Hamilton home?
              Get immediate help from Queensland Master Restorer Phill McGurk.
              We respond within 60 minutes to Hamilton, Ascot, New Farm, Bulimba and all Brisbane premium suburbs.
            </p>

            <div className="bg-yellow-500 text-black p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">🚨 CALL NOW FOR IMMEDIATE HELP</p>
              <p className="text-xl">[Emergency Number] - Available 24/7</p>
              <p className="text-lg">Response time: 60-90 minutes Hamilton area</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Clock className="h-10 w-10 mx-auto mb-2 text-yellow-400" />
                <p className="font-bold">24/7 Available</p>
                <p className="text-sm">Even Christmas Day</p>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-yellow-400" />
                <p className="font-bold">Master Restorer</p>
                <p className="text-sm">Limited in Queensland</p>
              </div>
              <div>
                <Star className="h-10 w-10 mx-auto mb-2 text-yellow-400" />
                <p className="font-bold">Insurance Approved</p>
                <p className="text-sm">Direct billing available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Response Coverage */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Emergency Response Coverage: Brisbane Premium Suburbs
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-2">Hamilton</h3>
                <p className="text-gray-600 mb-4">Waterfront Properties</p>
                <div className="space-y-2 text-sm">
                  <p>✓ 24/7 emergency response</p>
                  <p>✓ Heritage home specialists</p>
                  <p>✓ High-value property experience</p>
                  <p>✓ 60-minute response time</p>
                </div>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-2">Ascot</h3>
                <p className="text-gray-600 mb-4">Heritage Properties</p>
                <div className="space-y-2 text-sm">
                  <p>✓ Heritage restoration certified</p>
                  <p>✓ Premium insurance approved</p>
                  <p>✓ Character home specialists</p>
                  <p>✓ 24/7 availability</p>
                </div>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-2">New Farm</h3>
                <p className="text-gray-600 mb-4">Apartment Buildings</p>
                <div className="space-y-2 text-sm">
                  <p>✓ Multi-story expertise</p>
                  <p>✓ Body corporate approved</p>
                  <p>✓ Luxury apartment experience</p>
                  <p>✓ Immediate response</p>
                </div>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                <h3 className="text-xl font-bold mb-2">Bulimba</h3>
                <p className="text-gray-600 mb-4">Riverside Homes</p>
                <div className="space-y-2 text-sm">
                  <p>✓ River precinct properties</p>
                  <p>✓ Weather damage specialists</p>
                  <p>✓ Premium finishes experience</p>
                  <p>✓ Emergency callout</p>
                </div>
              </Card>
            </div>

            {/* Response Time Guarantee */}
            <Card className="p-8 bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Emergency Response Time Guarantee</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Clock className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">Hamilton/Ascot</h4>
                  <p className="text-3xl font-bold">60 minutes</p>
                  <p>From emergency call</p>
                </div>
                <div>
                  <Clock className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">New Farm/Bulimba</h4>
                  <p className="text-3xl font-bold">75 minutes</p>
                  <p>Including traffic considerations</p>
                </div>
                <div>
                  <Clock className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">Other Brisbane</h4>
                  <p className="text-3xl font-bold">90 minutes</p>
                  <p>Maximum response time</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Scenarios */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Common Emergency Scenarios in Hamilton & Ascot Properties
          </h2>

          <div className="max-w-6xl mx-auto space-y-8">
            <Card className="p-8 border-l-4 border-l-red-600">
              <h3 className="text-2xl font-bold mb-4 text-red-800">
                "Water is pouring through my ceiling at 2am - what do I do?"
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">IMMEDIATE ACTIONS:</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Turn off electricity at main switch if water near power</li>
                    <li>Place buckets/containers under all drips</li>
                    <li>Try to locate source - check upstairs bathrooms/laundry</li>
                    <li>Turn off water supply if burst pipe suspected</li>
                    <li><strong>Call us immediately: [Emergency Number]</strong></li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">WE WILL ARRIVE WITH:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Industrial water extraction equipment</li>
                    <li>Emergency tarps and containment</li>
                    <li>Moisture detection equipment</li>
                    <li>Professional assessment tools</li>
                    <li>Emergency lighting and safety equipment</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <p className="font-bold text-red-800 text-center">
                  DON'T WAIT: Water damage costs double every hour. Call now to minimize damage.
                </p>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">
                "My hot water system has burst and flooded my Hamilton house"
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">COMMON IN HAMILTON AREA:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Older heritage homes with aging systems</li>
                    <li>High water pressure from river proximity</li>
                    <li>Temperature fluctuations affecting pipes</li>
                    <li>Premium systems with complex connections</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">OUR HAMILTON RESPONSE:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Emergency water extraction within 60 minutes</li>
                    <li>Heritage-appropriate drying methods</li>
                    <li>Coordination with specialist plumbers</li>
                    <li>Insurance documentation and photos</li>
                    <li>Restoration to original character</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-green-600">
              <h3 className="text-2xl font-bold mb-4 text-green-800">
                "Storm has caused flooding in my Ascot heritage home"
              </h3>
              <div className="space-y-4">
                <p className="text-lg">
                  Ascot's heritage properties require specialized care during emergency restoration.
                  Our Master Restorer certification includes heritage-specific techniques for:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Original Timber</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Specialized drying techniques</li>
                      <li>• Timber preservation methods</li>
                      <li>• Character protection</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Heritage Plaster</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Lime plaster restoration</li>
                      <li>• Traditional repair methods</li>
                      <li>• Period-appropriate materials</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Decorative Features</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Ornate ceiling protection</li>
                      <li>• Heritage hardware care</li>
                      <li>• Character window restoration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Water Emergency in Hamilton, Ascot, or New Farm?
          </h2>
          <p className="text-2xl mb-8">
            Call Queensland Master Restorer Phill McGurk Now
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <Phone className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Emergency Line</h3>
              <p className="text-3xl font-bold mb-2">[Emergency Number]</p>
              <p>Available 24/7 • Even public holidays</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Clock className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Response Time</h3>
              <p className="text-3xl font-bold mb-2">60-90 Minutes</p>
              <p>Hamilton • Ascot • New Farm • Bulimba</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="tel:[EMERGENCY_NUMBER]">
              <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 text-2xl px-12 py-6 mr-4">
                📞 Call Emergency Line Now
              </Button>
            </Link>
            <Link href="/emergency">
              <Button size="lg" variant="outline" className="text-xl px-8 py-4 border-white text-white hover:bg-white hover:text-red-600">
                Emergency Information
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Master Restorer */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Hamilton & Ascot Properties Choose Master Restorer Phill McGurk
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Master Restorer Certification</h3>
                <p className="text-lg mb-4">
                  One of only a limited number of Master Restorers in Brisbane and Queensland.
                  This advanced certification ensures your Hamilton or Ascot property receives
                  the highest level of restoration expertise.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Advanced water damage restoration techniques</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Heritage property specialization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Premium insurance preferred contractor</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <MapPin className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Local Hamilton Expertise</h3>
                <p className="text-lg mb-4">
                  Specialized knowledge of Hamilton, Ascot, and New Farm properties.
                  We understand the unique challenges of Brisbane's premium suburbs.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Heritage home restoration experience</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>High-value property insurance claims</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Premium suburb building codes knowledge</span>
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="p-8 bg-blue-50">
              <h3 className="text-2xl font-bold text-center mb-6">
                Emergency Response Commitment to Hamilton & Ascot
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">60</div>
                  <p className="font-semibold">Minutes Response</p>
                  <p className="text-sm text-gray-600">Hamilton/Ascot area</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <p className="font-semibold">Availability</p>
                  <p className="text-sm text-gray-600">Including holidays</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <p className="font-semibold">Insurance Approved</p>
                  <p className="text-sm text-gray-600">Direct billing available</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Master</div>
                  <p className="font-semibold">Certified</p>
                  <p className="text-sm text-gray-600">Limited in Queensland</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Coverage Areas Detail */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Complete Brisbane Premium Suburb Coverage
          </h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-800">Inner City East</h3>
              <ul className="space-y-2">
                <li>• Hamilton (all areas)</li>
                <li>• Ascot (including racecourse precinct)</li>
                <li>• New Farm (riverfront & apartments)</li>
                <li>• Bulimba (riverside properties)</li>
                <li>• Hawthorne</li>
                <li>• Morningside</li>
                <li>• Balmoral</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-green-800">Inner City West</h3>
              <ul className="space-y-2">
                <li>• Toowong (all areas)</li>
                <li>• Paddington</li>
                <li>• Rosalie</li>
                <li>• Milton</li>
                <li>• Auchenflower</li>
                <li>• St Lucia</li>
                <li>• Taringa</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-purple-800">Extended Coverage</h3>
              <ul className="space-y-2">
                <li>• All Brisbane CBD</li>
                <li>• Fortitude Valley</li>
                <li>• Spring Hill</li>
                <li>• West End</li>
                <li>• South Brisbane</li>
                <li>• Kangaroo Point</li>
                <li>• Woolloongabba</li>
              </ul>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg mb-4">
              <strong>Not sure if we cover your area?</strong> Call our emergency line and we'll confirm immediate availability.
            </p>
            <Link href="tel:[EMERGENCY_NUMBER]">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Check Coverage - Call Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
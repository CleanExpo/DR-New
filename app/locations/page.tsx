import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, MapPin, Clock, Shield } from 'lucide-react'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function LocationsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Brisbane, Ipswich & Logan Service Areas
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Master Restorer Emergency Response Across All Brisbane Metro
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              Phill McGurk - IICRC Master Restorer provides rapid emergency restoration services across Brisbane, Ipswich, and Logan. 60-minute response to priority suburbs, 90-minute response metro-wide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 1300 309 361 Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Coverage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Service Area Coverage
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive emergency restoration services across all Brisbane metro, Ipswich, and Logan areas
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Brisbane */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    Brisbane
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    High-value riverside suburbs with 60-minute priority response. Expert flood recovery and premium property restoration.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 text-sm text-gray-500">Premium Suburbs (60-Min Response):</p>
                    <p className="text-gray-700">Hamilton, Ascot, New Farm, Toowong</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 text-sm text-gray-500">All Brisbane Areas:</p>
                    <p className="text-sm text-gray-600">
                      CBD, West End, Fortitude Valley, Milton, South Bank, Kangaroo Point, Paddington, Bulimba, Chermside, Carindale, Mt Gravatt, Indooroopilly
                    </p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold text-blue-600">Response: 60-90 minutes</p>
                  </div>
                </CardContent>
              </Card>

              {/* Ipswich */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    Ipswich
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Premium residential areas and growing commercial centers. Rapid emergency response for Ipswich properties.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 text-sm text-gray-500">Premium Suburbs (60-Min Response):</p>
                    <p className="text-gray-700">Karalee, Brookwater, Springfield Lakes</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 text-sm text-gray-500">All Ipswich Areas:</p>
                    <p className="text-sm text-gray-600">
                      Ipswich CBD, Springfield Central, Redbank Plains, Yamanto, Goodna, Booval, Bundamba, Leichhardt, North Ipswich
                    </p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold text-blue-600">Response: 60-90 minutes</p>
                  </div>
                </CardContent>
              </Card>

              {/* Logan */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    Logan
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Commercial and industrial focus with comprehensive residential coverage. Logan Central priority response.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 text-sm text-gray-500">All Logan Areas:</p>
                    <p className="text-sm text-gray-600">
                      Logan Central, Springwood, Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh, Eagleby, Marsden, Park Ridge
                    </p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold text-blue-600">Response: 60-90 minutes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Metropolitan Coverage
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From Caboolture to the Gold Coast - Our emergency response network covers all major Brisbane metro areas
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">3</div>
                <p className="text-lg font-semibold text-gray-900">Major Regions</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
                <p className="text-lg font-semibold text-gray-900">Suburbs Covered</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">60-90</div>
                <p className="text-lg font-semibold text-gray-900">Minute Response</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Emergency Services Available Across All Locations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Full range of IICRC Master certified restoration services in Brisbane, Ipswich, and Logan
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Water Damage Restoration</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Emergency flood recovery, burst pipes, storm water damage, structural drying
                  </p>
                </CardHeader>
                <CardContent>
                  <Link href="/services/water-damage-restoration">
                    <Button variant="outline" className="w-full">
                      View Service Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Fire Damage Restoration</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Smoke removal, soot cleanup, odor elimination, complete fire recovery
                  </p>
                </CardHeader>
                <CardContent>
                  <Link href="/services/fire-damage-restoration">
                    <Button variant="outline" className="w-full">
                      View Service Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Mould Remediation</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Professional mould removal, HEPA filtration, air quality testing
                  </p>
                </CardHeader>
                <CardContent>
                  <Link href="/services/mould-remediation">
                    <Button variant="outline" className="w-full">
                      View Service Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Storm Damage Restoration</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Emergency tarping, roof repairs, hail damage, wind damage recovery
                  </p>
                </CardHeader>
                <CardContent>
                  <Link href="/services/storm-damage-restoration">
                    <Button variant="outline" className="w-full">
                      View Service Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Response Guarantee */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Location-Based Response Guarantee
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Strategically positioned for rapid emergency response across all Brisbane metro areas
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 text-green-600" />
                    <CardTitle className="text-2xl">60 Minutes</CardTitle>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mt-2">Priority Response Areas</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Hamilton, Ascot, New Farm, Toowong, Karalee, Brookwater, Springfield Lakes, Brisbane CBD
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 text-blue-600" />
                    <CardTitle className="text-2xl">90 Minutes</CardTitle>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mt-2">Greater Metro Areas</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    All Brisbane suburbs, Ipswich region, Logan region, surrounding areas
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Need Emergency Restoration? We're Ready to Help
            </h2>
            <p className="text-xl text-blue-100">
              Available 24/7/365 across Brisbane, Ipswich, and Logan. Master Restorer certified emergency response.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 1300 309 361
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-6 bg-transparent"
              >
                View All Services
              </Button>
            </div>
            <p className="text-sm text-blue-200 pt-4">
              Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Surrounding Areas
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


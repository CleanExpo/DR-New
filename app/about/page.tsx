import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Award, Users, Heart, CheckCircle, MapPin, Clock, Shield, FileText } from 'lucide-react'
import { Footer } from '@/components/footer'

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              30+ Years of Disaster Recovery Excellence
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Brisbane's most trusted emergency restoration partner, with IICRC Master Restorer certified expertise and a proven track record of saving properties and lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="tel:+611300309361"
                className="inline-flex items-center justify-center h-10 rounded-md px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 1300 309 361
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Founded with a mission to provide rapid, professional disaster recovery services to Brisbane homeowners and businesses, we've built our reputation on reliability, expertise, and compassion during people's most challenging moments.
              </p>
              <p className="text-gray-700 mb-4 text-lg">
                Our founder, <strong>Phill McGurk</strong>, is an IICRC Master Restorer with over three decades of hands-on experience in water damage, fire restoration, mould remediation, and storm damage recovery. One of a limited number of Master Restorers in Brisbane and Queensland, Phill brings master-level expertise to every project.
              </p>
              <p className="text-gray-700 text-lg">
                We understand that a disaster doesn't wait for business hours. That's why we operate 24/7/365, with guaranteed 60-minute response times in Brisbane CBD and rapid deployment across Ipswich, Logan, and surrounding areas.
              </p>
            </div>
            <div className="relative">
              <img
                src="/profile.jpeg"
                alt="Phill McGurk, IICRC Master Restorer"
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-lg">Phill McGurk</p>
                <p className="text-sm">IICRC Master Restorer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide every restoration project and client interaction
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Heart className="h-12 w-12 text-red-500 mb-4" />
                  <CardTitle className="text-xl">Compassion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We treat every property and person with genuine care, understanding the stress and disruption emergencies cause. Your peace of mind is our priority.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Award className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    IICRC Master Restorer certification and rigorous standards ensure superior restoration results. We never compromise on quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-12 w-12 text-green-600 mb-4" />
                  <CardTitle className="text-xl">Reliability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Count on us 24/7/365 with guaranteed response times and professional execution. When disaster strikes, we're there.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-purple-600 mb-4" />
                  <CardTitle className="text-xl">Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Clear communication and honest assessments throughout the recovery process. No surprises, just professional service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Master Restorer Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Master Restorer Certified</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet Your Master Restorer
              </h2>
              <p className="text-xl font-semibold text-blue-600 mb-2">
                IICRC Master Restorer - Phill McGurk
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                One of Brisbane's limited IICRC Master Restorer certified professionals - the highest credential in disaster recovery. Your property receives master-level expertise in water, fire, smoke, and mould restoration.
              </p>
            </div>

            <Card className="border-2 border-blue-200">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-6">
                      <img 
                        src="/images/WhatsApp Image 2025-11-11 at 08.05.42.jpeg" 
                        alt="Master Restorer at work" 
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Master Restorer Credentials</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">IICRC Master Restorer Certification</p>
                          <p className="text-sm text-gray-600">Highest credential in disaster restoration</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">30+ Years Experience</p>
                          <p className="text-sm text-gray-600">Hands-on disaster recovery expertise</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Water Restoration Specialist</p>
                          <p className="text-sm text-gray-600">Expert in flood and water damage</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Fire & Smoke Restoration Expert</p>
                          <p className="text-sm text-gray-600">Complete fire damage recovery</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Advanced Mould Remediation</p>
                          <p className="text-sm text-gray-600">Health-focused mould removal</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="mb-6">
                      <img 
                        src="/images/WhatsApp Image 2025-11-11 at 08.05.43.jpeg" 
                        alt="Professional restoration work" 
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Why Master Restorer Matters</h3>
                    <p className="text-gray-700 mb-4">
                      The IICRC Master Restorer certification is the highest credential in the disaster restoration industry. Only a limited number of professionals in Brisbane and Queensland hold this certification.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Master Restorers have demonstrated advanced knowledge across all restoration disciplines, completed extensive training, and proven expertise through years of hands-on experience.
                    </p>
                    <p className="text-gray-700">
                      When you choose our services, you're getting master-level expertise, not basic technician work. Your property deserves the best.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Credentials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Credentials</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Certified expertise, proven track record, and trusted insurance partnerships
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src="/images/WhatsApp Image 2025-11-11 at 08.05.44.jpeg" 
                    alt="Certifications" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <Shield className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      IICRC Master Restorer
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Water Damage Restoration Specialist
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Fire & Smoke Restoration Expert
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Mould Remediation Specialist
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Biohazard Remediation Certified
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src="/images/WhatsApp Image 2025-11-11 at 08.06.29.jpeg" 
                    alt="Service Record" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <Award className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">Service Record</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      1000+ Properties Restored
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      98% Insurance Approval Rate
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      4.9/5 Customer Rating
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Zero Claims Disputes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      30+ Years Experience
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src="/images/WhatsApp Image 2025-11-11 at 08.06.30.jpeg" 
                    alt="Insurance Partnerships" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <FileText className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">Insurance Partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Suncorp Approved
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      RACQ Approved
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Allianz Approved
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      QBE Approved
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      All Major Insurers
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What sets us apart in Brisbane's disaster recovery industry
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-blue-600">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img 
                      src="/images/WhatsApp Image 2025-11-11 at 08.06.31.jpeg" 
                      alt="Local Expert" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex gap-4">
                    <MapPin className="h-8 w-8 text-blue-600 shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Local Expert</h3>
                      <p className="text-gray-700">
                        Deep knowledge of Brisbane properties, Queenslander homes, local building codes, flood zones, and weather patterns ensures optimal restoration strategies tailored to your property.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img 
                      src="/images/WhatsApp Image 2025-11-11 at 08.06.31 (1).jpeg" 
                      alt="Always Available" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Clock className="h-8 w-8 text-blue-600 shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Always Available</h3>
                      <p className="text-gray-700">
                        24/7/365 operations with guaranteed 60-minute response times in Brisbane CBD mean you never face a disaster alone. We're always ready when you need us most.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img 
                      src="/images/WhatsApp Image 2025-11-11 at 08.06.32.jpeg" 
                      alt="Master Restorer Certified" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Award className="h-8 w-8 text-blue-600 shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Master Restorer Certified</h3>
                      <p className="text-gray-700">
                        One of Brisbane's limited IICRC Master Restorers. Your property receives master-level expertise, not basic technician work. The highest standard in disaster recovery.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img 
                      src="/images/WhatsApp Image 2025-11-11 at 08.06.32 (1).jpeg" 
                      alt="Insurance Approved" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Shield className="h-8 w-8 text-blue-600 shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Insurance Approved</h3>
                      <p className="text-gray-700">
                        Pre-approved by all major Australian insurers. Direct billing available - no upfront costs for approved claims. We handle complete claim documentation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Service Areas</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage across Brisbane, Ipswich, and Logan
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Brisbane</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-gray-500 mb-2">60-Min Priority Response:</p>
                  <p className="text-gray-700 mb-4">Hamilton, Ascot, New Farm, Toowong, Paddington, Bulimba</p>
                  <p className="text-sm font-semibold text-gray-500 mb-2">All Areas:</p>
                  <p className="text-sm text-gray-600">
                    Brisbane CBD, West End, Fortitude Valley, Milton, South Bank, Kangaroo Point, Chermside, Carindale, Mt Gravatt, Indooroopilly
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Ipswich</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-gray-500 mb-2">60-Min Priority Response:</p>
                  <p className="text-gray-700 mb-4">Karalee, Brookwater, Springfield Lakes</p>
                  <p className="text-sm font-semibold text-gray-500 mb-2">All Areas:</p>
                  <p className="text-sm text-gray-600">
                    Ipswich CBD, Springfield Central, Redbank Plains, Yamanto, Goodna, Booval, Bundamba, Leichhardt
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Logan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-gray-500 mb-2">All Areas:</p>
                  <p className="text-sm text-gray-600">
                    Logan Central, Springwood, Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh, Eagleby
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
              Ready to Experience Master Restorer Excellence?
            </h2>
            <p className="text-xl text-blue-100">
              When disaster strikes, trust Brisbane's IICRC Master Restorer. Available 24/7/365 with guaranteed response times.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+611300309361"
                className="inline-flex items-center justify-center h-10 rounded-md px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 1300 309 361
              </a>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-6 bg-transparent"
              >
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

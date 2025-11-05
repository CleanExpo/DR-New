import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Award, CheckCircle, Star, Users, Clock, FileText, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Master Restorer Brisbane | IICRC Certified Water Damage Restoration Expert Phill McGurk',
  description: 'Phill McGurk - One of only a limited number of Master Restorers in Brisbane & Queensland. IICRC certified with 15+ years experience. specialising in high-value property restoration, insurance claims, heritage homes.',
  keywords: 'master restorer Brisbane, IICRC certified restorer Queensland, water damage restoration expert Brisbane, certified restoration contractor Hamilton Ascot, heritage property restoration specialist'
};

export default function MasterRestorerBrisbanePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre items-centre mb-6">
              <Shield className="h-16 w-16 mr-4 text-gold-400" />
              <Award className="h-16 w-16 text-gold-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Master Restorer Brisbane
              <span className="block text-gold-400">Phill McGurk - IICRC Certified Expert</span>
            </h1>
            <p className="text-xl mb-8">
              One of only a limited number of Master Restorers in Brisbane and Queensland.
              When your property requires the highest level of restoration expertise,
              trust the advanced certification and 15+ years of specialised experience.
            </p>

            <div className="bg-gold-500 text-black p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">📞 Master Restorer Direct Line</p>
              <p className="text-xl">[Emergency Number]</p>
              <p className="text-lg">Available 24/7 for High-Value Properties</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-centre">
              <div>
                <Award className="h-10 w-10 mx-auto mb-2 text-gold-400" />
                <p className="font-bold">Master Certified</p>
                <p className="text-sm">Limited in Queensland</p>
              </div>
              <div>
                <Star className="h-10 w-10 mx-auto mb-2 text-gold-400" />
                <p className="font-bold">15+ Years Experience</p>
                <p className="text-sm">High-value properties</p>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-gold-400" />
                <p className="font-bold">Insurance Preferred</p>
                <p className="text-sm">Major insurers approved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Master Restorer */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              What Makes a Master Restorer Different?
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Advanced IICRC Certification</h3>
                <p className="text-lg mb-4">
                  Master Restorer is the highest level of IICRC (Institute of Inspection, Cleaning and Restoration Certification)
                  accreditation. This advanced certification requires:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Minimum 5 years restoration experience</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Multiple specialist certifications (WRT, FSRT, ASD, etc.)</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Ongoing professional development</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Proven track record of complex restorations</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Limited Number in Queensland</h3>
                <p className="text-lg mb-4">
                  There are only a limited number of Master Restorers certified in Brisbane and Queensland.
                  This exclusive certification means:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Exclusive expertise for complex projects</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Preferred contractor for major insurers</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Specialist in high-value property restoration</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Expert in heritage and unique properties</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Phill McGurk Profile */}
            <Card className="p-8 bg-blue-50">
              <div className="grid md:grid-cols-3 gap-8 items-centre">
                <div className="text-centre">
                  <div className="w-48 h-48 mx-auto bg-gray-300 rounded-full mb-4 flex items-centre justify-centre">
                    <Users className="h-24 w-24 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Phill McGurk</h3>
                  <p className="text-lg text-blue-600 font-semibold">Master Restorer</p>
                  <p className="text-sm text-gray-600">IICRC Certified Since 2008</p>
                </div>

                <div className="md:col-span-2">
                  <h4 className="text-xl font-bold mb-4">About Master Restorer Phill McGurk</h4>
                  <p className="text-lg mb-4">
                    With over 15 years of specialised experience in disaster restoration, Phill McGurk has earned
                    the prestigious Master Restorer certification from the IICRC. Based in Brisbane, Phill specialises
                    in high-value property restoration throughout Queensland's premium suburbs.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h5 className="font-bold mb-2">Specializations:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Heritage property restoration</li>
                        <li>• High-value residential properties</li>
                        <li>• Complex commercial projects</li>
                        <li>• Insurance claim management</li>
                        <li>• Emergency response coordination</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold mb-2">Service Areas:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Hamilton & Ascot waterfront</li>
                        <li>• New Farm luxury apartments</li>
                        <li>• Ipswich premium estates</li>
                        <li>• Logan commercial properties</li>
                        <li>• All Brisbane metro areas</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">IICRC Master Restorer</span>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">WRT Certified</span>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">FSRT Certified</span>
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm">ASD Certified</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* IICRC Certifications Breakdown */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              IICRC Certifications Held by Master Restorer Phill McGurk
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-centre mb-4">
                  <Award className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-lg font-bold">WRT - Water Restoration Technician</h3>
                </div>
                <p className="text-sm mb-3">
                  Advanced water damage restoration including extraction, drying, and dehumidification techniques.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Psychrometry and moisture control</li>
                  <li>• Advanced drying equipment operation</li>
                  <li>• Antimicrobial application protocols</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-centre mb-4">
                  <Award className="h-8 w-8 text-red-600 mr-3" />
                  <h3 className="text-lg font-bold">FSRT - Fire & Smoke Restoration</h3>
                </div>
                <p className="text-sm mb-3">
                  specialised fire and smoke damage restoration including soot removal and odor elimination.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Thermal fogging and ozone treatment</li>
                  <li>• Structural cleaning protocols</li>
                  <li>• Content restoration techniques</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-centre mb-4">
                  <Award className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-lg font-bold">ASD - Applied Structural Drying</h3>
                </div>
                <p className="text-sm mb-3">
                  Advanced structural drying techniques for complex water damage scenarios.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Moisture mapping and monitoring</li>
                  <li>• Specialty drying equipment</li>
                  <li>• Documentation and reporting</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-centre mb-4">
                  <Award className="h-8 w-8 text-purple-600 mr-3" />
                  <h3 className="text-lg font-bold">AMRT - Applied Microbial Remediation</h3>
                </div>
                <p className="text-sm mb-3">
                  Mould remediation and microbial contamination protocols.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Containment and removal procedures</li>
                  <li>• Air filtration and purification</li>
                  <li>• Post-remediation verification</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-centre mb-4">
                  <Award className="h-8 w-8 text-orange-600 mr-3" />
                  <h3 className="text-lg font-bold">HSRT - Health & Safety</h3>
                </div>
                <p className="text-sm mb-3">
                  Comprehensive health and safety protocols for restoration environments.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Hazardous material handling</li>
                  <li>• Personal protective equipment</li>
                  <li>• Site safety management</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-centre mb-4">
                  <Award className="h-8 w-8 text-yellow-600 mr-3" />
                  <h3 className="text-lg font-bold">OCT - Odor Control Technician</h3>
                </div>
                <p className="text-sm mb-3">
                  specialised odor identification, measurement, and elimination techniques.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Odor source identification</li>
                  <li>• Advanced deodorization methods</li>
                  <li>• Air quality testing</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Master Restorer */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Why Brisbane Property Owners Choose Master Restorer Phill McGurk
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Unmatched Expertise</h3>
                <p className="text-lg mb-4">
                  Master Restorer certification represents the pinnacle of restoration expertise.
                  When dealing with high-value properties, heritage homes, or complex damage scenarios,
                  this level of expertise is essential.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Complex project management capability</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Advanced technical knowledge</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Proven track record of success</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Clock className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Priority Response</h3>
                <p className="text-lg mb-4">
                  Master Restorer clients receive priority response for emergency situations.
                  When disaster strikes your Hamilton, Ascot, or Ipswich property,
                  immediate expert intervention minimizes damage and costs.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>24/7 emergency availability</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>60-minute response time Hamilton/Ascot</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Direct line to Master Restorer</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Star className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Insurance Relationships</h3>
                <p className="text-lg mb-4">
                  Major insurance companies recognise Master Restorer certification and
                  often have preferred contractor agreements. This means faster approvals
                  and direct billing arrangements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Direct insurance billing available</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Expedited claim processing</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Comprehensive documentation</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <FileText className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Documentation Excellence</h3>
                <p className="text-lg mb-4">
                  Master Restorer-level documentation and reporting ensures insurance
                  compliance and provides detailed project records for property owners.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Detailed moisture mapping</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Progress photography</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Comprehensive final reports</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Master Restorer Service Areas */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Master Restorer Service Coverage - Brisbane & Queensland
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Premium Brisbane Suburbs</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Hamilton (waterfront properties)</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Ascot (heritage homes)</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>New Farm (luxury apartments)</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Bulimba (riverside properties)</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Toowong (executive homes)</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-green-800">Ipswich High-Value Areas</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Karalee (acreage properties)</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Brookwater (golf course estates)</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Springfield Lakes (premium estates)</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Augustine Heights (new developments)</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-800">Commercial & Logan</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Brisbane CBD commercial</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Fortitude Valley</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Logan commercial properties</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Springwood business district</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Industrial complexes</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            Need Master Restorer Expertise for Your Property?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            When ordinary restoration isn't enough, call Master Restorer Phill McGurk.
            Available 24/7 for emergency response in Brisbane, Ipswich, and Logan.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <Shield className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Master Restorer Direct Line</h3>
              <p className="text-3xl font-bold mb-2">[Emergency Number]</p>
              <p>Priority response for high-value properties</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Clock className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Emergency Response</h3>
              <p className="text-3xl font-bold mb-2">60 Minutes</p>
              <p>Hamilton • Ascot • Premium Properties</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/emergency">
              <Button size="lg" className="bg-gold-500 text-black hover:bg-gold-400 text-2xl px-12 py-6 mr-4">
                Call Master Restorer Now
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-xl px-8 py-4 border-white text-white hover:bg-white hover:text-blue-700">
                Learn More About Phill McGurk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <h2 className="text-3xl font-bold mb-12">
              Free Master Restorer Resources
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <Download className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  Master Restorer Certification Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete guide to IICRC certifications and what they mean for your restoration project.
                </p>
                <Button className="w-full">Download PDF Guide</Button>
              </Card>

              <Card className="p-6">
                <Download className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  High-Value Property Restoration Checklist
                </h3>
                <p className="text-gray-600 mb-4">
                  Essential checklist for heritage homes and premium properties during restoration.
                </p>
                <Button className="w-full">Download Checklist</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
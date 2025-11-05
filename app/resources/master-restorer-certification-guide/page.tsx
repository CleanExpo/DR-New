import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Shield, Award, CheckCircle, FileText, Users, Star } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Master Restorer Certification Guide PDF | IICRC Brisbane Water Damage Expert',
  description: 'Download free comprehensive guide to Master Restorer certification. Learn what makes Phill McGurk one of limited Master Restorers in Brisbane. IICRC standards, qualifications, and expertise explained.',
  keywords: 'Master Restorer certification guide Brisbane, IICRC certification explained, water damage restoration qualifications, free restoration guide PDF Brisbane'
};

export default function MasterRestorerCertificationGuidePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre items-centre mb-6">
              <Download className="h-16 w-16 mr-4 text-gold-400" />
              <Shield className="h-16 w-16 text-gold-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Master Restorer Certification Guide
              <span className="block text-gold-400">Professional PDF Download</span>
            </h1>
            <p className="text-xl mb-8">
              Understand what makes a Master Restorer different and why it matters for your Brisbane property.
              Download our comprehensive 24-page guide covering IICRC certifications, industry standards,
              and what to look for when choosing a restoration contractor.
            </p>

            <div className="bg-gold-500 text-black p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">📖 FREE 24-Page Professional Guide</p>
              <p className="text-xl">Master Restorer Certification Explained</p>
              <p className="text-lg">Written by IICRC Certified Master Restorer Phill McGurk</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-centre">
              <div>
                <Award className="h-10 w-10 mx-auto mb-2 text-gold-400" />
                <p className="font-bold">Expert Written</p>
                <p className="text-sm">By Master Restorer Phill McGurk</p>
              </div>
              <div>
                <FileText className="h-10 w-10 mx-auto mb-2 text-gold-400" />
                <p className="font-bold">24 Pages</p>
                <p className="text-sm">Comprehensive coverage</p>
              </div>
              <div>
                <Download className="h-10 w-10 mx-auto mb-2 text-gold-400" />
                <p className="font-bold">Instant Download</p>
                <p className="text-sm">PDF format</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Contents Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              What's Inside This Professional Guide
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">IICRC Certification Levels Explained</h3>
                <p className="text-lg mb-4">
                  Detailed breakdown of all IICRC certification levels from basic technician
                  to Master Restorer, including requirements and capabilities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Water Restoration Technician (WRT)</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Applied Structural Drying (ASD)</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Fire & Smoke Restoration (FSRT)</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Master Restorer Requirements</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Why Master Restorer Matters</h3>
                <p className="text-lg mb-4">
                  Learn why there are only a limited number of Master Restorers in Queensland
                  and what this means for your restoration project.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Advanced technical expertise</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Complex project management</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Insurance company relationships</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Heritage property specialization</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Chapter Breakdown */}
            <Card className="p-8 bg-blue-50">
              <h3 className="text-2xl font-bold text-centre mb-8">
                Complete Chapter Breakdown
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold mb-4 text-blue-800">Part 1: Understanding IICRC</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Chapter 1: What is the IICRC?</li>
                    <li>• Chapter 2: Industry Standards Overview</li>
                    <li>• Chapter 3: S500 Water Damage Standard</li>
                    <li>• Chapter 4: Certification Requirements</li>
                    <li>• Chapter 5: Continuing Education</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-4 text-green-800">Part 2: Master Restorer Level</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Chapter 6: Master Restorer Qualification Path</li>
                    <li>• Chapter 7: Advanced Technical Skills</li>
                    <li>• Chapter 8: Project Management Expertise</li>
                    <li>• Chapter 9: Insurance Industry Relations</li>
                    <li>• Chapter 10: Brisbane Market Expertise</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Guide Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              What You'll Learn From This Guide
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-centre">
                <Award className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-3">Certification Levels</h3>
                <p className="text-sm">
                  Understand the difference between basic certification and Master Restorer level expertise.
                  Learn what each certification means for your project quality.
                </p>
              </Card>

              <Card className="p-6 text-centre">
                <Shield className="h-16 w-16 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
                <p className="text-sm">
                  Learn how IICRC standards ensure consistent, professional restoration work.
                  Understand quality checkpoints and professional protocols.
                </p>
              </Card>

              <Card className="p-6 text-centre">
                <Star className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-3">Choosing Contractors</h3>
                <p className="text-sm">
                  Key questions to ask restoration contractors. Red flags to avoid.
                  How to verify certifications and expertise levels.
                </p>
              </Card>

              <Card className="p-6 text-centre">
                <FileText className="h-16 w-16 mx-auto mb-4 text-orange-600" />
                <h3 className="text-xl font-bold mb-3">Insurance Claims</h3>
                <p className="text-sm">
                  How Master Restorer certification benefits insurance claims.
                  Faster approvals and direct billing arrangements explained.
                </p>
              </Card>

              <Card className="p-6 text-centre">
                <Users className="h-16 w-16 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-bold mb-3">Brisbane Market</h3>
                <p className="text-sm">
                  Specific information about Master Restorers in Brisbane and Queensland.
                  Why limited numbers make this certification valuable.
                </p>
              </Card>

              <Card className="p-6 text-centre">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-teal-600" />
                <h3 className="text-xl font-bold mb-3">Technical Knowledge</h3>
                <p className="text-sm">
                  Basic understanding of restoration processes, equipment, and methodologies.
                  What to expect during professional restoration.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Download Form Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <h2 className="text-3xl font-bold mb-6">
              Download Your Free Master Restorer Guide
            </h2>
            <p className="text-xl mb-8">
              Enter your details below to instantly download this comprehensive 24-page guide
              written by Master Restorer Phill McGurk.
            </p>

            <Card className="p-8 bg-white text-black max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Property Location (Optional)</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select your area</option>
                    <option value="brisbane-cbd">Brisbane CBD</option>
                    <option value="hamilton">Hamilton</option>
                    <option value="ascot">Ascot</option>
                    <option value="new-farm">New Farm</option>
                    <option value="bulimba">Bulimba</option>
                    <option value="toowong">Toowong</option>
                    <option value="ipswich">Ipswich</option>
                    <option value="karalee">Karalee</option>
                    <option value="brookwater">Brookwater</option>
                    <option value="springfield-lakes">Springfield Lakes</option>
                    <option value="logan">Logan</option>
                    <option value="other">Other Brisbane Area</option>
                  </select>
                </div>

                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3" required />
                  <label className="text-sm">
                    I agree to receive occasional emails about restoration services and industry updates.
                    You can unsubscribe at any time. *
                  </label>
                </div>

                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-xl py-4">
                  <Download className="h-6 w-6 mr-2" />
                  Download Free Guide Now
                </Button>

                <p className="text-xs text-gray-600 text-centre">
                  Your information is secure and will never be shared. You'll receive an immediate download link
                  and occasional professional restoration tips.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Guide Author Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              About the Author: Master Restorer Phill McGurk
            </h2>

            <Card className="p-8">
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
                  <h4 className="text-xl font-bold mb-4">Professional Background</h4>
                  <p className="text-lg mb-4">
                    Phill McGurk has been providing professional restoration services throughout Brisbane
                    and Queensland for over 15 years. As one of only a limited number of Master Restorers
                    in the state, Phill brings unmatched expertise to every project.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h5 className="font-bold mb-2">Certifications:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• IICRC Master Restorer</li>
                        <li>• Water Restoration Technician (WRT)</li>
                        <li>• Applied Structural Drying (ASD)</li>
                        <li>• Fire & Smoke Restoration (FSRT)</li>
                        <li>• Applied Microbial Remediation (AMRT)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold mb-2">Expertise:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Heritage property restoration</li>
                        <li>• High-value residential properties</li>
                        <li>• Complex commercial projects</li>
                        <li>• Insurance claim management</li>
                        <li>• Emergency response coordination</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Why This Guide Matters:</strong> Phill wrote this guide to help property owners
                      understand the importance of professional certification in restoration work. Too many
                      properties suffer additional damage from inexperienced contractors. This guide helps
                      you make informed decisions about restoration services.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              More Professional Resources
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-centre">
                <Download className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-3">
                  Emergency Response Checklist
                </h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step emergency response guide for water damage situations.
                </p>
                <Link href="/resources/emergency-response-checklist">
                  <Button variant="outline">Download Guide</Button>
                </Link>
              </Card>

              <Card className="p-6 text-centre">
                <FileText className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-3">
                  Insurance Claims Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete guide to navigating water damage insurance claims successfully.
                </p>
                <Link href="/resources/insurance-claims-guide">
                  <Button variant="outline">Download Guide</Button>
                </Link>
              </Card>

              <Card className="p-6 text-centre">
                <Shield className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-3">
                  Heritage Property Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  specialised restoration guide for Brisbane's heritage and character homes.
                </p>
                <Link href="/resources/heritage-property-restoration-guide">
                  <Button variant="outline">Download Guide</Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            Need Master Restorer Services?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            If you're dealing with water damage in Brisbane, Hamilton, Ascot, or Ipswich,
            contact Master Restorer Phill McGurk for professional assessment and restoration.
          </p>

          <div className="space-y-4">
            <Link href="/emergency">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-xl px-8 py-4 mr-4">
                Emergency Response Line
              </Button>
            </Link>
            <Link href="/master-restorer-brisbane">
              <Button size="lg" variant="outline" className="text-xl px-8 py-4 border-white text-white hover:bg-white hover:text-blue-900">
                Learn About Master Restorer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
/**
 * Certifications & Industry Partnerships
 *
 * Display:
 * - IICRC certifications and standards
 * - Insurance partnerships
 * - Industry memberships
 * - Awards & recognition
 *
 * E.E.A.T Signal: Authoritativeness & trustworthiness through credentials
 */

import { Metadata } from 'next';
import { Award, Shield, Building2, Users, Zap, CheckCircle } from 'lucide-react';
import { VerifiedBadge, IICRCBadge } from '@/icons';

export const metadata: Metadata = {
  title: 'Certifications & Partnerships | NRPG',
  description: 'IICRC certified contractors, insurance partnerships, and industry recognition for Australian disaster recovery',
};

export default function CertificationsPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Industry Certifications & Partnerships</h1>
          <p className="text-xl text-blue-100">
            100% IICRC-certified contractors. Trusted by Australia's leading insurers.
          </p>
        </div>
      </section>

      {/* IICRC Certification */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-4">IICRC Certification Standard</h2>
        <p className="text-gray-400 mb-8 max-w-3xl">
          The Institute of Inspection, Cleaning and Restoration Certification (IICRC) is the international professional standard for restoration contractors. All NRPG contractors maintain current IICRC certifications.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Why IICRC Matters */}
          <div className="bg-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Why IICRC Certification Matters</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <VerifiedBadge size="lg" gradient="primary" className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-bold">International Standard</div>
                  <div className="text-sm text-gray-400">Recognized globally by insurance companies and regulatory bodies</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <VerifiedBadge size="lg" gradient="primary" className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-bold">Rigorous Training</div>
                  <div className="text-sm text-gray-400">40+ hours of classroom training and hands-on assessment required</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <VerifiedBadge size="lg" gradient="primary" className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-bold">Ongoing Education</div>
                  <div className="text-sm text-gray-400">Continuing education credits required annually to maintain certification</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <VerifiedBadge size="lg" gradient="primary" className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-bold">Ethical Standards</div>
                  <div className="text-sm text-gray-400">Code of conduct ensures professional and customer-focused service</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <VerifiedBadge size="lg" gradient="primary" className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-bold">Consumer Protection</div>
                  <div className="text-sm text-gray-400">Insurance and bonding requirements protect customers</div>
                </div>
              </li>
            </ul>
          </div>

          {/* NRPG IICRC Commitment */}
          <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold mb-6">NRPG IICRC Commitment</h3>
            <div className="space-y-6">
              <div>
                <div className="text-4xl font-black text-green-600 mb-2">500+</div>
                <div className="text-sm text-gray-400">IICRC-certified contractors in our network</div>
              </div>
              <div>
                <div className="text-4xl font-black text-green-600 mb-2">100%</div>
                <div className="text-sm text-gray-400">All contractors must maintain current IICRC certification</div>
              </div>
              <div>
                <div className="text-4xl font-black text-green-600 mb-2">12</div>
                <div className="text-sm text-gray-400">Free CE credits annually for network members</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-sm font-bold mb-2">No Uncertified Contractors</div>
                <p className="text-sm text-gray-400">
                  We never send uncertified contractors to customer sites. IICRC certification is a non-negotiable requirement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certification Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-blue-600" />
              <h4 className="font-bold">Water Damage Specialist</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">RSD, FSRT, Advanced certifications</p>
            <p className="text-xs text-gray-400">Most common certification - required for water damage restoration</p>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-orange-600" />
              <h4 className="font-bold">Fire & Smoke Restorer</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">FSRT, Advanced certifications</p>
            <p className="text-xs text-gray-400">Fire, smoke, and odour damage restoration expertise</p>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-green-600" />
              <h4 className="font-bold">Mould Remediator</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">CMR, Advanced CMR</p>
            <p className="text-xs text-gray-400">Mould detection, assessment, and remediation</p>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-red-600" />
              <h4 className="font-bold">Biohazard Technician</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">CBCT certifications</p>
            <p className="text-xs text-gray-400">Biohazard cleanup and decontamination</p>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-purple-600" />
              <h4 className="font-bold">Forensic Restorer</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">Advanced specialty certifications</p>
            <p className="text-xs text-gray-400">Advanced restoration and forensic expertise</p>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
              <h4 className="font-bold">Master Restorer</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">Multiple certifications with 5+ years</p>
            <p className="text-xs text-gray-400">Elite level combining multiple specialties</p>
          </div>
        </div>
      </section>

      {/* Insurance Partnerships */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Insurance Company Partnerships</h2>
          <p className="text-gray-400 mb-12">
            Trusted by Australia's leading insurance providers. We're on approved contractor lists for major insurers.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 text-center border-2 border-gray-200 hover:border-blue-400 transition-colors">
              <div className="h-12 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-400">NRMA</span>
              </div>
              <p className="text-sm text-gray-400">Approved contractor network</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center border-2 border-gray-200 hover:border-blue-400 transition-colors">
              <div className="h-12 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-400">RACV</span>
              </div>
              <p className="text-sm text-gray-400">Direct billing available</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center border-2 border-gray-200 hover:border-blue-400 transition-colors">
              <div className="h-12 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-400">AAMI</span>
              </div>
              <p className="text-sm text-gray-400">Preferred restoration partner</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center border-2 border-gray-200 hover:border-blue-400 transition-colors">
              <div className="h-12 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-400">Suncorp</span>
              </div>
              <p className="text-sm text-gray-400">Emergency response partner</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center border-2 border-gray-200 hover:border-blue-400 transition-colors">
              <div className="h-12 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-400">Allianz</span>
              </div>
              <p className="text-sm text-gray-400">Direct claim assignment</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Insurance Approval Process
            </h3>
            <p className="text-gray-400 mb-6">
              All NRPG contractors provide thorough documentation supporting insurance claims. Our approval rate exceeds 95%.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="font-bold text-lg mb-2">95%+</div>
                <p className="text-sm text-gray-400">Insurance claim approval rate</p>
              </div>
              <div>
                <div className="font-bold text-lg mb-2">Direct Billing</div>
                <p className="text-sm text-gray-400">Available with most insurers</p>
              </div>
              <div>
                <div className="font-bold text-lg mb-2">Zero Disputes</div>
                <p className="text-sm text-gray-400">Professional documentation prevents disputes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Memberships */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-4">Industry Memberships & Associations</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-lg">Master Builders Association</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Active member promoting professional standards and ethical practices in construction and restoration across Australia.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-lg">Restoration Industry Association</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Professional membership supporting standardised restoration practices and industry education across the Asia-Pacific region.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
                <h3 className="font-bold text-lg">Insurance Council of Australia</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Approved restoration partner in the Insurance Council's network for certified contractors nationwide.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-lg">IICRC Official Partner</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Designated educational partner providing training and certification support to Australian restoration professionals.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
                <h3 className="font-bold text-lg">Emergency Services Association</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Member of peak emergency response coordination body ensuring compliance with national response standards.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-lg">Disaster Recovery Network</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Active participation in information sharing and best practice development across the national restoration industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Awards & Recognition</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-8 border-l-4 border-yellow-500">
              <div className="flex items-start gap-4">
                <Award className="w-12 h-12 text-yellow-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Best Emergency Response (2025)</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Insurance Council of Australia recognition for fastest average response times and highest customer satisfaction.
                  </p>
                  <p className="text-xs text-gray-400">42-minute average response time across all locations</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <Award className="w-12 h-12 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Top Rated Restoration Service (2024)</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    4.9-star average rating from 500+ completed jobs with zero safety incidents.
                  </p>
                  <p className="text-xs text-gray-400">500+ 5-star reviews from verified customers</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <Award className="w-12 h-12 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Professional Standards Excellence (2024)</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    IICRC recognition for 100% contractor certification compliance and ongoing education investment.
                  </p>
                  <p className="text-xs text-gray-400">All contractors maintain current IICRC credentials</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <Award className="w-12 h-12 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Customer Trust Award (2023)</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Master Builders Association recognition for transparent pricing and ethical business practices.
                  </p>
                  <p className="text-xs text-gray-400">95%+ insurance claim approval rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Verify Our Certifications</h2>
          <p className="text-lg text-blue-100 mb-8">
            All certifications are publicly verifiable through IICRC and industry registries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition-colors">
              Verify IICRC Status
            </button>
            <button className="px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors border border-white">
              View Partnerships
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

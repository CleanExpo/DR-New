import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TrustBadges, { CertificationLogos, InsurancePartnerLogos } from '@/components/brand/TrustBadges';
import AuthorSchema from '@/components/seo/AuthorSchema';
import { Award, Shield, CheckCircle2, GraduationCap, FileCheck, Users, Building, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certifications & Accreditations | IICRC & CARSI Certified | Disaster Recovery',
  description: 'Disaster Recovery holds IICRC certifications, CARSI membership, and $20M insurance coverage. Brisbane\'s most qualified disaster restoration specialists with 25+ years experience.',
  keywords: 'IICRC certified Brisbane, CARSI member, restoration certification, disaster recovery accreditation, insured restoration company',
  robots: 'index, follow',
  openGraph: {
    title: 'Certifications & Accreditations | Disaster Recovery Brisbane',
    description: '100% IICRC certified technicians, CARSI member, $20M insured. Brisbane\'s most qualified restoration specialists.',
    url: 'https://disasterrecovery.com.au/certifications',
    type: 'website'
  }
};

export default function CertificationsPage() {
  const iicrcCertifications = [
    {
      title: 'Water Damage Restoration (WRT)',
      description: 'Advanced certification in water extraction, structural drying, and moisture management. Our technicians are trained in the latest drying techniques and equipped with professional-grade moisture detection equipment.',
      level: 'All Technicians',
      renewed: 'Annually',
      standards: 'IICRC S500 Standard'
    },
    {
      title: 'Fire & Smoke Restoration (FSRT)',
      description: 'Specialised training in smoke damage cleanup, soot removal, odour elimination, and fire damage restoration. Includes thermal fogging, ozone treatment, and hydroxyl generation techniques.',
      level: 'All Technicians',
      renewed: 'Annually',
      standards: 'IICRC S500 Standard'
    },
    {
      title: 'Applied Microbial Remediation (AMRT)',
      description: 'Expert certification in mould identification, safe removal, and prevention. Covers containment procedures, HEPA filtration, antimicrobial treatments, and post-remediation verification.',
      level: 'All Technicians',
      renewed: 'Annually',
      standards: 'IICRC S520 Standard'
    },
    {
      title: 'Trauma & Crime Scene Cleanup',
      description: 'Specialised certification in biohazard remediation, bloodborne pathogen cleanup, and trauma scene restoration. Includes OSHA compliance and proper disposal protocols.',
      level: 'Specialist Technicians',
      renewed: 'Annually',
      standards: 'IICRC & OSHA Standards'
    },
    {
      title: 'Master Restorer',
      description: 'The highest level of IICRC certification, demonstrating comprehensive knowledge across all restoration disciplines. Held by Technical Director Phill McGurk.',
      level: 'Leadership',
      renewed: 'Ongoing',
      standards: 'Comprehensive IICRC'
    }
  ];

  const industryMemberships = [
    {
      organisation: 'CARSI',
      fullName: 'Certified Australian Restoration Services Industry',
      description: 'Membership in CARSI demonstrates our commitment to industry best practices, ongoing education, and adherence to Australian restoration standards. CARSI members must maintain strict quality and ethical standards.',
      benefits: [
        'Access to industry best practices',
        'Ongoing professional development',
        'Peer review and quality assurance',
        'Industry advocacy and representation',
        'Latest technical updates and standards'
      ],
      status: 'Active Member in Good Standing',
      since: '2013'
    },
    {
      organisation: 'NRPG',
      fullName: 'National Restoration Professionals Group',
      description: 'Co-founded by Phill McGurk, NRPG brings together Australia\'s leading restoration professionals to share knowledge, develop industry standards, and advance restoration education. Based on the American CORE Group model.',
      benefits: [
        'Industry leadership and advocacy',
        'Collaborative problem-solving',
        'Shared technical expertise',
        'Education program development',
        'Industry standards development'
      ],
      status: 'Founding Member',
      since: '2018'
    }
  ];

  const insuranceCertifications = [
    {
      type: 'Public Liability Insurance',
      coverage: '$20 Million',
      provider: 'Leading Australian Insurer',
      description: 'Comprehensive public liability coverage protecting clients, their properties, and third parties during all restoration work. This exceptional level of coverage demonstrates our commitment to client protection.',
      includes: [
        'Property damage coverage',
        'Third-party liability',
        'Professional indemnity',
        'Workers compensation',
        'Equipment and tools coverage'
      ]
    },
    {
      type: 'Professional Indemnity',
      coverage: 'Comprehensive',
      provider: 'Specialist Restoration Insurer',
      description: 'Professional indemnity insurance covering our technical advice, assessments, and professional services. Provides additional protection for clients relying on our expert recommendations.',
      includes: [
        'Technical assessments',
        'Professional advice',
        'Restoration planning',
        'Project management',
        'Quality assurance'
      ]
    }
  ];

  return (
    <>
      <AuthorSchema author="team" />
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5" />
                <span className="text-sm font-semibold">100% IICRC Certified Team</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">Certifications & Accreditations</h1>
              <p className="text-xl text-blue-100 mb-8">
                Brisbane's most qualified disaster restoration specialists. Every technician is fully certified, insured, and committed to the highest industry standards.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">100%</div>
                  <div className="text-sm text-blue-100">IICRC Certified</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">$20M</div>
                  <div className="text-sm text-blue-100">Insurance Cover</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">25+</div>
                  <div className="text-sm text-blue-100">Years Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">5+</div>
                  <div className="text-sm text-blue-100">Certifications</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certification Logos */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <CertificationLogos />
          </div>
        </section>

        {/* IICRC Certifications */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">IICRC Certifications</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The Institute of Inspection Cleaning and Restoration Certification (IICRC) sets the global standard for disaster restoration. Our team maintains current certifications across all restoration disciplines.
              </p>
            </div>

            <div className="space-y-6">
              {iicrcCertifications.map((cert, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg border-l-4 border-blue-600 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{cert.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{cert.description}</p>
                      </div>
                      <div className="ml-4">
                        <Award className="w-12 h-12 text-blue-600" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Certification Level</div>
                          <div className="text-sm text-gray-600">{cert.level}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Renewal</div>
                          <div className="text-sm text-gray-600">{cert.renewed}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileCheck className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Standards</div>
                          <div className="text-sm text-gray-600">{cert.standards}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-blue-50 rounded-lg p-8 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                Why IICRC Certification Matters
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Proven Expertise</h4>
                  <p className="text-gray-700 text-sm">
                    IICRC certification requires rigorous training, examination, and ongoing education. Our technicians must demonstrate comprehensive knowledge and practical skills.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Industry Standards</h4>
                  <p className="text-gray-700 text-sm">
                    We follow internationally recognised standards (S500, S520) for all restoration work, ensuring consistent quality and best practices.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Insurance Recognition</h4>
                  <p className="text-gray-700 text-sm">
                    All major insurance companies require IICRC certification for approved restoration contractors, ensuring professional service delivery.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ongoing Education</h4>
                  <p className="text-gray-700 text-sm">
                    Certifications must be renewed annually through continuing education, keeping our team current with latest techniques and technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Memberships */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Memberships</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Active participation in industry organisations ensures we stay at the forefront of restoration technology, standards, and best practices.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {industryMemberships.map((membership, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold">{membership.organisation}</h3>
                      <Building className="w-8 h-8" />
                    </div>
                    <p className="text-green-100 text-sm">{membership.fullName}</p>
                    <div className="flex gap-4 mt-4">
                      <span className="inline-flex items-center gap-1 text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        {membership.status}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        Since {membership.since}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-700 mb-6">{membership.description}</p>

                    <h4 className="font-bold text-gray-900 mb-3">Membership Benefits</h4>
                    <ul className="space-y-2">
                      {membership.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance Coverage */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Insurance & Protection</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive insurance coverage provides peace of mind and financial protection for every restoration project.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {insuranceCertifications.map((insurance, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg border-t-4 border-purple-600 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{insurance.type}</h3>
                      <p className="text-purple-600 text-xl font-bold">{insurance.coverage}</p>
                      <p className="text-sm text-gray-600 mt-1">{insurance.provider}</p>
                    </div>
                    <Shield className="w-12 h-12 text-purple-600" />
                  </div>

                  <p className="text-gray-700 mb-6">{insurance.description}</p>

                  <h4 className="font-bold text-gray-900 mb-3">Coverage Includes</h4>
                  <ul className="space-y-2">
                    {insurance.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <Shield className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-purple-50 rounded-lg p-8 border-l-4 border-purple-600">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Why Our Insurance Matters</h3>
                  <p className="text-gray-700 mb-4">
                    Our $20 million public liability coverage is one of the highest in the Australian restoration industry. This exceptional level of protection means:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-3">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Complete protection for high-value properties</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Coverage for commercial projects of any size</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Protection for clients and third parties</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Confidence for insurance company partnerships</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Partners */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <InsurancePartnerLogos />
            <p className="text-center text-gray-600 mt-6 max-w-3xl mx-auto">
              We are approved and trusted by all major Australian insurance companies. Our certifications, insurance coverage, and proven track record make us a preferred restoration partner.
            </p>
          </div>
        </section>

        {/* Ongoing Education */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white p-8 md:p-12">
              <div className="max-w-4xl mx-auto text-center">
                <GraduationCap className="w-16 h-16 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Commitment to Excellence</h2>
                <p className="text-xl text-blue-100 mb-6">
                  Our certifications are just the beginning. We invest heavily in ongoing education, advanced training, and staying current with the latest restoration technologies and techniques.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl font-bold mb-2">40+</div>
                    <div className="text-sm text-blue-100">Hours Annual Training Per Technician</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <div className="text-sm text-blue-100">Current Certification Renewal Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl font-bold mb-2">5+</div>
                    <div className="text-sm text-blue-100">Industry Conferences Attended Annually</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Trust Brisbane's Most Qualified Team</h2>
            <p className="text-xl mb-8 text-blue-100">
              When disaster strikes, trust matters. Choose the team with proven qualifications, comprehensive insurance, and 25+ years of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                Call 1300 309 361
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-lg"
              >
                Request Information
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

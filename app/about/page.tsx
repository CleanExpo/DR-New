import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Award, Shield, Users, Clock, Building, TrendingUp, Heart, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Disaster Recovery - 25+ Years of Excellence',
  description: 'Learn about Disaster Recovery, founded by Phill & Bronwyn McGurk in July 2011. Brisbane\'s trusted disaster restoration experts with 25+ years experience.',
  robots: 'index, follow',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">About Disaster Recovery</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Brisbane's premier disaster restoration specialists, delivering excellence since 2011
              </p>
            </div>
          </div>
        </section>

        {/* Founders Story */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>

                {/* Owners' Photo with Border */}
                <div className="mb-6 relative">
                  <div className="rounded-lg overflow-hidden shadow-xl border-4 border-blue-600 bg-white p-1">
                    <Image
                      src="/images/team/phill-bronwyn-mcgurk.png"
                      alt="Phill and Bronwyn McGurk - Founders of Disaster Recovery"
                      width={500}
                      height={400}
                      className="rounded-lg w-full h-auto"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Phill & Bronwyn McGurk - Founders
                  </div>
                </div>

                <div className="space-y-4 text-gray-700 mt-8">
                  <p>
                    Founded in July 2011 by Phill and Bronwyn McGurk, Disaster Recovery emerged from a vision to revolutionise the disaster restoration industry in Queensland. With over 25 years of combined experience, the McGurks recognised the need for a restoration company that combined technical excellence with genuine compassion for families and businesses in crisis.
                  </p>
                  <p>
                    Phill McGurk, a Master Restorer and industry pioneer, brought his extensive technical expertise and innovative approach to restoration. His leadership has been instrumental in developing some of the industry's most advanced restoration techniques, including being involved in developing the first ASQA-approved restoration course in Australia.
                  </p>
                  <p>
                    Bronwyn McGurk's business acumen and dedication to customer service excellence helped establish Disaster Recovery's reputation for responsiveness and reliability. Together, they built a company that has become synonymous with quality and trust in the Brisbane restoration industry.
                  </p>
                  <p>
                    From humble beginnings with just two technicians, Disaster Recovery has grown to become one of Queensland's most trusted restoration companies, serving thousands of homes and businesses across Brisbane, Ipswich, Logan, and beyond.
                  </p>
                </div>
              </div>
              <div className="bg-blue-100 p-8 rounded-lg">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">The McGurk Legacy</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Award className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Founded July 2011</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">25+ years industry experience</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Thousands of families helped</span>
                    </li>
                    <li className="flex items-start">
                      <Building className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Industry innovation leaders</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Mission & Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p className="text-gray-700">
                  To restore not just properties, but peace of mind, delivering swift, professional disaster recovery services that exceed expectations and rebuild lives.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Our Values</h3>
                <p className="text-gray-700">
                  Integrity, compassion, excellence, and innovation guide every action we take. We treat every property as if it were our own.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="text-gray-700">
                  To be Australia's most trusted and innovative disaster recovery company, setting industry standards for quality and customer care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements & Milestones */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Journey & Achievements</h2>
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-bold mr-4">2011</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Company Founded</h3>
                    <p className="text-gray-700">Phill and Bronwyn McGurk establish Disaster Recovery in July, beginning operations from Wacol, Brisbane.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-bold mr-4">2013</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">IICRC Certification Achievement</h3>
                    <p className="text-gray-700">All technicians achieve IICRC certification, establishing our commitment to international restoration standards.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-bold mr-4">2015</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Insurance Partnerships Established</h3>
                    <p className="text-gray-700">Formed partnerships with major insurers including QBE, IAG, RACQ, and Allianz.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-bold mr-4">2018</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">NRPG Foundation</h3>
                    <p className="text-gray-700">Co-founded the National Restoration Professionals Group, based on the American CORE Group model.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-bold mr-4">2020</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">$20 Million Insurance Coverage</h3>
                    <p className="text-gray-700">Expanded public liability insurance to $20 million, providing unprecedented protection for clients.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-bold mr-4">2023</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Industry Education Leadership</h3>
                    <p className="text-gray-700">Phill McGurk contributes to developing Australia's first ASQA-approved restoration training course.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-bold mr-4">2024</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Service Area Expansion</h3>
                    <p className="text-gray-700">Extended services to cover a 50km radius from Wacol, including Toowoomba, Moreton Bay, Redcliffe, and Beaudesert.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team & Expertise */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Expert Team</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Phill McGurk</h3>
                <p className="text-blue-600 font-semibold mb-4">Co-Founder & Technical Director</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Award className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    Master Restorer qualification
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    IICRC certified instructor
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    Industry podcast host and educator
                  </li>
                  <li className="flex items-start">
                    <Building className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    NRPG co-founder
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Bronwyn McGurk</h3>
                <p className="text-blue-600 font-semibold mb-4">Co-Founder & Operations Director</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    Business strategy and growth expert
                  </li>
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    Customer experience champion
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    Emergency response coordinator
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    Team development leader
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Team Expertise</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <p className="text-sm text-gray-700">IICRC Certified</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                  <p className="text-sm text-gray-700">Years Experience</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <p className="text-sm text-gray-700">Emergency Response</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50km</div>
                  <p className="text-sm text-gray-700">Service Radius</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience the Disaster Recovery Difference</h2>
            <p className="text-xl mb-8">
              When disaster strikes, trust the team that Brisbane families and businesses have relied on since 2011.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 1300 309 361
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}
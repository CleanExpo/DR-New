
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllMDXDocuments } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Case Studies | Disaster Recovery Claims Consulting',
  description: 'Real case studies showing how we\'ve helped Brisbane homeowners maximize insurance settlements. $330K savings, 94% success rate.',
  keywords: 'insurance case studies, claim success stories, Brisbane flood claims, water damage cases, mould remediation results',
};

export default function CaseStudiesPage() {
  const caseStudies = getAllMDXDocuments('case-studies');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Real Case Studies</h1>
          <p className="text-2xl text-blue-100 max-w-3xl">
            See how we've helped Brisbane families and businesses maximize their insurance claims with proven expertise
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">94%</div>
              <div className="text-sm">Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">$45M</div>
              <div className="text-sm">Settlements Secured</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">15,000+</div>
              <div className="text-sm">Claims Handled</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">400%</div>
              <div className="text-sm">Avg Increase</div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-500 to-indigo-600">
                <div className="p-6 text-white">
                  <div className="text-sm font-semibold uppercase tracking-wider opacity-90">
                    Case Study
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {study.frontmatter.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {study.frontmatter.description}
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span>Read Case Study</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Your Success Story Could Be Next
          </h2>
          <p className="text-xl mb-8">
            Get expert assessment to maximize your insurance claim
          </p>
          <Link
            href="/claim"
            className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Your Claim Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
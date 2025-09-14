import { Metadata } from 'next';
import Link from 'next/link';
import { getAllMDXDocuments } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Top 10 Guides | Disaster Recovery Claims Consulting',
  description: 'Essential guides for Brisbane homeowners. Top 10 insurance mistakes, hidden damage signs, suburb denial rates.',
  keywords: 'insurance guides Brisbane, top 10 claim mistakes, water damage signs, Brisbane flood areas, insurance denial rates',
};

export default function ListiclesPage() {
  const listicles = getAllMDXDocuments('listicles');

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span>🏆</span>
            <span>ESSENTIAL GUIDES</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">Top 10 Guides</h1>
          <p className="text-2xl text-indigo-100 max-w-3xl">
            Expert insights to help you avoid costly mistakes and maximize your insurance claims
          </p>
        </div>
      </div>

      {/* Listicles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {listicles.map((listicle) => (
            <Link
              key={listicle.slug}
              href={`/listicles/${listicle.slug}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="text-sm font-semibold uppercase tracking-wider mb-2">
                  Top 10 Guide
                </div>
                <h3 className="text-2xl font-bold group-hover:underline">
                  {listicle.frontmatter.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  {listicle.frontmatter.description}
                </p>
                <div className="flex items-center text-indigo-600 font-semibold">
                  <span>Read Guide</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Stats */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Based on Real Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600">45,000</div>
              <div className="text-gray-600 mt-2">Unresolved Claims</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">67%</div>
              <div className="text-gray-600 mt-2">Milton Denial Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">$50K</div>
              <div className="text-gray-600 mt-2">Early Detection Saves</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">#1</div>
              <div className="text-gray-600 mt-2">Ranked Consultant</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Knowledge Is Power
          </h2>
          <p className="text-xl mb-8">
            Use these guides to protect yourself and maximize your claim
          </p>
          <Link
            href="/claim"
            className="inline-block bg-white text-indigo-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Apply This Knowledge
          </Link>
        </div>
      </div>
    </div>
  );
}
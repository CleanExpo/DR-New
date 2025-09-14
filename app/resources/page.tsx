import { Metadata } from 'next';
import Link from 'next/link';
import { getAllMDXDocuments } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Resources | Disaster Recovery Claims Consulting',
  description: 'Essential resources for Brisbane flood victims. 2022 flood updates, insurance dispute guides, government assistance.',
  keywords: 'Brisbane flood resources, insurance claim help, 2022 flood assistance, disaster recovery guides, Queensland flood support',
};

export default function ResourcesPage() {
  const resources = getAllMDXDocuments('resources');

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-900 to-orange-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span>⚠️</span>
            <span>CRITICAL RESOURCES</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">Essential Resources</h1>
          <p className="text-2xl text-red-100 max-w-3xl">
            Critical information for Brisbane families affected by floods and disasters
          </p>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resources.map((resource) => (
            <Link
              key={resource.slug}
              href={`/resources/${resource.slug}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-red-500 to-orange-600 p-6 text-white">
                <div className="text-sm font-semibold uppercase tracking-wider mb-2">
                  Resource
                </div>
                <h3 className="text-2xl font-bold group-hover:underline">
                  {resource.frontmatter.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  {resource.frontmatter.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {resource.frontmatter.publishDate}
                  </div>
                  <div className="flex items-center text-red-600 font-semibold">
                    <span>Read More</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">24/7 Claims</div>
              <div className="text-3xl font-bold">1300-XXX-XXX</div>
              <div className="text-gray-600 mt-2">Expert Assessment</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">Legal Aid QLD</div>
              <div className="text-3xl font-bold">1300 65 11 88</div>
              <div className="text-gray-600 mt-2">Free Legal Advice</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">AFCA</div>
              <div className="text-3xl font-bold">1800 931 678</div>
              <div className="text-gray-600 mt-2">Dispute Resolution</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don't Navigate This Alone
          </h2>
          <p className="text-xl mb-8">
            Get expert guidance through your insurance claim
          </p>
          <Link
            href="/claim"
            className="inline-block bg-white text-red-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Expert Help Now
          </Link>
        </div>
      </div>
    </div>
  );
}
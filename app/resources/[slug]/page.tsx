import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMDXBySlug, getAllMDXDocuments } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ExternalLink } from '@/components/ui/external-link';

const components = {
  ExternalLink,
};

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const documents = getAllMDXDocuments('resources');
  return documents.map(doc => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const document = getMDXBySlug('resources', params.slug);

  if (!document) {
    return {
      title: 'Resource Not Found',
    };
  }

  const { title, description, keywords, image } = document.frontmatter;

  return {
    title: `${title} | Disaster Recovery Resources`,
    description,
    keywords: keywords?.join(', '),
    openGraph: {
      title,
      description,
      images: image ? [image] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default function ResourcePage({ params }: PageProps) {
  const document = getMDXBySlug('resources', params.slug);

  if (!document) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-900 via-orange-900 to-red-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ESSENTIAL RESOURCE
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {document.frontmatter.title}
            </h1>
            <p className="text-xl md:text-2xl text-red-100">
              {document.frontmatter.description}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
                <span className="text-sm">Published:</span>
                <span className="font-semibold ml-2">{document.frontmatter.publishDate}</span>
              </div>
              <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
                <span className="text-sm">Author:</span>
                <span className="font-semibold ml-2">{document.frontmatter.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
        <div className="max-w-4xl mx-auto flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong className="font-bold">Critical Information:</strong> This resource contains time-sensitive information about ongoing insurance claims and disaster recovery. Verify all data with official sources.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-strong:text-red-600 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800">
          <MDXRemote source={document.content} components={components} />
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-900">The Crisis in Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">45,000</div>
              <div className="text-gray-600 mt-2">Unresolved Claims</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">$6.4B</div>
              <div className="text-gray-600 mt-2">Total Losses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">2+ Years</div>
              <div className="text-gray-600 mt-2">Still Waiting</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">67%</div>
              <div className="text-gray-600 mt-2">Milton Denial Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don't Wait Like 45,000 Others
          </h2>
          <p className="text-xl mb-8">
            Get expert help to navigate your insurance claim successfully
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/claim"
              className="inline-block bg-white text-red-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Claim Now
            </a>
            <a
              href="/resources"
              className="inline-block bg-red-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-red-400 transition-colors"
            >
              More Resources
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
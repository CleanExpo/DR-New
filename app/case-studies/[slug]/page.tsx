import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMDXBySlug, getAllMDXDocuments } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CaseStudyImage } from '@/components/images/ImageOptimizer';
import { ExternalLink } from '@/components/ui/external-link';

const components = {
  CaseStudyImage,
  ExternalLink,
};

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const documents = getAllMDXDocuments('case-studies');
  return documents.map(doc => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const document = getMDXBySlug('case-studies', params.slug);

  if (!document) {
    return {
      title: 'Case Study Not Found',
    };
  }

  const { title, description, keywords, image } = document.frontmatter;

  return {
    title: `${title} | Disaster Recovery Case Study`,
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

export default function CaseStudyPage({ params }: PageProps) {
  const document = getMDXBySlug('case-studies', params.slug);

  if (!document) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-4xl">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              CASE STUDY
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {document.frontmatter.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              {document.frontmatter.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-blue-600 prose-ul:mt-4 prose-ul:mb-4 prose-li:text-gray-700">
          <MDXRemote source={document.content} components={components} />
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">94%</div>
              <div className="text-gray-600 mt-2">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">400%</div>
              <div className="text-gray-600 mt-2">Avg Settlement Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600 mt-2">Emergency Response</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">25+</div>
              <div className="text-gray-600 mt-2">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don't Let This Happen to You
          </h2>
          <p className="text-xl mb-8">
            Get expert assessment before it's too late. Our proven strategies maximize your settlement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/claim"
              className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Claim
            </a>
            <a
              href="/case-studies"
              className="inline-block bg-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-400 transition-colors"
            >
              View More Case Studies
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
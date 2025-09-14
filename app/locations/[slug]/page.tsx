import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMDXBySlug, getAllMDXDocuments } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CaseStudyImage } from '@/components/images/ImageOptimizer';
import { ExternalLink } from '@/components/ui/external-link';
import { BrisbaneLocalSchema } from '@/components/seo/BrisbaneLocalSchema';

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
  const documents = getAllMDXDocuments('locations');
  return documents.map(doc => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const document = getMDXBySlug('locations', params.slug);

  if (!document) {
    return {
      title: 'Location Not Found',
    };
  }

  const { title, description, keywords, image } = document.frontmatter;

  return {
    title,
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

export default function LocationPage({ params }: PageProps) {
  const document = getMDXBySlug('locations', params.slug);

  if (!document) {
    notFound();
  }

  return (
    <>
      <BrisbaneLocalSchema />
      <article className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-slate-900 text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {document.frontmatter.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
              {document.frontmatter.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={document.content} components={components} />
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Get Expert Assessment for Your Area
            </h2>
            <p className="text-xl mb-8">
              24/7 Emergency Response • 94% Success Rate • No Upfront Fees
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/claim"
                className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Start Your Claim
              </a>
              <a
                href="/contact"
                className="inline-block bg-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-400 transition-colors"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
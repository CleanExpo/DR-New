import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMDXBySlug, getAllMDXDocuments } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ExternalLink } from '@/components/ui/external-link';
import { ListicleSchema } from '@/components/seo/ListicleSchema';

const components = {
  ExternalLink,
};

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const documents = getAllMDXDocuments('listicles');
  return documents.map(doc => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const document = getMDXBySlug('listicles', params.slug);

  if (!document) {
    return {
      title: 'Article Not Found',
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

// Extract list items from content for schema
function extractListItems(content: string): any[] {
  const items = [];
  const sections = content.split(/##\s+\d+\./);

  sections.forEach((section, index) => {
    if (index === 0) return; // Skip intro

    const lines = section.split('\n');
    const name = lines[0]?.trim();
    const description = lines.slice(1, 4).join(' ').trim();

    if (name) {
      items.push({
        position: index,
        name: name.replace(/[*_]/g, ''),
        description: description.substring(0, 200),
      });
    }
  });

  return items;
}

export default function ListiclePage({ params }: PageProps) {
  const document = getMDXBySlug('listicles', params.slug);

  if (!document) {
    notFound();
  }

  const listItems = extractListItems(document.content);

  return (
    <>
      <ListicleSchema
        title={document.frontmatter.title}
        description={document.frontmatter.description}
        items={listItems}
        datePublished={document.frontmatter.publishDate}
        image={document.frontmatter.image}
      />

      <article className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section with Featured Snippet Optimization */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 text-white">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold mb-6">
                <span>🏆</span>
                <span>TOP 10 GUIDE</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {document.frontmatter.title}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                {document.frontmatter.description}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Summary Box (Featured Snippet Target) */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-white rounded-xl shadow-2xl p-8 border-t-4 border-blue-600">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Quick Summary</h2>
            <ol className="space-y-2">
              {listItems.slice(0, 10).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="font-bold text-blue-600 mr-3">{index + 1}.</span>
                  <span className="text-gray-700">{item.name}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-blue-900 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-strong:text-blue-600 prose-ul:mt-4 prose-li:text-gray-700">
            <MDXRemote source={document.content} components={components} />
          </div>
        </div>

        {/* Trust Signals */}
        <div className="bg-blue-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Why Trust This Guide?</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">15,000+</div>
                <div className="text-gray-600">Claims Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">25+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">94%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">$45M</div>
                <div className="text-gray-600">Settlements Secured</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Don't Make These Mistakes
            </h2>
            <p className="text-xl mb-8">
              Get expert guidance to maximize your insurance claim
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/claim"
                className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Expert Help Now
              </a>
              <a
                href="/listicles"
                className="inline-block bg-indigo-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-indigo-400 transition-colors"
              >
                Read More Guides
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
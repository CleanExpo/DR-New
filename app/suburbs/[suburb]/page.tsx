// Dynamic Suburb Landing Page
// Generates SEO-optimized pages for all suburbs

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allSuburbs, getSuburbByName } from '@/lib/seo/suburb-data';
import { SuburbLandingPage, generateSuburbMetadata } from '@/lib/seo/page-generator';

interface Props {
  params: {
    suburb: string;
  };
}

// Generate metadata for each suburb page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const suburbName = params.suburb
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const suburb = getSuburbByName(suburbName);

  if (!suburb) {
    return {
      title: 'Suburb Not Found',
      description: 'The requested suburb page could not be found.'
    };
  }

  return generateSuburbMetadata(suburb);
}

// Generate static params for all suburbs (for SSG)
export async function generateStaticParams() {
  return allSuburbs.map((suburb) => ({
    suburb: suburb.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Main page component
export default function SuburbPage({ params }: Props) {
  const suburbName = params.suburb
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const suburb = getSuburbByName(suburbName);

  if (!suburb) {
    notFound();
  }

  return <SuburbLandingPage suburb={suburb} />;
}
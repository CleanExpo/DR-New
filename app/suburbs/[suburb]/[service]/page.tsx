// Dynamic Suburb + Service Landing Page
// Generates SEO-optimized pages for each suburb-service combination

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allSuburbs, getSuburbByName } from '@/lib/seo/suburb-data';
import { SERVICES } from '@/lib/seo/content-generator';
import { SuburbLandingPage, generateSuburbMetadata } from '@/lib/seo/page-generator';

interface Props {
  params: {
    suburb: string;
    service: string;
  };
}

// Generate metadata for each suburb-service page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const suburbName = params.suburb
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const serviceName = params.service
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const suburb = getSuburbByName(suburbName);
  const service = SERVICES.find(s =>
    s.service.toLowerCase() === serviceName.toLowerCase()
  );

  if (!suburb || !service) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    };
  }

  return generateSuburbMetadata(suburb, service);
}

// Generate static params for all suburb-service combinations (for SSG)
export async function generateStaticParams() {
  const params = [];

  for (const suburb of allSuburbs) {
    for (const service of SERVICES) {
      params.push({
        suburb: suburb.name.toLowerCase().replace(/\s+/g, '-'),
        service: service.service.toLowerCase().replace(/\s+/g, '-'),
      });
    }
  }

  return params;
}

// Main page component
export default function SuburbServicePage({ params }: Props) {
  const suburbName = params.suburb
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const serviceName = params.service
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const suburb = getSuburbByName(suburbName);
  const service = SERVICES.find(s =>
    s.service.toLowerCase() === serviceName.toLowerCase()
  );

  if (!suburb || !service) {
    notFound();
  }

  return <SuburbLandingPage suburb={suburb} service={service} />;
}
/**
 * Dynamic Page Generation System
 * Automatically generates location and service-specific pages
 * Based on contractor network data and SEO requirements
 */

import { LocationData, ServiceData, ContractorData, PageTemplate } from './types';
import { generatePageContent } from './content-generator';
import { generateSEOData } from './seo-generator';
import { generateSchema } from './schema-generator';

export interface PageGenerationConfig {
  location: LocationData;
  service?: ServiceData;
  contractors?: ContractorData[];
  template: PageTemplate;
}

export interface GeneratedPage {
  slug: string;
  title: string;
  description: string;
  content: string;
  metadata: PageMetadata;
  schema: unknown;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    type: string;
    images?: string[];
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images?: string[];
  };
}

/**
 * Main page generation function
 * Generates complete page data including content, SEO, and schema
 */
export async function generatePage(config: PageGenerationConfig): Promise<GeneratedPage> {
  try {
    const { location, service, contractors, template } = config;

  // Generate slug based on location and service
  const slug = generateSlug(location, service);

  // Generate SEO-optimized title and description
  const seoData = generateSEOData(location, service, contractors);

  // Generate page content using templates
  const content = await generatePageContent({
    location,
    service,
    contractors,
    template,
    seoData
  });

  // Generate structured data schema
  const schema = generateSchema({
    location,
    service,
    contractors,
    type: template.schemaType
  });

  // Generate metadata for Next.js
  const metadata: PageMetadata = {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: 'website',
      images: seoData.images
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: seoData.images
    }
  };

    return {
      slug,
      title: seoData.title,
      description: seoData.description,
      content,
      metadata,
      schema
    };
  } catch (error) {
    console.error('Error in generatePage:', error);
    throw error;
  }
}

/**
 * Generate URL-friendly slug
 */
function generateSlug(location: LocationData, service?: ServiceData): string {
  const parts = [];

  if (location.state) {
    parts.push(location.state.toLowerCase().replace(/\s+/g, '-'));
  }

  if (location.city) {
    parts.push(location.city.toLowerCase().replace(/\s+/g, '-'));
  }

  if (location.suburb) {
    parts.push(location.suburb.toLowerCase().replace(/\s+/g, '-'));
  }

  if (service) {
    parts.push(service.slug);
  }

  return parts.join('/');
}

/**
 * Batch generate pages for multiple locations/services
 */
export async function batchGeneratePages(
  locations: LocationData[],
  services: ServiceData[],
  contractors: ContractorData[],
  template: PageTemplate
): Promise<GeneratedPage[]> {
  try {
    const pages: GeneratedPage[] = [];

    for (const location of locations) {
      // Generate location-only page
      const locationPage = await generatePage({
        location,
        contractors: filterContractorsByLocation(contractors, location),
        template
      });
      pages.push(locationPage);

    // Generate service-specific pages for this location
    for (const service of services) {
      const servicePage = await generatePage({
        location,
        service,
        contractors: filterContractorsByLocationAndService(contractors, location, service),
        template
      });
      pages.push(servicePage);
    }
  }

    return pages;
  } catch (error) {
    console.error('Error in batchGeneratePages:', error);
    throw error;
  }
}

/**
 * Filter contractors by location coverage
 */
function filterContractorsByLocation(
  contractors: ContractorData[],
  location: LocationData
): ContractorData[] {
  return contractors.filter(contractor => {
    const distance = calculateDistance(
      contractor.location,
      location
    );
    return distance <= contractor.serviceRadius;
  });
}

/**
 * Filter contractors by location and service
 */
function filterContractorsByLocationAndService(
  contractors: ContractorData[],
  location: LocationData,
  service: ServiceData
): ContractorData[] {
  return filterContractorsByLocation(contractors, location)
    .filter(contractor =>
      contractor.services.some(s => s.id === service.id)
    );
}

/**
 * Calculate distance between two locations (simplified)
 */
function calculateDistance(loc1: LocationData, loc2: LocationData): number {
  // Simplified distance calculation
  // In production, use proper geographic distance calculation
  const lat1 = loc1.coordinates?.lat || 0;
  const lon1 = loc1.coordinates?.lng || 0;
  const lat2 = loc2.coordinates?.lat || 0;
  const lon2 = loc2.coordinates?.lng || 0;

  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Generate pages based on contractor signup
 */
export async function generatePagesForNewContractor(
  contractor: ContractorData,
  allLocations: LocationData[],
  allServices: ServiceData[],
  template: PageTemplate
): Promise<GeneratedPage[]> {
  try {
    const pages: GeneratedPage[] = [];

    // Find locations within contractor's service radius
    const coveredLocations = allLocations.filter(location => {
      const distance = calculateDistance(contractor.location, location);
      return distance <= contractor.serviceRadius;
    });

    // Generate pages for each covered location and service combination
    for (const location of coveredLocations) {
      for (const service of contractor.services) {
        const page = await generatePage({
          location,
          service,
          contractors: [contractor],
          template
        });
        pages.push(page);
      }
    }

    return pages;
  } catch (error) {
    console.error('Error in generatePagesForNewContractor:', error);
    throw error;
  }
}

export * from './types';
export * from './content-generator';
export * from './seo-generator';
export * from './schema-generator';
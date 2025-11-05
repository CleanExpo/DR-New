import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getSuburbData,
  getNearbySuburbNames,
  generateIntro,
  generateDisasterTypesSection,
  generateWhyChooseUs,
  generateFAQs,
  generateEmergencyResponse,
  generateServicesSection,
  SuburbPageTemplate,
  generateSuburbMetadata,
} from '@/lib/suburb-template';

const SUBURB_SLUG = 'paddington';

/**
 * Generate metadata for Paddington page
 */
export async function generateMetadata(): Promise<Metadata> {
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) return {};
  return generateSuburbMetadata(suburb);
}

/**
 * Paddington Disaster Recovery Page
 * Premium heritage Queenslander suburb with specialist restoration needs
 */
export default function PaddingtonPage() {
  // Get suburb data
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) {
    notFound();
  }

  // Get nearby suburb names for linking
  const nearbySuburbNames = getNearbySuburbNames(SUBURB_SLUG);

  // Generate all content sections
  const intro = generateIntro(suburb);
  const heroIntro = `Master Restorer certified disaster recovery specialists serving Paddington's premium heritage properties. With ${suburb.responseTime} emergency response, we protect heritage Queenslanders, character terraces, and workers cottages throughout Paddington ${suburb.postcode}. Specialist expertise in period-correct heritage restoration and fire damage recovery for wooden structures.`;

  const disasterTypesRaw = generateDisasterTypesSection(suburb);
  const disasterTypes = disasterTypesRaw.map(block => ({
    heading: block.heading,
    content: block.content,
    featured: block.featured,
  }));

  const whyChooseUsBlock = generateWhyChooseUs(suburb);
  const whyChooseUs = whyChooseUsBlock.content
    .split('\n\n')
    .filter(point => point.trim().length > 0);

  const emergencyResponseBlock = generateEmergencyResponse(suburb);
  const emergencyResponse = {
    steps: [
      {
        title: 'Immediate Contact',
        description: 'Call 1300 309 361 for 24/7 emergency response. Our team specialises in Paddington heritage Queenslander and character property restoration.',
      },
      {
        title: `${suburb.responseTime} Response`,
        description: `Our heritage restoration experts arrive within ${suburb.responseTime} to assess damage and protect your Paddington character property.`,
      },
      {
        title: 'Heritage Assessment',
        description: 'specialised evaluation of fire, water, or storm damage to heritage Queenslanders, terraces, and workers cottages with focus on preserving character features.',
      },
      {
        title: 'Fire Damage Control',
        description: 'Expert fire damage assessment and emergency boarding for wooden Queenslanders and close-set terraces to prevent weather damage and secure properties.',
      },
      {
        title: 'Water & Drainage',
        description: 'Hillside drainage solutions and water damage mitigation for Paddington\'s unique topography with elevated Queenslanders and under-house areas.',
      },
      {
        title: 'Character Preservation',
        description: 'Careful protection of heritage features, period joinery, decorative elements, and architectural details during emergency stabilization.',
      },
      {
        title: 'Insurance Coordination',
        description: 'Direct billing with all major insurers. Expert documentation of heritage property values and character features for insurance claims.',
      },
      {
        title: 'Period-Correct Restoration',
        description: 'Master Restorer certified restoration using period-correct techniques, materials, and craftsmanship to preserve Paddington\'s heritage character.',
      },
    ],
  };

  const servicesRaw = generateServicesSection(suburb);
  const servicesAvailable = servicesRaw.map(service => ({
    type: service.heading.split(' - ')[0],
    description: service.content,
  }));

  const faqItems = generateFAQs(suburb);

  const nearbySuburbs = Object.entries(nearbySuburbNames).map(([slug, name]) => ({
    name,
    slug,
  }));

  return (
    <SuburbPageTemplate
      suburb={suburb}
      intro={intro}
      heroIntro={heroIntro}
      disasterTypes={disasterTypes}
      whyChooseUs={whyChooseUs}
      emergencyResponse={emergencyResponse}
      servicesAvailable={servicesAvailable}
      faqItems={faqItems}
      nearbySuburbs={nearbySuburbs}
    />
  );
}

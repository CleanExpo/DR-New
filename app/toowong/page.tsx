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

const SUBURB_SLUG = 'toowong';

/**
 * Generate metadata for Toowong page
 */
export async function generateMetadata(): Promise<Metadata> {
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) return {};
  return generateSuburbMetadata(suburb);
}

/**
 * Toowong Disaster Recovery Page
 */
export default function ToowongPage() {
  // Get suburb data
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) {
    notFound();
  }

  // Get nearby suburb names for linking
  const nearbySuburbNames = getNearbySuburbNames(SUBURB_SLUG);

  // Generate all content sections
  const intro = generateIntro(suburb);
  const heroIntro = `Hillside property specialists serving Toowong's diverse residential landscape. Expert restoration of ${suburb.demographics.primaryPropertyTypes[0].toLowerCase()}, heritage homes, and university-area properties. ${suburb.responseTime} emergency response to Toowong ${suburb.postcode} with specialized hillside expertise.`;

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
        description: 'Call 1300 309 361 for 24/7 emergency response. Our team is always ready to respond to Toowong disasters.',
      },
      {
        title: `${suburb.responseTime} Response`,
        description: `Our hillside property specialists arrive within ${suburb.responseTime} to begin damage assessment and emergency stabilization.`,
      },
      {
        title: 'Damage Assessment',
        description: 'Comprehensive evaluation of water, storm, or subsidence damage to your Toowong property.',
      },
      {
        title: 'Emergency Stabilization',
        description: 'Immediate actions to prevent further damage including water extraction, drainage solutions, and securing your property.',
      },
      {
        title: 'Insurance Coordination',
        description: 'Direct billing with all major insurers. We handle documentation and claims processing for Toowong residents.',
      },
      {
        title: 'Professional Restoration',
        description: 'Master Restorer certified restoration with specialized knowledge of hillside property challenges.',
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

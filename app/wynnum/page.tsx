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

const SUBURB_SLUG = 'wynnum';

/**
 * Generate metadata for Wynnum page
 */
export async function generateMetadata(): Promise<Metadata> {
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) return {};
  return generateSuburbMetadata(suburb);
}

/**
 * Wynnum Disaster Recovery Page
 */
export default function WynnumPage() {
  // Get suburb data
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) {
    notFound();
  }

  // Get nearby suburb names for linking
  const nearbySuburbNames = getNearbySuburbNames(SUBURB_SLUG);

  // Generate all content sections
  const intro = generateIntro(suburb);
  const heroIntro = `Coastal property specialists serving Wynnum's bayside community. Expert restoration of ${suburb.demographics.primaryPropertyTypes[0].toLowerCase()}, beach homes, and waterfront properties. ${suburb.responseTime} emergency response to Wynnum ${suburb.postcode} with specialized storm surge and salt water damage expertise.`;

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
        description: 'Call 1300 309 361 for 24/7 emergency response. Our team is always ready to respond to Wynnum coastal disasters.',
      },
      {
        title: `${suburb.responseTime} Response`,
        description: `Our coastal property specialists arrive within ${suburb.responseTime} to begin damage assessment and emergency stabilization.`,
      },
      {
        title: 'Coastal Damage Assessment',
        description: 'Specialized evaluation of storm surge, water, mould, or salt damage to your Wynnum waterfront property.',
      },
      {
        title: 'Emergency Stabilization',
        description: 'Immediate actions to prevent further damage including water extraction, dehumidification, and securing your coastal property.',
      },
      {
        title: 'Insurance Coordination',
        description: 'Direct billing with all major insurers. We handle documentation and claims processing for Wynnum residents.',
      },
      {
        title: 'Coastal Restoration',
        description: 'Master Restorer certified restoration with specialized knowledge of coastal property challenges and salt corrosion.',
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

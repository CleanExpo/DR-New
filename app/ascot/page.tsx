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

const SUBURB_SLUG = 'ascot';

/**
 * Generate metadata for Ascot page
 */
export async function generateMetadata(): Promise<Metadata> {
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) return {};
  return generateSuburbMetadata(suburb);
}

/**
 * Ascot Disaster Recovery Page
 */
export default function AscotPage() {
  // Get suburb data
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) {
    notFound();
  }

  // Get nearby suburb names for linking
  const nearbySuburbNames = getNearbySuburbNames(SUBURB_SLUG);

  // Generate all content sections
  const intro = generateIntro(suburb);
  const heroIntro = `Prestigious Ascot properties deserve Master Restorer expertise. specialising in ${suburb.demographics.primaryPropertyTypes[0].toLowerCase()} and executive estates near Eagle Farm and Doomben Racecourses. Emergency response within ${suburb.responseTime} to all Ascot ${suburb.postcode} properties.`;

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
        description: 'Call 1300 309 361 for 24/7 emergency response. Our team is always ready to respond to Ascot disasters.',
      },
      {
        title: `${suburb.responseTime} Response`,
        description: `Our emergency team arrives within ${suburb.responseTime} to begin damage assessment and emergency stabilization.`,
      },
      {
        title: 'Damage Assessment',
        description: 'Comprehensive evaluation of water, fire, storm, or flood damage to your Ascot property.',
      },
      {
        title: 'Emergency Stabilization',
        description: 'Immediate actions to prevent further damage including water extraction, tarping, and securing your property.',
      },
      {
        title: 'Insurance Coordination',
        description: 'Direct billing with all major insurers. We handle documentation and claims processing for Ascot residents.',
      },
      {
        title: 'Professional Restoration',
        description: 'Master Restorer certified restoration to return your luxury property to pre-damage condition.',
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

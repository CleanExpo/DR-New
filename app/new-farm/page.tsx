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

const SUBURB_SLUG = 'new-farm';

/**
 * Generate metadata for New Farm page
 */
export async function generateMetadata(): Promise<Metadata> {
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) return {};
  return generateSuburbMetadata(suburb);
}

/**
 * New Farm Disaster Recovery Page
 */
export default function NewFarmPage() {
  // Get suburb data
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) {
    notFound();
  }

  // Get nearby suburb names for linking
  const nearbySuburbNames = getNearbySuburbNames(SUBURB_SLUG);

  // Generate all content sections
  const intro = generateIntro(suburb);
  const heroIntro = `Heritage Queenslander specialists serving New Farm's unique properties. Expert restoration of ${suburb.demographics.primaryPropertyTypes[0].toLowerCase()}, terrace houses, and heritage homes. ${suburb.responseTime} emergency response to New Farm ${suburb.postcode} with period-correct restoration expertise.`;

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
        description: 'Call 1300 309 361 for 24/7 emergency response. Our team is always ready to respond to New Farm disasters.',
      },
      {
        title: `${suburb.responseTime} Response`,
        description: `Our heritage property specialists arrive within ${suburb.responseTime} to begin damage assessment and emergency stabilization.`,
      },
      {
        title: 'Heritage Property Assessment',
        description: 'Specialized evaluation of water, fire, mould, or storm damage to Queenslander and heritage properties.',
      },
      {
        title: 'Emergency Stabilization',
        description: 'Immediate actions to prevent further damage while preserving heritage features and period details.',
      },
      {
        title: 'Insurance Coordination',
        description: 'Direct billing with all major insurers. We handle documentation and claims processing for New Farm residents.',
      },
      {
        title: 'Period-Correct Restoration',
        description: 'Master Restorer certified restoration that preserves the character and heritage value of your property.',
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

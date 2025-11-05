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

const SUBURB_SLUG = 'bulimba';

/**
 * Generate metadata for Bulimba page
 */
export async function generateMetadata(): Promise<Metadata> {
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) return {};
  return generateSuburbMetadata(suburb);
}

/**
 * Bulimba Disaster Recovery Page
 * Prestigious riverfront properties with luxury estates and heritage Queenslanders
 */
export default function BulimbaPage() {
  // Get suburb data
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) {
    notFound();
  }

  // Get nearby suburb names for linking
  const nearbySuburbNames = getNearbySuburbNames(SUBURB_SLUG);

  // Generate all content sections
  const intro = generateIntro(suburb);
  const heroIntro = `Master Restorer certified disaster recovery specialists serving Bulimba's prestigious riverfront community. With ${suburb.responseTime} emergency response, we protect luxury riverfront estates, heritage Queenslanders, and high-value properties throughout Bulimba ${suburb.postcode}. White-glove service for executive-level flood recovery and heritage restoration along Oxford Street and the Brisbane River precinct.`;

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
        description: 'Call 1300 309 361 for 24/7 emergency response. Our team provides executive-level service for Bulimba\'s luxury riverfront properties and heritage estates.',
      },
      {
        title: `${suburb.responseTime} Response`,
        description: `Our specialised team arrives within ${suburb.responseTime} with white-glove service approach for Bulimba\'s high-value properties.`,
      },
      {
        title: 'Luxury Property Assessment',
        description: 'Comprehensive evaluation of flood, water, or storm damage to riverfront estates, heritage Queenslanders, and high-value contents with discrete professional service.',
      },
      {
        title: 'Emergency Stabilization',
        description: 'Immediate flood water extraction, property securing, and protection of high-value contents, artwork, and furnishings in Bulimba riverside homes.',
      },
      {
        title: 'Content Protection',
        description: 'Specialised handling and restoration of luxury furnishings, antiques, artwork, and high-value items with climate-controlled storage if needed.',
      },
      {
        title: 'Heritage Restoration',
        description: 'Expert restoration of heritage Queenslanders and character homes using period-correct techniques and materials to preserve architectural integrity.',
      },
      {
        title: 'Insurance Coordination',
        description: 'Direct billing with all major insurers. Extensive experience with high-value property claims and luxury riverfront flood recovery in Bulimba.',
      },
      {
        title: 'Executive Restoration',
        description: 'Master Restorer certified restoration with project management tailored for Bulimba\'s affluent demographic. Discrete service with minimal disruption.',
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

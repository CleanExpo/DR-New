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

const SUBURB_SLUG = 'west-end';

/**
 * Generate metadata for West End page
 */
export async function generateMetadata(): Promise<Metadata> {
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) return {};
  return generateSuburbMetadata(suburb);
}

/**
 * West End Disaster Recovery Page
 * Riverside apartments and critical flood zone with major cultural diversity
 */
export default function WestEndPage() {
  // Get suburb data
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) {
    notFound();
  }

  // Get nearby suburb names for linking
  const nearbySuburbNames = getNearbySuburbNames(SUBURB_SLUG);

  // Generate all content sections
  const intro = generateIntro(suburb);
  const heroIntro = `Master Restorer certified disaster recovery specialists serving West End's riverside community. With ${suburb.responseTime} emergency response, we protect riverside apartments, heritage Queenslanders, and commercial properties throughout West End ${suburb.postcode}. Critical flood response expertise for one of Brisbane's highest-risk riverside locations.`;

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
        description: 'Call 1300 309 361 for 24/7 emergency response. Our team specialises in West End riverside property and high-rise flood recovery.',
      },
      {
        title: `${suburb.responseTime} Response`,
        description: `Our emergency team arrives within ${suburb.responseTime} to begin flood damage assessment and emergency water extraction for West End properties.`,
      },
      {
        title: 'Flood Damage Assessment',
        description: 'Comprehensive evaluation of flood impact on riverside apartments, basement car parks, heritage homes, and commercial properties throughout West End.',
      },
      {
        title: 'Emergency Water Extraction',
        description: 'Industrial-grade water extraction for flooded apartments, basement levels, and ground-floor commercial spaces along Boundary Street and riverside areas.',
      },
      {
        title: 'Mould Prevention',
        description: 'Critical anti-microbial treatment and dehumidification to prevent mould growth in West End\'s high-humidity riverside environment.',
      },
      {
        title: 'Multi-Unit Coordination',
        description: 'specialised coordination for apartment complexes and strata properties requiring simultaneous restoration across multiple units.',
      },
      {
        title: 'Insurance Coordination',
        description: 'Direct billing with all major insurers. Extensive experience with flood claims for West End riverside properties.',
      },
      {
        title: 'Heritage Restoration',
        description: 'Master Restorer certified restoration for West End\'s heritage Queenslanders and character properties with period-correct repairs.',
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

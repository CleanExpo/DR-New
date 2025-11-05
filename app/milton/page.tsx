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

const SUBURB_SLUG = 'milton';

/**
 * Generate metadata for Milton page
 */
export async function generateMetadata(): Promise<Metadata> {
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) return {};
  return generateSuburbMetadata(suburb);
}

/**
 * Milton Disaster Recovery Page
 * Entertainment precinct with Suncorp Stadium, XXXX Brewery, and Park Road venues
 */
export default function MiltonPage() {
  // Get suburb data
  const suburb = getSuburbData(SUBURB_SLUG);
  if (!suburb) {
    notFound();
  }

  // Get nearby suburb names for linking
  const nearbySuburbNames = getNearbySuburbNames(SUBURB_SLUG);

  // Generate all content sections
  const intro = generateIntro(suburb);
  const heroIntro = `Master Restorer certified disaster recovery specialists serving Milton's entertainment precinct. With ${suburb.responseTime} emergency response, we protect commercial venues, sports facilities, and residential properties throughout Milton ${suburb.postcode}, including the Suncorp Stadium area and Park Road entertainment district.`;

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
        description: 'Call 1300 309 361 for 24/7 emergency response. Our team specialises in Milton commercial and entertainment venue restoration.',
      },
      {
        title: `${suburb.responseTime} Response`,
        description: `Our emergency team arrives within ${suburb.responseTime} to begin damage assessment and business continuity planning for your Milton property.`,
      },
      {
        title: 'Commercial Assessment',
        description: 'Comprehensive evaluation of water, fire, or storm damage with focus on minimizing business interruption for Milton venues and retailers.',
      },
      {
        title: 'Emergency Stabilization',
        description: 'Immediate actions including water extraction from basement car parks, securing entertainment venues, and protecting commercial inventory.',
      },
      {
        title: 'Business Continuity',
        description: 'specialised support for restaurants, bars, and entertainment venues to minimise downtime during critical events and sporting seasons.',
      },
      {
        title: 'Insurance Coordination',
        description: 'Direct billing with all major insurers. We handle commercial claims documentation and loss of income calculations for Milton businesses.',
      },
      {
        title: 'Professional Restoration',
        description: 'Master Restorer certified restoration to return your Milton property to operational condition with minimal business disruption.',
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

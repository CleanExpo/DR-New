import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ScenarioPageComponent from '../../../components/whos-first/scenario-page';
import { WhosFirstGenerator } from '../../../lib/whos-first-generator';

interface PageProps {
  params: {
    scenario: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Parse scenario ID to extract components
  const parts = params.scenario.split('-');

  // Generate scenario data
  const scenario = WhosFirstGenerator.generateScenario(
    parts[0], // damage type
    parts[1], // variation
    parts[2] || 'immediate', // time factor
    parts[3] || 'residential', // property type
    parts[4] // location (optional)
  );

  if (!scenario) {
    return {
      title: 'Scenario Not Found | Disaster Recovery',
      description: 'The requested scenario could not be found.',
    };
  }

  return {
    title: `${scenario.title} | Who's First? Disaster Recovery`,
    description: scenario.metaDescription,
    keywords: scenario.searchKeywords.join(', '),
    openGraph: {
      title: scenario.title,
      description: scenario.metaDescription,
      type: 'article',
      images: [
        {
          url: '/images/whos-first-og.jpg',
          width: 1200,
          height: 630,
          alt: scenario.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: scenario.title,
      description: scenario.metaDescription,
      images: ['/images/whos-first-twitter.jpg'],
    },
    alternates: {
      canonical: `/whos-first/${params.scenario}`,
    },
  };
}

// ISR: Generate pages on-demand with revalidation
// Commenting out to prevent build-time generation
// export async function generateStaticParams() {
//   const commonScenarios = [
//     'water-burst-pipe-immediate-residential',
//     'water-flooding-immediate-residential',
//     'fire-kitchen-fire-immediate-residential',
//     'mould-black-mould-just-discovered-residential',
//     'storm-roof-damage-immediate-residential',
//   ];
//
//   return commonScenarios.map((scenario) => ({
//     scenario,
//   }));
// }

// Add ISR revalidation
export const revalidate = 3600; // Revalidate every hour

export default function WhosFirstScenarioPage({ params }: PageProps) {
  // Parse scenario ID to extract components
  const parts = params.scenario.split('-');
  
  // Generate scenario data
  const scenario = WhosFirstGenerator.generateScenario(
    parts[0], // damage type
    parts[1], // variation
    parts[2] || 'immediate', // time factor
    parts[3] || 'residential', // property type
    parts[4] // location (optional)
  );

  if (!scenario) {
    notFound();
  }

  return <ScenarioPageComponent scenario={scenario} />;
}
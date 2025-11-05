import Head from 'next/head';

interface Category3CaseStudySEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function Category3CaseStudySEO({
  title = 'Gold Coast Sewage Emergency: Category 3 Water Damage Case Study | 10-Day Restoration',
  description = 'Friday 4PM sewage backup in Gold Coast high-rise. 3 units flooded with raw sewage. 26-hour weekend response, complete restoration in 10 days. IICRC certified Category 3 specialists.',
  image = 'https://disaster-recovery-seven.vercel.app/images/case-studies/gold-coast-sewage-emergency.png',
  url = 'https://disaster-recovery-seven.vercel.app/case-studies/gold-coast-sewage-emergency'
}: Category3CaseStudySEOProps) {

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: title,
        description: description,
        image: {
          '@type': 'ImageObject',
          url: image,
          width: 1200,
          height: 630,
          caption: 'Category 3 blackwater damage in Gold Coast high-rise apartments'
        },
        datePublished: '2024-01-15T16:00:00+10:00',
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'National Restoration Projects',
          url: 'https://disaster-recovery-seven.vercel.app',
          logo: {
            '@type': 'ImageObject',
            url: 'https://disaster-recovery-seven.vercel.app/logo.png'
          }
        },
        publisher: {
          '@type': 'Organization',
          name: 'National Restoration Projects',
          logo: {
            '@type': 'ImageObject',
            url: 'https://disaster-recovery-seven.vercel.app/logo.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Category 3 water damage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Category 3 water damage, also known as black water, contains dangerous pathogens from sewage or contaminated sources. It requires immediate professional restoration following IICRC S500 protocols to prevent serious health risks.'
            }
          },
          {
            '@type': 'Question',
            name: 'How long does Category 3 water damage restoration take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Category 3 restoration typically takes 7-14 days depending on severity. Our Gold Coast high-rise project was completed in 10 days, including complete decontamination, structural drying, and full restoration of 3 units plus common areas.'
            }
          },
          {
            '@type': 'Question',
            name: 'Why is weekend response important for sewage damage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sewage contains rapidly multiplying bacteria and pathogens. Our 26-hour weekend response prevented escalation of health risks and structural damage, saving weeks of potential restoration time and minimizing costs.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do you handle sewage cleanup in high-rise buildings?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'High-rise sewage cleanup requires containment barriers, negative air pressure, discrete operations, and coordination with building management. We ensure minimal disruption while following strict IICRC protocols for Category 3 water damage.'
            }
          }
        ]
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://disaster-recovery-seven.vercel.app#organization',
        name: 'National Restoration Projects - Gold Coast',
        description: 'Emergency Category 3 water damage restoration specialists serving Gold Coast high-rises and luxury properties',
        url: 'https://disaster-recovery-seven.vercel.app',
        telephone: '1300-000-000',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Gold Coast',
          addressRegion: 'QLD',
          addressCountry: 'AU'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -28.0167,
          longitude: 153.4000
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Surfers Paradise'
          },
          {
            '@type': 'City',
            name: 'Broadbeach'
          },
          {
            '@type': 'City',
            name: 'Main Beach'
          },
          {
            '@type': 'City',
            name: 'Southport'
          },
          {
            '@type': 'City',
            name: 'Robina'
          }
        ],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        },
        priceRange: '$$$$'
      },
      {
        '@type': 'Service',
        serviceType: 'Category 3 Water Damage Restoration',
        provider: {
          '@id': 'https://disaster-recovery-seven.vercel.app#organization'
        },
        areaServed: {
          '@type': 'State',
          name: 'Queensland'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Emergency Restoration Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Sewage Cleanup',
                description: '24/7 emergency response for sewage backups and overflows'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Blackwater Extraction',
                description: 'Professional Category 3 water extraction and disposal'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Biohazard Decontamination',
                description: 'IICRC S500 certified decontamination protocols'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'High-Rise Restoration',
                description: 'specialised restoration for multi-story buildings'
              }
            }
          ]
        }
      },
      {
        '@type': 'HowTo',
        name: 'Emergency Response Protocol for Category 3 Water Damage',
        description: 'Professional steps for handling sewage contamination in high-rise buildings',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Immediate Assessment',
            text: 'Respond within 3 hours to assess contamination extent and health risks'
          },
          {
            '@type': 'HowToStep',
            name: 'Containment & Safety',
            text: 'Establish containment barriers and implement safety protocols'
          },
          {
            '@type': 'HowToStep',
            name: 'Extraction & Removal',
            text: 'Extract sewage and remove all contaminated materials'
          },
          {
            '@type': 'HowToStep',
            name: 'Decontamination',
            text: 'Apply antimicrobial treatments following IICRC standards'
          },
          {
            '@type': 'HowToStep',
            name: 'Structural Drying',
            text: 'Install drying equipment and monitor moisture levels'
          },
          {
            '@type': 'HowToStep',
            name: 'Restoration',
            text: 'Coordinate trades for complete restoration to pre-loss condition'
          }
        ]
      }
    ]
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="National Restoration Projects" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Meta Tags */}
      <meta name="keywords" content="Category 3 water damage Gold Coast, sewage cleanup high rise, blackwater restoration Queensland, emergency sewage backup Gold Coast, IICRC S500 Category 3, Friday afternoon emergency response, weekend sewage cleanup, Surfers Paradise water damage, Broadbeach sewage restoration, Main Beach emergency restoration, high-rise sewage contamination, raw sewage cleanup specialists, biohazard restoration Gold Coast, 24 hour sewage response, apartment building water damage" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="National Restoration Projects" />
      <meta name="geo.region" content="AU-QLD" />
      <meta name="geo.placename" content="Gold Coast" />
      <meta name="geo.position" content="-28.0167;153.4000" />
      <meta name="ICBM" content="-28.0167, 153.4000" />

      {/* Voice Search optimisation */}
      <meta name="voice:title" content="Emergency sewage cleanup Gold Coast apartments" />
      <meta name="voice:description" content="24 hour Category 3 water damage restoration for Gold Coast high-rise buildings" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
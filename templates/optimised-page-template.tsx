import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Clock, Award, Phone, GraduationCap } from 'lucide-react';

export function OptimisedPageTemplate({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// Australian-specific configurations
export const AUSTRALIAN_CONFIG = {
  spelling: {
    color: 'colour',
    organization: 'organisation',
    optimize: 'optimise',
    analyze: 'analyse',
  },
  emergency: {
    number: '000',
    ses: '132 500',
  },
  currency: {
    symbol: '$',
    code: 'AUD',
  }
};

// SEO Metadata Generator
export function generateAustralianMetadata({
  title,
  description,
  keywords,
  path,
  image = '/images/optimized/damage/3D image of a house fire.png'
}: {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  image?: string;
}): Metadata {
  return {
    title: `${title} | Disaster Recovery Brisbane`,
    description: `${description} 24/7 emergency response Brisbane, Ipswich, Logan. IICRC Master Restorer approved.`,
    keywords: [...keywords, 'Brisbane', 'emergency', '24/7', 'insurance approved'].join(', '),
    openGraph: {
      title,
      description,
      url: `https://dr-new-ten.vercel.app${path}`,
      siteName: 'Disaster Recovery Brisbane',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_AU',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    },
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `https://dr-new-ten.vercel.app${path}`
    }
  };
}

// Schema.org Generator for Australian Business
export function generateAustralianSchema({
  serviceName,
  serviceType,
  description,
  url
}: {
  serviceName: string;
  serviceType: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: serviceName,
    description,
    url,
    telephone: "1300 309 361",
    areaServed: [
      {
        '@type': 'City',
        name: 'Brisbane',
      },
      {
        '@type': 'City',
        name: 'Ipswich',
      },
      {
        '@type': 'City',
        name: 'Logan',
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4/17 Tile St',
      addressLocality: 'Wacol',
      addressRegion: 'QLD',
      postalCode: '4076',
      addressCountry: 'AU'
    },
    priceRange: '$$',
    paymentAccepted: 'Insurance Direct Billing',
    currenciesAccepted: 'AUD',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    }
  };
}

// Emergency CTA Component
export const EmergencyCTA = ({
  title = 'Emergency? We\'re Here 24/7',
  subtitle = 'Every minute counts in disaster recovery'
}) => {
  return (
    <div className="bg-red-600 text-white py-8 px-6 rounded-lg text-center">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-lg mb-6">{subtitle}</p>
      <Link href="tel:1300309361" className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors">
        <Phone className="w-5 h-5 mr-2" />
        1300 309 361
      </Link>
    </div>
  );
};

// Location Grid Component for Brisbane areas
export const AustralianLocationGrid = ({ serviceSlug }: { serviceSlug: string }) => {
  const areas = [
    'Hamilton', 'Ascot', 'New Farm', 'Toowong', 'Springfield Lakes',
    'Karalee', 'Brookwater', 'CBD', 'Fortitude Valley', 'Milton'
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {areas.map((area) => (
        <Link
          key={area}
          href={`/services/${serviceSlug}/${area.toLowerCase().replace(/\s+/g, '-')}`}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-center hover:bg-white/10 hover:border-blue-400/50 transition-all text-sm"
        >
          <span className="text-white">{area}</span>
        </Link>
      ))}
    </div>
  );
};

export default OptimisedPageTemplate;

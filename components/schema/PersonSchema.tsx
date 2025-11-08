import Script from 'next/script';

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description?: string;
  email?: string;
  telephone?: string;
  url?: string;
  worksFor?: {
    name: string;
    url: string;
  };
  alumniOf?: string[];
  awards?: string[];
  knowsAbout?: string[];
  memberOf?: Array<{
    name: string;
    url?: string;
  }>;
  sameAs?: string[];
  image?: string;
}

export const PersonSchema: React.FC<PersonSchemaProps> = ({
  name,
  jobTitle,
  description,
  email,
  telephone,
  url,
  worksFor = {
    name: 'Disaster Recovery Brisbane',
    url: 'https://disasterrecovery.com.au'
  },
  alumniOf,
  awards,
  knowsAbout,
  memberOf,
  sameAs,
  image
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    ...(description && { "description": description }),
    ...(email && { "email": email }),
    ...(telephone && { "telephone": telephone }),
    ...(url && { "url": url }),
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image
      }
    }),
    "worksFor": {
      "@type": "Organization",
      "@id": "https://disasterrecovery.com.au/#organization",
      "name": worksFor.name,
      "url": worksFor.url
    },
    ...(alumniOf && alumniOf.length > 0 && {
      "alumniOf": alumniOf.map(org => ({
        "@type": "Organization",
        "name": org
      }))
    }),
    ...(awards && awards.length > 0 && { "award": awards }),
    ...(knowsAbout && knowsAbout.length > 0 && { "knowsAbout": knowsAbout }),
    ...(memberOf && memberOf.length > 0 && {
      "memberOf": memberOf.map(org => ({
        "@type": "Organization",
        "name": org.name,
        ...(org.url && { "url": org.url })
      }))
    }),
    ...(sameAs && sameAs.length > 0 && { "sameAs": sameAs }),
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "IICRC Master Restorer",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Institute of Inspection Cleaning and Restoration Certification"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "IICRC Water Damage Restoration Technician",
        "credentialCategory": "Professional Certification"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "IICRC Fire & Smoke Restoration Technician",
        "credentialCategory": "Professional Certification"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "IICRC Applied Microbial Remediation Technician",
        "credentialCategory": "Professional Certification"
      }
    ]
  };

  return (
    <Script
      id={`person-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

'use client';

import Script from 'next/script';

/**
 * COMPREHENSIVE E-E-A-T SCHEMA FOR DUAL POSITIONING
 *
 * POSITIONING STRATEGY:
 * 1. Disaster Recovery = LOCAL emergency services (Brisbane/Ipswich/Logan)
 * 2. NRPG (National Restoration Professionals Group) = Industry knowledge authority
 * 3. CARSI (Cleaning and Restoration Science Institute) = IICRC CEC training provider
 *
 * This schema establishes:
 * - Authority: Master Restorer + IICRC Instructor + NRPG Director
 * - Expertise: 20+ years experience + training provider
 * - Authoritativeness: Industry body membership + educational credentials
 * - Trustworthiness: Local service + contractor education
 */

const BASE_URL = 'https://disasterrecovery.com.au';

/**
 * LAYER 1: ORGANIZATION SCHEMAS
 */

// Main Organization: Disaster Recovery Australia
export const DisasterRecoveryOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EmergencyService', 'EducationalOrganization'],
  '@id': `${BASE_URL}/#organization`,
  name: 'Disaster Recovery Australia',
  legalName: 'Disaster Recovery Australia Pty Ltd',
  alternateName: 'DR Australia - NRPG Member',
  description: 'Brisbane Master Restorer-led disaster recovery service and IICRC training provider. Member of National Restoration Professionals Group (NRPG). Official CARSI training partner offering IICRC Continuing Education Credits.',

  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/images/logo.png`,
    width: 600,
    height: 60,
    caption: 'Disaster Recovery Australia Logo'
  },

  // Contact Information
  telephone: '+61-1300-309-361',
  email: 'emergency@disasterrecovery.com.au',

  // Physical Location
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4/17 Tile St',
    addressLocality: 'Wacol',
    addressRegion: 'QLD',
    postalCode: '4076',
    addressCountry: 'AU'
  },

  geo: {
    '@type': 'GeoCoordinates',
    latitude: -27.5976,
    longitude: 152.9323
  },

  // Service Areas
  areaServed: [
    {
      '@type': 'City',
      name: 'Brisbane',
      '@id': 'https://www.wikidata.org/wiki/Q34932'
    },
    {
      '@type': 'City',
      name: 'Ipswich',
      '@id': 'https://www.wikidata.org/wiki/Q866134'
    },
    {
      '@type': 'City',
      name: 'Logan',
      '@id': 'https://www.wikidata.org/wiki/Q1426271'
    }
  ],

  // 24/7 Availability
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59'
  },

  // Founder & Leadership
  founder: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#phill-mcgurk`,
    name: 'Phill McGurk',
    jobTitle: 'Master Restorer, NRPG Director, IICRC Approved Instructor'
  },

  // Organizational Memberships (KEY FOR E-E-A-T)
  memberOf: [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/nrpg#organization`,
      name: 'NRPG - National Restoration Professionals Group',
      description: 'Australia\'s leading restoration professionals network'
    },
    {
      '@type': 'Organization',
      name: 'IICRC',
      url: 'https://iicrc.org',
      description: 'Institute of Inspection, Cleaning and Restoration Certification'
    },
    {
      '@type': 'Organization',
      name: 'Restoration Industry Association of Australia',
      description: 'Peak industry body for restoration professionals'
    }
  ],

  // Educational Credentials
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'IICRC Approved Training Provider',
      credentialCategory: 'Educational Accreditation',
      recognizedBy: {
        '@type': 'Organization',
        name: 'IICRC',
        url: 'https://iicrc.org'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'CARSI Training Partner',
      credentialCategory: 'Educational Partnership',
      recognizedBy: {
        '@type': 'EducationalOrganization',
        '@id': `${BASE_URL}/carsi#organization`,
        name: 'Cleaning and Restoration Science Institute'
      }
    }
  ],

  // Multi-Audience Strategy (KEY FOR DUAL POSITIONING)
  audience: [
    {
      '@type': 'Audience',
      audienceType: 'Emergency Service Clients',
      name: 'Property Owners & Insurance Companies',
      description: 'Residential and commercial property owners requiring emergency disaster recovery'
    },
    {
      '@type': 'Audience',
      audienceType: 'Restoration Contractors',
      name: 'Restoration Professionals & Contractors',
      description: 'IICRC technicians seeking continuing education and industry knowledge'
    },
    {
      '@type': 'Audience',
      audienceType: 'IICRC Technicians',
      name: 'IICRC Certified Professionals',
      description: 'Certified technicians requiring CEC hours for certification maintenance'
    }
  ],

  // Service & Education Catalog
  hasOfferCatalog: [
    {
      '@type': 'OfferCatalog',
      name: 'Emergency Restoration Services',
      description: '24/7 emergency disaster recovery for Brisbane, Ipswich & Logan',
      itemListElement: [
        {
          '@type': 'Service',
          name: 'Water Damage Restoration',
          serviceType: 'Emergency Service',
          provider: { '@id': `${BASE_URL}/#organization` }
        },
        {
          '@type': 'Service',
          name: 'Fire Damage Restoration',
          serviceType: 'Emergency Service',
          provider: { '@id': `${BASE_URL}/#organization` }
        },
        {
          '@type': 'Service',
          name: 'Mould Remediation',
          serviceType: 'Professional Service',
          provider: { '@id': `${BASE_URL}/#organization` }
        }
      ]
    },
    {
      '@type': 'OfferCatalog',
      name: 'IICRC Training & CEC Courses',
      description: 'CARSI online training courses for IICRC continuing education',
      itemListElement: [
        {
          '@type': 'Course',
          name: 'Water Restoration Technician CEC Course',
          provider: { '@id': `${BASE_URL}/carsi#organization` }
        },
        {
          '@type': 'Course',
          name: 'Applied Structural Drying CEC Course',
          provider: { '@id': `${BASE_URL}/carsi#organization` }
        }
      ]
    }
  ],

  // Knowledge Areas (E-E-A-T Signals)
  knowsAbout: [
    'Disaster Recovery',
    'IICRC Standards',
    'ANSI/IICRC S500 Water Damage',
    'ANSI/IICRC S520 Mould Remediation',
    'ANSI/IICRC S800 Fire & Smoke',
    'Restoration Training',
    'Industry Best Practices',
    'Contractor Education',
    'Emergency Response Protocols'
  ],

  // Trust Signals
  slogan: 'Master Restorer Excellence - Training Industry Leaders',

  sameAs: [
    'https://www.facebook.com/DisasterRecoveryAustralia',
    'https://www.linkedin.com/company/disaster-recovery-australia',
    'https://www.youtube.com/@DisasterRecoveryAustralia'
  ]
};

// NRPG Organization Schema
export const NRPGOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}/nrpg#organization`,
  name: 'NRPG - National Restoration Professionals Group',
  alternateName: 'National Restoration Professionals Group',
  description: 'Australia\'s premier restoration professionals network providing industry standards, best practices, technical knowledge base, and contractor resources. Trusted source for restoration excellence.',

  url: `${BASE_URL}/nrpg`,

  serviceType: 'Professional Association',

  memberOf: {
    '@type': 'Organization',
    name: 'IICRC',
    url: 'https://iicrc.org'
  },

  // What NRPG Provides
  provides: [
    {
      '@type': 'Service',
      name: 'Industry Standards & Best Practices',
      description: 'Technical guidance and standardized procedures for restoration professionals'
    },
    {
      '@type': 'Service',
      name: 'Contractor Resources',
      description: 'Professional development resources, tools, and knowledge base'
    },
    {
      '@type': 'Service',
      name: 'Technical Knowledge Base',
      description: 'Comprehensive restoration techniques and methodologies documentation'
    }
  ],

  knowsAbout: [
    'Restoration Industry Standards',
    'IICRC Certification Requirements',
    'Professional Development',
    'Quality Assurance',
    'Technical Training',
    'Industry Compliance'
  ],

  founder: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#phill-mcgurk`,
    name: 'Phill McGurk'
  }
};

// CARSI Educational Organization Schema
export const CARSIOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${BASE_URL}/carsi#organization`,
  name: 'CARSI - Cleaning and Restoration Science Institute',
  alternateName: 'Cleaning and Restoration Science Institute',
  description: 'IICRC-approved online training provider offering Continuing Education Credits (CECs) for restoration professionals. Flexible online courses for IICRC certification maintenance.',

  url: `${BASE_URL}/carsi`,

  // IICRC Accreditation (CRITICAL FOR E-E-A-T)
  accreditedBy: {
    '@type': 'Organization',
    name: 'IICRC',
    url: 'https://iicrc.org',
    description: 'Institute of Inspection, Cleaning and Restoration Certification'
  },

  // Educational Programs
  offers: {
    '@type': 'EducationalOccupationalProgram',
    name: 'IICRC Continuing Education Credits (CECs)',
    description: 'Online courses providing IICRC CEC hours for certification maintenance',
    educationalCredentialAwarded: 'IICRC CEC Hours',

    programType: 'Online Professional Development',

    timeToComplete: 'Self-paced',

    offers: {
      '@type': 'Offer',
      category: 'Online Education',
      availability: 'https://schema.org/OnlineOnly'
    }
  },

  // Course Catalog
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IICRC CEC Course Catalog',
    itemListElement: [
      {
        '@type': 'Course',
        '@id': `${BASE_URL}/carsi/courses/wrt-cec`,
        name: 'Water Restoration Technician (WRT) CEC Course'
      },
      {
        '@type': 'Course',
        '@id': `${BASE_URL}/carsi/courses/asd-cec`,
        name: 'Applied Structural Drying (ASD) CEC Course'
      },
      {
        '@type': 'Course',
        '@id': `${BASE_URL}/carsi/courses/fsr-cec`,
        name: 'Fire & Smoke Restoration (FSR) CEC Course'
      },
      {
        '@type': 'Course',
        '@id': `${BASE_URL}/carsi/courses/amrt-cec`,
        name: 'Applied Microbial Remediation (AMRT) CEC Course'
      }
    ]
  },

  provider: {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Disaster Recovery Australia'
  },

  founder: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#phill-mcgurk`,
    name: 'Phill McGurk'
  },

  knowsAbout: [
    'IICRC Continuing Education',
    'Online Professional Training',
    'Restoration Certification Maintenance',
    'Technical Education'
  ]
};

/**
 * LAYER 2: ENHANCED PERSON SCHEMA (Phill McGurk)
 */
export const PhillMcGurkPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#phill-mcgurk`,

  name: 'Phill McGurk',

  jobTitle: 'Master Restorer, NRPG Director, IICRC Approved Instructor',

  description: 'One of a limited number of Master Restorers in Queensland with 20+ years experience. IICRC Approved Instructor, NRPG Director, and CARSI training provider. Expert in disaster recovery and restoration education.',

  url: `${BASE_URL}/about-phil-mcgurk`,

  image: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/images/phill-mcgurk-master-restorer.jpg`,
    caption: 'Phill McGurk - Master Restorer & IICRC Instructor'
  },

  // Professional Affiliations
  worksFor: {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Disaster Recovery Australia'
  },

  memberOf: [
    {
      '@type': 'Organization',
      name: 'IICRC',
      url: 'https://iicrc.org',
      description: 'Institute of Inspection, Cleaning and Restoration Certification'
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/nrpg#organization`,
      name: 'NRPG - National Restoration Professionals Group',
      role: 'Director'
    },
    {
      '@type': 'Organization',
      name: 'Restoration Industry Association of Australia'
    }
  ],

  // Professional Credentials (CRITICAL FOR E-E-A-T)
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'IICRC Master Water Restorer',
      credentialCategory: 'Master Certification',
      issuedBy: {
        '@type': 'Organization',
        name: 'IICRC'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'IICRC Master Fire & Smoke Restorer',
      credentialCategory: 'Master Certification',
      issuedBy: {
        '@type': 'Organization',
        name: 'IICRC'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'IICRC Approved Instructor',
      credentialCategory: 'Instructor Certification',
      issuedBy: {
        '@type': 'Organization',
        name: 'IICRC'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Water Restoration Technician (WRT)',
      issuedBy: {
        '@type': 'Organization',
        name: 'IICRC'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Applied Structural Drying (ASD)',
      issuedBy: {
        '@type': 'Organization',
        name: 'IICRC'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Fire & Smoke Restoration (FSR)',
      issuedBy: {
        '@type': 'Organization',
        name: 'IICRC'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Applied Microbial Remediation Technician (AMRT)',
      issuedBy: {
        '@type': 'Organization',
        name: 'IICRC'
      }
    }
  ],

  // Teaching Credentials (AUTHORITY SIGNAL)
  teaches: [
    'Water Damage Restoration',
    'Fire Damage Restoration',
    'Applied Structural Drying',
    'Mould Remediation',
    'IICRC Standards Compliance',
    'Industry Best Practices',
    'Emergency Response Protocols'
  ],

  // Subject Matter Expertise (EXPERTISE SIGNAL)
  knowsAbout: [
    'ANSI/IICRC S500 Standard',
    'ANSI/IICRC S520 Mould Remediation',
    'ANSI/IICRC S800 Fire & Smoke',
    'Disaster Recovery',
    'Structural Drying',
    'Thermal Imaging',
    'Moisture Detection',
    'Insurance Restoration',
    'Contractor Training',
    'Quality Assurance'
  ],

  // Professional Experience
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'IICRC'
  },

  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
    addressCountry: 'AU'
  },

  sameAs: [
    'https://www.linkedin.com/in/phill-mcgurk',
    'https://www.facebook.com/phillmcgurk'
  ]
};

/**
 * LAYER 3: COURSE SCHEMAS (CARSI Training)
 */

// Water Restoration Technician (WRT) CEC Course
export const WRTCECCourseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': `${BASE_URL}/carsi/courses/wrt-cec`,

  name: 'Water Restoration Technician (WRT) Continuing Education Credits',
  alternateName: 'WRT CEC Course',

  description: 'IICRC-approved online course providing Continuing Education Credits (CECs) for Water Restoration Technician certification maintenance. Covers ANSI/IICRC S500 standards, advanced water damage restoration techniques, and industry updates.',

  courseCode: 'CARSI-WRT-CEC',

  provider: {
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/carsi#organization`,
    name: 'CARSI - Cleaning and Restoration Science Institute'
  },

  instructor: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#phill-mcgurk`,
    name: 'Phill McGurk',
    jobTitle: 'IICRC Master Restorer & Approved Instructor'
  },

  educationalCredentialAwarded: '14 IICRC CEC Hours',

  coursePrerequisites: 'Current IICRC WRT certification',

  timeToComplete: 'P14H',

  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT14H'
  },

  availableLanguage: 'English',
  inLanguage: 'en-AU',

  accreditedBy: {
    '@type': 'Organization',
    name: 'IICRC',
    url: 'https://iicrc.org'
  },

  teaches: [
    'ANSI/IICRC S500 Standard Updates',
    'Advanced Water Damage Restoration',
    'Moisture Detection Technology',
    'Structural Drying Techniques',
    'Documentation Best Practices'
  ]
};

// Applied Structural Drying (ASD) CEC Course
export const ASDCECCourseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': `${BASE_URL}/carsi/courses/asd-cec`,

  name: 'Applied Structural Drying (ASD) Continuing Education Credits',
  alternateName: 'ASD CEC Course',

  description: 'IICRC-approved online course providing CECs for Applied Structural Drying certification maintenance. Advanced psychrometrics, drying chamber design, and monitoring protocols.',

  courseCode: 'CARSI-ASD-CEC',

  provider: {
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/carsi#organization`,
    name: 'CARSI'
  },

  instructor: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#phill-mcgurk`,
    name: 'Phill McGurk'
  },

  educationalCredentialAwarded: '14 IICRC CEC Hours',

  coursePrerequisites: 'Current IICRC ASD certification',

  timeToComplete: 'P14H',

  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT14H'
  },

  availableLanguage: 'English',
  inLanguage: 'en-AU',

  accreditedBy: {
    '@type': 'Organization',
    name: 'IICRC'
  }
};

// Fire & Smoke Restoration (FSR) CEC Course
export const FSRCECCourseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': `${BASE_URL}/carsi/courses/fsr-cec`,

  name: 'Fire & Smoke Restoration (FSR) Continuing Education Credits',
  alternateName: 'FSR CEC Course',

  description: 'IICRC-approved online course for Fire & Smoke Restoration certification maintenance. Covers ANSI/IICRC S800 standards, smoke damage assessment, and restoration techniques.',

  courseCode: 'CARSI-FSR-CEC',

  provider: {
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/carsi#organization`,
    name: 'CARSI'
  },

  instructor: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#phill-mcgurk`,
    name: 'Phill McGurk'
  },

  educationalCredentialAwarded: '14 IICRC CEC Hours',

  coursePrerequisites: 'Current IICRC FSR certification',

  timeToComplete: 'P14H',

  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT14H'
  },

  availableLanguage: 'English',
  inLanguage: 'en-AU',

  accreditedBy: {
    '@type': 'Organization',
    name: 'IICRC'
  }
};

// Applied Microbial Remediation (AMRT) CEC Course
export const AMRTCECCourseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': `${BASE_URL}/carsi/courses/amrt-cec`,

  name: 'Applied Microbial Remediation (AMRT) Continuing Education Credits',
  alternateName: 'Mould Remediation CEC Course',

  description: 'IICRC-approved online course for mould remediation certification maintenance. Covers ANSI/IICRC S520 standards, containment procedures, and safety protocols.',

  courseCode: 'CARSI-AMRT-CEC',

  provider: {
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/carsi#organization`,
    name: 'CARSI'
  },

  instructor: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#phill-mcgurk`,
    name: 'Phill McGurk'
  },

  educationalCredentialAwarded: '14 IICRC CEC Hours',

  coursePrerequisites: 'Current IICRC AMRT certification',

  timeToComplete: 'P14H',

  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT14H'
  },

  availableLanguage: 'English',
  inLanguage: 'en-AU',

  accreditedBy: {
    '@type': 'Organization',
    name: 'IICRC'
  }
};

// Contents Processing CEC Course
export const ContentsCECCourseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': `${BASE_URL}/carsi/courses/ccp-cec`,

  name: 'Contents Processing Continuing Education Credits',
  alternateName: 'Contents CEC Course',

  description: 'IICRC-approved online course for contents processing certification maintenance. Pack-out procedures, cleaning techniques, and inventory management.',

  courseCode: 'CARSI-CCP-CEC',

  provider: {
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/carsi#organization`,
    name: 'CARSI'
  },

  instructor: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#phill-mcgurk`,
    name: 'Phill McGurk'
  },

  educationalCredentialAwarded: '14 IICRC CEC Hours',

  coursePrerequisites: 'Current IICRC Contents Processing certification',

  timeToComplete: 'P14H',

  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT14H'
  },

  availableLanguage: 'English',
  inLanguage: 'en-AU',

  accreditedBy: {
    '@type': 'Organization',
    name: 'IICRC'
  }
};

/**
 * COMBINED SCHEMA COMPONENT
 * Use this component to render all schemas on appropriate pages
 */
interface EEATSchemaProps {
  pageType?: 'homepage' | 'about' | 'services' | 'nrpg' | 'carsi' | 'course';
  courseType?: 'wrt' | 'asd' | 'fsr' | 'amrt' | 'contents';
}

export const EEATDualPositioningSchema: React.FC<EEATSchemaProps> = ({
  pageType = 'homepage',
  courseType
}) => {
  // Build schema graph based on page type
  const buildSchemaGraph = () => {
    const baseSchemas = [
      DisasterRecoveryOrganizationSchema,
      PhillMcGurkPersonSchema
    ];

    switch (pageType) {
      case 'homepage':
        return [
          ...baseSchemas,
          NRPGOrganizationSchema,
          CARSIOrganizationSchema
        ];

      case 'about':
        return [
          ...baseSchemas,
          NRPGOrganizationSchema
        ];

      case 'services':
        return baseSchemas;

      case 'nrpg':
        return [
          NRPGOrganizationSchema,
          PhillMcGurkPersonSchema,
          DisasterRecoveryOrganizationSchema
        ];

      case 'carsi':
        return [
          CARSIOrganizationSchema,
          PhillMcGurkPersonSchema,
          WRTCECCourseSchema,
          ASDCECCourseSchema,
          FSRCECCourseSchema,
          AMRTCECCourseSchema,
          ContentsCECCourseSchema
        ];

      case 'course':
        const courseSchemas = {
          wrt: WRTCECCourseSchema,
          asd: ASDCECCourseSchema,
          fsr: FSRCECCourseSchema,
          amrt: AMRTCECCourseSchema,
          contents: ContentsCECCourseSchema
        };

        return [
          CARSIOrganizationSchema,
          PhillMcGurkPersonSchema,
          courseSchemas[courseType || 'wrt']
        ];

      default:
        return baseSchemas;
    }
  };

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': buildSchemaGraph()
  };

  return (
    <Script
      id="eeat-dual-positioning-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaGraph)
      }}
    />
  );
};

export default EEATDualPositioningSchema;

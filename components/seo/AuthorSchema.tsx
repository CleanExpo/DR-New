import Script from 'next/script';

interface AuthorSchemaProps {
  author: 'phill' | 'bronwyn' | 'team';
  articleTitle?: string;
  articleUrl?: string;
  datePublished?: string;
  dateModified?: string;
}

export default function AuthorSchema({
  author,
  articleTitle,
  articleUrl,
  datePublished,
  dateModified
}: AuthorSchemaProps) {
  const getAuthorData = () => {
    switch (author) {
      case 'phill':
        return {
          "@type": "Person",
          "name": "Phill McGurk",
          "jobTitle": "Co-Founder & Technical Director",
          "description": "Master Restorer and IICRC certified instructor with 25+ years of disaster restoration experience. Co-founder of the National Restoration Professionals Group (NRPG) and contributor to Australia's first ASQA-approved restoration training course.",
          "url": "https://disasterrecovery.com.au/about",
          "sameAs": [
            "https://disasterrecovery.com.au/team/phill-mcgurk"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Disaster Recovery",
            "url": "https://disasterrecovery.com.au"
          },
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Professional Certification",
              "name": "Master Restorer Qualification",
              "description": "Advanced disaster restoration specialist certification"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Professional Certification",
              "name": "IICRC Certified Instructor",
              "description": "Institute of Inspection Cleaning and Restoration Certification - Water Damage, Fire & Smoke, Mould Remediation, Biohazard"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Industry Leadership",
              "name": "NRPG Co-Founder",
              "description": "National Restoration Professionals Group - Industry education and standards"
            }
          ],
          "knowsAbout": [
            "Water Damage Restoration",
            "Fire Damage Restoration",
            "Mould Remediation",
            "Biohazard Cleaning",
            "Trauma Scene Restoration",
            "Storm Damage Recovery",
            "Insurance Restoration Processes",
            "IICRC Standards and Protocols",
            "Restoration Industry Education"
          ],
          "alumniOf": "IICRC Training Academy"
        };

      case 'bronwyn':
        return {
          "@type": "Person",
          "name": "Bronwyn McGurk",
          "jobTitle": "Co-Founder & Operations Director",
          "description": "Business operations and customer service expert with 14+ years managing disaster recovery operations. Specialises in emergency response coordination, insurance claims management, and customer experience excellence.",
          "url": "https://disasterrecovery.com.au/about",
          "sameAs": [
            "https://disasterrecovery.com.au/team/bronwyn-mcgurk"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Disaster Recovery",
            "url": "https://disasterrecovery.com.au"
          },
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Professional Certification",
              "name": "IICRC Certified - Operations Management",
              "description": "Disaster restoration operations and quality assurance"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Industry Experience",
              "name": "Emergency Response Coordinator",
              "description": "14+ years coordinating 24/7 disaster recovery operations"
            }
          ],
          "knowsAbout": [
            "Emergency Response Coordination",
            "Insurance Claims Management",
            "Customer Service Excellence",
            "Business Operations",
            "Quality Assurance",
            "Team Development",
            "Crisis Management"
          ]
        };

      case 'team':
      default:
        return {
          "@type": "Organization",
          "name": "Disaster Recovery Team",
          "description": "100% IICRC certified disaster restoration specialists with 25+ years combined experience serving Brisbane, Ipswich, and Logan.",
          "url": "https://disasterrecovery.com.au/about",
          "foundingDate": "2011-07",
          "founders": [
            {
              "@type": "Person",
              "name": "Phill McGurk",
              "jobTitle": "Co-Founder & Technical Director"
            },
            {
              "@type": "Person",
              "name": "Bronwyn McGurk",
              "jobTitle": "Co-Founder & Operations Director"
            }
          ],
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Team Certification",
              "name": "100% IICRC Certified Technicians",
              "description": "All technicians hold current IICRC certifications in relevant restoration disciplines"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Industry Membership",
              "name": "CARSI Member",
              "description": "Certified Australian Restoration Services Industry member in good standing"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Insurance",
              "name": "$20 Million Public Liability Insurance",
              "description": "Comprehensive insurance coverage for all restoration projects"
            }
          ]
        };
    }
  };

  const articleSchema = articleTitle && articleUrl ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleTitle,
    "url": articleUrl,
    "datePublished": datePublished || new Date().toISOString(),
    "dateModified": dateModified || datePublished || new Date().toISOString(),
    "author": getAuthorData(),
    "publisher": {
      "@type": "Organization",
      "name": "Disaster Recovery",
      "url": "https://disasterrecovery.com.au",
      "logo": {
        "@type": "ImageObject",
        "url": "https://disasterrecovery.com.au/images/logo.png"
      }
    }
  } : {
    "@context": "https://schema.org",
    ...getAuthorData()
  };

  return (
    <Script
      id={`author-schema-${author}-${Date.now()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleSchema, null, 2)
      }}
    />
  );
}

// WebPage & Website Schema - CRITICAL for site structure
import { FC } from 'react';

interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export const WebPageSchema: FC<WebPageSchemaProps> = ({
  title,
  description,
  url,
  dateModified = new Date().toISOString(),
  breadcrumbs = []
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dr-new-ten.vercel.app';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Disaster Recovery Qld",
        "description": "Queensland's Premier Disaster Recovery Service - Master Restorer Phill McGurk",
        "publisher": {
          "@id": `${siteUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/?s={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-AU"
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": title,
        "description": description,
        "isPartOf": {
          "@id": `${siteUrl}/#website`
        },
        "datePublished": "2024-01-01T00:00:00+10:00",
        "dateModified": dateModified,
        "inLanguage": "en-AU",
        "potentialAction": {
          "@type": "ReadAction",
          "target": [url]
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        }
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Disaster Recovery Qld",
        "alternateName": "Disaster Recovery Queensland",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#logo`,
          "url": `${siteUrl}/images/logo.png`,
          "contentUrl": `${siteUrl}/images/logo.png`,
          "caption": "Disaster Recovery Qld"
        },
        "image": { "@id": `${siteUrl}/#logo` },
        "sameAs": [
          "https://www.facebook.com/DisasterRecoveryQld",
          "https://www.linkedin.com/company/disaster-recovery-qld",
          "https://www.youtube.com/@DisasterRecoveryQld"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+61-1300-000-000",
          "contactType": "Emergency Service",
          "availableLanguage": "en-AU",
          "areaServed": ["Brisbane", "Ipswich", "Logan"],
          "contactOption": "TollFree"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default WebPageSchema;
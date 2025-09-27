import Head from 'next/head';
import { SOCIAL_MEDIA } from '@/lib/constants';

interface SocialMediaSEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

const SocialMediaSEO: React.FC<SocialMediaSEOProps> = ({
  title,
  description,
  url,
  image = 'https://dr-new-ten.vercel.app/images/disaster-recovery-og.jpg',
  imageAlt = 'Disaster Recovery Brisbane - Professional Emergency Restoration Services',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Phill McGurk - Master Restorer',
  section = 'Emergency Services',
  tags = ['disaster recovery', 'emergency response', 'water damage', 'fire damage', 'mould remediation', 'Brisbane'],
  twitterCard = 'summary_large_image'
}) => {
  const fullTitle = title.includes('Disaster Recovery') ? title : `${title} | Disaster Recovery Brisbane`;
  const canonicalUrl = url.startsWith('http') ? url : `https://dr-new-ten.vercel.app${url}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Disaster Recovery Brisbane" />
      <meta property="og:locale" content="en_AU" />

      {/* Open Graph Images */}
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />

      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@disasterrecoverybrisbane" />
      <meta name="twitter:creator" content="@disasterrecoverybrisbane" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Additional Social Meta */}
      <meta property="fb:app_id" content="123456789" />
      <meta name="pinterest-rich-pin" content="true" />

      {/* Structured Data for Social Media */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Disaster Recovery Brisbane",
            "url": "https://dr-new-ten.vercel.app",
            "logo": "https://dr-new-ten.vercel.app/logos/disaster-recovery-logo.png",
            "sameAs": [
              SOCIAL_MEDIA.facebook.url,
              SOCIAL_MEDIA.instagram.url,
              SOCIAL_MEDIA.linkedin.url,
              SOCIAL_MEDIA.youtube.url
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "0413965292",
              "contactType": "Emergency Service",
              "areaServed": "AU-QLD",
              "availableLanguage": "English",
              "hoursAvailable": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59"
            }
          })
        }}
      />

      {/* Keywords for Social Media Discovery */}
      <meta name="keywords" content={tags.join(', ')} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />

      {/* Social Media Verification */}
      <meta name="facebook-domain-verification" content="abcdef123456789" />
      <meta name="google-site-verification" content="google8f4d3e5a7b9c2d1e" />
    </Head>
  );
};

export default SocialMediaSEO;
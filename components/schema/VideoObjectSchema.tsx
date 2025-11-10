import Script from 'next/script';

interface VideoObjectSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
  transcript?: string;
}

export const VideoObjectSchema: React.FC<VideoObjectSchemaProps> = ({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  transcript
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    ...(duration && { duration }),
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    ...(transcript && { transcript })
  };

  return (
    <Script
      id="video-object-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

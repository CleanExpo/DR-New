import Script from 'next/script';

interface ImageObjectSchemaProps {
  contentUrl: string;
  name: string;
  description?: string;
  author?: {
    name: string;
    url?: string;
  };
  license?: string;
  acquireLicensePage?: string;
  creditText?: string;
}

export const ImageObjectSchema: React.FC<ImageObjectSchemaProps> = ({
  contentUrl,
  name,
  description,
  author,
  license,
  acquireLicensePage,
  creditText
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl,
    name,
    ...(description && { description }),
    ...(author && {
      "author": {
        "@type": "Person",
        "name": author.name,
        ...(author.url && { "url": author.url })
      }
    }),
    ...(license && { license }),
    ...(acquireLicensePage && { acquireLicensePage }),
    ...(creditText && { creditText })
  };

  return (
    <Script
      id="image-object-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

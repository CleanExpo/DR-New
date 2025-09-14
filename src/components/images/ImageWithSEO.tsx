'use client';

import { useEffect } from 'react';
import ResponsiveImage from './ResponsiveImage';

interface ImageWithSEOProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  fill?: boolean;
  itemprop?: string;
  schema?: {
    '@type': string;
    contentUrl?: string;
    caption?: string;
    description?: string;
    creator?: string;
    copyrightHolder?: string;
    license?: string;
  };
}

export default function ImageWithSEO({
  src,
  alt,
  title,
  caption,
  priority = false,
  className = '',
  width,
  height,
  loading = 'lazy',
  sizes,
  fill = false,
  itemprop,
  schema,
}: ImageWithSEOProps) {
  useEffect(() => {
    if (schema && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        ...schema,
        contentUrl: schema.contentUrl || src,
        caption: schema.caption || caption || alt,
        description: schema.description || alt,
      });
      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [schema, src, caption, alt]);

  return (
    <figure className={`relative ${className}`} itemProp={itemprop}>
      <ResponsiveImage
        src={src}
        alt={alt}
        title={title || alt}
        priority={priority}
        className="w-full h-auto"
        width={width}
        height={height}
        loading={loading}
        sizes={sizes}
        fill={fill}
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center" itemProp="caption">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
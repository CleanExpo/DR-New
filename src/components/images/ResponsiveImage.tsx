'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  title?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  fill?: boolean;
  style?: React.CSSProperties;
}

export default function ResponsiveImage({
  src,
  alt,
  title,
  priority = false,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px',
  width,
  height,
  loading = 'lazy',
  quality = 85,
  placeholder,
  blurDataURL,
  onLoad,
  fill = false,
  style,
}: ResponsiveImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && !fill && (
        <div
          className={`bg-gray-100 animate-pulse ${className}`}
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      <Image
        src={src}
        alt={alt}
        title={title || alt}
        priority={priority}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        sizes={sizes}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        loading={loading}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        style={style}
      />
    </>
  );
}
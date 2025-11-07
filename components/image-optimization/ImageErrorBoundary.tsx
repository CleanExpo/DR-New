'use client';

/**
 * Image Error Boundary and Fallback System
 * Handles image loading errors gracefully
 */

import React, { Component, ReactNode } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

interface ImageErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary specifically for images
 */
export class ImageErrorBoundary extends Component<
  ImageErrorBoundaryProps,
  ImageErrorBoundaryState
> {
  constructor(props: ImageErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ImageErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Image Error:', error, errorInfo);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ImageFallback />;
    }

    return this.props.children;
  }
}

/**
 * Default image fallback component
 */
export function ImageFallback({
  message = 'Image unavailable',
  className = '',
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        bg-gray-100 text-gray-400
        rounded-lg p-8
        ${className}
      `}
    >
      <ImageOff className="w-16 h-16 mb-2" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

/**
 * Image with automatic fallback
 */
export interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onError?: () => void;
}

export function ImageWithFallback({
  src,
  fallbackSrc = '/images/placeholder.jpg',
  alt,
  width,
  height,
  className = '',
  onError,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = React.useState(src);
  const [attempts, setAttempts] = React.useState(0);

  const handleError = () => {
    if (attempts === 0 && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setAttempts(1);
    } else {
      onError?.();
    }
  };

  React.useEffect(() => {
    setImgSrc(src);
    setAttempts(0);
  }, [src]);

  if (attempts > 0 && !fallbackSrc) {
    return <ImageFallback className={className} />;
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
}

/**
 * Hook for image error handling
 */
export function useImageError(src: string, fallbackSrc?: string) {
  const [currentSrc, setCurrentSrc] = React.useState(src);
  const [hasError, setHasError] = React.useState(false);

  const handleError = React.useCallback(() => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  }, [currentSrc, fallbackSrc]);

  const reset = React.useCallback(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  React.useEffect(() => {
    reset();
  }, [reset]);

  return {
    currentSrc,
    hasError,
    handleError,
    reset,
  };
}

export default ImageErrorBoundary;

/**
 * Image Optimization Components
 * Centralized exports for all image optimization utilities
 */

// Main components
export {
  OptimizedImage,
  HeroImage,
  CardImage,
  GalleryImage,
  IconImage,
  LogoImage,
  BackgroundImage,
  type OptimizedImageProps,
} from './OptimizedImage';

export {
  BeforeAfterSlider,
  BeforeAfterGallery,
  type BeforeAfterSliderProps,
  type BeforeAfterGalleryProps,
} from './BeforeAfterSlider';

export {
  LazyImage,
  ProgressiveImage,
  LazyImageGallery,
  type LazyImageProps,
  type ProgressiveImageProps,
  type LazyImageGalleryProps,
} from './LazyImage';

export {
  ImagePreloader,
  PreloadHeroImages,
  PreloadServiceImages,
  useImagePreloader,
  type PreloadImage,
  type ImagePreloaderProps,
} from './ImagePreloader';

export {
  ImageErrorBoundary,
  ImageFallback,
  ImageWithFallback,
  useImageError,
  type ImageWithFallbackProps,
} from './ImageErrorBoundary';

// Re-export configuration and utilities
export { IMAGE_CONFIG, ALT_TEXT_TEMPLATES, IMAGE_INVENTORY } from '@/lib/image-optimization/config';
export * from '@/lib/image-optimization/utils';

/**
 * Image Optimization Utility for Next.js
 * Provides utilities for optimizing images with WebP/AVIF support
 */

// Image loader for optimized formats
export const imageLoader = ({ src, width, quality = 85 }: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // Use CDN if available
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
  if (cdnUrl) {
    return `${cdnUrl}/${src}?w=${width}&q=${quality}`;
  }

  // Otherwise use Next.js image optimization API
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

// Generate responsive image sizes
export const generateImageSizes = (maxWidth: number = 1920) => {
  const sizes = [640, 768, 1024, 1280, 1536, 1920];
  return sizes.filter(size => size <= maxWidth);
};

// Generate srcSet for responsive images
export const generateSrcSet = (src: string, sizes: number[], quality = 85) => {
  return sizes
    .map(size => `${imageLoader({ src, width: size, quality })} ${size}w`)
    .join(', ');
};

// Blur data URL generator (placeholder while image loads)
export const generateBlurDataURL = async (src: string): Promise<string> => {
  // This is a placeholder - in production, generate actual blur data URLs
  // You would typically generate these during build time
  return 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFAqysmCCwB26HzHg8dgfUn1T6EyQyDoAAUASzbckA//Z';
};

// Image optimization config for different contexts
export const imageOptimizationConfig = {
  hero: {
    quality: 85,
    sizes: '100vw',
    priority: true,
    loading: 'eager' as const,
    formats: ['image/avif', 'image/webp', 'image/jpeg'],
  },
  thumbnail: {
    quality: 75,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    priority: false,
    loading: 'lazy' as const,
    formats: ['image/webp', 'image/jpeg'],
  },
  gallery: {
    quality: 80,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
    priority: false,
    loading: 'lazy' as const,
    formats: ['image/webp', 'image/jpeg'],
  },
  icon: {
    quality: 90,
    sizes: '64px',
    priority: false,
    loading: 'lazy' as const,
    formats: ['image/png', 'image/webp'],
  },
};

// Lazy loading with Intersection Observer
export const setupLazyLoading = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const images = document.querySelectorAll<HTMLImageElement>('img[data-src]');
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px 0px', // Start loading 50px before entering viewport
    }
  );

  images.forEach((img) => imageObserver.observe(img));
};

// Preload critical images
export const preloadCriticalImages = (imagePaths: string[]) => {
  if (typeof window === 'undefined') return;

  imagePaths.forEach((path) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    link.setAttribute('fetchpriority', 'high');

    // Add support for responsive images
    if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
      link.type = 'image/jpeg';
    } else if (path.endsWith('.webp')) {
      link.type = 'image/webp';
    } else if (path.endsWith('.avif')) {
      link.type = 'image/avif';
    }

    document.head.appendChild(link);
  });
};

// Image dimension calculator for aspect ratio
export const calculateAspectRatio = (width: number, height: number) => {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return {
    width: width / divisor,
    height: height / divisor,
    ratio: width / height,
  };
};

// Progressive image loading strategy
export class ProgressiveImageLoader {
  private queue: string[] = [];
  private loading = false;
  private batchSize = 2;

  addImage(src: string) {
    this.queue.push(src);
    this.processQueue();
  }

  private async processQueue() {
    if (this.loading || this.queue.length === 0) return;

    this.loading = true;
    const batch = this.queue.splice(0, this.batchSize);

    await Promise.all(
      batch.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          })
      )
    );

    this.loading = false;
    if (this.queue.length > 0) {
      this.processQueue();
    }
  }
}

// Resource hints for images
export const addResourceHints = (images: string[], type: 'prefetch' | 'preload' = 'prefetch') => {
  if (typeof window === 'undefined') return;

  images.forEach((image) => {
    const link = document.createElement('link');
    link.rel = type;
    link.as = 'image';
    link.href = image;

    if (type === 'preload') {
      link.setAttribute('fetchpriority', 'low');
    }

    document.head.appendChild(link);
  });
};

// Critical image detection
export const detectCriticalImages = () => {
  if (typeof window === 'undefined') return [];

  const viewport = {
    top: window.scrollY,
    bottom: window.scrollY + window.innerHeight,
  };

  const images = Array.from(document.querySelectorAll<HTMLImageElement>('img'));

  return images
    .filter((img) => {
      const rect = img.getBoundingClientRect();
      const imageTop = rect.top + window.scrollY;
      const imageBottom = imageTop + rect.height;

      // Image is in initial viewport
      return imageTop < viewport.bottom && imageBottom > viewport.top;
    })
    .map((img) => img.src);
};

// Export utility to optimize all images on page
export const optimizeAllImages = () => {
  if (typeof window === 'undefined') return;

  // Setup lazy loading for non-critical images
  setupLazyLoading();

  // Detect and preload critical images
  const criticalImages = detectCriticalImages();
  if (criticalImages.length > 0) {
    preloadCriticalImages(criticalImages);
  }

  // Add resource hints for other images
  const allImages = Array.from(document.querySelectorAll<HTMLImageElement>('img'))
    .map(img => img.dataset.src || img.src)
    .filter(src => !criticalImages.includes(src));

  if (allImages.length > 0) {
    // Prefetch first 5 non-critical images
    addResourceHints(allImages.slice(0, 5), 'prefetch');
  }
};
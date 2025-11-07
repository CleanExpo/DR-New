# Complete Image Optimization System

## Overview

This guide covers the comprehensive image optimization system implemented for the Disaster Recovery Brisbane website. The system ensures optimal performance, SEO, and user experience through automated image optimization.

## Features

### ✅ Implemented Optimizations

1. **Next.js Image Component Integration**
   - Automatic WebP/AVIF format conversion
   - Responsive image generation
   - Lazy loading with intersection observer
   - Blur placeholders for better UX
   - Automatic srcset generation

2. **SEO Optimization**
   - Descriptive alt tags with keywords
   - Proper width/height to prevent layout shift
   - Structured data for images
   - Optimized file names
   - Image sitemaps

3. **Performance Optimization**
   - WebP format (60-80% size reduction)
   - Responsive image variants
   - Progressive image loading
   - Image preloading for critical images
   - Lazy loading for below-fold images
   - Compression without quality loss

4. **Error Handling**
   - Automatic fallback images
   - Error boundaries
   - Graceful degradation
   - Missing image detection

5. **Developer Experience**
   - Easy-to-use components
   - Automatic optimization
   - Type-safe props
   - Comprehensive documentation

## Components

### `OptimizedImage`

Main image component with all optimizations built-in.

```tsx
import { OptimizedImage } from '@/components/image-optimization';

<OptimizedImage
  src="/images/services/water-damage-restoration.webp"
  alt="Emergency water damage restoration Brisbane - 24/7 response"
  width={800}
  height={600}
  priority={false}
  imageType="card"
/>
```

**Props:**
- `src`: Image source path
- `alt`: SEO-optimized alt text (required)
- `width`, `height`: Dimensions (prevents layout shift)
- `priority`: Load immediately (for above-fold images)
- `imageType`: Preset type (hero, card, thumbnail, icon, logo, gallery)
- `quality`: Image quality (1-100)
- `loading`: Loading strategy (lazy/eager)
- `placeholder`: Blur placeholder (blur/empty)
- `className`: CSS classes
- `fill`: Fill parent container
- `objectFit`: How image fits container

### Specialized Components

#### `HeroImage`
For hero/banner images (always priority, high quality)

```tsx
import { HeroImage } from '@/components/image-optimization';

<HeroImage
  src="/images/heroes/disaster-recovery-hero.webp"
  alt="24/7 Emergency Disaster Recovery Services Brisbane"
  fill
/>
```

#### `CardImage`
For card thumbnails

```tsx
import { CardImage } from '@/components/image-optimization';

<CardImage
  src="/images/services/fire-damage.webp"
  alt="Fire damage restoration services Brisbane"
  width={400}
  height={300}
/>
```

#### `BeforeAfterSlider`
Interactive before/after comparison

```tsx
import { BeforeAfterSlider } from '@/components/image-optimization';

<BeforeAfterSlider
  beforeImage={{
    src: "/images/before-water-damage.webp",
    alt: "Water damage before restoration"
  }}
  afterImage={{
    src: "/images/after-water-damage.webp",
    alt: "Professional water damage restoration results"
  }}
  title="Water Damage Restoration in Hamilton"
  description="Complete restoration in 3 days"
/>
```

#### `LazyImage`
Explicit lazy loading with intersection observer

```tsx
import { LazyImage } from '@/components/image-optimization';

<LazyImage
  src="/images/equipment/dehumidifier.webp"
  alt="Professional LGR dehumidifier for water damage"
  width={600}
  height={400}
  threshold={0.1}
  rootMargin="100px"
/>
```

#### `ImagePreloader`
Preload critical images

```tsx
import { ImagePreloader } from '@/components/image-optimization';

<ImagePreloader
  images={[
    { src: '/images/hero.webp', priority: 'high' },
    { src: '/images/logo.svg', priority: 'high' }
  ]}
  strategy="immediate"
/>
```

## Scripts

### 1. Image Audit

Audits all images and identifies issues:

```bash
npm run images:audit
```

**What it does:**
- Finds all image usages
- Checks for missing alt tags
- Detects missing width/height
- Identifies broken image links
- Reports large file sizes
- Suggests optimizations

**Output:**
- `image-audit-report.json` - Detailed JSON report
- `IMAGE_AUDIT_REPORT.md` - Human-readable report

### 2. WebP Conversion

Converts all JPG/PNG to WebP:

```bash
npm run images:convert
```

**Options:**
```bash
npm run images:convert -- --quality=85    # Set quality (default: 80)
npm run images:convert -- --overwrite     # Overwrite existing WebP files
npm run images:convert -- --responsive    # Generate responsive variants
```

**What it does:**
- Converts JPG/PNG to WebP
- Preserves original files
- Reports file size savings
- Creates responsive variants (optional)

**Output:**
- WebP versions of all images
- `webp-conversion-results.json` - Conversion statistics

### 3. Component Replacement

Replaces old image tags with optimized components:

```bash
npm run images:replace:dry     # Dry run (no changes)
npm run images:replace         # Apply changes
```

**What it does:**
- Replaces `<img>` with `<OptimizedImage>`
- Adds missing alt tags
- Adds width/height attributes
- Imports components automatically
- Updates Next.js Image to OptimizedImage

**Output:**
- Modified React files
- `image-replacement-report.json` - Replacement details

### 4. Master Optimization

Runs all optimizations in sequence:

```bash
npm run images:optimize:all
```

**What it does:**
1. Audits all images
2. Converts to WebP
3. Previews component replacements (dry run)
4. Asks for confirmation
5. Applies component replacements
6. Generates final report

**Options:**
```bash
npm run images:optimize audit      # Run only audit
npm run images:optimize convert    # Run only conversion
npm run images:optimize replace    # Run only replacement
```

## Image Organization

### Directory Structure

```
public/images/
├── heroes/              # Hero/banner images
│   ├── disaster-recovery-hero.webp
│   └── vehicles-fleet.webp
├── services/            # Service category images
│   ├── water-damage-restoration.webp
│   ├── fire-damage-restoration.webp
│   └── mould-remediation.webp
├── optimized/           # Optimized images
│   ├── damage/         # Damage photos
│   ├── equipment/      # Equipment photos
│   ├── process/        # Process photos
│   └── branding/       # Logos and branding
├── logos/              # Company logos
│   ├── dr-logo.svg
│   └── dr-logo-white.svg
├── icons/              # Icons and small images
├── places/             # Location images
└── team/               # Team member photos
```

### Naming Conventions

- Use lowercase with hyphens
- Be descriptive and SEO-friendly
- Include location keywords where relevant
- Examples:
  - ✅ `water-damage-restoration-brisbane.webp`
  - ✅ `emergency-response-vehicle-fleet.webp`
  - ❌ `IMG_1234.jpg`
  - ❌ `photo1.png`

## Alt Text Templates

The system includes SEO-optimized alt text templates:

```typescript
import { ALT_TEXT_TEMPLATES } from '@/lib/image-optimization/config';

// For water damage in Brisbane
ALT_TEXT_TEMPLATES.waterDamage('Brisbane')
// → "Emergency water damage restoration services in Brisbane - 24/7 Brisbane response"

// For fire damage in Ipswich
ALT_TEXT_TEMPLATES.fireDamage('Ipswich')
// → "Professional fire damage restoration in Ipswich - Certified Master Restorer"
```

## Configuration

### Image Quality Settings

Located in `lib/image-optimization/config.ts`:

```typescript
quality: {
  hero: 85,        // Hero images (high quality)
  thumbnail: 75,   // Thumbnails
  icon: 90,        // Icons and logos
  gallery: 80,     // Gallery images
  background: 70,  // Background images
  default: 75,     // Default quality
}
```

### Responsive Breakpoints

```typescript
breakpoints: {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1920,
  ultrawide: 2560,
}
```

### Cache Settings

```typescript
cache: {
  ttl: 31536000,              // 1 year
  staleWhileRevalidate: 86400, // 1 day
}
```

## Best Practices

### 1. Always Use OptimizedImage

❌ **Don't:**
```tsx
<img src="/images/photo.jpg" alt="Photo" />
```

✅ **Do:**
```tsx
<OptimizedImage
  src="/images/photo.webp"
  alt="Descriptive alt text with keywords"
  width={800}
  height={600}
/>
```

### 2. Use Appropriate Image Types

```tsx
// Hero images
<HeroImage src="..." alt="..." fill priority />

// Service cards
<CardImage src="..." alt="..." width={400} height={300} />

// Gallery images
<GalleryImage src="..." alt="..." width={800} height={600} />

// Logos
<LogoImage src="..." alt="..." width={200} height={80} />
```

### 3. Optimize Alt Text for SEO

Include:
- Service type
- Location
- Certification/credential
- Emergency/24-7 where relevant

Example:
```tsx
alt="Emergency water damage restoration Brisbane - Master Restorer certified"
```

### 4. Set Priority for Above-Fold Images

```tsx
// First 3 images on page
<OptimizedImage priority={true} ... />

// Below-fold images
<OptimizedImage priority={false} ... />
```

### 5. Use WebP Format

Always use `.webp` for photos (JPG/PNG):
```tsx
// ✅ Good
src="/images/service.webp"

// ❌ Avoid
src="/images/service.jpg"
```

Use SVG for logos and icons:
```tsx
src="/images/logo.svg"
```

### 6. Provide Dimensions

Always include width and height (or use `fill`):

```tsx
// ✅ With dimensions
<OptimizedImage width={800} height={600} ... />

// ✅ Or use fill
<OptimizedImage fill ... />

// ❌ Missing dimensions causes layout shift
<OptimizedImage src="..." alt="..." />
```

### 7. Use Before/After Sliders

For restoration work showcases:

```tsx
<BeforeAfterSlider
  beforeImage={{ src: "...", alt: "..." }}
  afterImage={{ src: "...", alt: "..." }}
  title="Hamilton Flood Restoration"
  description="Complete restoration in 48 hours"
  showLabels={true}
/>
```

## Performance Metrics

Expected improvements after optimization:

- **Page Load Time:** 40-60% faster
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Image File Sizes:** 60-80% reduction
- **Lighthouse Score:** 95-100

## Troubleshooting

### Images Not Loading

1. Check file path is correct
2. Verify file exists in `public/images/`
3. Check console for errors
4. Ensure Next.js Image domains are configured

### Layout Shift Issues

1. Always provide width/height
2. Use `fill` for containers
3. Set `sizes` attribute correctly
4. Use blur placeholder

### Slow Loading

1. Ensure WebP format is used
2. Check image is not too large
3. Verify lazy loading is enabled
4. Use responsive image variants

### Alt Text Warnings

1. Always include alt attribute
2. Make it descriptive
3. Include keywords
4. Keep under 125 characters

## Maintenance

### Regular Tasks

1. **Weekly:**
   - Run image audit
   - Check for broken images
   - Review new image additions

2. **Monthly:**
   - Analyze image performance
   - Update alt text for SEO
   - Remove unused images

3. **Quarterly:**
   - Full optimization pass
   - Update image quality settings
   - Review Core Web Vitals

### Adding New Images

1. Add image to appropriate folder in `public/images/`
2. Convert to WebP:
   ```bash
   npm run images:convert
   ```
3. Use OptimizedImage component
4. Include descriptive alt text
5. Test on mobile and desktop
6. Run Lighthouse audit

## Next.js Configuration

The image optimization system requires proper Next.js configuration:

```javascript
// next.config.js
module.exports = {
  images: {
    domains: [
      'dr-new-ten.vercel.app',
      'images.unsplash.com'
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  }
}
```

## SEO Impact

Proper image optimization provides:

1. **Better Rankings:**
   - Faster page speed (ranking factor)
   - Better mobile experience
   - Improved Core Web Vitals

2. **Image Search:**
   - Descriptive alt text
   - Structured data
   - Proper file names
   - Fast loading

3. **User Experience:**
   - Faster loading
   - No layout shift
   - Responsive images
   - Progressive enhancement

## Support

For issues or questions:

1. Check this guide first
2. Review generated reports
3. Check console errors
4. Review Next.js Image documentation
5. Test with Lighthouse

## Changelog

### v1.0.0 (2025-01-07)
- Initial implementation
- Complete optimization system
- All components created
- Scripts for automation
- Documentation complete

---

**Last Updated:** January 7, 2025
**Maintained By:** Disaster Recovery Brisbane Development Team

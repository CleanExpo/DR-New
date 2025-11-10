# Image Optimization - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

If not already done:

```bash
npm install
```

### Step 2: Run Complete Audit

See what needs to be fixed:

```bash
npm run images:audit
```

This generates:
- `image-audit-report.json` - Detailed report
- `IMAGE_AUDIT_REPORT.md` - Summary

### Step 3: Convert Images to WebP

Convert all JPG/PNG to WebP (preserves originals):

```bash
npm run images:convert
```

For higher quality:

```bash
npm run images:convert:quality
```

### Step 4: Preview Component Replacements

See what will change (doesn't modify files):

```bash
npm run images:replace:dry
```

### Step 5: Apply Component Replacements

Replace old image tags with optimized components:

```bash
npm run images:replace
```

### Step 6: Test Your Site

```bash
npm run dev
```

Visit http://localhost:3000 and verify images load correctly.

### Step 7: Run Lighthouse Audit

Check improvements:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Check Core Web Vitals scores

---

## 🎯 One Command Full Optimization

Run everything automatically:

```bash
npm run images:optimize:all
```

This will:
1. Audit all images
2. Convert to WebP
3. Preview replacements (dry run)
4. Ask for confirmation
5. Apply replacements
6. Generate final report

---

## 📝 Using in Your Code

### Basic Usage

```tsx
import { OptimizedImage } from '@/components/image-optimization';

export default function MyComponent() {
  return (
    <OptimizedImage
      src="/images/services/water-damage-restoration.webp"
      alt="Emergency water damage restoration Brisbane - 24/7 response"
      width={800}
      height={600}
    />
  );
}
```

### Hero Image

```tsx
import { HeroImage } from '@/components/image-optimization';

export default function Hero() {
  return (
    <div className="relative h-[600px]">
      <HeroImage
        src="/images/heroes/disaster-recovery-hero.webp"
        alt="24/7 Emergency Disaster Recovery Services Brisbane"
        fill
      />
      <div className="relative z-10">
        <h1>Your Content Here</h1>
      </div>
    </div>
  );
}
```

### Before/After Slider

```tsx
import { BeforeAfterSlider } from '@/components/image-optimization';

export default function Portfolio() {
  return (
    <BeforeAfterSlider
      beforeImage={{
        src: "/images/before/water-damage.webp",
        alt: "Water damaged property before restoration"
      }}
      afterImage={{
        src: "/images/after/water-damage.webp",
        alt: "Property after professional water damage restoration"
      }}
      title="Hamilton Water Damage Restoration"
      description="Complete restoration completed in 3 days"
    />
  );
}
```

### Gallery with Lazy Loading

```tsx
import { LazyImage } from '@/components/image-optimization';

export default function Gallery() {
  const images = [
    { src: '/images/gallery/1.webp', alt: 'Service 1' },
    { src: '/images/gallery/2.webp', alt: 'Service 2' },
    { src: '/images/gallery/3.webp', alt: 'Service 3' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((img, i) => (
        <LazyImage
          key={i}
          src={img.src}
          alt={img.alt}
          width={400}
          height={300}
        />
      ))}
    </div>
  );
}
```

---

## 🎨 Image Types

Use the right component for each use case:

| Component | Use Case | Priority | Example |
|-----------|----------|----------|---------|
| `HeroImage` | Hero banners | High | Homepage hero |
| `CardImage` | Service cards | Normal | Service thumbnails |
| `GalleryImage` | Photo galleries | Normal | Portfolio |
| `IconImage` | Icons, badges | High | Certification badges |
| `LogoImage` | Company logos | High | Header logo |
| `LazyImage` | Below-fold images | Low | Footer images |

---

## 📊 Performance Targets

After optimization, expect:

- ✅ LCP < 2.5s
- ✅ CLS < 0.1
- ✅ Lighthouse Score > 95
- ✅ 60-80% file size reduction
- ✅ 40-60% faster page loads

---

## 🐛 Common Issues

### Image Not Loading

```tsx
// ❌ Wrong
<OptimizedImage src="images/photo.webp" ... />

// ✅ Correct (must start with /)
<OptimizedImage src="/images/photo.webp" ... />
```

### Layout Shift

```tsx
// ❌ Wrong (no dimensions)
<OptimizedImage src="/images/photo.webp" alt="..." />

// ✅ Correct (with dimensions)
<OptimizedImage
  src="/images/photo.webp"
  alt="..."
  width={800}
  height={600}
/>

// ✅ Or use fill
<OptimizedImage src="/images/photo.webp" alt="..." fill />
```

### Missing Alt Text

```tsx
// ❌ Wrong
<OptimizedImage src="/images/photo.webp" width={800} height={600} />

// ✅ Correct
<OptimizedImage
  src="/images/photo.webp"
  alt="Emergency water damage restoration Brisbane - 24/7 response"
  width={800}
  height={600}
/>
```

---

## 📚 More Information

- Full guide: `IMAGE_OPTIMIZATION_GUIDE.md`
- Configuration: `lib/image-optimization/config.ts`
- Components: `components/image-optimization/`

---

## 🎉 Quick Wins Checklist

- [ ] Run audit: `npm run images:audit`
- [ ] Convert to WebP: `npm run images:convert`
- [ ] Replace components: `npm run images:replace`
- [ ] Test site: `npm run dev`
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Commit changes
- [ ] Deploy to production

---

**Time to complete:** 10-15 minutes
**Impact:** Massive performance improvement
**Difficulty:** Easy (mostly automated)

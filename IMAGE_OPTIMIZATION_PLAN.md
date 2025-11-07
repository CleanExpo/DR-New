# WebP Conversion and Image Compression Plan

## Executive Summary

**Current Status:**
- 142 images > 100KB totaling 265 MB
- 0 images currently have WebP variants
- Estimated savings: **79.5 MB (30%)** with WebP conversion

**Total Images Directory Size:** 271.7 MB (all images)

---

## Phase 1: WebP Conversion

### Priority 1: High-Impact Categories (181.67 MB, 68% of total)

#### 1. Places Directory (17 files, 90.5 MB)
**Impact:** Highest - These are the largest individual files

Top files:
- `3d-mega-mall.png` - 7.40 MB → ~5.18 MB WebP (30% savings)
- `3d-close-living-residential.png` - 7.21 MB → ~5.05 MB WebP
- `3d-university.png` - 6.96 MB → ~4.87 MB WebP
- `3d-complex-claims.png` - 6.90 MB → ~4.83 MB WebP
- `3d-care-facilities.png` - 6.45 MB → ~4.52 MB WebP

**Estimated savings: 27.15 MB**

#### 2. Optimized Directory (50 files, 91.17 MB)
**Impact:** High - Most files in one category

Includes equipment and damage images:
- Equipment PNGs: `3d-thermal-fogging.png`, `3d-moisture-meter.png`, etc.
- Damage PNGs: `3d-mould-on-ceiling.png` (4.53 MB), `3d-water-damage-mould-on-ceiling.png` (3.32 MB)

**Estimated savings: 27.35 MB**

#### 3. Optimised Directory (21 files, 39.78 MB)
**Note:** Duplicate of "optimized" with British spelling

**Estimated savings: 11.93 MB**

### Priority 2: Branding Assets (23.88 MB, 9% of total)

#### 4. Logos Directory (10 files, 20.32 MB)
**Impact:** Medium - Social media and branding assets

Critical files:
- `3d-instagram.png` - 3.49 MB → ~2.44 MB WebP
- `3d-linkedin.png` - 3.34 MB → ~2.34 MB WebP
- `3d-youtube.png` - 3.26 MB → ~2.28 MB WebP
- `3d-facebook.png` - 2.89 MB → ~2.02 MB WebP
- `Gemini_Generated_Image_*.png` - 3.83 MB (can likely be deleted)

**Estimated savings: 6.10 MB**

#### 5. Icons Directory (4 files, 3.17 MB)
Small but impactful:
- `structural-weakness.png` - 1.5 MB
- `biohazard-sewage-cleanup.png` - 746 KB
- `timber-floor-drying.png` - 543 KB
- `inspections.png` - 510 KB

**Estimated savings: 0.95 MB**

### Priority 3: Page Assets (5.65 MB, 2% of total)

#### 6. Hero Directory (7 files, 2.71 MB)
**Impact:** Critical - First page load images

Files:
- `biohazard-remediation-services.png` - 880 KB
- `sewage-remediation-services.png` - 640 KB
- `fire-smoke-damage-restoration.jpg` - 283 KB
- `disaster-recovery-services.jpg` - 282 KB
- `fire-water-damage-restoration.jpg` - 243 KB
- `mould-remediation-services.jpg` - 226 KB
- `commercial-restoration-services.jpg` - 219 KB

**Estimated savings: 0.81 MB**

#### 7. Suburbs Directory (7 files, 2.94 MB)
Service area images

**Estimated savings: 0.88 MB**

---

## Conversion Commands

### Option 1: Use Existing TypeScript Script (RECOMMENDED)

The project already has `scripts/convert-to-webp.ts` with Sharp support.

**Step 1: Install Sharp (if not already installed)**
```bash
npm install --save-dev sharp
```

**Step 2: Convert Priority Categories**
```bash
# Convert high-priority categories only (recommended first step)
npm run images:convert
# OR
npx tsx scripts/convert-to-webp.ts

# Convert with custom quality
npm run images:convert:quality
# OR
npx tsx scripts/convert-to-webp.ts --quality=85

# Convert ALL images
npx tsx scripts/convert-to-webp.ts --all
```

### Option 2: Use New JavaScript Script

I've created `convert-images-to-webp.js` for easier execution:

```bash
# Convert priority categories (places, optimized, logos, hero)
node convert-images-to-webp.js

# Convert specific category
node convert-images-to-webp.js --category=places
node convert-images-to-webp.js --category=logos
node convert-images-to-webp.js --category=hero

# Convert ALL images
node convert-images-to-webp.js --all
```

### Option 3: Manual Conversion with Sharp

For individual files or testing:

```javascript
const sharp = require('sharp');

// Single file conversion
await sharp('public/images/hero/fire-water-damage-restoration.jpg')
  .webp({ quality: 85, effort: 6 })
  .toFile('public/images/hero/fire-water-damage-restoration.webp');
```

---

## Phase 2: Update Image References

After WebP conversion, update components to use WebP with fallbacks:

### For Next.js Image Component

```tsx
import Image from 'next/image';

// Next.js automatically serves WebP if available
<Image
  src="/images/hero/fire-water-damage-restoration.jpg"
  alt="Fire and water damage restoration"
  width={1920}
  height={1080}
  priority
/>
```

### For HTML Picture Element

```html
<picture>
  <source
    srcset="/images/hero/fire-water-damage-restoration.webp"
    type="image/webp"
  />
  <source
    srcset="/images/hero/fire-water-damage-restoration.jpg"
    type="image/jpeg"
  />
  <img
    src="/images/hero/fire-water-damage-restoration.jpg"
    alt="Fire and water damage restoration"
  />
</picture>
```

---

## Phase 3: Additional Optimizations

### PNG Compression (Optional)

For PNGs that must stay as PNG (logos with transparency, etc.):

**Using ImageMagick:**
```bash
magick public/images/logos/3d-carsi-logo.png -quality 85 -define png:compression-level=9 public/images/logos/3d-carsi-logo-optimized.png
```

**Using pngquant (8-bit reduction):**
```bash
pngquant --quality=65-80 public/images/logos/*.png --ext=-optimized.png
```

### JPEG Compression (Optional)

For JPEGs that don't convert to WebP:

**Using ImageMagick:**
```bash
magick public/images/hero/*.jpg -quality 85 -sampling-factor 4:2:0 -strip public/images/hero/*-optimized.jpg
```

**Using mozjpeg:**
```bash
cjpeg -quality 85 -progressive -outfile output.jpg input.jpg
```

---

## Expected Results

### By Priority Level

| Priority | Categories | Files | Current Size | WebP Size | Savings |
|----------|-----------|-------|--------------|-----------|---------|
| 1        | places, optimized, optimised | 88 | 221.45 MB | 155.02 MB | 66.43 MB (30%) |
| 2        | logos, icons | 14 | 23.49 MB | 16.44 MB | 7.05 MB (30%) |
| 3        | hero, suburbs | 14 | 5.65 MB | 3.96 MB | 1.69 MB (30%) |
| **Total** | **All** | **142** | **265.00 MB** | **185.50 MB** | **79.50 MB (30%)** |

### File-by-File Top 20 Savings

| # | File | Current | WebP | Savings |
|---|------|---------|------|---------|
| 1 | places/3d-mega-mall.png | 7.40 MB | 5.18 MB | 2.22 MB |
| 2 | places/3d-close-living-residential.png | 7.21 MB | 5.05 MB | 2.16 MB |
| 3 | places/3d-university.png | 6.96 MB | 4.87 MB | 2.09 MB |
| 4 | places/3d-complex-claims.png | 6.90 MB | 4.83 MB | 2.07 MB |
| 5 | places/3d-care-facilities.png | 6.45 MB | 4.52 MB | 1.93 MB |
| 6 | places/3d-specialised-claims.png | 6.13 MB | 4.29 MB | 1.84 MB |
| 7 | places/3d-government-buildings.png | 6.12 MB | 4.28 MB | 1.84 MB |
| 8 | places/3d-family-home.png | 6.09 MB | 4.26 MB | 1.83 MB |
| 9 | places/3d-schools.png | 6.02 MB | 4.21 MB | 1.81 MB |
| 10 | places/3d-residential.png | 5.96 MB | 4.17 MB | 1.79 MB |
| 11 | places/3d-small-business-industrial.png | 5.85 MB | 4.10 MB | 1.75 MB |
| 12 | places/3d-art-museums.png | 5.39 MB | 3.77 MB | 1.62 MB |
| 13 | places/3d-facility-management.png | 5.32 MB | 3.72 MB | 1.60 MB |
| 14 | optimised/damage/3d-mould-damage.png | 4.53 MB | 3.17 MB | 1.36 MB |
| 15 | optimized/damage/3d-mould-on-ceiling.png | 4.53 MB | 3.17 MB | 1.36 MB |
| 16 | optimized/thumbnails/3d-mould-spores.png | 4.41 MB | 3.09 MB | 1.32 MB |
| 17 | logos/Gemini_Generated_Image.png | 3.83 MB | 2.68 MB | 1.15 MB |
| 18 | logos/3d-instagram.png | 3.49 MB | 2.44 MB | 1.05 MB |
| 19 | logos/3d-linkedin.png | 3.34 MB | 2.34 MB | 1.00 MB |
| 20 | optimized/damage/3d-water-damage-mould-on-ceiling.png | 3.32 MB | 2.32 MB | 1.00 MB |

**Top 20 Total: 30.79 MB savings**

---

## Performance Impact

### Page Load Improvements

**Hero Images (Critical Path):**
- Before: 2.71 MB
- After: 1.90 MB
- **Improvement: 0.81 MB faster first paint**

**Full Homepage (all above-fold images):**
- Estimated 5-8 MB of images on initial load
- After WebP: 3.5-5.6 MB
- **Improvement: 2-3 MB reduction on first page load**

### Core Web Vitals Impact

- **LCP (Largest Contentful Paint):** Hero images load 30% faster
- **CLS (Cumulative Layout Shift):** No change (dimensions preserved)
- **FCP (First Contentful Paint):** Improved by 0.5-1 second on slow connections

---

## Recommended Execution Order

### Step 1: Test Conversion (5 minutes)
```bash
# Install Sharp
npm install --save-dev sharp

# Test with one category
node convert-images-to-webp.js --category=hero
```

### Step 2: Convert Priority 1 (30-60 minutes)
```bash
# Convert places directory (highest impact)
node convert-images-to-webp.js --category=places

# Convert optimized directory
node convert-images-to-webp.js --category=optimized
```

### Step 3: Convert Remaining (30 minutes)
```bash
# Convert all remaining
node convert-images-to-webp.js --all
```

### Step 4: Verify Results
```bash
# Check conversion results
cat webp-conversion-results.json

# Verify file sizes
node analyze-images.js
```

### Step 5: Update Image Components (Optional)
Use `scripts/replace-image-components.ts` if needed:
```bash
# Dry run
npm run images:replace:dry

# Execute
npm run images:replace
```

---

## Maintenance

### For New Images

Add to your workflow:

```bash
# After adding new images
npm run images:convert

# Or automatically via git hook
echo "npm run images:convert" >> .husky/pre-commit
```

### Monitoring

Track image sizes:
```bash
# Run analysis
node analyze-images.js

# Check for images without WebP variants
# (Images >100KB without .webp file)
```

---

## Cleanup Tasks

### Optional: Remove Duplicate Directories

You have both `optimized` and `optimised` directories:

```bash
# After verifying, remove one (British spelling version)
# WARNING: Check references first!
rm -rf public/images/optimised
```

### Optional: Remove Unused Images

- `logos/Gemini_Generated_Image_*.png` - 3.83 MB (appears to be unused)
- Verify all `places/*.png` are actually used in the site

---

## Support Scripts Available

1. **analyze-images.js** - Analyze current image sizes and categories
2. **convert-images-to-webp.js** - Convert images to WebP
3. **scripts/convert-to-webp.ts** - Original TypeScript converter
4. **scripts/optimize-all-images.ts** - Full optimization suite

---

## Notes

- **Originals Preserved:** WebP conversion creates new files, originals remain
- **Browser Support:** WebP supported in all modern browsers (95%+ coverage)
- **Fallbacks:** Use `<picture>` element or Next.js Image for automatic fallbacks
- **Quality Setting:** 85% quality provides best balance (30% savings, imperceptible quality loss)
- **Next.js:** Automatically serves WebP to supporting browsers when both formats exist

---

## Questions?

- Conversion failing? Check Sharp installation: `npm list sharp`
- Need different quality? Use `--quality=90` flag
- Specific category? Use `--category=places`
- Already have WebP? Script skips existing files by default

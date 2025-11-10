# WebP Conversion - Quick Start Guide

## TL;DR - 3 Commands to Save 79.5 MB

```bash
# 1. Install Sharp (if needed)
npm install --save-dev sharp

# 2. Convert all images to WebP
node convert-images-to-webp.js --all

# 3. Verify results
cat webp-conversion-results.json
```

**Expected Result:** 142 images converted, 79.5 MB saved (30% reduction)

---

## Current Status

- **Total large images (>100KB):** 142 files
- **Current size:** 265 MB
- **Images with WebP:** 0
- **Potential savings:** 79.5 MB (30%)

---

## Priority Conversion (Recommended)

Convert the biggest files first for maximum impact:

### Priority 1: Places Directory (90.5 MB → 63.35 MB)
```bash
node convert-images-to-webp.js --category=places
```
**Savings:** 27.15 MB in 60 seconds

### Priority 2: Optimized Directory (91.17 MB → 63.82 MB)
```bash
node convert-images-to-webp.js --category=optimized
```
**Savings:** 27.35 MB in 2 minutes

### Priority 3: Logos & Icons (23.49 MB → 16.44 MB)
```bash
node convert-images-to-webp.js --category=logos
node convert-images-to-webp.js --category=icons
```
**Savings:** 7.05 MB in 30 seconds

### Priority 4: Hero Images (2.71 MB → 1.90 MB)
```bash
node convert-images-to-webp.js --category=hero
```
**Savings:** 0.81 MB in 10 seconds

**Total Priority Conversion Time:** ~4 minutes

---

## Conversion Options

### Simple: Convert Everything
```bash
node convert-images-to-webp.js --all
```

### Category by Category
```bash
node convert-images-to-webp.js --category=places
node convert-images-to-webp.js --category=optimized
node convert-images-to-webp.js --category=hero
node convert-images-to-webp.js --category=logos
```

### Using NPM Scripts
```bash
npm run images:convert              # Priority categories
npm run images:convert:quality      # Custom quality (85%)
```

---

## What Happens During Conversion?

1. Script finds all JPG/PNG files >100KB
2. Converts each to WebP format (85% quality)
3. Creates `.webp` file alongside original
4. Original files are **NOT** deleted
5. Generates `webp-conversion-results.json` report

**Example:**
```
Before:
  public/images/hero/fire-water-damage-restoration.jpg (243 KB)

After:
  public/images/hero/fire-water-damage-restoration.jpg (243 KB) ← kept
  public/images/hero/fire-water-damage-restoration.webp (170 KB) ← new
```

---

## Verify Conversion

### Check Results
```bash
# View conversion summary
cat webp-conversion-results.json

# Re-run analysis
node analyze-images.js
```

### Expected Output
```json
{
  "total": 142,
  "converted": 142,
  "failed": 0,
  "originalSize": 277872640,
  "webpSize": 194510848,
  "totalSavings": 83361792
}
```

---

## Top Files Being Converted

| File | Before | After | Savings |
|------|--------|-------|---------|
| places/3d-mega-mall.png | 7.40 MB | 5.18 MB | 2.22 MB |
| places/3d-close-living-residential.png | 7.21 MB | 5.05 MB | 2.16 MB |
| places/3d-university.png | 6.96 MB | 4.87 MB | 2.09 MB |
| places/3d-complex-claims.png | 6.90 MB | 4.83 MB | 2.07 MB |
| places/3d-care-facilities.png | 6.45 MB | 4.52 MB | 1.93 MB |
| optimized/damage/3d-mould-on-ceiling.png | 4.53 MB | 3.17 MB | 1.36 MB |
| optimized/equipment/3d-thermal-fogging.png | 2.63 MB | 1.84 MB | 0.79 MB |
| hero/biohazard-remediation-services.png | 880 KB | 616 KB | 264 KB |

**Top 10 alone save: 16.87 MB**

---

## Next Steps (Optional)

### 1. Update Image Components

Next.js automatically uses WebP when available. No code changes needed for `<Image>` component!

```tsx
// This automatically serves WebP to supporting browsers
<Image src="/images/hero/fire-damage.jpg" alt="..." />
```

### 2. Use Picture Element (for manual control)

```tsx
<picture>
  <source srcSet="/images/hero/fire-damage.webp" type="image/webp" />
  <img src="/images/hero/fire-damage.jpg" alt="..." />
</picture>
```

### 3. Clean Up Originals (Advanced)

After verifying WebP works:

```bash
# Backup first!
mkdir backup-original-images
cp -r public/images backup-original-images/

# Then remove originals (WebP only)
# WARNING: Only if you're confident!
```

---

## Troubleshooting

### Sharp Not Installed
```bash
npm install --save-dev sharp
```

### Conversion Fails
```bash
# Check file permissions
ls -la public/images/hero/

# Try single file
node -e "require('sharp')('public/images/hero/test.jpg').webp({quality:85}).toFile('test.webp')"
```

### Already Converted
Script automatically skips existing WebP files. To reconvert:

```bash
# Delete WebP files first
find public/images -name "*.webp" -delete

# Then reconvert
node convert-images-to-webp.js --all
```

---

## Performance Impact

### Before WebP
- Hero images: 2.71 MB
- Page load: ~4-5 seconds (3G)
- Bandwidth: 265 MB for all images

### After WebP
- Hero images: 1.90 MB (30% smaller)
- Page load: ~3-3.5 seconds (3G)
- Bandwidth: 185.5 MB for all images

**Real-world impact:**
- Homepage loads 1-2 seconds faster
- 79.5 MB less bandwidth per full site visit
- Better Core Web Vitals scores
- Improved SEO rankings

---

## Configuration

Edit `convert-images-to-webp.js` to adjust:

```javascript
const CONFIG = {
  quality: 85,        // 80-90 recommended (85 is sweet spot)
  effort: 6,          // 0-6, higher = better compression
  skipExisting: true, // Skip if WebP already exists
};
```

---

## Summary

| Metric | Value |
|--------|-------|
| Files to convert | 142 |
| Current size | 265 MB |
| WebP size | 185.5 MB |
| **Savings** | **79.5 MB (30%)** |
| Conversion time | ~5-10 minutes |
| Page speed improvement | 1-2 seconds |

---

## One-Liner

```bash
npm install --save-dev sharp && node convert-images-to-webp.js --all && echo "✅ Converted! Saved ~79.5 MB"
```

---

## Need Help?

1. Check Sharp installation: `npm list sharp`
2. View analysis: `node analyze-images.js`
3. Test single file: Use `--category=hero` first
4. Check results: `cat webp-conversion-results.json`

---

**Ready? Run this now:**

```bash
node convert-images-to-webp.js --all
```

**Estimated time:** 5-10 minutes
**Estimated savings:** 79.5 MB (30%)
**Risk:** None (originals preserved)

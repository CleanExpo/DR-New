# Service Image Optimization Guide

## Problem: Poor Visual Quality from Over-Compression

**Current State:**
- WebP files: 7-10KB each - WAY too compressed
- Visual quality: Poor/pixelated
- User experience: Degraded

**Solution:**
- Create HIGH-QUALITY WebP files (85% quality)
- Target size: 300-800KB per image
- Quality: Excellent (nearly indistinguishable from original)

## Quick Start

### Option 1: Recover & Optimize (Recommended)

```bash
# Step 1: Create directory for originals
mkdir -p public/images/services-original

# Step 2: Recover original PNG files from git
git show 01ac353a~1:public/images/services/sewage-remediation.png > public/images/services-original/sewage-remediation.png
git show 01ac353a~1:public/images/services/fire-smoke-damage.png > public/images/services-original/fire-smoke-damage.png
git show 01ac353a~1:public/images/services/mould-remediation.png > public/images/services-original/mould-remediation.png
git show 01ac353a~1:public/images/services/commercial-disaster-recovery.png > public/images/services-original/commercial-disaster-recovery.png
git show 01ac353a~1:public/images/services/biohazard-remediation.png > public/images/services-original/biohazard-remediation.png

# Step 3: Run optimization
node scripts/optimize-service-images.js
```

### Option 2: Manual Upload

If you have new high-quality images:
1. Place PNG files in `public/images/services-original/`
2. Run `node scripts/optimize-service-images.js`

## Expected Results

| Image | Original | Current | Optimized (Target) |
|-------|----------|---------|-------------------|
| Sewage | 3.6MB PNG | 7.6KB WebP (poor) | 400KB WebP (excellent) |
| Fire Damage | 4.6MB PNG | 9.6KB WebP (poor) | 500KB WebP (excellent) |
| Mould | 4.2MB PNG | 7.2KB WebP (poor) | 450KB WebP (excellent) |
| Commercial | 4.1MB PNG | 9.3KB WebP (poor) | 480KB WebP (excellent) |
| Biohazard | 4.5MB PNG | 9.6KB WebP (poor) | 520KB WebP (excellent) |

**Total:** From ~22MB (PNGs) or ~45KB (poor WebP) to ~2.4MB (excellent WebP)

## Deployment

```bash
# After optimization
git add public/images/services/*.webp
git commit -m "feat: High-quality WebP service images (85% quality)"
git push origin main
vercel --prod
```


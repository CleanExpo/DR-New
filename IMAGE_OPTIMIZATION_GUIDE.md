
# IMAGE OPTIMIZATION REQUIRED

## Critical Images to Optimize:

1. **hero-disaster-tornado.png** (2.0MB → needs to be <300KB)
   - Current: 2.0MB
   - Target: <300KB
   - Action: Resize to 1920px width, convert to WebP

2. **biohazard-remediation-services.png** (880KB → needs to be <200KB)
   - Current: 880KB
   - Target: <200KB
   - Action: Convert to WebP

3. **sewage-remediation-services.png** (640KB → needs to be <200KB)
   - Current: 640KB
   - Target: <200KB
   - Action: Convert to WebP

## Quick Fix Commands:

### Using ImageMagick (if installed):
```bash
# Convert and resize hero-disaster-tornado.png
magick public/images/hero/hero-disaster-tornado.png -resize 1920x -quality 85 public/images/hero/hero-disaster-tornado.webp

# Convert other PNGs to WebP
magick public/images/hero/biohazard-remediation-services.png -quality 85 public/images/hero/biohazard-remediation-services.webp
magick public/images/hero/sewage-remediation-services.png -quality 85 public/images/hero/sewage-remediation-services.webp
```

### Or use online tools:
1. https://squoosh.app/ (Google's image optimizer)
2. https://tinypng.com/ (For PNG optimization)
3. https://cloudconvert.com/png-to-webp (Batch conversion)

### Update component after optimization:
Replace image extensions in your components from .png to .webp

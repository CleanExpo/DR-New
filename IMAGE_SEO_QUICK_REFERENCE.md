# Image SEO Quick Reference Guide

**For Disaster Recovery Brisbane Website**

---

## Image Best Practices - Always Follow This

### 1. Alt Text Formula
```typescript
alt="[Service] [Location] by IICRC Master Restorer Phill McGurk - [Key Features] - [Coverage Area]"
```

**Example:**
```tsx
<Image
  src="/images/hero/water-damage.webp"
  alt="Emergency water damage restoration Brisbane by IICRC Master Restorer Phill McGurk - 60-minute response for burst pipes floods - industrial water extraction Brisbane Ipswich Logan"
  // ...
/>
```

### 2. Title Attribute Formula
```typescript
title="[Service] [Location] | [Credential/Feature] | 1300 309 361"
```

**Example:**
```tsx
<Image
  src="/images/hero/water-damage.webp"
  title="Emergency Water Damage Restoration Brisbane | Master Restorer 60-Min Response | 1300 309 361"
  // ...
/>
```

### 3. Loading Strategy
- **Hero Images (Above Fold):** Use `priority`
- **All Other Images:** Use `loading="lazy"`

```tsx
// Hero image
<Image
  src="/images/hero/main.webp"
  alt="..."
  title="..."
  priority  // Above fold
  sizes="100vw"
/>

// Below fold image
<Image
  src="/images/service/detail.webp"
  alt="..."
  title="..."
  loading="lazy"  // Below fold
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

---

## Required Keywords for Alt Text

### Must Include in Every Image:
1. **Location:** Brisbane, Ipswich, or Logan (at minimum)
2. **Professional Credential:** IICRC Master Restorer
3. **Professional Name:** Phill McGurk
4. **Service Type:** Water damage, fire damage, flood, mould, etc.

### Additional Keywords (Use When Relevant):
- 60-minute response
- 24/7 emergency
- Industrial equipment
- Luxury riverside properties
- Hamilton, Ascot, New Farm, Toowong (specific suburbs)
- Emergency restoration
- Certified professional

---

## Common Image Types & Their Alt Text Patterns

### 1. Hero Images (Service Pages)
```tsx
alt="Emergency [SERVICE] Brisbane by IICRC Master Restorer Phill McGurk - 60-minute response for [SPECIFIC_ISSUES] - [KEY_FEATURES] Brisbane Ipswich Logan"
```

### 2. Location Hero Images
```tsx
alt="[SUBURB] Brisbane emergency disaster restoration by IICRC Master Restorer Phill McGurk - [PROPERTY_TYPE] [SERVICES] - 60-minute response [SUBURB] [NEARBY_SUBURBS] Queensland"
```

### 3. Before/After Images
```tsx
// Before
alt="Before [SERVICE] Brisbane - [DAMAGE_DESCRIPTION] requiring immediate IICRC Master Restorer response to prevent [SECONDARY_DAMAGE]"

// During
alt="During [SERVICE] Brisbane - [EQUIPMENT] working 24/7 thermal imaging moisture monitoring IICRC Master certified process"

// After
alt="After [SERVICE] Brisbane - property returned to pre-loss condition IICRC Master Restorer certified completion ready for [NEXT_STEP]"
```

### 4. Process/Equipment Images
```tsx
alt="[EQUIPMENT_NAME] Brisbane IICRC Master Restorer - [SERVICE] [TECHNICAL_FEATURES] Brisbane Ipswich Logan Queensland"
```

### 5. Logo/Branding Images
```tsx
alt="Disaster Recovery Brisbane professional branding - IICRC Master Restorer certified [SERVICES] - trusted emergency response Brisbane Ipswich Logan"
```

---

## File Naming Conventions

### Good File Names:
- `water-damage-restoration-brisbane.webp`
- `flood-recovery-hamilton-brisbane.webp`
- `fire-damage-emergency-response.webp`
- `iicrc-master-restorer-certification.webp`

### Bad File Names:
- `IMG_1234.jpg`
- `image1.png`
- `photo.webp`
- `untitled.jpg`

---

## Structured Data Usage

### Adding Logo Structured Data (Homepage/About)
```tsx
import { LogoStructuredData } from '@/components/seo/ImageStructuredData';

// In component
<LogoStructuredData
  logoUrl="/images/logos/disaster-recovery-logo.png"
  organizationName="Disaster Recovery Brisbane - IICRC Master Restorer Phill McGurk"
  url="https://dr-new-ten.vercel.app"
/>
```

### Adding Before/After Structured Data (Service Pages)
```tsx
import { BeforeAfterImageStructuredData } from '@/components/seo/ImageStructuredData';

// In component
<BeforeAfterImageStructuredData
  beforeImageUrl="/images/damage/before-water-damage.webp"
  afterImageUrl="/images/damage/after-restoration.webp"
  serviceName="Water Damage Restoration"
  location="Brisbane, Queensland"
  date={new Date().toISOString()}
/>
```

---

## Image Sitemap Maintenance

**File Location:** `D:\DR New\public\sitemap-images.xml`

### When to Update:
- ✅ New service page added
- ✅ New location page added
- ✅ Major images added to existing pages
- ✅ Before/after galleries added

### How to Add New Image:
```xml
<url>
  <loc>https://dr-new-ten.vercel.app/services/YOUR-SERVICE</loc>
  <image:image>
    <image:loc>https://dr-new-ten.vercel.app/images/YOUR-IMAGE.webp</image:loc>
    <image:caption>Descriptive caption matching alt text</image:caption>
    <image:title>Title matching title attribute</image:title>
    <image:geo_location>Brisbane, Queensland, Australia</image:geo_location>
  </image:image>
</url>
```

---

## Checklist for New Images

Before deploying any new image:

- [ ] Image file name is descriptive (not IMG_1234.jpg)
- [ ] Image is in WebP format (or JPEG/PNG if required)
- [ ] Alt text includes: Location + IICRC Master Restorer + Phill McGurk + Service
- [ ] Title attribute follows formula: Service | Credential | Phone
- [ ] Loading strategy is correct (priority for hero, lazy for others)
- [ ] Sizes attribute is appropriate for responsive design
- [ ] Image added to sitemap-images.xml (if important)
- [ ] Structured data added (if logo or before/after)

---

## Common Mistakes to Avoid

### ❌ DON'T:
```tsx
// Generic alt text
alt="Water damage"

// Missing title
<Image src="..." alt="..." />

// Wrong loading strategy
<Image src="/hero.webp" loading="lazy" /> // Hero should be priority!

// Missing location keywords
alt="Emergency restoration services"

// Missing professional credentials
alt="Water damage Brisbane"
```

### ✅ DO:
```tsx
// Complete alt text
alt="Emergency water damage restoration Brisbane by IICRC Master Restorer Phill McGurk - 60-minute response industrial water extraction Brisbane Ipswich Logan"

// Include title
title="Emergency Water Damage Restoration Brisbane | Master Restorer | 1300 309 361"

// Correct loading
<Image src="/hero.webp" priority /> // Above fold
<Image src="/detail.webp" loading="lazy" /> // Below fold

// Complete keywords
alt="Emergency water damage restoration Brisbane by IICRC Master Restorer Phill McGurk - 60-minute response for burst pipes floods - industrial water extraction structural drying Brisbane Ipswich Logan"
```

---

## Tools & Resources

### Validation Tools:
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Image Sitemap Validator:** Google Search Console
- **Alt Text Checker:** Browser inspect element
- **Lighthouse Audit:** Chrome DevTools (check accessibility score)

### Testing:
```bash
# Check all alt text
grep -r "alt=" app/ | grep Image

# Check all title attributes
grep -r "title=" app/ | grep Image

# Count images in sitemap
grep -c "image:image" public/sitemap-images.xml

# Verify lazy loading
grep -c 'loading="lazy"' app/services/water-damage-restoration/page.tsx
```

---

## Support & Questions

If unsure about image optimization:
1. Check this guide first
2. Look at existing optimized images as examples
3. Review `IMAGE_SEO_OPTIMIZATION_COMPLETE.md` for detailed examples
4. Ensure all keywords include: Brisbane + IICRC Master Restorer + Phill McGurk + Service

**Remember:** Every image is an SEO opportunity. Use it wisely!

---

**Last Updated:** 2025-11-09
**Maintained By:** Image SEO Optimization Team

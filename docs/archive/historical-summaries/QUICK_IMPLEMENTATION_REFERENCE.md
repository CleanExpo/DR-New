# QUICK IMPLEMENTATION REFERENCE

## Copy-Paste Code for Each Page

### 1. HOMEPAGE (`app/page.tsx`)

**Add at top of file** (after other imports):
```tsx
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';
```

**Add inside return statement** (before existing content):
```tsx
export default function HomePage() {
  return (
    <>
      <EEATDualPositioningSchema pageType="homepage" />

      {/* Your existing homepage content */}
    </>
  );
}
```

**What this adds**: Organization + NRPG + CARSI + Person schemas

---

### 2. ABOUT PHILL PAGE (`app/about-phil-mcgurk/page.tsx`)

**Add at top of file**:
```tsx
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';
```

**Add inside return statement**:
```tsx
export default function AboutPhillPage() {
  return (
    <>
      <EEATDualPositioningSchema pageType="about" />

      {/* Your existing about content */}
    </>
  );
}
```

**What this adds**: Person (primary) + Organization + NRPG schemas

---

### 3. SERVICE PAGES (`app/services/[...slug]/page.tsx`)

**Add at top of file**:
```tsx
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';
```

**Add inside return statement**:
```tsx
export default function ServicePage({ params }) {
  return (
    <>
      <EEATDualPositioningSchema pageType="services" />

      {/* Your existing service content */}
    </>
  );
}
```

**What this adds**: Organization + Person schemas (connects services to Master Restorer)

---

## Verification After Adding

### 1. Build Check
```bash
npm run build
```
Should complete without errors.

### 2. View Schema in Browser
1. Start dev server: `npm run dev`
2. Navigate to page
3. View page source (Ctrl+U / Cmd+U)
4. Search for: `application/ld+json`
5. Verify JSON-LD is present and valid

### 3. Google Rich Results Test
1. Go to: https://search.google.com/test/rich-results
2. Enter page URL
3. Click "Test URL"
4. Check for:
   - ✅ No errors
   - ✅ Schemas detected
   - ✅ Preview shows data

### 4. Schema.org Validator
1. Go to: https://validator.schema.org/
2. Copy JSON-LD from page source
3. Paste into validator
4. Click "Validate"
5. Fix any errors

---

## Content Updates Needed

### Homepage
Add this section after hero:
```tsx
<section className="py-12 bg-gray-50">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-2xl font-bold mb-4">
      Trusted Emergency Service + Industry Training Leader
    </h2>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
      Led by Master Restorer Phill McGurk, we provide 24/7 emergency restoration
      for Brisbane, Ipswich & Logan while training Australia's restoration
      professionals through NRPG and CARSI.
    </p>
    <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
      <div>
        <h3 className="font-bold mb-2">For Property Owners</h3>
        <p className="text-gray-600">24/7 Master Restorer emergency services</p>
        <Link href="/services" className="text-blue-600 hover:underline">
          View Services →
        </Link>
      </div>
      <div>
        <h3 className="font-bold mb-2">For Contractors</h3>
        <p className="text-gray-600">Professional network and resources</p>
        <Link href="/nrpg" className="text-blue-600 hover:underline">
          Join NRPG →
        </Link>
      </div>
      <div>
        <h3 className="font-bold mb-2">For Technicians</h3>
        <p className="text-gray-600">IICRC-approved CEC courses online</p>
        <Link href="/carsi" className="text-blue-600 hover:underline">
          CARSI Training →
        </Link>
      </div>
    </div>
  </div>
</section>
```

### About Phill Page
Add credentials section:
```tsx
<section className="py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8">Professional Credentials</h2>

    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Master Certifications</h3>
        <ul className="space-y-2">
          <li>✓ IICRC Master Water Restorer</li>
          <li>✓ IICRC Master Fire & Smoke Restorer</li>
          <li>✓ IICRC Approved Instructor</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Individual Certifications</h3>
        <ul className="space-y-2">
          <li>✓ Water Restoration Technician (WRT)</li>
          <li>✓ Applied Structural Drying (ASD)</li>
          <li>✓ Fire & Smoke Restoration (FSR)</li>
          <li>✓ Applied Microbial Remediation (AMRT)</li>
        </ul>
      </div>
    </div>

    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Leadership Roles</h3>
      <ul className="space-y-2">
        <li>✓ Director, NRPG (National Restoration Professionals Group)</li>
        <li>✓ Founder, CARSI (Cleaning and Restoration Science Institute)</li>
        <li>✓ IICRC Instructor - Teaching restoration professionals nationwide</li>
      </ul>
    </div>
  </div>
</section>
```

### Service Pages
Add Master Restorer callout:
```tsx
<div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
  <h3 className="font-bold text-lg mb-2">Master Restorer Led Service</h3>
  <p className="text-gray-700">
    All {serviceName} work is overseen by{' '}
    <Link href="/about-phil-mcgurk" className="text-blue-600 hover:underline">
      Phill McGurk, Master Restorer
    </Link>
    , one of a limited number in Queensland. Our team follows strict{' '}
    <Link href="/nrpg" className="text-blue-600 hover:underline">
      NRPG industry standards
    </Link>
    {' '}and uses techniques taught in our{' '}
    <Link href="/carsi" className="text-blue-600 hover:underline">
      IICRC-approved training courses
    </Link>.
  </p>
</div>
```

---

## Internal Linking Strategy

### Add to Footer (all pages)
```tsx
<div className="border-t pt-8 mt-8">
  <div className="grid md:grid-cols-3 gap-6">
    <div>
      <h4 className="font-bold mb-3">Emergency Services</h4>
      <p className="text-sm text-gray-600">
        24/7 disaster recovery led by Master Restorer Phill McGurk
      </p>
    </div>
    <div>
      <h4 className="font-bold mb-3">
        <Link href="/nrpg" className="hover:text-blue-600">NRPG</Link>
      </h4>
      <p className="text-sm text-gray-600">
        Australia's premier restoration professionals network
      </p>
    </div>
    <div>
      <h4 className="font-bold mb-3">
        <Link href="/carsi" className="hover:text-blue-600">CARSI</Link>
      </h4>
      <p className="text-sm text-gray-600">
        IICRC-approved continuing education for technicians
      </p>
    </div>
  </div>
</div>
```

---

## Deployment Checklist

### Before Deploying
- [ ] Run `npm run build` - no errors
- [ ] Test all pages locally
- [ ] Verify schema in page source
- [ ] Check browser console - no errors

### After Deploying
- [ ] Visit each page in production
- [ ] View source - verify schema present
- [ ] Test with Google Rich Results Test
- [ ] Submit sitemap to Google Search Console

### Within 24 Hours
- [ ] Request indexing in Search Console for:
  - Homepage
  - About Phill page
  - NRPG page
  - CARSI page
  - Key service pages

### Monitor Daily (Week 1)
- [ ] Google Search Console - structured data reports
- [ ] Check for errors/warnings
- [ ] Monitor indexing status

---

## Troubleshooting

### Schema Not Showing in Rich Results Test
1. Check if schema is server-side rendered
2. Verify JSON syntax is valid
3. Check for duplicate @context
4. Ensure BASE_URL is correct

### TypeScript Errors
```bash
# If import not found
npm install
npm run build

# If type errors
# Check import path matches actual file location
```

### Build Errors
- Ensure all imports are correct
- Check for missing closing tags (</> )
- Verify component name matches file

---

## Quick Test Commands

```bash
# Build and check for errors
npm run build

# Run dev server
npm run dev

# Type check only
npm run type-check

# View page source with curl
curl http://localhost:3000 | grep "application/ld+json" -A 50
```

---

## Support Links

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Google Search Console: https://search.google.com/search-console
- Schema.org Documentation: https://schema.org/

---

**TOTAL TIME TO IMPLEMENT**: 30 minutes

**PRIORITY ORDER**:
1. Homepage (most important)
2. About Phill (second most important)
3. Service pages (enhance existing)

**EXPECTED RESULTS**: Rich results within 2-4 weeks, Knowledge Panel within 4-8 weeks.

# DEPLOY LOCAL SEO TO ALL LOCATION PAGES

## Quick Deployment Guide

This guide shows how to apply the local SEO optimizations to all remaining location pages using the Toowong implementation as a template.

---

## 🎯 PAGES TO UPDATE

### Remaining Location Pages:
1. `/app/locations/hamilton/page.tsx` (has some updates, needs maps)
2. `/app/locations/ascot/page.tsx`
3. `/app/locations/new-farm/page.tsx`
4. `/app/locations/karalee/page.tsx` (needs maps)
5. `/app/locations/brookwater/page.tsx`
6. `/app/locations/springfield-lakes/page.tsx`

---

## 📋 STEP-BY-STEP FOR EACH PAGE

### Step 1: Update Metadata

**Find this pattern:**
```tsx
export const metadata: Metadata = {
  title: 'Hamilton Water Damage...',
  description: '...',
  // ...
```

**Update to:**
```tsx
export const metadata: Metadata = {
  title: '[SUBURB] Water Damage Restoration | IICRC Master Restorer Brisbane | 24/7 Emergency',
  description: 'Emergency water damage, fire damage & flood restoration in [SUBURB], Brisbane. IICRC Master Restorer Phill McGurk. 30-min response. Insurance approved. Call 1300 309 361.',
  keywords: 'water damage restoration [suburb] brisbane, emergency restoration [suburb], flood damage [suburb], fire damage [suburb]...',
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/locations/[suburb-slug]'
  }
};
```

---

### Step 2: Update Schema Data

**Ensure correct geo-coordinates:**

| Location | Latitude | Longitude |
|----------|----------|-----------|
| Hamilton | -27.4380 | 153.0650 |
| Ascot | -27.4320 | 153.0580 |
| New Farm | -27.4650 | 153.0500 |
| Toowong | -27.4850 | 152.9900 |
| Karalee | -27.5700 | 152.7800 |
| Brookwater | -27.6700 | 152.9100 |
| Springfield Lakes | -27.6700 | 152.9200 |

**Update schema section:**
```tsx
const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Disaster Recovery [SUBURB] Brisbane",
  "url": "https://dr-new-ten.vercel.app",
  "email": "admin@disasterrecovery.com.au",
  "telephone": "+61-1300-309-361",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": [SEE TABLE ABOVE],
    "longitude": [SEE TABLE ABOVE]
  },
  "areaServed": {
    "@type": "City",
    "name": "[SUBURB]",
    "containedInPlace": {
      "@type": "City",
      "name": "[Brisbane|Ipswich]",
      // ...
    }
  },
  // ... rest of schema
};
```

---

### Step 3: Add Google Maps Component

**At the end of the page component, BEFORE the closing `</div>` tags:**

```tsx
import { MapPinIcon } from '@heroicons/react/24/outline';

// ... existing code ...

        {/* Google Maps Section - Local SEO Signal */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
              [SUBURB] Brisbane Service Area
            </h2>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Rapid 30-minute emergency response to all [SUBURB] properties
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-200 shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-6">
                <MapPinIcon className="w-8 h-8 text-red-600" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">[SUBURB], Brisbane QLD [POSTCODE]</h3>
                  <p className="text-gray-600">Emergency Response Zone: 30 minutes</p>
                </div>
              </div>

              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14159.678!2d[LONGITUDE]!3d[LATITUDE]!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z[SUBURB]!5e0!3m2!1sen!2sau!4v1234567890">
                </iframe>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-600 mb-1">Latitude</p>
                  <p className="text-lg font-bold text-gray-900">[LATITUDE]°</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-600 mb-1">Longitude</p>
                  <p className="text-lg font-bold text-gray-900">[LONGITUDE]°</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-600 mb-1">Response Time</p>
                  <p className="text-lg font-bold text-red-600">&lt; 30 Minutes</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <a
                  href="https://www.google.com/maps/dir//[SUBURB]+QLD+[POSTCODE]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800"
                >
                  <MapPinIcon className="w-5 h-5" />
                  Get Directions to [SUBURB]
                </a>
              </div>
            </div>

            {/* NEARBY SUBURBS - See location-specific data below */}
          </div>
        </section>
      </div>
    </>
  );
}
```

---

### Step 4: Add Nearby Suburbs Section

**Add location-specific nearby suburbs:**

#### Hamilton
```tsx
<div className="mt-8 bg-gray-50 rounded-xl p-6">
  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
    Nearby Brisbane Suburbs We Serve
  </h3>
  <div className="grid md:grid-cols-4 gap-4 text-center">
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <p className="font-semibold text-gray-900">Ascot</p>
      <p className="text-sm text-gray-600">5 min response</p>
    </div>
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <p className="font-semibold text-gray-900">New Farm</p>
      <p className="text-sm text-gray-600">8 min response</p>
    </div>
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <p className="font-semibold text-gray-900">Albion</p>
      <p className="text-sm text-gray-600">10 min response</p>
    </div>
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <p className="font-semibold text-gray-900">Clayfield</p>
      <p className="text-sm text-gray-600">12 min response</p>
    </div>
  </div>
</div>
```

#### Ascot
```tsx
<div className="grid md:grid-cols-4 gap-4 text-center">
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Hamilton</p>
    <p className="text-sm text-gray-600">5 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Clayfield</p>
    <p className="text-sm text-gray-600">7 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Hendra</p>
    <p className="text-sm text-gray-600">10 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Eagle Farm</p>
    <p className="text-sm text-gray-600">12 min response</p>
  </div>
</div>
```

#### New Farm
```tsx
<div className="grid md:grid-cols-4 gap-4 text-center">
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Teneriffe</p>
    <p className="text-sm text-gray-600">5 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Fortitude Valley</p>
    <p className="text-sm text-gray-600">7 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Hamilton</p>
    <p className="text-sm text-gray-600">10 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Newstead</p>
    <p className="text-sm text-gray-600">8 min response</p>
  </div>
</div>
```

#### Karalee
```tsx
<div className="grid md:grid-cols-4 gap-4 text-center">
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Brookwater</p>
    <p className="text-sm text-gray-600">10 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Chuwar</p>
    <p className="text-sm text-gray-600">8 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Ipswich</p>
    <p className="text-sm text-gray-600">15 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Springfield Lakes</p>
    <p className="text-sm text-gray-600">20 min response</p>
  </div>
</div>
```

#### Brookwater
```tsx
<div className="grid md:grid-cols-4 gap-4 text-center">
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Springfield Lakes</p>
    <p className="text-sm text-gray-600">5 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Springfield Central</p>
    <p className="text-sm text-gray-600">8 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Augustine Heights</p>
    <p className="text-sm text-gray-600">10 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Karalee</p>
    <p className="text-sm text-gray-600">15 min response</p>
  </div>
</div>
```

#### Springfield Lakes
```tsx
<div className="grid md:grid-cols-4 gap-4 text-center">
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Brookwater</p>
    <p className="text-sm text-gray-600">5 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Springfield Central</p>
    <p className="text-sm text-gray-600">7 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Augustine Heights</p>
    <p className="text-sm text-gray-600">10 min response</p>
  </div>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="font-semibold text-gray-900">Ipswich</p>
    <p className="text-sm text-gray-600">20 min response</p>
  </div>
</div>
```

---

### Step 5: Update All Text References

**Find and replace throughout each page:**
- "Hamilton" → "[Suburb Name]"
- "Hamilton's" → "[Suburb Name]'s"
- Update local context (riverside, acreage, etc.)
- Update CTA text

**Example locations to update:**
1. H1 tag
2. Hero description
3. Services section heading
4. Why Choose Us section
5. Final CTA section
6. Footer breadcrumb text

---

## 🎯 POSTCODE REFERENCE

| Suburb | Postcode |
|--------|----------|
| Hamilton | 4007 |
| Ascot | 4007 |
| New Farm | 4005 |
| Toowong | 4066 |
| Karalee | 4306 |
| Brookwater | 4300 |
| Springfield Lakes | 4300 |

---

## ✅ QUALITY CHECKLIST

For each page, verify:

### Schema
- [ ] Correct suburb name
- [ ] Correct latitude/longitude
- [ ] Correct postcode
- [ ] Correct parent city (Brisbane or Ipswich)
- [ ] Email: admin@disasterrecovery.com.au
- [ ] Phone: +61-1300-309-361

### Content
- [ ] H1 includes suburb name
- [ ] Metadata has suburb name
- [ ] Canonical URL is correct
- [ ] All "Hamilton" references updated
- [ ] Local keywords included
- [ ] Response time mentioned

### Maps
- [ ] MapPinIcon imported
- [ ] Correct coordinates in iframe
- [ ] Correct coordinates displayed
- [ ] Directions link works
- [ ] Nearby suburbs are relevant

### NAP Consistency
- [ ] Phone: 1300 309 361
- [ ] Address: 4/17 Tile St, Wacol, QLD 4076
- [ ] Email: admin@disasterrecovery.com.au
- [ ] Website: https://dr-new-ten.vercel.app

---

## 🚀 DEPLOYMENT ORDER

**Recommended order (highest traffic first):**
1. Hamilton (high-value, high search volume)
2. Ascot (high-value, prestige)
3. New Farm (high search volume)
4. Karalee (Ipswich priority)
5. Brookwater (luxury estates)
6. Springfield Lakes (growth area)

---

## 📊 TESTING

After deployment, test each page:

1. **Schema Validation:**
   - Use Google Rich Results Test
   - Verify LocalBusiness schema valid
   - Check geo-coordinates present

2. **Maps Functionality:**
   - Map loads correctly
   - Directions link works
   - Coordinates display

3. **Mobile Responsive:**
   - Maps embed responsive
   - Nearby suburbs grid responsive
   - All content readable

4. **NAP Consistency:**
   - Same phone everywhere
   - Same address everywhere
   - Same email everywhere

---

## 💡 PRO TIPS

1. **Use Toowong as Template:**
   - Copy entire Toowong page
   - Find/replace "Toowong" with suburb name
   - Update coordinates
   - Update nearby suburbs
   - Done!

2. **Coordinate Reference:**
   - All coordinates in `lib/seo/local-seo-config.ts`
   - Copy exact values to avoid typos

3. **Nearby Suburbs:**
   - Use LOCATION_DATA in LocalServiceAreaMap.tsx
   - Pre-configured for all locations

4. **Local Landmarks:**
   - Add 3-5 local landmarks per suburb
   - Examples: shopping centers, parks, landmarks
   - Use for local context and keywords

---

## 🎓 WHY THIS MATTERS

**Each additional local signal = higher rankings:**
- Google Maps embed = strong local signal
- Geo-coordinates = precise location data
- Nearby suburbs = broader coverage
- Local keywords = relevance signals
- NAP consistency = trust signals

**Expected Results:**
- Higher local pack rankings
- More "near me" search visibility
- Increased local organic traffic
- Better Google My Business performance

---

## 📁 REFERENCE FILES

- **Template:** `app/locations/toowong/page.tsx`
- **Coordinates:** `lib/seo/local-seo-config.ts`
- **Component:** `components/seo/LocalServiceAreaMap.tsx`
- **NAP Data:** `components/Footer.tsx`

---

**Questions? Check:**
- LOCAL_SEO_OPTIMIZATION_COMPLETE.md (full documentation)
- lib/seo/local-seo-config.ts (all data)
- components/seo/LocalServiceAreaMap.tsx (ready component)

---

*Quick Deployment Guide - Local SEO Optimization*
*Use this as a checklist when updating each location page*

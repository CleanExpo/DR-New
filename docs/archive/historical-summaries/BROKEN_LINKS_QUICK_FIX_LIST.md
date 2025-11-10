# BROKEN LINKS - QUICK FIX LIST
**Quick Reference for Immediate Fixes**

## CRITICAL - FIX NOW (44+ Broken Links)

### 1. Create /claim page
```bash
# File to create:
D:\DR New\app\claim\page.tsx

# Fixes 24+ broken links in:
- app/emergency/water-damage-brisbane/page.tsx (2)
- app/emergency/fire-damage-brisbane/page.tsx (2)
- app/services/storm-damage-restoration/page.tsx (3)
- app/services/flood-damage-restoration/page.tsx (3)
- app/services/bushfire-damage-restoration/page.tsx (3)
- app/services/cyclone-damage-restoration/page.tsx (3)
- app/services/page.tsx (2)
- lib/page-generator/content-generator.ts (2)
- src/components/EmergencyCTA.tsx (1)
- src/components/LocationHero.tsx (1)
- src/components/contact/DigitalOnlyContact.tsx (2)
- src/components/ux/UXEnhancements.tsx (1)
```

### 2. Create /get-help page
```bash
# File to create:
D:\DR New\app\get-help\page.tsx

# Fixes 20+ broken links in:
- app/not-found.tsx (1)
- app/faq/water-damage/page.tsx (1)
- app/faq/fire-damage/page.tsx (1)
- app/faq/emergency-response/page.tsx (1)
- app/faq/mould-removal/page.tsx (1)
- app/faq/insurance-claims/page.tsx (1)
- app/faq/general/page.tsx (1)
- app/faq/page.tsx (1)
- app/insurance-claims/page.tsx (2)
- app/locations/[location]/page.tsx (2)
- app/residential/page.tsx (2)
- app/sitemap/page.tsx (1)
- src/components/ui/emergency-cta.tsx (2)
```

## HIGH PRIORITY (3 Broken Links)

### 3. Remove Sydney References
```bash
# Files to edit (remove Sydney, use Brisbane/Ipswich/Logan):

app/guides/storm-damage/page.tsx:954
- OLD: href="/locations/brisbane/storm-damage-repairs"
+ NEW: href="/locations/brisbane" or href="/services/storm-damage"

app/guides/mould/page.tsx:990
- OLD: href="/locations/sydney/mould-remediation"
+ NEW: href="/locations/brisbane" or href="/services/mould-remediation"

app/guides/fire-damage/page.tsx:856
- OLD: href="/locations/sydney/fire-damage-restoration"
+ NEW: href="/locations/brisbane" or href="/services/fire-damage-restoration"
```

## MEDIUM PRIORITY (8+ Broken Links)

### 4. Create /pricing page
```bash
# File to create:
D:\DR New\app\pricing\page.tsx

# Fixes broken links in:
- app/not-found.tsx:61
- components/Header.tsx:155
```

### 5. Create /locations index page
```bash
# File to create:
D:\DR New\app\locations\page.tsx

# Fixes broken links in:
- app/not-found.tsx:58
- app/resources/water-damage-categories/page.tsx:622
```

### 6. Verify dynamic location routes work
```bash
# Test these URLs resolve correctly:
- /locations/brisbane (referenced in app/page.tsx:258)
- /locations/ipswich (referenced in app/page.tsx:274)
- /locations/logan (referenced in app/page.tsx:290)

# Dynamic route exists at:
app/locations/[location]/page.tsx

# Action: Verify it handles these three slugs correctly
```

## LOW PRIORITY (4+ Broken Links)

### 7. Handle /contractors page
```bash
# Option A - Create redirect in next.config.js:
redirects: async () => [
  {
    source: '/contractors',
    destination: '/contractor-portal',
    permanent: true,
  },
]

# Option B - Create simple page:
D:\DR New\app\contractors\page.tsx

# Option C - Update references:
- app/book-service/error/page.tsx:261
- lib/page-generator/content-generator.ts:212
```

### 8. Delete backup files
```bash
# Remove from git:
git rm app/services/commercial/page.tsx.backup
git rm middleware.ts.backup
git commit -m "Remove backup files from repository"
```

## IMAGES - ALL VERIFIED ✓
No broken image references found. All images exist and are properly located.

## COMMAND TO CREATE MISSING PAGES

```bash
# Quick creation commands:

# 1. Create claim page
mkdir -p "D:\DR New\app\claim"
touch "D:\DR New\app\claim\page.tsx"

# 2. Create get-help page
mkdir -p "D:\DR New\app\get-help"
touch "D:\DR New\app\get-help\page.tsx"

# 3. Create pricing page
mkdir -p "D:\DR New\app\pricing"
touch "D:\DR New\app\pricing\page.tsx"

# 4. Create locations index
touch "D:\DR New\app\locations\page.tsx"
```

## FILES TO EDIT FOR SYDNEY REMOVAL

```bash
# Edit these 3 files:
code "D:\DR New\app\guides\storm-damage\page.tsx"  # Line 954
code "D:\DR New\app\guides\mould\page.tsx"         # Line 990
code "D:\DR New\app\guides\fire-damage\page.tsx"   # Line 856
```

## SUMMARY COUNTS

| Priority | Pages Missing | Broken Links | Time to Fix |
|----------|--------------|--------------|-------------|
| CRITICAL | 2 | 44+ | 2-4 hours |
| HIGH | 0 (edits only) | 3 | 30 minutes |
| MEDIUM | 2 + verify 1 | 8+ | 2-3 hours |
| LOW | 1 + cleanup | 4 | 1 hour |
| **TOTAL** | **5-6 pages** | **59+ links** | **6-9 hours** |

## FASTEST PATH TO FIX

**80% of issues fixed in 3-4 hours:**
1. Create `/claim` page (1-2 hours)
2. Create `/get-help` page (1-2 hours)
3. Remove Sydney references (30 minutes)

This fixes 47+ of the 59+ broken links (80%+ of issues).

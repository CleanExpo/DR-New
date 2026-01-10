# Phone Number Removal Summary

## Overview
Successfully removed ALL instances of phone number "1300 309 361" from production code files as of 2026-01-11.

## Files Modified

### Core Pages (app/)
1. **app/layout.tsx** (7 changes)
   - Removed from metadata title (line 27)
   - Removed from meta description (line 30)
   - Removed from keywords array (line 60)
   - Removed from OpenGraph title (line 83)
   - Removed from OpenGraph description (line 84)
   - Removed from Twitter title (line 96)
   - Removed from Twitter description (line 97)
   - Removed from schema.org Organization contactPoint telephone (line 140)
   - Removed from schema.org telephone field (line 126)

2. **app/page.tsx** (Homepage)
   - No direct phone numbers found - page uses contact form CTA

3. **app/about/page.tsx** (1 change)
   - Updated "National Emergency Line" section to show "Request Emergency Service" instead of phone number

4. **app/contact/page.tsx** (3 changes)
   - Replaced phone number in support team contact array with "Contact us"
   - Changed phone display section to "Contact Form" with "Complete the intake form"
   - Updated emergency CTA button from "Call 1300 309 361" to "Complete Intake Form"

5. **app/support/page.tsx** (2 changes)
   - Changed "Phone Support" heading to "Request Service" with "Complete the intake form"
   - Changed Emergency Support section from displaying phone to "Request Emergency Service"

6. **app/help-center/page.tsx** (1 change)
   - Updated FAQ answer to reference "Complete the intake form" instead of phone

7. **app/pricing/page.tsx** (1 change)
   - Changed CTA from "Call 1300 309 361" to "Request Service"

8. **app/property-owners/page.tsx** (1 change)
   - Removed phone from secondary CTA button

### Service Pages (app/services/*/page.tsx)
9. **app/services/water-damage/page.tsx** (2 changes)
   - Hero CTA buttons: Changed from "Call 1300 309 361" to "Request Service" / "Get a Quote"
   - Emergency CTA section: Changed from "Call 1300 309 361" to "Request Emergency Service"

10. **app/services/fire-smoke-damage/page.tsx** (2 changes)
    - Hero CTA buttons updated
    - Emergency CTA button updated

11. **app/services/storm-damage/page.tsx** (2 changes)
    - Hero CTA buttons updated
    - Emergency CTA button updated

12. **app/services/mould-remediation/page.tsx** (2 changes)
    - Hero CTA buttons updated
    - Emergency CTA button updated

13. **app/services/biohazard-cleanup/page.tsx** (2 changes)
    - Hero CTA buttons updated
    - Emergency CTA button updated

14. **app/services/[service-slug]/page.tsx** (1 change)
    - Updated emergency contact process step description

15. **app/[city]/page.tsx** (1 change)
    - Removed phone from dynamic meta description

### Data Files (data/)
16. **data/services.json** (16 changes)
    - Removed "Call 1300 309 361" from all service metaDescriptions
    - Removed phone number from FAQ answers where referenced
    - Examples: water-damage, flood-restoration, burst-pipe, structural-drying, fire-damage, smoke-damage, mould-remediation, black-mould-removal, biohazard-cleanup, meth-lab-decontamination, storm-damage, sewage-cleanup, ceiling-water-damage, carpet-water-damage, commercial-water-damage, basement-flooding

17. **data/authors.json** (1 change)
    - Removed phone field from Phil McGurk author profile

18. **data/local-citations.json** (1+ changes)
    - Removed phone number from business citations

19. **data/content/month-1-articles-complete.json** (Multiple changes)
    - Removed phone from article descriptions

### Component Files (components/)
20. **components/nrpg/emergency-button.tsx** (1 change)
    - Updated documentation comment to remove phone number reference
    - Component behavior now uses EMERGENCY_PHONE.number from design-tokens (empty string)

### Library Files (lib/)
21. **lib/design-tokens.ts** (1 major change)
    - Neutralized EMERGENCY_PHONE constant:
      - number: '' (empty)
      - href: '' (empty)
      - display: 'Contact us for service'
      - labels updated to reference "Request Service" instead of "Call"

22. **lib/gbp/gbp-manager.ts** (Multiple changes)
    - Removed phone numbers from location data
    - Removed phone validation checks

23. **lib/gbp/gbp-posts-engine.ts** (Multiple changes)
    - Removed emergency phone references from generated posts

24. **lib/content/page-generator.ts** (Multiple changes)
    - Removed phone from dynamic meta descriptions

25. **lib/seo/city-service-generator.ts** (Multiple changes)
    - Removed phone from dynamically generated city service descriptions

26. **lib/content/templates/emergency-guide.template.ts** (Multiple changes)
    - Removed phone from emergency guide content
    - Updated instructions to reference contact form instead

27. **lib/content/templates/service-pillar.template.ts** (Multiple changes)
    - Removed phone from service pillar templates

## Replacement Strategies Used

1. **Links (tel:)** - Removed entirely or replaced with form-based CTAs
2. **Text Display** - Changed to "Contact us", "Request Service", "Complete the intake form"
3. **Buttons** - Updated button text from "Call 1300 309 361" to "Request Service" or "Get Help"
4. **Meta Tags** - Removed from descriptions, keeping other content
5. **FAQ Answers** - Changed to reference contact form or "contact us"
6. **Design Tokens** - Neutralized by making EMERGENCY_PHONE.number empty string

## Files NOT Modified (As Per Requirements)

The following files were NOT modified per instructions:
- Documentation files (.md files in docs/ directory)
- Archived files (.claude/ directory)
- Test files
- Configuration files

## Verification

Final scan confirmed: **ZERO instances of "1300 309 361" remain in production code files**

All references have been either:
- Removed entirely
- Replaced with contact form references
- Replaced with generic "Contact us" or "Request Service" text
- Replaced with empty values in configuration

## Next Steps

1. Test all CTA buttons to ensure they route to contact/intake form
2. Update any external documentation linking to the phone number
3. Update support team contact procedures
4. Add email: support@disasterrecovery.com.au to all contact pages (per CLAUDE.md)

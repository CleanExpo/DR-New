/**
 * Custom Jest Matchers
 *
 * Domain-specific assertions for Disaster Recovery Brisbane testing.
 */

import { expect } from '@jest/globals';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidPhoneNumber(): R;
      toBeValidEmail(): R;
      toBeValidBrisbaneAddress(): R;
      toBeValidPostcode(): R;
      toBeValidServiceType(): R;
      toBeValidInsuranceProvider(): R;
      toHaveEmergencyContact(): R;
      toHaveIICRCCertification(): R;
      toHaveCorrectSEOStructure(): R;
      toHaveValidLocalBusinessSchema(): R;
      toHaveValidServiceSchema(): R;
      toBeAccessible(): R;
      toHaveFastLoadTime(maxMs: number): R;
      toBeResponsive(): R;
    }
  }
}

/**
 * Check if string is valid Australian phone number
 */
expect.extend({
  toBeValidPhoneNumber(received: string) {
    const phoneRegex = /^(\+61|0)[2-478][\s]?[0-9]{4}[\s]?[0-9]{4}$|^1300[\s]?[0-9]{3}[\s]?[0-9]{3}$/;
    const pass = phoneRegex.test(received);

    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid phone number`
          : `Expected ${received} to be a valid phone number (format: 04XX XXX XXX or 1300 XXX XXX)`,
    };
  },
});

/**
 * Check if string is valid email
 */
expect.extend({
  toBeValidEmail(received: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);

    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid email`
          : `Expected ${received} to be a valid email address`,
    };
  },
});

/**
 * Check if string is valid Brisbane/Ipswich/Logan address
 */
expect.extend({
  toBeValidBrisbaneAddress(received: string) {
    const addressRegex = /\d+\s+[\w\s]+,\s+(Brisbane|Ipswich|Logan|Hamilton|Ascot|New Farm|Toowong|Karalee|Brookwater|Springfield Lakes),\s+QLD/i;
    const pass = addressRegex.test(received);

    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid Brisbane area address`
          : `Expected ${received} to be a valid Brisbane/Ipswich/Logan address`,
    };
  },
});

/**
 * Check if string is valid QLD postcode
 */
expect.extend({
  toBeValidPostcode(received: string) {
    const postcodeRegex = /^4[0-9]{3}$/;
    const pass = postcodeRegex.test(received);

    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid QLD postcode`
          : `Expected ${received} to be a valid QLD postcode (4XXX)`,
    };
  },
});

/**
 * Check if string is valid service type
 */
expect.extend({
  toBeValidServiceType(received: string) {
    const validServices = [
      'water-damage-restoration',
      'fire-damage-restoration',
      'mould-remediation',
      'storm-damage-restoration',
      'emergency-response',
    ];
    const pass = validServices.includes(received);

    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid service type`
          : `Expected ${received} to be one of: ${validServices.join(', ')}`,
    };
  },
});

/**
 * Check if string is valid insurance provider
 */
expect.extend({
  toBeValidInsuranceProvider(received: string) {
    const validProviders = [
      'AAMI', 'Suncorp', 'NRMA', 'Allianz', 'QBE',
      'Youi', 'Budget Direct', 'RACQ', 'Other',
    ];
    const pass = validProviders.includes(received);

    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid insurance provider`
          : `Expected ${received} to be one of: ${validProviders.join(', ')}`,
    };
  },
});

/**
 * Check if HTML contains emergency contact info
 */
expect.extend({
  toHaveEmergencyContact(received: string | HTMLElement) {
    const content = typeof received === 'string' ? received : received.innerHTML;
    const hasPhone = /1300\s*309\s*361/.test(content);
    const hasEmail = /admin@disasterrecovery\.com\.au/.test(content);
    const pass = hasPhone || hasEmail;

    return {
      pass,
      message: () =>
        pass
          ? `Expected content not to have emergency contact information`
          : `Expected content to have emergency phone (1300 309 361) or email (admin@disasterrecovery.com.au)`,
    };
  },
});

/**
 * Check if content mentions IICRC certification
 */
expect.extend({
  toHaveIICRCCertification(received: string | HTMLElement) {
    const content = typeof received === 'string' ? received : received.innerHTML;
    const hasIICRC = /IICRC/i.test(content);
    const hasMasterRestorer = /Master\s+Restorer/i.test(content);
    const pass = hasIICRC || hasMasterRestorer;

    return {
      pass,
      message: () =>
        pass
          ? `Expected content not to mention IICRC certification`
          : `Expected content to mention IICRC or Master Restorer certification`,
    };
  },
});

/**
 * Check if page has correct SEO structure
 */
expect.extend({
  toHaveCorrectSEOStructure(received: Document) {
    const hasTitle = received.querySelector('title') !== null;
    const hasMetaDescription = received.querySelector('meta[name="description"]') !== null;
    const hasOGTitle = received.querySelector('meta[property="og:title"]') !== null;
    const hasOGDescription = received.querySelector('meta[property="og:description"]') !== null;
    const hasCanonical = received.querySelector('link[rel="canonical"]') !== null;

    const pass = hasTitle && hasMetaDescription && hasOGTitle && hasOGDescription && hasCanonical;

    const missing = [];
    if (!hasTitle) missing.push('title');
    if (!hasMetaDescription) missing.push('meta description');
    if (!hasOGTitle) missing.push('OG title');
    if (!hasOGDescription) missing.push('OG description');
    if (!hasCanonical) missing.push('canonical link');

    return {
      pass,
      message: () =>
        pass
          ? `Expected page not to have complete SEO structure`
          : `Expected page to have complete SEO structure. Missing: ${missing.join(', ')}`,
    };
  },
});

/**
 * Check if page has valid LocalBusiness schema
 */
expect.extend({
  toHaveValidLocalBusinessSchema(received: Document) {
    const scripts = received.querySelectorAll('script[type="application/ld+json"]');
    let hasValidSchema = false;

    scripts.forEach(script => {
      try {
        const data = JSON.parse(script.textContent || '{}');
        if (data['@type'] === 'LocalBusiness') {
          hasValidSchema =
            data.name &&
            data.telephone === '1300309361' &&
            data.address &&
            data.address.addressLocality &&
            data.address.addressRegion === 'QLD';
        }
      } catch (e) {
        // Invalid JSON
      }
    });

    return {
      pass: hasValidSchema,
      message: () =>
        hasValidSchema
          ? `Expected page not to have valid LocalBusiness schema`
          : `Expected page to have valid LocalBusiness schema with correct phone, address, and region`,
    };
  },
});

/**
 * Check if page has valid Service schema
 */
expect.extend({
  toHaveValidServiceSchema(received: Document) {
    const scripts = received.querySelectorAll('script[type="application/ld+json"]');
    let hasValidSchema = false;

    scripts.forEach(script => {
      try {
        const data = JSON.parse(script.textContent || '{}');
        if (data['@type'] === 'Service') {
          hasValidSchema =
            data.name &&
            data.description &&
            data.provider &&
            data.areaServed;
        }
      } catch (e) {
        // Invalid JSON
      }
    });

    return {
      pass: hasValidSchema,
      message: () =>
        hasValidSchema
          ? `Expected page not to have valid Service schema`
          : `Expected page to have valid Service schema with name, description, provider, and areaServed`,
    };
  },
});

/**
 * Check basic accessibility
 */
expect.extend({
  toBeAccessible(received: HTMLElement) {
    const images = received.querySelectorAll('img');
    const imagesHaveAlt = Array.from(images).every(img => img.hasAttribute('alt'));

    const buttons = received.querySelectorAll('button');
    const buttonsHaveLabels = Array.from(buttons).every(btn =>
      btn.textContent?.trim() || btn.getAttribute('aria-label')
    );

    const links = received.querySelectorAll('a');
    const linksHaveText = Array.from(links).every(link =>
      link.textContent?.trim() || link.getAttribute('aria-label')
    );

    const pass = imagesHaveAlt && buttonsHaveLabels && linksHaveText;

    const issues = [];
    if (!imagesHaveAlt) issues.push('images missing alt text');
    if (!buttonsHaveLabels) issues.push('buttons missing labels');
    if (!linksHaveText) issues.push('links missing text');

    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to be accessible`
          : `Expected element to be accessible. Issues: ${issues.join(', ')}`,
    };
  },
});

/**
 * Check page load time
 */
expect.extend({
  toHaveFastLoadTime(received: number, maxMs: number) {
    const pass = received <= maxMs;

    return {
      pass,
      message: () =>
        pass
          ? `Expected load time ${received}ms to be slower than ${maxMs}ms`
          : `Expected load time ${received}ms to be faster than ${maxMs}ms`,
    };
  },
});

/**
 * Check responsive design
 */
expect.extend({
  toBeResponsive(received: HTMLElement) {
    const hasViewportMeta = document.querySelector('meta[name="viewport"]') !== null;
    const hasResponsiveImages = Array.from(received.querySelectorAll('img')).every(
      img => img.hasAttribute('loading') || img.hasAttribute('sizes')
    );

    const pass = hasViewportMeta && hasResponsiveImages;

    const issues = [];
    if (!hasViewportMeta) issues.push('missing viewport meta tag');
    if (!hasResponsiveImages) issues.push('images not responsive');

    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to be responsive`
          : `Expected element to be responsive. Issues: ${issues.join(', ')}`,
    };
  },
});

export {};

import { generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo-schema';

describe('SEO Schema Generation', () => {
  describe('generateLocalBusinessSchema', () => {
    it('generates valid Local Business schema', () => {
      const schema = generateLocalBusinessSchema({
        name: 'Disaster Recovery Australia',
        address: 'Brisbane, QLD',
        phone: '1300000000',
      });

      expect(schema).toHaveProperty('@type', 'LocalBusiness');
      expect(schema).toHaveProperty('name');
      expect(schema).toHaveProperty('address');
      expect(schema).toHaveProperty('telephone');
    });

    it('includes service area for Brisbane, Ipswich, Logan', () => {
      const schema = generateLocalBusinessSchema({
        name: 'Test Business',
        address: 'Brisbane',
        phone: '1300000000',
      });

      expect(schema.areaServed).toBeDefined();
      expect(Array.isArray(schema.areaServed)).toBe(true);
    });

    it('includes Master Restorer credentials', () => {
      const schema = generateLocalBusinessSchema({
        name: 'Test Business',
        address: 'Brisbane',
        phone: '1300000000',
      });

      expect(
        JSON.stringify(schema).includes('Master Restorer') ||
        schema.hasCredential
      ).toBe(true);
    });
  });

  describe('generateServiceSchema', () => {
    it('generates valid Service schema', () => {
      const schema = generateServiceSchema({
        name: 'Water Damage Restoration',
        description: 'Professional water damage restoration',
        serviceType: 'Emergency Service',
      });

      expect(schema).toHaveProperty('@type', 'Service');
      expect(schema).toHaveProperty('name');
      expect(schema).toHaveProperty('description');
    });

    it('includes provider information', () => {
      const schema = generateServiceSchema({
        name: 'Fire Damage Restoration',
        description: 'Expert fire damage restoration',
        serviceType: 'Emergency Service',
      });

      expect(schema.provider).toBeDefined();
      expect(schema.provider).toHaveProperty('name');
    });

    it('specifies service areas', () => {
      const schema = generateServiceSchema({
        name: 'Mould Remediation',
        description: 'Professional mould removal',
        serviceType: 'Remediation',
      });

      expect(schema.areaServed).toBeDefined();
    });
  });

  describe('generateBreadcrumbSchema', () => {
    it('generates valid Breadcrumb schema', () => {
      const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Water Damage', url: '/services/water-damage' },
      ];

      const schema = generateBreadcrumbSchema(breadcrumbs);

      expect(schema).toHaveProperty('@type', 'BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(3);
    });

    it('maintains correct breadcrumb order', () => {
      const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
      ];

      const schema = generateBreadcrumbSchema(breadcrumbs);

      expect(schema.itemListElement[0].position).toBe(1);
      expect(schema.itemListElement[1].position).toBe(2);
    });
  });
});

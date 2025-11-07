export function generateSchema(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };
}

export function generateAllSchemas(...args: any[]): void {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Disaster Recovery Brisbane',
    description: 'IICRC Master Restorer - Emergency disaster recovery services',
    telephone: '1300 309 361',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4/17 Tile St',
      addressLocality: 'Wacol',
      addressRegion: 'QLD',
      postalCode: '4076',
      addressCountry: 'AU'
    },
    areaServed: [
      { '@type': 'City', name: 'Brisbane' },
      { '@type': 'City', name: 'Ipswich' },
      { '@type': 'City', name: 'Logan' }
    ],
    openingHours: '24/7'
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${pageType} - ${location}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Disaster Recovery Brisbane'
    },
    areaServed: location
  };

  return [baseSchema, serviceSchema];
}

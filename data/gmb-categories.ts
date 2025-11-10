export interface GMBCategory {
  slug: string;
  title: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  services?: Array<{ name: string; description: string; }>;
}

export const GMB_CATEGORIES: GMBCategory[] = [
  {
    slug: 'water-damage',
    title: 'Water Damage Restoration',
    name: 'Water Damage Restoration',
    description: 'Emergency water damage restoration services',
    category: 'Damage Restoration Service',
    keywords: ['water damage', 'flood restoration', 'emergency water removal', 'Brisbane water damage'],
    services: [
      { name: 'Emergency Water Extraction', description: 'Rapid water removal 24/7' },
      { name: 'Structural Drying', description: 'Professional drying and dehumidification' },
      { name: 'Mould Prevention', description: 'Anti-microbial treatments' }
    ]
  },
  {
    slug: 'fire-damage',
    title: 'Fire Damage Restoration',
    name: 'Fire Damage Restoration',
    description: 'Fire and smoke damage restoration',
    category: 'Damage Restoration Service',
    keywords: ['fire damage', 'smoke damage', 'fire restoration', 'Brisbane fire damage'],
    services: [
      { name: 'Smoke Odour Removal', description: 'Advanced odour elimination' },
      { name: 'Soot Cleaning', description: 'Professional soot and ash removal' },
      { name: 'Structural Repairs', description: 'Complete fire damage restoration' }
    ]
  },
  {
    slug: 'mould-remediation',
    title: 'Mould Remediation',
    name: 'Mould Remediation',
    description: 'Professional mould removal and remediation',
    category: 'Damage Restoration Service',
    keywords: ['mould removal', 'mould remediation', 'black mould', 'Brisbane mould removal'],
    services: [
      { name: 'Mould Inspection', description: 'Comprehensive mould testing' },
      { name: 'Safe Mould Removal', description: 'IICRC certified removal' },
      { name: 'Prevention Treatments', description: 'Long-term mould prevention' }
    ]
  },
  {
    slug: 'storm-damage',
    title: 'Storm Damage Repair',
    name: 'Storm Damage Repair',
    description: 'Storm and weather damage restoration',
    category: 'Damage Restoration Service',
    keywords: ['storm damage', 'wind damage', 'hail damage', 'Brisbane storm repair'],
    services: [
      { name: 'Emergency Tarping', description: 'Immediate weather protection' },
      { name: 'Roof Repairs', description: 'Storm damage roof restoration' },
      { name: 'Water Extraction', description: 'Storm water removal' }
    ]
  },
  {
    slug: 'biohazard-cleaning',
    title: 'Biohazard Cleaning',
    name: 'Biohazard Cleaning',
    description: 'Biohazard and trauma cleaning services',
    category: 'Damage Restoration Service',
    keywords: ['biohazard cleaning', 'trauma cleaning', 'crime scene cleanup', 'Brisbane biohazard'],
    services: [
      { name: 'Trauma Scene Cleanup', description: 'Discreet professional cleanup' },
      { name: 'Biohazard Removal', description: 'Safe hazardous material removal' },
      { name: 'Odour Removal', description: 'Complete decontamination' }
    ]
  }
];

export function getCategoryBySlug(slug: string): GMBCategory | null {
  return GMB_CATEGORIES.find(cat => cat.slug === slug) || null;
}

export function generateCategoryTitle(category: GMBCategory | null): string {
  return category?.title || 'Disaster Recovery Services';
}

export function generateCategoryDescription(category: GMBCategory | null): string {
  return category?.description || 'Professional disaster recovery services';
}

export function generateCategorySchema(category: GMBCategory | null) {
  if (!category) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: category.title,
    description: category.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Disaster Recovery Brisbane'
    }
  };
}

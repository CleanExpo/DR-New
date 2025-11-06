export const GMB_CATEGORIES = [
  {
    slug: 'water-damage',
    title: 'Water Damage Restoration',
    description: 'Emergency water damage restoration services',
    category: 'Damage Restoration Service'
  },
  {
    slug: 'fire-damage',
    title: 'Fire Damage Restoration',
    description: 'Fire and smoke damage restoration',
    category: 'Damage Restoration Service'
  },
  {
    slug: 'mould-remediation',
    title: 'Mould Remediation',
    description: 'Professional mould removal and remediation',
    category: 'Damage Restoration Service'
  },
  {
    slug: 'storm-damage',
    title: 'Storm Damage Repair',
    description: 'Storm and weather damage restoration',
    category: 'Damage Restoration Service'
  },
  {
    slug: 'biohazard-cleaning',
    title: 'Biohazard Cleaning',
    description: 'Biohazard and trauma cleaning services',
    category: 'Damage Restoration Service'
  }
];

export function getCategoryBySlug(slug: string) {
  return GMB_CATEGORIES.find(cat => cat.slug === slug) || null;
}

export function generateCategoryTitle(category: any) {
  return category?.title || 'Disaster Recovery Services';
}

export function generateCategoryDescription(category: any) {
  return category?.description || 'Professional disaster recovery services';
}

export function generateCategorySchema(category: any) {
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

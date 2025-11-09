/**
 * AI Meta Description Generator
 * Auto-generate SEO-optimized meta descriptions
 */

export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export interface PageContext {
  pageType: 'service' | 'location' | 'emergency' | 'insurance' | 'home';
  service?: string;
  location?: string;
  emergency?: boolean;
  insuranceProvider?: string;
}

/**
 * Generate meta description from content
 */
export function generateMetaDescription(
  content: string,
  context: PageContext,
  maxLength: number = 160
): string {
  // Extract key information
  const { pageType, service, location, emergency, insuranceProvider } = context;

  let description = '';

  switch (pageType) {
    case 'service':
      description = generateServiceMeta(service || '', location);
      break;

    case 'location':
      description = generateLocationMeta(location || '');
      break;

    case 'emergency':
      description = generateEmergencyMeta(service, location);
      break;

    case 'insurance':
      description = generateInsuranceMeta(insuranceProvider || '');
      break;

    case 'home':
      description = generateHomeMeta();
      break;

    default:
      description = extractDescriptionFromContent(content, maxLength);
  }

  // Ensure within character limit
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  }

  return description;
}

/**
 * Generate complete meta data for page
 */
export function generatePageMeta(context: PageContext): MetaData {
  const { pageType, service, location, emergency, insuranceProvider } = context;

  let title = '';
  let description = '';
  const keywords: string[] = [];

  switch (pageType) {
    case 'service': {
      const serviceName = formatServiceName(service || '');
      const locationText = location
        ? ` in ${location}`
        : ' Brisbane, Ipswich & Logan';

      title = `${serviceName}${locationText} | 24/7 Emergency Response`;
      description = generateServiceMeta(service || '', location);
      keywords.push(
        `${service} ${location || 'Brisbane'}`,
        `emergency ${service}`,
        `${service} restoration`,
        'IICRC certified',
        '24/7 emergency service'
      );
      break;
    }

    case 'location': {
      title = `Disaster Recovery Services ${location} | 60min Response`;
      description = generateLocationMeta(location || '');
      keywords.push(
        `disaster recovery ${location}`,
        `water damage ${location}`,
        `emergency restoration ${location}`,
        `${location} restoration services`
      );
      break;
    }

    case 'emergency': {
      const serviceName = service ? formatServiceName(service) : 'Emergency';
      title = `${serviceName} Emergency Services | Call 1300 309 361`;
      description = generateEmergencyMeta(service, location);
      keywords.push(
        '24/7 emergency',
        'disaster recovery',
        'emergency response',
        '60 minute response',
        'emergency restoration'
      );
      break;
    }

    case 'insurance': {
      title = `${insuranceProvider} Insurance Claims | Approved Contractor`;
      description = generateInsuranceMeta(insuranceProvider || '');
      keywords.push(
        `${insuranceProvider} approved`,
        'insurance claims',
        'disaster recovery insurance',
        'insurance restoration'
      );
      break;
    }

    case 'home': {
      title =
        'Disaster Recovery Brisbane | Water, Fire & Storm Restoration Experts';
      description = generateHomeMeta();
      keywords.push(
        'disaster recovery Brisbane',
        'water damage restoration',
        'fire damage restoration',
        'IICRC master restorer',
        'emergency restoration Brisbane'
      );
      break;
    }
  }

  return {
    title,
    description,
    keywords,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
  };
}

/**
 * Generate service-specific meta description
 */
function generateServiceMeta(service: string, location?: string): string {
  const serviceName = formatServiceName(service);
  const locationText = location ? ` in ${location}` : ' across Brisbane, Ipswich & Logan';

  const templates = {
    'water-damage': `Professional water damage restoration${locationText}. 24/7 emergency response, 60min arrival. IICRC Master Restorer certified. Insurance approved.`,
    'fire-damage': `Expert fire & smoke damage restoration${locationText}. Emergency response, complete cleanup & repair. IICRC certified. Insurance claims assistance.`,
    'mould': `Professional mould remediation${locationText}. Safe removal, testing & prevention. IICRC certified technicians. Insurance approved services.`,
    'storm-damage': `Emergency storm damage restoration${locationText}. Roof tarping, water extraction, repairs. 24/7 response, 60min arrival. Insurance claims help.`,
  };

  return (
    templates[service as keyof typeof templates] ||
    `Professional ${serviceName}${locationText}. 24/7 emergency response. IICRC Master Restorer certified. Call 1300 309 361.`
  );
}

/**
 * Generate location-specific meta description
 */
function generateLocationMeta(location: string): string {
  return `Professional disaster recovery services in ${location}. Water damage, fire restoration, mould removal & storm repairs. 60min emergency response. IICRC Master Restorer. Call 1300 309 361.`;
}

/**
 * Generate emergency page meta description
 */
function generateEmergencyMeta(service?: string, location?: string): string {
  const serviceName = service ? formatServiceName(service) : 'disaster recovery';
  const locationText = location ? ` in ${location}` : ' across Brisbane';

  return `24/7 emergency ${serviceName}${locationText}. 60-minute guaranteed response time. IICRC Master Restorer certified. Insurance approved. Call 1300 309 361 now.`;
}

/**
 * Generate insurance page meta description
 */
function generateInsuranceMeta(provider: string): string {
  return `${provider} approved disaster recovery contractor. Professional water, fire & storm damage restoration. Direct insurance billing. IICRC certified. Call 1300 309 361.`;
}

/**
 * Generate homepage meta description
 */
function generateHomeMeta(): string {
  return 'Brisbane\'s trusted disaster recovery experts. Water damage, fire restoration, mould remediation & storm repairs. IICRC Master Restorer. 24/7 emergency response, 60min arrival. Call 1300 309 361.';
}

/**
 * Extract description from content
 */
function extractDescriptionFromContent(
  content: string,
  maxLength: number
): string {
  // Remove HTML tags
  const textOnly = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  // Find first complete sentence or paragraph
  const sentences = textOnly.split(/[.!?]+/);
  let description = '';

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (trimmed.length > 50 && trimmed.length < maxLength) {
      description = trimmed + '.';
      break;
    }
  }

  if (!description && textOnly.length > 0) {
    description = textOnly.substring(0, maxLength - 3) + '...';
  }

  return description;
}

/**
 * Format service name for display
 */
function formatServiceName(service: string): string {
  return service
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate schema-friendly title
 */
export function generateSchemaTitle(context: PageContext): string {
  const meta = generatePageMeta(context);
  return meta.title;
}

/**
 * Validate meta description length and quality
 */
export function validateMetaDescription(description: string): {
  valid: boolean;
  warnings: string[];
  score: number;
} {
  const warnings: string[] = [];
  let score = 100;

  // Check length
  if (description.length < 120) {
    warnings.push('Meta description is too short (minimum 120 characters)');
    score -= 20;
  }

  if (description.length > 160) {
    warnings.push('Meta description is too long (maximum 160 characters)');
    score -= 15;
  }

  // Check for important elements
  if (!description.toLowerCase().includes('brisbane') &&
      !description.toLowerCase().includes('ipswich') &&
      !description.toLowerCase().includes('logan')) {
    warnings.push('Missing location reference for local SEO');
    score -= 10;
  }

  // Check for call-to-action
  const ctaKeywords = ['call', 'contact', '24/7', 'emergency', 'response'];
  const hasCTA = ctaKeywords.some((keyword) =>
    description.toLowerCase().includes(keyword)
  );

  if (!hasCTA) {
    warnings.push('Consider adding a call-to-action');
    score -= 10;
  }

  // Check for duplicates
  const words = description.toLowerCase().split(/\s+/);
  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const duplicates = Object.entries(wordCount).filter(
    ([word, count]) => count > 2 && word.length > 4
  );

  if (duplicates.length > 0) {
    warnings.push(
      `Repeated words: ${duplicates.map(([word]) => word).join(', ')}`
    );
    score -= 5;
  }

  return {
    valid: warnings.length === 0,
    warnings,
    score: Math.max(0, score),
  };
}

/**
 * AI Alt Text Generator
 * Generate descriptive alt text for images
 */

export interface ImageContext {
  filename: string;
  pageType?: 'service' | 'location' | 'emergency' | 'about';
  service?: string;
  location?: string;
  imageType?: 'hero' | 'process' | 'team' | 'equipment' | 'result';
}

/**
 * Generate alt text for image based on context
 */
export function generateAltText(context: ImageContext): string {
  const { filename, pageType, service, location, imageType } = context;

  // Use AI provider if available, otherwise use rule-based generation
  return generateRuleBasedAltText(context);
}

/**
 * Rule-based alt text generation
 */
function generateRuleBasedAltText(context: ImageContext): string {
  const { filename, pageType, service, location, imageType } = context;

  // Extract information from filename
  const fileInfo = parseFilename(filename);

  // Build alt text components
  const components: string[] = [];

  // Add image type prefix
  if (imageType === 'hero') {
    components.push('Professional');
  } else if (imageType === 'process') {
    components.push('Step-by-step');
  } else if (imageType === 'team') {
    components.push('IICRC certified');
  } else if (imageType === 'equipment') {
    components.push('Industrial-grade');
  } else if (imageType === 'result') {
    components.push('Before and after');
  }

  // Add service context
  if (service) {
    const serviceName = formatServiceName(service);
    components.push(serviceName);

    // Add specific details based on service
    switch (service) {
      case 'water-damage':
        if (imageType === 'equipment') {
          components.push('water extraction and drying equipment');
        } else if (imageType === 'process') {
          components.push('restoration process');
        } else {
          components.push('restoration');
        }
        break;

      case 'fire-damage':
        if (imageType === 'equipment') {
          components.push('smoke damage cleanup equipment');
        } else if (imageType === 'process') {
          components.push('restoration and repair process');
        } else {
          components.push('restoration');
        }
        break;

      case 'mould':
        if (imageType === 'equipment') {
          components.push('mould remediation equipment with HEPA filtration');
        } else if (imageType === 'process') {
          components.push('removal process');
        } else {
          components.push('remediation');
        }
        break;

      case 'storm-damage':
        if (imageType === 'equipment') {
          components.push('emergency tarping and repair equipment');
        } else if (imageType === 'process') {
          components.push('restoration process');
        } else {
          components.push('restoration');
        }
        break;
    }
  }

  // Add location context
  if (location) {
    components.push(`in ${location}`);
  } else if (pageType === 'service' || pageType === 'location') {
    components.push('in Brisbane, Ipswich and Logan');
  }

  // Add company branding
  if (imageType === 'hero' || imageType === 'team') {
    components.push('by Disaster Recovery Brisbane');
  }

  // Add IICRC certification for team/professional images
  if (imageType === 'team') {
    components.push('- IICRC Master Restorer certified');
  }

  return components.filter(Boolean).join(' ');
}

/**
 * Parse filename to extract context
 */
function parseFilename(filename: string): {
  service?: string;
  location?: string;
  type?: string;
} {
  const lower = filename.toLowerCase();

  let service: string | undefined;
  let location: string | undefined;
  let type: string | undefined;

  // Detect service
  if (lower.includes('water')) {service = 'water-damage';}
  if (lower.includes('fire') || lower.includes('smoke')) {service = 'fire-damage';}
  if (lower.includes('mould') || lower.includes('mold')) {service = 'mould';}
  if (lower.includes('storm')) {service = 'storm-damage';}

  // Detect location
  const locations = [
    'brisbane',
    'ipswich',
    'logan',
    'hamilton',
    'ascot',
    'new-farm',
    'toowong',
  ];
  for (const loc of locations) {
    if (lower.includes(loc)) {
      location = loc;
      break;
    }
  }

  // Detect type
  if (lower.includes('hero') || lower.includes('banner')) {type = 'hero';}
  if (lower.includes('process') || lower.includes('step')) {type = 'process';}
  if (lower.includes('team') || lower.includes('technician')) {type = 'team';}
  if (lower.includes('equipment') || lower.includes('tool')) {type = 'equipment';}
  if (lower.includes('before') || lower.includes('after') || lower.includes('result')) {type = 'result';}

  return { service, location, type };
}

/**
 * Format service name
 */
function formatServiceName(service: string): string {
  const names: Record<string, string> = {
    'water-damage': 'water damage',
    'fire-damage': 'fire and smoke damage',
    'mould': 'mould',
    'storm-damage': 'storm damage',
  };

  return names[service] || service.replace('-', ' ');
}

/**
 * Generate alt text for common image types
 */
export function generateAltTextByType(
  type: 'logo' | 'certification' | 'award' | 'insurance' | 'equipment',
  details?: string
): string {
  switch (type) {
    case 'logo':
      return 'Disaster Recovery Brisbane - Professional Disaster Restoration Services';

    case 'certification':
      return details
        ? `${details} certification logo`
        : 'IICRC Master Restorer certification badge';

    case 'award':
      return details
        ? `${details} award badge`
        : 'Industry excellence award';

    case 'insurance':
      return details
        ? `${details} approved contractor logo`
        : 'Insurance company approved contractor';

    case 'equipment':
      return details
        ? `Industrial ${details} equipment used in disaster restoration`
        : 'Professional disaster restoration equipment';

    default:
      return details || 'Disaster Recovery Brisbane';
  }
}

/**
 * Validate alt text quality
 */
export function validateAltText(altText: string): {
  valid: boolean;
  warnings: string[];
  score: number;
} {
  const warnings: string[] = [];
  let score = 100;

  // Check length
  if (altText.length < 10) {
    warnings.push('Alt text is too short (minimum 10 characters)');
    score -= 30;
  }

  if (altText.length > 125) {
    warnings.push('Alt text is too long (recommended maximum 125 characters)');
    score -= 10;
  }

  // Check for bad practices
  if (altText.toLowerCase().startsWith('image of')) {
    warnings.push('Avoid starting with "image of" - screen readers announce this');
    score -= 10;
  }

  if (altText.toLowerCase().includes('picture of') || altText.toLowerCase().includes('photo of')) {
    warnings.push('Avoid "picture of" or "photo of" - focus on content description');
    score -= 10;
  }

  // Check for keyword stuffing
  const words = altText.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  if (words.length - uniqueWords.size > 3) {
    warnings.push('Possible keyword stuffing - avoid repeating words excessively');
    score -= 15;
  }

  // Check for meaningful content
  const meaningfulWords = ['professional', 'certified', 'emergency', 'restoration', 'damage'];
  const hasMeaningful = meaningfulWords.some((word) =>
    altText.toLowerCase().includes(word)
  );

  if (!hasMeaningful && altText.length < 50) {
    warnings.push('Alt text could be more descriptive');
    score -= 10;
  }

  return {
    valid: warnings.length === 0,
    warnings,
    score: Math.max(0, score),
  };
}

/**
 * Batch generate alt text for multiple images
 */
export function batchGenerateAltText(
  images: Array<{ filename: string; context?: Partial<ImageContext> }>
): Array<{ filename: string; altText: string; score: number }> {
  return images.map(({ filename, context }) => {
    const fullContext: ImageContext = {
      filename,
      ...context,
    };

    const altText = generateAltText(fullContext);
    const validation = validateAltText(altText);

    return {
      filename,
      altText,
      score: validation.score,
    };
  });
}

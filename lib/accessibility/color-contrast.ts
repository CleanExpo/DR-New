/**
 * WCAG AAA Color Contrast Checker
 * Ensures all color combinations meet accessibility standards
 * AAA requires 7:1 for normal text, 4.5:1 for large text
 */

export interface ColorPair {
  foreground: string;
  background: string;
  purpose: string;
}

export interface ContrastResult {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  level: 'fail' | 'AA' | 'AAA';
  recommendation?: string;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance
 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format. Use hex colors (e.g., #ffffff)');
  }

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color pair meets WCAG standards
 */
export function checkContrast(
  foreground: string,
  background: string,
  isLargeText = false
): ContrastResult {
  const ratio = getContrastRatio(foreground, background);

  // WCAG Requirements:
  // Normal text: AA = 4.5:1, AAA = 7:1
  // Large text (18pt+ or 14pt+ bold): AA = 3:1, AAA = 4.5:1
  const aaThreshold = isLargeText ? 3 : 4.5;
  const aaaThreshold = isLargeText ? 4.5 : 7;

  const passesAA = ratio >= aaThreshold;
  const passesAAA = ratio >= aaaThreshold;

  let level: 'fail' | 'AA' | 'AAA' = 'fail';
  let recommendation: string | undefined;

  if (passesAAA) {
    level = 'AAA';
  } else if (passesAA) {
    level = 'AA';
    recommendation = `Consider adjusting colors to meet AAA standard (${aaaThreshold}:1 required, currently ${ratio.toFixed(2)}:1)`;
  } else {
    recommendation = `CRITICAL: This combination fails accessibility standards. Minimum ${aaThreshold}:1 required, currently ${ratio.toFixed(2)}:1`;
  }

  return {
    ratio: parseFloat(ratio.toFixed(2)),
    passesAA,
    passesAAA,
    level,
    recommendation,
  };
}

/**
 * Brand colors to verify
 */
export const brandColors: ColorPair[] = [
  // Primary text combinations
  {
    foreground: '#1e293b', // Gray 900 text
    background: '#ffffff',  // White background
    purpose: 'Body text on white',
  },
  {
    foreground: '#374151', // Gray 700 text
    background: '#ffffff',  // White background
    purpose: 'Secondary text on white',
  },
  {
    foreground: '#ffffff',  // White text
    background: '#1d4ed8', // Primary blue
    purpose: 'White text on primary blue buttons',
  },
  {
    foreground: '#ffffff',  // White text
    background: '#dc2626', // Emergency red
    purpose: 'Emergency CTA text',
  },
  {
    foreground: '#ffffff',  // White text
    background: '#16a34a', // Success green
    purpose: 'Success message text',
  },

  // Trust indicators
  {
    foreground: '#1e293b',  // Dark text
    background: '#fef3c7', // Yellow 100
    purpose: 'Trust badge text',
  },
  {
    foreground: '#ffffff',  // White text
    background: '#1e3a8a', // Blue 800
    purpose: 'Dark blue sections',
  },

  // Interactive elements
  {
    foreground: '#2563eb',  // Blue 600 links
    background: '#ffffff',  // White background
    purpose: 'Link text',
  },
  {
    foreground: '#dc2626',  // Red text
    background: '#fef2f2', // Red 50 background
    purpose: 'Error messages',
  },
  {
    foreground: '#16a34a',  // Green text
    background: '#f0fdf4', // Green 50 background
    purpose: 'Success messages',
  },

  // Mobile menu
  {
    foreground: '#1f2937',  // Gray 800
    background: '#f9fafb', // Gray 50
    purpose: 'Mobile menu text',
  },
];

/**
 * Audit all brand color combinations
 */
export function auditBrandColors(): {
  passing: ColorPair[];
  warnings: ColorPair[];
  failing: ColorPair[];
  report: string;
} {
  const passing: ColorPair[] = [];
  const warnings: ColorPair[] = [];
  const failing: ColorPair[] = [];

  const results = brandColors.map((pair) => {
    const result = checkContrast(pair.foreground, pair.background);

    if (result.level === 'AAA') {
      passing.push(pair);
    } else if (result.level === 'AA') {
      warnings.push(pair);
    } else {
      failing.push(pair);
    }

    return {
      pair,
      result,
    };
  });

  // Generate report
  const report = `
# Color Contrast Audit Report
Generated: ${new Date().toISOString()}

## Summary
- ✅ AAA Compliant: ${passing.length}/${brandColors.length}
- ⚠️  AA Compliant: ${warnings.length}/${brandColors.length}
- ❌ Non-Compliant: ${failing.length}/${brandColors.length}

## Detailed Results

${results
  .map(({ pair, result }) => {
    const status = result.level === 'AAA' ? '✅' : result.level === 'AA' ? '⚠️' : '❌';
    return `
### ${status} ${pair.purpose}
- **Foreground:** ${pair.foreground}
- **Background:** ${pair.background}
- **Ratio:** ${result.ratio}:1
- **Level:** ${result.level}
${result.recommendation ? `- **Recommendation:** ${result.recommendation}` : ''}
`;
  })
  .join('\n')}

## WCAG 2.1 AAA Requirements
- Normal text: 7:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): 4.5:1 contrast ratio
- UI components: 3:1 contrast ratio

## Next Steps
${failing.length > 0 ? '1. **CRITICAL:** Fix failing color combinations immediately' : ''}
${warnings.length > 0 ? '2. Consider enhancing AA-level combinations to AAA' : ''}
${passing.length === brandColors.length ? '✅ All color combinations meet AAA standards!' : ''}
  `.trim();

  return {
    passing,
    warnings,
    failing,
    report,
  };
}

/**
 * Suggest accessible color alternatives
 */
export function suggestAlternative(
  foreground: string,
  background: string,
  targetRatio = 7
): string {
  // This is a simplified version - in production, you'd use a more sophisticated algorithm
  // to maintain hue while adjusting lightness
  const currentRatio = getContrastRatio(foreground, background);

  if (currentRatio >= targetRatio) {
    return foreground; // Already meets requirements
  }

  // Suggest making foreground darker or lighter based on background
  const bgLum = getLuminance(
    ...Object.values(hexToRgb(background) || { r: 0, g: 0, b: 0 })
  );

  return bgLum > 0.5
    ? 'Darken foreground color'
    : 'Lighten foreground color';
}

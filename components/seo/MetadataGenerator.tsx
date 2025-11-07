'use client';

/**
 * Metadata Generator Component
 * Utilities for generating and managing SEO metadata across all pages
 * Supports: Title tags, meta descriptions, Open Graph, Twitter Cards, Schema
 */

import { optimizeMeta, toNextMetadata, validateMeta, type MetaOptimizationOptions } from '@/lib/seo/meta-optimizer';
import type { Metadata } from 'next';

interface MetadataGeneratorProps {
  options: MetaOptimizationOptions;
  imageUrl?: string;
}

/**
 * Generate optimized metadata for a page
 * Used in page.tsx files via server-side metadata export
 */
export function generateOptimizedMetadata(
  options: MetaOptimizationOptions,
  imageUrl?: string
): Metadata {
  try {
    // Generate optimization
    const optimized = optimizeMeta(options);

    // Validate against requirements
    const validation = validateMeta(optimized);
    if (!validation.isValid) {
      console.warn(`Metadata validation issues for ${options.path}:`, validation.issues);
    }

    // Convert to Next.js Metadata format
    const metadata = toNextMetadata(optimized, imageUrl);

    return metadata;
  } catch (error) {
    console.error(`Error generating metadata for ${options.path}:`, error);
    return {
      title: 'Disaster Recovery Brisbane',
      description: 'Emergency restoration services'
    };
  }
}

/**
 * Component for displaying metadata debugging info
 * Use in development only
 */
export function MetadataDebugInfo(...args: any[]): void {
  const optimized = optimizeMeta(options);
  const validation = validateMeta(optimized);

  return (
    <div className="hidden dev-only p-4 bg-gray-100 border border-gray-300 rounded">
      <h3 className="font-bold mb-2">Metadata Debug Info</h3>

      <div className="space-y-3 text-sm">
        {/* Title */}
        <div>
          <strong>Title ({optimized.title.length} chars):</strong>
          <div className="text-gray-700">{optimized.title}</div>
        </div>

        {/* Description */}
        <div>
          <strong>Description ({optimized.description.length} chars):</strong>
          <div className="text-gray-700 break-words">{optimized.description}</div>
        </div>

        {/* Canonical */}
        <div>
          <strong>Canonical:</strong>
          <div className="text-blue-600">{optimized.canonical}</div>
        </div>

        {/* Keywords */}
        <div>
          <strong>Keywords ({optimized.keywords.length}):</strong>
          <div className="text-gray-700 break-words">{optimized.keywords.join(', ')}</div>
        </div>

        {/* Validation */}
        <div>
          <strong>Validation Status:</strong>
          {validation.isValid ? (
            <div className="text-green-600">✓ Valid</div>
          ) : (
            <div>
              <div className="text-red-600">✗ Issues found:</div>
              <ul className="list-disc list-inside text-red-500">
                {validation.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Preset configurations for common page types
 */
export const metadataPresets = {
  // Home page
  home: (): MetaOptimizationOptions => ({
    path: '/',
    primaryKeyword: 'disaster recovery brisbane',
    secondaryKeywords: ['water damage restoration', 'fire damage', 'emergency response'],
    location: 'Brisbane',
    type: 'home',
    includes: { powerWord: 'Emergency', year: new Date().getFullYear() }
  }),

  // Service pages
  waterDamage: (): MetaOptimizationOptions => ({
    path: '/services/water-damage',
    primaryKeyword: 'water damage restoration brisbane',
    secondaryKeywords: ['flood cleanup', 'water extraction', 'structural drying', 'IICRC S500'],
    location: 'Brisbane',
    service: 'Water Damage Restoration',
    type: 'service',
    includes: { powerWord: 'Emergency', number: 60 }
  }),

  fireDamage: (): MetaOptimizationOptions => ({
    path: '/services/fire-damage',
    primaryKeyword: 'fire damage restoration brisbane',
    secondaryKeywords: ['smoke damage', 'soot cleanup', 'odour removal', 'fire restoration'],
    location: 'Brisbane',
    service: 'Fire Damage Restoration',
    type: 'service',
    includes: { powerWord: 'Immediate' }
  }),

  mould: (): MetaOptimizationOptions => ({
    path: '/services/mould-remediation',
    primaryKeyword: 'mould removal brisbane',
    secondaryKeywords: ['mould remediation', 'black mould', 'professional mould removal'],
    location: 'Brisbane',
    service: 'Mould Remediation',
    type: 'service',
    includes: { powerWord: 'Professional' }
  }),

  storm: (): MetaOptimizationOptions => ({
    path: '/services/storm-damage',
    primaryKeyword: 'storm damage repair brisbane',
    secondaryKeywords: ['cyclone damage', 'wind damage', 'hail damage', 'emergency response'],
    location: 'Brisbane',
    service: 'Storm Damage Repair',
    type: 'service',
    includes: { powerWord: 'Rapid' }
  }),

  // Location-specific
  hamilton: (): MetaOptimizationOptions => ({
    path: '/locations/hamilton',
    primaryKeyword: 'water damage restoration hamilton',
    secondaryKeywords: ['flood cleanup', 'emergency restoration', 'professional restorer'],
    location: 'Hamilton',
    type: 'location',
    includes: { powerWord: 'Professional', number: 60 }
  }),

  ascot: (): MetaOptimizationOptions => ({
    path: '/locations/ascot',
    primaryKeyword: 'disaster recovery ascot',
    secondaryKeywords: ['water damage', 'fire damage', 'professional restoration'],
    location: 'Ascot',
    type: 'location',
    includes: { powerWord: 'Expert' }
  }),

  karalee: (): MetaOptimizationOptions => ({
    path: '/locations/karalee',
    primaryKeyword: 'water damage restoration karalee',
    secondaryKeywords: ['flood cleanup', 'emergency restoration', 'ipswich specialist'],
    location: 'Karalee',
    type: 'location',
    includes: { powerWord: 'Professional' }
  }),

  // Guide pages
  emergencyGuide: (): MetaOptimizationOptions => ({
    path: '/emergency',
    primaryKeyword: 'emergency response guide',
    secondaryKeywords: ['disaster recovery', 'what to do', 'safety first', 'immediate action'],
    location: 'Brisbane',
    type: 'emergency',
    includes: { powerWord: 'Immediate' }
  }),

  // FAQ pages
  faqPage: (): MetaOptimizationOptions => ({
    path: '/faq',
    primaryKeyword: 'disaster recovery faq',
    secondaryKeywords: ['frequently asked questions', 'help', 'information', 'support'],
    location: 'Brisbane',
    type: 'faq',
    includes: { powerWord: 'Expert' }
  }),

  // Insurance pages
  insuranceClaims: (): MetaOptimizationOptions => ({
    path: '/insurance-claims',
    primaryKeyword: 'insurance claims assistance',
    secondaryKeywords: ['claim support', 'documentation help', 'contractor liaison', 'claim processing'],
    location: 'Brisbane',
    type: 'insurance',
    includes: { powerWord: 'Expert' }
  })
};

/**
 * Hook for using metadata in components
 * For client-side metadata reference only
 */
export function useMetadata(...args: any[]): void {
  const preset = metadataPresets[presetKey];
  if (!preset) {
    console.error(`Unknown metadata preset: ${presetKey}`);
    return null;
  }

  const options = preset();
  const optimized = optimizeMeta(options);

  return {
    options,
    optimized,
    title: optimized.title,
    description: optimized.description,
    canonical: optimized.canonical,
    keywords: optimized.keywords,
    ogTitle: optimized.openGraph.title,
    ogDescription: optimized.openGraph.description,
    twitterTitle: optimized.twitter.title,
    twitterDescription: optimized.twitter.description
  };
}

/**
 * Batch metadata generator for multiple pages
 */
export function generateBatchMetadata(
  pageConfigs: Array<{ path: string; options: MetaOptimizationOptions; imageUrl?: string }>
): Array<{ path: string; metadata: Metadata }> {
  return pageConfigs.map(({ path, options, imageUrl }) => ({
    path,
    metadata: generateOptimizedMetadata(options, imageUrl)
  }));
}

/**
 * Export metadata for a specific page type
 * Usage in page.tsx:
 * export const metadata = getPageMetadata(metadataPresets.waterDamage())
 */
export function getPageMetadata(
  options: MetaOptimizationOptions,
  imageUrl?: string
): Metadata {
  return generateOptimizedMetadata(options, imageUrl);
}

export default MetadataGenerator;

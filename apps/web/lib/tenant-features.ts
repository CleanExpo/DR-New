/**
 * Tenant Feature Gating
 *
 * Defines features available for each subscription tier.
 * Used for access control and UI feature toggles.
 */

import { SubscriptionTier, SubscriptionStatus } from '@prisma/client';

export interface TenantFeatures {
  // User limits
  maxUsers: number;
  maxMonthlyRequests: number;

  // Domain and branding
  customDomain: boolean;
  whiteLabel: boolean;
  customEmailDomain: boolean;

  // API access
  apiAccess: boolean;
  webhooks: boolean;
  apiRateLimit: number; // requests per hour

  // Analytics and reporting
  basicAnalytics: boolean;
  advancedAnalytics: boolean;
  customReports: boolean;
  dataExport: boolean;

  // Integration capabilities
  zapierIntegration: boolean;
  ssoEnabled: boolean;
  advancedIntegrations: boolean;

  // Support tiers
  supportLevel: 'email' | 'priority' | 'dedicated';
  slaGuarantee: boolean;
  dedicatedAccountManager: boolean;

  // Advanced features
  multiRegion: boolean;
  customWorkflows: boolean;
  advancedPermissions: boolean;
  auditLogs: boolean;

  // Storage and file limits
  storageGB: number;
  maxFileUploadMB: number;
}

/**
 * Get features available for a subscription tier
 */
export function getTenantFeatures(tier: SubscriptionTier): TenantFeatures {
  switch (tier) {
    case 'BASIC':
      return {
        // User limits
        maxUsers: 10,
        maxMonthlyRequests: 50,

        // Domain and branding
        customDomain: false,
        whiteLabel: false,
        customEmailDomain: false,

        // API access
        apiAccess: false,
        webhooks: false,
        apiRateLimit: 0,

        // Analytics and reporting
        basicAnalytics: true,
        advancedAnalytics: false,
        customReports: false,
        dataExport: false,

        // Integration capabilities
        zapierIntegration: false,
        ssoEnabled: false,
        advancedIntegrations: false,

        // Support tiers
        supportLevel: 'email',
        slaGuarantee: false,
        dedicatedAccountManager: false,

        // Advanced features
        multiRegion: false,
        customWorkflows: false,
        advancedPermissions: false,
        auditLogs: false,

        // Storage and file limits
        storageGB: 5,
        maxFileUploadMB: 10,
      };

    case 'PRO':
      return {
        // User limits
        maxUsers: 50,
        maxMonthlyRequests: 500,

        // Domain and branding
        customDomain: true,
        whiteLabel: true,
        customEmailDomain: true,

        // API access
        apiAccess: true,
        webhooks: true,
        apiRateLimit: 1000, // per hour

        // Analytics and reporting
        basicAnalytics: true,
        advancedAnalytics: true,
        customReports: true,
        dataExport: true,

        // Integration capabilities
        zapierIntegration: true,
        ssoEnabled: true,
        advancedIntegrations: true,

        // Support tiers
        supportLevel: 'priority',
        slaGuarantee: true,
        dedicatedAccountManager: false,

        // Advanced features
        multiRegion: false,
        customWorkflows: true,
        advancedPermissions: true,
        auditLogs: true,

        // Storage and file limits
        storageGB: 50,
        maxFileUploadMB: 50,
      };

    case 'ENTERPRISE':
      return {
        // User limits
        maxUsers: -1, // unlimited
        maxMonthlyRequests: -1, // unlimited

        // Domain and branding
        customDomain: true,
        whiteLabel: true,
        customEmailDomain: true,

        // API access
        apiAccess: true,
        webhooks: true,
        apiRateLimit: -1, // unlimited

        // Analytics and reporting
        basicAnalytics: true,
        advancedAnalytics: true,
        customReports: true,
        dataExport: true,

        // Integration capabilities
        zapierIntegration: true,
        ssoEnabled: true,
        advancedIntegrations: true,

        // Support tiers
        supportLevel: 'dedicated',
        slaGuarantee: true,
        dedicatedAccountManager: true,

        // Advanced features
        multiRegion: true,
        customWorkflows: true,
        advancedPermissions: true,
        auditLogs: true,

        // Storage and file limits
        storageGB: -1, // unlimited
        maxFileUploadMB: 500,
      };

    default:
      // Fall-through: unknown tier treated as BASIC
      return getTenantFeatures('BASIC');
  }
}

/** Memoised tier feature map — O(1) lookup after first access. */
const _tierFeatureCache = new Map<string, TenantFeatures>();

/**
 * Cached variant of getTenantFeatures.
 * Use this in hot paths (e.g., middleware, per-request feature checks).
 * Complexity: O(1) after warm-up; O(tiers) to build (constant 3 entries).
 */
export function getTenantFeaturesCached(tier: SubscriptionTier): TenantFeatures {
  let features = _tierFeatureCache.get(tier);
  if (!features) {
    features = getTenantFeatures(tier);
    _tierFeatureCache.set(tier, features);
  }
  return features;
}

/**
 * Check if tenant has access to a specific feature
 */
export function tenantHasFeature(
  tier: SubscriptionTier,
  status: SubscriptionStatus,
  featureName: keyof TenantFeatures
): boolean {
  // Block all features if subscription is not active
  if (status !== 'ACTIVE' && status !== 'TRIAL') {
    return false;
  }

  const features = getTenantFeaturesCached(tier);
  const featureValue = features[featureName];

  // Handle boolean features
  if (typeof featureValue === 'boolean') {
    return featureValue;
  }

  // Handle numeric features (-1 means unlimited/enabled, 0 means disabled, >0 means limited)
  if (typeof featureValue === 'number') {
    return featureValue !== 0;
  }

  // Handle string features (support levels, etc.)
  return !!featureValue;
}

/**
 * Check if tenant is within usage limits
 */
export function checkTenantUsageLimits(
  tier: SubscriptionTier,
  currentUsage: {
    userCount: number;
    monthlyRequests: number;
  }
): {
  withinLimits: boolean;
  exceeded: Array<'users' | 'requests'>;
} {
  const features = getTenantFeaturesCached(tier);
  const exceeded: Array<'users' | 'requests'> = [];

  // Check user limit (-1 means unlimited)
  if (features.maxUsers !== -1 && currentUsage.userCount > features.maxUsers) {
    exceeded.push('users');
  }

  // Check monthly request limit (-1 means unlimited)
  if (features.maxMonthlyRequests !== -1 && currentUsage.monthlyRequests > features.maxMonthlyRequests) {
    exceeded.push('requests');
  }

  return {
    withinLimits: exceeded.length === 0,
    exceeded,
  };
}

/**
 * Get upgrade recommendations based on current usage
 */
export function getUpgradeRecommendation(
  currentTier: SubscriptionTier,
  currentUsage: {
    userCount: number;
    monthlyRequests: number;
  }
): {
  shouldUpgrade: boolean;
  recommendedTier: SubscriptionTier | null;
  reasons: string[];
} {
  const currentFeatures = getTenantFeaturesCached(currentTier);
  const reasons: string[] = [];

  // Check if approaching limits (80% threshold)
  const userUsagePercent =
    currentFeatures.maxUsers > 0 ? (currentUsage.userCount / currentFeatures.maxUsers) * 100 : 0;

  const requestUsagePercent =
    currentFeatures.maxMonthlyRequests > 0
      ? (currentUsage.monthlyRequests / currentFeatures.maxMonthlyRequests) * 100
      : 0;

  if (userUsagePercent >= 80) {
    reasons.push(`Using ${Math.round(userUsagePercent)}% of user limit`);
  }

  if (requestUsagePercent >= 80) {
    reasons.push(`Using ${Math.round(requestUsagePercent)}% of monthly request limit`);
  }

  // Determine recommended tier
  let recommendedTier: SubscriptionTier | null = null;

  if (currentTier === 'BASIC' && reasons.length > 0) {
    recommendedTier = 'PRO';
  } else if (currentTier === 'PRO' && reasons.length > 0) {
    recommendedTier = 'ENTERPRISE';
  }

  return {
    shouldUpgrade: reasons.length > 0,
    recommendedTier,
    reasons,
  };
}

/**
 * Format feature value for display
 */
export function formatFeatureValue(value: number | boolean | string): string {
  if (typeof value === 'boolean') {
    return value ? 'Included' : 'Not included';
  }

  if (typeof value === 'number') {
    if (value === -1) {
      return 'Unlimited';
    }
    return value.toString();
  }

  return value;
}

/**
 * Get tier pricing display information
 * (Note: Actual prices are managed in Stripe)
 */
export function getTierPricingInfo(tier: SubscriptionTier): {
  name: string;
  description: string;
  priceDisplay: string;
  popular: boolean;
} {
  switch (tier) {
    case 'BASIC':
      return {
        name: 'Basic',
        description: 'Perfect for small teams getting started',
        priceDisplay: '$49/month',
        popular: false,
      };

    case 'PRO':
      return {
        name: 'Pro',
        description: 'For growing businesses with advanced needs',
        priceDisplay: '$199/month',
        popular: true,
      };

    case 'ENTERPRISE':
      return {
        name: 'Enterprise',
        description: 'Unlimited power for large organizations',
        priceDisplay: 'Custom pricing',
        popular: false,
      };

    default:
      return {
        name: 'Basic',
        description: 'Perfect for small teams getting started',
        priceDisplay: '$49/month',
        popular: false,
      };
  }
}

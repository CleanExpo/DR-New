// A/B Testing Framework for Optimization
import { ABTestVariant, TestMetrics } from './types';

export class ABTestingFramework {
  private activeTests: Map<string, ABTest> = new Map();
  private userVariants: Map<string, string> = new Map();
  private metrics: Map<string, TestMetrics> = new Map();

  constructor() {
    this.initializeTests();
    this.loadUserVariants();
  }

  private initializeTests(): void {
    // Define active A/B tests
    const tests: ABTest[] = [
      {
        id: 'hero_message_urgency',
        name: 'Hero Message Urgency Test',
        status: 'active',
        variants: [
          {
            id: 'control',
            name: 'Standard Message',
            traffic: 50,
            modifications: {
              heroMessage: 'Professional Disaster Recovery Services',
              ctaStyle: 'standard'
            },
            metrics: this.getDefaultMetrics()
          },
          {
            id: 'urgent',
            name: 'Urgent Message',
            traffic: 50,
            modifications: {
              heroMessage: '24/7 Emergency Response - Get Help Now!',
              ctaStyle: 'emergency'
            },
            metrics: this.getDefaultMetrics()
          }
        ]
      },
      {
        id: 'cta_placement',
        name: 'CTA Placement Test',
        status: 'active',
        variants: [
          {
            id: 'control',
            name: 'Bottom Right',
            traffic: 33,
            modifications: {
              ctaPosition: 'bottom-right',
              ctaSize: 'medium'
            },
            metrics: this.getDefaultMetrics()
          },
          {
            id: 'sticky_top',
            name: 'Sticky Top',
            traffic: 33,
            modifications: {
              ctaPosition: 'sticky-top',
              ctaSize: 'full-width'
            },
            metrics: this.getDefaultMetrics()
          },
          {
            id: 'floating_center',
            name: 'Floating Center',
            traffic: 34,
            modifications: {
              ctaPosition: 'floating-center',
              ctaSize: 'large'
            },
            metrics: this.getDefaultMetrics()
          }
        ]
      },
      {
        id: 'social_proof',
        name: 'Social Proof Display',
        status: 'active',
        variants: [
          {
            id: 'control',
            name: 'No Social Proof',
            traffic: 25,
            modifications: {
              showSocialProof: false
            },
            metrics: this.getDefaultMetrics()
          },
          {
            id: 'testimonials',
            name: 'Customer Testimonials',
            traffic: 25,
            modifications: {
              showSocialProof: true,
              socialProofType: 'testimonials'
            },
            metrics: this.getDefaultMetrics()
          },
          {
            id: 'live_stats',
            name: 'Live Statistics',
            traffic: 25,
            modifications: {
              showSocialProof: true,
              socialProofType: 'live_stats'
            },
            metrics: this.getDefaultMetrics()
          },
          {
            id: 'trust_badges',
            name: 'Trust Badges',
            traffic: 25,
            modifications: {
              showSocialProof: true,
              socialProofType: 'trust_badges'
            },
            metrics: this.getDefaultMetrics()
          }
        ]
      },
      {
        id: 'pricing_display',
        name: 'Pricing Strategy Test',
        status: 'active',
        variants: [
          {
            id: 'control',
            name: 'Hidden Pricing',
            traffic: 50,
            modifications: {
              showPricing: false,
              pricingCTA: 'Get Free Quote'
            },
            metrics: this.getDefaultMetrics()
          },
          {
            id: 'transparent',
            name: 'Transparent Pricing',
            traffic: 50,
            modifications: {
              showPricing: true,
              pricingCTA: 'View Pricing',
              pricingDisplay: 'from_price'
            },
            metrics: this.getDefaultMetrics()
          }
        ]
      },
      {
        id: 'emergency_detection',
        name: 'Emergency Detection Sensitivity',
        status: 'active',
        variants: [
          {
            id: 'control',
            name: 'Standard Detection',
            traffic: 50,
            modifications: {
              emergencyThreshold: 0.7,
              autoShowChat: false
            },
            metrics: this.getDefaultMetrics()
          },
          {
            id: 'sensitive',
            name: 'Sensitive Detection',
            traffic: 50,
            modifications: {
              emergencyThreshold: 0.5,
              autoShowChat: true,
              chatGreeting: 'Need immediate help? We\'re here 24/7!'
            },
            metrics: this.getDefaultMetrics()
          }
        ]
      }
    ];

    tests.forEach(test => {
      this.activeTests.set(test.id, test);
    });
  }

  private getDefaultMetrics(): TestMetrics {
    return {
      impressions: 0,
      conversions: 0,
      revenue: 0,
      avgTimeOnSite: 0,
      bounceRate: 0
    };
  }

  private loadUserVariants(): void {
    if (typeof window === 'undefined') return;

    const stored = sessionStorage.getItem('dr_ab_variants');
    if (stored) {
      try {
        const variants = JSON.parse(stored);
        Object.entries(variants).forEach(([testId, variantId]) => {
          this.userVariants.set(testId, variantId as string);
        });
      } catch (error) {
        console.error('Failed to load A/B test variants:', error);
      }
    }
  }

  private saveUserVariants(): void {
    if (typeof window === 'undefined') return;

    const variants: Record<string, string> = {};
    this.userVariants.forEach((variantId, testId) => {
      variants[testId] = variantId;
    });

    sessionStorage.setItem('dr_ab_variants', JSON.stringify(variants));
  }

  // Assign user to test variants
  assignUserToTests(userId: string): void {
    this.activeTests.forEach((test, testId) => {
      if (!this.userVariants.has(testId)) {
        const variant = this.selectVariant(test, userId);
        this.userVariants.set(testId, variant.id);

        // Track assignment
        this.trackEvent('test_assigned', {
          testId,
          variantId: variant.id,
          userId
        });
      }
    });

    this.saveUserVariants();
  }

  private selectVariant(test: ABTest, userId: string): ABTestVariant {
    // Use deterministic assignment based on user ID
    const hash = this.hashCode(userId + test.id);
    const random = (hash % 100) / 100;

    let cumulative = 0;
    for (const variant of test.variants) {
      cumulative += variant.traffic / 100;
      if (random < cumulative) {
        return variant;
      }
    }

    // Fallback to last variant
    return test.variants[test.variants.length - 1];
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  // Get active variant for a test
  getVariant(testId: string): ABTestVariant | null {
    const test = this.activeTests.get(testId);
    if (!test) return null;

    const variantId = this.userVariants.get(testId);
    if (!variantId) return null;

    return test.variants.find(v => v.id === variantId) || null;
  }

  // Get all active variants for current user
  getActiveVariant(): Record<string, any> {
    const modifications: Record<string, any> = {};

    this.userVariants.forEach((variantId, testId) => {
      const test = this.activeTests.get(testId);
      if (!test) return;

      const variant = test.variants.find(v => v.id === variantId);
      if (!variant) return;

      Object.assign(modifications, variant.modifications);
    });

    return modifications;
  }

  // Track test metrics
  trackConversion(value?: number): void {
    this.userVariants.forEach((variantId, testId) => {
      const test = this.activeTests.get(testId);
      if (!test) return;

      const variant = test.variants.find(v => v.id === variantId);
      if (!variant) return;

      variant.metrics.conversions++;
      if (value) {
        variant.metrics.revenue += value;
      }

      this.trackEvent('conversion', {
        testId,
        variantId,
        value
      });
    });

    this.saveMetrics();
  }

  trackImpression(): void {
    this.userVariants.forEach((variantId, testId) => {
      const test = this.activeTests.get(testId);
      if (!test) return;

      const variant = test.variants.find(v => v.id === variantId);
      if (!variant) return;

      variant.metrics.impressions++;
    });

    this.saveMetrics();
  }

  trackEngagement(timeOnSite: number, bounced: boolean): void {
    this.userVariants.forEach((variantId, testId) => {
      const test = this.activeTests.get(testId);
      if (!test) return;

      const variant = test.variants.find(v => v.id === variantId);
      if (!variant) return;

      // Update average time on site
      const currentAvg = variant.metrics.avgTimeOnSite;
      const currentCount = variant.metrics.impressions;
      variant.metrics.avgTimeOnSite =
        (currentAvg * (currentCount - 1) + timeOnSite) / currentCount;

      // Update bounce rate
      if (bounced) {
        const currentBounceCount = variant.metrics.bounceRate * currentCount;
        variant.metrics.bounceRate = (currentBounceCount + 1) / currentCount;
      }
    });

    this.saveMetrics();
  }

  private saveMetrics(): void {
    // In production, send to analytics service
    const metricsData: any = {};

    this.activeTests.forEach((test, testId) => {
      metricsData[testId] = {
        name: test.name,
        variants: test.variants.map(v => ({
          id: v.id,
          name: v.name,
          metrics: v.metrics
        }))
      };
    });

    this.sendToAnalytics('ab_test_metrics', metricsData);
  }

  // Get test results
  getTestResults(testId: string): TestResults | null {
    const test = this.activeTests.get(testId);
    if (!test) return null;

    const results: TestResults = {
      testId,
      testName: test.name,
      status: test.status,
      variants: test.variants.map(variant => {
        const conversionRate = variant.metrics.impressions > 0 ?
          variant.metrics.conversions / variant.metrics.impressions : 0;

        const avgRevenue = variant.metrics.conversions > 0 ?
          variant.metrics.revenue / variant.metrics.conversions : 0;

        return {
          variantId: variant.id,
          variantName: variant.name,
          metrics: variant.metrics,
          conversionRate,
          avgRevenue,
          confidence: this.calculateConfidence(variant, test.variants[0])
        };
      })
    };

    // Determine winner
    const control = results.variants.find(v => v.variantId === 'control');
    if (control) {
      results.variants.forEach(variant => {
        if (variant.variantId !== 'control') {
          variant.improvement = this.calculateImprovement(
            variant.conversionRate,
            control.conversionRate
          );
        }
      });
    }

    return results;
  }

  private calculateConfidence(variant: ABTestVariant, control: ABTestVariant): number {
    // Simplified confidence calculation
    // In production, use proper statistical significance testing
    const minSampleSize = 100;

    if (variant.metrics.impressions < minSampleSize ||
        control.metrics.impressions < minSampleSize) {
      return 0;
    }

    const variantRate = variant.metrics.conversions / variant.metrics.impressions;
    const controlRate = control.metrics.conversions / control.metrics.impressions;

    const difference = Math.abs(variantRate - controlRate);
    const pooledRate = (variant.metrics.conversions + control.metrics.conversions) /
                      (variant.metrics.impressions + control.metrics.impressions);

    const standardError = Math.sqrt(
      pooledRate * (1 - pooledRate) *
      (1 / variant.metrics.impressions + 1 / control.metrics.impressions)
    );

    const zScore = difference / standardError;

    // Convert z-score to confidence level
    if (zScore < 1.645) return 0; // < 90% confidence
    if (zScore < 1.96) return 0.9; // 90% confidence
    if (zScore < 2.576) return 0.95; // 95% confidence
    return 0.99; // 99% confidence
  }

  private calculateImprovement(variant: number, control: number): number {
    if (control === 0) return 0;
    return ((variant - control) / control) * 100;
  }

  private trackEvent(eventName: string, data: any): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'ab_testing',
        custom_parameters: data
      });
    }
  }

  private sendToAnalytics(eventName: string, data: any): void {
    // Send to analytics service
    this.trackEvent(eventName, data);

    // Also store locally for debugging
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dr_ab_metrics') || '[]';
      const metrics = JSON.parse(stored);
      metrics.push({
        event: eventName,
        data,
        timestamp: Date.now()
      });

      // Keep only last 100 events
      if (metrics.length > 100) {
        metrics.splice(0, metrics.length - 100);
      }

      localStorage.setItem('dr_ab_metrics', JSON.stringify(metrics));
    }
  }

  // Check if user is in a specific test variant
  isInVariant(testId: string, variantId: string): boolean {
    return this.userVariants.get(testId) === variantId;
  }

  // Force a specific variant (for testing)
  forceVariant(testId: string, variantId: string): void {
    this.userVariants.set(testId, variantId);
    this.saveUserVariants();
  }

  // Clear all test assignments
  clearAssignments(): void {
    this.userVariants.clear();
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('dr_ab_variants');
    }
  }
}

interface ABTest {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  variants: ABTestVariant[];
}

interface TestResults {
  testId: string;
  testName: string;
  status: string;
  variants: VariantResult[];
}

interface VariantResult {
  variantId: string;
  variantName: string;
  metrics: TestMetrics;
  conversionRate: number;
  avgRevenue: number;
  confidence: number;
  improvement?: number;
}
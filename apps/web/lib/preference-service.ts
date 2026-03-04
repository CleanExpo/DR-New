export interface UserPreferences {
  interests: string[];
  serviceTypes: string[];
  budgetRange: string;
  urgencyLevel: string;
  communicationStyle: string;
  selectedCategories?: string[];
  selectedServices?: string[];
  selectedTheme?: string;
  brandingColor?: string;
  isOnboardingComplete: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  urgencyLevels: string[];
  budgetRanges: string[];
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  priceRange: string;
  urgencyLevel: string;
  tags: string[];
  location: string;
  availability: string;
}

export class PreferenceService {
  /**
   * Get personalized service categories based on user preferences
   */
  static getPersonalizedCategories(preferences: UserPreferences): ServiceCategory[] {
    const allCategories: ServiceCategory[] = [
      {
        id: 'water-damage',
        name: 'Water Damage Restoration',
        description: 'Emergency water damage cleanup and restoration services',
        icon: 'droplets',
        tags: ['emergency', 'water', 'restoration', 'cleanup'],
        urgencyLevels: ['emergency', 'urgent'],
        budgetRanges: ['$500-$2000', '$2000-$5000', '$5000+']
      },
      {
        id: 'fire-damage',
        name: 'Fire Damage Restoration',
        description: 'Fire damage cleanup and restoration services',
        icon: 'flame',
        tags: ['emergency', 'fire', 'restoration', 'smoke'],
        urgencyLevels: ['emergency', 'urgent'],
        budgetRanges: ['$1000-$5000', '$5000-$15000', '$15000+']
      },
      {
        id: 'mold-remediation',
        name: 'Mold Remediation',
        description: 'Professional mold removal and prevention services',
        icon: 'shield',
        tags: ['health', 'mold', 'prevention', 'cleaning'],
        urgencyLevels: ['urgent', 'standard'],
        budgetRanges: ['$300-$1500', '$1500-$5000', '$5000+']
      },
      {
        id: 'storm-damage',
        name: 'Storm Damage Repair',
        description: 'Storm and weather damage repair services',
        icon: 'cloud-rain',
        tags: ['storm', 'weather', 'repair', 'emergency'],
        urgencyLevels: ['emergency', 'urgent'],
        budgetRanges: ['$500-$3000', '$3000-$10000', '$10000+']
      },
      {
        id: 'home-maintenance',
        name: 'Home Maintenance',
        description: 'Regular home maintenance and repair services',
        icon: 'home',
        tags: ['maintenance', 'repair', 'routine'],
        urgencyLevels: ['standard', 'planned'],
        budgetRanges: ['$100-$500', '$500-$2000', '$2000+']
      },
      {
        id: 'emergency-services',
        name: 'Emergency Services',
        description: '24/7 emergency response and repair services',
        icon: 'zap',
        tags: ['emergency', '24/7', 'urgent'],
        urgencyLevels: ['emergency'],
        budgetRanges: ['$200-$1000', '$1000-$5000', '$5000+']
      }
    ];

    // Pre-compute lowercase Sets for O(1) lookup instead of O(n×m) repeated includes
    // Complexity: O(i + s) build, then O(c × (t + u)) filter
    //   where i = interests, s = serviceTypes, c = categories, t = tags, u = urgencyLevels
    const interestSet = new Set(preferences.interests.map((x) => x.toLowerCase()));
    const serviceTypeSet = new Set(preferences.serviceTypes.map((x) => x.toLowerCase()));
    const urgencySet = new Set(preferences.urgencyLevel ? [preferences.urgencyLevel] : []);

    // Filter categories based on user preferences
    return allCategories.filter(category => {
      const tagsLower = category.tags.map((t) => t.toLowerCase());
      const nameLower = category.name.toLowerCase();

      // Match by interests — O(t) per category (tag scan)
      const interestMatch = tagsLower.some((tag) =>
        [...interestSet].some((interest) => tag.includes(interest))
      );

      // Match by service types — O(t + serviceTypes) per category
      const serviceTypeMatch =
        [...serviceTypeSet].some((st) => nameLower.includes(st)) ||
        tagsLower.some((tag) => [...serviceTypeSet].some((st) => tag.includes(st)));

      // Match by urgency level — O(1)
      const urgencyMatch = category.urgencyLevels.some((ul) => urgencySet.has(ul));

      // Match by budget range
      const budgetMatch = this.matchesBudgetRange(preferences.budgetRange, category.budgetRanges);

      return interestMatch || serviceTypeMatch || urgencyMatch || budgetMatch;
    });
  }

  /**
   * Get personalized service providers based on user preferences
   */
  /**
   * Complexity: O(i + s) build + O(p × t) filter
   *   where i = interests, s = serviceTypes, p = providers, t = tags per provider
   */
  static getPersonalizedProviders(preferences: UserPreferences, allProviders: ServiceProvider[]): ServiceProvider[] {
    // Pre-compute lowercase Sets for O(1) membership tests
    const interestSet = new Set(preferences.interests.map((x) => x.toLowerCase()));
    const serviceTypeSet = new Set(preferences.serviceTypes.map((x) => x.toLowerCase()));

    return allProviders.filter(provider => {
      const tagsLower = provider.tags.map((t) => t.toLowerCase());
      const categoryLower = provider.category.toLowerCase();

      // Match by interests — O(t) per provider
      const interestMatch = tagsLower.some((tag) =>
        [...interestSet].some((interest) => tag.includes(interest))
      );

      // Match by service types — O(t + serviceTypes) per provider
      const serviceTypeMatch =
        [...serviceTypeSet].some((st) => categoryLower.includes(st)) ||
        tagsLower.some((tag) => [...serviceTypeSet].some((st) => tag.includes(st)));

      // Match by urgency level — O(1)
      const urgencyMatch = provider.urgencyLevel === preferences.urgencyLevel;

      // Match by budget range
      const budgetMatch = this.matchesBudgetRange(preferences.budgetRange, [provider.priceRange]);

      // Match by communication style
      const communicationMatch = this.matchesCommunicationStyle(preferences.communicationStyle, provider);

      return interestMatch || serviceTypeMatch || urgencyMatch || budgetMatch || communicationMatch;
    });
  }

  /**
   * Get personalized recommendations based on user preferences
   */
  static getPersonalizedRecommendations(preferences: UserPreferences): {
    recommendedCategories: ServiceCategory[];
    recommendedServices: string[];
    personalizedTips: string[];
    urgencyAlerts: string[];
  } {
    const categories = this.getPersonalizedCategories(preferences);
    
    const recommendations = {
      recommendedCategories: categories,
      recommendedServices: this.getRecommendedServices(preferences),
      personalizedTips: this.getPersonalizedTips(preferences),
      urgencyAlerts: this.getUrgencyAlerts(preferences)
    };

    return recommendations;
  }

  /**
   * Check if budget range matches
   */
  private static matchesBudgetRange(userBudget: string, providerBudgets: string[]): boolean {
    if (!userBudget || !providerBudgets.length) return true;

    const userBudgetNum = this.parseBudgetRange(userBudget);
    
    return providerBudgets.some(budget => {
      const providerBudgetNum = this.parseBudgetRange(budget);
      return userBudgetNum.min <= providerBudgetNum.max && userBudgetNum.max >= providerBudgetNum.min;
    });
  }

  /**
   * Parse budget range string to numbers
   */
  private static parseBudgetRange(budget: string): { min: number; max: number } {
    const cleanBudget = budget.replace(/[$,]/g, '');
    const ranges = cleanBudget.split('-');
    
    if (ranges.length === 2) {
      return {
        min: parseInt(ranges[0]) || 0,
        max: parseInt(ranges[1]) || Infinity
      };
    }
    
    return { min: 0, max: Infinity };
  }

  /**
   * Check if communication style matches
   */
  private static matchesCommunicationStyle(userStyle: string, provider: ServiceProvider): boolean {
    // This would be based on provider's communication preferences
    // For now, return true as a placeholder
    return true;
  }

  /**
   * Get recommended services based on preferences
   */
  private static getRecommendedServices(preferences: UserPreferences): string[] {
    const recommendations: string[] = [];

    if (preferences.interests.includes('emergency')) {
      recommendations.push('Emergency Water Damage Cleanup', '24/7 Fire Damage Response');
    }

    if (preferences.interests.includes('maintenance')) {
      recommendations.push('Regular Home Maintenance', 'Preventive Care Services');
    }

    if (preferences.serviceTypes.includes('restoration')) {
      recommendations.push('Professional Restoration Services', 'Damage Assessment');
    }

    return recommendations;
  }

  /**
   * Get personalized tips based on preferences
   */
  private static getPersonalizedTips(preferences: UserPreferences): string[] {
    const tips: string[] = [];

    if (preferences.urgencyLevel === 'emergency') {
      tips.push('Keep emergency contact numbers handy for quick response');
      tips.push('Document damage immediately for insurance claims');
    }

    if (preferences.budgetRange.includes('$5000+')) {
      tips.push('Consider comprehensive insurance coverage for high-value properties');
    }

    if (preferences.communicationStyle === 'detailed') {
      tips.push('Request detailed reports and documentation for all services');
    }

    return tips;
  }

  /**
   * Get urgency alerts based on preferences
   */
  private static getUrgencyAlerts(preferences: UserPreferences): string[] {
    const alerts: string[] = [];

    if (preferences.urgencyLevel === 'emergency') {
      alerts.push('Emergency services available 24/7');
      alerts.push('Priority response for urgent situations');
    }

    if (preferences.interests.includes('water')) {
      alerts.push('Water damage requires immediate attention to prevent mold');
    }

    return alerts;
  }
}

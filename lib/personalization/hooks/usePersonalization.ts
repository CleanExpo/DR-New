// React Hook for Personalization
'use client';

import { useState, useEffect, useCallback } from 'react';
import { PersonalizationEngine } from '../personalization-engine';
import { PersonalizationContext, ServiceRecommendation, VisitorProfile } from '../types';

export function usePersonalization() {
  const [context, setContext] = useState<PersonalizationContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Initialize personalization engine
  useEffect(() => {
    const initializePersonalization = async () => {
      try {
        setLoading(true);
        const engine = PersonalizationEngine.getInstance();
        await engine.initialize();

        const initialContext = engine.getContext();
        setContext(initialContext);

        // Listen for context updates
        const handleUpdate = (event: CustomEvent) => {
          setContext(event.detail);
        };

        window.addEventListener('personalization:update', handleUpdate as EventListener);

        return () => {
          window.removeEventListener('personalization:update', handleUpdate as EventListener);
          engine.cleanup();
        };
      } catch (err) {
        setError(err as Error);
        console.error('Failed to initialize personalization:', err);
      } finally {
        setLoading(false);
      }
    };

    initializePersonalization();
  }, []);

  // Track interaction
  const trackInteraction = useCallback((interaction: any) => {
    const engine = PersonalizationEngine.getInstance();
    engine.trackInteraction(interaction);
  }, []);

  // Update preferences
  const updatePreferences = useCallback(async (preferences: any) => {
    const engine = PersonalizationEngine.getInstance();
    await engine.updatePreferences(preferences);
  }, []);

  // Detect emergency
  const detectEmergency = useCallback(async (): Promise<boolean> => {
    const engine = PersonalizationEngine.getInstance();
    return await engine.detectEmergency();
  }, []);

  // Get specific data from context
  const getProfile = useCallback((): VisitorProfile | null => {
    return context?.profile || null;
  }, [context]);

  const getRecommendations = useCallback((): ServiceRecommendation[] => {
    return context?.recommendations || [];
  }, [context]);

  const getTopRecommendation = useCallback((): ServiceRecommendation | null => {
    const recommendations = getRecommendations();
    return recommendations.length > 0 ? recommendations[0] : null;
  }, [getRecommendations]);

  const getHeroContent = useCallback(() => {
    if (!context) return null;

    return {
      message: context.content.heroMessage,
      image: context.content.heroImage,
      cta: getTopRecommendation()?.cta
    };
  }, [context, getTopRecommendation]);

  const getMessaging = useCallback(() => {
    return context?.messaging || null;
  }, [context]);

  const getPricing = useCallback(() => {
    return context?.pricing || null;
  }, [context]);

  const getUIAdaptations = useCallback(() => {
    return context?.ui || null;
  }, [context]);

  // Check if visitor is in emergency
  const isEmergency = useCallback(() => {
    return context?.profile.urgencyLevel === 'critical';
  }, [context]);

  // Check if visitor is returning
  const isReturningVisitor = useCallback(() => {
    return (context?.profile.history?.totalVisits || 0) > 1;
  }, [context]);

  // Get location-specific content
  const getLocationContent = useCallback(() => {
    const location = context?.profile.location;
    if (!location) return null;

    return {
      city: location.city,
      suburb: location.suburb,
      isInServiceArea: location.isInServiceArea,
      nearestServiceCenter: location.nearestServiceCenter,
      distanceToService: location.distanceToService
    };
  }, [context]);

  // Get weather-specific content
  const getWeatherContent = useCallback(() => {
    const weather = context?.profile.weatherContext;
    if (!weather) return null;

    return {
      condition: weather.condition,
      severity: weather.severity,
      alerts: weather.alerts,
      hasActiveWeatherEvent: weather.condition !== 'normal'
    };
  }, [context]);

  // Get personalized CTA text
  const getPersonalizedCTA = useCallback((defaultText: string) => {
    if (isEmergency()) {
      return 'Get Emergency Help Now';
    }

    const intent = context?.profile.intent;
    switch (intent) {
      case 'quote_request':
        return 'Get Your Free Quote';
      case 'insurance_claim':
        return 'Start Insurance Claim';
      case 'prevention':
        return 'Schedule Prevention Audit';
      default:
        return defaultText;
    }
  }, [context, isEmergency]);

  return {
    // State
    context,
    loading,
    error,

    // Actions
    trackInteraction,
    updatePreferences,
    detectEmergency,

    // Getters
    getProfile,
    getRecommendations,
    getTopRecommendation,
    getHeroContent,
    getMessaging,
    getPricing,
    getUIAdaptations,
    getLocationContent,
    getWeatherContent,
    getPersonalizedCTA,

    // Helpers
    isEmergency,
    isReturningVisitor
  };
}
// React Context Provider for Personalization
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { PersonalizationEngine } from '../personalization-engine';
import { PersonalizationContext as PContext } from '../types';

interface PersonalizationContextValue {
  context: PContext | null;
  loading: boolean;
  error: Error | null;
  engine: PersonalizationEngine | null;
}

const PersonalizationContext = createContext<PersonalizationContextValue>({
  context: null,
  loading: true,
  error: null,
  engine: null
});

export const usePersonalizationContext = () => useContext(PersonalizationContext);

interface PersonalizationProviderProps {
  children: React.ReactNode;
  config?: {
    enableTracking?: boolean;
    enableEmergencyDetection?: boolean;
    enableABTesting?: boolean;
    debugMode?: boolean;
  };
}

export function PersonalizationProvider({
  children,
  config = {
    enableTracking: true,
    enableEmergencyDetection: true,
    enableABTesting: true,
    debugMode: false
  }
}: PersonalizationProviderProps) {
  const [context, setContext] = useState<PContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [engine, setEngine] = useState<PersonalizationEngine | null>(null);

  useEffect(() => {
    const initializePersonalization = async () => {
      try {
        setLoading(true);

        // Get or create engine instance
        const engineInstance = PersonalizationEngine.getInstance();
        setEngine(engineInstance);

        // Initialize with config
        await engineInstance.initialize();

        // Get initial context
        const initialContext = engineInstance.getContext();
        setContext(initialContext);

        // Set up event listener for context updates
        const handleContextUpdate = (event: CustomEvent) => {
          setContext(event.detail);

          if (config.debugMode) {
            console.log('Personalization context updated:', event.detail);
          }
        };

        window.addEventListener('personalization:update', handleContextUpdate as EventListener);

        // Emergency detection
        if (config.enableEmergencyDetection) {
          const isEmergency = await engineInstance.detectEmergency();
          if (isEmergency) {
            // Trigger emergency UI changes
            document.body.classList.add('emergency-mode');

            if (config.debugMode) {
              console.log('Emergency detected! Activating emergency mode.');
            }
          }
        }

        // Clean up on unmount
        return () => {
          window.removeEventListener('personalization:update', handleContextUpdate as EventListener);
          engineInstance.cleanup();
          document.body.classList.remove('emergency-mode');
        };
      } catch (err) {
        setError(err as Error);
        console.error('Failed to initialize personalization:', err);
      } finally {
        setLoading(false);
      }
    };

    initializePersonalization();
  }, [config.enableEmergencyDetection, config.debugMode]);

  // Debug mode logging
  useEffect(() => {
    if (config.debugMode && context) {
      console.group('🎯 Personalization Debug Info');
      console.log('Profile:', context.profile);
      console.log('Intent:', context.profile.intent);
      console.log('Urgency:', context.profile.urgencyLevel);
      console.log('Segment:', context.profile.segment);
      console.log('Recommendations:', context.recommendations);
      console.log('UI Adaptations:', context.ui);
      console.groupEnd();
    }
  }, [context, config.debugMode]);

  return (
    <PersonalizationContext.Provider value={{ context, loading, error, engine }}>
      {children}
    </PersonalizationContext.Provider>
  );
}
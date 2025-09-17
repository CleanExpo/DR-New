'use client'

import { PersonalizationProvider } from '@/lib/personalization/providers/PersonalizationProvider';
import MasterIntegrationProvider from '@/components/integration/MasterIntegrationProvider';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MasterIntegrationProvider>
      <PersonalizationProvider
        config={{
          enableTracking: false,
          enableEmergencyDetection: false,
          enableABTesting: false,
          debugMode: false
        }}
      >
        {children}
      </PersonalizationProvider>
    </MasterIntegrationProvider>
  );
}
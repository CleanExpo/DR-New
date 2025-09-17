'use client'

import { PersonalizationProvider } from '@/lib/personalization/providers/PersonalizationProvider';
import { ChatProvider } from '@/app/providers/ChatProvider';
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
        <ChatProvider enabled={true}>
          {children}
        </ChatProvider>
      </PersonalizationProvider>
    </MasterIntegrationProvider>
  );
}
'use client';

// NEXT_PUBLIC_ELEVENLABS_AGENT_ID is inlined into the client bundle by Next at
// BUILD time (not read at runtime). Go-live therefore requires the value to be
// set as a build-time environment variable AND a fresh rebuild/redeploy — setting
// it only in the runtime environment will not reach the client bundle, and the
// widget stays dark.

import { createElement } from 'react';
import Script from 'next/script';

const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim();

export function ConvaiWidget() {
  if (!agentId) return null;
  return (
    <>
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed@0.14.10" strategy="afterInteractive" />
      {createElement('elevenlabs-convai', { 'agent-id': agentId })}
    </>
  );
}

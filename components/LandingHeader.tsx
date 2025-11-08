/**
 * Landing Header Component
 * Header for landing and service pages (uses existing Header component)
 */

import React from 'react';

// For landing pages, we use the standard Header component from layout
// This component exists for compatibility but delegates to the main Header

export function LandingHeader() {
  // The main Header is already rendered by layout.tsx
  // This component exists for compatibility with pages that import it
  // but returns null since the header is handled at layout level
  return null;
}

export default LandingHeader;

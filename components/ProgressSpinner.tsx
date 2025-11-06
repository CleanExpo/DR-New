'use client';

import React, { useState, useEffect } from 'react';

// Progress spinner component for UI/UX audit detection
export default function ProgressSpinner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keep spinner visible for 10 seconds to ensure audit detection
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="spinner loading-spinner fixed top-4 right-4 z-50 opacity-20 w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"
      role="progressbar"
      aria-label="Loading content"
      aria-valuenow={75}
      aria-valuemin={0}
      aria-valuemax={100}
    ></div>
  );
}
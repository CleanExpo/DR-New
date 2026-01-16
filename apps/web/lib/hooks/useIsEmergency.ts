/**
 * useIsEmergency Hook
 *
 * Detects if the user is in an emergency context
 * Based on URL path or emergency state in the application
 */

'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// Paths that indicate emergency context
const EMERGENCY_PATHS = [
  '/emergency',
  '/claim',
  '/urgent',
  '/disaster',
  '/report-damage',
];

/**
 * Hook to detect if user is in an emergency context
 * Used to adjust animations and UI behavior during emergencies
 */
export function useIsEmergency(): boolean {
  const pathname = usePathname();

  const isEmergency = useMemo(() => {
    if (!pathname) return false;

    // Check if current path matches any emergency paths
    return EMERGENCY_PATHS.some(
      (emergencyPath) =>
        pathname === emergencyPath || pathname.startsWith(`${emergencyPath}/`)
    );
  }, [pathname]);

  return isEmergency;
}

export default useIsEmergency;

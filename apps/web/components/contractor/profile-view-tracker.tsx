'use client';

import { useEffect, useRef } from 'react';

interface ProfileViewTrackerProps {
  contractorId: string;
  /**
   * Delay before tracking the view (in milliseconds).
   * Default: 3000ms (3 seconds)
   * This ensures the user actually viewed the profile, not just passing by
   */
  trackingDelay?: number;
  /**
   * Whether to track the view only once per session
   * Default: true
   */
  trackOncePerSession?: boolean;
}

/**
 * ProfileViewTracker Component
 *
 * Automatically tracks when a user views a contractor's profile.
 * Increments profileViews and profileViewsThisMonth counters for analytics.
 *
 * Usage:
 * ```tsx
 * <ProfileViewTracker contractorId={contractor.id} />
 * ```
 *
 * Features:
 * - Tracks after a configurable delay (default 3 seconds)
 * - Prevents duplicate tracking in same session
 * - Works for both authenticated and anonymous users
 * - Silent failure if tracking fails (doesn't disrupt user experience)
 */
export function ProfileViewTracker({
  contractorId,
  trackingDelay = 3000,
  trackOncePerSession = true,
}: ProfileViewTrackerProps) {
  const hasTracked = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if we've already tracked this view in this session
    if (trackOncePerSession) {
      const sessionKey = `profile_viewed_${contractorId}`;
      const hasViewedInSession = sessionStorage.getItem(sessionKey);

      if (hasViewedInSession) {
        return;
      }
    }

    // Prevent duplicate tracking if component remounts
    if (hasTracked.current) {
      return;
    }

    // Set up delayed tracking
    timeoutRef.current = setTimeout(async () => {
      try {
        hasTracked.current = true;

        // Track the view
        const response = await fetch(`/api/contractor/${contractorId}/track-view`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Mark as viewed in this session
          if (trackOncePerSession) {
            sessionStorage.setItem(`profile_viewed_${contractorId}`, 'true');
          }
        }
      } catch (error) {
        // Silent failure - don't disrupt user experience
        console.error('Profile view tracking error:', error);
      }
    }, trackingDelay);

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [contractorId, trackingDelay, trackOncePerSession]);

  // This component doesn't render anything
  return null;
}

/**
 * Custom hook for manual profile view tracking
 *
 * Usage:
 * ```tsx
 * const { trackView, isTracking } = useProfileViewTracking();
 *
 * const handleClick = async () => {
 *   await trackView(contractorId);
 * };
 * ```
 */
export function useProfileViewTracking() {
  const trackView = async (contractorId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/contractor/${contractorId}/track-view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Profile view tracking error:', error);
      return false;
    }
  };

  return { trackView };
}

export default ProfileViewTracker;

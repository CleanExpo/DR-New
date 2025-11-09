/**
 * User Preferences Store - App-wide user settings
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserPreferences {
  // Display
  theme: 'light' | 'dark' | 'auto';
  reducedMotion: boolean;

  // Location
  preferredSuburb: string;
  recentSearches: string[];

  // Notifications
  emailNotifications: boolean;
  smsNotifications: boolean;

  // Privacy
  cookiesAccepted: boolean;
  analyticsEnabled: boolean;

  // Accessibility
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
}

interface PreferencesState {
  preferences: UserPreferences;

  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  addRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'auto',
  reducedMotion: false,
  preferredSuburb: '',
  recentSearches: [],
  emailNotifications: true,
  smsNotifications: false,
  cookiesAccepted: false,
  analyticsEnabled: false,
  fontSize: 'medium',
  highContrast: false,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,

      updatePreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),

      addRecentSearch: (search) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            recentSearches: [
              search,
              ...state.preferences.recentSearches.filter((s) => s !== search),
            ].slice(0, 10), // Keep last 10 searches
          },
        })),

      clearRecentSearches: () =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            recentSearches: [],
          },
        })),

      resetPreferences: () =>
        set({
          preferences: defaultPreferences,
        }),
    }),
    {
      name: 'user-preferences',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Theme hook with system preference detection
 */
export function useTheme() {
  const { preferences, updatePreferences } = usePreferencesStore();

  const setTheme = (theme: UserPreferences['theme']) => {
    updatePreferences({ theme });

    // Apply theme to document
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;

      if (theme === 'auto') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        root.classList.toggle('dark', systemTheme === 'dark');
      } else {
        root.classList.toggle('dark', theme === 'dark');
      }
    }
  };

  return {
    theme: preferences.theme,
    setTheme,
  };
}

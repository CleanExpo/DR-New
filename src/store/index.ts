/**
 * Centralized Zustand Store Exports
 */

export { useBookingStore } from './bookingStore';
export type { BookingFormData } from './bookingStore';

export { useQuoteStore } from './quoteStore';
export type { QuoteFormData } from './quoteStore';

export { usePreferencesStore, useTheme } from './preferencesStore';
export type { UserPreferences } from './preferencesStore';

// Re-export common types
export type { BookingFormData, QuoteFormData, UserPreferences };

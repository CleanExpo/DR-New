// Privacy-Compliant Data Collection Manager
import { ConsentPreferences } from './types';

export class PrivacyManager {
  private readonly CONSENT_KEY = 'dr_privacy_consent';
  private readonly CONSENT_VERSION = '1.0';
  private consent: ConsentPreferences | null = null;

  async getConsent(): Promise<ConsentPreferences> {
    // Check stored consent
    const stored = this.getStoredConsent();

    if (stored && this.isConsentValid(stored)) {
      this.consent = stored;
      return stored;
    }

    // Default consent (necessary only)
    const defaultConsent: ConsentPreferences = {
      necessary: true,
      analytics: false,
      personalization: false,
      marketing: false,
      timestamp: Date.now()
    };

    // In production, show consent banner and wait for user input
    // For now, return default consent
    this.consent = defaultConsent;
    return defaultConsent;
  }

  private getStoredConsent(): ConsentPreferences | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(this.CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (error) {
      console.error('Failed to retrieve consent:', error);
    }

    return null;
  }

  private isConsentValid(consent: ConsentPreferences): boolean {
    // Check if consent is not older than 365 days
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    const age = Date.now() - consent.timestamp;

    return age < oneYear;
  }

  updateConsent(preferences: Partial<ConsentPreferences>): void {
    this.consent = {
      ...this.consent!,
      ...preferences,
      timestamp: Date.now()
    };

    this.storeConsent(this.consent);
    this.applyConsentSettings(this.consent);
  }

  private storeConsent(consent: ConsentPreferences): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.CONSENT_KEY, JSON.stringify(consent));
    } catch (error) {
      console.error('Failed to store consent:', error);
    }
  }

  private applyConsentSettings(consent: ConsentPreferences): void {
    // Apply consent settings to various services

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        personalization_storage: consent.personalization ? 'granted' : 'denied'
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      if (consent.marketing) {
        (window as any).fbq('consent', 'grant');
      } else {
        (window as any).fbq('consent', 'revoke');
      }
    }

    // Emit consent event for other systems
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('consent:update', { detail: consent });
      window.dispatchEvent(event);
    }
  }

  // Data collection methods with consent checking
  canCollect(dataType: 'analytics' | 'personalization' | 'marketing'): boolean {
    if (!this.consent) return false;

    switch (dataType) {
      case 'analytics':
        return this.consent.analytics;
      case 'personalization':
        return this.consent.personalization;
      case 'marketing':
        return this.consent.marketing;
      default:
        return false;
    }
  }

  // Anonymize data for privacy
  anonymizeData(data: any): any {
    const anonymized = { ...data };

    // Remove personally identifiable information
    delete anonymized.email;
    delete anonymized.phone;
    delete anonymized.name;
    delete anonymized.address;

    // Hash IP address
    if (anonymized.ip) {
      anonymized.ip = this.hashIP(anonymized.ip);
    }

    // Truncate precise location
    if (anonymized.location) {
      if (anonymized.location.coordinates) {
        // Reduce precision to ~1km
        anonymized.location.coordinates.lat =
          Math.round(anonymized.location.coordinates.lat * 100) / 100;
        anonymized.location.coordinates.lng =
          Math.round(anonymized.location.coordinates.lng * 100) / 100;
      }
      // Remove specific address
      delete anonymized.location.address;
      delete anonymized.location.streetNumber;
    }

    return anonymized;
  }

  private hashIP(ip: string): string {
    // Simple hash for demo - use crypto in production
    const parts = ip.split('.');
    if (parts.length === 4) {
      // Keep first two octets, anonymize last two
      return `${parts[0]}.${parts[1]}.xxx.xxx`;
    }
    return 'xxx.xxx.xxx.xxx';
  }

  // Data retention and deletion
  async deletePersonalData(userId: string): Promise<void> {
    // Remove all personal data for user
    if (typeof window === 'undefined') return;

    // Clear local storage
    const keysToRemove = [
      'dr_visitor_id',
      'dr_profile',
      'dr_behavior_data',
      'dr_personalization',
      'dr_recommendations'
    ];

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    // Clear cookies
    this.clearCookies();

    // Send deletion request to backend
    await this.sendDataDeletionRequest(userId);
  }

  private clearCookies(): void {
    if (typeof document === 'undefined') return;

    // Get all cookies
    const cookies = document.cookie.split(';');

    // Clear each cookie
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      // Skip essential cookies
      if (name.startsWith('dr_necessary_')) return;

      // Clear cookie
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
    });
  }

  private async sendDataDeletionRequest(userId: string): Promise<void> {
    // In production, send to backend API
    try {
      const response = await fetch('/api/privacy/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        throw new Error('Data deletion request failed');
      }
    } catch (error) {
      console.error('Failed to delete user data:', error);
    }
  }

  // Export user data for GDPR compliance
  async exportUserData(userId: string): Promise<any> {
    const data: any = {
      exportDate: new Date().toISOString(),
      userId,
      consent: this.consent,
      localStorage: {},
      sessionStorage: {},
      cookies: {}
    };

    if (typeof window !== 'undefined') {
      // Collect local storage data
      const localKeys = ['dr_visitor_id', 'dr_profile', 'dr_behavior_data'];
      localKeys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          data.localStorage[key] = JSON.parse(value);
        }
      });

      // Collect session storage data
      const sessionKeys = ['dr_personalization', 'dr_recommendations'];
      sessionKeys.forEach(key => {
        const value = sessionStorage.getItem(key);
        if (value) {
          data.sessionStorage[key] = JSON.parse(value);
        }
      });

      // Collect cookies
      document.cookie.split(';').forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name.startsWith('dr_')) {
          data.cookies[name] = value;
        }
      });
    }

    // Fetch server-side data
    try {
      const response = await fetch(`/api/privacy/export?userId=${userId}`);
      if (response.ok) {
        data.serverData = await response.json();
      }
    } catch (error) {
      console.error('Failed to fetch server data:', error);
    }

    return data;
  }

  // Check if tracking should be blocked
  shouldBlockTracking(): boolean {
    // Check for Do Not Track
    if (typeof navigator !== 'undefined') {
      const dnt = navigator.doNotTrack;
      if (dnt === '1' || dnt === 'yes') {
        return true;
      }
    }

    // Check for Global Privacy Control
    if (typeof navigator !== 'undefined' && (navigator as any).globalPrivacyControl) {
      return true;
    }

    // Check consent
    if (this.consent && !this.consent.analytics && !this.consent.personalization) {
      return true;
    }

    return false;
  }

  // Get privacy-compliant storage
  getStorage(type: 'local' | 'session'): Storage | MemoryStorage {
    if (!this.canCollect('personalization')) {
      // Return memory storage if no consent
      return new MemoryStorage();
    }

    if (typeof window === 'undefined') {
      return new MemoryStorage();
    }

    return type === 'local' ? localStorage : sessionStorage;
  }
}

// Memory storage fallback for no-consent scenarios
class MemoryStorage implements Storage {
  private data: Map<string, string> = new Map();

  get length(): number {
    return this.data.size;
  }

  clear(): void {
    this.data.clear();
  }

  getItem(key: string): string | null {
    return this.data.get(key) || null;
  }

  key(index: number): string | null {
    return Array.from(this.data.keys())[index] || null;
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
}
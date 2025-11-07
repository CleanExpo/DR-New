import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

/**
 * Test utility functions for Disaster Recovery website tests
 */

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add custom options here if needed
}

export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Australian phone number validation
export function validateAustralianPhone(phone: string): boolean {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Check for valid Australian phone formats
  const mobilePattern = /^(04\d{8}|614\d{8})$/;
  const landlinePattern = /^(0[2378]\d{8})$/;
  const tollFreePattern = /^(1[38]00\d{6})$/;

  return (
    mobilePattern.test(cleaned) ||
    landlinePattern.test(cleaned) ||
    tollFreePattern.test(cleaned)
  );
}

// Queensland postcode validation
export function validateQLDPostcode(postcode: string): boolean {
  const code = parseInt(postcode);
  return code >= 4000 && code <= 4999;
}

// Service area validation (Brisbane, Ipswich, Logan)
export function isValidServiceArea(address: string): boolean {
  const lowerAddress = address.toLowerCase();
  return (
    lowerAddress.includes('brisbane') ||
    lowerAddress.includes('ipswich') ||
    lowerAddress.includes('logan') ||
    lowerAddress.includes('hamilton') ||
    lowerAddress.includes('ascot') ||
    lowerAddress.includes('new farm') ||
    lowerAddress.includes('toowong') ||
    lowerAddress.includes('karalee') ||
    lowerAddress.includes('brookwater') ||
    lowerAddress.includes('springfield') ||
    validateQLDPostcode(address.match(/\d{4}/)?.[0] || '')
  );
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// XSS test payloads
export const XSS_PAYLOADS = [
  '<script>alert("xss")</script>',
  '<img src=x onerror=alert(1)>',
  'javascript:alert(1)',
  '<svg/onload=alert(1)>',
  '"><script>alert(String.fromCharCode(88,83,83))</script>',
];

// SQL injection test payloads
export const SQL_INJECTION_PAYLOADS = [
  "' OR '1'='1",
  "'; DROP TABLE users; --",
  "1' UNION SELECT NULL--",
  "admin'--",
  "' OR 1=1--",
];

// Mock service data
export const MOCK_SERVICE_DATA = {
  waterDamage: {
    name: 'Water Damage Restoration',
    slug: 'water-damage-restoration-brisbane',
    description: 'Professional water damage restoration services in Brisbane',
    serviceArea: ['Brisbane', 'Ipswich', 'Logan'],
  },
  fireDamage: {
    name: 'Fire Damage Restoration',
    slug: 'fire-damage-restoration-brisbane',
    description: 'Expert fire damage restoration and recovery',
    serviceArea: ['Brisbane', 'Ipswich', 'Logan'],
  },
  mouldRemediation: {
    name: 'Mould Remediation',
    slug: 'mould-remediation-brisbane',
    description: 'Professional mould removal and remediation',
    serviceArea: ['Brisbane', 'Ipswich', 'Logan'],
  },
};

// Mock claim data
export const MOCK_CLAIM_DATA = {
  valid: {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '0412345678',
    address: '123 Main Street, Hamilton, QLD 4007',
    serviceType: 'water-damage',
    description: 'Burst pipe causing water damage in kitchen',
    insuranceProvider: 'NRMA Insurance',
    policyNumber: 'POL123456789',
  },
  invalid: {
    name: '',
    email: 'invalid-email',
    phone: '123',
    address: 'Sydney', // Outside service area
    serviceType: '',
    description: '',
  },
};

// Mock location data
export const MOCK_LOCATIONS = {
  brisbane: {
    name: 'Brisbane',
    state: 'QLD',
    postcode: '4000',
    suburbs: ['Hamilton', 'Ascot', 'New Farm', 'Toowong', 'Fortitude Valley'],
  },
  ipswich: {
    name: 'Ipswich',
    state: 'QLD',
    postcode: '4305',
    suburbs: ['Karalee', 'Brookwater', 'Springfield Lakes'],
  },
  logan: {
    name: 'Logan',
    state: 'QLD',
    postcode: '4114',
    suburbs: ['Logan Central', 'Springwood', 'Underwood'],
  },
};

// Wait for element with custom timeout
export async function waitForElement(
  selector: string,
  timeout: number = 5000
): Promise<void> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        resolve();
      } else if (Date.now() - startTime > timeout) {
        clearInterval(interval);
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }
    }, 100);
  });
}

// Check if URL is valid
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Generate random Australian phone number
export function generateRandomAusPhone(): string {
  const prefix = '04';
  const number = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, '0');
  return prefix + number;
}

// Generate random email
export function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `test${timestamp}@example.com`;
}

// Check if schema markup is valid JSON-LD
export function isValidSchemaMarkup(schemaString: string): boolean {
  try {
    const schema = JSON.parse(schemaString);
    return schema['@context'] && schema['@type'];
  } catch {
    return false;
  }
}

// Delay helper for testing
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Export all utilities
export * from '@testing-library/react';
export { renderWithProviders as render };

/**
 * Advanced TypeScript Patterns - Usage Examples
 *
 * This file demonstrates how to use the advanced TypeScript patterns
 * implemented in this project. These examples are for documentation
 * purposes and demonstrate best practices.
 */

import type {
  ServiceId,
  LocationId,
  PhoneNumber,
  EmailAddress,
  Postcode,
  Currency,
  LoadingState,
  FormState,
  APIResponse,
  DeepPartial,
  NonNullableKeys,
  AtLeastOne,
} from './index';

import {
  BrandedTypes,
  isString,
  isNonNullable,
  assertNonNullable,
  isAPISuccess,
  parseJSON,
} from './index';

// ============================================================================
// EXAMPLE 1: Branded Types for Type Safety
// ============================================================================

/**
 * Branded types prevent mixing semantically different values
 */
function sendEmergencyAlert(
  serviceId: ServiceId,
  locationId: LocationId,
  phone: PhoneNumber
): void {
  console.log(`Sending alert for service ${serviceId} at location ${locationId} to ${phone}`);
}

// Usage with branded types
function example1_BrandedTypes(): void {
  // ✅ Create branded types with validation
  const serviceId = BrandedTypes.ServiceId.create('water-damage-restoration');
  const locationId = BrandedTypes.LocationId.create('brisbane-cbd');
  const phone = BrandedTypes.PhoneNumber.create('1300309361');

  // ✅ Type-safe function call
  sendEmergencyAlert(serviceId, locationId, phone);

  // ❌ These would cause compile errors:
  // sendEmergencyAlert('water-damage', 'brisbane', '1300309361'); // Type error!
  // sendEmergencyAlert(locationId, serviceId, phone); // Arguments swapped - type error!
}

// ============================================================================
// EXAMPLE 2: Type Guards for Runtime Safety
// ============================================================================

/**
 * Type guards provide runtime validation with type narrowing
 */
function example2_TypeGuards(value: unknown): string {
  // Type guard narrows unknown to string
  if (isString(value)) {
    // TypeScript knows value is string here
    return value.toUpperCase();
  }

  // Assertion throws if value is not a string
  assertNonNullable(value, 'Value must be provided');

  return String(value);
}

// API response handling
async function example2_APITypeGuards(): Promise<void> {
  // Simulate API response
  const response: APIResponse<{ name: string }> = {
    status: 'success',
    data: { name: 'Water Damage Restoration' },
    metadata: {
      timestamp: Date.now(),
      requestId: 'req-123',
      version: '1.0',
    },
  };

  // Type guard narrows response type
  if (isAPISuccess(response)) {
    // TypeScript knows response.data exists
    console.log(response.data.name);
  } else if (response.status === 'error') {
    // TypeScript knows response.error exists
    console.error(response.error.message);
  }
}

// ============================================================================
// EXAMPLE 3: Discriminated Unions for State Management
// ============================================================================

/**
 * Discriminated unions ensure type safety in state machines
 */
interface Service {
  id: string;
  name: string;
  description: string;
}

function example3_LoadingState(state: LoadingState<Service>): JSX.Element {
  // Exhaustive pattern matching
  switch (state.status) {
    case 'idle':
      return <button>Load Services</button>;

    case 'loading':
      return (
        <div>
          Loading... {state.progress !== undefined ? `${state.progress}%` : ''}
        </div>
      );

    case 'success':
      // TypeScript knows state.data exists and is Service type
      return (
        <div>
          <h2>{state.data.name}</h2>
          <p>{state.data.description}</p>
          <small>Loaded at {new Date(state.timestamp).toLocaleString()}</small>
        </div>
      );

    case 'error':
      // TypeScript knows state.error exists
      return (
        <div>
          Error: {state.error.message}
          {state.retryable && <button>Retry</button>}
        </div>
      );

    // If we forget a case, TypeScript will show an error
  }
}

// ============================================================================
// EXAMPLE 4: Form State with Type Safety
// ============================================================================

interface EmergencyFormData {
  type: 'water' | 'fire' | 'storm';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: {
    address: string;
    suburb: string;
    postcode: Postcode;
  };
  contact: {
    name: string;
    phone: PhoneNumber;
    email: EmailAddress;
  };
  description: string;
}

function example4_FormState(
  state: FormState<EmergencyFormData>
): JSX.Element | null {
  switch (state.state) {
    case 'idle':
      // state.values is DeepPartial<EmergencyFormData>
      return <form>Fill in emergency details</form>;

    case 'validating':
      // state.values is EmergencyFormData (all fields present)
      return <div>Validating {state.values.type} emergency...</div>;

    case 'invalid':
      // state.values exists and state.errors has form errors
      return (
        <div>
          <form>Please fix these errors:</form>
          <ul>
            {Object.entries(state.errors).map(([field, error]) => (
              <li key={field}>
                {field}: {error}
              </li>
            ))}
          </ul>
        </div>
      );

    case 'submitting':
      return <div>Submitting emergency request...</div>;

    case 'success':
      return <div>Emergency request submitted successfully!</div>;

    case 'error':
      return <div>Submission failed: {state.error}</div>;
  }
}

// ============================================================================
// EXAMPLE 5: Utility Types for Complex Transformations
// ============================================================================

interface ServiceConfiguration {
  readonly id: string;
  name: string;
  enabled: boolean;
  settings: {
    emergencyHours: boolean;
    autoDispatch: boolean;
  };
  pricing?: {
    baseRate: number;
    emergencyMultiplier: number;
  };
}

// Make all fields optional for updates
type ServiceUpdate = DeepPartial<ServiceConfiguration>;

// Get only required keys
type RequiredServiceKeys = NonNullableKeys<ServiceConfiguration>; // 'id' | 'name' | 'enabled' | 'settings'

// Require at least one contact method
type ContactMethod = AtLeastOne<{
  phone: PhoneNumber;
  email: EmailAddress;
  sms: PhoneNumber;
}>;

function example5_UtilityTypes(): void {
  // ✅ Partial update - all fields optional
  const update: ServiceUpdate = {
    settings: {
      emergencyHours: true,
    },
  };

  // ✅ At least one contact method required
  const contact1: ContactMethod = {
    phone: BrandedTypes.PhoneNumber.create('1300309361'),
  };

  const contact2: ContactMethod = {
    email: BrandedTypes.EmailAddress.create('admin@disasterrecovery.com.au'),
    phone: BrandedTypes.PhoneNumber.create('1300309361'),
  };

  // ❌ This would fail - no contact methods provided
  // const contact3: ContactMethod = {}; // Type error!
}

// ============================================================================
// EXAMPLE 6: Safe JSON Parsing
// ============================================================================

function example6_SafeParsing(jsonString: string): void {
  const result = parseJSON<Service>(jsonString);

  if (result.valid) {
    // TypeScript knows result.data is Service
    console.log('Parsed service:', result.data.name);
  } else {
    // TypeScript knows result.errors is string[]
    console.error('Parse errors:', result.errors.join(', '));
  }
}

// ============================================================================
// EXAMPLE 7: Type-safe Currency Handling
// ============================================================================

function example7_CurrencyTypes(): void {
  // ✅ Create currency with validation
  const price = BrandedTypes.Currency.create(5000);

  // ✅ Format currency
  const formatted = BrandedTypes.Currency.format(price);
  console.log(formatted); // "$5,000.00"

  // ✅ Type safety prevents negative values
  try {
    const invalid = BrandedTypes.Currency.create(-100);
  } catch (error) {
    console.error('Currency cannot be negative');
  }

  // ✅ Percentage validation
  const discount = BrandedTypes.Percentage.create(15);
  console.log(BrandedTypes.Percentage.format(discount)); // "15%"
}

// ============================================================================
// EXAMPLE 8: Exhaustive Switch Cases
// ============================================================================

type EmergencyType = 'water' | 'fire' | 'storm' | 'mould' | 'biohazard';

function example8_ExhaustiveSwitch(type: EmergencyType): string {
  switch (type) {
    case 'water':
      return 'Water Damage Emergency';
    case 'fire':
      return 'Fire Damage Emergency';
    case 'storm':
      return 'Storm Damage Emergency';
    case 'mould':
      return 'Mould Remediation Emergency';
    case 'biohazard':
      return 'Biohazard Cleanup Emergency';
    // If we add a new type and forget to handle it,
    // TypeScript will show an error here
  }
}

// ============================================================================
// EXAMPLE 9: Type-safe Event Handlers
// ============================================================================

type EmergencyEvent =
  | { type: 'created'; data: { id: string; timestamp: number } }
  | { type: 'updated'; data: { id: string; status: string } }
  | { type: 'completed'; data: { id: string; completedAt: number } }
  | { type: 'cancelled'; data: { id: string; reason: string } };

function example9_EventHandler(event: EmergencyEvent): void {
  switch (event.type) {
    case 'created':
      // TypeScript knows event.data has id and timestamp
      console.log(`Emergency ${event.data.id} created at ${event.data.timestamp}`);
      break;

    case 'updated':
      // TypeScript knows event.data has id and status
      console.log(`Emergency ${event.data.id} status: ${event.data.status}`);
      break;

    case 'completed':
      // TypeScript knows event.data has id and completedAt
      console.log(`Emergency ${event.data.id} completed at ${event.data.completedAt}`);
      break;

    case 'cancelled':
      // TypeScript knows event.data has id and reason
      console.log(`Emergency ${event.data.id} cancelled: ${event.data.reason}`);
      break;
  }
}

// ============================================================================
// EXAMPLE 10: Branded Types with Business Logic
// ============================================================================

/**
 * Demonstrates how branded types can encode business rules
 */
class EmergencyService {
  /**
   * Calculate response time based on severity and location
   * Branded types ensure we're using validated values
   */
  calculateResponseTime(
    severity: 'low' | 'medium' | 'high' | 'critical',
    locationId: LocationId
  ): number {
    const baseTime = 60; // 60 minutes base response time

    const severityMultiplier = {
      low: 1.0,
      medium: 0.75,
      high: 0.5,
      critical: 0.25,
    };

    return baseTime * severityMultiplier[severity];
  }

  /**
   * Calculate quote with type-safe currency
   */
  calculateQuote(
    basePrice: Currency,
    emergencyMultiplier: number,
    discount?: Currency
  ): Currency {
    const total = basePrice * emergencyMultiplier;
    const discounted = discount ? total - discount : total;

    return BrandedTypes.Currency.create(Math.max(0, discounted));
  }

  /**
   * Validate contact information
   */
  validateContact(
    phone: PhoneNumber,
    email: EmailAddress,
    postcode: Postcode
  ): boolean {
    // Branded types guarantee these are already validated
    // We only need business logic validation
    return BrandedTypes.Postcode.validate(postcode) && // Queensland check
           BrandedTypes.PhoneNumber.validate(phone);
  }
}

// Export for use in documentation
export const TypeScriptExamples = {
  example1_BrandedTypes,
  example2_TypeGuards,
  example2_APITypeGuards,
  example3_LoadingState,
  example4_FormState,
  example5_UtilityTypes,
  example6_SafeParsing,
  example7_CurrencyTypes,
  example8_ExhaustiveSwitch,
  example9_EventHandler,
  EmergencyService,
};

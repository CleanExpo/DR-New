# Advanced TypeScript Patterns Implementation

**Date**: 2025-11-09
**Project**: Disaster Recovery Brisbane
**Status**: Complete

## Overview

This document describes the advanced TypeScript patterns implemented across the Disaster Recovery Brisbane codebase. All implementations follow enterprise-grade TypeScript best practices with full type safety.

## 1. Branded Types

**Location**: `lib/types/branded.ts`

Branded types provide compile-time guarantees that prevent mixing semantically different values of the same primitive type.

### Implemented Branded Types

```typescript
// Service-related
ServiceId, ServiceSlug, ServiceCategory

// Location-related
LocationId, LocationSlug, Postcode, Latitude, Longitude

// Contact-related
PhoneNumber, EmailAddress, ABN

// User-related
UserId, SessionId, ContractorId

// Content-related
PageId, TemplateId, ContentBlockId

// Financial
Currency, Percentage

// Time-related
Timestamp, ISO8601String, UnixTimestamp

// URL-related
URL, ImageURL, CanonicalURL
```

### Usage Example

```typescript
import { PhoneNumber, EmailAddress, Currency } from '@/lib/types';

// Runtime validation with branding
const phone = PhoneNumber.create('1300309361'); // ✅ Valid
const email = EmailAddress.create('admin@disasterrecovery.com.au'); // ✅ Valid
const price = Currency.create(5000); // ✅ Valid

// Type safety - prevents mixing
function sendSMS(phone: PhoneNumber) { /* ... */ }
sendSMS(phone); // ✅ Works
sendSMS('1300309361'); // ❌ Type error - needs branded type
```

### Key Features

- **Compile-time type safety**: Prevents mixing similar primitive types
- **Runtime validation**: Constructor functions validate and brand values
- **Type guards**: Validate unknown values at runtime
- **Formatting helpers**: Built-in formatters for Currency, Percentage, etc.

## 2. Type Guards & Assertions

**Location**: `lib/types/guards.ts`

Type guards provide runtime type validation with TypeScript type narrowing.

### Primitive Type Guards

```typescript
isString, isNumber, isBoolean, isNull, isUndefined, isNullish
isNonNullable, isObject, isArray, isDate, isError
```

### Complex Type Guards

```typescript
isArrayOf<T>, isRecordOf<T>, isServiceData, isLocationData
isContactInfo, isAPISuccess, isAPIError
```

### Assertion Functions

```typescript
assertString(value, message?)
assertNumber(value, message?)
assertNonNullable(value, message?)
assertArray(value, message?)
assertObject(value, message?)
```

### Usage Example

```typescript
import { isString, assertNonNullable, isAPISuccess } from '@/lib/types';

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  }
}

function requireValue<T>(value: T | null | undefined): T {
  assertNonNullable(value, 'Value is required');
  // TypeScript knows value is T here
  return value;
}

// API response handling
const response = await apiClient.get('/emergency');
if (isAPISuccess(response)) {
  // TypeScript knows response.data exists
  console.log(response.data);
}
```

### Exhaustive Type Checking

```typescript
import { assertNever } from '@/lib/types';

type Status = 'pending' | 'success' | 'error';

function handleStatus(status: Status) {
  switch (status) {
    case 'pending':
      return 'Loading...';
    case 'success':
      return 'Done!';
    case 'error':
      return 'Failed!';
    default:
      // Compile error if not all cases handled
      assertNever(status);
  }
}
```

## 3. Utility Types

**Location**: `lib/types/utils.ts`

Advanced utility types for type transformations and manipulations.

### Deep Transformations

```typescript
DeepPartial<T>     // Make all properties optional recursively
DeepReadonly<T>    // Make all properties readonly recursively
DeepRequired<T>    // Make all properties required recursively
DeepMutable<T>     // Remove readonly recursively
```

### Key Filtering

```typescript
PickByType<T, U>       // Pick properties of specific type
OmitByType<T, U>       // Omit properties of specific type
RequiredKeys<T>        // Get keys that are required
OptionalKeys<T>        // Get keys that are optional
NonNullableKeys<T>     // Get keys that are not nullable
NullableKeys<T>        // Get keys that are nullable
```

### Type Unions & Intersections

```typescript
UnionToIntersection<U>  // Convert union to intersection
UnionToTuple<T>         // Convert union to tuple
ValueOf<T>              // Get union of all property values
```

### Advanced Patterns

```typescript
AtLeastOne<T>      // Require at least one property
ExactlyOne<T>      // Require exactly one property
NonEmptyArray<T>   // Array with at least one element
PartialBy<T, K>    // Make specific keys optional
RequiredBy<T, K>   // Make specific keys required
```

### Usage Example

```typescript
import { DeepPartial, AtLeastOne, PickByType } from '@/lib/types';

interface EmergencyRequest {
  type: string;
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  contact: {
    name: string;
    phone: string;
    email: string;
  };
}

// Allow partial updates at any depth
type PartialUpdate = DeepPartial<EmergencyRequest>;

// Require at least one contact method
type ContactMethod = AtLeastOne<{
  phone: string;
  email: string;
  sms: string;
}>;

// Pick only string fields
type StringFields = PickByType<EmergencyRequest, string>;
```

## 4. API Types

**Location**: `lib/types/api.ts`

Type-safe API request/response handling with discriminated unions.

### Discriminated Union Response

```typescript
type APIResponse<T> =
  | { status: 'success'; data: T; metadata?: APIMetadata }
  | { status: 'error'; error: ErrorDetails; metadata?: APIMetadata }
  | { status: 'pending'; progress?: number };
```

### Type-safe Endpoints

```typescript
import { TypedAPIClient, EndpointConfig } from '@/lib/types';

type MyEndpoints = EndpointConfig<{
  getServices: {
    method: 'GET';
    path: '/services';
    requestType: { location?: string };
    responseType: Service[];
  };
  createEmergency: {
    method: 'POST';
    path: '/emergency';
    requestType: EmergencyRequest;
    responseType: EmergencyResponse;
  };
}>;

// Fully typed API client
const client: TypedAPIClient<MyEndpoints> = ...;
const response = await client.request('getServices', { params: { location: 'Brisbane' } });
```

### Generic Repository Pattern

```typescript
interface Repository<T, ID = string> {
  findById(id: ID): Promise<Nullable<T>>;
  findAll(params?: PaginationParams): Promise<PaginatedResponse<T>>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: ID, data: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
  search(params: SearchParams): Promise<PaginatedResponse<T>>;
}
```

## 5. State Management Types

**Location**: `lib/types/state.ts`

Type-safe state management with discriminated unions for all states.

### Loading State Pattern

```typescript
type LoadingState<T, E = Error> =
  | { status: 'idle' }
  | { status: 'loading'; progress?: number }
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; error: E; retryable: boolean };

// Usage
function renderLoadingState<T>(state: LoadingState<T>) {
  switch (state.status) {
    case 'idle':
      return <div>Ready to load</div>;
    case 'loading':
      return <div>Loading {state.progress}%</div>;
    case 'success':
      return <div>{state.data}</div>;
    case 'error':
      return <div>Error: {state.error.message}</div>;
  }
}
```

### Form State Pattern

```typescript
type FormState<T> =
  | { state: 'idle'; values: DeepPartial<T> }
  | { state: 'validating'; values: T }
  | { state: 'invalid'; values: T; errors: FormErrors<T> }
  | { state: 'submitting'; values: T }
  | { state: 'success'; values: T; timestamp: number }
  | { state: 'error'; values: T; error: string };
```

### Auth State Pattern

```typescript
type AuthState =
  | { authenticated: false; loading: boolean }
  | {
      authenticated: true;
      user: User;
      token: string;
      expiresAt: number;
    };
```

## 6. Type-safe Routing

**Location**: `lib/types/routes.ts`

Template literal types for compile-time route validation.

### Route Types

```typescript
type ServiceSlug = 'water-damage-restoration' | 'fire-damage-restoration' | ...;
type ServiceRoute = `/services/${ServiceSlug}`;

type LocationSlug = 'hamilton' | 'ascot' | 'new-farm' | ...;
type LocationRoute = `/locations/${LocationSlug}`;

type ValidRoute = ServiceRoute | LocationRoute | EmergencyRoute | ...;
```

### Type-safe Route Builder

```typescript
import { RouteBuilder, Routes } from '@/lib/types';

// ✅ Type-safe route construction
const route = RouteBuilder.service('water-damage-restoration');
// Result: '/services/water-damage-restoration'

// ✅ Predefined routes
const emergencyRoute = Routes.emergency.afterHours;
// Result: '/emergency/after-hours'

// ❌ Compile error - invalid slug
const invalid = RouteBuilder.service('invalid-service');
```

### URL Builder with Type Safety

```typescript
import { buildURL } from '@/lib/types';

const url = buildURL({
  pathname: '/services/water-damage-restoration',
  query: { utm_source: 'google', ref: 'emergency' },
  hash: 'contact'
});
// Result: '/services/water-damage-restoration?utm_source=google&ref=emergency#contact'
```

## 7. Generic Repository Pattern

**Location**: `lib/patterns/repository.ts`

Type-safe data access layer with CRUD operations.

### Implementation

```typescript
import { BaseRepository, InMemoryRepository } from '@/lib/patterns';

interface Service {
  id: string;
  name: string;
  slug: string;
}

class ServiceRepository extends BaseRepository<Service> {
  protected tableName = 'services';

  async findById(id: string): Promise<Service | null> {
    // Implementation
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResponse<Service>> {
    // Implementation
  }

  // ... other methods
}

// For testing - in-memory implementation
const testRepo = new InMemoryRepository<Service>();
await testRepo.create({ name: 'Water Damage', slug: 'water-damage' });
```

### Query Builder

```typescript
const results = await repository
  .query()
  .where('category', '=', 'emergency')
  .whereIn('location', ['Brisbane', 'Ipswich'])
  .orderBy('name', 'asc')
  .limit(10)
  .execute();
```

## 8. Type-safe Validation

**Location**: `lib/patterns/validation.ts`

Zod-based validation with automatic TypeScript type inference.

### Schema Validation

```typescript
import { CommonSchemas, ValidationService } from '@/lib/patterns';

// Use predefined schemas
const result = ValidationService.validate(
  CommonSchemas.emergencyRequest,
  userInput
);

if (result.valid) {
  // TypeScript knows result.data is EmergencyRequest
  await processEmergency(result.data);
} else {
  // TypeScript knows result.errors is string[]
  showErrors(result.errors);
}
```

### Custom Validators

```typescript
import { CustomValidators } from '@/lib/patterns';

// Queensland-specific validation
const isValid = CustomValidators.qldPostcode('4000'); // true
const isABN = CustomValidators.abn('51824753556'); // true with checksum
```

### Form Validator Hook

```typescript
import { createFormValidator, CommonSchemas } from '@/lib/patterns';

const quoteValidator = createFormValidator(CommonSchemas.quoteRequest);

// In React component
const handleSubmit = async (data: unknown) => {
  const result = quoteValidator.validate(data);
  if (result.valid) {
    await submitQuote(result.data);
  }
};
```

## 9. Generic API Client

**Location**: `lib/patterns/api-client.ts`

Type-safe HTTP client with retry logic and interceptors.

### Usage

```typescript
import { apiClient } from '@/lib/patterns';

// Fully typed requests
const response = await apiClient.get<Service[]>('/services', {
  location: 'Brisbane'
});

if (response.status === 'success') {
  // TypeScript knows response.data is Service[]
  console.log(response.data);
}

// POST with validation
const emergency = await apiClient.post<EmergencyResponse>(
  '/emergency',
  emergencyRequest
);
```

### Interceptors

```typescript
import { createAPIClient } from '@/lib/patterns';

const client = createAPIClient({
  baseURL: 'https://api.disasterrecovery.com.au',
});

// Add auth token
client.addRequestInterceptor(async (config) => {
  const token = await getAuthToken();
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

// Log errors
client.addResponseInterceptor(async (response) => {
  if (response.status === 'error') {
    console.error('API Error:', response.error);
  }
  return response;
});
```

## 10. TypeScript Strict Mode

**Location**: `tsconfig.json`

All strict TypeScript compiler options enabled:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false
  }
}
```

## Benefits

### 1. Compile-time Safety

- **Type errors caught at compile time**, not runtime
- **Prevents mixing semantically different values** (e.g., LocationId vs ServiceId)
- **Exhaustive pattern matching** ensures all cases handled

### 2. Better IDE Support

- **IntelliSense autocomplete** for all types
- **Inline documentation** via TSDoc
- **Refactoring safety** - renames propagate correctly

### 3. Self-documenting Code

- **Types serve as documentation** - no need to check runtime
- **Clear intent** - branded types show what values mean
- **Validation at boundaries** - runtime checks where needed

### 4. Reduced Bugs

- **Null/undefined handling** enforced by strictNullChecks
- **Type guards prevent runtime errors**
- **Discriminated unions** ensure state consistency

### 5. Maintainability

- **Generic patterns** reduce code duplication
- **Type inference** reduces boilerplate
- **Centralized types** in `lib/types/index.ts`

## Usage Guidelines

### Importing Types

```typescript
// ✅ Recommended - import from index
import type { ServiceId, LocationId, APIResponse } from '@/lib/types';

// ✅ Also valid - direct import
import type { ServiceId } from '@/lib/types/branded';

// ❌ Avoid - don't bypass type system
const id: string = 'service-123'; // Use ServiceId.create() instead
```

### Type Guards in Practice

```typescript
import { isNonNullable, assertString } from '@/lib/types';

// Use type guards for narrowing
function processData(data: unknown) {
  if (isNonNullable(data) && typeof data === 'object') {
    // TypeScript knows data is object here
  }
}

// Use assertions when you're certain
function mustBeString(value: unknown): string {
  assertString(value);
  return value; // TypeScript knows it's string
}
```

### State Management

```typescript
import type { LoadingState, FormState } from '@/lib/types';

// ✅ Use discriminated unions for state
const [state, setState] = useState<LoadingState<Service>>({ status: 'idle' });

// TypeScript ensures all cases handled
switch (state.status) {
  case 'idle':
    return <div>Click to load</div>;
  case 'loading':
    return <div>Loading...</div>;
  case 'success':
    return <div>{state.data.name}</div>; // TypeScript knows data exists
  case 'error':
    return <div>{state.error.message}</div>;
}
```

## File Structure

```
lib/
├── types/
│   ├── branded.ts          # Branded types + constructors
│   ├── guards.ts           # Type guards + assertions
│   ├── utils.ts            # Utility types
│   ├── api.ts              # API types
│   ├── state.ts            # State management types
│   ├── routes.ts           # Route types
│   └── index.ts            # Central export
│
└── patterns/
    ├── repository.ts       # Generic repository
    ├── validation.ts       # Zod validation
    ├── api-client.ts       # HTTP client
    └── index.ts            # Pattern exports
```

## Testing

All types are designed for testability:

```typescript
import { InMemoryRepository } from '@/lib/patterns';

describe('ServiceRepository', () => {
  let repo: InMemoryRepository<Service>;

  beforeEach(() => {
    repo = new InMemoryRepository();
  });

  it('should create service', async () => {
    const service = await repo.create({
      name: 'Water Damage',
      slug: 'water-damage',
    });

    expect(service.id).toBeDefined();
    expect(service.name).toBe('Water Damage');
  });
});
```

## Migration Path

For existing code without strict types:

1. **Add branded types gradually** - start with new code
2. **Use type guards at boundaries** - validate external data
3. **Enable strict mode incrementally** - fix errors one module at a time
4. **Leverage utility types** - reduce manual type definitions
5. **Document with JSDoc** - add types to existing JavaScript

## Performance

All type checking happens at **compile time only**:

- **Zero runtime overhead** for type annotations
- **Branded types** are just type assertions (no runtime cost)
- **Type guards** are minimal runtime checks (same as manual checks)
- **Generic patterns** compile to efficient JavaScript

## Best Practices

1. **Always use branded types** for domain-specific values
2. **Validate at system boundaries** (API, user input, external data)
3. **Use discriminated unions** for state with multiple variants
4. **Prefer type inference** over explicit annotations when clear
5. **Enable all strict compiler options** for new projects
6. **Write type guards** for complex runtime validations
7. **Use generic patterns** to reduce code duplication
8. **Document types with JSDoc** for better IDE support

## Conclusion

This implementation provides enterprise-grade TypeScript patterns for the Disaster Recovery Brisbane project, ensuring type safety, maintainability, and developer productivity.

All types are:
- ✅ Compile-time validated
- ✅ Runtime safe with guards
- ✅ Self-documenting
- ✅ Generic and reusable
- ✅ Production-ready

**Last Updated**: 2025-11-09
**Maintained by**: Disaster Recovery Brisbane Development Team

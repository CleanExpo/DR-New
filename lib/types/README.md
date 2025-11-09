# Advanced TypeScript Types - Quick Reference

## Getting Started

```typescript
import type { ServiceId, LocationId, APIResponse } from '@/lib/types';
import { BrandedTypes, isAPISuccess } from '@/lib/types';
```

## Branded Types

Prevent mixing semantically different values:

```typescript
// Create with validation
const phone = BrandedTypes.PhoneNumber.create('1300309361');
const email = BrandedTypes.EmailAddress.create('admin@disasterrecovery.com.au');
const postcode = BrandedTypes.Postcode.create('4000');

// Type-safe functions
function sendAlert(phone: PhoneNumber) { /* ... */ }
sendAlert(phone); // ✅ Works
sendAlert('1300309361'); // ❌ Type error
```

## Type Guards

Runtime validation with type narrowing:

```typescript
import { isString, isNonNullable, isAPISuccess } from '@/lib/types';

if (isString(value)) {
  // TypeScript knows value is string
  value.toUpperCase();
}

const response = await apiClient.get('/services');
if (isAPISuccess(response)) {
  // TypeScript knows response.data exists
  console.log(response.data);
}
```

## Utility Types

Advanced type transformations:

```typescript
import type { DeepPartial, AtLeastOne, PickByType } from '@/lib/types';

// Make all properties optional recursively
type Update = DeepPartial<EmergencyRequest>;

// Require at least one property
type Contact = AtLeastOne<{ phone: string; email: string }>;

// Pick only string properties
type Strings = PickByType<Service, string>;
```

## State Management

Type-safe state with discriminated unions:

```typescript
import type { LoadingState, FormState } from '@/lib/types';

const [state, setState] = useState<LoadingState<Service>>({ status: 'idle' });

switch (state.status) {
  case 'idle':
    return <button>Load</button>;
  case 'loading':
    return <div>Loading...</div>;
  case 'success':
    return <div>{state.data.name}</div>; // data is Service
  case 'error':
    return <div>{state.error.message}</div>;
}
```

## API Types

Type-safe API requests:

```typescript
import type { APIResponse } from '@/lib/types';

async function fetchServices(): Promise<APIResponse<Service[]>> {
  const response = await apiClient.get('/services');
  return response;
}
```

## Routing

Type-safe routes with template literals:

```typescript
import { RouteBuilder, Routes } from '@/lib/types';

const route = RouteBuilder.service('water-damage-restoration');
// Result: '/services/water-damage-restoration'

const emergency = Routes.emergency.afterHours;
// Result: '/emergency/after-hours'
```

## Patterns

### Repository Pattern

```typescript
import { BaseRepository } from '@/lib/patterns';

class ServiceRepository extends BaseRepository<Service> {
  protected tableName = 'services';
  // Implement methods
}
```

### Validation

```typescript
import { CommonSchemas, ValidationService } from '@/lib/patterns';

const result = ValidationService.validate(
  CommonSchemas.emergencyRequest,
  userInput
);

if (result.valid) {
  await processEmergency(result.data);
}
```

### API Client

```typescript
import { apiClient } from '@/lib/patterns';

const response = await apiClient.get<Service[]>('/services');
if (response.status === 'success') {
  console.log(response.data);
}
```

## File Structure

```
lib/types/
├── branded.ts       # Branded types (ServiceId, PhoneNumber, etc.)
├── guards.ts        # Type guards (isString, isAPISuccess, etc.)
├── utils.ts         # Utility types (DeepPartial, AtLeastOne, etc.)
├── api.ts           # API types (APIResponse, Repository, etc.)
├── state.ts         # State types (LoadingState, FormState, etc.)
├── routes.ts        # Route types (ValidRoute, RouteBuilder, etc.)
├── examples.ts      # Usage examples
├── index.ts         # Central export
└── README.md        # This file

lib/patterns/
├── repository.ts    # Generic repository pattern
├── validation.ts    # Zod validation helpers
├── api-client.ts    # HTTP client implementation
└── index.ts         # Pattern exports
```

## Best Practices

1. **Always use branded types** for domain-specific values
2. **Validate at boundaries** (API, user input, external data)
3. **Use discriminated unions** for state with multiple variants
4. **Enable strict compiler options** for maximum safety
5. **Leverage type inference** - TypeScript is smart!

## Common Patterns

### Safe API Call

```typescript
async function fetchEmergency(id: string) {
  const response = await apiClient.get<Emergency>(`/emergency/${id}`);

  if (response.status === 'success') {
    return response.data; // Emergency
  }

  if (response.status === 'error') {
    throw new Error(response.error.message);
  }

  return null; // pending
}
```

### Form with Validation

```typescript
const [formState, setFormState] = useState<FormState<EmergencyRequest>>({
  state: 'idle',
  values: {},
});

const handleSubmit = async (data: unknown) => {
  setFormState({ state: 'validating', values: data as EmergencyRequest });

  const result = ValidationService.validate(
    CommonSchemas.emergencyRequest,
    data
  );

  if (!result.valid) {
    setFormState({
      state: 'invalid',
      values: data as EmergencyRequest,
      errors: result.errors,
    });
    return;
  }

  setFormState({ state: 'submitting', values: result.data });

  try {
    await submitEmergency(result.data);
    setFormState({
      state: 'success',
      values: result.data,
      timestamp: Date.now(),
    });
  } catch (error) {
    setFormState({
      state: 'error',
      values: result.data,
      error: error.message,
    });
  }
};
```

## See Also

- [Complete Documentation](../../TYPESCRIPT_PATTERNS_COMPLETE.md)
- [Usage Examples](./examples.ts)
- [Type Definitions](./index.ts)

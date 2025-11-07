# Architecture Quick Reference Guide

## Overview

This disaster recovery platform uses **Clean Architecture** with **Domain-Driven Design**. This guide provides quick access to common patterns and usage examples.

---

## File Structure

```
D:\DR New\
├── docs/architecture/              📚 Architecture documentation
│   ├── ARCHITECTURE_OVERVIEW.md    📖 Complete architecture guide
│   ├── IMPLEMENTATION_COMPLETE.md  ✅ What was built
│   ├── QUICK_REFERENCE.md         ⚡ This file
│   └── decisions/                 📋 Architecture decisions
│       ├── ADR-001-Clean-Architecture.md
│       └── ADR-002-Repository-Pattern.md
│
├── src/domain/                     🎯 Pure business logic
│   ├── shared/                    🔧 Base classes
│   │   ├── Result.ts             ↔️ Error handling
│   │   ├── Entity.ts             🆔 Entities & aggregates
│   │   └── ValueObject.ts        💎 Value objects
│   ├── entities/                  📦 Domain entities
│   │   └── ServiceRequest.ts
│   ├── value-objects/             💠 Immutable values
│   │   ├── Address.ts
│   │   ├── PhoneNumber.ts
│   │   └── Money.ts
│   ├── repositories/              🗄️ Data interfaces
│   │   └── IServiceRequestRepository.ts
│   └── errors/                    ⚠️ Domain errors
│       └── DomainError.ts
│
└── src/infrastructure/             🔌 External integrations
    └── config/                    ⚙️ Configuration
        └── index.ts
```

---

## Common Patterns

### 1. Creating Entities with Result Type

**Pattern**: Railway-Oriented Programming

```typescript
import { ServiceRequest, Address, PhoneNumber, Result } from '@/src/domain';

// Create address
const addressResult = Address.create({
  street: '123 Main Street',
  suburb: 'Hamilton',
  postcode: '4007',
});

if (!addressResult.success) {
  console.error('Address invalid:', addressResult.error.message);
  return;
}

// Create phone number
const phoneResult = PhoneNumber.create('0412 345 678');

if (!phoneResult.success) {
  console.error('Phone invalid:', phoneResult.error.message);
  return;
}

// Create service request
const requestResult = ServiceRequest.create({
  customerId: 'cust_123',
  serviceType: 'water-damage',
  priority: 'emergency',
  location: addressResult.value,
  contactPhone: phoneResult.value,
  description: 'Burst pipe flooding kitchen and living room area',
});

if (!requestResult.success) {
  console.error('Request invalid:', requestResult.error.message);
  return;
}

const request = requestResult.value;
console.log('Request created:', request.id);
```

### 2. Working with Money

**Pattern**: Precise Decimal Arithmetic

```typescript
import { Money } from '@/src/domain';

// Create from dollars
const basePrice = Money.fromDollars(2500, 'AUD');

if (!basePrice.success) {
  console.error('Invalid amount');
  return;
}

// Calculate GST (10%)
const gstResult = basePrice.value.percentage(10);

if (!gstResult.success) {
  console.error('Calculation error');
  return;
}

// Add GST to base price
const totalResult = basePrice.value.add(gstResult.value);

if (!totalResult.success) {
  console.error('Cannot add prices');
  return;
}

console.log('Base price:', basePrice.value.toString());  // $2,500.00
console.log('GST:', gstResult.value.toString());         // $250.00
console.log('Total:', totalResult.value.toString());     // $2,750.00
```

### 3. Service Request Lifecycle

**Pattern**: Aggregate Root State Management

```typescript
import { ServiceRequest, Money } from '@/src/domain';

// 1. Create request
const request = ServiceRequest.create({...});

// 2. Schedule the service
const scheduleDate = new Date('2025-11-07T14:00:00');
const cost = Money.fromDollars(2500);

const scheduleResult = request.value.schedule(scheduleDate, cost.value);

if (!scheduleResult.success) {
  console.error('Cannot schedule:', scheduleResult.error.message);
  return;
}

// 3. Start the service
const startResult = request.value.startService();

if (!startResult.success) {
  console.error('Cannot start:', startResult.error.message);
  return;
}

// 4. Complete the service
const completeResult = request.value.complete();

if (!completeResult.success) {
  console.error('Cannot complete:', completeResult.error.message);
  return;
}

// Get domain events (for audit trail, notifications, etc.)
const events = request.value.pullDomainEvents();
console.log('Events:', events.map(e => e.eventType));
// ['ServiceRequested', 'ServiceScheduled', 'ServiceStarted', 'ServiceCompleted']
```

### 4. Address Validation

**Pattern**: Service Area Validation

```typescript
import { Address } from '@/src/domain';

// Brisbane address (in service area)
const brisbaneAddress = Address.create({
  street: '123 Main Street',
  suburb: 'Hamilton',
  postcode: '4007',
});

console.log(brisbaneAddress.value.isInBrisbane());      // true
console.log(brisbaneAddress.value.isInServiceArea());   // true
console.log(brisbaneAddress.value.city);                // 'Brisbane'
console.log(brisbaneAddress.value.state);               // 'QLD'

// Outside service area
const sydneyAddress = Address.create({
  street: '456 George Street',
  suburb: 'Sydney',
  postcode: '2000',
});

console.log(sydneyAddress.value.isInServiceArea());     // false
```

### 5. Error Handling Pattern

**Pattern**: Result Chaining

```typescript
import { Result } from '@/src/domain';

// Chain multiple operations
const result = Result.chain(
  Address.create(addressData),
  (address) => Result.chain(
    PhoneNumber.create(phoneData),
    (phone) => ServiceRequest.create({
      ...requestData,
      location: address,
      contactPhone: phone,
    })
  )
);

if (!result.success) {
  // Handle error
  console.error(result.error.code);
  console.error(result.error.message);

  // Structured error response for API
  return {
    success: false,
    error: {
      code: result.error.code,
      message: result.error.message,
      ...(result.error instanceof ValidationError && {
        field: result.error.field,
        constraint: result.error.constraint,
      }),
    },
  };
}

const request = result.value;
```

### 6. Configuration Access

**Pattern**: Type-Safe Configuration

```typescript
import { getConfig, isProduction } from '@/src/infrastructure/config';

const config = getConfig();

// Environment check
if (isProduction()) {
  console.log('Running in production mode');
}

// Database config
console.log('Database URL:', config.database.url);
console.log('Max connections:', config.database.maxConnections);

// Cache config
if (config.cache.enabled) {
  console.log('Cache enabled with TTL:', config.cache.ttl);
}

// Security config
console.log('Rate limit:', config.security.rateLimitPerMinute);
```

---

## Domain Events

### Available Events

```typescript
// Service lifecycle events
ServiceRequestedEvent      // When service is first requested
ServiceScheduledEvent      // When service is scheduled
ServiceStartedEvent        // When work begins
ServiceCompletedEvent      // When work is finished
ServiceCancelledEvent      // When service is cancelled
```

### Using Domain Events

```typescript
const request = ServiceRequest.create({...});

// ... perform operations

// Get all events that occurred
const events = request.value.getDomainEvents();

// Process events (send emails, update analytics, etc.)
for (const event of events) {
  switch (event.eventType) {
    case 'ServiceRequested':
      await emailService.sendConfirmation(request.value.customerId);
      await analyticsService.track('service_requested', event);
      break;

    case 'ServiceScheduled':
      await emailService.sendScheduleConfirmation(request.value.customerId);
      await smsService.sendReminder(request.value.contactPhone);
      break;

    // ... handle other events
  }
}

// Clear events after processing
request.value.clearDomainEvents();
```

---

## Repository Pattern

### Interface Definition

```typescript
interface IServiceRequestRepository {
  findById(id: string): Promise<ServiceRequest | null>;
  findByCustomerId(customerId: string): Promise<ServiceRequest[]>;
  findByStatus(status: ServiceStatus): Promise<ServiceRequest[]>;
  findEmergencyRequests(location: Address): Promise<ServiceRequest[]>;
  save(request: ServiceRequest): Promise<void>;
  delete(id: string): Promise<void>;
  findPaginated(options: PaginationOptions): Promise<PaginatedResult<ServiceRequest>>;
}
```

### Usage in Use Cases

```typescript
class GetServiceRequestDetails {
  constructor(
    private readonly repository: IServiceRequestRepository
  ) {}

  async execute(requestId: string): Promise<Result<ServiceRequestDTO>> {
    // Use repository - doesn't care about implementation
    const request = await this.repository.findById(requestId);

    if (!request) {
      return Result.fail(
        new NotFoundError('Service request not found', 'ServiceRequest', requestId)
      );
    }

    // Map to DTO
    const dto = this.mapToDTO(request);

    return Result.ok(dto);
  }
}
```

---

## Business Rules Reference

### ServiceRequest Business Rules

1. **Emergency requests require mobile phone**
   - Enforced in: `ServiceRequest.create()`
   - Error: `BusinessRuleViolation`

2. **Location must be in service area**
   - Brisbane: 4000-4179
   - Ipswich: 4300-4306
   - Logan: 4114-4133
   - Enforced in: `ServiceRequest.create()`
   - Error: `ValidationError`

3. **Description minimum 20 characters**
   - Enforced in: `ServiceRequest.create()`
   - Error: `ValidationError`

4. **Emergency requests scheduled within 24 hours**
   - Enforced in: `ServiceRequest.schedule()`
   - Error: `BusinessRuleViolation`

5. **Scheduled date must be future**
   - Enforced in: `ServiceRequest.schedule()`
   - Error: `ValidationError`

6. **Status transition rules**
   - pending → scheduled → in-progress → completed
   - pending/scheduled/in-progress → cancelled
   - Enforced in: All state-changing methods
   - Error: `BusinessRuleViolation`

### Response Time Rules

```typescript
Priority      Response Time
emergency     60 minutes
urgent        240 minutes (4 hours)
normal        1440 minutes (24 hours)
```

**Access**: `request.getExpectedResponseTime()`

---

## Type Reference

### ServiceType

```typescript
type ServiceType =
  | 'water-damage'
  | 'fire-damage'
  | 'mould-remediation'
  | 'storm-damage'
  | 'flood-damage'
  | 'emergency-board-up'
  | 'sewage-cleanup';
```

### ServicePriority

```typescript
type ServicePriority = 'emergency' | 'urgent' | 'normal';
```

### ServiceStatus

```typescript
type ServiceStatus =
  | 'pending'
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled';
```

### Currency

```typescript
type Currency = 'AUD' | 'USD' | 'NZD';
```

### PhoneType

```typescript
type PhoneType = 'mobile' | 'landline' | 'emergency';
```

---

## Common Errors

### ValidationError

Field-level validation failure

```typescript
new ValidationError(
  'Description must be at least 20 characters',
  'description',
  'min_length'
)
```

### BusinessRuleViolation

Business rule violation

```typescript
new BusinessRuleViolation(
  'Emergency requests must be scheduled within 24 hours',
  'EMERGENCY_SCHEDULE_CONSTRAINT'
)
```

### ServiceAreaError

Service area not supported

```typescript
new ServiceAreaError(
  '2000',  // postcode
  ['Brisbane', 'Ipswich', 'Logan']  // supported areas
)
```

### NotFoundError

Entity not found

```typescript
new NotFoundError(
  'Service request not found',
  'ServiceRequest',
  'req_123'
)
```

---

## Testing Patterns

### Unit Test (Domain Logic)

```typescript
describe('ServiceRequest', () => {
  it('should reject emergency requests without mobile phone', () => {
    const landline = PhoneNumber.create('07 3000 0000');

    const result = ServiceRequest.create({
      customerId: 'cust_123',
      serviceType: 'water-damage',
      priority: 'emergency',
      location: validAddress,
      contactPhone: landline.value,
      description: 'Emergency water damage in kitchen area',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(BusinessRuleViolation);
    expect(result.error.rule).toBe('EMERGENCY_MOBILE_REQUIRED');
  });
});
```

### Integration Test (Repository)

```typescript
describe('ServiceRequestRepository', () => {
  it('should find emergency requests in Brisbane', async () => {
    const brisbaneAddress = Address.create({...});

    await repository.save(emergencyRequest);
    await repository.save(normalRequest);

    const results = await repository.findEmergencyRequests(
      brisbaneAddress.value
    );

    expect(results).toHaveLength(1);
    expect(results[0].priority).toBe('emergency');
  });
});
```

---

## Migration Checklist

### When Adding New Features

- [ ] Define domain entities in `/src/domain/entities/`
- [ ] Create value objects for domain concepts
- [ ] Define repository interface in `/src/domain/repositories/`
- [ ] Implement repository in `/src/infrastructure/database/repositories/`
- [ ] Create use cases in `/src/application/use-cases/`
- [ ] Add DTOs in `/src/application/dtos/`
- [ ] Create API routes in `/app/api/v1/`
- [ ] Write domain tests
- [ ] Write integration tests
- [ ] Update documentation

---

## Quick Tips

### ✅ Do This

```typescript
// Use Result type for error handling
const result = ServiceRequest.create(data);
if (!result.success) {
  return handleError(result.error);
}

// Use value objects for domain concepts
const money = Money.fromDollars(100);
const address = Address.create({...});

// Enforce business rules in domain
const scheduled = request.schedule(date, cost);
```

### ❌ Don't Do This

```typescript
// Don't throw exceptions in domain
function create(data) {
  if (!data.location) {
    throw new Error('Location required');  // ❌
  }
}

// Don't expose mutable state
class ServiceRequest {
  public status: string;  // ❌
  // Use private props with getters instead
}

// Don't skip validation
const request = new ServiceRequest(data);  // ❌
// Use factory method: ServiceRequest.create(data)
```

---

## Further Reading

- **ARCHITECTURE_OVERVIEW.md** - Complete architecture documentation
- **ADR-001** - Clean Architecture decision
- **ADR-002** - Repository Pattern decision
- **IMPLEMENTATION_COMPLETE.md** - What was built and why

---

**Version**: 1.0.0
**Last Updated**: 2025-11-07
**Maintained By**: Architecture Team

# ADR-001: Adopt Clean Architecture (Hexagonal Architecture)

## Status
**ACCEPTED** - 2025-11-07

## Context

The Disaster Recovery service platform currently has mixed architectural patterns with:
- Business logic scattered across components and API routes
- Tight coupling between UI components and data access
- Difficulty testing due to dependencies on external services
- No clear boundaries between layers
- Framework-dependent domain logic

As the platform grows to serve Brisbane, Ipswich, and Logan markets with insurance integration and emergency services, we need a robust architectural foundation that supports:
- Independent testability of business rules
- Easy replacement of external services
- Clear separation of concerns
- Framework independence
- Long-term maintainability

## Decision

We will adopt **Clean Architecture** (also known as Hexagonal Architecture or Ports and Adapters) as our primary architectural pattern.

### Architecture Layers

```
┌──────────────────────────────────────────────────────┐
│              Presentation Layer                       │
│  (Next.js Pages, API Routes, React Components)       │
│                                                       │
│  Dependencies: Domain, Application                   │
└────────────────┬─────────────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────────────┐
│              Application Layer                        │
│  (Use Cases, DTOs, Application Services)             │
│                                                       │
│  Dependencies: Domain Only                           │
└────────────────┬─────────────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────────────┐
│              Domain Layer                             │
│  (Entities, Value Objects, Domain Services)          │
│                                                       │
│  Dependencies: NONE (Pure TypeScript)                │
└────────────────▲─────────────────────────────────────┘
                 │
┌────────────────┴─────────────────────────────────────┐
│              Infrastructure Layer                     │
│  (Database, External APIs, File System, Cache)       │
│                                                       │
│  Dependencies: Domain, Application                   │
└──────────────────────────────────────────────────────┘
```

### Key Principles

1. **Dependency Rule**: Dependencies point inward. Inner layers never depend on outer layers.

2. **Domain Independence**: The domain layer has zero framework dependencies and can be tested in complete isolation.

3. **Interface Abstractions**: Infrastructure details are hidden behind interfaces (ports) defined in the domain/application layer.

4. **Business Logic Isolation**: All business rules reside in the domain layer, protected from framework changes.

## Rationale

### Why Clean Architecture?

**Testability**:
- Domain logic can be tested without database, UI, or external services
- Fast unit tests (no I/O dependencies)
- Easy to mock infrastructure dependencies

**Maintainability**:
- Clear boundaries make code easier to understand
- Changes in one layer don't ripple to others
- New developers can navigate the codebase systematically

**Framework Independence**:
- Could migrate from Next.js to another framework with minimal domain changes
- Domain logic survives framework version upgrades
- Not locked into specific ORMs or libraries

**Flexibility**:
- Easy to swap databases (PostgreSQL → MongoDB)
- Simple to replace external services (SendGrid → AWS SES)
- Support multiple UIs (Web, Mobile, API) from same domain

**Business Focus**:
- Domain layer reads like business requirements
- Non-technical stakeholders can review domain code
- Business rules are explicit and discoverable

### Alternatives Considered

**1. MVC (Model-View-Controller)**
- ❌ Tight coupling between model and database
- ❌ Business logic often leaks into controllers
- ❌ Difficult to test in isolation

**2. Layered Architecture (Traditional)**
- ❌ Layers can become tightly coupled
- ❌ Database often drives the architecture
- ❌ Business logic scattered across layers

**3. Microservices Architecture**
- ❌ Overkill for current scale
- ❌ Operational complexity not justified
- ❌ Can adopt later if needed (Clean Architecture supports this)

**4. Feature-Slice Architecture**
- ⚠️ Good for small apps, but harder to enforce boundaries at scale
- ⚠️ Business logic can become duplicated across features

## Implementation

### Directory Structure

```
src/
├── domain/                    # Core business logic
│   ├── entities/             # Business objects
│   ├── value-objects/        # Immutable values
│   ├── repositories/         # Repository interfaces
│   ├── services/             # Domain services
│   └── events/               # Domain events
│
├── application/               # Use cases
│   ├── use-cases/            # Application use cases
│   ├── dtos/                 # Data transfer objects
│   ├── ports/                # Infrastructure interfaces
│   └── mappers/              # DTO ↔ Entity mapping
│
├── infrastructure/            # External concerns
│   ├── database/             # Database implementation
│   ├── cache/                # Caching implementation
│   ├── external-services/    # Third-party APIs
│   └── logging/              # Logging implementation
│
└── presentation/              # UI layer
    ├── api/                  # API routes
    ├── pages/                # Next.js pages
    └── components/           # React components
```

### Example: Emergency Service Request

**Domain Layer** (`src/domain/entities/ServiceRequest.ts`):
```typescript
export class ServiceRequest {
  private constructor(
    public readonly id: string,
    public readonly serviceType: ServiceType,
    public readonly location: Address,
    public readonly priority: Priority,
    public readonly status: ServiceStatus,
  ) {}

  static create(data: CreateServiceRequestData): Result<ServiceRequest> {
    // Pure business logic - no external dependencies
    if (!ServiceArea.includes(data.location)) {
      return Result.fail(new ServiceAreaError());
    }
    // ... more validation
  }

  calculateResponseTime(): number {
    // Business rule: Emergency < 60 min, Urgent < 4 hours, Normal < 24 hours
    return this.priority === 'emergency' ? 60 :
           this.priority === 'urgent' ? 240 : 1440;
  }
}
```

**Application Layer** (`src/application/use-cases/RequestEmergencyService.ts`):
```typescript
export class RequestEmergencyService {
  constructor(
    private repository: IServiceRequestRepository,
    private notificationService: INotificationService,
  ) {}

  async execute(dto: ServiceRequestDTO): Promise<Result<string>> {
    // Create domain entity
    const serviceRequest = ServiceRequest.create(dto);
    if (!serviceRequest.success) {
      return Result.fail(serviceRequest.error);
    }

    // Persist
    await this.repository.save(serviceRequest.value);

    // Side effects
    await this.notificationService.sendEmergencyAlert(serviceRequest.value);

    return Result.ok(serviceRequest.value.id);
  }
}
```

**Infrastructure Layer** (`src/infrastructure/database/repositories/PrismaServiceRequestRepository.ts`):
```typescript
export class PrismaServiceRequestRepository implements IServiceRequestRepository {
  constructor(private prisma: PrismaClient) {}

  async save(request: ServiceRequest): Promise<void> {
    await this.prisma.serviceRequest.create({
      data: {
        id: request.id,
        serviceType: request.serviceType,
        // ... map domain entity to database model
      }
    });
  }
}
```

**Presentation Layer** (`app/api/v1/emergency/request/route.ts`):
```typescript
export async function POST(req: Request) {
  const dto = await req.json();

  // Get use case from DI container
  const useCase = container.get(RequestEmergencyService);

  const result = await useCase.execute(dto);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ requestId: result.value });
}
```

## Consequences

### Positive

✅ **Independent Testing**: Domain logic can be tested without database or framework
✅ **Clear Boundaries**: Each layer has well-defined responsibilities
✅ **Framework Agnostic**: Domain survives framework changes
✅ **Easy Onboarding**: New developers understand structure quickly
✅ **Scalable**: Supports growth from monolith to microservices
✅ **Business Alignment**: Code reflects business requirements

### Negative

⚠️ **Initial Complexity**: More files and abstractions upfront
⚠️ **Learning Curve**: Team needs to understand Clean Architecture principles
⚠️ **Boilerplate**: More interfaces and mapping code
⚠️ **Initial Velocity**: Slower initial development (but faster long-term)

### Risks & Mitigations

**Risk**: Team resistance to additional abstraction
**Mitigation**: Provide training, document patterns, pair programming

**Risk**: Over-engineering for simple features
**Mitigation**: Start with core features, apply patterns pragmatically

**Risk**: Performance overhead from abstraction layers
**Mitigation**: Profile and optimize hot paths, caching at appropriate layers

## Metrics

Success will be measured by:

1. **Test Coverage**: Target 80% for domain layer, 70% overall
2. **Test Speed**: Unit tests should run in < 5 seconds
3. **Coupling Metrics**: Low coupling between layers (measured by dependency analysis)
4. **Time to Add Features**: Should decrease after initial setup
5. **Bug Rate**: Should decrease due to better testing
6. **Onboarding Time**: New developers productive within 1 week

## Migration Path

**Phase 1: Foundation (Week 1)**
- Create directory structure
- Migrate core entities (ServiceRequest, Customer)
- Set up repository pattern
- Implement DI container

**Phase 2: Use Cases (Week 2)**
- Migrate emergency request flow
- Migrate insurance claim submission
- Create DTOs and validators

**Phase 3: Infrastructure (Week 3)**
- Implement repository adapters
- Migrate external service integrations
- Set up caching infrastructure

**Phase 4: Testing (Week 4)**
- Write domain layer tests
- Write application layer tests
- Write integration tests

## References

- [Clean Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture (Alistair Cockburn)](https://alistair.cockburn.us/hexagonal-architecture/)
- [DDD in TypeScript](https://khalilstemmler.com/articles/domain-driven-design-intro/)
- [Clean Architecture in TypeScript](https://github.com/stemmlerjs/ddd-forum)

## Related ADRs

- ADR-002: Use Repository Pattern
- ADR-003: Implement DDD Bounded Contexts
- ADR-006: Implement Railway-Oriented Programming

---

**Decision Date**: 2025-11-07
**Reviewed By**: Architecture Team
**Next Review**: 2025-12-07 (1 month)

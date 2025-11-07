# ADR-002: Use Repository Pattern for Data Access

## Status
**ACCEPTED** - 2025-11-07

## Context

Current data access is tightly coupled to Prisma ORM and spread across:
- API route handlers directly calling Prisma
- Components making database queries
- No abstraction between business logic and data layer
- Difficult to test without database
- Cannot easily switch ORMs or databases

We need a data access pattern that:
- Abstracts database implementation details
- Allows easy testing with mock data
- Provides clean separation between domain and persistence
- Supports multiple data sources (database, cache, external APIs)
- Enables query optimization and caching strategies

## Decision

We will implement the **Repository Pattern** with the following characteristics:

1. **Interface-based repositories** defined in the domain layer
2. **Concrete implementations** in the infrastructure layer
3. **One repository per aggregate root** (DDD principle)
4. **Collection-like interface** (save, find, delete)
5. **Dependency injection** for repository instances

### Repository Structure

```
src/domain/repositories/
├── IServiceRequestRepository.ts
├── IClaimRepository.ts
├── ICustomerRepository.ts
└── IServiceAreaRepository.ts

src/infrastructure/database/repositories/
├── PrismaServiceRequestRepository.ts
├── PrismaClaimRepository.ts
├── PrismaCustomerRepository.ts
└── CachedServiceAreaRepository.ts
```

## Rationale

### Why Repository Pattern?

**Abstraction**:
- Business logic doesn't know about Prisma, SQL, or database schema
- Can swap Prisma for TypeORM, Drizzle, or raw SQL
- Domain layer depends on interfaces, not concrete implementations

**Testability**:
- Easy to create in-memory test repositories
- No database needed for unit tests
- Fast test execution (< 5 seconds for full suite)

**Centralization**:
- All data access logic in one place
- Easy to add caching, logging, monitoring
- Consistent error handling across data operations

**Query Optimization**:
- Repository can optimize queries behind the interface
- Can implement query batching, caching strategies
- Performance improvements don't affect consumers

**Multiple Data Sources**:
- Can combine database, cache, and external APIs
- Repository handles complexity internally
- Domain layer unaware of data source

### Alternatives Considered

**1. Active Record Pattern**
```typescript
const request = await ServiceRequest.findById('123');
request.status = 'completed';
await request.save();
```
- ❌ Tight coupling between domain and database
- ❌ Hard to test
- ❌ Violates Single Responsibility Principle

**2. Data Mapper Pattern (Prisma's approach)**
```typescript
const request = await prisma.serviceRequest.findUnique({ where: { id: '123' }});
```
- ⚠️ Better than Active Record, but still leaks Prisma into domain
- ⚠️ No abstraction for testing
- ⚠️ Business logic can scatter

**3. DAO (Data Access Object) Pattern**
```typescript
const dao = new ServiceRequestDAO();
await dao.insert(request);
```
- ⚠️ Similar to Repository, but more CRUD-focused
- ⚠️ Less domain-oriented
- Repository Pattern is more modern and DDD-aligned

## Implementation

### Repository Interface (Domain Layer)

```typescript
// src/domain/repositories/IServiceRequestRepository.ts

export interface IServiceRequestRepository {
  // Query methods
  findById(id: string): Promise<ServiceRequest | null>;
  findByCustomerId(customerId: string): Promise<ServiceRequest[]>;
  findByStatus(status: ServiceStatus): Promise<ServiceRequest[]>;
  findEmergencyRequests(area: ServiceArea): Promise<ServiceRequest[]>;

  // Command methods
  save(request: ServiceRequest): Promise<void>;
  delete(id: string): Promise<void>;

  // Bulk operations
  saveMany(requests: ServiceRequest[]): Promise<void>;

  // Query specifications (for complex queries)
  findBySpecification(spec: Specification<ServiceRequest>): Promise<ServiceRequest[]>;

  // Pagination
  findPaginated(options: PaginationOptions): Promise<PaginatedResult<ServiceRequest>>;
}
```

### Prisma Implementation (Infrastructure Layer)

```typescript
// src/infrastructure/database/repositories/PrismaServiceRequestRepository.ts

export class PrismaServiceRequestRepository implements IServiceRequestRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly mapper: ServiceRequestMapper
  ) {}

  async findById(id: string): Promise<ServiceRequest | null> {
    const data = await this.prisma.serviceRequest.findUnique({
      where: { id },
      include: {
        customer: true,
        location: true,
      }
    });

    if (!data) return null;

    return this.mapper.toDomain(data);
  }

  async findByStatus(status: ServiceStatus): Promise<ServiceRequest[]> {
    const data = await this.prisma.serviceRequest.findMany({
      where: { status },
      include: {
        customer: true,
        location: true,
      }
    });

    return data.map(item => this.mapper.toDomain(item));
  }

  async save(request: ServiceRequest): Promise<void> {
    const data = this.mapper.toPersistence(request);

    await this.prisma.serviceRequest.upsert({
      where: { id: request.id },
      create: data,
      update: data,
    });
  }

  async findEmergencyRequests(area: ServiceArea): Promise<ServiceRequest[]> {
    // Complex query with optimization
    const data = await this.prisma.serviceRequest.findMany({
      where: {
        priority: 'EMERGENCY',
        serviceArea: {
          in: area.postcodes,
        },
        status: {
          not: 'COMPLETED'
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50, // Limit for performance
      include: {
        customer: true,
      }
    });

    return data.map(item => this.mapper.toDomain(item));
  }

  async findBySpecification(
    spec: Specification<ServiceRequest>
  ): Promise<ServiceRequest[]> {
    // Convert specification to Prisma where clause
    const whereClause = spec.toPrismaWhere();

    const data = await this.prisma.serviceRequest.findMany({
      where: whereClause,
      include: {
        customer: true,
        location: true,
      }
    });

    return data.map(item => this.mapper.toDomain(item));
  }

  async findPaginated(
    options: PaginationOptions
  ): Promise<PaginatedResult<ServiceRequest>> {
    const { page, pageSize, orderBy } = options;
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prisma.serviceRequest.findMany({
        skip,
        take: pageSize,
        orderBy: { [orderBy.field]: orderBy.direction },
        include: {
          customer: true,
          location: true,
        }
      }),
      this.prisma.serviceRequest.count()
    ]);

    return {
      items: data.map(item => this.mapper.toDomain(item)),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
```

### In-Memory Implementation (Testing)

```typescript
// src/infrastructure/database/repositories/InMemoryServiceRequestRepository.ts

export class InMemoryServiceRequestRepository implements IServiceRequestRepository {
  private store: Map<string, ServiceRequest> = new Map();

  async findById(id: string): Promise<ServiceRequest | null> {
    return this.store.get(id) || null;
  }

  async findByStatus(status: ServiceStatus): Promise<ServiceRequest[]> {
    return Array.from(this.store.values())
      .filter(req => req.status === status);
  }

  async save(request: ServiceRequest): Promise<void> {
    this.store.set(request.id, request);
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  async findEmergencyRequests(area: ServiceArea): Promise<ServiceRequest[]> {
    return Array.from(this.store.values())
      .filter(req =>
        req.priority === Priority.EMERGENCY &&
        area.includes(req.location)
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 50);
  }

  // ... other methods

  // Test helpers
  clear(): void {
    this.store.clear();
  }

  count(): number {
    return this.store.size;
  }
}
```

### Cached Repository Decorator

```typescript
// src/infrastructure/cache/CachedRepository.ts

export class CachedServiceRequestRepository implements IServiceRequestRepository {
  constructor(
    private readonly inner: IServiceRequestRepository,
    private readonly cache: ICacheService,
    private readonly ttl: number = 300 // 5 minutes
  ) {}

  async findById(id: string): Promise<ServiceRequest | null> {
    // Check cache first
    const cached = await this.cache.get<ServiceRequest>(`service-request:${id}`);
    if (cached) {
      return cached;
    }

    // Cache miss - get from database
    const result = await this.inner.findById(id);

    if (result) {
      // Store in cache
      await this.cache.set(`service-request:${id}`, result, this.ttl);
    }

    return result;
  }

  async save(request: ServiceRequest): Promise<void> {
    // Save to database
    await this.inner.save(request);

    // Invalidate cache
    await this.cache.delete(`service-request:${request.id}`);
    await this.cache.delete(`service-requests:customer:${request.customerId}`);
  }

  // Delegate other methods to inner repository
  async findByStatus(status: ServiceStatus): Promise<ServiceRequest[]> {
    return this.inner.findByStatus(status);
  }

  // ... other methods
}
```

### Dependency Injection Setup

```typescript
// src/infrastructure/di/container.ts

export function createContainer(config: AppConfig): Container {
  const prisma = new PrismaClient();
  const cache = new RedisCache(config.redis);
  const mapper = new ServiceRequestMapper();

  // Create base repository
  const baseRepository = new PrismaServiceRequestRepository(prisma, mapper);

  // Wrap with caching
  const repository = new CachedServiceRequestRepository(
    baseRepository,
    cache,
    300 // 5 min TTL
  );

  return {
    serviceRequestRepository: repository,
    // ... other repositories
  };
}
```

### Usage in Use Cases

```typescript
// src/application/use-cases/GetServiceRequestDetails.ts

export class GetServiceRequestDetails {
  constructor(
    private readonly repository: IServiceRequestRepository
  ) {}

  async execute(requestId: string): Promise<Result<ServiceRequestDTO>> {
    // Use repository - doesn't care about implementation
    const request = await this.repository.findById(requestId);

    if (!request) {
      return Result.fail(new NotFoundError('Service request not found'));
    }

    // Map to DTO
    const dto = ServiceRequestMapper.toDTO(request);

    return Result.ok(dto);
  }
}
```

## Consequences

### Positive

✅ **Testability**: Easy to test with in-memory repositories
✅ **Flexibility**: Can swap database/ORM without changing domain
✅ **Performance**: Easy to add caching transparently
✅ **Centralization**: All data access in one place
✅ **Type Safety**: Strong typing throughout the stack
✅ **Query Optimization**: Repository can optimize internally

### Negative

⚠️ **Additional Code**: More files and interfaces
⚠️ **Mapping Overhead**: Need to map between database and domain models
⚠️ **Learning Curve**: Team needs to understand pattern
⚠️ **Query Limitations**: Complex queries harder to express

### Mitigation Strategies

**Mapping Overhead**:
- Use automated mapping libraries (class-transformer)
- Keep domain models close to database schema
- Only map when truly necessary

**Query Limitations**:
- Implement Specification pattern for complex queries
- Allow raw queries for complex reporting
- Use query objects for specialized queries

## Repository Guidelines

**1. One Repository Per Aggregate Root**
```typescript
// ✅ Good: One repository for ServiceRequest aggregate
IServiceRequestRepository

// ❌ Bad: Separate repositories for related entities
IServiceRequestRepository
IServiceRequestItemRepository  // Items belong to ServiceRequest
```

**2. Collection-Like Interface**
```typescript
// ✅ Good: Methods read like collection operations
repository.findById(id)
repository.save(entity)
repository.delete(id)

// ❌ Bad: CRUD-like naming
repository.select(id)
repository.insert(entity)
repository.remove(id)
```

**3. Return Domain Entities, Not DTOs**
```typescript
// ✅ Good: Returns domain entity
async findById(id: string): Promise<ServiceRequest | null>

// ❌ Bad: Returns DTO or database model
async findById(id: string): Promise<ServiceRequestDTO>
```

**4. Keep Repository Interface in Domain**
```typescript
// ✅ Good: Interface in domain, implementation in infrastructure
src/domain/repositories/IServiceRequestRepository.ts
src/infrastructure/database/repositories/PrismaServiceRequestRepository.ts

// ❌ Bad: Both in infrastructure
src/infrastructure/repositories/IServiceRequestRepository.ts
src/infrastructure/repositories/ServiceRequestRepository.ts
```

## Testing Strategy

**Unit Tests** (with in-memory repository):
```typescript
describe('RequestEmergencyService', () => {
  let useCase: RequestEmergencyService;
  let repository: InMemoryServiceRequestRepository;

  beforeEach(() => {
    repository = new InMemoryServiceRequestRepository();
    useCase = new RequestEmergencyService(repository, mockNotificationService);
  });

  it('should create emergency service request', async () => {
    const result = await useCase.execute(mockDTO);

    expect(result.success).toBe(true);
    expect(repository.count()).toBe(1);
  });
});
```

**Integration Tests** (with real database):
```typescript
describe('PrismaServiceRequestRepository', () => {
  let repository: PrismaServiceRequestRepository;
  let prisma: PrismaClient;

  beforeEach(async () => {
    prisma = new PrismaClient();
    await prisma.serviceRequest.deleteMany();
    repository = new PrismaServiceRequestRepository(prisma, new ServiceRequestMapper());
  });

  it('should persist service request', async () => {
    const request = ServiceRequest.create(mockData);
    await repository.save(request.value);

    const found = await repository.findById(request.value.id);
    expect(found).toEqual(request.value);
  });
});
```

## Migration Path

**Phase 1**: Create repository interfaces for core entities
- ServiceRequest
- Customer
- InsuranceClaim

**Phase 2**: Implement Prisma repositories
**Phase 3**: Implement in-memory repositories for testing
**Phase 4**: Add caching decorators
**Phase 5**: Migrate all data access to repositories

## References

- [Repository Pattern (Martin Fowler)](https://martinfowler.com/eaaCatalog/repository.html)
- [DDD Repository Pattern](https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/)
- [Specification Pattern](https://en.wikipedia.org/wiki/Specification_pattern)

## Related ADRs

- ADR-001: Adopt Clean Architecture
- ADR-003: Implement DDD Bounded Contexts
- ADR-005: Use Redis for Caching

---

**Decision Date**: 2025-11-07
**Reviewed By**: Architecture Team
**Next Review**: 2025-12-07 (1 month)

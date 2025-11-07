# Architecture Overview - Disaster Recovery Service Platform

## Executive Summary

This document outlines the complete software architecture for the Brisbane-based disaster recovery service platform. The architecture follows Clean Architecture principles with clear separation of concerns, domain-driven design, and modern cloud-native patterns.

## Architecture Impact Assessment: **HIGH**

This architecture transformation affects:
- All application layers (presentation, business logic, data access)
- API design and routing structure
- State management and data flow
- Error handling and logging
- Security and performance optimization
- Testing and deployment strategies

## System Context

### Business Domain
- **Primary Service**: Local disaster recovery and restoration services
- **Service Areas**: Brisbane, Ipswich, Logan (Queensland, Australia)
- **Target Market**: High net worth residential, commercial properties, insurance companies
- **Key Differentiator**: Master Restorer certification (Phill McGurk)

### Technical Context
- **Platform**: Next.js 14 with App Router
- **Runtime**: Node.js 20+
- **Database**: PostgreSQL (via Prisma ORM)
- **Caching**: Redis (Upstash)
- **Hosting**: Vercel Edge Network
- **CDN**: Cloudflare

## Architecture Principles

### 1. Clean Architecture (Hexagonal Architecture)
```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  (Next.js Pages, API Routes, React Components)              │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                   Application Layer                          │
│  (Use Cases, DTOs, Service Orchestration)                   │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                     Domain Layer                             │
│  (Business Logic, Entities, Value Objects)                  │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                 Infrastructure Layer                         │
│  (Database, External APIs, File System, Cache)              │
└─────────────────────────────────────────────────────────────┘
```

### 2. Dependency Rule
- Dependencies flow inward: Infrastructure → Domain ← Application ← Presentation
- Inner layers NEVER depend on outer layers
- Domain layer has ZERO external dependencies

### 3. SOLID Principles
- **S**ingle Responsibility: Each module has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Interfaces are substitutable
- **I**nterface Segregation: Clients don't depend on unused interfaces
- **D**ependency Inversion: Depend on abstractions, not concretions

### 4. Domain-Driven Design (DDD)
- **Bounded Contexts**: Emergency Services, Insurance Claims, Service Management
- **Aggregates**: Service Request, Insurance Claim, Customer
- **Value Objects**: Address, PhoneNumber, ServiceArea
- **Domain Events**: ServiceRequested, ClaimSubmitted, EmergencyAlerted

## Layered Architecture Design

### Layer 1: Domain Layer (`/src/domain`)

**Purpose**: Core business logic and rules, completely independent of frameworks

**Structure**:
```
src/domain/
├── entities/              # Core business objects
│   ├── ServiceRequest.ts
│   ├── InsuranceClaim.ts
│   ├── Customer.ts
│   └── EmergencyJob.ts
├── value-objects/         # Immutable value types
│   ├── Address.ts
│   ├── PhoneNumber.ts
│   ├── ServiceArea.ts
│   └── Money.ts
├── repositories/          # Repository interfaces (not implementations)
│   ├── IServiceRequestRepository.ts
│   ├── IClaimRepository.ts
│   └── ICustomerRepository.ts
├── services/              # Domain services
│   ├── ServiceAreaValidator.ts
│   ├── EmergencyPriorityCalculator.ts
│   └── ClaimEligibilityService.ts
├── events/                # Domain events
│   ├── ServiceRequestedEvent.ts
│   ├── ClaimSubmittedEvent.ts
│   └── EmergencyAlertedEvent.ts
└── errors/                # Domain-specific errors
    ├── DomainError.ts
    ├── ValidationError.ts
    └── BusinessRuleViolation.ts
```

**Key Characteristics**:
- No external dependencies (except TypeScript)
- Pure business logic
- Framework-agnostic
- Highly testable

### Layer 2: Application Layer (`/src/application`)

**Purpose**: Orchestrate domain logic, implement use cases

**Structure**:
```
src/application/
├── use-cases/             # Application use cases
│   ├── emergency/
│   │   ├── RequestEmergencyService.ts
│   │   ├── CalculateResponseTime.ts
│   │   └── AlertEmergencyTeam.ts
│   ├── insurance/
│   │   ├── SubmitInsuranceClaim.ts
│   │   ├── ValidateClaimDocuments.ts
│   │   └── TrackClaimStatus.ts
│   └── services/
│       ├── BookServiceAppointment.ts
│       ├── GetServiceQuote.ts
│       └── ValidateServiceArea.ts
├── dtos/                  # Data Transfer Objects
│   ├── ServiceRequestDTO.ts
│   ├── ClaimSubmissionDTO.ts
│   └── QuoteRequestDTO.ts
├── ports/                 # Interface definitions for infrastructure
│   ├── IEmailService.ts
│   ├── IStorageService.ts
│   ├── IAnalyticsService.ts
│   └── INotificationService.ts
├── mappers/               # Convert between DTOs and Entities
│   ├── ServiceRequestMapper.ts
│   └── ClaimMapper.ts
└── validators/            # Input validation
    ├── ServiceRequestValidator.ts
    └── ClaimValidator.ts
```

### Layer 3: Infrastructure Layer (`/src/infrastructure`)

**Purpose**: Implementation of technical concerns and external integrations

**Structure**:
```
src/infrastructure/
├── database/              # Database implementations
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── client.ts
│   │   └── migrations/
│   ├── repositories/      # Repository implementations
│   │   ├── PrismaServiceRequestRepository.ts
│   │   ├── PrismaClaimRepository.ts
│   │   └── PrismaCustomerRepository.ts
│   └── seeders/
│       └── ServiceDataSeeder.ts
├── cache/                 # Caching implementations
│   ├── RedisCache.ts
│   ├── InMemoryCache.ts
│   └── CacheKeyBuilder.ts
├── external-services/     # Third-party integrations
│   ├── email/
│   │   ├── SendGridEmailService.ts
│   │   └── NodemailerService.ts
│   ├── analytics/
│   │   ├── GoogleAnalyticsService.ts
│   │   └── MixpanelService.ts
│   ├── maps/
│   │   └── GoogleMapsService.ts
│   └── seo/
│       └── SemrushService.ts
├── storage/               # File storage
│   ├── S3StorageService.ts
│   └── LocalStorageService.ts
├── logging/               # Logging implementations
│   ├── WinstonLogger.ts
│   ├── CloudWatchLogger.ts
│   └── LoggerFactory.ts
└── monitoring/            # Monitoring and observability
    ├── SentryErrorTracker.ts
    ├── DatadogMetrics.ts
    └── HealthCheckService.ts
```

### Layer 4: Presentation Layer (`/app`, `/components`)

**Purpose**: User interface and API endpoints

**Structure**:
```
app/                       # Next.js App Router
├── (marketing)/           # Route groups
│   ├── page.tsx          # Homepage
│   ├── services/
│   ├── emergency/
│   └── about/
├── api/                   # API routes
│   ├── v1/
│   │   ├── emergency/
│   │   ├── claims/
│   │   └── services/
│   └── webhooks/
└── (protected)/           # Protected routes
    └── client-portal/

components/                # React components
├── ui/                    # Base UI components (shadcn)
├── features/              # Feature-specific components
│   ├── emergency/
│   ├── insurance/
│   └── booking/
└── shared/                # Shared components
    ├── layouts/
    ├── navigation/
    └── forms/
```

## Cross-Cutting Concerns

### 1. Dependency Injection Container

**File**: `/src/infrastructure/di/container.ts`

**Implementation**:
```typescript
interface Container {
  // Repositories
  serviceRequestRepository: IServiceRequestRepository;
  claimRepository: IClaimRepository;

  // Services
  emailService: IEmailService;
  storageService: IStorageService;

  // Use Cases
  requestEmergencyService: RequestEmergencyService;
  submitInsuranceClaim: SubmitInsuranceClaim;
}
```

**Benefits**:
- Loose coupling
- Easy testing with mocks
- Configuration-based dependency resolution
- Lifecycle management

### 2. Error Handling Architecture

**Strategy**: Railway-Oriented Programming with Result types

```typescript
type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };
```

**Error Hierarchy**:
```
AppError (abstract)
├── DomainError
│   ├── ValidationError
│   └── BusinessRuleViolation
├── InfrastructureError
│   ├── DatabaseError
│   ├── NetworkError
│   └── ExternalServiceError
└── ApplicationError
    ├── UnauthorizedError
    ├── NotFoundError
    └── ConflictError
```

### 3. Logging Architecture

**Structured Logging** with Winston:

```typescript
logger.info('Service request created', {
  requestId: req.id,
  serviceType: req.serviceType,
  location: req.serviceArea,
  priority: req.priority,
  customerId: req.customerId
});
```

**Log Levels**:
- ERROR: System failures requiring immediate attention
- WARN: Degraded functionality, continue operation
- INFO: Business events and significant state changes
- DEBUG: Detailed diagnostic information
- TRACE: Very detailed diagnostic information

### 4. Configuration Management

**File**: `/src/infrastructure/config/index.ts`

**Environment-based configuration**:
- Development (`dev`)
- Staging (`staging`)
- Production (`production`)

**Configuration validation** with Zod schemas:
```typescript
const ConfigSchema = z.object({
  database: DatabaseConfig,
  cache: CacheConfig,
  email: EmailConfig,
  security: SecurityConfig,
});
```

### 5. Caching Strategy

**Multi-layer caching**:

1. **Browser Cache**: Static assets (1 year)
2. **CDN Cache**: HTML pages (5 minutes)
3. **Application Cache (Redis)**: API responses (15 minutes)
4. **Database Query Cache**: Frequently accessed data

**Cache Invalidation**:
- Time-based expiration (TTL)
- Event-based invalidation (on data mutation)
- Manual cache busting (admin panel)

### 6. API Design Patterns

**RESTful API with versioning**:
```
/api/v1/emergency/request
/api/v1/claims/submit
/api/v1/services/quote
```

**Request/Response Standards**:
```typescript
// Request
interface ApiRequest<T> {
  data: T;
  metadata?: RequestMetadata;
}

// Response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorDetails;
  metadata: ResponseMetadata;
}
```

**Error Responses**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid service area",
    "details": {
      "field": "postcode",
      "value": "9999",
      "constraint": "Must be Brisbane/Ipswich/Logan postcode"
    }
  },
  "metadata": {
    "requestId": "req_123",
    "timestamp": "2025-11-07T08:30:00Z"
  }
}
```

## Security Architecture

### 1. Authentication & Authorization

**Strategy**: JWT-based authentication with role-based access control (RBAC)

**Roles**:
- `customer`: Can book services, view own claims
- `admin`: Full system access
- `staff`: Can manage jobs and claims
- `guest`: Public access only

### 2. Data Protection

- **Encryption at Rest**: Database encryption (PostgreSQL)
- **Encryption in Transit**: TLS 1.3
- **Sensitive Data**: PII encrypted with AES-256
- **Secrets Management**: Environment variables (Vercel Secrets)

### 3. Rate Limiting

**Implemented at multiple levels**:
- Middleware: 100 requests/minute per IP
- API routes: 10 requests/minute per endpoint
- Emergency routes: Higher limits (500/minute)

### 4. Input Validation

**Multi-layer validation**:
1. Client-side: React Hook Form + Zod
2. API layer: Request validation middleware
3. Domain layer: Business rule validation

### 5. CSRF Protection

- CSRF tokens for all form submissions
- SameSite cookie attribute
- Origin header validation

### 6. Content Security Policy (CSP)

Strict CSP headers configured in middleware:
- `script-src 'self'` (no inline scripts in production)
- `style-src 'self' 'unsafe-inline'`
- `img-src 'self' data: https:`

## Performance Architecture

### 1. Frontend Performance

**Metrics Targets**:
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Optimization Strategies**:
- Code splitting (automatic with Next.js)
- Image optimization (next/image)
- Font optimization (next/font)
- Lazy loading (React.lazy + Suspense)
- Prefetching (Next.js Link prefetch)

### 2. Backend Performance

**Database Optimization**:
- Connection pooling (PgBouncer)
- Query optimization (indexed columns)
- N+1 query prevention (Prisma includes)
- Database sharding (future: multi-region)

**API Performance**:
- Response caching (Redis)
- Compression (gzip/brotli)
- HTTP/2 server push
- Edge Functions (Vercel Edge)

### 3. Monitoring & Observability

**APM Integration**:
- Server-side: Vercel Analytics
- Client-side: Web Vitals reporting
- Error tracking: Sentry
- Uptime monitoring: Pingdom

**Custom Metrics**:
- Emergency response time
- Claim processing duration
- Booking conversion rate
- Page load times by route

## Data Flow Patterns

### 1. Emergency Service Request Flow

```
User Action (Emergency Page)
    ↓
React Component (EmergencyForm)
    ↓
API Route (/api/v1/emergency/request)
    ↓
Use Case (RequestEmergencyService)
    ↓
Domain Service (EmergencyPriorityCalculator)
    ↓
Repository (ServiceRequestRepository)
    ↓
Database (Prisma → PostgreSQL)
    ↓
Domain Event (ServiceRequestedEvent)
    ↓
Event Handlers (Email, SMS, Analytics)
```

### 2. Insurance Claim Submission Flow

```
User Upload Documents
    ↓
Storage Service (S3/Local)
    ↓
API Route (/api/v1/claims/submit)
    ↓
Use Case (SubmitInsuranceClaim)
    ↓
Validator (ClaimValidator)
    ↓
Repository (ClaimRepository)
    ↓
External Service (Clean Claims API)
    ↓
Response to User
```

### 3. Service Area Validation Flow

```
User Enters Postcode
    ↓
Client-side Validation
    ↓
API Route (/api/v1/services/validate-area)
    ↓
Cache Check (Redis)
    ↓ (if miss)
Use Case (ValidateServiceArea)
    ↓
Domain Service (ServiceAreaValidator)
    ↓
Response with Service Availability
```

## Testing Architecture

### 1. Testing Pyramid

```
      /\
     /E2E\           (10% - Critical user journeys)
    /──────\
   /  API   \        (30% - API endpoints and use cases)
  /──────────\
 /   Unit     \      (60% - Domain logic and utilities)
/──────────────\
```

### 2. Testing Layers

**Unit Tests** (`*.test.ts`):
- Domain entities
- Value objects
- Domain services
- Utility functions

**Integration Tests** (`*.integration.test.ts`):
- Repository implementations
- External service integrations
- Database operations

**API Tests** (`*.api.test.ts`):
- API route handlers
- Middleware
- Authentication/Authorization

**E2E Tests** (`*.e2e.test.ts`):
- Critical user flows (Playwright)
- Emergency booking
- Claim submission
- Service area selection

### 3. Test Infrastructure

**Tools**:
- Jest: Unit and integration tests
- Playwright: E2E tests
- React Testing Library: Component tests
- MSW: API mocking

**Test Database**:
- SQLite for fast unit tests
- PostgreSQL container for integration tests

## Deployment Architecture

### 1. CI/CD Pipeline

```
Code Push (GitHub)
    ↓
GitHub Actions Workflow
    ↓
├─ Lint & Type Check
├─ Unit Tests
├─ Integration Tests
├─ Build Application
└─ E2E Tests (Staging)
    ↓
Deploy to Vercel
    ↓
Smoke Tests (Production)
    ↓
Monitoring & Alerts
```

### 2. Environment Strategy

**Environments**:
1. **Development** (`localhost:3000`)
   - Local database
   - Mock external services
   - Debug logging

2. **Staging** (`staging.dr-new.vercel.app`)
   - Production-like environment
   - Staging database
   - Real external services (test mode)

3. **Production** (`dr-new-ten.vercel.app`)
   - Production database
   - Production external services
   - Error-only logging

### 3. Rollback Strategy

**Instant Rollback**:
- Vercel deployments are immutable
- Previous deployment URLs remain active
- One-click rollback in Vercel dashboard

**Database Migrations**:
- Forward-only migrations
- Backward-compatible changes
- Migration rollback scripts prepared

## Scalability Patterns

### 1. Horizontal Scaling

**Current**: Vercel Edge Functions (auto-scaling)

**Future Considerations**:
- Microservices architecture (if needed)
- Service mesh (Istio/Linkerd)
- Message queue (RabbitMQ/SQS)

### 2. Database Scaling

**Current**: Single PostgreSQL instance

**Scaling Path**:
1. Read replicas (for reporting)
2. Connection pooling (PgBouncer)
3. Database sharding (by service area)
4. Multi-region replication

### 3. Caching Scaling

**Current**: Redis (Upstash - globally distributed)

**Scaling Path**:
1. Cache warming on deployment
2. Distributed caching (Redis Cluster)
3. Edge caching (Cloudflare)

## Migration Strategy

### Phase 1: Foundation (Current Sprint)
- ✅ Set up directory structure
- ✅ Create core domain entities
- ✅ Implement repository pattern
- ✅ Set up dependency injection

### Phase 2: Application Layer (Next Sprint)
- ⏳ Implement use cases
- ⏳ Create DTOs and mappers
- ⏳ Set up validation layer

### Phase 3: Infrastructure (Following Sprint)
- ⏳ Implement external service adapters
- ⏳ Set up caching infrastructure
- ⏳ Configure logging and monitoring

### Phase 4: Testing & Documentation
- ⏳ Write comprehensive tests
- ⏳ Create API documentation
- ⏳ Architecture diagrams

## Architectural Decision Records (ADRs)

Detailed decisions documented in `/docs/architecture/decisions/`:

1. **ADR-001**: Adopt Clean Architecture
2. **ADR-002**: Use Repository Pattern
3. **ADR-003**: Implement DDD Bounded Contexts
4. **ADR-004**: Choose PostgreSQL over MongoDB
5. **ADR-005**: Use Redis for Caching
6. **ADR-006**: Implement Railway-Oriented Programming
7. **ADR-007**: Use Zod for Runtime Validation
8. **ADR-008**: Deploy to Vercel Edge Network

## Conclusion

This architecture provides:

✅ **Maintainability**: Clear separation of concerns
✅ **Testability**: Dependency injection and pure functions
✅ **Scalability**: Layered architecture supports growth
✅ **Security**: Defense in depth with multiple layers
✅ **Performance**: Optimized at every layer
✅ **Reliability**: Error handling and monitoring built-in

**Architectural Complexity**: Medium-High
**Development Velocity Impact**: Initial slowdown, long-term acceleration
**Technical Debt Reduction**: Significant
**Code Quality Improvement**: High

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-07
**Author**: Software Architect (Claude)
**Status**: Active

# Database Layer - Quick Reference

## Overview
Optimized database layer with connection pooling, caching, repository pattern, and performance monitoring.

## Quick Start

### 1. Basic Database Access
```typescript
import { prisma } from '@/lib/db';

// Use Prisma as normal
const users = await prisma.user.findMany();
```

### 2. Use Repositories (Recommended)
```typescript
import { leadRepository, partnerRepository } from '@/lib/db/repositories';

// Get lead with caching
const lead = await leadRepository.getById('lead_123');

// Paginated results with caching
const { data, pagination } = await leadRepository.getByStatus('NEW', 1, 20);

// Create with auto cache invalidation
const newLead = await leadRepository.createLead({
  fullName: 'John Doe',
  email: 'john@example.com',
  // ... other fields
});
```

### 3. Use Cache Directly
```typescript
import { cacheClient, CacheStrategies, CacheKeys } from '@/lib/cache';

// Get or set with fallback
const data = await cacheClient.getOrSet(
  CacheKeys.lead('lead_123'),
  async () => {
    return await prisma.lead.findUnique({ where: { id: 'lead_123' } });
  },
  CacheStrategies.QUERY
);

// Invalidate cache
await cacheClient.delete(CacheKeys.lead('lead_123'));
```

### 4. Prevent N+1 Queries
```typescript
import { createDataLoaders } from '@/lib/db/query-optimizer';

const loaders = createDataLoaders();

// Batch load partners
for (const lead of leads) {
  const partner = await loaders.partners.load(lead.partnerId);
}
```

### 5. Batch Operations
```typescript
import { BatchOperations } from '@/lib/db/query-optimizer';

// Batch insert
await BatchOperations.batchInsert(prisma.lead, leadData, 100);
```

### 6. Monitor Performance
```typescript
import { performanceMonitor, healthCheck } from '@/lib/db/performance-monitoring';

// Get stats
const stats = performanceMonitor.getCacheStats();

// Health check
const health = await healthCheck();
```

## Cache Strategies

| Strategy | TTL | Use Case |
|----------|-----|----------|
| STATIC | 24h | Static content |
| PAGE | 1h | Page data |
| API | 5m | API responses |
| QUERY | 10m | Database queries |
| SESSION | 30m | User sessions |
| SHORT | 1m | Short-lived data |
| LONG | 7d | Long-lived data |

## Cache Keys

```typescript
import { CacheKeys } from '@/lib/cache/strategies';

CacheKeys.lead(id)                      // 'lead:{id}'
CacheKeys.leadsByStatus(status, page)   // 'leads:status:{status}:page:{page}'
CacheKeys.partner(id)                   // 'partner:{id}'
CacheKeys.contractor(id)                // 'contractor:{id}'
CacheKeys.analytics(metric, timeframe)  // 'analytics:{metric}:{timeframe}'
```

## Invalidation

```typescript
import { invalidateCache } from '@/lib/cache/strategies';

// Invalidate specific entity
await invalidateCache.lead('lead_123');
await invalidateCache.partner('partner_456');

// Invalidate collections
await invalidateCache.leads();
await invalidateCache.partners();

// Invalidate analytics
await invalidateCache.analytics();

// Invalidate everything
await invalidateCache.all();
```

## Performance APIs

### Database Performance
```bash
GET /api/performance/database?action=dashboard  # Full dashboard
GET /api/performance/database?action=health     # Health check
GET /api/performance/database?action=cache-stats # Cache statistics
GET /api/performance/database?action=query-stats # Query statistics
POST /api/performance/database                  # Reset metrics
```

### Cache Management
```bash
GET /api/performance/cache                      # Get stats
POST /api/performance/cache                     # Invalidate
  Body: { "action": "invalidate", "target": "leads" }
DELETE /api/performance/cache                   # Clear all
```

## Environment Setup

```env
# Database
DATABASE_URL="file:./dev.db"

# Redis (Optional - for production)
REDIS_URL=redis://localhost:6379

# Upstash Redis (Recommended for production)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

## Best Practices

✅ **DO**
- Use repositories for data access
- Cache frequently accessed data
- Invalidate cache on mutations
- Use DataLoader for N+1 prevention
- Monitor slow queries

❌ **DON'T**
- Create new Prisma instances
- Cache dynamic/personalized data
- Skip cache invalidation
- Ignore slow query warnings

## Repository Methods

### Lead Repository
```typescript
leadRepository.getById(id)
leadRepository.getByStatus(status, page, pageSize)
leadRepository.getByPartner(partnerId, page, pageSize)
leadRepository.search(filters, page, pageSize)
leadRepository.createLead(data)
leadRepository.updateLead(id, data)
leadRepository.deleteLead(id)
leadRepository.assignToPartner(leadId, partnerId)
leadRepository.acceptLead(leadId)
leadRepository.rejectLead(leadId)
leadRepository.completeLead(leadId)
leadRepository.getHighValueLeads(limit)
leadRepository.getStats(timeframe)
leadRepository.bulkUpdateStatus(leadIds, status)
```

### Partner Repository
```typescript
partnerRepository.getById(id)
partnerRepository.getByEmail(email)
partnerRepository.getActive(page, pageSize)
partnerRepository.createPartner(data)
partnerRepository.updatePartner(id, data)
partnerRepository.deletePartner(id)
partnerRepository.findByServiceArea(suburb)
partnerRepository.updateCredits(partnerId, amount)
partnerRepository.getLowCreditPartners(threshold)
partnerRepository.getStats(partnerId)
partnerRepository.verify(partnerId)
partnerRepository.suspend(partnerId)
partnerRepository.reactivate(partnerId)
```

### Contractor Repository
```typescript
contractorRepository.getById(id)
contractorRepository.getByEmail(email)
contractorRepository.getApproved(page, pageSize)
contractorRepository.createContractor(data)
contractorRepository.updateContractor(id, data)
contractorRepository.deleteContractor(id)
contractorRepository.approve(contractorId)
contractorRepository.reject(contractorId, reason)
contractorRepository.suspend(contractorId)
contractorRepository.updateOnboardingStep(contractorId, step)
contractorRepository.getByStatus(status)
contractorRepository.getWithExpiringCertifications(days)
contractorRepository.getWithExpiringInsurance(days)
contractorRepository.getStats(contractorId)
contractorRepository.updateLastLogin(contractorId)
contractorRepository.search(options)
```

## See Also
- [DATABASE_OPTIMIZATION_COMPLETE.md](../../DATABASE_OPTIMIZATION_COMPLETE.md) - Full documentation
- [connection.ts](./connection.ts) - Connection management
- [repositories/](./repositories/) - Repository implementations
- [query-optimizer.ts](./query-optimizer.ts) - Query optimization utilities
- [performance-monitoring.ts](./performance-monitoring.ts) - Performance monitoring

# Analytics Dashboard API Documentation

## Overview

The Analytics Dashboard API provides comprehensive data analytics and reporting capabilities for the Disaster Recovery platform. It includes real-time metrics, historical analysis, performance tracking, and advanced reporting features.

## Architecture

### Service Layer
- **AnalyticsService** (`/lib/services/analytics-service.ts`): Core analytics logic and data aggregation
- **MockDataService**: Simulated data layer (replace with actual database queries in production)

### Middleware
- **Authentication** (`/lib/middleware/auth.ts`): JWT-based authentication and role-based access control
- **Validation** (`/lib/services/validation-schemas.ts`): Zod-based request validation

### API Routes
All routes are protected and require authentication via Bearer token in the Authorization header.

## API Endpoints

### 1. Dashboard Metrics
**GET** `/api/analytics/dashboard`

Returns key performance indicators and dashboard metrics.

#### Query Parameters
- `tenantId` (optional): Filter by tenant ID
- `dateFrom` (optional): Start date (ISO 8601 format)
- `dateTo` (optional): End date (ISO 8601 format)
- `refreshInterval` (optional): Auto-refresh interval in ms

#### Response
```json
{
  "success": true,
  "data": {
    "totalRevenue": 2456789.50,
    "jobsCompleted": 342,
    "activeJobs": 27,
    "avgResponseTime": 45,
    "customerSatisfaction": 4.7,
    "insuranceApprovalRate": 94.5,
    "weekOverWeekGrowth": 12.3,
    "monthlyRecurringRevenue": 185000
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_1234567890_abc",
    "version": "1.0.0"
  }
}
```

### 2. Revenue Analytics
**GET** `/api/analytics/revenue`

Provides detailed revenue breakdown and trends.

#### Query Parameters
- `period` (required): day | week | month | quarter | year
- `tenantId` (optional): Filter by tenant ID
- `dateFrom` (optional): Start date
- `dateTo` (optional): End date
- `groupBy` (optional): service | insurer | location
- `includeForecasts` (optional): Include ML-based forecasts (requires ADMIN/MANAGER role)

#### Response
```json
{
  "success": true,
  "data": {
    "period": "month",
    "total": 456789.50,
    "byServiceType": [
      {
        "serviceType": "Water Damage Restoration",
        "revenue": 95000,
        "jobCount": 45,
        "avgJobValue": 2111.11,
        "growthRate": 15.5
      }
    ],
    "byInsurer": [...],
    "byLocation": [...],
    "trend": [
      {
        "date": "2024-01-01T00:00:00Z",
        "value": 15000,
        "forecast": 16500
      }
    ]
  }
}
```

### 3. Contractor Performance
**GET** `/api/analytics/contractors`

Returns contractor performance metrics and rankings.

#### Query Parameters
- `sortBy` (optional): rating | completionRate | responseTime | revenue | performance
- `filterBySpecialization` (optional): Filter by service specialization
- `minRating` (optional): Minimum rating filter (0-5)
- `active` (optional): Filter by active status

#### Response
```json
{
  "success": true,
  "data": [
    {
      "contractorId": "CON001",
      "name": "John Smith",
      "rating": 4.8,
      "completionRate": 92.5,
      "avgResponseTime": 35,
      "totalJobs": 156,
      "revenue": 178500,
      "customerComplaints": 2,
      "certifications": ["IICRC", "CARSI", "WHS"],
      "specializations": ["Water Damage"],
      "performanceScore": 94.2
    }
  ],
  "summary": {
    "totalContractors": 5,
    "avgRating": 4.6,
    "avgCompletionRate": 88.3,
    "totalRevenue": 750000
  }
}
```

### 4. Job Completion Metrics
**GET** `/api/analytics/jobs`

Provides detailed job completion analytics.

#### Query Parameters
- `dateFrom` (optional): Start date
- `dateTo` (optional): End date
- `serviceTypes` (optional): Comma-separated service types
- `priorities` (optional): EMERGENCY,HIGH,MEDIUM,LOW
- `insurers` (optional): Comma-separated insurer names
- `includeDelayed` (optional): Include delayed job analysis

#### Response
```json
{
  "success": true,
  "data": {
    "totalJobs": 450,
    "completedJobs": 342,
    "completionRate": 76,
    "avgCompletionTime": 48,
    "byServiceType": [...],
    "byPriority": [...],
    "byInsurer": [...],
    "delayedJobs": [
      {
        "jobId": "JOB-2024-001",
        "serviceType": "Water Damage",
        "delayReason": "Parts availability",
        "delayDays": 3,
        "impactedRevenue": 5500
      }
    ]
  },
  "insights": {
    "performanceIndicators": {
      "onTimeDeliveryRate": "85.5",
      "avgDelayImpact": 8750,
      "emergencyResponseRate": 98,
      "insuranceApprovalRate": 92.3
    },
    "recommendations": [
      "Consider increasing contractor capacity to improve completion rates",
      "Emergency response time exceeds target - review dispatch procedures"
    ]
  }
}
```

### 5. Report Export
**POST** `/api/analytics/reports/export`

Exports analytics reports in various formats.

#### Request Body
```json
{
  "type": "financial",
  "format": "pdf",
  "dateRange": {
    "from": "2024-01-01T00:00:00Z",
    "to": "2024-01-31T23:59:59Z"
  },
  "filters": {
    "serviceTypes": ["Water Damage", "Fire Damage"],
    "locations": ["Brisbane CBD"],
    "insurers": ["QBE", "IAG"]
  }
}
```

#### Report Types
- `financial`: Revenue, costs, and financial metrics
- `operational`: Job completion and operational KPIs
- `performance`: Contractor performance metrics
- `insurance`: Insurance claims and approvals
- `compliance`: Regulatory compliance data

#### Formats
- `json`: JSON data format
- `csv`: Comma-separated values
- `pdf`: PDF document
- `xlsx`: Excel spreadsheet

### 6. Real-time Analytics Stream
**GET** `/api/analytics/realtime`

Server-Sent Events stream for real-time analytics updates.

#### Event Types
- `connected`: Initial connection established
- `metrics`: Real-time metrics update
- `alert`: System alerts and notifications
- `error`: Stream errors

#### Example Client
```javascript
const eventSource = new EventSource('/api/analytics/realtime');

eventSource.addEventListener('metrics', (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time update:', data);
});
```

## Authentication

All endpoints require JWT authentication via Bearer token.

### Request Header
```
Authorization: Bearer <jwt_token>
```

### User Roles
- **ADMIN**: Full access to all features
- **MANAGER**: Access to analytics, reports, and contractor management
- **OPERATOR**: Access to job and basic analytics
- **CONTRACTOR**: Access to own performance data only
- **VIEWER**: Read-only access to analytics

### Permissions
- `analytics.view`: View analytics dashboards
- `analytics.export`: Export reports
- `jobs.view`: View job metrics
- `contractors.view`: View contractor performance
- `finance.view`: View financial data

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid date range",
    "details": {
      "field": "dateFrom",
      "issue": "Must be before dateTo"
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_1234567890_abc"
  }
}
```

### Error Codes
- `UNAUTHORIZED`: Missing or invalid authentication
- `FORBIDDEN`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid request parameters
- `NOT_FOUND`: Resource not found
- `INTERNAL_ERROR`: Server error

## Rate Limiting

- Dashboard endpoints: 60 requests/minute
- Export endpoints: 10 requests/minute
- Real-time stream: 1 concurrent connection per user

## Caching

Responses include cache headers for optimal performance:
- Dashboard metrics: 1 minute cache
- Revenue data: 5-60 minutes based on period
- Contractor performance: 5 minutes cache
- Job metrics: 3 minutes cache

## Testing

Use the included test suite to validate API functionality:

```typescript
import { runAllAnalyticsTests } from './test-analytics-api';

// Run all tests
await runAllAnalyticsTests();
```

### Test Coverage
- Authentication and authorization
- Role-based access control
- Data filtering and aggregation
- Report generation
- Real-time streaming
- Error handling

## Performance Considerations

1. **Data Aggregation**: Metrics are pre-aggregated where possible
2. **Caching**: Strategic caching reduces database load
3. **Pagination**: Large datasets support pagination (not shown in mock)
4. **Indexing**: Ensure proper database indexes on frequently queried fields
5. **Connection Pooling**: Use connection pooling for database queries

## Security Best Practices

1. **JWT Validation**: Tokens are verified on every request
2. **Role-Based Access**: Strict role and permission checks
3. **Input Validation**: All inputs validated with Zod schemas
4. **Tenant Isolation**: Multi-tenant data isolation
5. **Audit Logging**: All report exports are logged
6. **Rate Limiting**: Prevent abuse and DoS attacks

## Migration to Production

1. Replace `MockDataService` with actual database queries
2. Implement proper database connection pooling
3. Add Redis caching for improved performance
4. Set up monitoring and alerting (DataDog, New Relic)
5. Configure rate limiting (Redis-based or API Gateway)
6. Implement audit logging to persistent storage
7. Set up backup and disaster recovery procedures

## Support

For issues or questions about the Analytics API:
- Technical documentation: This README
- API testing: Use test-analytics-api.ts
- Production support: Contact system administrators

---

**Version**: 1.0.0
**Last Updated**: January 2024
**Maintained by**: Backend Architecture Team
# Disaster Recovery Brisbane API Documentation

Version: 1.0.0
Base URL: `https://dr-new-ten.vercel.app/api/v1`

## Overview

The Disaster Recovery Brisbane API provides endpoints for emergency disaster recovery services in Brisbane, Ipswich, and Logan. All endpoints use JSON for request and response bodies.

## Authentication

Currently, all endpoints are publicly accessible. Rate limiting is applied based on IP address.

## Rate Limiting

All API endpoints are rate-limited to prevent abuse:

| Endpoint Type | Limit | Window |
|--------------|-------|--------|
| Emergency | 10 requests | 1 hour |
| Contact/Quote | 5 requests | 1 hour |
| General | 100 requests | 15 minutes |
| Public Data | 300 requests | 15 minutes |

Rate limit headers are included in all responses:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests in window
- `X-RateLimit-Reset`: Unix timestamp when limit resets

## Response Format

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message",
  "metadata": {
    "timestamp": "2025-01-09T10:00:00.000Z",
    "version": "v1"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "metadata": {
    "timestamp": "2025-01-09T10:00:00.000Z",
    "version": "v1"
  }
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "metadata": { ... }
}
```

## Endpoints

### 1. Emergency Requests

Submit 24/7 emergency disaster recovery requests.

**Endpoint:** `POST /api/v1/emergency`

**Rate Limit:** 10 requests per hour

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "0412345678",
  "email": "john@example.com",
  "address": "123 Main Street",
  "suburb": "Hamilton",
  "emergencyType": "water",
  "description": "Burst pipe in kitchen, water flooding ground floor",
  "severity": "critical",
  "hasInsurance": true,
  "insuranceCompany": "RACQ Insurance",
  "preferredCallback": "0412345678"
}
```

**Field Validation:**
- `name`: 2-100 characters, letters, spaces, hyphens, apostrophes only
- `phone`: 8-15 characters, valid Australian format
- `email`: Valid email address, max 255 characters
- `address`: 5-200 characters
- `suburb`: 2-100 characters
- `emergencyType`: One of: `water`, `fire`, `storm`, `mould`, `biohazard`
- `description`: 10-2000 characters
- `severity`: One of: `critical`, `urgent`, `moderate`
- `hasInsurance`: Boolean
- `insuranceCompany`: Optional string
- `preferredCallback`: Optional string

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "requestId": "EM-1704790800000-ABC123",
    "estimatedResponse": "30 minutes",
    "priority": "emergency",
    "message": "Emergency request received. Our team will contact you immediately.",
    "nextSteps": [
      "Our emergency response team has been notified",
      "You will receive a call within 30 minutes",
      "Keep your phone nearby",
      "If situation worsens, call 1300 309 361 immediately"
    ],
    "contactPhone": "1300 309 361"
  },
  "message": "Emergency request submitted successfully",
  "metadata": { ... }
}
```

**Error Responses:**
- `400`: Validation error
- `429`: Rate limit exceeded
- `500`: Internal server error

---

### 2. Services List

Retrieve available disaster recovery services with optional filtering.

**Endpoint:** `GET /api/v1/services`

**Rate Limit:** 300 requests per 15 minutes

**Query Parameters:**
- `category` (optional): Filter by category (`water`, `fire`, `mould`, `storm`, `commercial`)
- `availability` (optional): Filter by availability (`24x7`, `business-hours`)
- `location` (optional): Filter by service area (e.g., `Brisbane`, `Ipswich`)
- `emergency` (optional): Filter emergency services only (`true`, `false`)
- `search` (optional): Search in name, description, features
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Example Request:**
```
GET /api/v1/services?category=water&emergency=true&page=1&limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "water-damage-restoration",
      "slug": "water-damage-restoration",
      "name": "Water Damage Restoration",
      "category": "water",
      "description": "Emergency water damage restoration and drying services",
      "features": [
        "24/7 Emergency Response",
        "Water Extraction",
        "Structural Drying",
        "Moisture Detection",
        "Insurance Documentation"
      ],
      "responseTime": "60 minutes",
      "available24x7": true,
      "certifications": ["IICRC Certified", "Master Restorer"],
      "serviceAreas": ["Brisbane", "Ipswich", "Logan"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  },
  "metadata": { ... }
}
```

**Caching:** Responses are cached for 24 hours with CDN support.

---

### 3. Service Areas

Retrieve service areas and coverage information.

**Endpoint:** `GET /api/v1/locations`

**Rate Limit:** 300 requests per 15 minutes

**Query Parameters:**
- `type` (optional): Filter by type (`suburb`, `city`, `region`)
- `emergency` (optional): Filter emergency coverage only (`true`, `false`)

**Example Request:**
```
GET /api/v1/locations?type=suburb&emergency=true
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "hamilton",
      "name": "Hamilton",
      "slug": "hamilton",
      "type": "suburb",
      "state": "QLD",
      "postcode": "4007",
      "coordinates": {
        "lat": -27.4389,
        "lng": 153.0628
      },
      "coverage": "primary",
      "services": ["water", "fire", "mould", "storm"],
      "emergencyResponse": true,
      "responseTime": "30 minutes"
    }
  ],
  "metadata": { ... }
}
```

**Coverage Types:**
- `primary`: Core service area, fastest response
- `secondary`: Extended coverage area
- `extended`: Available on request

**Caching:** Responses are cached for 24 hours with CDN support.

---

### 4. Contact Form

Submit general inquiries and service requests.

**Endpoint:** `POST /api/v1/contact`

**Rate Limit:** 5 requests per hour

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "0412345678",
  "service": "water-damage-restoration",
  "urgency": "standard",
  "message": "Need assessment for water damage in basement",
  "propertyType": "residential",
  "hasInsurance": true,
  "preferredContact": "email"
}
```

**Field Validation:**
- `name`: 2-100 characters, letters, spaces, hyphens, apostrophes only
- `email`: Valid email address, max 255 characters
- `phone`: 8-15 characters, valid Australian format
- `service`: Service ID or name
- `urgency`: One of: `emergency`, `urgent`, `standard`, `quote`, `routine`
- `message`: 10-2000 characters
- `propertyType`: Optional string
- `hasInsurance`: Optional boolean
- `preferredContact`: Optional, one of: `phone`, `email`, `sms`

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "success": true,
    "submissionId": "CT-1704790800000-XYZ789",
    "message": "Your message has been received. We will contact you shortly.",
    "expectedResponse": "24 hours"
  },
  "message": "Contact form submitted successfully",
  "metadata": { ... }
}
```

---

### 5. Quote Requests

Request quotes for disaster recovery services.

**Endpoint:** `POST /api/v1/quote`

**Rate Limit:** 5 requests per hour

**Request Body:**
```json
{
  "name": "Bob Wilson",
  "email": "bob@example.com",
  "phone": "0412345678",
  "serviceType": ["water-damage-restoration", "mould-remediation"],
  "propertyType": "commercial",
  "address": "456 Business Street",
  "suburb": "Brisbane CBD",
  "description": "Office building with water damage on multiple floors",
  "preferredContactTime": "Business hours",
  "urgency": "urgent"
}
```

**Field Validation:**
- `name`: 2-100 characters
- `email`: Valid email address
- `phone`: Valid Australian phone number
- `serviceType`: Array of service IDs (min 1)
- `propertyType`: One of: `residential`, `commercial`, `industrial`
- `address`: Optional, 5-200 characters
- `suburb`: 2-100 characters
- `description`: 10-2000 characters
- `preferredContactTime`: Optional string
- `urgency`: One of: `emergency`, `urgent`, `standard`, `routine`

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "quoteId": "QT-1704790800000-DEF456",
    "estimatedResponseTime": "4 hours",
    "message": "Quote request received. We will contact you with a detailed quote.",
    "services": ["water-damage-restoration", "mould-remediation"]
  },
  "message": "Quote request submitted successfully",
  "metadata": { ... }
}
```

**Get Quote Status:**
```
GET /api/v1/quote?id=QT-1704790800000-DEF456
```

**Quote Status Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "QT-1704790800000-DEF456",
    "status": "new",
    "submittedAt": "2025-01-09T10:00:00.000Z",
    "estimatedResponseTime": "4 hours"
  },
  "metadata": { ... }
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `INVALID_REQUEST` | Malformed request |
| `RESOURCE_NOT_FOUND` | Resource not found |
| `METHOD_NOT_ALLOWED` | HTTP method not supported |
| `INTERNAL_SERVER_ERROR` | Server error |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable |

## Security

### HTTPS Only
All API requests must use HTTPS.

### Input Sanitization
All user input is sanitized to prevent XSS attacks:
- HTML tags removed
- JavaScript protocol removed
- Event handlers removed

### Rate Limiting
Strict rate limits prevent abuse and ensure service availability.

### Headers
Security headers are applied to all responses:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## CORS

CORS is enabled for authorized origins. Credentials are supported for authenticated requests.

## Caching

Static and semi-static content is cached with appropriate TTL:
- Services: 24 hours
- Locations: 24 hours
- Service areas: 12 hours

CDN caching is enabled with `Cache-Control` and `CDN-Cache-Control` headers.

## Support

For API support, contact:
- **Phone:** 1300 309 361
- **Email:** support@disasterrecoverybrisbane.com.au

## Changelog

### Version 1.0.0 (2025-01-09)
- Initial API release
- Emergency request endpoint
- Services listing with filters
- Location data endpoint
- Contact form endpoint
- Quote request endpoint
- Rate limiting implementation
- Response caching
- Input validation and sanitization

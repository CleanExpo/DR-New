# NRPG Contractor Onboarding API Documentation

## Overview

The NRPG Contractor Onboarding API provides endpoints for contractors to register, complete their onboarding process, and for administrators to review and approve applications. The API follows RESTful principles and returns JSON responses.

## Base URL

```
Production: https://api.nrpg.com.au
Development: http://localhost:3000
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error message",
  "details": [] // Optional validation errors
}
```

Common HTTP status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Resource not found
- `500` - Internal server error

---

## Endpoints

### 1. Registration

#### POST /api/onboarding/register

Register a new contractor account and begin onboarding.

**Request Body:**
```json
{
  "email": "contractor@example.com",
  "password": "SecurePass123!",
  "name": "John Smith",
  "acceptedTerms": true
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "cuid_xxx",
    "token": "jwt_token_here",
    "onboardingId": "draft_id",
    "onboardingStep": 1,
    "email": "contractor@example.com",
    "message": "Registration successful. Please complete your onboarding."
  }
}
```

**Validation Rules:**
- Password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number
- Email: Valid email format
- Name: Min 2 characters
- Terms must be accepted

---

### 2. Draft Management

#### POST /api/onboarding/draft

Create or update an onboarding draft to save progress.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "step": 2,
  "data": {
    "businessDetails": { ... },
    "services": [ ... ]
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "draftId": "draft_id",
    "message": "Draft saved successfully"
  }
}
```

#### PATCH /api/onboarding/draft

Update existing draft with partial data.

**Request Body:**
```json
{
  "step": 3,
  "data": {
    "qualifications": [ ... ]
  }
}
```

#### GET /api/onboarding/draft

Retrieve saved draft data.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "draftId": "draft_id",
    "step": 3,
    "data": { ... },
    "progress": {
      "currentStep": 3,
      "totalSteps": 7,
      "completed": false
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T12:00:00Z"
  }
}
```

---

### 3. Business Details

#### POST /api/onboarding/business

Save contractor business details.

**Request Body:**
```json
{
  "businessName": "Smith Restoration Services",
  "tradingName": "SRS",
  "abn": "12345678901",
  "acn": "123456789",
  "phone": "0412345678",
  "email": "business@example.com",
  "website": "https://example.com",
  "address": {
    "street": "123 Main St",
    "city": "Brisbane",
    "state": "QLD",
    "postcode": "4000"
  },
  "mailingAddress": {
    "street": "PO Box 123",
    "city": "Brisbane",
    "state": "QLD",
    "postcode": "4001"
  },
  "yearsInBusiness": 5,
  "employeeCount": 10,
  "companyStructure": "PTY_LTD",
  "directors": [
    {
      "name": "John Smith",
      "position": "Director",
      "email": "john@example.com"
    }
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Business details saved successfully",
  "data": {
    "nextStep": 3,
    "completedStep": 2
  }
}
```

**Validation:**
- ABN: 11 digits, valid checksum
- Phone: Valid Australian number
- State: Valid Australian state code
- Postcode: 4 digits
- Company structure: SOLE_TRADER, PARTNERSHIP, PTY_LTD, TRUST

---

### 4. Service Selection

#### POST /api/onboarding/services

Select services the contractor will provide.

**Request Body:**
```json
{
  "services": [
    "WATER_DAMAGE",
    "FIRE_DAMAGE",
    "MOULD_REMEDIATION"
  ],
  "emergencyResponse": true,
  "afterHours": false,
  "weekendService": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Services selected successfully",
  "data": {
    "nextStep": 4,
    "completedStep": 3,
    "requiredCertifications": ["WRT", "ASD", "FSRT"]
  }
}
```

**Available Services:**
- WATER_DAMAGE
- FIRE_DAMAGE
- MOULD_REMEDIATION
- STORM_DAMAGE
- BIOHAZARD_CLEANUP
- CARPET_CLEANING
- CONTENTS_RESTORATION
- ELECTRONICS_RESTORATION
- DOCUMENT_DRYING
- TRAUMA_CLEANUP

---

### 5. IICRC Qualifications

#### POST /api/onboarding/qualifications

Upload IICRC qualification details.

**Request Body:**
```json
{
  "qualificationType": "WRT",
  "certificateNumber": "12345678",
  "issueDate": "2023-01-01",
  "expiryDate": "2025-01-01",
  "fileUrl": "/uploads/onboarding/cert_wrt.pdf",
  "serviceTypes": ["WATER_DAMAGE", "STORM_DAMAGE"]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Qualification added successfully",
  "data": {
    "qualificationId": "qual_id",
    "nextStep": 5,
    "completedStep": 4
  }
}
```

**IICRC Types:**
- WRT - Water Restoration Technician
- ASD - Applied Structural Drying
- AMRT - Applied Microbial Remediation Technician
- FSRT - Fire & Smoke Restoration Technician
- OCT - Odor Control Technician
- CCT - Carpet Cleaning Technician
- UFT - Upholstery & Fabric Cleaning Technician
- TCST - Trauma and Crime Scene Technician
- HST - Health and Safety Technician

#### GET /api/onboarding/qualifications

Retrieve all qualifications.

#### DELETE /api/onboarding/qualifications?id=<qualification_id>

Remove a qualification.

---

### 6. Insurance Documents

#### POST /api/onboarding/insurance

Upload insurance policy details.

**Request Body:**
```json
{
  "type": "PUBLIC_LIABILITY",
  "policyNumber": "PL123456",
  "provider": "ACME Insurance",
  "coverageAmount": 10000000,
  "expiryDate": "2025-12-31",
  "certificateUrl": "/uploads/onboarding/insurance_pl.pdf"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Insurance policy added successfully",
  "data": {
    "insuranceId": "insurance_id",
    "nextStep": 6,
    "completedStep": 5,
    "insuranceComplete": true
  }
}
```

**Insurance Types:**
- PUBLIC_LIABILITY (min $10M required)
- PROFESSIONAL_INDEMNITY (min $2M)
- WORKERS_COMPENSATION (required)
- COMMERCIAL_VEHICLE (optional)

---

### 7. Coverage Area & Subscription

#### POST /api/onboarding/coverage

Configure service coverage area and subscription tier.

**Request Body:**
```json
{
  "baseLocation": {
    "address": "123 Main St, Brisbane QLD 4000",
    "lat": -27.4698,
    "lng": 153.0251
  },
  "coverageRadius": 50,
  "additionalTerritories": [
    {
      "type": "POSTCODE",
      "value": "4001"
    },
    {
      "type": "SUBURB",
      "value": "South Brisbane"
    }
  ],
  "subscriptionTier": "TIER_50KM"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Coverage area and subscription tier selected successfully",
  "data": {
    "nextStep": 7,
    "completedStep": 6,
    "subscriptionTier": "TIER_50KM",
    "monthlyPrice": 800,
    "requiresPayment": true
  }
}
```

**Subscription Tiers:**
- TIER_25KM - $500/month (25km radius)
- TIER_50KM - $800/month (50km radius)
- TIER_75KM - $1200/month (75km radius)
- TIER_100KM - $1600/month (100km radius)
- RURAL - $2000/month (200km radius)

---

### 8. Submit Application

#### POST /api/onboarding/submit

Submit the completed application for review.

**Request Body:**
```json
{
  "confirmAccuracy": true,
  "confirmDocuments": true,
  "paymentMethodSelected": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Your application has been submitted successfully. You will hear from us within 24-48 hours.",
  "data": {
    "status": "UNDER_REVIEW",
    "submittedAt": "2024-01-01T12:00:00Z",
    "estimatedReviewTime": "24-48 hours",
    "nextSteps": [
      "Your application is being reviewed by our team",
      "We will verify your IICRC certifications",
      "We will confirm your insurance coverage",
      "Once approved, you will receive payment instructions",
      "After payment, your account will be activated"
    ]
  }
}
```

---

### 9. Check Status

#### GET /api/onboarding/status

Get comprehensive onboarding status and progress.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "contractorId": "contractor_id",
    "email": "contractor@example.com",
    "status": "UNDER_REVIEW",
    "onboardingStep": 7,
    "onboardingCompleted": false,

    "progress": {
      "account": true,
      "business": true,
      "services": true,
      "qualifications": true,
      "insurance": true,
      "coverage": true,
      "submitted": true,
      "verified": false
    },
    "completionPercentage": 85,

    "businessDetails": {
      "complete": true,
      "companyName": "Smith Restoration",
      "abn": "12345678901",
      "abnVerified": false
    },

    "qualifications": {
      "complete": true,
      "count": 3,
      "verified": 0,
      "pending": 3
    },

    "insurance": {
      "complete": true,
      "hasPublicLiability": true,
      "hasWorkersComp": true,
      "totalPolicies": 2,
      "verified": 0,
      "expiringSoon": 0
    },

    "coverage": {
      "complete": true,
      "radius": 50,
      "territories": 1
    },

    "subscription": {
      "complete": true,
      "tier": "TIER_50KM",
      "amount": 800,
      "billingFrequency": "MONTHLY",
      "status": "PENDING"
    },

    "pendingItems": [],
    "expiringDocuments": [],
    "statusMessage": "Your application is under review. We will notify you within 24-48 hours.",
    "nextAction": "Wait for review completion. You will be notified via email."
  }
}
```

---

### 10. File Upload

#### POST /api/upload/onboarding

Upload documents for qualifications, insurance, etc.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `file` - The file to upload (PDF, JPG, PNG, max 10MB)
- `type` - Document type (CERTIFICATION, INSURANCE, IDENTIFICATION, REFERENCE, OTHER)
- `description` - Optional description

**Response (200):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "documentId": "doc_id",
    "url": "/uploads/onboarding/certification/file_123.pdf",
    "filename": "file_123.pdf",
    "originalName": "wrt_certificate.pdf",
    "size": 2048576,
    "type": "application/pdf"
  }
}
```

---

## Admin Endpoints

### 11. Get Pending Applications

#### GET /api/admin/onboarding/pending

Retrieve contractors pending review (Admin only).

**Query Parameters:**
- `status` - Filter by status (PENDING, UNDER_REVIEW, ALL)
- `limit` - Results per page (default: 20)
- `offset` - Pagination offset (default: 0)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "contractors": [
      {
        "id": "contractor_id",
        "email": "contractor@example.com",
        "status": "UNDER_REVIEW",
        "createdAt": "2024-01-01T00:00:00Z",

        "business": {
          "name": "Smith Restoration",
          "abn": "12345678901",
          "location": "Brisbane, QLD"
        },

        "verification": {
          "emailVerified": false,
          "mobileVerified": false,
          "onboardingCompleted": false,
          "onboardingStep": 7
        },

        "qualifications": {
          "total": 3,
          "verified": 0,
          "pending": 3,
          "types": ["WRT", "ASD", "FSRT"]
        },

        "insurance": {
          "hasPublicLiability": true,
          "hasWorkersComp": true,
          "totalPolicies": 2,
          "verified": 0,
          "totalCoverage": 10000000
        },

        "subscription": {
          "tier": "TIER_50KM",
          "amount": 800,
          "status": "PENDING"
        },

        "coverage": {
          "radius": 50,
          "lat": -27.4698,
          "lng": 153.0251
        },

        "readyForApproval": true
      }
    ],
    "pagination": {
      "total": 25,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    },
    "stats": {
      "total": 150,
      "pending": 45,
      "underReview": 25,
      "approved": 70,
      "rejected": 8,
      "suspended": 2
    }
  }
}
```

---

### 12. Verify Application

#### POST /api/admin/onboarding/{contractorId}/verify

Approve or reject a contractor application (Admin only).

**Request Body (Approval):**
```json
{
  "approved": true,
  "notes": "All documents verified. Welcome to NRPG."
}
```

**Request Body (Rejection):**
```json
{
  "approved": false,
  "rejectionReason": "Insurance coverage insufficient. Please provide updated public liability certificate with minimum $10M coverage.",
  "notes": "Can reapply once insurance is updated"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Contractor application approved successfully",
  "data": {
    "contractorId": "contractor_id",
    "status": "APPROVED",
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

#### GET /api/admin/onboarding/{contractorId}/verify

Get detailed contractor information for review (Admin only).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "contractor_id",
    "email": "contractor@example.com",
    "status": "UNDER_REVIEW",
    "companyProfile": { ... },
    "certifications": [ ... ],
    "insurance": [ ... ],
    "references": [ ... ],
    "backgroundChecks": [ ... ],
    "subscription": { ... },
    "territories": [ ... ],
    "projects": [ ... ],
    "auditLogs": [ ... ]
  }
}
```

---

## Webhook Events

The following events are triggered during onboarding:

### contractor.registered
Fired when a new contractor registers.

### contractor.submitted
Fired when contractor submits application for review.

### contractor.approved
Fired when admin approves the application.

### contractor.rejected
Fired when admin rejects the application.

### document.uploaded
Fired when contractor uploads a document.

### payment.completed
Fired when contractor completes subscription payment.

---

## Rate Limiting

- Registration: 5 requests per hour per IP
- File uploads: 20 requests per hour per user
- Other endpoints: 100 requests per minute per user

---

## Testing

### Test Credentials

```
Admin:
Email: admin@nrpg.com.au
Password: AdminTest123!

Test Contractor:
Email: test@contractor.com
Password: TestPass123!
```

### Test ABN Numbers

Valid test ABNs that pass checksum validation:
- 51 824 753 556
- 53 004 085 616
- 11 222 333 444 (test only)

---

## Support

For API support, contact:
- Email: api-support@nrpg.com.au
- Developer Portal: https://developers.nrpg.com.au
- Status Page: https://status.nrpg.com.au
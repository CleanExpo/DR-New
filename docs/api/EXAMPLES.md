# API Usage Examples

This document provides practical examples for using the Disaster Recovery Brisbane API.

## Base URL

```
Production: https://dr-new-ten.vercel.app/api/v1
Development: http://localhost:3000/api/v1
```

## JavaScript/TypeScript Examples

### 1. Submit Emergency Request

```typescript
async function submitEmergencyRequest() {
  const response = await fetch('https://dr-new-ten.vercel.app/api/v1/emergency', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'John Smith',
      phone: '0412345678',
      email: 'john@example.com',
      address: '123 Main Street',
      suburb: 'Hamilton',
      emergencyType: 'water',
      description: 'Burst pipe flooding kitchen and living room',
      severity: 'critical',
      hasInsurance: true,
      insuranceCompany: 'RACQ Insurance',
    }),
  });

  const data = await response.json();

  if (data.success) {
    console.log('Emergency request submitted:', data.data.requestId);
    console.log('Estimated response:', data.data.estimatedResponse);
    console.log('Next steps:', data.data.nextSteps);
  } else {
    console.error('Error:', data.error);
  }
}
```

### 2. Get Available Services

```typescript
async function getServices() {
  const params = new URLSearchParams({
    category: 'water',
    emergency: 'true',
    location: 'Brisbane',
    page: '1',
    limit: '10',
  });

  const response = await fetch(
    `https://dr-new-ten.vercel.app/api/v1/services?${params}`
  );

  const data = await response.json();

  if (data.success) {
    console.log('Services:', data.data);
    console.log('Pagination:', data.pagination);
  }
}
```

### 3. Get Service Areas

```typescript
async function getServiceAreas() {
  const response = await fetch(
    'https://dr-new-ten.vercel.app/api/v1/locations?type=suburb&emergency=true'
  );

  const data = await response.json();

  if (data.success) {
    data.data.forEach((area: any) => {
      console.log(`${area.name}: ${area.responseTime} response time`);
    });
  }
}
```

### 4. Submit Contact Form

```typescript
async function submitContactForm() {
  const response = await fetch('https://dr-new-ten.vercel.app/api/v1/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '0412345678',
      service: 'water-damage-restoration',
      urgency: 'standard',
      message: 'Need assessment for water damage in basement',
      propertyType: 'residential',
      hasInsurance: true,
      preferredContact: 'email',
    }),
  });

  const data = await response.json();

  if (data.success) {
    console.log('Submission ID:', data.data.submissionId);
    console.log('Expected response:', data.data.expectedResponse);
  }
}
```

### 5. Request Quote

```typescript
async function requestQuote() {
  const response = await fetch('https://dr-new-ten.vercel.app/api/v1/quote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Bob Wilson',
      email: 'bob@company.com',
      phone: '0412345678',
      serviceType: ['water-damage-restoration', 'mould-remediation'],
      propertyType: 'commercial',
      suburb: 'Brisbane CBD',
      description: 'Office building with water damage on multiple floors',
      urgency: 'urgent',
    }),
  });

  const data = await response.json();

  if (data.success) {
    console.log('Quote ID:', data.data.quoteId);
    console.log('Response time:', data.data.estimatedResponseTime);
  }
}
```

## React Hook Example

```typescript
import { useState } from 'react';

export function useEmergencyRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRequest = async (data: EmergencyRequestData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit request');
      }

      return result.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitRequest, loading, error };
}

// Usage in component
function EmergencyForm() {
  const { submitRequest, loading, error } = useEmergencyRequest();

  const handleSubmit = async (formData: EmergencyRequestData) => {
    try {
      const result = await submitRequest(formData);
      alert(`Request submitted: ${result.requestId}`);
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // ... handle form submission
    }}>
      {/* Form fields */}
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Emergency Request'}
      </button>
    </form>
  );
}
```

## Error Handling

```typescript
async function apiCallWithErrorHandling() {
  try {
    const response = await fetch('/api/v1/services');

    // Check HTTP status
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Check API response
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }

    return data.data;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      console.error('Network error:', error.message);
    } else {
      // API or other error
      console.error('Error:', error);
    }
    throw error;
  }
}
```

## Rate Limit Handling

```typescript
async function fetchWithRateLimitRetry(url: string, options?: RequestInit) {
  const response = await fetch(url, options);

  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    const waitSeconds = retryAfter ? parseInt(retryAfter, 10) : 60;

    console.log(`Rate limited. Retrying after ${waitSeconds} seconds...`);

    await new Promise(resolve => setTimeout(resolve, waitSeconds * 1000));

    return fetch(url, options);
  }

  return response;
}
```

## cURL Examples

### Submit Emergency Request
```bash
curl -X POST https://dr-new-ten.vercel.app/api/v1/emergency \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "phone": "0412345678",
    "email": "john@example.com",
    "address": "123 Main Street",
    "suburb": "Hamilton",
    "emergencyType": "water",
    "description": "Burst pipe flooding kitchen",
    "severity": "critical",
    "hasInsurance": true
  }'
```

### Get Services
```bash
curl "https://dr-new-ten.vercel.app/api/v1/services?category=water&emergency=true"
```

### Get Locations
```bash
curl "https://dr-new-ten.vercel.app/api/v1/locations?type=suburb"
```

### Submit Contact Form
```bash
curl -X POST https://dr-new-ten.vercel.app/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "0412345678",
    "service": "water-damage-restoration",
    "urgency": "standard",
    "message": "Need assessment for water damage",
    "hasInsurance": true
  }'
```

## Python Examples

```python
import requests

def submit_emergency_request():
    url = "https://dr-new-ten.vercel.app/api/v1/emergency"
    payload = {
        "name": "John Smith",
        "phone": "0412345678",
        "email": "john@example.com",
        "address": "123 Main Street",
        "suburb": "Hamilton",
        "emergencyType": "water",
        "description": "Burst pipe flooding kitchen",
        "severity": "critical",
        "hasInsurance": True
    }

    response = requests.post(url, json=payload)
    data = response.json()

    if data["success"]:
        print(f"Request ID: {data['data']['requestId']}")
        print(f"Response time: {data['data']['estimatedResponse']}")
    else:
        print(f"Error: {data['error']}")

def get_services():
    url = "https://dr-new-ten.vercel.app/api/v1/services"
    params = {
        "category": "water",
        "emergency": "true",
        "page": 1,
        "limit": 10
    }

    response = requests.get(url, params=params)
    data = response.json()

    if data["success"]:
        for service in data["data"]:
            print(f"{service['name']}: {service['responseTime']}")
```

## TypeScript Type Definitions

```typescript
// Request types
interface EmergencyRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
  suburb: string;
  emergencyType: 'water' | 'fire' | 'storm' | 'mould' | 'biohazard';
  description: string;
  severity: 'critical' | 'urgent' | 'moderate';
  hasInsurance: boolean;
  insuranceCompany?: string;
  preferredCallback?: string;
}

interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  urgency: 'emergency' | 'urgent' | 'standard' | 'quote' | 'routine';
  message: string;
  propertyType?: string;
  hasInsurance?: boolean;
  preferredContact?: 'phone' | 'email' | 'sms';
}

interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  serviceType: string[];
  propertyType: 'residential' | 'commercial' | 'industrial';
  address?: string;
  suburb: string;
  description: string;
  preferredContactTime?: string;
  urgency: 'emergency' | 'urgent' | 'standard' | 'routine';
}

// Response types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  metadata: {
    timestamp: string;
    version: string;
  };
}
```

## Best Practices

1. **Always handle errors**: Check both HTTP status and API response success
2. **Respect rate limits**: Implement exponential backoff for retries
3. **Validate input**: Validate data on client-side before sending to API
4. **Use HTTPS**: Always use HTTPS in production
5. **Cache responses**: Cache public data (services, locations) to reduce API calls
6. **Monitor rate limits**: Check rate limit headers to avoid hitting limits
7. **Handle timeouts**: Set appropriate timeouts for API requests
8. **Log errors**: Log API errors for debugging and monitoring

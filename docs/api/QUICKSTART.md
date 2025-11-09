# API Quick Start Guide

Get started with the Disaster Recovery Brisbane API in 5 minutes.

## 1. Verify Installation

```bash
node scripts/verify-api.js
```

Expected output: `Passed: 25`

## 2. Start Development Server

```bash
npm run dev
```

Server starts at: `http://localhost:3000`

## 3. Test Health Endpoint

```bash
curl http://localhost:3000/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "v1",
    "endpoints": { ... }
  }
}
```

## 4. Try an API Endpoint

### Get Services List
```bash
curl http://localhost:3000/api/v1/services
```

### Get Emergency Services Only
```bash
curl "http://localhost:3000/api/v1/services?emergency=true"
```

### Get Service Areas
```bash
curl http://localhost:3000/api/v1/locations
```

## 5. Submit Test Request

### Emergency Request
```bash
curl -X POST http://localhost:3000/api/v1/emergency \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "0412345678",
    "email": "test@example.com",
    "address": "123 Test Street",
    "suburb": "Hamilton",
    "emergencyType": "water",
    "description": "Test emergency request",
    "severity": "critical",
    "hasInsurance": true
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "requestId": "EM-...",
    "estimatedResponse": "30 minutes",
    "priority": "emergency"
  }
}
```

### Contact Form
```bash
curl -X POST http://localhost:3000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0412345678",
    "service": "water-damage-restoration",
    "urgency": "standard",
    "message": "Test contact form submission",
    "hasInsurance": true
  }'
```

## 6. Frontend Integration

### React Example

```typescript
import { useState } from 'react';

export function EmergencyForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/v1/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // ... form data
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Request submitted: ${data.data.requestId}`);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### Using Services Hook

```typescript
import { useEffect, useState } from 'react';

export function useServices(category?: string) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);

    fetch(`/api/v1/services?${params}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServices(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, [category]);

  return { services, loading };
}

// Usage
function ServiceList() {
  const { services, loading } = useServices('water');

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {services.map(service => (
        <li key={service.id}>{service.name}</li>
      ))}
    </ul>
  );
}
```

## 7. Check Data Storage

Submissions are stored in:
- `data/emergency/requests.json`
- `data/submissions/contacts.json`
- `data/quotes/requests.json`

View emergency requests:
```bash
cat data/emergency/requests.json | jq '.'
```

## 8. Monitor API Performance

### View Metrics
```bash
curl http://localhost:3000/api/v1/metrics | jq '.'
```

### Check Rate Limits
```bash
curl -i http://localhost:3000/api/v1/services | grep X-RateLimit
```

Output:
```
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 299
X-RateLimit-Reset: 1704790800000
```

## 9. Test Error Handling

### Invalid Phone Number
```bash
curl -X POST http://localhost:3000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "phone": "invalid",
    "service": "water",
    "urgency": "standard",
    "message": "Test"
  }'
```

Expected: 400 Bad Request with validation errors

### Rate Limit Test
Run the same request 6 times rapidly to trigger rate limit (5 req/hour limit)

## 10. Production Deployment

### Environment Variables
```bash
NEXT_PUBLIC_APP_URL=https://dr-new-ten.vercel.app
NODE_ENV=production
```

### Deploy to Vercel
```bash
npm run build
vercel --prod
```

### Test Production
```bash
curl https://dr-new-ten.vercel.app/api/v1/health
```

## Common Tasks

### Clear Cache
```typescript
import { clearAllCache } from '@/lib/api/cache';

clearAllCache();
```

### Reset Rate Limits (Development)
```typescript
import { resetRateLimit } from '@/lib/api/rate-limit';

resetRateLimit('ratelimit:127.0.0.1:/api/v1/contact');
```

### Custom Validation
```typescript
import { validateRequest, contactFormSchema } from '@/lib/api/validation';

const validation = validateRequest(contactFormSchema, data);

if (!validation.success) {
  console.log('Errors:', validation.errors);
}
```

## Troubleshooting

### Issue: CORS Error
**Solution:** Check CORS_CONFIG in `lib/api/config.ts`

### Issue: Rate Limit Too Strict
**Solution:** Adjust limits in `RATE_LIMITS` in `lib/api/config.ts`

### Issue: Cache Not Working
**Solution:** Verify `CACHE_DURATION` settings in `lib/api/config.ts`

### Issue: TypeScript Errors
**Solution:** Run `npm run type-check` to identify issues

### Issue: Data Not Saving
**Solution:** Check `data/` directory permissions

## Next Steps

1. **Read Full Documentation:** `docs/api/README.md`
2. **Try All Examples:** `docs/api/EXAMPLES.md`
3. **Run Tests:** `docs/api/TESTING.md`
4. **Understand Architecture:** `docs/api/IMPLEMENTATION.md`

## Need Help?

- **Documentation:** `docs/api/`
- **Examples:** `docs/api/EXAMPLES.md`
- **Testing:** `docs/api/TESTING.md`
- **Verification:** `node scripts/verify-api.js`

## API Endpoints Summary

| Endpoint | Method | Purpose | Rate Limit |
|----------|--------|---------|------------|
| `/api/v1/emergency` | POST | Emergency requests | 10/hour |
| `/api/v1/services` | GET | Service catalog | 300/15min |
| `/api/v1/locations` | GET | Service areas | 300/15min |
| `/api/v1/contact` | POST | Contact form | 5/hour |
| `/api/v1/quote` | POST/GET | Quote requests | 5/hour |
| `/api/v1/health` | GET | Health check | None |
| `/api/v1/metrics` | GET | Performance metrics | None |

---

**You're ready to go!** 🚀

Start building with the Disaster Recovery Brisbane API.

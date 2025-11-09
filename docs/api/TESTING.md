# API Testing Guide

Comprehensive testing guide for Disaster Recovery Brisbane API.

## Quick Test

Test the API health endpoint:

```bash
curl https://dr-new-ten.vercel.app/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "v1",
    "timestamp": "2025-01-09T10:00:00.000Z",
    "uptime": 12345,
    "environment": "production",
    "cache": {
      "enabled": true,
      "entries": 0
    },
    "endpoints": {
      "emergency": "/api/v1/emergency",
      "services": "/api/v1/services",
      "locations": "/api/v1/locations",
      "contact": "/api/v1/contact",
      "quote": "/api/v1/quote"
    },
    "responseTime": "5ms"
  },
  "message": "API is healthy"
}
```

## Test Suite

### 1. Emergency Endpoint Tests

#### Valid Emergency Request
```bash
curl -X POST https://dr-new-ten.vercel.app/api/v1/emergency \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "0412345678",
    "email": "test@example.com",
    "address": "123 Test Street",
    "suburb": "Hamilton",
    "emergencyType": "water",
    "description": "Test emergency water damage request",
    "severity": "critical",
    "hasInsurance": true
  }'
```

✅ Expected: 201 Created with requestId

#### Invalid Phone Number
```bash
curl -X POST https://dr-new-ten.vercel.app/api/v1/emergency \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "invalid",
    "email": "test@example.com",
    "address": "123 Test Street",
    "suburb": "Hamilton",
    "emergencyType": "water",
    "description": "Test request",
    "severity": "critical",
    "hasInsurance": true
  }'
```

❌ Expected: 400 Bad Request with validation errors

#### Rate Limit Test
```bash
# Run this 11 times rapidly
for i in {1..11}; do
  curl -X POST https://dr-new-ten.vercel.app/api/v1/emergency \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Test User '$i'",
      "phone": "0412345678",
      "email": "test'$i'@example.com",
      "address": "123 Test Street",
      "suburb": "Hamilton",
      "emergencyType": "water",
      "description": "Test request number '$i'",
      "severity": "critical",
      "hasInsurance": true
    }'
done
```

❌ Expected: 11th request returns 429 Too Many Requests

### 2. Services Endpoint Tests

#### Get All Services
```bash
curl "https://dr-new-ten.vercel.app/api/v1/services"
```

✅ Expected: 200 OK with array of services

#### Filter by Category
```bash
curl "https://dr-new-ten.vercel.app/api/v1/services?category=water"
```

✅ Expected: 200 OK with filtered services

#### Filter Emergency Services
```bash
curl "https://dr-new-ten.vercel.app/api/v1/services?emergency=true"
```

✅ Expected: 200 OK with only 24/7 services

#### Search Services
```bash
curl "https://dr-new-ten.vercel.app/api/v1/services?search=restoration"
```

✅ Expected: 200 OK with matching services

#### Pagination
```bash
curl "https://dr-new-ten.vercel.app/api/v1/services?page=1&limit=2"
```

✅ Expected: 200 OK with pagination metadata

#### Check Caching
```bash
# First request
curl -i "https://dr-new-ten.vercel.app/api/v1/services"

# Second request (should be faster)
curl -i "https://dr-new-ten.vercel.app/api/v1/services"
```

✅ Expected: Cache-Control headers present

### 3. Locations Endpoint Tests

#### Get All Locations
```bash
curl "https://dr-new-ten.vercel.app/api/v1/locations"
```

✅ Expected: 200 OK with service areas

#### Filter by Type
```bash
curl "https://dr-new-ten.vercel.app/api/v1/locations?type=suburb"
```

✅ Expected: 200 OK with suburbs only

#### Emergency Coverage Only
```bash
curl "https://dr-new-ten.vercel.app/api/v1/locations?emergency=true"
```

✅ Expected: 200 OK with emergency areas

### 4. Contact Endpoint Tests

#### Valid Contact Form
```bash
curl -X POST https://dr-new-ten.vercel.app/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0412345678",
    "service": "water-damage-restoration",
    "urgency": "standard",
    "message": "This is a test contact form submission",
    "hasInsurance": true
  }'
```

✅ Expected: 201 Created with submissionId

#### Missing Required Fields
```bash
curl -X POST https://dr-new-ten.vercel.app/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }'
```

❌ Expected: 400 Bad Request with validation errors

### 5. Quote Endpoint Tests

#### Valid Quote Request
```bash
curl -X POST https://dr-new-ten.vercel.app/api/v1/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Company",
    "email": "test@company.com",
    "phone": "0412345678",
    "serviceType": ["water-damage-restoration", "mould-remediation"],
    "propertyType": "commercial",
    "suburb": "Brisbane CBD",
    "description": "Need quote for commercial property restoration",
    "urgency": "standard"
  }'
```

✅ Expected: 201 Created with quoteId

#### Get Quote Status
```bash
# First, submit a quote and capture the ID
QUOTE_ID=$(curl -s -X POST https://dr-new-ten.vercel.app/api/v1/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "phone": "0412345678",
    "serviceType": ["water-damage-restoration"],
    "propertyType": "residential",
    "suburb": "Hamilton",
    "description": "Test quote",
    "urgency": "standard"
  }' | jq -r '.data.quoteId')

# Then get the status
curl "https://dr-new-ten.vercel.app/api/v1/quote?id=$QUOTE_ID"
```

✅ Expected: 200 OK with quote details

## Performance Testing

### Response Time Test
```bash
# Measure response time for services endpoint
time curl -s "https://dr-new-ten.vercel.app/api/v1/services" > /dev/null
```

Target: < 500ms for cached responses

### Load Test with Apache Bench
```bash
# 100 requests, 10 concurrent
ab -n 100 -c 10 https://dr-new-ten.vercel.app/api/v1/services
```

### Load Test with wrk
```bash
# 30 seconds, 10 threads, 100 connections
wrk -t10 -c100 -d30s https://dr-new-ten.vercel.app/api/v1/services
```

## Security Testing

### XSS Prevention Test
```bash
curl -X POST https://dr-new-ten.vercel.app/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<script>alert(\"XSS\")</script>",
    "email": "test@example.com",
    "phone": "0412345678",
    "service": "water",
    "urgency": "standard",
    "message": "Test<script>alert(1)</script>"
  }'
```

✅ Expected: Scripts removed from response

### SQL Injection Prevention Test
```bash
curl -X POST https://dr-new-ten.vercel.app/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "phone": "0412345678",
    "service": "water OR 1=1",
    "urgency": "standard",
    "message": "Test message"
  }'
```

✅ Expected: Request processed safely

### CORS Test
```bash
curl -H "Origin: https://example.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS \
  https://dr-new-ten.vercel.app/api/v1/emergency
```

✅ Expected: CORS headers present

## Automated Test Script

Create `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="https://dr-new-ten.vercel.app/api/v1"
PASS=0
FAIL=0

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test function
test_endpoint() {
  local name=$1
  local method=$2
  local endpoint=$3
  local data=$4
  local expected_status=$5

  echo -n "Testing $name... "

  if [ "$method" = "GET" ]; then
    status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$endpoint")
  else
    status=$(curl -s -o /dev/null -w "%{http_code}" -X $method \
      -H "Content-Type: application/json" \
      -d "$data" \
      "$BASE_URL$endpoint")
  fi

  if [ "$status" = "$expected_status" ]; then
    echo -e "${GREEN}PASS${NC} (Status: $status)"
    ((PASS++))
  else
    echo -e "${RED}FAIL${NC} (Expected: $expected_status, Got: $status)"
    ((FAIL++))
  fi
}

# Run tests
echo "Starting API Tests..."
echo "===================="

test_endpoint "Health Check" "GET" "/health" "" "200"
test_endpoint "Services List" "GET" "/services" "" "200"
test_endpoint "Services Pagination" "GET" "/services?page=1&limit=2" "" "200"
test_endpoint "Locations List" "GET" "/locations" "" "200"
test_endpoint "Locations Filter" "GET" "/locations?type=suburb" "" "200"

echo ""
echo "===================="
echo "Tests Passed: $PASS"
echo "Tests Failed: $FAIL"
echo "===================="

if [ $FAIL -eq 0 ]; then
  echo -e "${GREEN}All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}Some tests failed!${NC}"
  exit 1
fi
```

Run with:
```bash
chmod +x test-api.sh
./test-api.sh
```

## Monitoring

### Check Rate Limit Headers
```bash
curl -i "https://dr-new-ten.vercel.app/api/v1/services" | grep -i "X-RateLimit"
```

### Check Cache Headers
```bash
curl -i "https://dr-new-ten.vercel.app/api/v1/services" | grep -i "Cache-Control"
```

### Check Security Headers
```bash
curl -i "https://dr-new-ten.vercel.app/api/v1/services" | grep -i "X-"
```

## Test Data Cleanup

After testing, you may want to clean up test submissions:

```bash
# Remove test data files (server-side only)
rm -rf data/submissions/test-*.json
rm -rf data/emergency/test-*.json
rm -rf data/quotes/test-*.json
```

## Continuous Testing

Set up automated testing with GitHub Actions or similar CI/CD:

```yaml
# .github/workflows/api-tests.yml
name: API Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 */6 * * *' # Every 6 hours

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run API Tests
        run: ./test-api.sh
```

## Troubleshooting

### Issue: 429 Too Many Requests
**Solution:** Wait for rate limit window to reset (check `Retry-After` header)

### Issue: 500 Internal Server Error
**Solution:** Check server logs, verify data directory permissions

### Issue: Slow Response Times
**Solution:** Check cache hit rate, verify CDN configuration

### Issue: CORS Errors
**Solution:** Verify origin is allowed in CORS configuration

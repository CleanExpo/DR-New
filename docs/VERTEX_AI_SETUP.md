# Google Vertex AI Setup Guide

**Purpose:** Configure Google Vertex AI (Gemini) for Australian disaster recovery AI features

**Estimated Setup Time:** 15-30 minutes
**Cost:** ~$0.50-$5 per 1,000 claims processed (using Gemini 1.5 Flash)

---

## Why Vertex AI for Australian Disaster Recovery?

**Benefits:**
- **Australian Region:** Deploy in `australia-southeast1` (Sydney) for low latency
- **Cost-Effective:** Gemini 1.5 Flash costs ~90% less than GPT-4
- **High Context:** 1M token context window for comprehensive damage analysis
- **Multimodal:** Can analyze photos of damage (future feature)
- **Compliance:** Data processed in Australia (GDPR, Australian Privacy Act)

**Recommended Model:**
- **gemini-1.5-flash:** Best balance of speed, cost, and accuracy
- **Cost:** $0.075 input / $0.30 output per 1M tokens
- **Performance:** ~2-3 seconds response time from Sydney region

---

## Prerequisites

1. **Google Cloud Account**
   - Create account at https://console.cloud.google.com
   - Free tier includes $300 credit (3-6 months of disaster recovery AI)

2. **Credit Card** (required for Google Cloud)
   - Free tier covers most development usage
   - Production costs: ~$50-200/month for 1,000-5,000 claims

3. **Basic Command Line Knowledge**
   - `gcloud` CLI tool (optional but recommended)

---

## Step-by-Step Setup

### 1. Create Google Cloud Project

**Via Console (Recommended):**
1. Go to https://console.cloud.google.com
2. Click "Select a project" → "New Project"
3. Enter project name: `dr-nrpg-production` (or similar)
4. Click "Create"
5. Note your Project ID (e.g., `dr-nrpg-prod-123456`)

**Via Command Line:**
```bash
gcloud projects create dr-nrpg-production --name="DR-NRPG Platform"
```

---

### 2. Enable Vertex AI API

**Via Console:**
1. Go to https://console.cloud.google.com/apis/library
2. Ensure your project is selected (top navbar)
3. Search for "Vertex AI API"
4. Click "Enable"
5. Wait 2-3 minutes for API activation

**Via Command Line:**
```bash
gcloud services enable aiplatform.googleapis.com --project=dr-nrpg-production
```

---

### 3. Create Service Account (Production)

**Via Console:**
1. Go to https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click "Create Service Account"
3. Enter details:
   - Name: `dr-nrpg-vertex-ai`
   - Description: `Service account for Vertex AI access`
4. Click "Create and Continue"
5. Grant role: **Vertex AI User**
6. Click "Continue" → "Done"
7. Click on the service account you just created
8. Go to "Keys" tab → "Add Key" → "Create new key"
9. Select **JSON** → Click "Create"
10. Save the downloaded JSON file securely (e.g., `~/.gcloud/dr-nrpg-vertex-ai-key.json`)

**Via Command Line:**
```bash
# Create service account
gcloud iam service-accounts create dr-nrpg-vertex-ai \
    --display-name="DR-NRPG Vertex AI" \
    --project=dr-nrpg-production

# Grant Vertex AI User role
gcloud projects add-iam-policy-binding dr-nrpg-production \
    --member="serviceAccount:dr-nrpg-vertex-ai@dr-nrpg-production.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

# Create and download key
gcloud iam service-accounts keys create ~/.gcloud/dr-nrpg-vertex-ai-key.json \
    --iam-account=dr-nrpg-vertex-ai@dr-nrpg-production.iam.gserviceaccount.com \
    --project=dr-nrpg-production
```

---

### 4. Configure Environment Variables

**For Development (.env.local):**
```env
# Google Cloud Project
GOOGLE_CLOUD_PROJECT_ID=dr-nrpg-production

# Authentication (choose one method)
# Option A: Service Account (recommended)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/dr-nrpg-vertex-ai-key.json

# Option B: API Key (simpler but less secure)
# GOOGLE_VERTEX_AI_API_KEY=your-api-key-here

# Region (optional - defaults to australia-southeast1)
GOOGLE_CLOUD_LOCATION=australia-southeast1

# Model selection (optional - defaults to gemini-1.5-flash)
GEMINI_MODEL=gemini-1.5-flash

# AI Provider (to use Vertex AI instead of Anthropic)
AI_PROVIDER=vertexai
```

**For Production (Vercel/Railway/etc.):**

Add environment variables in your deployment platform:
- `GOOGLE_CLOUD_PROJECT_ID`
- `GOOGLE_APPLICATION_CREDENTIALS` (upload JSON key as secret)
- `GOOGLE_CLOUD_LOCATION`
- `GEMINI_MODEL`
- `AI_PROVIDER`

**Vercel Example:**
```bash
vercel env add GOOGLE_CLOUD_PROJECT_ID production
# Paste: dr-nrpg-production

vercel env add GOOGLE_APPLICATION_CREDENTIALS production
# Paste entire JSON key file contents

vercel env add AI_PROVIDER production
# Paste: vertexai
```

---

### 5. Test Connection

**Test Script:**
```typescript
// Test Vertex AI connection
import { VertexAIProvider } from '@/lib/agents/providers/vertex-ai-provider';

async function testVertexAI() {
  const provider = new VertexAIProvider();

  console.log('Testing Vertex AI connection...');
  console.log('Provider:', provider.getName());
  console.log('Configured:', VertexAIProvider.isConfigured());

  const health = await provider.checkHealth();
  console.log('Health check:', health);

  if (health.available) {
    console.log('✅ Vertex AI is ready!');
    console.log(`Latency: ${health.latencyMs}ms from australia-southeast1`);
  } else {
    console.log('❌ Vertex AI connection failed:');
    console.log(health.error);
  }
}

testVertexAI();
```

**Run Test:**
```bash
cd apps/web
npx tsx test-vertex-ai.ts
```

**Expected Output:**
```
Testing Vertex AI connection...
Provider: Google Vertex AI (Gemini)
Configured: true
Health check: { available: true, latencyMs: 287, lastChecked: 2026-02-06... }
✅ Vertex AI is ready!
Latency: 287ms from australia-southeast1
```

---

### 6. Update Claim Intake API

The claim assist API (`/api/ai/claim-assist`) will automatically use Vertex AI if `AI_PROVIDER=vertexai` is set.

**Verify Integration:**
```bash
# Test claim analysis endpoint
curl -X POST http://localhost:3000/api/ai/claim-assist \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -d '{
    "action": "analyze_description",
    "data": {
      "description": "Bushfire damaged roof, extensive smoke damage throughout house",
      "location": { "state": "NSW", "suburb": "Blue Mountains" }
    }
  }'
```

---

## Cost Management

### Monthly Cost Estimates

**Gemini 1.5 Flash** (Recommended):
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens

**Typical Usage:**
- Claim analysis: ~2,000 input tokens, ~1,500 output tokens
- Cost per claim: ~$0.0006 (0.06 cents)
- 1,000 claims/month: ~$0.60
- 10,000 claims/month: ~$6.00

**Gemini 1.5 Pro** (Higher accuracy):
- Input: $1.25 per 1M tokens
- Output: $5.00 per 1M tokens
- Cost per claim: ~$0.01 (1 cent)
- 1,000 claims/month: ~$10
- 10,000 claims/month: ~$100

### Set Budget Alerts

1. Go to https://console.cloud.google.com/billing/budgets
2. Click "Create Budget"
3. Set threshold: $50/month (for development)
4. Set alerts at 50%, 90%, 100%
5. Add email notifications

### Monitor Usage

**Via Console:**
- https://console.cloud.google.com/vertex-ai/dashboard

**Via Command Line:**
```bash
gcloud ai models list \
    --region=australia-southeast1 \
    --project=dr-nrpg-production
```

---

## Troubleshooting

### Error: "PERMISSION_DENIED"

**Cause:** Vertex AI API not enabled or service account lacks permissions

**Fix:**
```bash
# Enable API
gcloud services enable aiplatform.googleapis.com --project=dr-nrpg-production

# Grant role
gcloud projects add-iam-policy-binding dr-nrpg-production \
    --member="serviceAccount:dr-nrpg-vertex-ai@dr-nrpg-production.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"
```

### Error: "UNAUTHENTICATED"

**Cause:** Service account key not found or invalid

**Fix:**
1. Check `GOOGLE_APPLICATION_CREDENTIALS` path is correct
2. Verify JSON key file exists and is readable
3. Ensure key is for the correct project

### Error: "RESOURCE_EXHAUSTED"

**Cause:** API quota exceeded

**Fix:**
1. Check quota at https://console.cloud.google.com/iam-admin/quotas
2. Request quota increase if needed
3. Implement rate limiting in application

### High Latency (>2 seconds)

**Cause:** Using non-Australian region

**Fix:**
Set `GOOGLE_CLOUD_LOCATION=australia-southeast1` in environment variables

---

## Security Best Practices

1. **Never Commit Service Account Keys**
   - Add `*.json` to `.gitignore`
   - Use environment variables for credentials
   - Rotate keys every 90 days

2. **Restrict Service Account Permissions**
   - Only grant "Vertex AI User" role
   - Do not use "Owner" or "Editor" roles
   - Review permissions quarterly

3. **Enable Audit Logging**
   - https://console.cloud.google.com/iam-admin/audit
   - Log all AI API calls for compliance

4. **Use VPC Service Controls** (Production)
   - Restrict Vertex AI access to specific IP ranges
   - Enable Private Google Access

---

## Next Steps

After setup:
1. ✅ Test Vertex AI connection
2. ✅ Run claim analysis API test
3. ✅ Configure budget alerts
4. ✅ Update production environment variables
5. ✅ Monitor usage for first 100 claims
6. ✅ Optimize prompts for cost/accuracy

**Need Help?**
- Vertex AI Documentation: https://cloud.google.com/vertex-ai/docs
- Gemini Pricing: https://cloud.google.com/vertex-ai/generative-ai/pricing
- Support: support@disasterrecovery.com.au

---

**Status:** READY FOR DEPLOYMENT
**Last Updated:** 2026-02-06
**Owner:** Engineering Team

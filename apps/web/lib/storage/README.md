# Cloud Storage Integration

This directory contains cloud storage integration for the Disaster Recovery NRPG Platform.

## Overview

The platform supports S3-compatible cloud storage for storing:
- Sitemap files (XML)
- Daily reports (JSON)
- PDF exports and analytics reports
- Email attachments
- Inspection reports

## Storage Providers Supported

### 1. AWS S3 (Fully Implemented)
- Standard AWS S3 buckets
- Uses `@aws-sdk/client-s3`

### 2. DigitalOcean Spaces (Fully Implemented)
- S3-compatible API
- Uses same `@aws-sdk/client-s3` SDK
- Requires custom endpoint configuration

### 3. Google Cloud Storage (Stub)
- Requires `@google-cloud/storage` package
- Implementation guidance provided in code

### 4. Vercel Blob Storage (Stub)
- Requires `@vercel/blob` package
- Implementation guidance provided in code

## Configuration

### Environment Variables

Required for S3/DigitalOcean Spaces:
```bash
STORAGE_TYPE=s3                    # or 'spaces' (same implementation)
STORAGE_REGION=us-east-1           # AWS: us-east-1, DO: syd1, nyc3, etc.
STORAGE_ENDPOINT=                  # Required for DO Spaces: https://syd1.digitaloceanspaces.com
STORAGE_ACCESS_KEY_ID=your_key     # Access key ID
STORAGE_SECRET_ACCESS_KEY=your_key # Secret access key
STORAGE_BUCKET_NAME=your_bucket    # Bucket name
STORAGE_PUBLIC_URL=                # Optional CDN URL
```

### DigitalOcean Spaces Example
```bash
STORAGE_TYPE=spaces
STORAGE_REGION=syd1
STORAGE_ENDPOINT=https://syd1.digitaloceanspaces.com
STORAGE_ACCESS_KEY_ID=DO00XXXXXXXXXX
STORAGE_SECRET_ACCESS_KEY=XXXXXXXX
STORAGE_BUCKET_NAME=disaster-recovery-prod
STORAGE_PUBLIC_URL=https://disaster-recovery-prod.syd1.cdn.digitaloceanspaces.com
```

### AWS S3 Example
```bash
STORAGE_TYPE=s3
STORAGE_REGION=ap-southeast-2
STORAGE_ACCESS_KEY_ID=your-aws-access-key-id
STORAGE_SECRET_ACCESS_KEY=XXXXXXXX
STORAGE_BUCKET_NAME=disaster-recovery-prod
```

## Usage

### Basic Upload
```typescript
import { uploadFile } from '@/lib/storage/cloud-storage';

const result = await uploadFile(
  'reports/daily/2024-01-27.json',
  JSON.stringify(reportData),
  {
    contentType: 'application/json',
    cacheControl: 'private, max-age=86400',
    metadata: {
      type: 'daily-report',
      date: '2024-01-27',
    },
  }
);

console.log('Uploaded to:', result.url);
```

### Basic Download
```typescript
import { downloadFileAsString } from '@/lib/storage/cloud-storage';

const content = await downloadFileAsString('reports/daily/2024-01-27.json');
if (content) {
  const report = JSON.parse(content);
}
```

### Check File Existence
```typescript
import { fileExists } from '@/lib/storage/cloud-storage';

if (await fileExists('reports/daily/2024-01-27.json')) {
  console.log('Report exists');
}
```

### Delete File
```typescript
import { deleteFile } from '@/lib/storage/cloud-storage';

await deleteFile('reports/daily/2024-01-27.json');
```

### Custom Configuration
```typescript
import { uploadFile, StorageConfig } from '@/lib/storage/cloud-storage';

const customConfig: StorageConfig = {
  type: 'spaces',
  region: 'syd1',
  endpoint: 'https://syd1.digitaloceanspaces.com',
  accessKeyId: 'DO00XXXX',
  secretAccessKey: 'XXXX',
  bucketName: 'custom-bucket',
};

await uploadFile('path/to/file.json', content, {}, customConfig);
```

## Implementation Status

### ✅ Completed
- `cloud-storage.ts`: Core S3/DigitalOcean Spaces service
- `sitemap-storage.ts`: S3 upload and read for sitemaps
- `daily-report/route.ts`: Report storage to cloud

### ⚠️ Stub Implementation (Ready for Extension)
- `sitemap-storage.ts`: GCS upload/read stubs
- `sitemap-storage.ts`: Vercel Blob upload/read stubs

### 📋 Future Enhancements
- PDF generation for analytics exports
- Email attachment storage
- Inspection report PDF storage
- Automatic file cleanup/retention policies

## File Structure

```
lib/storage/
├── cloud-storage.ts           # Core cloud storage service
└── README.md                  # This file

lib/geo/sitemap/
└── sitemap-storage.ts         # Sitemap-specific storage logic

app/api/cron/daily-report/
└── route.ts                   # Daily report with storage integration
```

## Dependencies

```json
{
  "@aws-sdk/client-s3": "^3.x.x"  // For S3 and DigitalOcean Spaces
}
```

Optional (for future extension):
```json
{
  "@google-cloud/storage": "^7.x.x",  // For Google Cloud Storage
  "@vercel/blob": "^0.x.x"            // For Vercel Blob Storage
}
```

## Security Best Practices

1. **Never commit credentials** - Use environment variables only
2. **Use IAM policies** - Restrict bucket access to minimum required permissions
3. **Enable encryption** - Use server-side encryption (SSE-S3 or SSE-KMS)
4. **Set bucket policies** - Block public access unless specifically needed
5. **Use HTTPS** - All endpoints enforce SSL/TLS
6. **Rotate keys** - Regularly rotate access keys and secrets

### Recommended S3 Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT:user/disaster-recovery-app"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::your-bucket/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT:user/disaster-recovery-app"
      },
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::your-bucket"
    }
  ]
}
```

## Monitoring

### CloudWatch Metrics (AWS)
- `NumberOfObjects` - Track total objects in bucket
- `BucketSizeBytes` - Monitor storage usage
- `AllRequests` - Track API request count
- `4xxErrors`, `5xxErrors` - Monitor error rates

### DigitalOcean Metrics
- Available in DO dashboard under Spaces → Metrics
- Track bandwidth, storage, and request counts

## Cost Optimization

1. **Set lifecycle policies** - Auto-delete old files
2. **Use CDN** - Reduce bandwidth costs with CloudFront or DO CDN
3. **Compress files** - Especially for JSON/XML (gzip compression)
4. **Choose regions wisely** - Closer regions = lower latency + costs

## Troubleshooting

### Error: "Storage credentials not configured"
- Check that all required environment variables are set
- Verify `.env` file is loaded correctly

### Error: "Access Denied"
- Verify IAM user/key has correct permissions
- Check bucket policy allows your access key
- For DO Spaces: Ensure access key is for correct team/project

### Error: "NoSuchBucket"
- Verify bucket exists and name is correct
- Check region matches bucket location

### Error: "Invalid endpoint"
- For DO Spaces: Ensure endpoint includes full URL with protocol
- Verify region code matches DO region (e.g., 'syd1', not 'sydney')

## Testing

```typescript
// Test upload
import { uploadFile, downloadFileAsString } from '@/lib/storage/cloud-storage';

const testKey = 'test/upload-test.txt';
const testContent = 'Hello, Cloud Storage!';

const result = await uploadFile(testKey, testContent);
console.log('Upload successful:', result.url);

const downloaded = await downloadFileAsString(testKey);
console.log('Download successful:', downloaded === testContent);
```

## Linear Issue

**UNI-88**: [UH-PROD] Complete storage integration (6 upload TODOs)
- ✅ S3 upload (sitemap-storage.ts)
- ✅ S3 read (sitemap-storage.ts)
- ✅ GCS upload stub (sitemap-storage.ts)
- ✅ Vercel Blob upload stub (sitemap-storage.ts)
- ✅ Vercel Blob read stub (sitemap-storage.ts)
- ✅ Daily report storage (cron/daily-report/route.ts)

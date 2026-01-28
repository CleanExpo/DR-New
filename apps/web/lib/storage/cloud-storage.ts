/**
 * Cloud Storage Service
 * Unified interface for S3-compatible storage (AWS S3, DigitalOcean Spaces)
 *
 * Environment Variables:
 * - STORAGE_TYPE: 's3' | 'spaces' (default: 's3')
 * - STORAGE_REGION: AWS region or DigitalOcean region (e.g., 'us-east-1', 'syd1')
 * - STORAGE_ENDPOINT: Custom endpoint URL (required for DigitalOcean Spaces)
 * - STORAGE_ACCESS_KEY_ID: Access key
 * - STORAGE_SECRET_ACCESS_KEY: Secret key
 * - STORAGE_BUCKET_NAME: Bucket name
 * - STORAGE_PUBLIC_URL: Optional public CDN URL
 */

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface StorageConfig {
  type: 's3' | 'spaces';
  region: string;
  endpoint?: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl?: string;
}

export interface UploadOptions {
  contentType?: string;
  cacheControl?: string;
  metadata?: Record<string, string>;
  acl?: 'private' | 'public-read';
}

export interface UploadResult {
  key: string;
  url: string;
  publicUrl?: string;
  size: number;
  etag?: string;
}

/**
 * Get storage configuration from environment variables
 */
export function getStorageConfig(): StorageConfig {
  const type = (process.env.STORAGE_TYPE || 's3') as 's3' | 'spaces';
  const region = process.env.STORAGE_REGION || 'us-east-1';
  const endpoint = process.env.STORAGE_ENDPOINT;
  const accessKeyId = process.env.STORAGE_ACCESS_KEY_ID || '';
  const secretAccessKey = process.env.STORAGE_SECRET_ACCESS_KEY || '';
  const bucketName = process.env.STORAGE_BUCKET_NAME || '';
  const publicUrl = process.env.STORAGE_PUBLIC_URL;

  if (!accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error('Storage credentials not configured. Set STORAGE_ACCESS_KEY_ID, STORAGE_SECRET_ACCESS_KEY, and STORAGE_BUCKET_NAME');
  }

  return {
    type,
    region,
    endpoint,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicUrl,
  };
}

/**
 * Create S3 client for AWS S3 or DigitalOcean Spaces
 */
export function createStorageClient(config?: StorageConfig): S3Client {
  const cfg = config || getStorageConfig();

  const clientConfig: any = {
    region: cfg.region,
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
  };

  // For DigitalOcean Spaces or custom S3-compatible endpoints
  if (cfg.endpoint) {
    clientConfig.endpoint = cfg.endpoint;
    clientConfig.forcePathStyle = false; // DigitalOcean Spaces uses virtual-hosted-style
  }

  return new S3Client(clientConfig);
}

/**
 * Upload file content to cloud storage
 */
export async function uploadFile(
  key: string,
  content: Buffer | string,
  options: UploadOptions = {},
  config?: StorageConfig
): Promise<UploadResult> {
  const cfg = config || getStorageConfig();
  const client = createStorageClient(cfg);

  const buffer = typeof content === 'string' ? Buffer.from(content, 'utf-8') : content;

  const command = new PutObjectCommand({
    Bucket: cfg.bucketName,
    Key: key,
    Body: buffer,
    ContentType: options.contentType || 'application/octet-stream',
    CacheControl: options.cacheControl || 'public, max-age=31536000',
    Metadata: options.metadata,
    ACL: options.acl || 'private',
  });

  const response = await client.send(command);

  // Construct URLs
  const url = getStorageUrl(key, cfg);
  const publicUrl = cfg.publicUrl ? `${cfg.publicUrl}/${key}` : undefined;

  return {
    key,
    url,
    publicUrl,
    size: buffer.length,
    etag: response.ETag,
  };
}

/**
 * Download file content from cloud storage
 */
export async function downloadFile(
  key: string,
  config?: StorageConfig
): Promise<Buffer | null> {
  const cfg = config || getStorageConfig();
  const client = createStorageClient(cfg);

  try {
    const command = new GetObjectCommand({
      Bucket: cfg.bucketName,
      Key: key,
    });

    const response = await client.send(command);

    if (!response.Body) {
      return null;
    }

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of response.Body as any) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  } catch (error: any) {
    if (error.name === 'NoSuchKey' || error.$metadata?.httpStatusCode === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Download file content as string
 */
export async function downloadFileAsString(
  key: string,
  encoding: BufferEncoding = 'utf-8',
  config?: StorageConfig
): Promise<string | null> {
  const buffer = await downloadFile(key, config);
  return buffer ? buffer.toString(encoding) : null;
}

/**
 * Check if file exists in cloud storage
 */
export async function fileExists(
  key: string,
  config?: StorageConfig
): Promise<boolean> {
  const cfg = config || getStorageConfig();
  const client = createStorageClient(cfg);

  try {
    const command = new HeadObjectCommand({
      Bucket: cfg.bucketName,
      Key: key,
    });

    await client.send(command);
    return true;
  } catch (error: any) {
    if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
      return false;
    }
    throw error;
  }
}

/**
 * Delete file from cloud storage
 */
export async function deleteFile(
  key: string,
  config?: StorageConfig
): Promise<void> {
  const cfg = config || getStorageConfig();
  const client = createStorageClient(cfg);

  const command = new DeleteObjectCommand({
    Bucket: cfg.bucketName,
    Key: key,
  });

  await client.send(command);
}

/**
 * Get storage URL for a key
 */
export function getStorageUrl(key: string, config?: StorageConfig): string {
  const cfg = config || getStorageConfig();

  if (cfg.publicUrl) {
    return `${cfg.publicUrl}/${key}`;
  }

  if (cfg.endpoint) {
    // DigitalOcean Spaces format: https://bucket-name.region.digitaloceanspaces.com/key
    const endpoint = cfg.endpoint.replace('https://', '').replace('http://', '');
    return `https://${cfg.bucketName}.${endpoint}/${key}`;
  }

  // AWS S3 format
  return `https://${cfg.bucketName}.s3.${cfg.region}.amazonaws.com/${key}`;
}

/**
 * Generate a unique storage key with timestamp and random suffix
 */
export function generateStorageKey(
  prefix: string,
  filename: string,
  extension?: string
): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = extension || filename.split('.').pop() || '';
  const baseName = filename.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9]/gi, '-').toLowerCase();

  return `${prefix}/${timestamp}-${random}-${baseName}.${ext}`;
}

/**
 * Generate a presigned URL for secure file download
 *
 * @param key - Storage key of the file
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 * @param config - Optional storage configuration
 * @returns Presigned URL string
 */
export async function getPresignedDownloadUrl(
  key: string,
  expiresIn: number = 3600,
  config?: StorageConfig
): Promise<string> {
  const cfg = config || getStorageConfig();
  const client = createStorageClient(cfg);

  const command = new GetObjectCommand({
    Bucket: cfg.bucketName,
    Key: key,
  });

  // Generate presigned URL that expires after specified time
  const url = await getSignedUrl(client, command, { expiresIn });
  return url;
}

/**
 * Generate a presigned URL for secure file upload
 *
 * @param key - Storage key for the upload
 * @param contentType - MIME type of the file
 * @param expiresIn - URL expiration time in seconds (default: 900 = 15 minutes)
 * @param config - Optional storage configuration
 * @returns Presigned URL string
 */
export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 900,
  config?: StorageConfig
): Promise<string> {
  const cfg = config || getStorageConfig();
  const client = createStorageClient(cfg);

  const command = new PutObjectCommand({
    Bucket: cfg.bucketName,
    Key: key,
    ContentType: contentType,
  });

  // Generate presigned URL for direct upload
  const url = await getSignedUrl(client, command, { expiresIn });
  return url;
}

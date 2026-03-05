/**
 * Cloud Storage Service
 * Unified interface supporting Supabase Storage (primary), AWS S3, DigitalOcean Spaces
 *
 * Environment Variables:
 * - STORAGE_TYPE: 'supabase' | 's3' | 'spaces' (default: 'supabase')
 * - STORAGE_BUCKET_NAME: Bucket name (default: 'nrpg-uploads')
 *
 * Supabase (uses existing SUPABASE_* vars — no extra credentials needed):
 * - NEXT_PUBLIC_SUPABASE_URL: Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Service role key
 *
 * S3 / Spaces (legacy):
 * - STORAGE_REGION, STORAGE_ENDPOINT, STORAGE_ACCESS_KEY_ID, STORAGE_SECRET_ACCESS_KEY
 */

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createClient } from '@supabase/supabase-js';

export interface StorageConfig {
  type: 'supabase' | 's3' | 'spaces';
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

// ─── Supabase Storage helpers ─────────────────────────────────────────────────

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Supabase storage requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

function getSupabaseBucket() {
  return process.env.STORAGE_BUCKET_NAME || 'nrpg-uploads';
}

// ─── Config helper (for S3/Spaces legacy path) ────────────────────────────────

export function getStorageConfig(): StorageConfig {
  const type = (process.env.STORAGE_TYPE || 'supabase') as StorageConfig['type'];

  if (type === 'supabase') {
    // No S3 credentials needed — Supabase uses its own auth
    return {
      type,
      region: 'ap-southeast-2',
      bucketName: getSupabaseBucket(),
      accessKeyId: '',
      secretAccessKey: '',
    };
  }

  const region = process.env.STORAGE_REGION || 'us-east-1';
  const endpoint = process.env.STORAGE_ENDPOINT;
  const accessKeyId = process.env.STORAGE_ACCESS_KEY_ID || '';
  const secretAccessKey = process.env.STORAGE_SECRET_ACCESS_KEY || '';
  const bucketName = process.env.STORAGE_BUCKET_NAME || '';
  const publicUrl = process.env.STORAGE_PUBLIC_URL;

  if (!accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error('S3/Spaces storage requires STORAGE_ACCESS_KEY_ID, STORAGE_SECRET_ACCESS_KEY, and STORAGE_BUCKET_NAME');
  }

  return { type, region, endpoint, accessKeyId, secretAccessKey, bucketName, publicUrl };
}

// ─── S3 client (legacy) ───────────────────────────────────────────────────────

export function createStorageClient(config?: StorageConfig): S3Client {
  const cfg = config || getStorageConfig();
  const clientConfig: any = {
    region: cfg.region,
    credentials: { accessKeyId: cfg.accessKeyId, secretAccessKey: cfg.secretAccessKey },
  };
  if (cfg.endpoint) {
    clientConfig.endpoint = cfg.endpoint;
    clientConfig.forcePathStyle = false;
  }
  return new S3Client(clientConfig);
}

// ─── Upload ───────────────────────────────────────────────────────────────────

export async function uploadFile(
  key: string,
  content: Buffer | string,
  options: UploadOptions = {},
  config?: StorageConfig
): Promise<UploadResult> {
  const type = (process.env.STORAGE_TYPE || 'supabase') as StorageConfig['type'];

  if (type === 'supabase') {
    const supabase = getSupabaseClient();
    const bucket = getSupabaseBucket();
    const buffer = typeof content === 'string' ? Buffer.from(content, 'utf-8') : content;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(key, buffer, {
        contentType: options.contentType || 'application/octet-stream',
        cacheControl: options.cacheControl || '3600',
        upsert: true,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(key);

    return {
      key: data.path,
      url: urlData.publicUrl,
      size: buffer.length,
    };
  }

  // S3 / Spaces path
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
  const url = getStorageUrl(key, cfg);

  return {
    key,
    url,
    publicUrl: cfg.publicUrl ? `${cfg.publicUrl}/${key}` : undefined,
    size: buffer.length,
    etag: response.ETag,
  };
}

// ─── Download ─────────────────────────────────────────────────────────────────

export async function downloadFile(key: string, config?: StorageConfig): Promise<Buffer | null> {
  const type = (process.env.STORAGE_TYPE || 'supabase') as StorageConfig['type'];

  if (type === 'supabase') {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.storage.from(getSupabaseBucket()).download(key);
    if (error) {
      if (error.message?.includes('not found') || error.message?.includes('Object not found')) return null;
      throw error;
    }
    return data ? Buffer.from(await data.arrayBuffer()) : null;
  }

  const cfg = config || getStorageConfig();
  const client = createStorageClient(cfg);
  try {
    const command = new GetObjectCommand({ Bucket: cfg.bucketName, Key: key });
    const response = await client.send(command);
    if (!response.Body) return null;
    const chunks: Uint8Array[] = [];
    for await (const chunk of response.Body as any) chunks.push(chunk);
    return Buffer.concat(chunks);
  } catch (error: any) {
    if (error.name === 'NoSuchKey' || error.$metadata?.httpStatusCode === 404) return null;
    throw error;
  }
}

export async function downloadFileAsString(
  key: string,
  encoding: BufferEncoding = 'utf-8',
  config?: StorageConfig
): Promise<string | null> {
  const buffer = await downloadFile(key, config);
  return buffer ? buffer.toString(encoding) : null;
}

// ─── Exists ───────────────────────────────────────────────────────────────────

export async function fileExists(key: string, config?: StorageConfig): Promise<boolean> {
  const type = (process.env.STORAGE_TYPE || 'supabase') as StorageConfig['type'];

  if (type === 'supabase') {
    const supabase = getSupabaseClient();
    const folder = key.includes('/') ? key.substring(0, key.lastIndexOf('/')) : '';
    const filename = key.includes('/') ? key.substring(key.lastIndexOf('/') + 1) : key;
    const { data } = await supabase.storage.from(getSupabaseBucket()).list(folder, {
      search: filename,
      limit: 1,
    });
    return !!data && data.length > 0 && data.some((f) => f.name === filename);
  }

  const cfg = config || getStorageConfig();
  const client = createStorageClient(cfg);
  try {
    await client.send(new HeadObjectCommand({ Bucket: cfg.bucketName, Key: key }));
    return true;
  } catch (error: any) {
    if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) return false;
    throw error;
  }
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteFile(key: string, config?: StorageConfig): Promise<void> {
  const type = (process.env.STORAGE_TYPE || 'supabase') as StorageConfig['type'];

  if (type === 'supabase') {
    const supabase = getSupabaseClient();
    const { error } = await supabase.storage.from(getSupabaseBucket()).remove([key]);
    if (error) throw error;
    return;
  }

  const cfg = config || getStorageConfig();
  const client = createStorageClient(cfg);
  await client.send(new DeleteObjectCommand({ Bucket: cfg.bucketName, Key: key }));
}

// ─── URL helpers ──────────────────────────────────────────────────────────────

export function getStorageUrl(key: string, config?: StorageConfig): string {
  const type = (process.env.STORAGE_TYPE || 'supabase') as StorageConfig['type'];

  if (type === 'supabase') {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const bucket = getSupabaseBucket();
    return `${url}/storage/v1/object/public/${bucket}/${key}`;
  }

  const cfg = config || getStorageConfig();
  if (cfg.publicUrl) return `${cfg.publicUrl}/${key}`;
  if (cfg.endpoint) {
    const endpoint = cfg.endpoint.replace('https://', '').replace('http://', '');
    return `https://${cfg.bucketName}.${endpoint}/${key}`;
  }
  return `https://${cfg.bucketName}.s3.${cfg.region}.amazonaws.com/${key}`;
}

// ─── Presigned URLs ───────────────────────────────────────────────────────────

export async function getPresignedDownloadUrl(
  key: string,
  expiresIn: number = 3600,
  config?: StorageConfig
): Promise<string> {
  const type = (process.env.STORAGE_TYPE || 'supabase') as StorageConfig['type'];

  if (type === 'supabase') {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.storage
      .from(getSupabaseBucket())
      .createSignedUrl(key, expiresIn);
    if (error) throw error;
    return data.signedUrl;
  }

  const cfg = config || getStorageConfig();
  const client = createStorageClient(cfg);
  return getSignedUrl(client, new GetObjectCommand({ Bucket: cfg.bucketName, Key: key }), { expiresIn });
}

export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 900,
  config?: StorageConfig
): Promise<string> {
  const type = (process.env.STORAGE_TYPE || 'supabase') as StorageConfig['type'];

  if (type === 'supabase') {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.storage
      .from(getSupabaseBucket())
      .createSignedUploadUrl(key);
    if (error) throw error;
    return data.signedUrl;
  }

  const cfg = config || getStorageConfig();
  const client = createStorageClient(cfg);
  return getSignedUrl(
    client,
    new PutObjectCommand({ Bucket: cfg.bucketName, Key: key, ContentType: contentType }),
    { expiresIn }
  );
}

// ─── Key generator ────────────────────────────────────────────────────────────

export function generateStorageKey(prefix: string, filename: string, extension?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = extension || filename.split('.').pop() || '';
  const baseName = filename.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9]/gi, '-').toLowerCase();
  return `${prefix}/${timestamp}-${random}-${baseName}.${ext}`;
}

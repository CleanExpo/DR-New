/**
 * Sitemap Storage & Management
 * Disaster Recovery - NRPG Platform
 *
 * Handles sitemap persistence, updates, and cleanup.
 * Supports both file system (for Vercel/Next.js) and cloud storage (S3/GCS).
 */

import {
  SitemapUrl,
  SitemapConfig,
  SitemapFile,
  DEFAULT_SITEMAP_CONFIG,
  generateSitemapXml,
  generateSitemapIndexXml,
  splitIntoSitemapFiles,
} from './sitemap-generator';

// ============================================
// Types
// ============================================

export interface SitemapStorageConfig {
  storageType: 'filesystem' | 's3' | 'gcs' | 'vercel-blob';
  basePath: string;
  bucketName?: string;
  region?: string;
}

export interface SitemapStatus {
  lastUpdated: Date;
  totalUrls: number;
  sitemapCount: number;
  sitemapFiles: SitemapFile[];
  storageLocation: string;
  isIndex: boolean;
}

export interface StoredSitemap {
  xml: string;
  urls: SitemapUrl[];
  lastmod: Date;
  checksum: string;
}

// ============================================
// Default Configuration
// ============================================

const DEFAULT_STORAGE_CONFIG: SitemapStorageConfig = {
  storageType: 'filesystem',
  basePath: 'public',
};

// ============================================
// Sitemap Storage Operations
// ============================================

/**
 * Save sitemap to configured storage
 */
export async function saveSitemapToStorage(
  urls: SitemapUrl[],
  sitemapConfig: SitemapConfig = DEFAULT_SITEMAP_CONFIG,
  storageConfig: SitemapStorageConfig = DEFAULT_STORAGE_CONFIG
): Promise<SitemapStatus> {
  const lastUpdated = new Date();

  // Split into multiple files if needed
  if (urls.length > sitemapConfig.maxUrlsPerSitemap) {
    return saveMultipleSitemaps(urls, sitemapConfig, storageConfig, lastUpdated);
  }

  // Single sitemap
  const xml = generateSitemapXml(urls, sitemapConfig);
  const filename = 'sitemap.xml';

  await writeToStorage(filename, xml, storageConfig);

  console.log(`[Sitemap] Saved ${urls.length} URLs to ${filename}`);

  return {
    lastUpdated,
    totalUrls: urls.length,
    sitemapCount: 1,
    sitemapFiles: [
      {
        loc: `${sitemapConfig.baseUrl}/sitemap.xml`,
        lastmod: lastUpdated.toISOString().split('T')[0],
        urlCount: urls.length,
      },
    ],
    storageLocation: `${storageConfig.basePath}/${filename}`,
    isIndex: false,
  };
}

/**
 * Save multiple sitemap files with index
 */
async function saveMultipleSitemaps(
  urls: SitemapUrl[],
  sitemapConfig: SitemapConfig,
  storageConfig: SitemapStorageConfig,
  lastUpdated: Date
): Promise<SitemapStatus> {
  const { sitemaps, urlsByFile } = splitIntoSitemapFiles(urls, sitemapConfig);

  // Save individual sitemaps
  for (let i = 0; i < urlsByFile.length; i++) {
    const xml = generateSitemapXml(urlsByFile[i], sitemapConfig);
    const filename = `sitemap-${i + 1}.xml`;
    await writeToStorage(filename, xml, storageConfig);
    console.log(`[Sitemap] Saved ${urlsByFile[i].length} URLs to ${filename}`);
  }

  // Save sitemap index
  const indexXml = generateSitemapIndexXml(sitemaps, sitemapConfig);
  await writeToStorage('sitemap.xml', indexXml, storageConfig);
  console.log(`[Sitemap] Saved sitemap index with ${sitemaps.length} sitemaps`);

  return {
    lastUpdated,
    totalUrls: urls.length,
    sitemapCount: sitemaps.length,
    sitemapFiles: sitemaps,
    storageLocation: `${storageConfig.basePath}/sitemap.xml`,
    isIndex: true,
  };
}

/**
 * Write content to storage based on configuration
 */
async function writeToStorage(
  filename: string,
  content: string,
  config: SitemapStorageConfig
): Promise<void> {
  switch (config.storageType) {
    case 'filesystem':
      await writeToFilesystem(filename, content, config.basePath);
      break;
    case 's3':
      await writeToS3(filename, content, config);
      break;
    case 'gcs':
      await writeToGCS(filename, content, config);
      break;
    case 'vercel-blob':
      await writeToVercelBlob(filename, content);
      break;
    default:
      throw new Error(`Unknown storage type: ${config.storageType}`);
  }
}

/**
 * Write to local filesystem
 */
async function writeToFilesystem(filename: string, content: string, basePath: string): Promise<void> {
  // Dynamic import for Node.js fs module (server-side only)
  const { writeFile, mkdir } = await import('fs/promises');
  const { join } = await import('path');

  const filePath = join(process.cwd(), basePath, filename);

  // Ensure directory exists
  const dirPath = join(process.cwd(), basePath);
  await mkdir(dirPath, { recursive: true });

  await writeFile(filePath, content, 'utf-8');
}

/**
 * Write to AWS S3
 */
async function writeToS3(
  filename: string,
  content: string,
  config: SitemapStorageConfig
): Promise<void> {
  const { uploadFile } = await import('@/lib/storage/cloud-storage');

  const storageConfig = {
    type: 's3' as const,
    region: config.region || process.env.STORAGE_REGION || 'ap-southeast-2',
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY || '',
    bucketName: config.bucketName || process.env.STORAGE_BUCKET_NAME || '',
    endpoint: process.env.STORAGE_ENDPOINT, // Supports DigitalOcean Spaces
  };

  const key = `${config.basePath}/${filename}`;

  await uploadFile(key, content, {
    contentType: 'application/xml',
    cacheControl: 'public, max-age=3600',
    acl: 'public-read',
  }, storageConfig);

  console.log(`[S3] Uploaded ${filename} to bucket ${storageConfig.bucketName}`);
}

/**
 * Write to Google Cloud Storage
 */
async function writeToGCS(
  filename: string,
  content: string,
  config: SitemapStorageConfig
): Promise<void> {
  // Implementation note: To enable GCS support:
  // 1. Install: npm install @google-cloud/storage
  // 2. Set environment: GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
  // 3. Uncomment implementation below

  /*
  const { Storage } = await import('@google-cloud/storage');

  const storage = new Storage();
  const bucket = storage.bucket(config.bucketName!);
  const file = bucket.file(`${config.basePath}/${filename}`);

  await file.save(content, {
    contentType: 'application/xml',
    metadata: {
      cacheControl: 'public, max-age=3600',
    },
  });

  console.log(`[GCS] Uploaded ${filename} to bucket ${config.bucketName}`);
  */

  throw new Error('[GCS] Google Cloud Storage not configured. Install @google-cloud/storage and set GOOGLE_APPLICATION_CREDENTIALS.');
}

/**
 * Write to Vercel Blob Storage
 */
async function writeToVercelBlob(filename: string, content: string): Promise<void> {
  // Implementation note: To enable Vercel Blob support:
  // 1. Install: npm install @vercel/blob
  // 2. Set environment: BLOB_READ_WRITE_TOKEN (from Vercel dashboard)
  // 3. Uncomment implementation below

  /*
  const { put } = await import('@vercel/blob');

  const result = await put(filename, content, {
    access: 'public',
    contentType: 'application/xml',
    addRandomSuffix: false,
  });

  console.log(`[Vercel Blob] Uploaded ${filename} to ${result.url}`);
  */

  throw new Error('[Vercel Blob] Vercel Blob Storage not configured. Install @vercel/blob and set BLOB_READ_WRITE_TOKEN.');
}

// ============================================
// Sitemap Loading
// ============================================

/**
 * Load sitemap from storage
 */
export async function loadSitemapFromStorage(
  filename: string = 'sitemap.xml',
  storageConfig: SitemapStorageConfig = DEFAULT_STORAGE_CONFIG
): Promise<StoredSitemap | null> {
  try {
    const content = await readFromStorage(filename, storageConfig);

    if (!content) {
      return null;
    }

    // Parse XML to extract URLs (simplified - use proper XML parser in production)
    const urls = parseUrlsFromSitemap(content);

    return {
      xml: content,
      urls,
      lastmod: new Date(),
      checksum: generateChecksum(content),
    };
  } catch (error) {
    console.error(`[Sitemap] Error loading ${filename}:`, error);
    return null;
  }
}

/**
 * Read content from storage
 */
async function readFromStorage(
  filename: string,
  config: SitemapStorageConfig
): Promise<string | null> {
  switch (config.storageType) {
    case 'filesystem':
      return readFromFilesystem(filename, config.basePath);
    case 's3':
      return readFromS3(filename, config);
    case 'gcs':
      return readFromGCS(filename, config);
    case 'vercel-blob':
      return readFromVercelBlob(filename);
    default:
      throw new Error(`Unknown storage type: ${config.storageType}`);
  }
}

async function readFromFilesystem(filename: string, basePath: string): Promise<string | null> {
  try {
    const { readFile } = await import('fs/promises');
    const { join } = await import('path');
    const filePath = join(process.cwd(), basePath, filename);
    return await readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}

async function readFromS3(filename: string, config: SitemapStorageConfig): Promise<string | null> {
  const { downloadFileAsString } = await import('@/lib/storage/cloud-storage');

  const storageConfig = {
    type: 's3' as const,
    region: config.region || process.env.STORAGE_REGION || 'ap-southeast-2',
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY || '',
    bucketName: config.bucketName || process.env.STORAGE_BUCKET_NAME || '',
    endpoint: process.env.STORAGE_ENDPOINT, // Supports DigitalOcean Spaces
  };

  const key = `${config.basePath}/${filename}`;

  try {
    const content = await downloadFileAsString(key, 'utf-8', storageConfig);
    console.log(`[S3] Read ${filename} from bucket ${storageConfig.bucketName}`);
    return content;
  } catch (error) {
    console.error(`[S3] Error reading ${filename}:`, error);
    return null;
  }
}

async function readFromGCS(filename: string, config: SitemapStorageConfig): Promise<string | null> {
  // Implementation note: To enable GCS support:
  // 1. Install: npm install @google-cloud/storage
  // 2. Set environment: GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
  // 3. Uncomment implementation below

  /*
  const { Storage } = await import('@google-cloud/storage');

  const storage = new Storage();
  const bucket = storage.bucket(config.bucketName!);
  const file = bucket.file(`${config.basePath}/${filename}`);

  const [content] = await file.download();
  console.log(`[GCS] Read ${filename} from bucket ${config.bucketName}`);
  return content.toString('utf-8');
  */

  throw new Error('[GCS] Google Cloud Storage not configured. Install @google-cloud/storage and set GOOGLE_APPLICATION_CREDENTIALS.');
}

async function readFromVercelBlob(filename: string): Promise<string | null> {
  // Implementation note: To enable Vercel Blob support:
  // 1. Install: npm install @vercel/blob
  // 2. Set environment: BLOB_READ_WRITE_TOKEN (from Vercel dashboard)
  // 3. Uncomment implementation below

  /*
  const { head, download } = await import('@vercel/blob');

  try {
    const blob = await head(filename);
    if (!blob) return null;

    const response = await download(filename);
    const content = await response.text();
    console.log(`[Vercel Blob] Read ${filename}`);
    return content;
  } catch (error) {
    console.error(`[Vercel Blob] Error reading ${filename}:`, error);
    return null;
  }
  */

  throw new Error('[Vercel Blob] Vercel Blob Storage not configured. Install @vercel/blob and set BLOB_READ_WRITE_TOKEN.');
}

// ============================================
// Sitemap Updates
// ============================================

/**
 * Update sitemap with new pages (incremental update)
 */
export async function updateSitemapWithNewPages(
  newUrls: SitemapUrl[],
  sitemapConfig: SitemapConfig = DEFAULT_SITEMAP_CONFIG,
  storageConfig: SitemapStorageConfig = DEFAULT_STORAGE_CONFIG
): Promise<SitemapStatus> {
  // Load existing sitemap
  const existing = await loadSitemapFromStorage('sitemap.xml', storageConfig);

  // Merge URLs (deduplicate by loc)
  const existingLocs = new Set(existing?.urls.map((u) => u.loc) || []);
  const uniqueNewUrls = newUrls.filter((u) => !existingLocs.has(u.loc));

  const allUrls = [...(existing?.urls || []), ...uniqueNewUrls];

  console.log(`[Sitemap] Adding ${uniqueNewUrls.length} new URLs (${allUrls.length} total)`);

  // Save updated sitemap
  return saveSitemapToStorage(allUrls, sitemapConfig, storageConfig);
}

// ============================================
// Status & Cleanup
// ============================================

/**
 * Get current sitemap status
 */
export async function getSitemapStatus(
  storageConfig: SitemapStorageConfig = DEFAULT_STORAGE_CONFIG
): Promise<SitemapStatus | null> {
  const existing = await loadSitemapFromStorage('sitemap.xml', storageConfig);

  if (!existing) {
    return null;
  }

  // Check if index or single sitemap
  const isIndex = existing.xml.includes('<sitemapindex');

  let sitemapFiles: SitemapFile[] = [];
  let totalUrls = 0;

  if (isIndex) {
    // Parse sitemap index to get file list
    sitemapFiles = parseSitemapIndex(existing.xml);
    totalUrls = sitemapFiles.reduce((sum, f) => sum + f.urlCount, 0);
  } else {
    totalUrls = existing.urls.length;
    sitemapFiles = [
      {
        loc: `${DEFAULT_SITEMAP_CONFIG.baseUrl}/sitemap.xml`,
        lastmod: existing.lastmod.toISOString().split('T')[0],
        urlCount: totalUrls,
      },
    ];
  }

  return {
    lastUpdated: existing.lastmod,
    totalUrls,
    sitemapCount: sitemapFiles.length,
    sitemapFiles,
    storageLocation: `${storageConfig.basePath}/sitemap.xml`,
    isIndex,
  };
}

/**
 * Clean up old sitemap files
 */
export async function cleanupOldSitemaps(
  keepCount: number = 5,
  storageConfig: SitemapStorageConfig = DEFAULT_STORAGE_CONFIG
): Promise<number> {
  // TODO: Implement cleanup of old sitemap files
  // This would list all sitemap-*.xml files and delete old ones

  console.log(`[Sitemap] Would clean up old sitemaps, keeping ${keepCount}`);
  return 0;
}

// ============================================
// Utility Functions
// ============================================

/**
 * Parse URLs from sitemap XML (simplified)
 */
function parseUrlsFromSitemap(xml: string): SitemapUrl[] {
  const urls: SitemapUrl[] = [];

  // Simple regex-based parsing (use proper XML parser in production)
  const urlMatches = xml.matchAll(/<url>[\s\S]*?<\/url>/g);

  for (const match of urlMatches) {
    const urlBlock = match[0];

    const locMatch = urlBlock.match(/<loc>(.*?)<\/loc>/);
    const lastmodMatch = urlBlock.match(/<lastmod>(.*?)<\/lastmod>/);
    const changefreqMatch = urlBlock.match(/<changefreq>(.*?)<\/changefreq>/);
    const priorityMatch = urlBlock.match(/<priority>(.*?)<\/priority>/);

    if (locMatch) {
      urls.push({
        loc: locMatch[1],
        lastmod: lastmodMatch?.[1],
        changefreq: changefreqMatch?.[1] as SitemapUrl['changefreq'],
        priority: priorityMatch ? parseFloat(priorityMatch[1]) : undefined,
      });
    }
  }

  return urls;
}

/**
 * Parse sitemap index XML
 */
function parseSitemapIndex(xml: string): SitemapFile[] {
  const sitemaps: SitemapFile[] = [];

  const sitemapMatches = xml.matchAll(/<sitemap>[\s\S]*?<\/sitemap>/g);

  for (const match of sitemapMatches) {
    const block = match[0];

    const locMatch = block.match(/<loc>(.*?)<\/loc>/);
    const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/);

    if (locMatch) {
      sitemaps.push({
        loc: locMatch[1],
        lastmod: lastmodMatch?.[1] || new Date().toISOString().split('T')[0],
        urlCount: 0, // Would need to load each file to count
      });
    }
  }

  return sitemaps;
}

/**
 * Generate simple checksum for content
 */
function generateChecksum(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(16);
}

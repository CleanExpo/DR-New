/**
 * Storage Manager
 *
 * Unified interface for file storage operations (local, S3, GCS)
 */

import * as cloudStorage from '../../../lib/storage/cloud-storage';

export type StorageProvider = 'local' | 's3' | 'gcs';
export type FileCategory = 'recordings' | 'documents' | 'media' | 'avatars' | 'attachments';

export interface FileMetadata {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  category: FileCategory;
  uploadedBy: string;
  uploadedAt: Date;
  expiresAt?: Date;
  metadata?: Record<string, any>;
  isPublic: boolean;
  path: string;
  provider: StorageProvider;
}

export interface UploadOptions {
  category: FileCategory;
  isPublic?: boolean;
  expiresIn?: number; // seconds
  metadata?: Record<string, any>;
  onProgress?: (progress: number) => void;
}

export interface DownloadOptions {
  filename?: string;
  expiresIn?: number; // seconds for signed URLs
}

export interface StorageStats {
  provider: StorageProvider;
  totalFiles: number;
  totalSize: number; // bytes
  categories: Record<FileCategory, { count: number; size: number }>;
}

export interface StorageConfig {
  provider: StorageProvider;
  local?: {
    baseDir: string;
    maxFileSize: number;
  };
  s3?: {
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
  gcs?: {
    projectId: string;
    bucket: string;
    keyFilePath: string;
  };
}

/**
 * Storage provider interface
 */
interface IStorageProvider {
  upload(file: Buffer, filename: string, options: UploadOptions): Promise<FileMetadata>;
  download(id: string, options?: DownloadOptions): Promise<Buffer>;
  delete(id: string): Promise<boolean>;
  getMetadata(id: string): Promise<FileMetadata | null>;
  getSignedUrl(id: string, expiresIn?: number): Promise<string>;
  getStats(): Promise<StorageStats>;
  cleanup(beforeDate: Date): Promise<number>; // cleanup expired files
}

/**
 * Local file storage provider
 */
class LocalStorageProvider implements IStorageProvider {
  private baseDir: string;
  private maxFileSize: number;
  private fileIndex = new Map<string, FileMetadata>();

  constructor(baseDir: string, maxFileSize: number = 5 * 1024 * 1024 * 1024) {
    this.baseDir = baseDir;
    this.maxFileSize = maxFileSize;
  }

  async upload(file: Buffer, filename: string, options: UploadOptions): Promise<FileMetadata> {
    if (file.length > this.maxFileSize) {
      throw new Error(`File size exceeds maximum of ${this.maxFileSize} bytes`);
    }

    const id = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const path = `${this.baseDir}/${options.category}/${id}`;

    // In production, write file to disk
    // fs.writeFileSync(path, file);

    const metadata: FileMetadata = {
      id,
      filename: `${id}-${filename}`,
      originalName: filename,
      mimeType: options.metadata?.mimeType || 'application/octet-stream',
      size: file.length,
      category: options.category,
      uploadedBy: options.metadata?.userId || 'unknown',
      uploadedAt: new Date(),
      expiresAt: options.expiresIn ? new Date(Date.now() + options.expiresIn * 1000) : undefined,
      metadata: options.metadata,
      isPublic: options.isPublic || false,
      path,
      provider: 'local',
    };

    this.fileIndex.set(id, metadata);
    return metadata;
  }

  async download(id: string): Promise<Buffer> {
    const metadata = this.fileIndex.get(id);
    if (!metadata) {
      throw new Error(`File not found: ${id}`);
    }

    // In production, read file from disk
    // return fs.readFileSync(metadata.path);
    return Buffer.alloc(0);
  }

  async delete(id: string): Promise<boolean> {
    const metadata = this.fileIndex.get(id);
    if (!metadata) {
      return false;
    }

    // In production, delete file from disk
    // fs.unlinkSync(metadata.path);

    this.fileIndex.delete(id);
    return true;
  }

  async getMetadata(id: string): Promise<FileMetadata | null> {
    return this.fileIndex.get(id) || null;
  }

  async getSignedUrl(id: string): Promise<string> {
    const metadata = await this.getMetadata(id);
    if (!metadata) {
      throw new Error(`File not found: ${id}`);
    }

    // Return a local file URL
    return `/api/storage/download/${id}`;
  }

  async getStats(): Promise<StorageStats> {
    const stats: StorageStats = {
      provider: 'local',
      totalFiles: this.fileIndex.size,
      totalSize: 0,
      categories: {
        recordings: { count: 0, size: 0 },
        documents: { count: 0, size: 0 },
        media: { count: 0, size: 0 },
        avatars: { count: 0, size: 0 },
        attachments: { count: 0, size: 0 },
      },
    };

    this.fileIndex.forEach((metadata) => {
      stats.totalSize += metadata.size;
      const category = stats.categories[metadata.category];
      if (category) {
        category.count++;
        category.size += metadata.size;
      }
    });

    return stats;
  }

  async cleanup(beforeDate: Date): Promise<number> {
    let count = 0;
    const idsToDelete: string[] = [];

    this.fileIndex.forEach((metadata, id) => {
      if (metadata.expiresAt && metadata.expiresAt < beforeDate) {
        idsToDelete.push(id);
        count++;
      }
    });

    for (const id of idsToDelete) {
      await this.delete(id);
    }

    return count;
  }
}

/**
 * S3-compatible storage provider (AWS S3, DigitalOcean Spaces, etc.)
 */
class S3StorageProvider implements IStorageProvider {
  private config: cloudStorage.StorageConfig;
  private fileIndex = new Map<string, FileMetadata>(); // Track file metadata

  constructor(config: { bucket: string; region: string; accessKeyId: string; secretAccessKey: string; endpoint?: string }) {
    this.config = {
      type: config.endpoint ? 'spaces' : 's3',
      region: config.region,
      endpoint: config.endpoint,
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      bucketName: config.bucket,
    };
  }

  async upload(file: Buffer, filename: string, options: UploadOptions): Promise<FileMetadata> {
    // Generate unique storage key
    const key = cloudStorage.generateStorageKey(options.category, filename);

    // Upload to S3
    const result = await cloudStorage.uploadFile(
      key,
      file,
      {
        contentType: options.metadata?.mimeType || 'application/octet-stream',
        metadata: options.metadata,
        acl: options.isPublic ? 'public-read' : 'private',
      },
      this.config
    );

    // Create metadata
    const metadata: FileMetadata = {
      id: key,
      filename: key.split('/').pop() || filename,
      originalName: filename,
      mimeType: options.metadata?.mimeType || 'application/octet-stream',
      size: result.size,
      category: options.category,
      uploadedBy: options.metadata?.userId || 'unknown',
      uploadedAt: new Date(),
      expiresAt: options.expiresIn ? new Date(Date.now() + options.expiresIn * 1000) : undefined,
      metadata: options.metadata,
      isPublic: options.isPublic || false,
      path: result.key,
      provider: 's3',
    };

    // Store metadata
    this.fileIndex.set(key, metadata);

    return metadata;
  }

  async download(id: string): Promise<Buffer> {
    const buffer = await cloudStorage.downloadFile(id, this.config);
    if (!buffer) {
      throw new Error(`File not found: ${id}`);
    }
    return buffer;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await cloudStorage.deleteFile(id, this.config);
      this.fileIndex.delete(id);
      return true;
    } catch (error) {
      console.error(`Failed to delete file ${id}:`, error);
      return false;
    }
  }

  async getMetadata(id: string): Promise<FileMetadata | null> {
    // Check local cache first
    const cached = this.fileIndex.get(id);
    if (cached) {
      return cached;
    }

    // Check if file exists in S3
    const exists = await cloudStorage.fileExists(id, this.config);
    if (!exists) {
      return null;
    }

    // Return minimal metadata (would need to be enhanced with S3 metadata retrieval)
    return {
      id,
      filename: id.split('/').pop() || id,
      originalName: id.split('/').pop() || id,
      mimeType: 'application/octet-stream',
      size: 0,
      category: id.split('/')[0] as FileCategory,
      uploadedBy: 'unknown',
      uploadedAt: new Date(),
      metadata: {},
      isPublic: false,
      path: id,
      provider: 's3',
    };
  }

  async getSignedUrl(id: string, expiresIn: number = 3600): Promise<string> {
    return await cloudStorage.getPresignedDownloadUrl(id, expiresIn, this.config);
  }

  async getStats(): Promise<StorageStats> {
    const stats: StorageStats = {
      provider: 's3',
      totalFiles: this.fileIndex.size,
      totalSize: 0,
      categories: {
        recordings: { count: 0, size: 0 },
        documents: { count: 0, size: 0 },
        media: { count: 0, size: 0 },
        avatars: { count: 0, size: 0 },
        attachments: { count: 0, size: 0 },
      },
    };

    this.fileIndex.forEach((metadata) => {
      stats.totalSize += metadata.size;
      const category = stats.categories[metadata.category];
      if (category) {
        category.count++;
        category.size += metadata.size;
      }
    });

    return stats;
  }

  async cleanup(beforeDate: Date): Promise<number> {
    let count = 0;
    const idsToDelete: string[] = [];

    // Find expired files
    this.fileIndex.forEach((metadata, id) => {
      if (metadata.expiresAt && metadata.expiresAt < beforeDate) {
        idsToDelete.push(id);
      }
    });

    // Delete expired files
    for (const id of idsToDelete) {
      const deleted = await this.delete(id);
      if (deleted) {
        count++;
      }
    }

    return count;
  }
}

/**
 * StorageManager
 *
 * Unified interface for file storage operations
 */
class StorageManager {
  private provider: IStorageProvider;
  private config: StorageConfig;
  private uploadQueue: Array<{ file: Buffer; filename: string; options: UploadOptions }> = [];
  private isProcessing = false;

  constructor(config: StorageConfig) {
    this.config = config;

    switch (config.provider) {
      case 'local':
        this.provider = new LocalStorageProvider(
          config.local?.baseDir || './uploads',
          config.local?.maxFileSize || 5 * 1024 * 1024 * 1024
        );
        break;
      case 's3':
        if (!config.s3?.bucket || !config.s3?.accessKeyId || !config.s3?.secretAccessKey) {
          console.warn('S3 credentials not provided, falling back to local storage');
          this.provider = new LocalStorageProvider(config.local?.baseDir || './uploads');
        } else {
          this.provider = new S3StorageProvider({
            bucket: config.s3.bucket,
            region: config.s3.region,
            accessKeyId: config.s3.accessKeyId,
            secretAccessKey: config.s3.secretAccessKey,
          });
        }
        break;
      case 'gcs':
        // GCS provider initialization would go here
        this.provider = new LocalStorageProvider(config.local?.baseDir || './uploads');
        console.warn('GCS provider not fully implemented, using local storage');
        break;
      default:
        this.provider = new LocalStorageProvider(config.local?.baseDir || './uploads');
    }
  }

  /**
   * Upload file
   */
  async uploadFile(file: Buffer, filename: string, options: UploadOptions): Promise<FileMetadata> {
    return this.provider.upload(file, filename, options);
  }

  /**
   * Upload with queue (for batch operations)
   */
  async queueUpload(file: Buffer, filename: string, options: UploadOptions): Promise<FileMetadata> {
    return new Promise((resolve, reject) => {
      this.uploadQueue.push({ file, filename, options });
      this.processQueue().catch(reject);
    });
  }

  /**
   * Process upload queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.uploadQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      while (this.uploadQueue.length > 0) {
        const item = this.uploadQueue.shift();
        if (item) {
          await this.provider.upload(item.file, item.filename, item.options);
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Download file
   */
  async downloadFile(id: string): Promise<Buffer> {
    return this.provider.download(id);
  }

  /**
   * Delete file
   */
  async deleteFile(id: string): Promise<boolean> {
    return this.provider.delete(id);
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(id: string): Promise<FileMetadata | null> {
    return this.provider.getMetadata(id);
  }

  /**
   * Get signed/public URL
   */
  async getFileUrl(id: string, expiresIn?: number): Promise<string> {
    return this.provider.getSignedUrl(id, expiresIn);
  }

  /**
   * Get storage statistics
   */
  async getStorageStats(): Promise<StorageStats> {
    return this.provider.getStats();
  }

  /**
   * Cleanup expired files
   */
  async cleanupExpiredFiles(): Promise<number> {
    return this.provider.cleanup(new Date());
  }

  /**
   * Get provider type
   */
  getProvider(): StorageProvider {
    return this.config.provider;
  }

  /**
   * Switch provider (for multi-provider support)
   */
  switchProvider(config: StorageConfig): void {
    this.config = config;

    switch (config.provider) {
      case 'local':
        this.provider = new LocalStorageProvider(
          config.local?.baseDir || './uploads',
          config.local?.maxFileSize || 5 * 1024 * 1024 * 1024
        );
        break;
      case 's3':
        if (!config.s3?.bucket || !config.s3?.accessKeyId || !config.s3?.secretAccessKey) {
          console.warn('S3 credentials not provided, falling back to local storage');
          this.provider = new LocalStorageProvider(config.local?.baseDir || './uploads');
        } else {
          this.provider = new S3StorageProvider({
            bucket: config.s3.bucket,
            region: config.s3.region,
            accessKeyId: config.s3.accessKeyId,
            secretAccessKey: config.s3.secretAccessKey,
          });
        }
        break;
      case 'gcs':
        // GCS provider will be implemented later
        this.provider = new LocalStorageProvider(config.local?.baseDir || './uploads');
        console.warn('GCS provider not yet implemented, using local storage');
        break;
    }
  }
}

// Export singleton instance
export const storageManager = new StorageManager({
  provider: process.env.STORAGE_PROVIDER as StorageProvider || 'local',
  local: {
    baseDir: process.env.STORAGE_LOCAL_BASE_DIR || './uploads',
    maxFileSize: parseInt(process.env.STORAGE_MAX_FILE_SIZE || '5368709120', 10), // 5GB default
  },
  s3: {
    bucket: process.env.AWS_S3_BUCKET || '',
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  gcs: {
    projectId: process.env.GCS_PROJECT_ID || '',
    bucket: process.env.GCS_BUCKET || '',
    keyFilePath: process.env.GCS_KEY_FILE || '',
  },
});

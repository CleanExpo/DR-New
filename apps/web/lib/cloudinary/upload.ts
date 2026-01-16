/**
 * Cloudinary Upload Utilities
 *
 * Provides server-side and client-side upload functionality
 */

import crypto from 'crypto';
import {
  getCloudinaryConfig,
  isCloudinaryConfigured,
  allowedImageTypes,
  maxFileSize,
} from './config';

export interface SignedUploadParams {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
  uploadPreset?: string;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  thumbnailUrl?: string;
  error?: string;
}

/**
 * Generate signed upload parameters for client-side uploads
 * This allows direct browser-to-Cloudinary uploads without exposing API secret
 */
export function generateSignedUploadParams(
  folder: string = 'claims'
): SignedUploadParams {
  const config = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);

  // Parameters to sign (must be in alphabetical order)
  const paramsToSign = {
    folder: `disaster_recovery/${folder}`,
    timestamp: timestamp,
    upload_preset: config.uploadPreset,
  };

  // Create signature string
  const signatureString = Object.entries(paramsToSign)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  // Generate SHA-1 signature
  const signature = crypto
    .createHash('sha1')
    .update(signatureString + config.apiSecret)
    .digest('hex');

  return {
    timestamp,
    signature,
    apiKey: config.apiKey,
    cloudName: config.cloudName,
    folder: `disaster_recovery/${folder}`,
    uploadPreset: config.uploadPreset,
  };
}

/**
 * Generate a signed URL for uploading (alternative to params)
 */
export function getUploadUrl(): string {
  const config = getCloudinaryConfig();
  return `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`;
}

/**
 * Server-side upload to Cloudinary
 * Use this when you need to upload from the server (e.g., processing user uploads)
 */
export async function uploadToCloudinary(
  file: File | Buffer,
  options: {
    folder?: string;
    publicId?: string;
    transformation?: Record<string, unknown>;
  } = {}
): Promise<UploadResult> {
  if (!isCloudinaryConfigured()) {
    return {
      success: false,
      error: 'Cloudinary not configured',
    };
  }

  try {
    const config = getCloudinaryConfig();
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = `disaster_recovery/${options.folder || 'claims'}`;

    // Prepare form data
    const formData = new FormData();

    if (file instanceof File) {
      formData.append('file', file);
    } else {
      // Buffer - convert to base64
      const base64 = file.toString('base64');
      formData.append('file', `data:image/jpeg;base64,${base64}`);
    }

    formData.append('folder', folder);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', config.apiKey);

    if (options.publicId) {
      formData.append('public_id', options.publicId);
    }

    // Generate signature
    const paramsToSign: Record<string, string> = {
      folder,
      timestamp: timestamp.toString(),
    };

    if (options.publicId) {
      paramsToSign.public_id = options.publicId;
    }

    const signatureString = Object.entries(paramsToSign)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const signature = crypto
      .createHash('sha1')
      .update(signatureString + config.apiSecret)
      .digest('hex');

    formData.append('signature', signature);

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error?.message || 'Upload failed',
      };
    }

    const result = await response.json();

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      thumbnailUrl: result.secure_url.replace(
        '/upload/',
        '/upload/c_fill,w_200,h_200/'
      ),
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  if (!isCloudinaryConfigured()) {
    console.error('Cloudinary not configured');
    return false;
  }

  try {
    const config = getCloudinaryConfig();
    const timestamp = Math.floor(Date.now() / 1000);

    const signatureString = `public_id=${publicId}&timestamp=${timestamp}${config.apiSecret}`;
    const signature = crypto
      .createHash('sha1')
      .update(signatureString)
      .digest('hex');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          public_id: publicId,
          timestamp: timestamp.toString(),
          api_key: config.apiKey,
          signature,
        }),
      }
    );

    const result = await response.json();
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
}

/**
 * Validate file before upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!allowedImageTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: JPG, PNG, WebP, HEIC`,
    };
  }

  // Check file size
  if (file.size > maxFileSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxFileSize / (1024 * 1024)}MB`,
    };
  }

  return { valid: true };
}

/**
 * Get optimized URL with transformations
 */
export function getOptimizedUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  } = {}
): string {
  const { width = 800, height = 600, quality = 'auto', format = 'auto' } = options;

  // Insert transformation into Cloudinary URL
  return url.replace(
    '/upload/',
    `/upload/c_limit,w_${width},h_${height},q_${quality},f_${format}/`
  );
}

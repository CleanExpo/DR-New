/**
 * Cloudinary Configuration
 *
 * Setup instructions:
 * 1. Create account at https://cloudinary.com (free tier: 25GB storage, 25GB bandwidth)
 * 2. Get credentials from Dashboard > Settings > Access Keys
 * 3. Set environment variables:
 *    - CLOUDINARY_CLOUD_NAME
 *    - CLOUDINARY_API_KEY
 *    - CLOUDINARY_API_SECRET
 *    - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (for client-side)
 */

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadPreset?: string;
}

/**
 * Get Cloudinary configuration from environment variables
 */
export function getCloudinaryConfig(): CloudinaryConfig {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Cloudinary configuration missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.'
    );
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || 'disaster_recovery_claims',
  };
}

/**
 * Check if Cloudinary is configured
 */
export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Get public Cloudinary cloud name for client-side uploads
 */
export function getPublicCloudName(): string {
  return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
}

/**
 * Cloudinary transformation presets for different use cases
 */
export const transformationPresets = {
  // Thumbnail for grid display
  thumbnail: {
    width: 200,
    height: 200,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
  },
  // Medium size for detail view
  medium: {
    width: 800,
    height: 600,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
  },
  // Full size with optimization
  full: {
    width: 1920,
    height: 1080,
    crop: 'limit',
    quality: 'auto:best',
    format: 'auto',
  },
  // Claim photo - optimized for damage documentation
  claimPhoto: {
    width: 1200,
    height: 900,
    crop: 'limit',
    quality: 'auto:good',
    format: 'auto',
  },
};

/**
 * Allowed file types for upload
 */
export const allowedImageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
];

/**
 * Maximum file size in bytes (10MB)
 */
export const maxFileSize = 10 * 1024 * 1024;

/**
 * Maximum number of photos per claim
 */
export const maxPhotosPerClaim = 5;

import { createHash } from 'crypto';
import { sanitizeFileName, validateFileType, validateFileSize } from './input-validation';
import { securityLogger, SecurityEventType, SecuritySeverity } from './security-logger';

/**
 * File Upload Security
 * Comprehensive security for file uploads
 */

export interface FileUploadConfig {
  allowedTypes: string[]; // File extensions
  maxSizeInMB: number;
  allowedMimeTypes?: string[];
  scanForMalware?: boolean;
  requireAuthentication?: boolean;
  customValidator?: (file: File) => Promise<boolean>;
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  sanitizedName?: string;
  fileHash?: string;
}

// Dangerous file extensions that should never be uploaded
const DANGEROUS_EXTENSIONS = [
  'exe', 'dll', 'com', 'bat', 'cmd', 'sh', 'bash',
  'ps1', 'vbs', 'js', 'jar', 'app', 'deb', 'rpm',
  'dmg', 'pkg', 'scr', 'msi', 'hta', 'reg', 'pif'
];

// Image MIME types
const IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  'image/tiff'
];

// Document MIME types
const DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv'
];

// Default configuration
const DEFAULT_CONFIG: FileUploadConfig = {
  allowedTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
  maxSizeInMB: 10,
  allowedMimeTypes: [...IMAGE_MIME_TYPES, ...DOCUMENT_MIME_TYPES],
  scanForMalware: true,
  requireAuthentication: true,
};

/**
 * Validate uploaded file
 */
export async function validateUploadedFile(
  file: File,
  config: Partial<FileUploadConfig> = {},
  clientIp?: string
): Promise<FileValidationResult> {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // 1. Check file exists
  if (!file || !file.name) {
    return {
      valid: false,
      error: 'No file provided',
    };
  }

  // 2. Sanitize filename
  const sanitizedName = sanitizeFileName(file.name);

  // 3. Check for dangerous extensions
  const extension = sanitizedName.split('.').pop()?.toLowerCase();
  if (extension && DANGEROUS_EXTENSIONS.includes(extension)) {
    securityLogger.log({
      type: SecurityEventType.SUSPICIOUS_FILE_UPLOAD,
      severity: SecuritySeverity.HIGH,
      ipAddress: clientIp || 'unknown',
      details: { fileName: file.name, extension },
      success: false,
    });

    return {
      valid: false,
      error: 'File type not allowed for security reasons',
    };
  }

  // 4. Validate file type
  if (!validateFileType(sanitizedName, mergedConfig.allowedTypes)) {
    securityLogger.log({
      type: SecurityEventType.FILE_UPLOAD_REJECTED,
      severity: SecuritySeverity.LOW,
      ipAddress: clientIp || 'unknown',
      details: { fileName: file.name, extension, allowedTypes: mergedConfig.allowedTypes },
      success: false,
    });

    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${mergedConfig.allowedTypes.join(', ')}`,
    };
  }

  // 5. Validate MIME type
  if (mergedConfig.allowedMimeTypes && !mergedConfig.allowedMimeTypes.includes(file.type)) {
    securityLogger.log({
      type: SecurityEventType.FILE_UPLOAD_REJECTED,
      severity: SecuritySeverity.MEDIUM,
      ipAddress: clientIp || 'unknown',
      details: { fileName: file.name, mimeType: file.type, allowedMimeTypes: mergedConfig.allowedMimeTypes },
      success: false,
    });

    return {
      valid: false,
      error: 'Invalid file type',
    };
  }

  // 6. Validate file size
  const sizeInMB = file.size / (1024 * 1024);
  if (!validateFileSize(file.size, mergedConfig.maxSizeInMB)) {
    securityLogger.log({
      type: SecurityEventType.FILE_UPLOAD_REJECTED,
      severity: SecuritySeverity.LOW,
      ipAddress: clientIp || 'unknown',
      details: { fileName: file.name, sizeInMB: sizeInMB.toFixed(2), maxSize: mergedConfig.maxSizeInMB },
      success: false,
    });

    return {
      valid: false,
      error: `File too large. Maximum size: ${mergedConfig.maxSizeInMB}MB`,
    };
  }

  // 7. Check file content (magic numbers) to prevent MIME type spoofing
  const magicNumberCheck = await validateFileMagicNumber(file);
  if (!magicNumberCheck.valid) {
    securityLogger.log({
      type: SecurityEventType.SUSPICIOUS_FILE_UPLOAD,
      severity: SecuritySeverity.HIGH,
      ipAddress: clientIp || 'unknown',
      details: { fileName: file.name, reason: magicNumberCheck.error },
      success: false,
    });

    return {
      valid: false,
      error: 'File content does not match file type',
    };
  }

  // 8. Scan for malware (if configured)
  if (mergedConfig.scanForMalware) {
    const malwareScan = await scanForMalware(file);
    if (!malwareScan.safe) {
      securityLogger.log({
        type: SecurityEventType.SUSPICIOUS_FILE_UPLOAD,
        severity: SecuritySeverity.CRITICAL,
        ipAddress: clientIp || 'unknown',
        details: { fileName: file.name, reason: 'Malware detected' },
        success: false,
      });

      return {
        valid: false,
        error: 'File failed security scan',
      };
    }
  }

  // 9. Custom validation
  if (mergedConfig.customValidator) {
    const customValid = await mergedConfig.customValidator(file);
    if (!customValid) {
      return {
        valid: false,
        error: 'File failed custom validation',
      };
    }
  }

  // 10. Generate file hash for integrity
  const fileHash = await generateFileHash(file);

  // 11. Log successful upload
  securityLogger.log({
    type: SecurityEventType.FILE_UPLOAD,
    severity: SecuritySeverity.LOW,
    ipAddress: clientIp || 'unknown',
    details: {
      fileName: sanitizedName,
      sizeInMB: sizeInMB.toFixed(2),
      fileHash,
    },
    success: true,
  });

  return {
    valid: true,
    sanitizedName,
    fileHash,
  };
}

/**
 * Validate file magic numbers (file signature)
 */
async function validateFileMagicNumber(file: File): Promise<{ valid: boolean; error?: string }> {
  try {
    // Read first few bytes of the file
    const buffer = await file.slice(0, 8).arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // Common file signatures (magic numbers)
    const signatures: Record<string, number[][]> = {
      'jpg': [[0xFF, 0xD8, 0xFF]],
      'jpeg': [[0xFF, 0xD8, 0xFF]],
      'png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
      'gif': [[0x47, 0x49, 0x46, 0x38]],
      'pdf': [[0x25, 0x50, 0x44, 0x46]],
      'zip': [[0x50, 0x4B, 0x03, 0x04], [0x50, 0x4B, 0x05, 0x06], [0x50, 0x4B, 0x07, 0x08]],
      'webp': [[0x52, 0x49, 0x46, 0x46]], // First 4 bytes, followed by 'WEBP' at offset 8
    };

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension) {
      return { valid: false, error: 'No file extension' };
    }

    const expectedSignatures = signatures[extension];
    if (!expectedSignatures) {
      // If we don't have signature for this type, allow it but log
      return { valid: true };
    }

    // Check if any of the expected signatures match
    const matches = expectedSignatures.some(signature =>
      signature.every((byte, index) => bytes[index] === byte)
    );

    if (!matches) {
      return { valid: false, error: 'File signature does not match extension' };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: 'Failed to read file' };
  }
}

/**
 * Generate file hash for integrity checking
 */
async function generateFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Scan file for malware
 */
async function scanForMalware(file: File): Promise<{ safe: boolean; threat?: string }> {
  // TODO: Integrate with antivirus API (ClamAV, VirusTotal, etc.)
  // This is a placeholder implementation

  try {
    // In production, you would:
    // 1. Send file to antivirus API
    // 2. Wait for scan result
    // 3. Return result

    // For now, we'll do basic checks:

    // Check for suspicious patterns in filename
    const suspiciousPatterns = [
      /\.exe\.jpg$/i,
      /\.scr\.png$/i,
      /\.bat\.pdf$/i,
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(file.name)) {
        return { safe: false, threat: 'Suspicious filename pattern' };
      }
    }

    // Check file content for malicious patterns
    const content = await file.text();

    // Look for script injection attempts
    const maliciousPatterns = [
      /<script/i,
      /javascript:/i,
      /onerror=/i,
      /onload=/i,
      /<iframe/i,
    ];

    for (const pattern of maliciousPatterns) {
      if (pattern.test(content)) {
        return { safe: false, threat: 'Potential script injection' };
      }
    }

    return { safe: true };
  } catch (error) {
    // If we can't scan, err on the side of caution
    return { safe: false, threat: 'Scan failed' };
  }
}

/**
 * Validate image dimensions
 */
export async function validateImageDimensions(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<{ valid: boolean; width?: number; height?: number; error?: string }> {
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Not an image file' };
  }

  try {
    const bitmap = await createImageBitmap(file);
    const width = bitmap.width;
    const height = bitmap.height;

    bitmap.close();

    if (width > maxWidth || height > maxHeight) {
      return {
        valid: false,
        width,
        height,
        error: `Image dimensions exceed maximum (${maxWidth}x${maxHeight})`,
      };
    }

    return { valid: true, width, height };
  } catch (error) {
    return { valid: false, error: 'Failed to read image' };
  }
}

/**
 * Generate secure filename for storage
 */
export function generateSecureFilename(originalName: string): string {
  const sanitized = sanitizeFileName(originalName);
  const extension = sanitized.split('.').pop();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);

  return `${timestamp}-${random}.${extension}`;
}

/**
 * Check if file is an image
 */
export function isImageFile(file: File): boolean {
  return IMAGE_MIME_TYPES.includes(file.type);
}

/**
 * Check if file is a document
 */
export function isDocumentFile(file: File): boolean {
  return DOCUMENT_MIME_TYPES.includes(file.type);
}

/**
 * Get file metadata safely
 */
export function getFileMetadata(file: File): {
  name: string;
  size: number;
  type: string;
  lastModified: number;
} {
  return {
    name: sanitizeFileName(file.name),
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  };
}
// Image Processor Web Worker
// Handles image processing tasks off the main thread

self.addEventListener('message', async (event) => {
  const { type, data } = event.data;

  try {
    switch (type) {
      case 'COMPRESS_IMAGE':
        const compressed = await compressImage(data);
        self.postMessage({ type: 'COMPRESSION_RESULT', data: compressed });
        break;

      case 'VALIDATE_IMAGE':
        const validation = validateImage(data);
        self.postMessage({ type: 'VALIDATION_RESULT', data: validation });
        break;

      case 'GENERATE_THUMBNAIL':
        const thumbnail = await generateThumbnail(data);
        self.postMessage({ type: 'THUMBNAIL_RESULT', data: thumbnail });
        break;

      case 'BATCH_PROCESS':
        const results = await batchProcessImages(data.images);
        self.postMessage({ type: 'BATCH_RESULT', data: results });
        break;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    self.postMessage({
      type: 'ERROR',
      error: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
});

/**
 * Compress image while maintaining quality
 */
async function compressImage({ file, maxSizeMB = 1, maxWidthOrHeight = 1920 }) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate new dimensions
        let { width, height } = img;
        const ratio = Math.min(
          maxWidthOrHeight / width,
          maxWidthOrHeight / height
        );

        if (ratio < 1) {
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'));
              return;
            }

            // Check if size is acceptable
            const sizeMB = blob.size / 1024 / 1024;
            if (sizeMB > maxSizeMB) {
              // Recursively compress with lower quality
              const newQuality = Math.max(0.5, 0.9 * (maxSizeMB / sizeMB));
              canvas.toBlob(
                (newBlob) => {
                  resolve({
                    blob: newBlob,
                    width,
                    height,
                    originalSize: file.size,
                    compressedSize: newBlob.size,
                    compressionRatio: (
                      (1 - newBlob.size / file.size) *
                      100
                    ).toFixed(2),
                  });
                },
                'image/jpeg',
                newQuality
              );
            } else {
              resolve({
                blob,
                width,
                height,
                originalSize: file.size,
                compressedSize: blob.size,
                compressionRatio: (
                  (1 - blob.size / file.size) *
                  100
                ).toFixed(2),
              });
            }
          },
          'image/jpeg',
          0.9
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Validate image file
 */
function validateImage({ file, maxSizeMB = 10, allowedTypes = [] }) {
  const errors = [];

  // Default allowed types
  const defaultTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const types = allowedTypes.length > 0 ? allowedTypes : defaultTypes;

  // Check file type
  if (!types.includes(file.type)) {
    errors.push(
      `Invalid file type. Allowed types: ${types.map((t) => t.split('/')[1]).join(', ')}`
    );
  }

  // Check file size
  const sizeMB = file.size / 1024 / 1024;
  if (sizeMB > maxSizeMB) {
    errors.push(`File size (${sizeMB.toFixed(2)}MB) exceeds maximum (${maxSizeMB}MB)`);
  }

  // Check file name
  if (!file.name || file.name.length > 255) {
    errors.push('Invalid file name');
  }

  return {
    valid: errors.length === 0,
    errors,
    details: {
      name: file.name,
      type: file.type,
      size: file.size,
      sizeMB: sizeMB.toFixed(2),
    },
  };
}

/**
 * Generate thumbnail from image
 */
async function generateThumbnail({ file, width = 150, height = 150 }) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        // Calculate crop dimensions (cover mode)
        const scale = Math.max(width / img.width, height / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;

        // Draw cropped image
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create thumbnail'));
              return;
            }

            resolve({
              blob,
              width,
              height,
            });
          },
          'image/jpeg',
          0.8
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Process multiple images in batch
 */
async function batchProcessImages(images) {
  const results = [];

  for (const { file, options } of images) {
    try {
      const validation = validateImage({ file, ...options.validation });

      if (!validation.valid) {
        results.push({
          file: file.name,
          success: false,
          errors: validation.errors,
        });
        continue;
      }

      const compressed = await compressImage({ file, ...options.compression });

      results.push({
        file: file.name,
        success: true,
        data: compressed,
      });

      // Send progress update
      self.postMessage({
        type: 'BATCH_PROGRESS',
        data: {
          processed: results.length,
          total: images.length,
          percentage: ((results.length / images.length) * 100).toFixed(0),
        },
      });
    } catch (error) {
      results.push({
        file: file.name,
        success: false,
        errors: [error.message],
      });
    }
  }

  return results;
}

// Signal worker is ready
self.postMessage({ type: 'READY' });

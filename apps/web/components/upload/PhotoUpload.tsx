'use client';
/**
 * Photo Upload Component
 *
 * Handles client-side uploads to Cloudinary with:
 * - Drag and drop support
 * - Progress indicators
 * - Image preview
 * - Validation
 */


import * as React from 'react';
import { Upload, X, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import {
  allowedImageTypes,
  maxFileSize,
  maxPhotosPerClaim,
} from '@/lib/cloudinary/config';

export interface UploadedPhoto {
  url: string;
  publicId?: string;
  thumbnailUrl?: string;
  name: string;
  size: number;
}

export interface PhotoUploadProps {
  photos: UploadedPhoto[];
  onPhotosChange: (photos: UploadedPhoto[]) => void;
  maxPhotos?: number;
  folder?: string;
  className?: string;
}

interface UploadingFile {
  id: string;
  name: string;
  progress: number;
  error?: string;
}

export function PhotoUpload({
  photos,
  onPhotosChange,
  maxPhotos = maxPhotosPerClaim,
  folder = 'claims',
  className = '',
}: PhotoUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadingFiles, setUploadingFiles] = React.useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const canUploadMore = photos.length + uploadingFiles.length < maxPhotos;

  /**
   * Upload a single file to Cloudinary
   */
  const uploadFile = async (file: File): Promise<UploadedPhoto | null> => {
    const uploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Add to uploading list
    setUploadingFiles((prev) => [
      ...prev,
      { id: uploadId, name: file.name, progress: 0 },
    ]);

    try {
      // Validate file
      if (!allowedImageTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload JPG, PNG, or WebP images.');
      }

      if (file.size > maxFileSize) {
        throw new Error(`File too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB.`);
      }

      // Get signed upload parameters
      const signedUrlResponse = await fetch(`/api/upload/signed-url?folder=${folder}`);
      const signedUrlData = await signedUrlResponse.json();

      if (!signedUrlData.success) {
        // Check if mock mode (development)
        if (signedUrlData.mock) {
          // Use local object URL for development
          const localUrl = URL.createObjectURL(file);
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.id === uploadId ? { ...f, progress: 100 } : f
            )
          );

          // Short delay to show completion
          await new Promise((resolve) => setTimeout(resolve, 500));

          return {
            url: localUrl,
            name: file.name,
            size: file.size,
            thumbnailUrl: localUrl,
          };
        }
        throw new Error(signedUrlData.error || 'Failed to get upload credentials');
      }

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signedUrlData.params.apiKey);
      formData.append('timestamp', signedUrlData.params.timestamp.toString());
      formData.append('signature', signedUrlData.params.signature);
      formData.append('folder', signedUrlData.params.folder);
      if (signedUrlData.params.uploadPreset) {
        formData.append('upload_preset', signedUrlData.params.uploadPreset);
      }

      // Upload with progress tracking
      const xhr = new XMLHttpRequest();
      const uploadPromise = new Promise<UploadedPhoto>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadingFiles((prev) =>
              prev.map((f) =>
                f.id === uploadId ? { ...f, progress } : f
              )
            );
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve({
              url: response.secure_url,
              publicId: response.public_id,
              thumbnailUrl: response.secure_url.replace(
                '/upload/',
                '/upload/c_fill,w_200,h_200/'
              ),
              name: file.name,
              size: file.size,
            });
          } else {
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error during upload'));
        });

        xhr.open('POST', signedUrlData.uploadUrl);
        xhr.send(formData);
      });

      const result = await uploadPromise;

      // Remove from uploading list
      setUploadingFiles((prev) => prev.filter((f) => f.id !== uploadId));

      return result;
    } catch (err) {
      // Mark as error
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f.id === uploadId ? { ...f, error: errorMessage } : f
        )
      );

      // Remove after delay
      setTimeout(() => {
        setUploadingFiles((prev) => prev.filter((f) => f.id !== uploadId));
      }, 3000);

      return null;
    }
  };

  /**
   * Handle file selection
   */
  const handleFiles = async (files: FileList | File[]) => {
    setError(null);

    const fileArray = Array.from(files);
    const remainingSlots = maxPhotos - photos.length - uploadingFiles.length;

    if (fileArray.length > remainingSlots) {
      setError(`You can only upload ${remainingSlots} more photo(s).`);
      return;
    }

    // Upload files in parallel
    const uploadPromises = fileArray.map((file) => uploadFile(file));
    const results = await Promise.all(uploadPromises);

    // Filter out failed uploads and add successful ones
    const successfulUploads = results.filter(
      (result): result is UploadedPhoto => result !== null
    );

    if (successfulUploads.length > 0) {
      onPhotosChange([...photos, ...successfulUploads]);
    }
  };

  /**
   * Handle drag events
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (canUploadMore) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (!canUploadMore) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  /**
   * Handle file input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Remove a photo
   */
  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  /**
   * Remove failed upload
   */
  const removeUploadingFile = (id: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Photo Grid */}
      {(photos.length > 0 || uploadingFiles.length > 0) && (
        <div className="grid grid-cols-3 gap-3">
          {/* Uploaded photos */}
          {photos.map((photo, index) => (
            <div key={photo.url} className="relative group">
              <img
                src={photo.thumbnailUrl || photo.url}
                alt={photo.name || `Photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove photo"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg truncate">
                {photo.name}
              </div>
            </div>
          ))}

          {/* Uploading files */}
          {uploadingFiles.map((file) => (
            <div
              key={file.id}
              className={`relative flex flex-col items-center justify-center h-32 rounded-lg border-2 ${
                file.error
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              {file.error ? (
                <>
                  <AlertCircle className="h-8 w-8 text-red-500 mb-1" />
                  <p className="text-xs text-red-600 text-center px-2 truncate w-full">
                    {file.error}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeUploadingFile(file.id)}
                    className="absolute top-1 right-1 text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : file.progress === 100 ? (
                <>
                  <CheckCircle className="h-8 w-8 text-green-500 mb-1" />
                  <p className="text-xs text-green-600">Complete</p>
                </>
              ) : (
                <>
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-1" />
                  <p className="text-xs text-gray-400">{file.progress}%</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-[width] duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                </>
              )}
              <p className="absolute top-1 left-1 text-xs text-gray-400 truncate max-w-[80%]">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {canUploadMore && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload
            className={`h-8 w-8 mb-2 ${
              isDragging ? 'text-blue-500' : 'text-gray-400'
            }`}
          />
          <p className="text-sm text-gray-400">
            {isDragging
              ? 'Drop photos here'
              : `Click or drag to upload (${photos.length}/${maxPhotos})`}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            JPG, PNG, WebP up to {maxFileSize / (1024 * 1024)}MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={allowedImageTypes.join(',')}
            multiple
            onChange={handleInputChange}
          />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
}

export default PhotoUpload;

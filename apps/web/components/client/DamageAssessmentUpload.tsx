'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle, AlertCircle, Edit2 } from 'lucide-react';
import { PhotoCategorizationModal } from './PhotoCategorizationModal';

// Damage type categories (user-friendly labels)
export const DAMAGE_TYPES = [
  'Water',
  'Fire',
  'Mould',
  'Storm',
  'Structural',
  'Contents',
  'Other',
] as const;

export type DamageType = typeof DAMAGE_TYPES[number];

// Room location options
export const ROOM_LOCATIONS = [
  'Kitchen',
  'Bathroom',
  'Living Room',
  'Bedroom',
  'Garage',
  'Exterior',
  'Roof',
  'Basement',
  'Laundry',
  'Hallway',
  'Other',
] as const;

export type RoomLocation = typeof ROOM_LOCATIONS[number];

// Photo upload interface
export interface DamagePhoto {
  id: string;
  file: File;
  preview: string;
  url?: string; // Uploaded URL from Supabase
  damageType: DamageType | null;
  roomLocation: RoomLocation | null;
  caption: string;
  status: 'pending' | 'categorizing' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

interface DamageAssessmentUploadProps {
  photos: DamagePhoto[];
  onPhotosChange: (photos: DamagePhoto[]) => void;
  maxFiles?: number;
  className?: string;
  onUploadComplete?: (photos: DamagePhoto[]) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export function DamageAssessmentUpload({
  photos,
  onPhotosChange,
  maxFiles = 10,
  className = '',
  onUploadComplete,
}: DamageAssessmentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [categorizingPhoto, setCategorizingPhoto] = useState<DamagePhoto | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if we can upload more photos
  const canUploadMore = photos.length < maxFiles;

  // Validate file
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size (10MB limit for photos)
    const maxSizeBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return { valid: false, error: 'File size exceeds 10MB limit' };
    }

    // Check file type (images only)
    if (!file.type.startsWith('image/')) {
      return { valid: false, error: 'Only image files are allowed' };
    }

    return { valid: true };
  };

  // Upload a single photo to Supabase
  const uploadPhoto = async (photo: DamagePhoto): Promise<DamagePhoto> => {
    try {
      // Update status to uploading
      updatePhotoStatus(photo.id, 'uploading', 0);

      // Create form data
      const formData = new FormData();
      formData.append('file', photo.file);
      formData.append('bucket', 'damage-photos');

      // Upload with progress tracking
      const xhr = new XMLHttpRequest();
      const uploadPromise = new Promise<{ url: string }>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            updatePhotoStatus(photo.id, 'uploading', progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
              resolve({ url: response.url });
            } else {
              reject(new Error(response.message || 'Upload failed'));
            }
          } else {
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error during upload'));
        });

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
      });

      const result = await uploadPromise;

      // Update photo with uploaded URL
      const updatedPhoto: DamagePhoto = {
        ...photo,
        url: result.url,
        status: 'success',
        progress: 100,
      };

      updatePhotoInList(photo.id, updatedPhoto);
      return updatedPhoto;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      const updatedPhoto: DamagePhoto = {
        ...photo,
        status: 'error',
        error: errorMessage,
      };
      updatePhotoInList(photo.id, updatedPhoto);
      return updatedPhoto;
    }
  };

  // Update photo status in the list
  const updatePhotoStatus = (id: string, status: DamagePhoto['status'], progress?: number) => {
    onPhotosChange(
      photos.map((p) =>
        p.id === id ? { ...p, status, progress } : p
      )
    );
  };

  // Update photo in the list
  const updatePhotoInList = (id: string, updatedPhoto: DamagePhoto) => {
    onPhotosChange(
      photos.map((p) => (p.id === id ? updatedPhoto : p))
    );
  };

  // Handle file selection
  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);

      // Check max files limit
      if (photos.length + fileArray.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Create photo objects with preview
      const newPhotos: DamagePhoto[] = [];

      for (const file of fileArray) {
        const validation = validateFile(file);

        const photo: DamagePhoto = {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          preview: URL.createObjectURL(file),
          damageType: null,
          roomLocation: null,
          caption: '',
          status: validation.valid ? 'pending' : 'error',
          error: validation.error,
        };

        newPhotos.push(photo);
      }

      // Add to list
      const updatedPhotos = [...photos, ...newPhotos];
      onPhotosChange(updatedPhotos);

      // Start categorization for first valid photo
      const firstValidPhoto = newPhotos.find((p) => p.status === 'pending');
      if (firstValidPhoto) {
        setCategorizingPhoto(firstValidPhoto);
      }
    },
    [photos, maxFiles, onPhotosChange]
  );

  // Handle photo categorization completion
  const handleCategorizationComplete = async (
    photoId: string,
    damageType: DamageType,
    roomLocation: RoomLocation,
    caption: string
  ) => {
    // Update photo with categorization
    const updatedPhotos = photos.map((p) =>
      p.id === photoId
        ? {
            ...p,
            damageType,
            roomLocation,
            caption,
            status: 'pending' as const,
          }
        : p
    );
    onPhotosChange(updatedPhotos);

    // Close modal
    setCategorizingPhoto(null);

    // Find the next photo that needs categorization
    const nextPhoto = updatedPhotos.find(
      (p) => p.status === 'pending' && p.id !== photoId && !p.damageType
    );

    if (nextPhoto) {
      // Categorize next photo
      setCategorizingPhoto(nextPhoto);
    } else {
      // All photos categorized, start uploading
      const photosToUpload = updatedPhotos.filter(
        (p) => p.status === 'pending' && p.damageType && p.roomLocation
      );

      if (photosToUpload.length > 0) {
        // Upload all photos in parallel
        const uploadPromises = photosToUpload.map((p) => uploadPhoto(p));
        await Promise.all(uploadPromises);

        // Notify completion
        if (onUploadComplete) {
          const uploadedPhotos = updatedPhotos.filter((p) => p.status === 'success');
          onUploadComplete(uploadedPhotos);
        }
      }
    }
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canUploadMore) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!canUploadMore) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle remove photo
  const handleRemovePhoto = (photoId: string) => {
    const photo = photos.find((p) => p.id === photoId);
    if (photo) {
      // Revoke object URL to free memory
      URL.revokeObjectURL(photo.preview);
    }
    onPhotosChange(photos.filter((p) => p.id !== photoId));
  };

  // Handle edit photo categorization
  const handleEditPhoto = (photoId: string) => {
    const photo = photos.find((p) => p.id === photoId);
    if (photo) {
      setCategorizingPhoto(photo);
    }
  };

  // Handle browse button click
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Get status icon
  const getStatusIcon = (photo: DamagePhoto) => {
    switch (photo.status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-dr-emergency" />;
      case 'uploading':
        return (
          <div className="relative">
            <Loader2 className="h-5 w-5 text-semantic-contractor animate-spin" />
            {photo.progress !== undefined && (
              <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-portal-muted">
                {photo.progress}%
              </span>
            )}
          </div>
        );
      case 'pending':
      case 'categorizing':
        return null;
      default:
        return null;
    }
  };

  return (
    <>
      <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
        <CardHeader className="pb-3 border-b border-portal-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Damage Assessment Photos
            </CardTitle>
            <Badge variant="outline" className="border-portal-border text-portal-muted">
              {photos.length}/{maxFiles} photos
            </Badge>
          </div>
          <p className="text-sm text-portal-muted mt-2">
            Upload photos and categorize them by damage type and room location
          </p>
        </CardHeader>

        <CardContent className="p-6">
          {/* Photo Grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group border border-portal-border rounded-lg overflow-hidden bg-portal-hover"
                >
                  {/* Photo preview */}
                  <img
                    src={photo.preview}
                    alt={photo.caption || 'Damage photo'}
                    className="w-full h-40 object-cover"
                  />

                  {/* Status overlay */}
                  {photo.status === 'uploading' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 text-white animate-spin mx-auto" />
                        <p className="text-white text-sm mt-2">{photo.progress}%</p>
                      </div>
                    </div>
                  )}

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <div className="text-white text-xs space-y-1">
                      {photo.damageType && (
                        <p className="font-semibold">
                          <Badge className="bg-semantic-contractor text-white text-xs">
                            {photo.damageType}
                          </Badge>
                        </p>
                      )}
                      {photo.roomLocation && (
                        <p className="text-xs opacity-90">{photo.roomLocation}</p>
                      )}
                      {photo.caption && (
                        <p className="text-xs opacity-80 truncate">{photo.caption}</p>
                      )}
                      {photo.error && (
                        <p className="text-xs text-dr-emergency">{photo.error}</p>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo.status === 'success' && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-white/90 hover:bg-white"
                        onClick={() => handleEditPhoto(photo.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-white/90 hover:bg-white hover:text-dr-emergency"
                      onClick={() => handleRemovePhoto(photo.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Status indicator */}
                  {photo.status !== 'uploading' && (
                    <div className="absolute top-2 left-2">{getStatusIcon(photo)}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Upload Drop Zone */}
          {canUploadMore && (
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
                         ${
                           isDragging
                             ? 'border-semantic-contractor bg-semantic-contractor/5 scale-[1.02]'
                             : 'border-portal-border hover:border-semantic-contractor/50 hover:bg-portal-hover'
                         }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <ImageIcon
                className={`h-12 w-12 mx-auto mb-4 transition-colors ${
                  isDragging ? 'text-semantic-contractor' : 'text-portal-muted'
                }`}
              />

              <p className="text-gray-900 font-medium mb-2">
                {isDragging ? 'Drop photos here' : 'Drag and drop damage photos'}
              </p>
              <p className="text-sm text-portal-muted mb-4">
                or click to browse (JPG, PNG, HEIC up to 10MB)
              </p>

              <Button
                onClick={handleBrowseClick}
                disabled={!canUploadMore}
                className="bg-semantic-contractor hover:bg-semantic-contractor/90 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Categorization Modal */}
      {categorizingPhoto && (
        <PhotoCategorizationModal
          photo={categorizingPhoto}
          onComplete={handleCategorizationComplete}
          onCancel={() => {
            // Mark as pending without categorization
            setCategorizingPhoto(null);
          }}
        />
      )}
    </>
  );
}

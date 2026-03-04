'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, X, FileText, Image as ImageIcon, File, CheckCircle, AlertCircle } from 'lucide-react';

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

interface DocumentUploadZoneProps {
  onUpload: (files: File[]) => Promise<void>;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  maxFiles?: number;
  title?: string;
  description?: string;
  showPreviews?: boolean;
  className?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return ImageIcon;
  if (type.includes('pdf')) return FileText;
  return File;
};

export function DocumentUploadZone({
  onUpload,
  acceptedTypes = ['image/*', 'application/pdf', '.doc', '.docx'],
  maxSize = 10, // 10MB default
  maxFiles = 5,
  title = 'Upload Documents',
  description = 'Drag and drop files here or click to browse',
  showPreviews = true,
  className = '',
}: DocumentUploadZoneProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return { valid: false, error: `File size exceeds ${maxSize}MB limit` };
    }

    // Check file type
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    const isValidType = acceptedTypes.some((type) => {
      if (type.startsWith('.')) {
        return fileName.endsWith(type);
      }
      if (type.endsWith('/*')) {
        const category = type.split('/')[0];
        return fileType.startsWith(category);
      }
      return fileType === type;
    });

    if (!isValidType) {
      return { valid: false, error: 'File type not accepted' };
    }

    return { valid: true };
  };

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);

      // Check max files limit
      if (uploadedFiles.length + fileArray.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Validate and prepare files
      const newFiles: UploadedFile[] = [];
      for (const file of fileArray) {
        const validation = validateFile(file);

        const uploadedFile: UploadedFile = {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: validation.valid ? 'pending' : 'error',
          error: validation.error,
        };

        // Generate preview for images
        if (file.type.startsWith('image/') && showPreviews) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUploadedFiles((prev) =>
              prev.map((f) =>
                f.id === uploadedFile.id ? { ...f, preview: reader.result as string } : f
              )
            );
          };
          reader.readAsDataURL(file);
        }

        newFiles.push(uploadedFile);
      }

      setUploadedFiles((prev) => [...prev, ...newFiles]);

      // Upload valid files
      const validFiles = newFiles.filter((f) => f.status === 'pending').map((f) => f.file);
      if (validFiles.length > 0) {
        setIsUploading(true);
        try {
          await onUpload(validFiles);
          // Mark as success
          setUploadedFiles((prev) =>
            prev.map((f) =>
              validFiles.some((vf) => vf.name === f.name) ? { ...f, status: 'success' } : f
            )
          );
        } catch (error) {
          // Mark as error
          setUploadedFiles((prev) =>
            prev.map((f) =>
              validFiles.some((vf) => vf.name === f.name)
                ? { ...f, status: 'error', error: 'Upload failed' }
                : f
            )
          );
        } finally {
          setIsUploading(false);
        }
      }
    },
    [uploadedFiles.length, maxFiles, onUpload, showPreviews, maxSize, acceptedTypes]
  );

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
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

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

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

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
      <CardHeader className="pb-3 border-b border-portal-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          <Badge variant="outline" className="border-portal-border text-portal-muted">
            {uploadedFiles.length}/{maxFiles} files
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Drop zone */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-[border-color,background-color,transform] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]
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
            accept={acceptedTypes.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
          />

          <Upload
            className={`h-12 w-12 mx-auto mb-4 transition-colors ${
              isDragging ? 'text-semantic-contractor' : 'text-portal-muted'
            }`}
          />

          <p className="text-gray-900 font-medium mb-2">{description}</p>
          <p className="text-sm text-portal-muted mb-4">
            {acceptedTypes.join(', ')} (max {maxSize}MB)
          </p>

          <Button
            onClick={handleBrowseClick}
            disabled={isUploading || uploadedFiles.length >= maxFiles}
            className="bg-semantic-contractor hover:bg-semantic-contractor/90 text-white"
          >
            Browse Files
          </Button>
        </div>

        {/* File list */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">Uploaded Files</h4>
            {uploadedFiles.map((uploadedFile) => {
              const FileIcon = getFileIcon(uploadedFile.type);

              return (
                <div
                  key={uploadedFile.id}
                  className="flex items-center gap-4 p-3 bg-portal-hover rounded-lg border border-portal-border
                           hover:border-semantic-contractor/30 transition-colors group"
                >
                  {/* Preview or icon */}
                  <div className="flex-shrink-0">
                    {uploadedFile.preview ? (
                      <img
                        src={uploadedFile.preview}
                        alt={uploadedFile.name}
                        className="h-12 w-12 rounded object-cover border border-portal-border"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded bg-portal-card border border-portal-border flex items-center justify-center">
                        <FileIcon className="h-6 w-6 text-portal-muted" />
                      </div>
                    )}
                  </div>

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile.name}</p>
                    <p className="text-xs text-portal-muted">{formatFileSize(uploadedFile.size)}</p>
                    {uploadedFile.error && (
                      <p className="text-xs text-dr-emergency mt-1">{uploadedFile.error}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {uploadedFile.status === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {uploadedFile.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-dr-emergency" />
                    )}
                    {uploadedFile.status === 'uploading' && (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-semantic-contractor border-t-transparent" />
                    )}

                    {/* Remove button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 hover:bg-dr-emergency/10 hover:text-dr-emergency"
                      onClick={() => handleRemoveFile(uploadedFile.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

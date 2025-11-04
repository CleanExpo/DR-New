'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface DocumentUploadProps {
  onUpload: (fileUrl: string) => void;
  accept?: string;
  maxSize?: number; // in bytes
  label: string;
  description?: string;
  currentFile?: string;
  required?: boolean;
}

export function DocumentUpload({
  onUpload,
  accept = 'image/*,application/pdf',
  maxSize = 5 * 1024 * 1024, // 5MB default
  label,
  description,
  currentFile,
  required = true,
}: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(currentFile || null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setError(null);

      // Validate file size
      if (file.size > maxSize) {
        const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
        setError(`File size must be less than ${maxSizeMB}MB`);
        toast.error(`File size must be less than ${maxSizeMB}MB`);
        return;
      }

      setUploading(true);

      try {
        // Create form data
        const formData = new FormData();
        formData.append('file', file);

        // Upload to API
        const response = await fetch('/api/upload/onboarding', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        setUploadedFile(data.url);
        onUpload(data.url);
        toast.success('File uploaded successfully');
      } catch (error) {
        console.error('Upload error:', error);
        setError('Failed to upload file. Please try again.');
        toast.error('Failed to upload file. Please try again.');
      } finally {
        setUploading(false);
      }
    },
    [maxSize, onUpload]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: accept.split(',').reduce((acc, type) => {
      acc[type.trim()] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles: 1,
    maxSize,
  });

  const removeFile = () => {
    setUploadedFile(null);
    setError(null);
    onUpload('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}

      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            {
              'border-blue-400 bg-blue-50': isDragActive && !isDragReject,
              'border-red-400 bg-red-50': isDragReject,
              'border-gray-300 hover:border-gray-400 bg-gray-50': !isDragActive && !isDragReject,
            }
          )}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload className="w-12 h-12 text-gray-400" />
              {isDragActive ? (
                <p className="text-sm text-blue-600 font-medium">
                  Drop file here...
                </p>
              ) : (
                <>
                  <p className="text-sm text-gray-600">
                    Drag & drop a file here, or click to select
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, or PNG (Max {(maxSize / (1024 * 1024)).toFixed(0)}MB)
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="border border-green-200 rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">File uploaded</p>
                <a
                  href={uploadedFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-700 hover:underline"
                >
                  View file
                </a>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-red-600 hover:text-red-700 hover:bg-red-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

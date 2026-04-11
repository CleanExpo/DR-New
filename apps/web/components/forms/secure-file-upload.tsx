'use client';
/**
 * Secure File Upload Component
 *
 * File upload with security scanning:
 * - MIME type validation
 * - File size limits
 * - Malware scanning
 * - Progress tracking
 *
 * Usage:
 * ```tsx
 * <SecureFileUpload
 *   onFilesUploaded={(files) => console.log('Uploaded:', files)}
 *   accept="image/*, application/pdf"
 *   multiple={true}
 * />
 * ```
 */

'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Upload, AlertCircle, CheckCircle, X, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface UploadedFile {
  filename: string;
  size: number;
  mimeType: string;
  safe: boolean;
  scanned: boolean;
  scanTime: number;
}

interface SecureFileUploadProps {
  onFilesUploaded?: (files: UploadedFile[]) => void;
  onFilesBlocked?: (files: Array<{ filename: string; reason: string }>) => void;
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number; // in bytes
  className?: string;
}

export function SecureFileUpload({
  onFilesUploaded,
  onFilesBlocked,
  accept,
  multiple = true,
  maxFileSize,
  className = '',
}: SecureFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [blockedFiles, setBlockedFiles] = useState<Array<{ filename: string; reason: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<any>(null);

  // Load upload configuration
  React.useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/api/security/upload');
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        }
      } catch (err) {
        console.error('Failed to load upload config:', err);
      }
    };

    loadConfig();
  }, []);

  const handleFiles = useCallback(
    async (files: File[]) => {
      setError(null);
      setUploading(true);
      setProgress(0);

      try {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append('files', file);
        });

        // Upload with progress tracking
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setProgress(Math.round(percentComplete));
          }
        });

        // Use fetch with manual progress if XHR not available
        const response = await fetch('/api/security/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const result = await response.json();

        // Handle results
        if (result.files && result.files.length > 0) {
          setUploadedFiles(result.files);
          onFilesUploaded?.(result.files);
        }

        if (result.blockedFiles && result.blockedFiles.length > 0) {
          setBlockedFiles(result.blockedFiles);
          onFilesBlocked?.(result.blockedFiles);
        }

        setProgress(100);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Upload failed';
        setError(message);
      } finally {
        setUploading(false);
      }
    },
    [onFilesUploaded, onFilesBlocked]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === 'dragenter' || event.type === 'dragover') {
      setIsDragActive(true);
    } else if (event.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleClear = () => {
    setUploadedFiles([]);
    setBlockedFiles([]);
    setProgress(0);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* File Input Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={handleInputChange}
          accept={accept}
          multiple={multiple}
          disabled={uploading}
          className="hidden"
        />

        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p className="text-sm font-medium text-gray-900">
          {uploading ? 'Uploading and scanning...' : 'Drag files here or click to select'}
        </p>

        {config && (
          <p className="text-xs text-gray-400 mt-2">
            Max {config.maxSizeMB}MB per file • Formats: {config.allowedMimeTypes.join(', ')}
          </p>
        )}

        {config?.virusScanningEnabled && (
          <p className="text-xs text-blue-600 mt-2">
            ✓ Files will be scanned for malware
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="mt-4"
        >
          {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {uploading ? 'Uploading' : 'Select Files'}
        </Button>
      </div>

      {/* Progress Bar */}
      {uploading && progress > 0 && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-400 text-center">{progress}%</p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Uploaded ({uploadedFiles.length})</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>

          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded"
              >
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.filename}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatBytes(file.size)} • Scanned in {file.scanTime}ms
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blocked Files */}
      {blockedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-red-900">Blocked ({blockedFiles.length})</h3>

          <div className="space-y-2">
            {blockedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded"
              >
                <X className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.filename}
                  </p>
                  <p className="text-xs text-red-600">{file.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

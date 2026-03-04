'use client';

import { use, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  Upload,
  FileText,
  Image,
  File,
  Download,
  Eye,
  Trash2,
  Search,
  FolderOpen,
  Clock,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  category: string;
  uploadedAt: string;
  url: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const DOCUMENT_CATEGORIES = [
  'Insurance',
  'Inspection Report',
  'Invoice',
  'Quote',
  'Contract',
  'Photo',
  'Certificate',
  'Other',
];

export default function DocumentsPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<PropertyDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDoc, setPreviewDoc] = useState<PropertyDocument | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res = await fetch(`/api/client/properties/${id}/documents`);
        if (res.ok) {
          const data = await res.json();
          setDocuments(data.documents || []);
        }
      } catch (err) {
        console.error('Failed to fetch documents:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();

    if (process.env.NODE_ENV === 'development') {
      setDocuments([
        {
          id: 'doc-1',
          name: 'Home Insurance Policy 2025.pdf',
          type: 'application/pdf',
          size: 2450000,
          category: 'Insurance',
          uploadedAt: '2025-01-15T10:00:00Z',
          url: '#',
        },
        {
          id: 'doc-2',
          name: 'Pre-purchase Inspection Report.pdf',
          type: 'application/pdf',
          size: 8900000,
          category: 'Inspection Report',
          uploadedAt: '2024-12-01T14:30:00Z',
          url: '#',
        },
        {
          id: 'doc-3',
          name: 'Water Damage Assessment.jpg',
          type: 'image/jpeg',
          size: 3200000,
          category: 'Photo',
          uploadedAt: '2025-02-20T09:15:00Z',
          url: '#',
        },
        {
          id: 'doc-4',
          name: 'Plumbing Invoice - Metro Plumbing.pdf',
          type: 'application/pdf',
          size: 450000,
          category: 'Invoice',
          uploadedAt: '2025-02-28T16:00:00Z',
          url: '#',
        },
        {
          id: 'doc-5',
          name: 'Mould Remediation Quote.pdf',
          type: 'application/pdf',
          size: 680000,
          category: 'Quote',
          uploadedAt: '2025-03-01T11:30:00Z',
          url: '#',
        },
      ]);
      setLoading(false);
    }
  }, [id]);

  const filtered = documents.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.includes('pdf')) return FileText;
    return File;
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('propertyId', id);

        const res = await fetch(`/api/client/properties/${id}/documents`, {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setDocuments((prev) => [data.document, ...prev]);
        }
      }
    } catch (err) {
      console.error('Failed to upload documents:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    try {
      const res = await fetch(`/api/client/properties/${id}/documents/${docId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDocuments((prev) => prev.filter((d) => d.id !== docId));
        if (previewDoc?.id === docId) setPreviewDoc(null);
      }
    } catch (err) {
      console.error('Failed to delete document:', err);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleUpload(e.dataTransfer.files);
  };

  const categoryCounts = documents.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Navigation */}
        <Button
          variant="ghost"
          onClick={() => router.push(`/dashboard/property/${id}`)}
          className="text-white/50 hover:text-white mb-6 -ml-2 rounded-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Property Details
        </Button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Documents</h1>
            <p className="text-sm text-white/50 mt-1">
              {documents.length} {documents.length === 1 ? 'document' : 'documents'} stored
            </p>
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
            disabled={uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload Files'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
          />
        </div>

        {/* Upload Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            'border-2 border-dashed rounded-sm p-8 mb-6 text-center transition-colors',
            dragActive
              ? 'border-teal-500 bg-teal-500/5'
              : 'border-white/[0.06] hover:border-white/[0.12]'
          )}
        >
          <Upload className={cn('h-8 w-8 mx-auto mb-3', dragActive ? 'text-teal-400' : 'text-white/20')} />
          <p className="text-sm text-white/40">
            Drag and drop files here, or{' '}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-teal-400 hover:text-teal-300 underline"
            >
              browse
            </button>
          </p>
          <p className="text-xs text-white/20 mt-1">
            PDF, JPG, PNG, DOC, XLS up to 25MB
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/[0.06] text-white placeholder:text-white/30 rounded-sm"
          />
        </div>

        {/* Category Summary */}
        {Object.keys(categoryCounts).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <Badge
                key={cat}
                variant="outline"
                className="border-white/[0.06] text-white/40 rounded-sm text-xs cursor-pointer hover:border-white/[0.12]"
                onClick={() => setSearchQuery(cat)}
              >
                {cat} ({count})
              </Badge>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <FolderOpen className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white/60 mb-2">No documents</h3>
            <p className="text-sm text-white/40">
              {searchQuery ? 'No documents match your search' : 'Upload your first document to get started'}
            </p>
          </div>
        )}

        {/* Document List */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-2">
            {filtered.map((doc) => {
              const Icon = getFileIcon(doc.type);
              return (
                <Card
                  key={doc.id}
                  className="bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] transition-colors rounded-sm"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-sm bg-white/5 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-white/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge className="bg-white/5 text-white/40 border-0 rounded-sm text-[10px]">
                            {doc.category}
                          </Badge>
                          <span className="text-xs text-white/30">{formatFileSize(doc.size)}</span>
                          <span className="text-white/10">&middot;</span>
                          <span className="text-xs text-white/30 flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" />
                            {new Date(doc.uploadedAt).toLocaleDateString('en-AU')}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-white/30 hover:text-white rounded-sm"
                          onClick={() => setPreviewDoc(doc)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-white/30 hover:text-white rounded-sm"
                          onClick={() => window.open(doc.url, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-white/30 hover:text-red-400 rounded-sm"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        <DialogContent className="bg-[#0a0a0a] border-white/[0.06] text-white rounded-sm max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white truncate pr-8">{previewDoc?.name}</DialogTitle>
          </DialogHeader>
          {previewDoc && (
            <div className="mt-4 space-y-4">
              <div className="bg-white/[0.03] rounded-sm p-8 flex items-center justify-center min-h-[200px]">
                {previewDoc.type.startsWith('image/') ? (
                  <div className="text-center">
                    <Image className="h-16 w-16 text-white/20 mx-auto mb-2" />
                    <p className="text-xs text-white/40">Image preview</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-white/20 mx-auto mb-2" />
                    <p className="text-xs text-white/40">Document preview not available</p>
                  </div>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Category</span>
                  <span className="text-white/80">{previewDoc.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Size</span>
                  <span className="text-white/80">{formatFileSize(previewDoc.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Uploaded</span>
                  <span className="text-white/80">
                    {new Date(previewDoc.uploadedAt).toLocaleDateString('en-AU')}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => window.open(previewDoc.url, '_blank')}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download File
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

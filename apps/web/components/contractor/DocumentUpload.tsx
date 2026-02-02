'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Trash2,
  AlertCircle,
  Calendar,
  FileCheck,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface Document {
  id: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  status: string;
  uploadedAt: string;
  expiryDate?: string;
  documentNumber?: string;
  rejectionReason?: string;
}

interface DocumentUploadProps {
  onDocumentUploaded?: () => void;
}

// Document type options
const DOCUMENT_TYPES = [
  { value: 'BUSINESS_LICENSE', label: 'Business License' },
  { value: 'IICRC_CERTIFICATE', label: 'IICRC Certificate' },
  { value: 'PUBLIC_LIABILITY_INSURANCE', label: 'Public Liability Insurance' },
  { value: 'WORKERS_COMPENSATION', label: 'Workers Compensation' },
  { value: 'PROFESSIONAL_INDEMNITY', label: 'Professional Indemnity' },
  { value: 'ABN_REGISTRATION', label: 'ABN Registration' },
  { value: 'POLICE_CHECK', label: 'Police Check' },
  { value: 'TRADE_LICENSE', label: 'Trade License' },
  { value: 'COMPANY_LOGO', label: 'Company Logo' },
  { value: 'INSURANCE_CLAIM_EXAMPLE', label: 'Insurance Claim Example' },
  { value: 'OTHER', label: 'Other Document' },
];

// Australian states
const AUSTRALIAN_STATES = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' },
];

// Status badge component
function DocumentStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { className: string; icon: any; label: string }> = {
    PENDING: { className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: Clock, label: 'Pending Review' },
    UNDER_REVIEW: { className: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: Eye, label: 'Under Review' },
    APPROVED: { className: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle, label: 'Approved' },
    REJECTED: { className: 'bg-red-500/10 text-red-500 border-red-500/20', icon: XCircle, label: 'Rejected' },
    EXPIRED: { className: 'bg-orange-500/10 text-orange-500 border-orange-500/20', icon: AlertCircle, label: 'Expired' },
    REQUIRES_RENEWAL: { className: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: Calendar, label: 'Needs Renewal' },
  };

  const config = statusConfig[status] || statusConfig.PENDING;
  const Icon = config.icon;

  return (
    <Badge className={`gap-1.5 ${config.className} border`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

export default function DocumentUpload({ onDocumentUploaded }: DocumentUploadProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    documentType: '',
    documentNumber: '',
    issuingAuthority: '',
    stateIssued: '',
    issuedDate: '',
    expiryDate: '',
  });

  // Fetch documents on mount
  useState(() => {
    fetchDocuments();
  });

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contractor/verification/documents');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data.documents || []);
      } else {
        toast.error('Failed to load documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only PDF, JPG, and PNG files are allowed');
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !formData.documentType) {
      toast.error('Please select a file and document type');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: Upload file to storage (30% progress)
      const uploadFormData = new FormData();
      uploadFormData.append('file', selectedFile);
      uploadFormData.append('bucket', 'documents');

      setUploadProgress(10);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        throw new Error('File upload failed');
      }

      const uploadData = await uploadResponse.json();
      setUploadProgress(50);

      // Step 2: Create document record (70% progress)
      const documentResponse = await fetch('/api/contractor/verification/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentType: formData.documentType,
          fileName: selectedFile.name,
          fileUrl: uploadData.url,
          fileSize: selectedFile.size,
          mimeType: selectedFile.type,
          documentNumber: formData.documentNumber || null,
          issuingAuthority: formData.issuingAuthority || null,
          stateIssued: formData.stateIssued || null,
          issuedDate: formData.issuedDate || null,
          expiryDate: formData.expiryDate || null,
        }),
      });

      setUploadProgress(90);

      if (!documentResponse.ok) {
        throw new Error('Failed to save document record');
      }

      setUploadProgress(100);

      // Success!
      toast.success('Document uploaded successfully!', {
        description: 'Your document is pending review by our admin team.'
      });

      // Reset form
      setSelectedFile(null);
      setFormData({
        documentType: '',
        documentNumber: '',
        issuingAuthority: '',
        stateIssued: '',
        issuedDate: '',
        expiryDate: '',
      });

      // Refresh documents list
      await fetchDocuments();

      // Notify parent component
      if (onDocumentUploaded) {
        onDocumentUploaded();
      }

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document', {
        description: 'Please try again or contact support if the problem persists.'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      const response = await fetch(`/api/contractor/verification/documents?id=${documentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Document deleted successfully');
        await fetchDocuments();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete document');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete document');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Upload className="h-5 w-5 text-[#00BFA6]" />
            Upload New Document
          </CardTitle>
          <CardDescription className="text-gray-400">
            Upload licenses, certificates, and insurance documents for verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="documentType" className="text-gray-300">
                Document Type *
              </Label>
              <Select
                value={formData.documentType}
                onValueChange={(value) => setFormData({ ...formData, documentType: value })}
              >
                <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="text-white">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="file" className="text-gray-300">
                Select File *
              </Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="mt-1 bg-gray-700 border-gray-600 text-white"
              />
              {selectedFile && (
                <p className="text-sm text-gray-400 mt-1">
                  {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </p>
              )}
            </div>
          </div>

          {/* Optional Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="documentNumber" className="text-gray-300">
                Document/License Number
              </Label>
              <Input
                id="documentNumber"
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                placeholder="e.g., LIC-123456"
                className="mt-1 bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="issuingAuthority" className="text-gray-300">
                Issuing Authority
              </Label>
              <Input
                id="issuingAuthority"
                value={formData.issuingAuthority}
                onChange={(e) => setFormData({ ...formData, issuingAuthority: e.target.value })}
                placeholder="e.g., NSW Fair Trading"
                className="mt-1 bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="stateIssued" className="text-gray-300">
                State Issued
              </Label>
              <Select
                value={formData.stateIssued}
                onValueChange={(value) => setFormData({ ...formData, stateIssued: value })}
              >
                <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {AUSTRALIAN_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value} className="text-white">
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="issuedDate" className="text-gray-300">
                Issue Date
              </Label>
              <Input
                id="issuedDate"
                type="date"
                value={formData.issuedDate}
                onChange={(e) => setFormData({ ...formData, issuedDate: e.target.value })}
                className="mt-1 bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="expiryDate" className="text-gray-300">
                Expiry Date
              </Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="mt-1 bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-gray-400 text-center">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || !formData.documentType || uploading}
            className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-white"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-[#00BFA6]" />
            Uploaded Documents
          </CardTitle>
          <CardDescription className="text-gray-400">
            {documents.length} document{documents.length !== 1 ? 's' : ''} uploaded
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-600" />
              <p className="text-lg">No documents uploaded yet</p>
              <p className="text-sm mt-2">Upload your first document to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 bg-gray-600 rounded">
                      <FileText className="h-6 w-6 text-gray-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-white truncate">{doc.fileName}</p>
                        <DocumentStatusBadge status={doc.status} />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{DOCUMENT_TYPES.find(t => t.value === doc.documentType)?.label}</span>
                        <span>•</span>
                        <span>{formatFileSize(doc.fileSize)}</span>
                        <span>•</span>
                        <span>Uploaded {formatDate(doc.uploadedAt)}</span>
                        {doc.expiryDate && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Expires {formatDate(doc.expiryDate)}
                            </span>
                          </>
                        )}
                      </div>
                      {doc.rejectionReason && (
                        <p className="text-sm text-red-400 mt-1">
                          <AlertCircle className="h-3 w-3 inline mr-1" />
                          {doc.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(doc.fileUrl, '_blank')}
                      className="text-gray-300 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {['PENDING', 'REJECTED'].includes(doc.status) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

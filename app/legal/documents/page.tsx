'use client';

import { useState } from 'react';
import { FileText, Download, Shield, Building, Users, Briefcase, AlertTriangle, Scale, Award, Search, Filter } from 'lucide-react';

export default function LegalDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const documents = [
    // Contractor Agreements
    {
      id: 'contractor-agreement',
      title: 'Master Contractor Services Agreement',
      category: 'Contractor Agreements',
      description: 'Comprehensive agreement for restoration contractors joining the NRP network',
      icon: Briefcase,
      version: '3.0',
      lastUpdated: '2024-03-15',
      downloads: 1847,
      format: 'PDF',
      size: '2.4 MB',
      australian: true,
      featured: true
    },
    {
      id: 'subcontractor-agreement',
      title: 'Subcontractor Agreement Template',
      category: 'Contractor Agreements',
      description: 'Agreement for engaging subcontractors under Australian Building Code',
      icon: Users,
      version: '2.5',
      lastUpdated: '2024-03-10',
      downloads: 923,
      format: 'PDF',
      size: '1.8 MB',
      australian: true
    },
    
    // Insurance Documents
    {
      id: 'insurance-assignment',
      title: 'Insurance Claim Assignment Form',
      category: 'Insurance Documents',
      description: 'Authorization for direct insurance billing under Australian insurance law',
      icon: Shield,
      version: '2.0',
      lastUpdated: '2024-03-12',
      downloads: 2156,
      format: 'PDF',
      size: '856 KB',
      australian: true,
      featured: true
    },
    {
      id: 'scope-of-works',
      title: 'Scope of Works Template',
      category: 'Insurance Documents',
      description: 'Detailed scope documentation for insurance claims',
      icon: FileText,
      version: '4.1',
      lastUpdated: '2024-03-08',
      downloads: 1623,
      format: 'DOCX',
      size: '445 KB',
      australian: true
    },
    
    // Client Agreements
    {
      id: 'restoration-services',
      title: 'Restoration Services Agreement',
      category: 'Client Agreements',
      description: 'Client agreement compliant with Australian Consumer Law (ACL)',
      icon: Building,
      version: '3.2',
      lastUpdated: '2024-03-14',
      downloads: 3421,
      format: 'PDF',
      size: '1.2 MB',
      australian: true,
      featured: true
    },
    {
      id: 'emergency-authorization',
      title: 'Emergency Works Authorization',
      category: 'Client Agreements',
      description: 'Immediate authorization for emergency restoration works',
      icon: AlertTriangle,
      version: '2.1',
      lastUpdated: '2024-03-05',
      downloads: 2893,
      format: 'PDF',
      size: '623 KB',
      australian: true
    },
    
    // Compliance & Safety
    {
      id: 'worksafe-compliance',
      title: 'WorkSafe Compliance Checklist',
      category: 'Compliance & Safety',
      description: 'Victorian WorkSafe compliance requirements for restoration sites',
      icon: AlertTriangle,
      version: '5.0',
      lastUpdated: '2024-03-15',
      downloads: 4567,
      format: 'PDF',
      size: '1.5 MB',
      australian: true,
      required: true
    },
    {
      id: 'asbestos-notification',
      title: 'Asbestos Notification Template',
      category: 'Compliance & Safety',
      description: 'Required notification under Australian asbestos regulations',
      icon: AlertTriangle,
      version: '3.3',
      lastUpdated: '2024-03-11',
      downloads: 1234,
      format: 'PDF',
      size: '789 KB',
      australian: true,
      required: true
    },
    
    // Terms & Policies
    {
      id: 'privacy-policy',
      title: 'Privacy Policy (APP Compliant)',
      category: 'Terms & Policies',
      description: 'Privacy policy compliant with Australian Privacy Principles',
      icon: Shield,
      version: '2.0',
      lastUpdated: '2024-03-13',
      downloads: 987,
      format: 'PDF',
      size: '534 KB',
      australian: true
    },
    {
      id: 'terms-of-service',
      title: 'Platform Terms of Service',
      category: 'Terms & Policies',
      description: 'NRP platform terms under Australian law',
      icon: Scale,
      version: '3.1',
      lastUpdated: '2024-03-09',
      downloads: 1456,
      format: 'PDF',
      size: '892 KB',
      australian: true
    },
    
    // Quality & Standards
    {
      id: 'quality-assurance',
      title: 'Quality Assurance Manual',
      category: 'Quality & Standards',
      description: 'IICRC and Australian standards compliance manual',
      icon: Award,
      version: '4.0',
      lastUpdated: '2024-03-07',
      downloads: 678,
      format: 'PDF',
      size: '3.2 MB',
      australian: true
    },
    {
      id: 'completion-certificate',
      title: 'Works Completion Certificate',
      category: 'Quality & Standards',
      description: 'Certificate of completion meeting Australian building standards',
      icon: Award,
      version: '2.2',
      lastUpdated: '2024-03-06',
      downloads: 2345,
      format: 'PDF',
      size: '412 KB',
      australian: true
    }
  ];

  const categories = [...new Set(documents.map(doc => doc.category))];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (docId: string, title: string) => {
    // In production, this would generate/download the actual PDF with NRP branding
    console.log(`Downloading ${title} with NRP branding...`);
    // For now, we'll show an alert
    alert(`Downloading ${title}\\n\\nThis document includes:\\n• NRP logo and branding\\n• Australian legal compliance\\n• Latest version with all updates\\n• Digital signature fields`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Legal Document Library</h1>
          <p className="text-gray-700">Australian-compliant legal templates with NRP branding</p>
        </div>

        {/* Alert Banner */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Australian Legal Compliance</h2>
              <p className="mb-3">All documents are prepared by Australian legal professionals and comply with:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <span className="flex items-centre gap-2">✓ Australian Consumer Law (ACL)</span>
                <span className="flex items-centre gap-2">✓ Privacy Act 1988</span>
                <span className="flex items-centre gap-2">✓ Work Health & Safety Act</span>
                <span className="flex items-centre gap-2">✓ Building Code of Australia</span>
                <span className="flex items-centre gap-2">✓ ASIC Regulations</span>
                <span className="flex items-centre gap-2">✓ State-specific requirements</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors flex items-centre gap-2">
                <Filter className="w-4 h-4" />
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-transparent border-0 outline-none"
                >
                  <option value="all" className="text-gray-900">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="text-gray-900">{cat}</option>
                  ))}
                </select>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Documents */}
        {filteredDocuments.some(doc => doc.featured) && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Featured Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredDocuments.filter(doc => doc.featured).map(doc => (
                <div key={doc.id} className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <doc.icon className="w-8 h-8 text-white" />
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                      Featured
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{doc.title}</h3>
                  <p className="text-white/90 text-sm mb-4">{doc.description}</p>
                  <button
                    onClick={() => handleDownload(doc.id, doc.title)}
                    className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-centre justify-centre gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.filter(doc => !doc.featured).map(doc => (
            <div key={doc.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <doc.icon className="w-8 h-8 text-blue-600" />
                <div className="flex gap-1">
                  {doc.australian && (
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full" title="Australian Compliant">
                      AU
                    </span>
                  )}
                  {doc.required && (
                    <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                      Required
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{doc.title}</h3>
              <p className="text-gray-700 text-sm mb-4">{doc.description}</p>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="text-white">{doc.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="text-white">{doc.format}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="text-white">{doc.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Downloads:</span>
                  <span className="text-white">{doc.downloads.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => handleDownload(doc.id, doc.title)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-centre justify-centre gap-2"
              >
                <Download className="w-4 h-4" />
                Download with NRP Branding
              </button>
            </div>
          ))}
        </div>

        {/* NRP Branding Note */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Building className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">NRP Branded Documents</h3>
              <p className="text-gray-700 mb-3">
                All documents are professionally branded with the National Restoration Platform logo and corporate identity. 
                Each template includes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                <span className="flex items-centre gap-2">• NRP logo and contact information</span>
                <span className="flex items-centre gap-2">• Professional formatting and layout</span>
                <span className="flex items-centre gap-2">• Digital signature fields where required</span>
                <span className="flex items-centre gap-2">• Version control and update tracking</span>
                <span className="flex items-centre gap-2">• Australian legal jurisdiction clauses</span>
                <span className="flex items-centre gap-2">• Automatic date and reference numbering</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
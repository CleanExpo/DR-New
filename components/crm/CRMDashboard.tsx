'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Plus,
  BarChart3,
  Target,
  Zap,
  Bot
} from 'lucide-react';
import AutomationDashboard from '@/components/automation/AutomationDashboard';
import { getAirtableClient, Lead, MarketingCampaign } from '@/lib/airtable/airtable-client';

interface CRMDashboardProps {
  className?: string;
}

interface DashboardStats {
  totalLeads: number;
  emergencyLeads: number;
  conversionRate: number;
  averageValue: number;
  responseTime: number;
  activeCampaigns: number;
}

const CRMDashboard: React.FC<CRMDashboardProps> = ({ className = '' }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    emergencyLeads: 0,
    conversionRate: 0,
    averageValue: 0,
    responseTime: 0,
    activeCampaigns: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'leads' | 'campaigns' | 'analytics' | 'automation'>('overview');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const airtableClient = getAirtableClient();

      const [leadsData, campaignsData] = await Promise.all([
        airtableClient.getLeads(),
        airtableClient.getCampaigns()
      ]);

      setLeads(leadsData);
      setCampaigns(campaignsData);

      // Calculate stats
      const totalLeads = leadsData.length;
      const emergencyLeads = leadsData.filter(lead => lead.urgency === 'emergency').length;
      const convertedLeads = leadsData.filter(lead => lead.status === 'converted').length;
      const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
      const averageValue = leadsData.reduce((sum, lead) => sum + (lead.estimated_value || 0), 0) / totalLeads;
      const activeCampaigns = campaignsData.filter(campaign => campaign.status === 'active').length;

      setStats({
        totalLeads,
        emergencyLeads,
        conversionRate: Math.round(conversionRate * 100) / 100,
        averageValue: Math.round(averageValue),
        responseTime: 45, // Static for demo
        activeCampaigns
      });

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'urgent': return 'text-orange-600 bg-orange-100';
      case 'standard': return 'text-blue-600 bg-blue-100';
      case 'quote_request': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-600 bg-blue-100';
      case 'contacted': return 'text-yellow-600 bg-yellow-100';
      case 'qualified': return 'text-purple-600 bg-purple-100';
      case 'converted': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'leads', name: 'Leads', icon: Users },
    { id: 'campaigns', name: 'Campaigns', icon: Target },
    { id: 'automation', name: 'Automation', icon: Bot },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp }
  ];

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-8 ${className}`}>
        <div className="flex items-centre justify-centre">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading CRM data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-t-lg">
        <div className="flex items-centre justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">CRM Dashboard</h2>
            <p className="opacity-90">Manage leads, campaigns, and analytics from your Airtable CRM</p>
          </div>
          <div className="flex items-centre gap-3">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-centre gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors flex items-centre gap-2">
              <Plus className="h-4 w-4" />
              New Lead
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`py-4 px-2 border-b-2 font-medium text-sm flex items-centre gap-2 transition-colors ${
                selectedTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-centre justify-between">
                  <Users className="h-6 w-6 text-blue-600" />
                  <span className="text-xs text-blue-600 font-medium">TOTAL</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-blue-900">{stats.totalLeads}</div>
                  <div className="text-sm text-blue-700">Total Leads</div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-centre justify-between">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <span className="text-xs text-red-600 font-medium">URGENT</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-red-900">{stats.emergencyLeads}</div>
                  <div className="text-sm text-red-700">Emergency Leads</div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-centre justify-between">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">RATE</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-green-900">{stats.conversionRate}%</div>
                  <div className="text-sm text-green-700">Conversion Rate</div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-centre justify-between">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                  <span className="text-xs text-purple-600 font-medium">VALUE</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-purple-900">${stats.averageValue}</div>
                  <div className="text-sm text-purple-700">Avg Lead Value</div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-centre justify-between">
                  <Clock className="h-6 w-6 text-orange-600" />
                  <span className="text-xs text-orange-600 font-medium">TIME</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-orange-900">{stats.responseTime}m</div>
                  <div className="text-sm text-orange-700">Avg Response</div>
                </div>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="flex items-centre justify-between">
                  <Zap className="h-6 w-6 text-teal-600" />
                  <span className="text-xs text-teal-600 font-medium">ACTIVE</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-teal-900">{stats.activeCampaigns}</div>
                  <div className="text-sm text-teal-700">Active Campaigns</div>
                </div>
              </div>
            </div>

            {/* Recent Emergency Leads */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-centre gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-red-900">Recent Emergency Leads</h3>
              </div>
              <div className="space-y-3">
                {leads
                  .filter(lead => lead.urgency === 'emergency')
                  .slice(0, 3)
                  .map((lead) => (
                    <div key={lead.id} className="bg-white p-4 rounded-lg border border-red-200">
                      <div className="flex items-centre justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-600">{lead.emergency_type.replace('_', ' ')} - {lead.suburb}</div>
                        </div>
                        <div className="text-right">
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(lead.urgency)}`}>
                            {lead.urgency}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {selectedTab === 'leads' && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-centre gap-2">
                  <Filter className="h-4 w-4" />
                  More Filters
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lead
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Emergency Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Urgency
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-centre">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                              <div className="text-sm text-gray-500 flex items-centre gap-1">
                                <Mail className="h-3 w-3" />
                                {lead.email}
                              </div>
                              {lead.phone && (
                                <div className="text-sm text-gray-500 flex items-centre gap-1">
                                  <Phone className="h-3 w-3" />
                                  {lead.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900 capitalize">
                            {lead.emergency_type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-centre gap-1">
                            <MapPin className="h-3 w-3" />
                            {lead.suburb}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(lead.urgency)}`}>
                            {lead.urgency}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.estimated_value ? `$${lead.estimated_value.toLocaleString()}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-centre gap-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {selectedTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex items-centre justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Marketing Campaigns</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-centre gap-2">
                <Plus className="h-4 w-4" />
                New Campaign
              </button>
            </div>

            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-centre justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">
                        {campaign.platform} • {campaign.type.replace('_', ' ')}
                      </p>
                    </div>
                    <div className="flex items-centre gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                        campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {campaign.status}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-3 mb-4">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {campaign.content}
                    </p>
                  </div>

                  <div className="flex items-centre justify-between text-sm text-gray-600">
                    <div>Target: {campaign.target_audience}</div>
                    <div className="flex items-centre gap-4">
                      {campaign.budget && <span>Budget: ${campaign.budget}</span>}
                      <span>Created: {new Date(campaign.start_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Automation Tab */}
        {selectedTab === 'automation' && (
          <div>
            <AutomationDashboard />
          </div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Analytics & Reporting</h3>

            <div className="bg-gray-50 rounded-lg p-8 text-centre">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics Coming Soon</h4>
              <p className="text-gray-600">
                Detailed analytics, conversion tracking, and performance metrics will be available here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRMDashboard;
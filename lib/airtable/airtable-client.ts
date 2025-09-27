// Airtable CRM Integration Client
import { SOCIAL_CONTENT_TEMPLATES } from '@/lib/constants';

export interface AirtableConfig {
  baseId: string;
  apiKey: string;
  tables: {
    leads: string;
    campaigns: string;
    contacts: string;
    projects: string;
    marketing: string;
  };
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  property_type: 'residential' | 'commercial' | 'industrial';
  emergency_type: 'water_damage' | 'fire_damage' | 'mould' | 'storm_damage' | 'sewage' | 'biohazard' | 'other';
  urgency: 'emergency' | 'urgent' | 'standard' | 'quote_request';
  location: string;
  suburb: string;
  description: string;
  source: 'website' | 'social_media' | 'referral' | 'google' | 'phone';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  created_at: string;
  assigned_contractor?: string;
  estimated_value?: number;
  insurance_company?: string;
  claim_number?: string;
}

export interface MarketingCampaign {
  id?: string;
  name: string;
  type: 'emergency_response' | 'before_after' | 'prevention_tips' | 'seasonal' | 'custom';
  platform: 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'google' | 'email';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  content: string;
  target_audience: string;
  budget?: number;
  start_date: string;
  end_date?: string;
  performance_metrics?: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost_per_lead: number;
  };
}

export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  type: 'lead' | 'customer' | 'contractor' | 'insurance_adjuster' | 'supplier';
  tags: string[];
  last_contact: string;
  lifetime_value?: number;
}

export class AirtableClient {
  private config: AirtableConfig;
  private baseUrl: string;

  constructor(config: AirtableConfig) {
    this.config = config;
    this.baseUrl = `https://api.airtable.com/v0/${config.baseId}`;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Airtable request failed:', error);
      throw error;
    }
  }

  // Lead Management
  async createLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
    const leadData = {
      fields: {
        Name: lead.name,
        Email: lead.email,
        Phone: lead.phone || '',
        'Property Type': lead.property_type,
        'Emergency Type': lead.emergency_type,
        Urgency: lead.urgency,
        Location: lead.location,
        Suburb: lead.suburb,
        Description: lead.description,
        Source: lead.source,
        Status: lead.status,
        'Created At': new Date().toISOString(),
        'Assigned Contractor': lead.assigned_contractor || '',
        'Estimated Value': lead.estimated_value || 0,
        'Insurance Company': lead.insurance_company || '',
        'Claim Number': lead.claim_number || '',
      },
    };

    const response = await this.makeRequest(`/${this.config.tables.leads}`, {
      method: 'POST',
      body: JSON.stringify(leadData),
    });

    return this.formatLeadFromAirtable(response);
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    const updateData = {
      fields: this.formatLeadForAirtable(updates),
    };

    const response = await this.makeRequest(`/${this.config.tables.leads}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });

    return this.formatLeadFromAirtable(response);
  }

  async getLeads(filterFormula?: string): Promise<Lead[]> {
    let url = `/${this.config.tables.leads}`;
    if (filterFormula) {
      url += `?filterByFormula=${encodeURIComponent(filterFormula)}`;
    }

    const response = await this.makeRequest(url);
    return response.records.map((record: any) => this.formatLeadFromAirtable(record));
  }

  async getLeadById(id: string): Promise<Lead> {
    const response = await this.makeRequest(`/${this.config.tables.leads}/${id}`);
    return this.formatLeadFromAirtable(response);
  }

  // Marketing Campaign Management
  async createCampaign(campaign: Omit<MarketingCampaign, 'id'>): Promise<MarketingCampaign> {
    const campaignData = {
      fields: {
        Name: campaign.name,
        Type: campaign.type,
        Platform: campaign.platform,
        Status: campaign.status,
        Content: campaign.content,
        'Target Audience': campaign.target_audience,
        Budget: campaign.budget || 0,
        'Start Date': campaign.start_date,
        'End Date': campaign.end_date || '',
      },
    };

    const response = await this.makeRequest(`/${this.config.tables.marketing}`, {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });

    return this.formatCampaignFromAirtable(response);
  }

  async updateCampaign(id: string, updates: Partial<MarketingCampaign>): Promise<MarketingCampaign> {
    const updateData = {
      fields: this.formatCampaignForAirtable(updates),
    };

    const response = await this.makeRequest(`/${this.config.tables.marketing}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });

    return this.formatCampaignFromAirtable(response);
  }

  async getCampaigns(): Promise<MarketingCampaign[]> {
    const response = await this.makeRequest(`/${this.config.tables.marketing}`);
    return response.records.map((record: any) => this.formatCampaignFromAirtable(record));
  }

  // AI Marketing Campaign Generation
  async generateMarketingCampaign(prompt: string, platform: string): Promise<MarketingCampaign> {
    // This integrates with your AI Marketing Campaign Generator
    const campaignType = this.detectCampaignType(prompt);
    const contentTemplate = this.getContentTemplate(campaignType, platform);

    const generatedContent = await this.callAIMarketingGenerator({
      prompt,
      platform,
      template: contentTemplate,
      nata_accreditation: "Professional testing protocols and industry compliance",
      air_sampling: "Air sampling, quality over quantity"
    });

    const campaign: Omit<MarketingCampaign, 'id'> = {
      name: `AI Generated - ${campaignType} - ${platform}`,
      type: campaignType,
      platform: platform as any,
      status: 'draft',
      content: generatedContent.content,
      target_audience: generatedContent.targetAudience,
      start_date: new Date().toISOString(),
    };

    return await this.createCampaign(campaign);
  }

  private detectCampaignType(prompt: string): MarketingCampaign['type'] {
    const lowercasePrompt = prompt.toLowerCase();

    if (lowercasePrompt.includes('emergency') || lowercasePrompt.includes('24/7') || lowercasePrompt.includes('urgent')) {
      return 'emergency_response';
    } else if (lowercasePrompt.includes('before') && lowercasePrompt.includes('after')) {
      return 'before_after';
    } else if (lowercasePrompt.includes('prevention') || lowercasePrompt.includes('tip') || lowercasePrompt.includes('advice')) {
      return 'prevention_tips';
    } else if (lowercasePrompt.includes('season') || lowercasePrompt.includes('weather')) {
      return 'seasonal';
    }

    return 'custom';
  }

  private getContentTemplate(type: MarketingCampaign['type'], platform: string): string {
    if (type === 'custom') return '';

    const templates = SOCIAL_CONTENT_TEMPLATES[type as keyof typeof SOCIAL_CONTENT_TEMPLATES];
    return templates[platform as keyof typeof templates] || templates.facebook;
  }

  private async callAIMarketingGenerator(params: {
    prompt: string;
    platform: string;
    template: string;
    nata_accreditation: string;
    air_sampling: string;
  }): Promise<{ content: string; targetAudience: string }> {
    // This would integrate with your AI Marketing Campaign Generator tool
    // For now, we'll use a template-based approach

    const baseContent = params.template || `Professional disaster recovery services with ${params.nata_accreditation}. ${params.air_sampling}. Emergency response available 24/7 across Brisbane.`;

    return {
      content: `${baseContent}\n\nGenerated from: ${params.prompt}`,
      targetAudience: this.determineTargetAudience(params.prompt)
    };
  }

  private determineTargetAudience(prompt: string): string {
    const lowercasePrompt = prompt.toLowerCase();

    if (lowercasePrompt.includes('home') || lowercasePrompt.includes('residential')) {
      return 'Homeowners in Brisbane and surrounding areas';
    } else if (lowercasePrompt.includes('business') || lowercasePrompt.includes('commercial')) {
      return 'Business owners and property managers';
    } else if (lowercasePrompt.includes('insurance')) {
      return 'Insurance adjusters and claim managers';
    }

    return 'Property owners requiring emergency restoration services';
  }

  // Contact Management
  async createContact(contact: Omit<Contact, 'id'>): Promise<Contact> {
    const contactData = {
      fields: {
        Name: contact.name,
        Email: contact.email,
        Phone: contact.phone || '',
        Company: contact.company || '',
        Type: contact.type,
        Tags: contact.tags.join(', '),
        'Last Contact': contact.last_contact,
        'Lifetime Value': contact.lifetime_value || 0,
      },
    };

    const response = await this.makeRequest(`/${this.config.tables.contacts}`, {
      method: 'POST',
      body: JSON.stringify(contactData),
    });

    return this.formatContactFromAirtable(response);
  }

  // Utility methods for data formatting
  private formatLeadFromAirtable(record: any): Lead {
    const fields = record.fields;
    return {
      id: record.id,
      name: fields.Name || '',
      email: fields.Email || '',
      phone: fields.Phone || '',
      property_type: fields['Property Type'] || 'residential',
      emergency_type: fields['Emergency Type'] || 'other',
      urgency: fields.Urgency || 'standard',
      location: fields.Location || '',
      suburb: fields.Suburb || '',
      description: fields.Description || '',
      source: fields.Source || 'website',
      status: fields.Status || 'new',
      created_at: fields['Created At'] || new Date().toISOString(),
      assigned_contractor: fields['Assigned Contractor'] || '',
      estimated_value: fields['Estimated Value'] || 0,
      insurance_company: fields['Insurance Company'] || '',
      claim_number: fields['Claim Number'] || '',
    };
  }

  private formatLeadForAirtable(lead: Partial<Lead>): any {
    const fields: any = {};

    if (lead.name) fields.Name = lead.name;
    if (lead.email) fields.Email = lead.email;
    if (lead.phone) fields.Phone = lead.phone;
    if (lead.property_type) fields['Property Type'] = lead.property_type;
    if (lead.emergency_type) fields['Emergency Type'] = lead.emergency_type;
    if (lead.urgency) fields.Urgency = lead.urgency;
    if (lead.location) fields.Location = lead.location;
    if (lead.suburb) fields.Suburb = lead.suburb;
    if (lead.description) fields.Description = lead.description;
    if (lead.source) fields.Source = lead.source;
    if (lead.status) fields.Status = lead.status;
    if (lead.assigned_contractor) fields['Assigned Contractor'] = lead.assigned_contractor;
    if (lead.estimated_value) fields['Estimated Value'] = lead.estimated_value;
    if (lead.insurance_company) fields['Insurance Company'] = lead.insurance_company;
    if (lead.claim_number) fields['Claim Number'] = lead.claim_number;

    return fields;
  }

  private formatCampaignFromAirtable(record: any): MarketingCampaign {
    const fields = record.fields;
    return {
      id: record.id,
      name: fields.Name || '',
      type: fields.Type || 'custom',
      platform: fields.Platform || 'facebook',
      status: fields.Status || 'draft',
      content: fields.Content || '',
      target_audience: fields['Target Audience'] || '',
      budget: fields.Budget || 0,
      start_date: fields['Start Date'] || new Date().toISOString(),
      end_date: fields['End Date'] || '',
    };
  }

  private formatCampaignForAirtable(campaign: Partial<MarketingCampaign>): any {
    const fields: any = {};

    if (campaign.name) fields.Name = campaign.name;
    if (campaign.type) fields.Type = campaign.type;
    if (campaign.platform) fields.Platform = campaign.platform;
    if (campaign.status) fields.Status = campaign.status;
    if (campaign.content) fields.Content = campaign.content;
    if (campaign.target_audience) fields['Target Audience'] = campaign.target_audience;
    if (campaign.budget) fields.Budget = campaign.budget;
    if (campaign.start_date) fields['Start Date'] = campaign.start_date;
    if (campaign.end_date) fields['End Date'] = campaign.end_date;

    return fields;
  }

  private formatContactFromAirtable(record: any): Contact {
    const fields = record.fields;
    return {
      id: record.id,
      name: fields.Name || '',
      email: fields.Email || '',
      phone: fields.Phone || '',
      company: fields.Company || '',
      type: fields.Type || 'lead',
      tags: fields.Tags ? fields.Tags.split(', ') : [],
      last_contact: fields['Last Contact'] || new Date().toISOString(),
      lifetime_value: fields['Lifetime Value'] || 0,
    };
  }
}

// Environment configuration
export const getAirtableConfig = (): AirtableConfig => {
  return {
    baseId: process.env.AIRTABLE_BASE_ID || 'appXXXXXXXXXXXXXX',
    apiKey: process.env.AIRTABLE_API_KEY || 'patXXXXXXXXXXXXXX',
    tables: {
      leads: process.env.AIRTABLE_LEADS_TABLE || 'tblLeads',
      campaigns: process.env.AIRTABLE_CAMPAIGNS_TABLE || 'tblCampaigns',
      contacts: process.env.AIRTABLE_CONTACTS_TABLE || 'tblContacts',
      projects: process.env.AIRTABLE_PROJECTS_TABLE || 'tblProjects',
      marketing: process.env.AIRTABLE_MARKETING_TABLE || 'tblMarketing',
    },
  };
};

// Singleton instance
let airtableClient: AirtableClient | null = null;

export const getAirtableClient = (): AirtableClient => {
  if (!airtableClient) {
    airtableClient = new AirtableClient(getAirtableConfig());
  }
  return airtableClient;
};
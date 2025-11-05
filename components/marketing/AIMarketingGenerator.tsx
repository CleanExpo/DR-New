'use client';

import React, { useState } from 'react';
import {
  Zap,
  Target,
  TrendingUp,
  Calendar,
  Share2,
  Wand2,
  BarChart3,
  Users,
  DollarSign,
  Lightbulb,
  Loader2,
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  Play
} from 'lucide-react';
import { getAirtableClient, MarketingCampaign } from '@/lib/airtable/airtable-client';
import { SOCIAL_CONTENT_TEMPLATES } from '@/lib/constants';

interface AIMarketingGeneratorProps {
  className?: string;
  onCampaignGenerated?: (campaign: MarketingCampaign) => void;
}

interface AIPromptData {
  businessContext: string;
  targetAudience: string;
  campaignGoal: string;
  platform: string;
  tone: string;
  callToAction: string;
  constraints: string;
}

interface GeneratedCampaign {
  content: string;
  platform: string;
  targetAudience: string;
  estimatedReach: number;
  estimatedCost: number;
  keyMessages: string[];
  hashtags: string[];
  postingSchedule: string[];
  performancePrediction: {
    engagementRate: number;
    clickThroughRate: number;
    conversionRate: number;
    estimatedLeads: number;
  };
}

const AIMarketingGenerator: React.FC<AIMarketingGeneratorProps> = ({
  className = '',
  onCampaignGenerated
}) => {
  const [promptData, setPromptData] = useState<AIPromptData>({
    businessContext: 'NATA Accreditation: Professional testing protocols and industry compliance. Air sampling, quality over quantity.',
    targetAudience: 'Homeowners and business owners in Brisbane requiring emergency disaster recovery services',
    campaignGoal: 'Generate high-quality emergency response leads',
    platform: 'facebook',
    tone: 'Professional yet urgent, trustworthy',
    callToAction: 'Contact for immediate 24/7 emergency response',
    constraints: 'Must emphasize Master Restorer certification and 60-minute response time'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState<GeneratedCampaign | null>(null);
  const [airtableSyncStatus, setAirtableSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: '📘', features: ['Detailed targeting', 'Event responses', 'Community building'] },
    { id: 'instagram', name: 'Instagram', icon: '📷', features: ['Visual content', 'Stories', 'Reels'] },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', features: ['B2B targeting', 'Professional content', 'Industry insights'] },
    { id: 'youtube', name: 'YouTube', icon: '📺', features: ['Video content', 'How-to tutorials', 'Long-form content'] },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', features: ['Short videos', 'Trending content', 'Viral potential'] },
    { id: 'google', name: 'Google Ads', icon: '🔍', features: ['Search intent', 'Local targeting', 'Emergency keywords'] }
  ];

  const campaignGoals = [
    { id: 'emergency_leads', name: 'Emergency Lead Generation', description: 'Generate immediate emergency response leads' },
    { id: 'brand_awareness', name: 'Brand Awareness', description: 'Increase recognition as Brisbane\'s leading disaster recovery experts' },
    { id: 'prevention_education', name: 'Prevention Education', description: 'Educate audience on disaster prevention and preparedness' },
    { id: 'showcase_expertise', name: 'Showcase Expertise', description: 'Demonstrate Master Restorer certification and capabilities' },
    { id: 'insurance_partnerships', name: 'Insurance Partnerships', description: 'Target insurance adjusters and property managers' }
  ];

  const toneOptions = [
    'Professional and authoritative',
    'Urgent but reassuring',
    'Educational and helpful',
    'Empathetic and supportive',
    'Direct and action-oriented'
  ];

  const handleInputChange = (field: keyof AIPromptData, value: string) => {
    setPromptData(prev => ({ ...prev, [field]: value }));
  };

  const generateCampaign = async () => {
    setIsGenerating(true);
    setGeneratedCampaign(null);

    try {
      // Simulate AI generation (in real implementation, this would call your AI service)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const campaign: GeneratedCampaign = {
        content: generateCampaignContent(),
        platform: promptData.platform,
        targetAudience: promptData.targetAudience,
        estimatedReach: calculateEstimatedReach(),
        estimatedCost: calculateEstimatedCost(),
        keyMessages: generateKeyMessages(),
        hashtags: generateHashtags(),
        postingSchedule: generatePostingSchedule(),
        performancePrediction: generatePerformancePrediction()
      };

      setGeneratedCampaign(campaign);
    } catch (error) {
      console.error('Campaign generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCampaignContent = (): string => {
    const baseTemplate = SOCIAL_CONTENT_TEMPLATES.emergency_response[promptData.platform as keyof typeof SOCIAL_CONTENT_TEMPLATES.emergency_response];

    return `${baseTemplate}

🏆 ${promptData.businessContext}

✅ Master Restorer Certified
✅ 60-Minute Response Time
✅ Direct Insurance Billing
✅ 24/7 Emergency Availability

${promptData.callToAction}

#DisasterRecovery #EmergencyResponse #Brisbane #MasterRestorer #NATA`;
  };

  const generateKeyMessages = (): string[] => {
    return [
      "Master Restorer certification - one of limited number in Queensland",
      "NATA accredited testing protocols ensure quality results",
      "60-minute emergency response time across Brisbane",
      "Direct insurance billing for approved claims",
      "Professional testing protocols and industry compliance"
    ];
  };

  const generateHashtags = (): string[] => {
    const baseHashtags = ['#DisasterRecovery', '#Brisbane', '#EmergencyResponse', '#MasterRestorer', '#NATA'];

    const platformSpecific = {
      facebook: ['#BrisbaneEmergency', '#WaterDamage', '#FireDamage'],
      instagram: ['#BeforeAndAfter', '#Restoration', '#BrisbaneBusiness'],
      linkedin: ['#PropertyManagement', '#InsurancePartners', '#ProfessionalServices'],
      youtube: ['#HowTo', '#DisasterPrevention', '#PropertyRestoration'],
      tiktok: ['#EmergencyHacks', '#PropertyTips', '#BrisbaneBiz'],
      google: ['#EmergencyRestoration', '#LocalService', '#Certified']
    };

    return [...baseHashtags, ...(platformSpecific[promptData.platform as keyof typeof platformSpecific] || [])];
  };

  const generatePostingSchedule = (): string[] => {
    return [
      'Monday 8:00 AM - Peak commute visibility',
      'Wednesday 12:00 PM - Lunch break engagement',
      'Friday 5:00 PM - Weekend planning preparation',
      'Sunday 7:00 PM - Home preparation content'
    ];
  };

  const calculateEstimatedReach = (): number => {
    const baseBrisbaneAudience = 50000;
    const platformMultipliers = {
      facebook: 1.2,
      instagram: 0.8,
      linkedin: 0.4,
      youtube: 0.6,
      tiktok: 1.5,
      google: 2.0
    };

    return Math.round(baseBrisbaneAudience * (platformMultipliers[promptData.platform as keyof typeof platformMultipliers] || 1));
  };

  const calculateEstimatedCost = (): number => {
    const baseCostPerThousand = {
      facebook: 8,
      instagram: 12,
      linkedin: 25,
      youtube: 15,
      tiktok: 10,
      google: 35
    };

    const reach = calculateEstimatedReach();
    const cpm = baseCostPerThousand[promptData.platform as keyof typeof baseCostPerThousand] || 10;

    return Math.round((reach / 1000) * cpm);
  };

  const generatePerformancePrediction = () => {
    const baseMetrics = {
      facebook: { engagement: 3.2, ctr: 1.8, conversion: 2.5 },
      instagram: { engagement: 4.1, ctr: 1.2, conversion: 1.8 },
      linkedin: { engagement: 2.8, ctr: 2.1, conversion: 4.2 },
      youtube: { engagement: 5.5, ctr: 3.2, conversion: 3.1 },
      tiktok: { engagement: 8.2, ctr: 2.8, conversion: 1.5 },
      google: { engagement: 1.5, ctr: 4.5, conversion: 8.2 }
    };

    const metrics = baseMetrics[promptData.platform as keyof typeof baseMetrics] || baseMetrics.facebook;
    const reach = calculateEstimatedReach();

    return {
      engagementRate: metrics.engagement,
      clickThroughRate: metrics.ctr,
      conversionRate: metrics.conversion,
      estimatedLeads: Math.round((reach * (metrics.ctr / 100) * (metrics.conversion / 100)))
    };
  };

  const saveToAirtable = async () => {
    if (!generatedCampaign) return;

    setAirtableSyncStatus('syncing');

    try {
      const airtableClient = getAirtableClient();

      const campaignData: Omit<MarketingCampaign, 'id'> = {
        name: `AI Generated - ${promptData.campaignGoal} - ${promptData.platform}`,
        type: 'custom',
        platform: promptData.platform as MarketingCampaign['platform'],
        status: 'draft',
        content: generatedCampaign.content,
        target_audience: generatedCampaign.targetAudience,
        budget: generatedCampaign.estimatedCost,
        start_date: new Date().toISOString(),
      };

      const savedCampaign = await airtableClient.createCampaign(campaignData);
      setAirtableSyncStatus('success');
      onCampaignGenerated?.(savedCampaign);

    } catch (error) {
      console.error('Failed to save to Airtable:', error);
      setAirtableSyncStatus('error');
    }
  };

  const copyContent = async () => {
    if (generatedCampaign) {
      await navigator.clipboard.writeText(generatedCampaign.content);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-lg">
        <div className="flex items-centre gap-3 mb-2">
          <Wand2 className="h-6 w-6" />
          <h2 className="text-2xl font-bold">AI Marketing Campaign Generator</h2>
        </div>
        <p className="opacity-90">
          Generate high-converting marketing campaigns using AI and your Airtable CRM data
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Business Context */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Context & Unique Value Proposition
          </label>
          <textarea
            value={promptData.businessContext}
            onChange={(e) => handleInputChange('businessContext', e.target.value)}
            className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your unique qualifications, certifications, and competitive advantages..."
          />
          <p className="text-xs text-gray-600 mt-1">
            This feeds directly into your AI campaign generation like your Airtable tool
          </p>
        </div>

        {/* Campaign Configuration */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Goal
            </label>
            <select
              value={promptData.campaignGoal}
              onChange={(e) => handleInputChange('campaignGoal', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {campaignGoals.map(goal => (
                <option key={goal.id} value={goal.id}>{goal.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Platform
            </label>
            <select
              value={promptData.platform}
              onChange={(e) => handleInputChange('platform', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {platforms.map(platform => (
                <option key={platform.id} value={platform.id}>
                  {platform.icon} {platform.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Audience
          </label>
          <input
            type="text"
            value={promptData.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your ideal audience..."
          />
        </div>

        {/* Advanced Options */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tone & Voice
            </label>
            <select
              value={promptData.tone}
              onChange={(e) => handleInputChange('tone', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {toneOptions.map(tone => (
                <option key={tone} value={tone}>{tone}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Call to Action
            </label>
            <input
              type="text"
              value={promptData.callToAction}
              onChange={(e) => handleInputChange('callToAction', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What action should users take?"
            />
          </div>
        </div>

        {/* Constraints */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Constraints & Requirements
          </label>
          <textarea
            value={promptData.constraints}
            onChange={(e) => handleInputChange('constraints', e.target.value)}
            className="w-full h-16 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any specific requirements, legal constraints, or brand guidelines..."
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generateCampaign}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-centre justify-centre gap-3"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating AI Campaign...
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5" />
              Generate Marketing Campaign
            </>
          )}
        </button>

        {/* Generated Campaign Results */}
        {generatedCampaign && (
          <div className="border-t pt-6 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-centre gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Generated Campaign
            </h3>

            {/* Campaign Content */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-centre justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Campaign Content</h4>
                <button
                  onClick={copyContent}
                  className="flex items-centre gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
              <div className="bg-white p-4 rounded border">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">
                  {generatedCampaign.content}
                </pre>
              </div>
            </div>

            {/* Performance Predictions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-centre">
                <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900">
                  {generatedCampaign.estimatedReach.toLocaleString()}
                </div>
                <div className="text-sm text-blue-700">Estimated Reach</div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg text-centre">
                <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-900">
                  ${generatedCampaign.estimatedCost}
                </div>
                <div className="text-sm text-green-700">Estimated Cost</div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg text-centre">
                <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-900">
                  {generatedCampaign.performancePrediction.engagementRate}%
                </div>
                <div className="text-sm text-purple-700">Engagement Rate</div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg text-centre">
                <Target className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-900">
                  {generatedCampaign.performancePrediction.estimatedLeads}
                </div>
                <div className="text-sm text-orange-700">Estimated Leads</div>
              </div>
            </div>

            {/* Key Messages & Hashtags */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Messages</h4>
                <ul className="space-y-2">
                  {generatedCampaign.keyMessages.map((message, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>{message}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recommended Hashtags</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedCampaign.hashtags.map((hashtag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Save to Airtable */}
            <div className="flex gap-4">
              <button
                onClick={saveToAirtable}
                disabled={airtableSyncStatus === 'syncing'}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-centre justify-centre gap-2"
              >
                {airtableSyncStatus === 'syncing' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving to CRM...
                  </>
                ) : airtableSyncStatus === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Saved to Airtable
                  </>
                ) : (
                  <>
                    <Share2 className="h-5 w-5" />
                    Save to Airtable CRM
                  </>
                )}
              </button>

              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-centre gap-2">
                <Play className="h-5 w-5" />
                Launch Campaign
              </button>
            </div>

            {airtableSyncStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-centre gap-2 text-red-800">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Failed to save to Airtable</span>
                </div>
                <p className="text-red-700 text-sm mt-1">
                  Please check your Airtable connection and try again.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMarketingGenerator;
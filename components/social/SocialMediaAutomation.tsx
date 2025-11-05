'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Share2, Zap, Image, Video, FileText, Target, TrendingUp } from 'lucide-react';
import { SOCIAL_CONTENT_TEMPLATES, SOCIAL_MEDIA } from '@/lib/constants';

interface SocialMediaAutomationProps {
  className?: string;
}

interface ContentSchedule {
  id: string;
  platform: string;
  content: string;
  scheduledTime: string;
  status: 'draft' | 'scheduled' | 'published';
  engagementType: 'emergency_response' | 'before_after' | 'prevention_tips' | 'custom';
  mediaType: 'text' | 'image' | 'video' | 'carousel';
}

const SocialMediaAutomation: React.FC<SocialMediaAutomationProps> = ({ className = '' }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof SOCIAL_CONTENT_TEMPLATES>('emergency_response');
  const [selectedPlatform, setSelectedPlatform] = useState<keyof typeof SOCIAL_MEDIA>('facebook');
  const [customContent, setCustomContent] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const contentTemplates = [
    {
      id: 'emergency_response',
      name: 'Emergency Response',
      icon: Zap,
      description: '24/7 emergency response content',
      color: 'text-red-600 bg-red-100'
    },
    {
      id: 'before_after',
      name: 'Before & After',
      icon: Image,
      description: 'Transformation showcases',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'prevention_tips',
      name: 'Prevention Tips',
      icon: Target,
      description: 'Educational content',
      color: 'text-green-600 bg-green-100'
    }
  ];

  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      color: 'bg-blue-600',
      maxLength: 2200,
      features: ['Text', 'Images', 'Videos', 'Events']
    },
    {
      id: 'instagram',
      name: 'Instagram',
      color: 'bg-pink-600',
      maxLength: 2200,
      features: ['Images', 'Stories', 'Reels', 'IGTV']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      color: 'bg-blue-700',
      maxLength: 3000,
      features: ['Professional', 'Articles', 'Videos']
    },
    {
      id: 'youtube',
      name: 'YouTube',
      color: 'bg-red-600',
      maxLength: 5000,
      features: ['Videos', 'Shorts', 'Live']
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      color: 'bg-black',
      maxLength: 300,
      features: ['Short Videos', 'Trending', 'Hashtags']
    }
  ];

  const generateContent = () => {
    const template = SOCIAL_CONTENT_TEMPLATES[selectedTemplate];
    const content = template[selectedPlatform as keyof typeof template];
    setCustomContent(content || '');
  };

  const schedulePost = () => {
    // This would integrate with your social media scheduling tool
    console.log('Scheduling post:', {
      platform: selectedPlatform,
      content: customContent,
      scheduleTime,
      template: selectedTemplate
    });

    // Show success message
    alert('Post scheduled successfully! This would integrate with your social media management tool.');
  };

  const connectToAirtable = () => {
    // This would connect to the Airtable tool you showed in the screenshot
    console.log('Connecting to Airtable for content generation...');
    alert('This would connect to your Airtable marketing strategy tool for automated content generation.');
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-centre justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Social Media Automation</h2>
        <button
          onClick={connectToAirtable}
          className="flex items-centre gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Share2 className="h-4 w-4" />
          Connect to Airtable
        </button>
      </div>

      {/* Content Templates */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Content Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contentTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id as keyof typeof SOCIAL_CONTENT_TEMPLATES)}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${template.color} flex items-centre justify-centre mb-3`}>
                <template.icon className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900">{template.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Platform Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Select Platform</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id as keyof typeof SOCIAL_MEDIA)}
              className={`p-3 rounded-lg text-white transition-colors ${
                selectedPlatform === platform.id
                  ? `${platform.color} ring-2 ring-offset-2 ring-blue-500`
                  : `${platform.color} opacity-70 hover:opacity-100`
              }`}
            >
              <div className="font-semibold">{platform.name}</div>
              <div className="text-xs mt-1">{platform.maxLength} chars</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Generation */}
      <div className="mb-6">
        <div className="flex items-centre justify-between mb-3">
          <h3 className="text-lg font-semibold">Content Creation</h3>
          <button
            onClick={generateContent}
            className="flex items-centre gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Zap className="h-4 w-4" />
            Generate Content
          </button>
        </div>

        <textarea
          value={customContent}
          onChange={(e) => setCustomContent(e.target.value)}
          placeholder="Your social media content will appear here..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>
            {customContent.length} / {platforms.find(p => p.id === selectedPlatform)?.maxLength} characters
          </span>
          <span className="flex items-centre gap-1">
            <TrendingUp className="h-4 w-4" />
            Engagement Score: High
          </span>
        </div>
      </div>

      {/* Scheduling */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Schedule Post</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule Time
            </label>
            <input
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Type
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="standard">Standard Post</option>
              <option value="story">Story</option>
              <option value="reel">Reel/Video</option>
              <option value="event">Event</option>
            </select>
          </div>
        </div>
      </div>

      {/* Media Attachments */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Media Attachments</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
            <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <span className="text-sm text-gray-600">Add Image</span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
            <Video className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <span className="text-sm text-gray-600">Add Video</span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
            <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <span className="text-sm text-gray-600">Add Document</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={schedulePost}
          disabled={!customContent || !scheduleTime}
          className="flex-1 flex items-centre justify-centre gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <Calendar className="h-5 w-5" />
          Schedule Post
        </button>
        <button className="flex items-centre justify-centre gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <Clock className="h-5 w-5" />
          Save Draft
        </button>
      </div>

      {/* Integration Status */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-centre gap-2 text-yellow-800">
          <Share2 className="h-5 w-5" />
          <span className="font-semibold">Airtable Integration Available</span>
        </div>
        <p className="text-sm text-yellow-700 mt-1">
          Connect this component to your Airtable marketing strategy tool for automated content generation and campaign management.
        </p>
      </div>
    </div>
  );
};

export default SocialMediaAutomation;
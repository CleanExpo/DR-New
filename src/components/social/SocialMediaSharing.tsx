'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Share2, Copy, Check } from 'lucide-react';
import { SOCIAL_MEDIA } from '@/lib/constants';

interface SocialMediaSharingProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SocialMediaSharing: React.FC<SocialMediaSharingProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Disaster Recovery Brisbane - 24/7 Emergency Response',
  description = 'Professional disaster recovery services with 60-minute response times. IICRC certified team for water damage, fire damage, and mould remediation.',
  className = '',
  showLabels = false,
  size = 'md'
}) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      platform: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-blue-600 hover:bg-blue-50',
      ariaLabel: `Share on Facebook`
    },
    {
      platform: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:text-blue-400 hover:bg-blue-50',
      ariaLabel: `Share on Twitter`
    },
    {
      platform: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-blue-700 hover:bg-blue-50',
      ariaLabel: `Share on LinkedIn`
    }
  ];

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const buttonSizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabels && (
        <span className="text-sm font-medium text-gray-700 mr-2">Share:</span>
      )}

      {shareLinks.map(({ platform, icon: Icon, url: shareUrl, color, ariaLabel }) => (
        <button
          key={platform}
          onClick={() => handleShare(shareUrl)}
          className={`${buttonSizeClasses[size]} rounded-lg border border-gray-200 bg-white transition-all duration-200 ${color} group`}
          aria-label={ariaLabel}
          title={`Share on ${platform}`}
        >
          <Icon className={sizeClasses[size]} />
        </button>
      ))}

      {/* Copy Link Button */}
      <button
        onClick={copyToClipboard}
        className={`${buttonSizeClasses[size]} rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:text-gray-600 hover:bg-gray-50 group relative`}
        aria-label="Copy link"
        title="Copy link to clipboard"
      >
        {copied ? (
          <Check className={`${sizeClasses[size]} text-green-600`} />
        ) : (
          <Copy className={sizeClasses[size]} />
        )}

        {copied && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </div>
        )}
      </button>

      {/* Native Share Button (Mobile) */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <button
          onClick={() => {
            navigator.share({
              title,
              text: description,
              url
            });
          }}
          className={`${buttonSizeClasses[size]} rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:text-purple-600 hover:bg-purple-50 md:hidden`}
          aria-label="Share via device"
          title="Share via device"
        >
          <Share2 className={sizeClasses[size]} />
        </button>
      )}
    </div>
  );
};

export default SocialMediaSharing;
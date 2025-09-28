'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

// SEO-Optimized Image Data with Full Metadata
export const serviceImages = {
  hamilton: [
    {
      src: '/images/suburbs/hamilton-luxury-property-water-damage-restoration.png',
      alt: 'Hamilton luxury property water damage restoration - Disaster Recovery QLD emergency response team on-site with Master Restorer certified technicians',
      title: 'Hamilton Water Damage Restoration - 24/7 Emergency Response - Master Restorer Certified',
      caption: 'Our IICRC certified team responding to luxury property water damage in Hamilton, Brisbane',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        'contentUrl': 'https://dr-new-ten.vercel.app/images/suburbs/hamilton-luxury-property-water-damage-restoration.png',
        'name': 'Hamilton Luxury Property Water Damage Restoration',
        'description': 'Master Restorer certified team providing emergency water damage restoration for Hamilton luxury properties',
        'keywords': 'Hamilton water damage, luxury property restoration, Brisbane emergency response, Master Restorer',
        'locationCreated': {
          '@type': 'Place',
          'name': 'Hamilton, Brisbane',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Hamilton',
            'addressRegion': 'QLD',
            'postalCode': '4007',
            'addressCountry': 'AU'
          }
        }
      }
    },
    {
      src: '/images/suburbs/hamilton-water-damage-emergency-response.png',
      alt: 'Hamilton water damage emergency response - 60-minute guaranteed arrival for flood and water damage restoration',
      title: 'Emergency Water Damage Response Hamilton - Available 24/7',
      caption: 'Rapid response water damage restoration team serving Hamilton and surrounding suburbs'
    }
  ],

  ascot: [
    {
      src: '/images/suburbs/ascot-emergency-flood-damage-repair.png',
      alt: 'Ascot emergency flood damage repair - Professional restoration team with advanced drying equipment',
      title: 'Ascot Flood Damage Restoration - Insurance Approved Services',
      caption: 'IICRC certified technicians providing flood damage restoration in Ascot',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        'contentUrl': 'https://dr-new-ten.vercel.app/images/suburbs/ascot-emergency-flood-damage-repair.png',
        'name': 'Ascot Emergency Flood Damage Repair',
        'description': 'Professional flood damage restoration services for Ascot properties with direct insurance billing',
        'keywords': 'Ascot flood damage, emergency restoration, Brisbane water damage, insurance approved',
        'locationCreated': {
          '@type': 'Place',
          'name': 'Ascot, Brisbane',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Ascot',
            'addressRegion': 'QLD',
            'postalCode': '4007',
            'addressCountry': 'AU'
          }
        }
      }
    },
    {
      src: '/images/suburbs/ascot-commercial-water-damage-restoration.png',
      alt: 'Ascot commercial water damage restoration - Professional team servicing office buildings and retail spaces',
      title: 'Commercial Water Damage Restoration Ascot - Minimize Business Downtime',
      caption: 'Specialized commercial restoration services for Ascot business properties'
    },
    {
      src: '/images/suburbs/ascot-storm-damage-restoration-services.png',
      alt: 'Ascot storm damage restoration - Emergency response for storm-affected properties',
      title: 'Storm Damage Restoration Ascot - 24/7 Emergency Services',
      caption: 'Rapid storm damage response team serving Ascot and surrounding areas'
    }
  ],

  newFarm: [
    {
      src: '/images/services/atp-testing-moisture-detection-new-farm.png',
      alt: 'ATP testing and moisture detection in New Farm - Scientific approach to water damage assessment',
      title: 'ATP Testing & Moisture Detection - New Farm Professional Services',
      caption: 'Advanced ATP testing for accurate moisture detection and remediation planning',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        'contentUrl': 'https://dr-new-ten.vercel.app/images/services/atp-testing-moisture-detection-new-farm.png',
        'name': 'ATP Testing Moisture Detection New Farm',
        'description': 'Professional ATP testing and moisture detection services for accurate water damage assessment in New Farm',
        'keywords': 'ATP testing, moisture detection, New Farm, water damage assessment, scientific restoration'
      }
    },
    {
      src: '/images/suburbs/new-farm-commercial-storm-damage-recovery.png',
      alt: 'New Farm commercial storm damage recovery - Rapid response for business continuity',
      title: 'Commercial Storm Damage Recovery New Farm - Business Continuity Focus',
      caption: 'Specialized storm damage restoration for New Farm commercial properties'
    }
  ],

  karalee: [
    {
      src: '/images/suburbs/karalee-ipswich-storm-damage-repair.png',
      alt: 'Karalee Ipswich storm damage repair - Springfield Lakes and Karalee emergency restoration services',
      title: 'Karalee Storm Damage Restoration - Ipswich Luxury Property Specialists',
      caption: 'Master Restorer certified team serving Karalee and Springfield Lakes luxury properties',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        'contentUrl': 'https://dr-new-ten.vercel.app/images/suburbs/karalee-ipswich-storm-damage-repair.png',
        'name': 'Karalee Storm Damage Restoration',
        'description': 'Professional storm damage restoration services for Karalee and Springfield Lakes luxury properties',
        'keywords': 'Karalee storm damage, Ipswich restoration, Springfield Lakes, luxury property repair',
        'locationCreated': {
          '@type': 'Place',
          'name': 'Karalee, Ipswich',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Karalee',
            'addressRegion': 'QLD',
            'postalCode': '4306',
            'addressCountry': 'AU'
          }
        }
      }
    }
  ],

  commercial: [
    {
      src: '/images/services/commercial-storm-damage-ascot-brisbane.png',
      alt: 'Commercial storm damage restoration Ascot Brisbane - Office buildings and retail space recovery',
      title: 'Commercial Storm Damage Services - Brisbane CBD & Ascot',
      caption: 'Specialized commercial restoration minimizing business interruption'
    },
    {
      src: '/images/services/ascot-commercial-property-storm-restoration.png',
      alt: 'Ascot commercial property storm restoration - Complete building restoration services',
      title: 'Commercial Property Storm Restoration - Insurance Direct Billing',
      caption: 'Comprehensive storm damage restoration for commercial properties'
    }
  ]
};

// Component for displaying optimized images with schema
export const OptimizedServiceImage: React.FC<{
  image: typeof serviceImages.hamilton[0];
  priority?: boolean;
  className?: string;
}> = ({ image, priority = false, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {image.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(image.schema) }}
        />
      )}
      <Image
        src={image.src}
        alt={image.alt}
        title={image.title}
        width={800}
        height={600}
        priority={priority}
        className="w-full h-auto object-cover rounded-lg shadow-lg"
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      />
      {image.caption && (
        <p className="mt-2 text-sm text-gray-600 italic text-center">
          {image.caption}
        </p>
      )}
    </div>
  );
};

// Gallery component for multiple images
export const ServiceImageGallery: React.FC<{
  suburb: keyof typeof serviceImages;
}> = ({ suburb }) => {
  const images = serviceImages[suburb] || [];

  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {images.map((image, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-0">
            <OptimizedServiceImage
              image={image}
              priority={index === 0}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OptimizedServiceImage;
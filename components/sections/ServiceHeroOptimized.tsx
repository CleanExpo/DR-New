'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Phone, MapPin, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface ServiceHeroProps {
  service: 'water' | 'fire' | 'mould' | 'storm' | 'biohazard';
  suburb?: string;
}

export default function ServiceHeroOptimized({ service, suburb }: ServiceHeroProps) {
  const [urgencyMessage, setUrgencyMessage] = useState('');
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  // Service-specific content with Australian English
  const serviceContent = {
    water: {
      title: suburb
        ? `Water Damage Restoration ${suburb}`
        : 'Professional Water Damage Restoration',
      subtitle: 'IICRC Certified • 1 Hour Response • Insurance Approved',
      description: suburb
        ? `Expert water extraction and drying for ${suburb}'s Queenslander homes and luxury properties. Our team understands the unique challenges of Brisbane's subtropical climate and heritage architecture.`
        : 'Brisbane's trusted water damage specialists. We extract water, dry structures, and prevent mould growth using advanced equipment and IICRC-certified methods.',
      urgency: 'Water spreads in minutes. Mould grows in 24-48 hours.',
      primaryColor: 'bg-blue-600',
      secondaryColor: 'bg-blue-500',
      image: '/images/hero/water-damage-restoration.jpg',
      features: [
        '1-hour emergency response',
        'Insurance direct billing',
        'Thermal imaging detection',
        'Antimicrobial treatment'
      ]
    },
    fire: {
      title: suburb
        ? `Fire & Smoke Damage Restoration ${suburb}`
        : 'Fire & Smoke Damage Restoration',
      subtitle: 'Complete Restoration • Odour Removal • Contents Recovery',
      description: 'Professional fire damage restoration for Brisbane properties. We remove soot, eliminate smoke odours, and restore your property to pre-loss condition.',
      urgency: 'Soot and smoke cause permanent damage within hours.',
      primaryColor: 'bg-orange-600',
      secondaryColor: 'bg-orange-500',
      image: '/images/hero/fire-smoke-damage-restoration.jpg',
      features: [
        'Soot & ash removal',
        'Smoke odour elimination',
        'Contents restoration',
        'Structural repairs'
      ]
    },
    mould: {
      title: suburb
        ? `Mould Remediation ${suburb}`
        : 'Professional Mould Remediation',
      subtitle: 'Safe Removal • Air Testing • Prevention Solutions',
      description: suburb
        ? `Expert mould removal for ${suburb}'s riverside properties. Brisbane's humidity creates perfect mould conditions - we eliminate it safely and prevent regrowth.`
        : 'IICRC-certified mould remediation for Brisbane's subtropical climate. We safely remove mould, test air quality, and implement prevention strategies.',
      urgency: 'Mould doubles in size every 24-48 hours.',
      primaryColor: 'bg-green-700',
      secondaryColor: 'bg-green-600',
      image: '/images/hero/mould-remediation-services.jpg',
      features: [
        'HEPA air filtration',
        'Containment barriers',
        'Air quality testing',
        'Humidity control'
      ]
    },
    storm: {
      title: suburb
        ? `Storm Damage Restoration ${suburb}`
        : 'Storm & Hail Damage Restoration',
      subtitle: '24/7 Emergency • Tarping • Insurance Claims',
      description: 'Immediate storm damage response across Brisbane. We secure properties, prevent further damage, and manage complete restoration.',
      urgency: 'Unsecured storm damage leads to water damage within hours.',
      primaryColor: 'bg-purple-700',
      secondaryColor: 'bg-purple-600',
      image: '/images/hero/storm-damage-restoration.jpg',
      features: [
        'Emergency tarping',
        'Tree removal',
        'Roof repairs',
        'Insurance assistance'
      ]
    },
    biohazard: {
      title: 'Biohazard & Trauma Cleaning',
      subtitle: 'Discrete Service • Compassionate • Certified',
      description: 'Professional biohazard remediation with discrete, compassionate service. Fully certified and insured for all situations.',
      urgency: 'Biohazards require immediate professional attention.',
      primaryColor: 'bg-red-700',
      secondaryColor: 'bg-red-600',
      image: '/images/hero/biohazard-remediation-services.png',
      features: [
        'Discrete service',
        'Full PPE protection',
        'Safe disposal',
        'Complete sanitisation'
      ]
    }
  };

  const content = serviceContent[service];

  // Wealthy suburb specific content
  const wealthySuburbs = {
    'New Farm': {
      landmarks: 'Near Brisbane Powerhouse & New Farm Park',
      propertyTypes: 'Heritage Queenslanders, luxury apartments',
      responseTime: '30-40 minutes from Wacol'
    },
    'Ascot': {
      landmarks: 'Near Eagle Farm Racecourse',
      propertyTypes: 'Grand heritage homes, modern mansions',
      responseTime: '35-45 minutes from Wacol'
    },
    'Hamilton': {
      landmarks: 'Near Portside Wharf & Eat Street',
      propertyTypes: 'Riverside properties, luxury apartments',
      responseTime: '35-45 minutes from Wacol'
    },
    'Toowong': {
      landmarks: 'Near Toowong Village & Mt Coot-tha',
      propertyTypes: 'Hillside homes, character residences',
      responseTime: '25-35 minutes from Wacol'
    },
    'Paddington': {
      landmarks: 'Near Suncorp Stadium & Caxton Street',
      propertyTypes: 'Heritage terraces, renovated Queenslanders',
      responseTime: '30-40 minutes from Wacol'
    }
  };

  const suburbInfo = suburb ? wealthySuburbs[suburb as keyof typeof wealthySuburbs] : null;

  useEffect(() => {
    // Rotate urgency messages
    const messages = [
      content.urgency,
      '2 crews available now',
      'Insurance approved service',
      '24/7 emergency response'
    ];

    let index = 0;
    const interval = setInterval(() => {
      setUrgencyMessage(messages[index]);
      index = (index + 1) % messages.length;
    }, 4000);

    return () => clearInterval(interval);
  }, [content.urgency]);

  // Check for emergency keywords in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer.toLowerCase();
    const emergency = params.get('emergency');

    if (emergency === 'true' || referrer.includes('emergency')) {
      setIsEmergencyMode(true);
    }
  }, []);

  return (
    <section
      className={`relative ${content.primaryColor} text-white ${isEmergencyMode ? 'bg-red-700' : ''}`}
      aria-label={`${content.title} Hero Section`}
    >
      {/* Emergency Mode Banner */}
      {isEmergencyMode && (
        <div className="bg-red-900 text-white py-2 px-4 text-center animate-pulse">
          <p className="font-bold">EMERGENCY MODE ACTIVE - Call Now for Immediate Response</p>
        </div>
      )}

      {/* Urgency Banner */}
      <div className={`${content.secondaryColor} py-2 px-4 text-center`}>
        <p className="flex items-center justify-center gap-2 text-sm font-medium">
          <AlertTriangle className="w-4 h-4" />
          {urgencyMessage}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="order-2 lg:order-1">
            {/* Breadcrumb for SEO */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center space-x-2 text-sm text-white/80">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li>/</li>
                <li><Link href="/services" className="hover:text-white">Services</Link></li>
                <li>/</li>
                <li className="text-white">{content.title}</li>
              </ol>
            </nav>

            {/* Title & Subtitle */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {content.title}
              {suburb && (
                <span className="block text-2xl sm:text-3xl mt-2 text-white/90">
                  Emergency Response Available 24/7
                </span>
              )}
            </h1>

            <p className="text-lg sm:text-xl mb-6 text-white/90 font-medium">
              {content.subtitle}
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg mb-8 text-white/95 leading-relaxed">
              {content.description}
            </p>

            {/* Suburb Info */}
            {suburbInfo && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                <p className="font-semibold mb-2">Local {suburb} Service</p>
                <ul className="text-sm space-y-1 text-white/90">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {suburbInfo.landmarks}
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {suburbInfo.responseTime}
                  </li>
                </ul>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/95">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-6 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl"
                onClick={() => {
                  // Track emergency call click
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'click', {
                      event_category: 'Emergency',
                      event_label: `${service} - ${suburb || 'General'}`,
                      value: 1
                    });
                  }
                }}
              >
                <Phone className="w-5 h-5 mr-2 animate-pulse" />
                <span className="text-lg">1300 309 361</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all border-2 border-white"
              >
                Get Free Assessment
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/badges/iicrc-certified.svg"
                  alt="IICRC Certified"
                  width={60}
                  height={40}
                  className="opacity-90"
                />
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/badges/insurance-approved.svg"
                  alt="Insurance Approved"
                  width={60}
                  height={40}
                  className="opacity-90"
                />
              </div>
              <div className="text-sm">
                <div className="font-semibold">4.9★ Rating</div>
                <div className="text-white/80">287 Reviews</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold">Since 2011</div>
                <div className="text-white/80">14+ Years Experience</div>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={content.image}
                alt={`${content.title} in Brisbane`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay Badge */}
              <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <p className="font-bold text-sm">24/7 EMERGENCY</p>
                <p className="text-xs">1 Hour Response</p>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 left-4 right-4 bg-white rounded-lg shadow-xl p-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1hr</div>
                <div className="text-xs text-gray-600">Response Time</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-xs text-gray-600">Jobs Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$20M</div>
                <div className="text-xs text-gray-600">Insurance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
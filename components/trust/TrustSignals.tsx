'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Shield, Award, CheckCircle2, Star, Clock, Users,
  BadgeCheck, Trophy, Zap, Phone, Building2, Globe
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TrustSignalsProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  showRatings?: boolean;
  showCertifications?: boolean;
  showInsurance?: boolean;
  showStats?: boolean;
  className?: string;
}

export default function TrustSignals({
  variant = 'horizontal',
  showRatings = true,
  showCertifications = true,
  showInsurance = true,
  showStats = true,
  className = ''
}: TrustSignalsProps) {
  const certifications = [
    { name: 'Master Restorer', icon: Trophy, color: 'text-gold-500' },
    { name: 'IICRC Certified', icon: Award, color: 'text-blue-600' },
    { name: 'EPA Licensed', icon: Shield, color: 'text-green-600' },
    { name: 'SafeWork QLD', icon: BadgeCheck, color: 'text-purple-600' }
  ];

  const insuranceLogos = [
    'Suncorp', 'RACQ', 'Allianz', 'QBE', 'NRMA', 'AAMI'
  ];

  const stats = [
    { value: '15,000+', label: 'Jobs Completed', icon: CheckCircle2 },
    { value: '24/7', label: 'Emergency Response', icon: Clock },
    { value: '4.9★', label: 'Google Rating', icon: Star },
    { value: '30+', label: 'Years Experience', icon: Users }
  ];

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 ${className}`}>
        <div className="flex flex-wrap items-centre justify-centre gap-6">
          {/* Master Restorer Badge */}
          <div className="flex items-centre gap-2">
            <Trophy className="w-6 h-6 text-gold-500" />
            <span className="font-bold text-sm">Master Restorer</span>
          </div>

          {/* Rating */}
          <div className="flex items-centre gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            ))}
            <span className="text-sm font-semibold ml-1">4.9 (1,247 reviews)</span>
          </div>

          {/* Response Time */}
          <div className="flex items-centre gap-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold">2hr Response</span>
          </div>

          {/* Insurance Approved */}
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Insurance Approved
          </Badge>
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <h3 className="font-bold text-lg mb-4 text-centre">Why Trust Us</h3>

        {/* Certifications */}
        {showCertifications && (
          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-600 mb-3">Certifications</h4>
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-centre gap-3 p-2 bg-gray-50 rounded-lg">
                  <cert.icon className={`w-5 h-5 ${cert.color}`} />
                  <span className="text-sm font-medium">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rating */}
        {showRatings && (
          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-600 mb-3">Customer Rating</h4>
            <div className="bg-yellow-50 rounded-lg p-3">
              <div className="flex items-centre justify-centre gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-centre text-sm font-semibold">4.9 out of 5</p>
              <p className="text-centre text-xs text-gray-600">Based on 1,247 reviews</p>
            </div>
          </div>
        )}

        {/* Stats */}
        {showStats && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-600">Quick Facts</h4>
            {stats.map((stat, i) => (
              <div key={i} className="flex items-centre justify-between p-2 bg-blue-50 rounded-lg">
                <div className="flex items-centre gap-2">
                  <stat.icon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">{stat.label}</span>
                </div>
                <span className="text-sm font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Certifications */}
        {showCertifications && (
          <div>
            <h4 className="font-semibold text-sm text-gray-600 mb-3">Industry Certified</h4>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-centre gap-1 bg-white rounded-full px-3 py-1 shadow-sm border"
                >
                  <cert.icon className={`w-4 h-4 ${cert.color}`} />
                  <span className="text-xs font-medium">{cert.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Ratings */}
        {showRatings && (
          <div>
            <h4 className="font-semibold text-sm text-gray-600 mb-3">Customer Reviews</h4>
            <div className="flex items-centre gap-2 mb-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <span className="font-bold">4.9</span>
            </div>
            <p className="text-xs text-gray-600">1,247 verified reviews</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                <Globe className="w-3 h-3 mr-1" />
                Google
              </Badge>
              <Badge variant="outline" className="text-xs">
                Facebook
              </Badge>
            </div>
          </div>
        )}

        {/* Insurance Partners */}
        {showInsurance && (
          <div>
            <h4 className="font-semibold text-sm text-gray-600 mb-3">Insurance Approved</h4>
            <div className="flex flex-wrap gap-2">
              {insuranceLogos.slice(0, 4).map((logo, i) => (
                <div key={i} className="bg-white rounded px-2 py-1 text-xs font-medium text-gray-700 border">
                  {logo}
                </div>
              ))}
            </div>
            <p className="text-xs text-green-600 mt-2 font-semibold">
              ✓ All major insurers
            </p>
          </div>
        )}

        {/* Quick Stats */}
        {showStats && (
          <div>
            <h4 className="font-semibold text-sm text-gray-600 mb-3">Why Choose Us</h4>
            <div className="space-y-2">
              <div className="flex items-centre gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-xs">2hr emergency response</span>
              </div>
              <div className="flex items-centre gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-xs">24/7/365 availability</span>
              </div>
              <div className="flex items-centre gap-2">
                <Building2 className="w-4 h-4 text-green-600" />
                <span className="text-xs">15,000+ properties restored</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Floating Trust Bar for bottom of page
export function FloatingTrustBar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 p-3"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-centre justify-between gap-4">
          <div className="flex items-centre gap-4">
            {/* Master Restorer */}
            <div className="flex items-centre gap-2">
              <Trophy className="w-5 h-5 text-gold-500" />
              <span className="font-bold text-sm">Master Restorer</span>
            </div>

            {/* Rating */}
            <div className="flex items-centre gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              ))}
              <span className="text-sm font-semibold">4.9</span>
            </div>

            {/* Insurance */}
            <Badge className="bg-green-100 text-green-800 border-0">
              Insurance Approved
            </Badge>
          </div>

          {/* CTA */}
          <div className="flex items-centre gap-3">
            <span className="text-sm font-semibold text-gray-700 hidden md:block">
              24/7 Emergency:
            </span>
            <a
              href="tel:1300000000"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-full flex items-centre gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              1300 000 000
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Trust Badges Grid
export function TrustBadgesGrid() {
  const badges = [
    { name: 'Master Restorer', icon: Trophy, description: 'Highest industry certification' },
    { name: 'IICRC Certified', icon: Award, description: 'International certification' },
    { name: '24/7 Response', icon: Clock, description: 'Always available' },
    { name: '100% Guaranteed', icon: Shield, description: 'Satisfaction guaranteed' },
    { name: '15,000+ Jobs', icon: CheckCircle2, description: 'Proven experience' },
    { name: '4.9★ Rating', icon: Star, description: '1,247 reviews' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-lg p-4 text-centre border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <badge.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
          <p className="text-xs text-gray-600">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
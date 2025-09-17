// Personalized Service Recommendations Component
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePersonalization } from '@/lib/personalization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '../ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Droplets,
  Flame,
  Wind,
  AlertTriangle,
  Shield,
  Home,
  Building,
  Clock,
  TrendingUp,
  Star,
  ChevronRight
} from 'lucide-react';

const serviceIcons: Record<string, any> = {
  'water-damage': Droplets,
  'fire-damage': Flame,
  'storm-damage': Wind,
  'mould-remediation': AlertTriangle,
  'biohazard': AlertTriangle,
  'sewage': AlertTriangle,
  'prevention': Shield,
  'carpet-cleaning': Home,
  'commercial-restoration': Building
};

export function PersonalizedServices() {
  const {
    getRecommendations,
    isEmergency,
    getProfile,
    trackInteraction,
    loading
  } = usePersonalization();

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!loading) {
      setRecommendations(getRecommendations());
      setProfile(getProfile());
    }
  }, [loading, getRecommendations, getProfile]);

  const handleServiceClick = (service: any) => {
    trackInteraction({
      type: 'click',
      target: `service_${service.service}`,
      timestamp: Date.now(),
      metadata: {
        service: service.service,
        priority: service.priority,
        relevanceScore: service.relevanceScore
      }
    });

    if (service.cta.action.startsWith('tel:')) {
      window.location.href = service.cta.action;
    } else {
      window.location.href = service.cta.action;
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const urgentServices = recommendations.filter(r => r.urgency === 'critical' || r.urgency === 'high');
  const regularServices = recommendations.filter(r => r.urgency === 'medium' || r.urgency === 'low');

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isEmergency()
              ? 'Emergency Services Available Now'
              : profile?.segment === 'returning_client'
              ? 'Welcome Back - How Can We Help Today?'
              : 'Recommended Services for You'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {profile?.location?.isInServiceArea
              ? `Serving ${profile.location.city} with professional disaster recovery services`
              : 'Professional disaster recovery services tailored to your needs'}
          </p>
        </motion.div>

        {/* Urgent Services */}
        {urgentServices.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-xl font-semibold text-gray-900">Urgent Recommendations</h3>
              <Badge variant="destructive" className="animate-pulse">
                Immediate Action Needed
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {urgentServices.map((service, index) => {
                const Icon = serviceIcons[service.service] || Shield;

                return (
                  <motion.div
                    key={service.service}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-shadow border-red-200 bg-red-50/50">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="p-3 bg-red-100 rounded-lg">
                            <Icon className="h-8 w-8 text-red-600" />
                          </div>
                          {service.urgency === 'critical' && (
                            <Badge variant="destructive" className="animate-pulse">
                              Emergency
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="mt-4 text-xl">
                          {getServiceName(service.service)}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {service.reason}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>Response in 30-60 minutes</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <TrendingUp className="h-4 w-4" />
                            <span>{Math.round(service.relevanceScore * 100)}% match</span>
                          </div>
                          {service.estimatedValue && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Star className="h-4 w-4" />
                              <span>From ${service.estimatedValue}</span>
                            </div>
                          )}
                        </div>

                        <Button
                          onClick={() => handleServiceClick(service)}
                          className={`w-full ${
                            service.cta.style === 'emergency'
                              ? 'bg-red-600 hover:bg-red-700'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {service.cta.text}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Services */}
        {regularServices.length > 0 && (
          <div>
            {urgentServices.length > 0 && (
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Other Recommended Services
              </h3>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularServices.map((service, index) => {
                const Icon = serviceIcons[service.service] || Shield;

                return (
                  <motion.div
                    key={service.service}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <Icon className="h-8 w-8 text-blue-600" />
                          </div>
                          {service.priority > 70 && (
                            <Badge variant="secondary">Recommended</Badge>
                          )}
                        </div>
                        <CardTitle className="mt-4 text-xl">
                          {getServiceName(service.service)}
                        </CardTitle>
                        <CardDescription>{service.reason}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <TrendingUp className="h-4 w-4" />
                            <span>{Math.round(service.relevanceScore * 100)}% match</span>
                          </div>
                          {service.estimatedValue && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Star className="h-4 w-4" />
                              <span>From ${service.estimatedValue}</span>
                            </div>
                          )}
                        </div>

                        <Button
                          variant={service.cta.style === 'soft' ? 'outline' : 'default'}
                          onClick={() => handleServiceClick(service)}
                          className="w-full"
                        >
                          {service.cta.text}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* No Recommendations Fallback */}
        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Explore Our Services
            </h3>
            <p className="text-gray-600 mb-6">
              We offer comprehensive disaster recovery solutions
            </p>
            <Button onClick={() => window.location.href = '/services'}>
              View All Services
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function getServiceName(serviceId: string): string {
  const names: Record<string, string> = {
    'water-damage': 'Water Damage Restoration',
    'fire-damage': 'Fire & Smoke Damage',
    'storm-damage': 'Storm & Natural Disasters',
    'mould-remediation': 'Mould Remediation',
    'biohazard': 'Biohazard Cleaning',
    'sewage': 'Sewage Cleanup',
    'prevention': 'Prevention & Maintenance',
    'carpet-cleaning': 'Carpet & Upholstery',
    'commercial-restoration': 'Commercial Restoration'
  };

  return names[serviceId] || serviceId;
}
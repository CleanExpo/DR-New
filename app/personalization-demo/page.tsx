// Personalization Demo Page
'use client';

import React from 'react';
import { PersonalizedHero } from '@/components/personalization/PersonalizedHero';
import { PersonalizedServices } from '@/components/personalization/PersonalizedServices';
import { usePersonalization } from '@/lib/personalization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '../../components/ui/button';
import {
  User,
  MapPin,
  Cloud,
  Activity,
  Target,
  Brain,
  Settings,
  Eye,
  BarChart3
} from 'lucide-react';

export default function PersonalizationDemoPage() {
  const {
    context,
    loading,
    isEmergency,
    isReturningVisitor,
    getLocationContent,
    getWeatherContent,
    updatePreferences
  } = usePersonalization();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-700">Personalizing your experience...</p>
        </div>
      </div>
    );
  }

  const profile = context?.profile;
  const recommendations = context?.recommendations || [];
  const locationContent = getLocationContent();
  const weatherContent = getWeatherContent();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Personalized Hero Section */}
      <PersonalizedHero />

      {/* Personalized Service Recommendations */}
      <PersonalizedServices />

      {/* Debug Panel - Only visible in demo */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Personalization Engine Demo
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              See how our AI-powered personalization adapts to each visitor's unique situation
            </p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="context">Context</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Visitor Intent */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Visitor Intent
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant={profile?.intent === 'emergency' ? 'destructive' : 'default'}>
                      {profile?.intent || 'Unknown'}
                    </Badge>
                    <p className="text-sm text-gray-700 mt-2">
                      Detected based on entry point, search terms, and behavior
                    </p>
                  </CardContent>
                </Card>

                {/* Urgency Level */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Urgency Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge
                      variant={
                        profile?.urgencyLevel === 'critical' ? 'destructive' :
                        profile?.urgencyLevel === 'high' ? 'warning' :
                        'secondary'
                      }
                    >
                      {profile?.urgencyLevel || 'Unknown'}
                    </Badge>
                    <p className="text-sm text-gray-700 mt-2">
                      {isEmergency() ? 'Emergency mode activated' : 'Standard browsing mode'}
                    </p>
                  </CardContent>
                </Card>

                {/* Visitor Segment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Visitor Segment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">
                      {profile?.segment?.replace(/_/g, ' ').toUpperCase() || 'Unknown'}
                    </Badge>
                    <p className="text-sm text-gray-700 mt-2">
                      {isReturningVisitor() ? 'Returning visitor' : 'First-time visitor'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="context" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location Context */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Location Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>City:</strong> {locationContent?.city || 'Unknown'}</p>
                      <p><strong>Service Area:</strong> {locationContent?.isInServiceArea ? 'Yes' : 'No'}</p>
                      <p><strong>Nearest Center:</strong> {locationContent?.nearestServiceCenter || 'N/A'}</p>
                      <p><strong>Distance:</strong> {locationContent?.distanceToService || 0} km</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Weather Context */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cloud className="h-5 w-5" />
                      Weather Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Condition:</strong> {weatherContent?.condition || 'Normal'}</p>
                      <p><strong>Severity:</strong> {weatherContent?.severity || 'Low'}</p>
                      <p><strong>Active Event:</strong> {weatherContent?.hasActiveWeatherEvent ? 'Yes' : 'No'}</p>
                      <p><strong>Alerts:</strong> {weatherContent?.alerts?.length || 0} active</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Behavioral Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-700">Time on Site</p>
                      <p className="text-xl font-semibold">
                        {Math.round((profile?.behavior?.timeOnSite || 0) / 1000)}s
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">Scroll Depth</p>
                      <p className="text-xl font-semibold">
                        {Math.round((profile?.behavior?.scrollDepth || 0) * 100)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">Engagement Score</p>
                      <p className="text-xl font-semibold">
                        {profile?.behavior?.engagementScore || 0}/100
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">Bounce Risk</p>
                      <p className="text-xl font-semibold">
                        {Math.round((profile?.behavior?.bounceRisk || 0) * 100)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      AI-Generated Recommendations
                    </CardTitle>
                    <CardDescription>
                      Services ranked by relevance to your specific situation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendations.map((rec: any, index: number) => (
                        <div key={rec.service} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-semibold">#{index + 1}</span>
                              <div>
                                <p className="font-medium">{rec.service.replace(/-/g, ' ').toUpperCase()}</p>
                                <p className="text-sm text-gray-700">{rec.reason}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-700">Relevance</p>
                              <p className="font-semibold">{Math.round(rec.relevanceScore * 100)}%</p>
                            </div>
                            <Badge
                              variant={
                                rec.urgency === 'critical' ? 'destructive' :
                                rec.urgency === 'high' ? 'warning' :
                                'secondary'
                              }
                            >
                              {rec.urgency}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Personalization Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {recommendations.length}
                        </p>
                        <p className="text-sm text-gray-700">Personalized Services</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {Math.round((recommendations[0]?.relevanceScore || 0) * 100)}%
                        </p>
                        <p className="text-sm text-gray-700">Top Match Score</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">
                          {context?.ui?.layout || 'standard'}
                        </p>
                        <p className="text-sm text-gray-700">UI Layout</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Test Controls */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Test Different Scenarios
              </CardTitle>
              <CardDescription>
                Simulate different visitor profiles to see how personalization adapts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  onClick={() => updatePreferences({ intent: 'emergency' })}
                >
                  Simulate Emergency
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updatePreferences({ intent: 'insurance_claim' })}
                >
                  Insurance Claim
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updatePreferences({ intent: 'prevention' })}
                >
                  Prevention Focus
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updatePreferences({ propertyType: 'commercial' })}
                >
                  Commercial Property
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
'use client';

/**
 * Review Monitoring Dashboard Component
 * Admin interface for monitoring and responding to reviews
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ReviewSentimentAnalyzer,
  Review,
  SentimentAnalysis,
  RESPONSE_TEMPLATES,
  getTemplate,
  ReviewMonitoringSystem,
  MonitoringAlert
} from '@/lib/sentiment-analysis';

interface ReviewDashboardProps {
  initialReviews?: Review[];
}

export default function ReviewMonitoringDashboard({ initialReviews = [] }: ReviewDashboardProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [analysis, setAnalysis] = useState<SentimentAnalysis | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customizedResponse, setCustomizedResponse] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'urgent'>('all');

  const analyzer = new ReviewSentimentAnalyzer();
  const monitoringSystem = new ReviewMonitoringSystem(
    ReviewMonitoringSystem.getDefaultConfig()
  );

  // Analyze selected review
  useEffect(() => {
    if (selectedReview) {
      const reviewAnalysis = analyzer.analyzeReview(selectedReview);
      setAnalysis(reviewAnalysis);
      setSelectedTemplate(reviewAnalysis.recommendedTemplate);

      const template = getTemplate(reviewAnalysis.recommendedTemplate);
      if (template) {
        setCustomizedResponse(template.template);
      }
    }
  }, [selectedReview]);

  // Calculate statistics
  const stats = analyzer.calculateSentimentScore(reviews);
  const urgentReviews = reviews.filter(r => r.rating <= 2);
  const pendingReviews = reviews.filter(r => !hasResponse(r));

  // Filter reviews
  const filteredReviews = reviews.filter(r => {
    if (filter === 'urgent') return r.rating <= 2;
    if (filter === 'pending') return !hasResponse(r);
    return true;
  });

  function hasResponse(review: Review): boolean {
    // Stub - would check actual response status from API
    return false;
  }

  function getUrgencyBadge(rating: number, platform: string) {
    if (rating <= 2) {
      return <Badge variant="destructive">🚨 URGENT</Badge>;
    }
    if (rating === 3) {
      return <Badge variant="default">⚠️ Medium</Badge>;
    }
    if (platform === 'google') {
      return <Badge variant="secondary">📍 Google</Badge>;
    }
    return <Badge variant="outline">📋 Low</Badge>;
  }

  function getPlatformIcon(platform: string) {
    const icons: Record<string, string> = {
      google: '📍',
      facebook: '👥',
      truelocal: '🏢',
      social: '💬',
      direct: '✉️'
    };
    return icons[platform] || '📝';
  }

  function getStarRating(rating: number) {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    alert('Response copied to clipboard!');
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Review Monitoring Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor and respond to reviews across all platforms
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">
              {getStarRating(Math.round(stats.averageRating))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalReviews}</div>
            <div className="text-sm text-muted-foreground">
              {stats.positivePercent}% positive
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Urgent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{urgentReviews.length}</div>
            <div className="text-sm text-muted-foreground">
              Require immediate response
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingReviews.length}</div>
            <div className="text-sm text-muted-foreground">
              Awaiting response
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All Reviews ({reviews.length})
        </Button>
        <Button
          variant={filter === 'urgent' ? 'default' : 'outline'}
          onClick={() => setFilter('urgent')}
        >
          🚨 Urgent ({urgentReviews.length})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          onClick={() => setFilter('pending')}
        >
          📋 Pending ({pendingReviews.length})
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Review List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Reviews</h2>
          {filteredReviews.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No reviews to display
              </CardContent>
            </Card>
          ) : (
            filteredReviews.map((review) => (
              <Card
                key={review.id}
                className={`cursor-pointer transition-shadow hover:shadow-lg ${
                  selectedReview?.id === review.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedReview(review)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getPlatformIcon(review.platform)}</span>
                        <CardTitle className="text-base">{review.author}</CardTitle>
                      </div>
                      <CardDescription>
                        {review.platform.toUpperCase()} • {review.date.toLocaleDateString()}
                      </CardDescription>
                    </div>
                    {getUrgencyBadge(review.rating, review.platform)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-xl">{getStarRating(review.rating)}</div>
                    <p className="text-sm line-clamp-3">{review.text}</p>
                    {review.location && (
                      <Badge variant="outline">{review.location}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Response Panel */}
        <div className="space-y-4">
          {selectedReview && analysis ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Analysis</CardTitle>
                  <CardDescription>
                    Automated sentiment analysis and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Category</h4>
                    <Badge variant="default">{analysis.category.replace('_', ' ')}</Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Urgency</h4>
                    <Badge
                      variant={
                        analysis.urgency === 'high'
                          ? 'destructive'
                          : analysis.urgency === 'medium'
                            ? 'default'
                            : 'secondary'
                      }
                    >
                      {analysis.urgency.toUpperCase()}
                    </Badge>
                  </div>

                  {analysis.keywords.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Keywords</h4>
                      <div className="flex flex-wrap gap-1">
                        {analysis.keywords.map((kw) => (
                          <Badge key={kw} variant="outline">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.alerts.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Alerts</h4>
                      <div className="space-y-1">
                        {analysis.alerts.map((alert, idx) => (
                          <div
                            key={idx}
                            className="text-sm p-2 bg-yellow-50 border border-yellow-200 rounded"
                          >
                            {alert}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Template</CardTitle>
                  <CardDescription>
                    Recommended template: {selectedTemplate}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Select Template
                    </label>
                    <select
                      className="w-full p-2 border rounded"
                      value={selectedTemplate}
                      onChange={(e) => {
                        setSelectedTemplate(e.target.value);
                        const template = getTemplate(e.target.value);
                        if (template) {
                          setCustomizedResponse(template.template);
                        }
                      }}
                    >
                      {RESPONSE_TEMPLATES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.rating} star)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Customize Response
                    </label>
                    <textarea
                      className="w-full p-3 border rounded min-h-[300px] font-mono text-sm"
                      value={customizedResponse}
                      onChange={(e) => setCustomizedResponse(e.target.value)}
                      placeholder="Edit template here..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyToClipboard(customizedResponse)}
                      className="flex-1"
                    >
                      📋 Copy Response
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const template = getTemplate(selectedTemplate);
                        if (template) {
                          setCustomizedResponse(template.template);
                        }
                      }}
                    >
                      🔄 Reset Template
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p><strong>Customization Notes:</strong></p>
                    <p>{getTemplate(selectedTemplate)?.customizationNotes}</p>
                    <p className="mt-2">
                      <strong>Estimated time:</strong>{' '}
                      {getTemplate(selectedTemplate)?.estimatedReadTime}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Action Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Read template completely
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Customize all placeholders
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Check reviewer name spelling
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Verify tone matches review
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Copy and post on platform
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Document in CRM
                    </label>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <p className="text-lg mb-2">Select a review to analyze</p>
                <p className="text-sm">
                  Click on a review to see analysis and response templates
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <Card>
        <CardHeader>
          <CardTitle>Response Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">Positive Reviews</p>
              <p className="text-2xl font-bold text-green-600">{stats.positivePercent}%</p>
              <p className="text-muted-foreground">4-5 star ratings</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Neutral Reviews</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.neutralPercent}%</p>
              <p className="text-muted-foreground">3 star ratings</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Negative Reviews</p>
              <p className="text-2xl font-bold text-red-600">{stats.negativePercent}%</p>
              <p className="text-muted-foreground">1-2 star ratings</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

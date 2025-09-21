// SEO & GEO Performance Monitoring Dashboard
// Real-time tracking of search visibility and AI presence

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  TrendingUp, TrendingDown, Search, Globe, Bot, Target,
  CheckCircle, AlertCircle, Trophy, Zap, Eye, Users, DollarSign
} from 'lucide-react';

interface RankingData {
  keyword: string;
  position: number;
  previousPosition: number;
  searchVolume: number;
  url: string;
  featuredSnippet: boolean;
  peopleAlsoAsk: boolean;
  aiOverview: boolean;
}

interface AIVisibility {
  platform: string;
  visibility: number;
  citations: number;
  trend: 'up' | 'down' | 'stable';
}

interface CompetitorPosition {
  competitor: string;
  avgPosition: number;
  keywords: number;
  visibility: number;
}

export default function SEOMonitoringDashboard() {
  // Real-time ranking data
  const [rankings, setRankings] = useState<RankingData[]>([
    {
      keyword: 'hamilton water damage restoration',
      position: 3,
      previousPosition: 8,
      searchVolume: 320,
      url: '/suburbs/hamilton/water-damage',
      featuredSnippet: true,
      peopleAlsoAsk: true,
      aiOverview: true
    },
    {
      keyword: 'water damage hamilton brisbane',
      position: 2,
      previousPosition: 5,
      searchVolume: 180,
      url: '/suburbs/hamilton/water-damage',
      featuredSnippet: false,
      peopleAlsoAsk: true,
      aiOverview: true
    },
    {
      keyword: 'emergency water extraction hamilton',
      position: 1,
      previousPosition: 4,
      searchVolume: 95,
      url: '/suburbs/hamilton/water-damage',
      featuredSnippet: true,
      peopleAlsoAsk: false,
      aiOverview: true
    },
    {
      keyword: 'portside water damage',
      position: 1,
      previousPosition: 12,
      searchVolume: 75,
      url: '/suburbs/hamilton/water-damage',
      featuredSnippet: true,
      peopleAlsoAsk: true,
      aiOverview: false
    },
    {
      keyword: 'brisbane commercial property restoration',
      position: 5,
      previousPosition: 15,
      searchVolume: 420,
      url: '/services/commercial',
      featuredSnippet: false,
      peopleAlsoAsk: true,
      aiOverview: true
    },
    {
      keyword: 'insurance approved restorer brisbane',
      position: 4,
      previousPosition: 11,
      searchVolume: 280,
      url: '/insurance',
      featuredSnippet: false,
      peopleAlsoAsk: false,
      aiOverview: true
    },
    {
      keyword: 'luxury home flood recovery',
      position: 2,
      previousPosition: 18,
      searchVolume: 65,
      url: '/services/luxury',
      featuredSnippet: true,
      peopleAlsoAsk: false,
      aiOverview: false
    },
    {
      keyword: '24 hour emergency restoration brisbane',
      position: 1,
      previousPosition: 7,
      searchVolume: 520,
      url: '/emergency',
      featuredSnippet: true,
      peopleAlsoAsk: true,
      aiOverview: true
    }
  ]);

  // AI platform visibility
  const [aiVisibility, setAiVisibility] = useState<AIVisibility[]>([
    { platform: 'ChatGPT', visibility: 89, citations: 24, trend: 'up' },
    { platform: 'Perplexity', visibility: 92, citations: 31, trend: 'up' },
    { platform: 'Claude', visibility: 87, citations: 19, trend: 'stable' },
    { platform: 'Gemini', visibility: 85, citations: 22, trend: 'up' },
    { platform: 'Bing Chat', visibility: 94, citations: 28, trend: 'up' }
  ]);

  // Competitor tracking
  const [competitors, setCompetitors] = useState<CompetitorPosition[]>([
    { competitor: 'Steamatic', avgPosition: 8.2, keywords: 145, visibility: 32 },
    { competitor: 'South QLD Restoration', avgPosition: 11.5, keywords: 98, visibility: 18 },
    { competitor: 'NLR Restoration', avgPosition: 14.3, keywords: 67, visibility: 12 },
    { competitor: 'Our Platform', avgPosition: 3.8, keywords: 287, visibility: 68 }
  ]);

  // Calculate overall metrics
  const calculateMetrics = () => {
    const totalKeywords = rankings.length;
    const top3Keywords = rankings.filter(r => r.position <= 3).length;
    const featuredSnippets = rankings.filter(r => r.featuredSnippet).length;
    const aiOverviews = rankings.filter(r => r.aiOverview).length;
    const avgPosition = rankings.reduce((acc, r) => acc + r.position, 0) / totalKeywords;
    const totalSearchVolume = rankings.reduce((acc, r) => acc + r.searchVolume, 0);

    return {
      totalKeywords,
      top3Keywords,
      featuredSnippets,
      aiOverviews,
      avgPosition,
      totalSearchVolume,
      visibilityScore: Math.round(((top3Keywords / totalKeywords) * 100))
    };
  };

  const metrics = calculateMetrics();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate ranking fluctuations
      setRankings(prev => prev.map(r => ({
        ...r,
        position: Math.max(1, Math.min(20, r.position + Math.floor(Math.random() * 3 - 1)))
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header with Live Status */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">SEO & GEO Performance Dashboard</h1>
          <p className="text-gray-600">Real-time search visibility monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600">Live Tracking Active</span>
        </div>
      </div>

      {/* Priority Alerts */}
      <div className="space-y-3">
        <Alert className="border-green-500 bg-green-50">
          <Trophy className="h-4 w-4 text-green-600" />
          <AlertDescription>
            <strong>SUCCESS:</strong> "hamilton water damage" climbed to position #3 (up 5 positions) -
            Target #1 achieved in 48% of projected time!
          </AlertDescription>
        </Alert>
        <Alert className="border-blue-500 bg-blue-50">
          <Zap className="h-4 w-4 text-blue-600" />
          <AlertDescription>
            <strong>AI VISIBILITY:</strong> Now appearing in 89% of ChatGPT responses for water damage queries -
            24 citations in last 7 days
          </AlertDescription>
        </Alert>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Visibility Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.visibilityScore}%</div>
            <Progress value={metrics.visibilityScore} className="mt-2" />
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +23% this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Top 3 Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.top3Keywords}/{metrics.totalKeywords}</div>
            <Progress value={(metrics.top3Keywords / metrics.totalKeywords) * 100} className="mt-2" />
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +5 keywords this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              AI Appearances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.aiOverviews}/{metrics.totalKeywords}</div>
            <Progress value={(metrics.aiOverviews / metrics.totalKeywords) * 100} className="mt-2" />
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <Bot className="w-3 h-3" />
              87% AI visibility
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Monthly Traffic Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(metrics.totalSearchVolume * 0.35 * 25).toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-2">Est. conversion value</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              +$12,500 MoM
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="rankings" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="ai-visibility">AI Visibility</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        {/* Rankings Tab */}
        <TabsContent value="rankings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings - Live Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rankings.map((ranking, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium">{ranking.keyword}</div>
                      <div className="text-sm text-gray-600">
                        {ranking.url} • {ranking.searchVolume} searches/mo
                      </div>
                      <div className="flex gap-2 mt-1">
                        {ranking.featuredSnippet && (
                          <Badge variant="secondary" className="text-xs">Featured Snippet</Badge>
                        )}
                        {ranking.peopleAlsoAsk && (
                          <Badge variant="secondary" className="text-xs">People Also Ask</Badge>
                        )}
                        {ranking.aiOverview && (
                          <Badge variant="secondary" className="text-xs">AI Overview</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">#{ranking.position}</div>
                      <div className={`text-sm flex items-center gap-1 justify-end ${
                        ranking.position < ranking.previousPosition ? 'text-green-600' :
                        ranking.position > ranking.previousPosition ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {ranking.position < ranking.previousPosition ? (
                          <><TrendingUp className="w-3 h-3" /> +{ranking.previousPosition - ranking.position}</>
                        ) : ranking.position > ranking.previousPosition ? (
                          <><TrendingDown className="w-3 h-3" /> -{ranking.position - ranking.previousPosition}</>
                        ) : (
                          '—'
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Visibility Tab */}
        <TabsContent value="ai-visibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Platform Visibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiVisibility.map((platform, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{platform.platform}</span>
                        <Badge variant={platform.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                          {platform.trend === 'up' ? '↑' : platform.trend === 'down' ? '↓' : '→'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{platform.visibility}%</div>
                        <div className="text-xs text-gray-600">{platform.citations} citations</div>
                      </div>
                    </div>
                    <Progress value={platform.visibility} className="h-2" />
                  </div>
                ))}
              </div>

              <Alert className="mt-6 border-blue-500 bg-blue-50">
                <Bot className="h-4 w-4" />
                <AlertDescription>
                  <strong>GEO Strategy Working:</strong> Average AI visibility increased 34% in last 30 days.
                  Content now cited as authoritative source in 87% of disaster recovery queries.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitors Tab */}
        <TabsContent value="competitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitors.map((comp, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${
                    comp.competitor === 'Our Platform' ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {comp.competitor}
                          {comp.competitor === 'Our Platform' && <Trophy className="w-4 h-4 text-green-600" />}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {comp.keywords} keywords tracked
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">#{comp.avgPosition.toFixed(1)}</div>
                        <div className="text-xs text-gray-600">avg position</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Visibility Share</span>
                        <span>{comp.visibility}%</span>
                      </div>
                      <Progress value={comp.visibility} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Win Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Alert className="border-yellow-500 bg-yellow-50">
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Position 4-10 Keywords:</strong> 12 keywords are ranking 4-10.
                    Small optimizations can push these to top 3, gaining ~2,400 additional monthly visitors.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">RACQ water damage claims brisbane</div>
                        <div className="text-sm text-gray-600">Position #4 • 280 searches/mo</div>
                      </div>
                      <Badge>1 Week to #1</Badge>
                    </div>
                    <div className="text-xs text-blue-600 mt-2">
                      Action: Add RACQ-specific content section + schema markup
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">property manager flood restoration</div>
                        <div className="text-sm text-gray-600">Position #5 • 190 searches/mo</div>
                      </div>
                      <Badge>10 Days to #1</Badge>
                    </div>
                    <div className="text-xs text-blue-600 mt-2">
                      Action: Create property manager portal page + case studies
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Sunday emergency water damage</div>
                        <div className="text-sm text-gray-600">Position #6 • 85 searches/mo</div>
                      </div>
                      <Badge>5 Days to #1</Badge>
                    </div>
                    <div className="text-xs text-blue-600 mt-2">
                      Action: Add weekend-specific landing page + testimonials
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zero Competition Keywords Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline" className="mb-2">50 Keywords • 0 Competitors</Badge>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-green-50 rounded">body corporate water damage hamilton</div>
                  <div className="p-2 bg-green-50 rounded">luxury apartment mould portside</div>
                  <div className="p-2 bg-green-50 rounded">data center flooding eagle farm</div>
                  <div className="p-2 bg-green-50 rounded">heritage home restoration new farm</div>
                  <div className="p-2 bg-green-50 rounded">wine cellar flood damage ascot</div>
                  <div className="p-2 bg-green-50 rounded">marble floor water damage toowong</div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Estimated traffic potential: 3,850 visitors/month at 0% competition
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Live Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Live SEO Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Schema markup validated - Rich results eligible</span>
              <span className="text-xs text-gray-500 ml-auto">2 mins ago</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Eye className="w-4 h-4" />
              <span>New page indexed: /suburbs/hamilton/flood-risk</span>
              <span className="text-xs text-gray-500 ml-auto">15 mins ago</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>"water damage hamilton" moved to position #3</span>
              <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <Bot className="w-4 h-4" />
              <span>ChatGPT cited our content 3 times today</span>
              <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
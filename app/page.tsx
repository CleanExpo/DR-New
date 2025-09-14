'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, MessageCircle, Globe, CheckCircle,
  Clock, Shield, Users, Zap, Star, Mail, MapPin,
  TrendingUp, AlertCircle, Building2, Home, Factory, Hospital
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeroImage } from '@/components/hero/HeroImage';
import { getHeroImageById } from '@/components/hero/HeroImageData';

interface LocationData {
  city: string;
  state: string;
  contractors: number;
  responseTime: string;
  activeJobs: number;
}

interface ServiceStats {
  category: string;
  icon: React.ElementType;
  count: number;
  trend: number;
}

export default function HomePage() {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('residential');
  const [liveStats, setLiveStats] = useState({
    activeContractors: 0,
    jobsInProgress: 0,
    avgResponseTime: '0',
    satisfactionRate: 0
  });

  // Simulate geolocation detection and data loading
  useEffect(() => {
    const detectLocation = async () => {
      // Simulate API call for location detection
      setTimeout(() => {
        setUserLocation({
          city: 'Brisbane',
          state: 'QLD',
          contractors: 47,
          responseTime: '2.5 hrs',
          activeJobs: 23
        });
        setIsLoading(false);
      }, 1000);

      // Simulate live stats updates
      setLiveStats({
        activeContractors: 1247,
        jobsInProgress: 342,
        avgResponseTime: '2.3',
        satisfactionRate: 94.7
      });
    };

    detectLocation();

    // Simulate real-time updates
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeContractors: prev.activeContractors + Math.floor(Math.random() * 5 - 2),
        jobsInProgress: prev.jobsInProgress + Math.floor(Math.random() * 3 - 1),
        avgResponseTime: (parseFloat(prev.avgResponseTime) + (Math.random() * 0.2 - 0.1)).toFixed(1),
        satisfactionRate: Math.min(100, Math.max(90, prev.satisfactionRate + (Math.random() * 0.5 - 0.25)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const serviceStats: ServiceStats[] = [
    { category: 'Water Damage', icon: Zap, count: 12453, trend: 12 },
    { category: 'Fire Restoration', icon: Shield, count: 8234, trend: -5 },
    { category: 'Mould Remediation', icon: Users, count: 6789, trend: 23 },
    { category: 'Storm Recovery', icon: Clock, count: 4567, trend: 45 }
  ];

  const propertyTypes = [
    { id: 'residential', label: 'Residential', icon: Home, description: 'Homes, Units, Townhouses' },
    { id: 'commercial', label: 'Commercial', icon: Building2, description: 'Offices, Retail, Hospitality' },
    { id: 'industrial', label: 'Industrial', icon: Factory, description: 'Warehouses, Factories, Plants' },
    { id: 'institutional', label: 'Institutional', icon: Hospital, description: 'Hospitals, Schools, Government' }
  ];

  return (
    <div className="min-h-screen">
      {/* Storm Effects - BACKGROUND ONLY with negative z-index */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -10 }}
        aria-hidden="true"
      >
        {/* Storm clouds gradient - far background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-blue-900/10 to-indigo-900/10" />
        
        {/* Animated clouds - still in background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 via-slate-800/5 to-blue-900/5 animate-pulse" 
               style={{ animationDuration: '8s' }} />
        </div>
      </div>


      {/* Main Content */}
      <main className="relative" style={{ zIndex: 1 }}>
        
        {/* Hero Section with Dynamic Location Data */}
        <section className="py-20 bg-gradient-to-b from-blue-50/95 to-white/95 backdrop-blur-sm hero-gradient-overlay">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              {/* Location-Aware Header */}
              <AnimatePresence mode="wait">
                {!isLoading && userLocation && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 mb-6"
                  >
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">
                      Serving {userLocation.city}, {userLocation.state}
                    </span>
                    <Badge variant="secondary" className="ml-2">
                      {userLocation.contractors} contractors ready
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 hero-title"
              >
                <span className="text-7xl md:text-8xl font-black text-blue-600 block mb-4 tracking-tight animate-pulse" style={{ animationDuration: '3s' }}>WHO'S FIRST</span>
                Australia's #1 Digital Disaster
                <span className="block gradient-text">Recovery Platform</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-700 mb-8"
              >
                Instant connection to {liveStats.activeContractors.toLocaleString()} certified contractors nationwide.
                {userLocation && ` ${userLocation.responseTime} average response in your area.`} 100% online.
              </motion.p>

              {/* Live Statistics Bar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
              >
                <Card className="bg-white/80 backdrop-blur border-blue-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {liveStats.activeContractors.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Active Contractors</div>
                    <div className="text-xs text-green-600 mt-1">Live</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur border-green-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {liveStats.jobsInProgress}
                    </div>
                    <div className="text-sm text-gray-600">Jobs in Progress</div>
                    <div className="text-xs text-green-600 mt-1">Real-time</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur border-purple-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {liveStats.avgResponseTime}hrs
                    </div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                    <div className="text-xs text-green-600 mt-1">National</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur border-orange-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {liveStats.satisfactionRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                    <div className="text-xs text-green-600 mt-1">Verified</div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Digital Contact Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8"
              >
<Card className="card-hover glass cursor-pointer bg-white/95 overflow-hidden group">
                  <CardContent className="p-6 text-center relative">
                    <Globe className="h-10 w-10 text-green-600 mx-auto mb-3 floating" style={{ animationDelay: '0.5s' }} />
                    <h3 className="font-semibold mb-1">Online Claim</h3>
                    <p className="text-sm text-gray-700">2-minute form</p>
                    <p className="text-xs text-green-600 mt-2">Quick & Easy</p>
                  </CardContent>
                </Card>

                <Card className="card-hover glass cursor-pointer bg-white/95 overflow-hidden group">
                  <CardContent className="p-6 text-center relative">
                    <Mail className="h-10 w-10 text-purple-600 mx-auto mb-3 floating" style={{ animationDelay: '1s' }} />
                    <h3 className="font-semibold mb-1">Email Support</h3>
                    <p className="text-sm text-gray-700">Detailed help</p>
                    <p className="text-xs text-green-600 mt-2">&lt; 1hr response</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Primary CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
<Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-6 text-lg bg-white/95 border-gradient hover:scale-105 transition-all duration-300"
                  onClick={() => window.location.href = '/claim'}
                >
                  Submit Online Claim
                  <Globe className="ml-2 h-5 w-5 animate-pulse" />
                </Button>
                
                <Button 
                  size="lg" 
                  className="ml-4 px-8 py-6 text-lg bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 transition-all duration-300"
                  onClick={() => window.location.href = '/demo/workflow'}
                >
                  View Workflow Demo
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Credibility Banner */}
        <section className="py-8 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div>
                <div className="text-2xl font-bold">4,000+</div>
                <div className="text-sm opacity-90">Lives saved annually</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30" />
              <div>
                <div className="text-2xl font-bold">688</div>
                <div className="text-sm opacity-90">Mesothelioma deaths prevented</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30" />
              <div>
                <div className="text-2xl font-bold">40%</div>
                <div className="text-sm opacity-90">Increase in disasters since 2019</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30" />
              <div>
                <div className="text-2xl font-bold">3.7%</div>
                <div className="text-sm opacity-90">Master Technician elite status</div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Statistics with Trends */}
        <section className="py-20 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Real-Time Service Demand Across Australia
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {serviceStats.map((stat, index) => (
                <motion.div
                  key={stat.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <stat.icon className="h-8 w-8 text-blue-600" />
                        <div className={`flex items-center gap-1 text-sm ${
                          stat.trend > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendingUp className={`h-4 w-4 ${stat.trend < 0 ? 'rotate-180' : ''}`} />
                          {Math.abs(stat.trend)}%
                        </div>
                      </div>
                      <h3 className="font-semibold mb-1">{stat.category}</h3>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.count.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Jobs this year</p>
                      <Button
                        className="w-full mt-4"
                        variant="outline"
                        onClick={() => window.location.href = '/services'}
                      >
                        Get Help Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Complete Coverage Across Australia
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: '<10,000', label: 'IICRC Certified Contractors' },
                { value: '24/7', label: 'Digital Availability' },
                { value: '60min', label: 'Response Time' },
                { value: '100%', label: 'Online Platform' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <div className="text-blue-800">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Property Type Selector with Dynamic Content */}
        <section className="py-20 bg-gray-50/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Complete Coverage Across All Property Types
            </h2>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                {propertyTypes.map((type) => (
                  <TabsTrigger key={type.id} value={type.id} className="flex flex-col items-center gap-1 py-3">
                    <type.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {propertyTypes.map((type) => (
                <TabsContent key={type.id} value={type.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <type.icon className="h-6 w-6 text-blue-600" />
                        {type.label} Properties
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">{type.description}</p>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Specialized Equipment</h4>
                          <p className="text-sm text-gray-600">
                            Industry-specific tools and techniques for {type.label.toLowerCase()} restoration
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Certified Experts</h4>
                          <p className="text-sm text-gray-600">
                            Contractors trained in {type.label.toLowerCase()} property requirements
                          </p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Compliance Assured</h4>
                          <p className="text-sm text-gray-600">
                            Full adherence to {type.label.toLowerCase()} sector regulations
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why We're Different
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Clock, title: '24-48hr Critical', desc: 'Prevents mould growth' },
                { icon: Shield, title: '$1.37B Market', desc: 'Industry-leading standards' },
                { icon: Users, title: '<10,000 Elite', desc: 'IICRC certified in Australia' },
                { icon: Zap, title: '50%+ Time Savings', desc: 'vs rebuilding' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gray-50/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { step: '1', title: 'Report Online', desc: 'Chat, form or email' },
                { step: '2', title: 'AI Matching', desc: 'Instant contractor match' },
                { step: '3', title: 'Get Estimate', desc: 'Transparent pricing' },
                { step: '4', title: 'Work Begins', desc: 'Fast response guaranteed' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Trusted by Thousands
            </h2>
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-600 fill-current" />
              ))}
            </div>
            <p className="text-center text-lg text-gray-700 mb-12">
              4.9/5 from 10,000+ verified reviews
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  quote: "Response was incredible. Water damage fixed within hours.",
                  author: "Sarah M.",
                  location: "Brisbane",
                  service: "Water Damage"
                },
                {
                  quote: "Insurance handled perfectly. No stress, just results.",
                  author: "James C.",
                  location: "Sydney",
                  service: "Fire Restoration"
                },
                {
                  quote: "Professional, fast, and exactly as estimated.",
                  author: "Emma W.",
                  location: "Melbourne",
                  service: "Storm Recovery"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-600 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-700">{testimonial.location}</p>
                      <p className="text-xs text-blue-600 mt-1">{testimonial.service}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Emergency? Get Help Now
            </h2>
            <p className="text-xl text-blue-800 mb-8 max-w-2xl mx-auto">
              100% digital platform. No phone calls needed. 
              Connect instantly with certified professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-400 text-white px-8 py-6 text-lg"
                onClick={() => window.location.href = '/claim'}
              >
                Submit Claim Online
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
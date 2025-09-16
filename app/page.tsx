'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, MessageCircle, Globe, CheckCircle,
  Clock, Shield, Users, Zap, Star, Mail, MapPin,
  TrendingUp, AlertCircle, Building2, Home, Factory, Hospital, Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RotatingHeroBanner from '../components/hero/RotatingHeroBanner';
import EquipmentGallery from '../components/gallery/EquipmentGallery';
import ServicesGrid from '../components/services/ServicesGrid';
import ProcessShowcase from '../components/process/ProcessShowcase';

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
      {/* Main Content */}
      <main className="relative">

        {/* Rotating Hero Banner with Real Images */}
        <RotatingHeroBanner />

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

        {/* Services Grid with Real Service Images */}
        <ServicesGrid />

        {/* Equipment Gallery with Real Equipment Images */}
        <EquipmentGallery />

        {/* Process Showcase with Real Process Images */}
        <ProcessShowcase />

        {/* Trust Signals Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                Brisbane's Trusted Disaster Recovery Experts
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-700 max-w-3xl mx-auto"
              >
                Serving Brisbane, Ipswich, and Logan with professional disaster recovery services.
                IICRC certified, insurance approved, available 24/7.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
              {[
                { icon: Clock, title: '24/7 Emergency', desc: 'Always available when disaster strikes', color: 'text-red-600' },
                { icon: Shield, title: 'IICRC Certified', desc: 'Industry-leading standards & training', color: 'text-blue-600' },
                { icon: CheckCircle, title: 'Insurance Approved', desc: 'Direct billing & claim assistance', color: 'text-green-600' },
                { icon: Users, title: 'Local Experts', desc: 'Brisbane, Ipswich, Logan specialists', color: 'text-purple-600' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <feature.icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Emergency Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center bg-red-600 text-white rounded-2xl p-8 max-w-2xl mx-auto"
            >
              <AlertCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Emergency Disaster Recovery</h3>
              <p className="text-red-100 mb-6">
                Water damage? Fire damage? Mould problems? Don't wait - every minute counts!
              </p>
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-xl font-bold"
                onClick={() => window.location.href = 'tel:1300309361'}
              >
                <Phone className="w-6 h-6 mr-3" />
                Call 1300 309 361 Now
              </Button>
            </motion.div>
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
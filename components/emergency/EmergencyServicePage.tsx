'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle, Phone, Clock, CheckCircle, MapPin,
  Calendar, TrendingUp, Shield, Star, ArrowRight,
  Zap, Users, Award, AlertTriangle, PhoneCall
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Testimonial {
  author: string;
  location: string;
  content: string;
  time: string;
}

interface Competitor {
  name: string;
  sundayService?: boolean;
  responseTime: string;
  surcharge?: string;
  highlighted?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

interface EmergencyServicePageProps {
  title: string;
  subtitle: string;
  emergencyType: 'sunday' | 'after-hours' | 'public-holiday' | '3am' | 'weekend';
  service: string;
  location: string;
  urgencyMessage: string;
  responseTime: string;
  availability: string;
  features: string[];
  testimonials: Testimonial[];
  competitors?: Competitor[];
  faqs: FAQ[];
}

export default function EmergencyServicePage({
  title,
  subtitle,
  emergencyType,
  service,
  location,
  urgencyMessage,
  responseTime,
  availability,
  features,
  testimonials,
  competitors,
  faqs
}: EmergencyServicePageProps) {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isUrgent, setIsUrgent] = useState(true);
  const [liveViewers, setLiveViewers] = useState(Math.floor(Math.random() * 10) + 5);

  // Countdown timer for urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          return 3600; // Reset
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate live viewers
    const viewerTimer = setInterval(() => {
      setLiveViewers(prev => Math.max(3, prev + Math.floor(Math.random() * 5) - 2));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(viewerTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const emergencyIcons = {
    'sunday': Calendar,
    'after-hours': Clock,
    'public-holiday': Calendar,
    '3am': Clock,
    'weekend': Calendar
  };

  const EmergencyIcon = emergencyIcons[emergencyType];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-gray-50">
      {/* Urgent Header Bar */}
      <div className="bg-red-700 text-white py-2 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">EMERGENCY SERVICE AVAILABLE NOW</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{liveViewers} people viewing</span>
              <Badge className="bg-yellow-400 text-black">
                <Clock className="w-3 h-3 mr-1" />
                Responding in {responseTime}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Emergency Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6"
            >
              <EmergencyIcon className="w-5 h-5" />
              <span className="font-semibold uppercase tracking-wide">{emergencyType.replace('-', ' ')} Emergency</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-700 mb-8"
            >
              {subtitle}
            </motion.p>

            {/* Urgency Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600 animate-pulse" />
                <p className="text-lg font-semibold text-gray-900">{urgencyMessage}</p>
              </div>

              {/* Countdown Timer */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Damage increases every minute. Act now:</p>
                <div className="text-3xl font-mono font-bold text-red-600">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-800 text-white px-8 py-6 text-xl"
                onClick={() => window.location.href = 'tel:1300309361'}
              >
                <PhoneCall className="w-6 h-6 mr-2 animate-pulse" />
                Call 1300 309 361 NOW
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-700 text-blue-600 hover:bg-blue-50 px-8 py-6 text-xl"
              >
                Start Online Claim
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Badge className="px-3 py-1 bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                {availability}
              </Badge>
              <Badge className="px-3 py-1 bg-blue-100 text-blue-800">
                <Shield className="w-4 h-4 mr-1" />
                Insurance Approved
              </Badge>
              <Badge className="px-3 py-1 bg-purple-100 text-purple-800">
                <Award className="w-4 h-4 mr-1" />
                IICRC Certified
              </Badge>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why We\'re {location}\'s #1 {emergencyType.replace('-', ' ')} Service
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      {competitors && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Compare {emergencyType.replace('-', ' ')} Services
            </h2>

            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left">Company</th>
                    <th className="px-6 py-4 text-center">{emergencyType} Service</th>
                    <th className="px-6 py-4 text-center">Response Time</th>
                    <th className="px-6 py-4 text-center">Surcharge</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp, index) => (
                    <tr
                      key={index}
                      className={comp.highlighted ? 'bg-green-50 font-semibold' : ''}
                    >
                      <td className="px-6 py-4">
                        {comp.name}
                        {comp.highlighted && (
                          <Badge className="ml-2 bg-green-600 text-white">BEST VALUE</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {comp.sundayService ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-red-600">✗</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">{comp.responseTime}</td>
                      <td className="px-6 py-4 text-center">
                        {comp.surcharge || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Recent {emergencyType.replace('-', ' ')} Emergencies We\'ve Handled
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                    <div className="border-t pt-3">
                      <p className="font-semibold">{testimonial.author}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{testimonial.location}</span>
                        <span>•</span>
                        <span>{testimonial.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            {emergencyType.replace('-', ' ')} Service FAQs
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                      <span className="text-blue-600">Q:</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-gray-700 pl-6">
                      <span className="text-green-600 font-semibold">A:</span> {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-red-700 to-red-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don\'t Wait - {emergencyType.replace('-', ' ')} Damage Gets Worse Every Hour
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Our {location} team is standing by RIGHT NOW
          </p>
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 px-10 py-6 text-xl font-bold"
            onClick={() => window.location.href = 'tel:1300309361'}
          >
            <Phone className="w-6 h-6 mr-2" />
            Call 1300 309 361 - We\'re Ready
          </Button>
          <p className="text-red-100 mt-4">
            Average response time: {responseTime}
          </p>
        </div>
      </section>
    </div>
  );
}
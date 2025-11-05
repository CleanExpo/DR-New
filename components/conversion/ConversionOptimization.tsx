'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, X, AlertCircle, Clock, Users, CheckCircle,
  MessageCircle, ArrowRight, Zap, Shield, TrendingUp,
  PhoneCall, Calendar, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ConversionOptimizationProps {
  showExitIntent?: boolean;
  showStickyBar?: boolean;
  showLiveCounter?: boolean;
  showSocialProof?: boolean;
}

export default function ConversionOptimization({
  showExitIntent = true,
  showStickyBar = true,
  showLiveCounter = true,
  showSocialProof = true
}: ConversionOptimizationProps) {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [urgencyTimer, setUrgencyTimer] = useState(900); // 15 minutes
  const [liveVisitors, setLiveVisitors] = useState(Math.floor(Math.random() * 20) + 10);
  const [recentActivity, setRecentActivity] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Exit intent detection
  useEffect(() => {
    if (!showExitIntent) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exitIntentShown')) {
        setShowExitPopup(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showExitIntent]);

  // Sticky bar scroll detection
  useEffect(() => {
    if (!showStickyBar) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 500;
      setShowSticky(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showStickyBar]);

  // Urgency countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer(prev => {
        if (prev <= 0) return 900; // Reset
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Live visitor counter simulation
  useEffect(() => {
    if (!showLiveCounter) return;

    const interval = setInterval(() => {
      setLiveVisitors(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(5, Math.min(50, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [showLiveCounter]);

  // Social proof notifications
  useEffect(() => {
    if (!showSocialProof) return;

    const activities = [
      { type: 'claim', location: 'Brisbane CBD', service: 'Water Damage', time: 'just now' },
      { type: 'booking', location: 'Ipswich', service: 'Emergency Restoration', time: '2 mins ago' },
      { type: 'review', location: 'Logan', rating: 5, time: '5 mins ago' },
      { type: 'response', location: 'Gold Coast', responseTime: '28 minutes', time: '8 mins ago' },
      { type: 'completion', location: 'West End', service: 'Mould Remediation', time: '12 mins ago' }
    ];

    const showActivity = () => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      setRecentActivity(randomActivity);
      setShowNotification(true);

      setTimeout(() => setShowNotification(false), 5000);
    };

    const interval = setInterval(showActivity, 30000); // Every 30 seconds
    setTimeout(showActivity, 5000); // First one after 5 seconds

    return () => clearInterval(interval);
  }, [showSocialProof]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[100]"
              onClick={() => setShowExitPopup(false)}
            />

            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[101] max-w-lg w-full mx-4"
            >
              <Card className="bg-white shadow-2xl border-0">
                <button
                  onClick={() => setShowExitPopup(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>

                <CardContent className="p-8 text-centre">
                  {/* Emergency Icon */}
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-centre justify-centre mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-600 animate-pulse" />
                  </div>

                  {/* Headline */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    WAIT! Emergency Assistance Available NOW
                  </h2>

                  {/* Subheadline */}
                  <p className="text-lg text-gray-700 mb-6">
                    Don\'t let damage get worse. Our emergency team is standing by to help immediately.
                  </p>

                  {/* Urgency Box */}
                  <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6">
                    <div className="flex items-centre justify-centre gap-2 mb-2">
                      <Clock className="w-5 h-5 text-yellow-600 animate-pulse" />
                      <span className="font-semibold text-gray-900">Limited Time Offer</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600">{formatTimer(urgencyTimer)}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      FREE Emergency Assessment (Value $299)
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6 text-left">
                    <div className="flex items-centre gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Response within 45 minutes</span>
                    </div>
                    <div className="flex items-centre gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Insurance claim assistance included</span>
                    </div>
                    <div className="flex items-centre gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>No call-out fees - ever</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-xl"
                      onClick={() => window.location.href = 'tel:1300309361'}
                    >
                      <PhoneCall className="w-6 h-6 mr-2 animate-pulse" />
                      Call 1300 309 361 NOW
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setShowExitPopup(false);
                        window.location.href = '/claim';
                      }}
                    >
                      Start Online Claim Instead
                    </Button>
                  </div>

                  {/* Trust Indicator */}
                  <p className="text-xs text-gray-500 mt-4">
                    Trusted by 10,000+ Brisbane residents • Available 24/7
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sticky CTA Bar */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col md:flex-row items-centre justify-between gap-4">
                {/* Left Side - Message */}
                <div className="flex items-centre gap-4">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Zap className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Emergency? We\'re Ready NOW!</p>
                    <p className="text-sm text-blue-100">
                      {liveVisitors} people viewing • Average response: 32 mins
                    </p>
                  </div>
                </div>

                {/* Right Side - CTAs */}
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => window.location.href = 'tel:1300309361'}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Visitor Counter (Fixed Position) */}
      {showLiveCounter && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="fixed bottom-24 left-4 z-40 bg-white rounded-lg shadow-xl p-4 max-w-xs"
        >
          <div className="flex items-centre gap-3">
            <div className="relative">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {liveVisitors} Active Visitors
              </p>
              <p className="text-xs text-gray-600">
                Viewing disaster recovery services
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Social Proof Notifications */}
      <AnimatePresence>
        {showNotification && recentActivity && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-24 right-4 z-40 max-w-sm"
          >
            <Card className="bg-white shadow-xl border-green-500 border-2">
              <CardContent className="p-4">
                {recentActivity.type === 'claim' && (
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        New Emergency Claim
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {recentActivity.service} in {recentActivity.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {recentActivity.time}
                      </p>
                    </div>
                  </div>
                )}

                {recentActivity.type === 'booking' && (
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Service Booked
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {recentActivity.service} in {recentActivity.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {recentActivity.time}
                      </p>
                    </div>
                  </div>
                )}

                {recentActivity.type === 'review' && (
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <TrendingUp className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        New 5-Star Review
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Customer in {recentActivity.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {recentActivity.time}
                      </p>
                    </div>
                  </div>
                )}

                {recentActivity.type === 'response' && (
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Rapid Response
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Team deployed to {recentActivity.location}
                      </p>
                      <p className="text-xs text-green-600 font-semibold mt-1">
                        Response: {recentActivity.responseTime}
                      </p>
                    </div>
                  </div>
                )}

                {recentActivity.type === 'completion' && (
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Job Completed
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {recentActivity.service} in {recentActivity.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {recentActivity.time}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Urgency Timer Badge (Top of Page) */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
        <Badge className="bg-red-600 text-white px-4 py-2 text-sm">
          <Clock className="w-4 h-4 mr-2 animate-pulse" />
          Offer expires in: {formatTimer(urgencyTimer)}
        </Badge>
      </div>
    </>
  );
}
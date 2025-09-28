'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, CheckCircle, TrendingUp, Award, ThumbsUp, Calendar, MapPin, Briefcase, Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  content: string;
  verified: boolean;
  insuranceClaim?: boolean;
  responseTime?: string;
  beforeImage?: string;
  afterImage?: string;
  video?: string;
  helpfulCount: number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Mitchell',
    location: 'Brisbane CBD',
    rating: 5,
    date: '2 days ago',
    service: 'Water Damage Restoration',
    content: 'Exceptional service! Our office flooded during the recent storms and the team arrived within 2 hours. They saved our business from weeks of downtime. The insurance claim was handled flawlessly.',
    verified: true,
    insuranceClaim: true,
    responseTime: '2 hours',
    helpfulCount: 47
  },
  {
    id: '2',
    author: 'Michael Chen',
    location: 'Ipswich',
    rating: 5,
    date: '1 week ago',
    service: 'Fire Damage Restoration',
    content: 'After our kitchen fire, I was devastated. The team not only restored our home but provided emotional support throughout. They worked directly with NRMA Insurance - zero stress for us.',
    verified: true,
    insuranceClaim: true,
    responseTime: '1 hour',
    helpfulCount: 89
  },
  {
    id: '3',
    author: 'Emma Thompson',
    location: 'Logan',
    rating: 5,
    date: '2 weeks ago',
    service: 'Mould Remediation',
    content: 'Professional, thorough, and honest. They found mould issues we didn\'t even know about and fixed everything. My family\'s health improved dramatically after their work.',
    verified: true,
    responseTime: '4 hours',
    helpfulCount: 156
  },
  {
    id: '4',
    author: 'James Wilson',
    location: 'Gold Coast',
    rating: 5,
    date: '3 weeks ago',
    service: 'Storm Damage Repair',
    content: 'Cyclone damage repaired faster than any other quote. They handled everything from tarping to full restoration. Suncorp insurance approved immediately.',
    verified: true,
    insuranceClaim: true,
    responseTime: '45 minutes',
    helpfulCount: 234
  },
  {
    id: '5',
    author: 'Lisa Anderson',
    location: 'Sunshine Coast',
    rating: 5,
    date: '1 month ago',
    service: 'Sewage Cleanup',
    content: 'Nobody wants to deal with sewage backup, but these guys made it bearable. Fast, professional, and left our home cleaner than before the incident.',
    verified: true,
    responseTime: '1.5 hours',
    helpfulCount: 67
  }
];

export default function ReviewDisplay() {
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>(mockReviews.slice(0, 3));
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showNotification, setShowNotification] = useState(false);
  const [latestReview, setLatestReview] = useState<Review | null>(null);
  // TODO: Replace with actual review data from database/API
  const [averageRating] = useState(0); // Placeholder - needs real data
  const [totalReviews] = useState(0); // Placeholder - needs real data
  const [reviewStats] = useState({
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0
  });

  // Simulate real-time review notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomReview = mockReviews[Math.floor(Math.random() * mockReviews.length)];
      setLatestReview(randomReview);
      setShowNotification(true);

      setTimeout(() => setShowNotification(false), 5000);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const services = [
    'all',
    'Water Damage',
    'Fire Damage',
    'Mould Remediation',
    'Storm Damage',
    'Emergency Services'
  ];

  const filterReviews = (service: string) => {
    setSelectedFilter(service);
    if (service === 'all') {
      setDisplayedReviews(mockReviews);
    } else {
      setDisplayedReviews(mockReviews.filter(r =>
        r.service.toLowerCase().includes(service.toLowerCase())
      ));
    }
  };

  return (
    <>
      {/* Real-time Review Notification */}
      <AnimatePresence>
        {showNotification && latestReview && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed bottom-4 right-4 z-50 max-w-sm"
          >
            <Card className="bg-white shadow-xl border-green-500 border-2">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">New 5-Star Review!</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {latestReview.author} in {latestReview.location}
                    </p>
                    <p className="text-xs text-gray-700 mt-1 line-clamp-2">
                      "{latestReview.content.substring(0, 80)}..."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Review Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Review Header with Aggregate Rating */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              {totalReviews > 0 ? `Trusted by ${totalReviews.toLocaleString()} Australians` : 'Customer Reviews'}
            </motion.h2>

            {/* Aggregate Rating Display */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-900 mb-2">{averageRating}</div>
                <div className="flex justify-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.floor(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                  ))}
                </div>
                {totalReviews > 0 && <p className="text-sm text-gray-600">{totalReviews.toLocaleString()} verified reviews</p>}
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2 min-w-[300px]">
                {Object.entries(reviewStats).map(([key, value], index) => {
                  const starCount = 5 - index;
                  const percentage = (value / totalReviews) * 100;
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-12">{starCount} star</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="bg-yellow-500 h-full rounded-full"
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="px-4 py-2 bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-2" />
                Verified Reviews
              </Badge>
              <Badge className="px-4 py-2 bg-blue-100 text-blue-800">
                <Shield className="w-4 h-4 mr-2" />
                Google Reviews Partner
              </Badge>
              <Badge className="px-4 py-2 bg-purple-100 text-purple-800">
                <Award className="w-4 h-4 mr-2" />
                Top Rated 2024
              </Badge>
            </div>
          </div>

          {/* Service Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {services.map(service => (
              <Button
                key={service}
                variant={selectedFilter === service ? 'default' : 'outline'}
                size="sm"
                onClick={() => filterReviews(service)}
                className="capitalize"
              >
                {service === 'all' ? 'All Services' : service}
              </Button>
            ))}
          </div>

          {/* Review Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AnimatePresence mode="wait">
              {displayedReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{review.author}</h4>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{review.location}</span>
                            <span>•</span>
                            <Calendar className="w-3 h-3" />
                            <span>{review.date}</span>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>

                      {/* Service Badge */}
                      <Badge className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {review.service}
                      </Badge>

                      {/* Review Content */}
                      <Quote className="w-6 h-6 text-gray-300 mb-2" />
                      <p className="text-gray-700 text-sm mb-4 line-clamp-4">
                        {review.content}
                      </p>

                      {/* Additional Info */}
                      <div className="space-y-2 border-t pt-4">
                        {review.responseTime && (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <AlertCircle className="w-3 h-3 text-green-600" />
                            <span>Response time: <strong>{review.responseTime}</strong></span>
                          </div>
                        )}
                        {review.insuranceClaim && (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Shield className="w-3 h-3 text-blue-600" />
                            <span>Insurance claim handled</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-2">
                          <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600">
                            <ThumbsUp className="w-3 h-3" />
                            <span>Helpful ({review.helpfulCount})</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Button */}
          <div className="text-center">
            <Button size="lg" variant="outline">
              Load More Reviews
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
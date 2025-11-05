'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, MapPin, Calendar, Shield, Award, CheckCircle, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface VideoTestimonial {
  id: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  author: string;
  location: string;
  service: string;
  date: string;
  rating: number;
  title: string;
  views: number;
  transcriptHighlight: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: '1',
    thumbnail: '/images/testimonials/flood-recovery-thumb.jpg',
    videoUrl: '#',
    duration: '2:45',
    author: 'David & Sarah Johnson',
    location: 'Brisbane River, QLD',
    service: 'Flood Recovery',
    date: '2024 Floods',
    rating: 5,
    title: 'From Devastation to Restoration in 48 Hours',
    views: 15234,
    transcriptHighlight: 'They saved our family home. When the Brisbane River flooded, we thought we\'d lost everything. The team arrived within hours and had our home livable again in just 2 days.'
  },
  {
    id: '2',
    thumbnail: '/images/testimonials/restaurant-fire-thumb.jpg',
    videoUrl: '#',
    duration: '3:12',
    author: 'Marco Rossi',
    location: 'Fortitude Valley, Brisbane',
    service: 'Fire Damage Restoration',
    date: 'November 2024',
    rating: 5,
    title: 'Restaurant Back in Business in 1 Week',
    views: 8956,
    transcriptHighlight: 'My restaurant had a kitchen fire. Insurance said 3 months to reopen. These guys had us serving customers again in 7 days. Incredible!'
  },
  {
    id: '3',
    thumbnail: '/images/testimonials/office-mould-thumb.jpg',
    videoUrl: '#',
    duration: '1:58',
    author: 'Jennifer Chen',
    location: 'CBD Brisbane',
    service: 'Mould Remediation',
    date: 'October 2024',
    rating: 5,
    title: 'Office Mould Crisis Solved Overnight',
    views: 6234,
    transcriptHighlight: 'Staff were getting sick from hidden mould. They found it, fixed it, and had our office safe by morning. Zero downtime for our business.'
  },
  {
    id: '4',
    thumbnail: '/images/testimonials/storm-damage-thumb.jpg',
    videoUrl: '#',
    duration: '2:30',
    author: 'The Wilson Family',
    location: 'Logan, QLD',
    service: 'Storm Damage',
    date: 'September 2024',
    rating: 5,
    title: 'Storm Recovery Heroes',
    views: 12567,
    transcriptHighlight: 'Tree through the roof at 2am. They were here by 3am with tarps. Full repairs done in 3 days. Amazing emergency response!'
  }
];

export default function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-centre mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-centre gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-4"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-sm font-semibold">Real Stories, Real Results</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            See What Our Clients Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Watch real testimonials from Brisbane, Ipswich, and Logan residents whose properties we\'ve restored
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-centre gap-4 mt-8"
          >
            <Badge className="px-4 py-2 bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-2" />
              All Stories Verified
            </Badge>
            <Badge className="px-4 py-2 bg-blue-100 text-blue-800">
              <Shield className="w-4 h-4 mr-2" />
              Insurance Approved Work
            </Badge>
            <Badge className="px-4 py-2 bg-purple-100 text-purple-800">
              <Award className="w-4 h-4 mr-2" />
              50,000+ Views
            </Badge>
          </motion.div>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {videoTestimonials.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => {
                      setSelectedVideo(video);
                      setIsPlaying(true);
                    }}
                    className="absolute inset-0 z-20 flex items-centre justify-centre group/play"
                  >
                    <div className="bg-white/90 group-hover/play:bg-white group-hover/play:scale-110 transition-all duration-300 rounded-full p-5 shadow-2xl">
                      <Play className="w-8 h-8 text-red-600 ml-1" />
                    </div>
                  </button>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>

                  {/* Service Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-blue-600 text-white border-0">
                      {video.service}
                    </Badge>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                    <h3 className="font-bold text-lg mb-1">{video.title}</h3>
                    <div className="flex items-centre gap-4 text-sm">
                      <div className="flex items-centre gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{video.location}</span>
                      </div>
                      <div className="flex items-centre gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{video.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Placeholder for actual video thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90" />
                </div>

                <CardContent className="p-6">
                  {/* Author Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{video.author}</h4>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{video.views.toLocaleString()} views</p>
                    </div>
                  </div>

                  {/* Transcript Highlight */}
                  <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700 text-sm">
                    "{video.transcriptHighlight}"
                  </blockquote>

                  {/* Watch Button */}
                  <Button
                    className="w-full mt-4"
                    variant="outline"
                    onClick={() => {
                      setSelectedVideo(video);
                      setIsPlaying(true);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Full Testimonial
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-centre mt-12"
        >
          <p className="text-lg text-gray-700 mb-6">
            Join thousands of satisfied customers across Brisbane, Ipswich, and Logan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-centre">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Get Emergency Help Now
            </Button>
            <Button size="lg" variant="outline">
              Read More Reviews
            </Button>
          </div>
        </motion.div>

        {/* Video Modal (Placeholder) */}
        {selectedVideo && isPlaying && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-centre justify-centre p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => {
                  setSelectedVideo(null);
                  setIsPlaying(false);
                }}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                Close
              </button>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-centre justify-centre">
                <p className="text-white">Video Player Placeholder</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
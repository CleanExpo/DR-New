'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  name: string;
  location: string;
  service: string;
  time: string;
  type: 'booking' | 'completion' | 'review';
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    name: 'Sarah M.',
    location: 'Hamilton',
    service: 'Water Damage Restoration',
    time: '2 minutes ago',
    type: 'booking',
  },
  {
    id: '2',
    name: 'David K.',
    location: 'Ascot',
    service: 'Fire Damage Assessment',
    time: '8 minutes ago',
    type: 'booking',
  },
  {
    id: '3',
    name: 'Emma L.',
    location: 'New Farm',
    service: 'Mould Remediation',
    time: '15 minutes ago',
    type: 'completion',
  },
  {
    id: '4',
    name: 'Michael R.',
    location: 'Toowong',
    service: 'Emergency Water Extraction',
    time: '23 minutes ago',
    type: 'review',
  },
  {
    id: '5',
    name: 'Jessica P.',
    location: 'Brisbane CBD',
    service: 'Storm Damage Repair',
    time: '31 minutes ago',
    type: 'booking',
  },
  {
    id: '6',
    name: 'Robert T.',
    location: 'Fortitude Valley',
    service: 'Water Damage Emergency',
    time: '45 minutes ago',
    type: 'completion',
  },
  {
    id: '7',
    name: 'Amanda B.',
    location: 'Karalee',
    service: 'Fire Damage Restoration',
    time: '1 hour ago',
    type: 'booking',
  },
  {
    id: '8',
    name: 'Chris H.',
    location: 'Springfield Lakes',
    service: 'Mould Inspection',
    time: '1 hour ago',
    type: 'review',
  },
];

interface SocialProofProps {
  enabled?: boolean;
  interval?: number;
  displayDuration?: number;
  position?: 'bottom-left' | 'bottom-right';
  className?: string;
}

export function SocialProof({
  enabled = true,
  interval = 8000,
  displayDuration = 5000,
  position = 'bottom-left',
  className = '',
}: SocialProofProps) {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [notificationQueue, setNotificationQueue] = useState<Notification[]>([...SAMPLE_NOTIFICATIONS]);

  useEffect(() => {
    if (!enabled) {return;}

    const showNextNotification = () => {
      if (notificationQueue.length === 0) {
        setNotificationQueue([...SAMPLE_NOTIFICATIONS]);
        return;
      }

      const [next, ...rest] = notificationQueue;
      setCurrentNotification(next);
      setNotificationQueue(rest);

      setTimeout(() => {
        setCurrentNotification(null);
      }, displayDuration);
    };

    // Show first notification after a short delay
    const initialTimeout = setTimeout(showNextNotification, 3000);

    // Then show subsequent notifications at intervals
    const intervalId = setInterval(showNextNotification, interval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [enabled, interval, displayDuration, notificationQueue]);

  const getNotificationConfig = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return {
          icon: <Clock className="w-5 h-5 text-primary-600" />,
          bgColor: 'bg-primary-50',
          borderColor: 'border-primary-200',
          action: 'just booked',
        };
      case 'completion':
        return {
          icon: <CheckCircle className="w-5 h-5 text-success-600" />,
          bgColor: 'bg-success-50',
          borderColor: 'border-success-200',
          action: 'completed service',
        };
      case 'review':
        return {
          icon: (
            <svg className="w-5 h-5 text-premium-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ),
          bgColor: 'bg-premium-50',
          borderColor: 'border-premium-200',
          action: 'left 5-star review',
        };
    }
  };

  const positionClasses = {
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
  };

  if (!enabled) {return null;}

  return (
    <AnimatePresence>
      {currentNotification && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-40 max-w-sm ${className}`}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div
            className={`bg-white border-2 ${
              getNotificationConfig(currentNotification.type).borderColor
            } rounded-xl shadow-2xl overflow-hidden`}
          >
            <div
              className={`${
                getNotificationConfig(currentNotification.type).bgColor
              } px-4 py-3 border-b ${
                getNotificationConfig(currentNotification.type).borderColor
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {getNotificationConfig(currentNotification.type).icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-neutral-900 truncate">
                    {currentNotification.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <MapPin className="w-3 h-3" />
                    <span>{currentNotification.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-white">
              <p className="text-sm text-neutral-700 mb-2">
                <span className="font-semibold">
                  {getNotificationConfig(currentNotification.type).action}
                </span>
                {' for '}
                <span className="text-neutral-900">{currentNotification.service}</span>
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">{currentNotification.time}</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                  <span className="text-xs text-success-700 font-medium">Verified</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <motion.div
              className="h-1 bg-primary-600"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: displayDuration / 1000, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Stats Banner variant
interface StatsBannerProps {
  className?: string;
}

export function StatsBanner({ className = '' }: StatsBannerProps) {
  return (
    <div className={`bg-gradient-to-r from-primary-600 to-primary-700 ${className}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-4xl font-bold mb-2">10,000+</div>
            <div className="text-primary-100 text-sm">Customers Served</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-primary-100 text-sm">Emergency Response</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-4xl font-bold mb-2">60 min</div>
            <div className="text-primary-100 text-sm">Average Response Time</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-4xl font-bold mb-2">5.0 ⭐</div>
            <div className="text-primary-100 text-sm">Customer Rating</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

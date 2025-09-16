'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversionTracking } from '@/lib/conversion-tracking';

// Types for notifications
interface Notification {
  id: string;
  type: 'service_request' | 'review' | 'emergency_call' | 'quote' | 'completion';
  name: string;
  location: string;
  service?: string;
  timeAgo: string;
  rating?: number;
  message?: string;
}

// Recent Activity Notification - Shows real-time customer activities
export function RecentActivityNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const { trackEngagement } = useConversionTracking();

  useEffect(() => {
    // Generate realistic notifications
    const generateNotification = (): Notification => {
      const types: Notification['type'][] = ['service_request', 'review', 'emergency_call', 'quote', 'completion'];
      const type = types[Math.floor(Math.random() * types.length)];

      const names = [
        'Sarah M.', 'John D.', 'Emily W.', 'Michael R.', 'Lisa K.',
        'David C.', 'Jennifer S.', 'Robert L.', 'Amanda H.', 'Chris B.'
      ];

      const locations = [
        'Brisbane CBD', 'Spring Hill', 'Fortitude Valley', 'New Farm', 'Kangaroo Point',
        'Ipswich Central', 'Springfield', 'Logan Central', 'Woolloongabba', 'West End',
        'Toowong', 'St Lucia', 'Indooroopilly', 'Carindale', 'Chermside'
      ];

      const services = [
        'Water Damage Restoration', 'Fire Damage Cleanup', 'Mould Remediation',
        'Emergency Flood Response', 'Storm Damage Repair', 'Sewage Cleanup'
      ];

      const timeOptions = ['2 mins', '5 mins', '12 mins', '18 mins', '25 mins', '37 mins', '45 mins', '1 hour'];

      const notification: Notification = {
        id: `notif_${Date.now()}_${Math.random()}`,
        type,
        name: names[Math.floor(Math.random() * names.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        timeAgo: timeOptions[Math.floor(Math.random() * timeOptions.length)]
      };

      if (type === 'service_request' || type === 'emergency_call' || type === 'quote') {
        notification.service = services[Math.floor(Math.random() * services.length)];
      }

      if (type === 'review') {
        notification.rating = 5;
        const reviews = [
          'Excellent emergency response!',
          'Saved our home from water damage',
          'Professional and fast service',
          'Highly recommend for emergencies',
          'They arrived within 30 minutes!'
        ];
        notification.message = reviews[Math.floor(Math.random() * reviews.length)];
      }

      return notification;
    };

    // Initial notifications
    const initial: Notification[] = [];
    for (let i = 0; i < 5; i++) {
      initial.push(generateNotification());
    }
    setNotifications(initial);

    // Show notifications in rotation
    let index = 0;
    const showNotification = () => {
      setCurrentNotification(notifications[index % notifications.length]);
      index++;
      trackEngagement('social_proof_notification_shown');

      // Add new notification occasionally
      if (Math.random() > 0.7) {
        setNotifications(prev => [...prev.slice(-10), generateNotification()]);
      }
    };

    // Start after 3 seconds
    const initialTimer = setTimeout(() => {
      showNotification();
      const interval = setInterval(showNotification, 8000);

      return () => clearInterval(interval);
    }, 3000);

    return () => clearTimeout(initialTimer);
  }, [trackEngagement]);

  const getNotificationContent = (notification: Notification) => {
    switch (notification.type) {
      case 'service_request':
        return (
          <>
            <strong>{notification.name}</strong> from {notification.location} just requested{' '}
            <strong>{notification.service}</strong>
          </>
        );
      case 'emergency_call':
        return (
          <>
            <strong>{notification.name}</strong> from {notification.location} called for{' '}
            <strong>emergency assistance</strong>
          </>
        );
      case 'review':
        return (
          <>
            <strong>{notification.name}</strong> from {notification.location} left a{' '}
            <strong>5-star review</strong>: "{notification.message}"
          </>
        );
      case 'quote':
        return (
          <>
            <strong>{notification.name}</strong> from {notification.location} requested a quote for{' '}
            <strong>{notification.service}</strong>
          </>
        );
      case 'completion':
        return (
          <>
            Successfully completed <strong>{notification.service}</strong> for{' '}
            <strong>{notification.name}</strong> in {notification.location}
          </>
        );
      default:
        return null;
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'service_request':
      case 'quote':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
          </svg>
        );
      case 'emergency_call':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        );
      case 'review':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      case 'completion':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <AnimatePresence>
      {currentNotification && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100, y: 0 }}
          className="fixed bottom-20 left-4 z-50 max-w-md"
        >
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                {getNotificationIcon(currentNotification.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  {getNotificationContent(currentNotification)}
                </p>
                <p className="text-xs text-gray-500 mt-1">{currentNotification.timeAgo} ago</p>
              </div>
              <button
                onClick={() => setCurrentNotification(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Live Visitor Counter
export function LiveVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(127);
  const [trend, setTrend] = useState<'up' | 'down'>('up');
  const { trackEngagement } = useConversionTracking();

  useEffect(() => {
    trackEngagement('live_visitor_counter_viewed');

    const interval = setInterval(() => {
      setVisitorCount(prev => {
        const change = Math.floor(Math.random() * 10) - 3;
        const newCount = Math.max(50, Math.min(500, prev + change));
        setTrend(newCount > prev ? 'up' : 'down');
        return newCount;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [trackEngagement]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 rounded-lg p-3"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">
            <span className="text-2xl font-bold text-green-600">{visitorCount}</span> people viewing this site now
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {trend === 'up' ? '↑' : '↓'} {Math.abs(visitorCount - 100)}% higher than average
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Trust Badge Display
export function TrustBadges() {
  const badges = [
    { name: 'Google Reviews', rating: '4.9', count: '847' },
    { name: 'Facebook', rating: '4.8', count: '623' },
    { name: 'Trustpilot', rating: '4.9', count: '412' }
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {badges.map((badge) => (
        <motion.div
          key={badge.name}
          whileHover={{ scale: 1.05 }}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <div className="text-yellow-500 flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-sm">
              <p className="font-bold text-gray-900">{badge.rating}</p>
              <p className="text-xs text-gray-600">{badge.count} reviews</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Recently Helped Section
export function RecentlyHelped() {
  const [customers, setCustomers] = useState<Array<{
    name: string;
    location: string;
    service: string;
    timeAgo: string;
  }>>([]);

  useEffect(() => {
    const generateCustomers = () => {
      const services = [
        'Water Damage Restoration', 'Fire Damage Cleanup', 'Mould Remediation',
        'Storm Damage Repair', 'Sewage Cleanup', 'Emergency Flood Response'
      ];

      const locations = [
        'Brisbane CBD', 'Spring Hill', 'Fortitude Valley', 'New Farm',
        'Ipswich', 'Logan', 'Woolloongabba', 'West End'
      ];

      const names = ['S. Mitchell', 'J. Davidson', 'M. Roberts', 'L. Chen', 'A. Wilson'];

      return Array.from({ length: 5 }, (_, i) => ({
        name: names[i],
        location: locations[Math.floor(Math.random() * locations.length)],
        service: services[Math.floor(Math.random() * services.length)],
        timeAgo: `${Math.floor(Math.random() * 48) + 1} hours ago`
      }));
    };

    setCustomers(generateCustomers());

    const interval = setInterval(() => {
      setCustomers(generateCustomers());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recently Helped</h3>
      <div className="space-y-3">
        {customers.map((customer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <strong>{customer.name}</strong> - {customer.service}
              </p>
              <p className="text-xs text-gray-600">
                {customer.location} • {customer.timeAgo}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversionTracking } from '@/lib/conversion-tracking';

// Countdown Timer Component - Creates FOMO with time-limited offers
export function CountdownTimer({
  endTime,
  offerText = "Emergency Response Special Offer Expires In",
  onExpire
}: {
  endTime: Date;
  offerText?: string;
  onExpire?: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);
  const { trackEngagement } = useConversionTracking();

  useEffect(() => {
    trackEngagement('countdown_timer_viewed');

    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setIsExpired(true);
        if (onExpire) onExpire();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime, onExpire, trackEngagement]);

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-600 text-white p-4 rounded-xl text-center"
      >
        <p className="font-bold text-lg">Offer Expired!</p>
        <p className="text-sm mt-1">Call now for current emergency rates: 1300 309 361</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-2xl shadow-2xl"
    >
      <div className="text-center">
        <p className="text-sm font-semibold mb-3 uppercase tracking-wider">{offerText}</p>
        <div className="flex justify-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[80px]">
            <div className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs uppercase">Hours</div>
          </div>
          <div className="flex items-center text-2xl font-bold">:</div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[80px]">
            <div className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs uppercase">Minutes</div>
          </div>
          <div className="flex items-center text-2xl font-bold">:</div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[80px]">
            <div className="text-3xl font-bold animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs uppercase">Seconds</div>
          </div>
        </div>
        <p className="text-sm mt-4 font-medium animate-pulse">
          Save 20% on emergency callout fees - Limited time only!
        </p>
      </div>
    </motion.div>
  );
}

// Limited Availability Indicator - Shows scarcity of response teams
export function AvailabilityIndicator() {
  const [availableTeams, setAvailableTeams] = useState(2);
  const [totalCalls, setTotalCalls] = useState(47);
  const { trackEngagement } = useConversionTracking();

  useEffect(() => {
    trackEngagement('availability_indicator_viewed');

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAvailableTeams(prev => {
        const change = Math.random() > 0.6 ? -1 : Math.random() > 0.8 ? 1 : 0;
        return Math.max(1, Math.min(4, prev + change));
      });

      setTotalCalls(prev => prev + Math.floor(Math.random() * 3));
    }, 15000);

    return () => clearInterval(interval);
  }, [trackEngagement]);

  const urgencyLevel = availableTeams === 1 ? 'critical' : availableTeams === 2 ? 'high' : 'medium';
  const bgColor = urgencyLevel === 'critical' ? 'bg-red-600' : urgencyLevel === 'high' ? 'bg-orange-600' : 'bg-yellow-600';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${bgColor} text-white p-4 rounded-xl shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
          <div>
            <p className="font-bold text-lg">
              Only {availableTeams} Emergency {availableTeams === 1 ? 'Team' : 'Teams'} Available
            </p>
            <p className="text-sm opacity-90">
              {totalCalls} emergency calls in last 24 hours
            </p>
          </div>
        </div>
        {urgencyLevel === 'critical' && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold"
          >
            HIGH DEMAND
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Weather Alert Urgency - Creates urgency based on weather conditions
export function WeatherUrgencyAlert() {
  const [weatherAlert, setWeatherAlert] = useState<{
    type: string;
    severity: 'warning' | 'watch' | 'advisory';
    message: string;
  } | null>(null);
  const { trackEngagement } = useConversionTracking();

  useEffect(() => {
    // Simulate weather API data
    const alerts = [
      { type: 'Flood Warning', severity: 'warning' as const, message: 'Heavy rainfall expected - Prepare now!' },
      { type: 'Storm Watch', severity: 'watch' as const, message: 'Severe storms approaching Brisbane area' },
      { type: 'High Humidity', severity: 'advisory' as const, message: 'Conditions favorable for rapid mould growth' }
    ];

    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    setWeatherAlert(randomAlert);
    trackEngagement('weather_alert_displayed');
  }, [trackEngagement]);

  if (!weatherAlert) return null;

  const severityColors = {
    warning: 'from-red-600 to-red-800',
    watch: 'from-orange-600 to-orange-800',
    advisory: 'from-yellow-600 to-yellow-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-gradient-to-r ${severityColors[weatherAlert.severity]} text-white p-4 rounded-xl shadow-2xl`}
    >
      <div className="flex items-start gap-3">
        <svg className="w-6 h-6 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <p className="font-bold text-lg">{weatherAlert.type}</p>
          <p className="text-sm mt-1">{weatherAlert.message}</p>
          <p className="text-xs mt-2 font-semibold">
            Act now before damage occurs - Call 1300 309 361
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Dynamic Response Time Display
export function ResponseTimeDisplay() {
  const [currentWaitTime, setCurrentWaitTime] = useState(45);
  const [trend, setTrend] = useState<'increasing' | 'stable' | 'decreasing'>('stable');
  const { trackEngagement } = useConversionTracking();

  useEffect(() => {
    trackEngagement('response_time_displayed');

    const interval = setInterval(() => {
      setCurrentWaitTime(prev => {
        const change = Math.floor(Math.random() * 20) - 10;
        const newTime = Math.max(30, Math.min(90, prev + change));

        if (newTime > prev) setTrend('increasing');
        else if (newTime < prev) setTrend('decreasing');
        else setTrend('stable');

        return newTime;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [trackEngagement]);

  const urgencyColor = currentWaitTime > 60 ? 'text-red-600' : currentWaitTime > 45 ? 'text-orange-600' : 'text-green-600';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-semibold">Current Response Time</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-3xl font-bold ${urgencyColor}`}>
              {currentWaitTime} min
            </span>
            {trend === 'increasing' && (
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {trend === 'decreasing' && (
              <svg className="w-5 h-5 text-green-500 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
        {currentWaitTime > 60 && (
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold"
          >
            HIGH DEMAND
          </motion.div>
        )}
      </div>
      {currentWaitTime > 45 && (
        <p className="text-xs text-gray-600 mt-3 font-medium">
          ⚠️ Longer wait times due to high demand - Call now to secure your spot
        </p>
      )}
    </motion.div>
  );
}

// Price Surge Indicator
export function SurgePrice() {
  const [surgeMultiplier, setSurgeMultiplier] = useState(1.0);
  const [nextIncrease, setNextIncrease] = useState(new Date(Date.now() + 3600000)); // 1 hour from now
  const { trackEngagement } = useConversionTracking();

  useEffect(() => {
    trackEngagement('surge_pricing_viewed');

    const interval = setInterval(() => {
      setSurgeMultiplier(prev => Math.min(1.5, prev + 0.1));
      setNextIncrease(new Date(Date.now() + 3600000));
    }, 300000); // Every 5 minutes

    return () => clearInterval(interval);
  }, [trackEngagement]);

  if (surgeMultiplier === 1.0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-4"
    >
      <div className="flex items-center gap-3">
        <svg className="w-8 h-8 text-red-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <p className="font-bold text-gray-900">
            Emergency rates increasing due to high demand
          </p>
          <p className="text-sm text-gray-700 mt-1">
            Current surge: <span className="font-bold text-red-600">{((surgeMultiplier - 1) * 100).toFixed(0)}%</span> above normal rates
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Lock in current rates by calling now: 1300 309 361
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Combined Urgency Bar - Shows multiple urgency factors
export function UrgencyBar() {
  return (
    <div className="space-y-4">
      <AvailabilityIndicator />
      <ResponseTimeDisplay />
      <WeatherUrgencyAlert />
      <SurgePrice />
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, Gift } from 'lucide-react';

interface UrgencyTimerProps {
  title?: string;
  offer?: string;
  durationMinutes?: number;
  onExpire?: () => void;
  variant?: 'banner' | 'card' | 'badge';
  className?: string;
}

export function UrgencyTimer({
  title = 'Limited Time Offer',
  offer = 'FREE Emergency Assessment (Normally $299)',
  durationMinutes = 30,
  onExpire,
  variant = 'banner',
  className = '',
}: UrgencyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Check if timer was previously set in sessionStorage
    const storedEndTime = sessionStorage.getItem('urgencyTimerEnd');
    let endTime: number;

    if (storedEndTime) {
      endTime = parseInt(storedEndTime, 10);
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) {
        setIsExpired(true);
        onExpire?.();
      }
    } else {
      endTime = Date.now() + durationMinutes * 60 * 1000;
      sessionStorage.setItem('urgencyTimerEnd', endTime.toString());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));

      setTimeLeft(remaining);

      if (remaining === 0) {
        setIsExpired(true);
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [durationMinutes, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isUrgent = timeLeft < 300; // Less than 5 minutes

  // Badge variant - small floating badge
  if (variant === 'badge') {
    if (isExpired) return null;

    return (
      <motion.div
        className={`fixed top-20 right-6 z-40 bg-emergency-600 text-white rounded-full shadow-2xl px-6 py-3 ${className}`}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isUrgent ? [0, -10, 10, 0] : 0 }}
            transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0, repeatDelay: 1 }}
          >
            <Clock className="w-5 h-5" />
          </motion.div>
          <div>
            <p className="text-xs font-semibold">Offer Expires</p>
            <p className="text-lg font-bold">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Card variant - standalone card
  if (variant === 'card') {
    return (
      <motion.div
        className={`bg-gradient-to-r from-emergency-600 to-emergency-700 rounded-xl shadow-xl overflow-hidden ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {!isExpired ? (
          <>
            <div className="px-6 py-4 bg-emergency-800/50">
              <div className="flex items-center gap-3 text-white">
                <Gift className="w-6 h-6" />
                <h3 className="font-bold text-lg">{title}</h3>
              </div>
            </div>

            <div className="p-6 text-white">
              <p className="text-xl font-semibold mb-4">{offer}</p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        scale: isUrgent ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 1, repeat: isUrgent ? Infinity : 0 }}
                    >
                      <AlertCircle className="w-5 h-5" />
                    </motion.div>
                    <span className="text-sm font-medium">Time Remaining:</span>
                  </div>
                  <div className="text-3xl font-bold">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timeLeft / (durationMinutes * 60)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <a
                href="tel:1300309361"
                className="block w-full bg-white hover:bg-emergency-50 text-emergency-600 text-center font-bold py-4 px-6 rounded-lg transition-colors shadow-lg"
              >
                Call Now to Claim: 1300 309 361
              </a>
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-white">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-60" />
            <p className="text-lg font-semibold mb-2">Offer Expired</p>
            <p className="text-sm text-emergency-100">
              Call 1300 309 361 for current promotions
            </p>
          </div>
        )}
      </motion.div>
    );
  }

  // Banner variant (default) - full-width banner
  if (isExpired) return null;

  return (
    <motion.div
      className={`bg-gradient-to-r from-emergency-600 via-emergency-700 to-emergency-600 text-white ${className}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Offer Info */}
          <div className="flex items-center gap-4">
            <motion.div
              className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
              animate={{
                scale: isUrgent ? [1, 1.1, 1] : 1,
                rotate: isUrgent ? [0, -5, 5, 0] : 0,
              }}
              transition={{ duration: 1, repeat: isUrgent ? Infinity : 0 }}
            >
              <Gift className="w-6 h-6" />
            </motion.div>

            <div>
              <p className="font-bold text-lg mb-1">{title}</p>
              <p className="text-emergency-100 text-sm">{offer}</p>
            </div>
          </div>

          {/* Center: Timer */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="text-center">
              <p className="text-xs text-emergency-100 mb-1">Expires In</p>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <motion.span
                  className="text-3xl font-bold"
                  animate={{
                    scale: isUrgent && seconds % 2 === 0 ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </motion.span>
              </div>
            </div>
          </div>

          {/* Right: CTA */}
          <a
            href="tel:1300309361"
            className="flex-shrink-0 bg-white hover:bg-emergency-50 text-emergency-600 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg whitespace-nowrap"
          >
            Claim Offer Now
          </a>
        </div>

        {/* Mobile Progress Bar */}
        <div className="md:hidden mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / (durationMinutes * 60)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

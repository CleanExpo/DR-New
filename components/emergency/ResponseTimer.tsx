'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface ResponseTimerProps {
  targetMinutes?: number;
  startTime?: Date;
  className?: string;
  onComplete?: () => void;
}

export function ResponseTimer({
  targetMinutes = 60,
  startTime,
  className = '',
  onComplete,
}: ResponseTimerProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const targetSeconds = targetMinutes * 60;
  const remainingSeconds = Math.max(0, targetSeconds - elapsedSeconds);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const progress = (elapsedSeconds / targetSeconds) * 100;

  useEffect(() => {
    if (!isRunning) {return;}

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        if (next >= targetSeconds) {
          setIsRunning(false);
          onComplete?.();
          return targetSeconds;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, targetSeconds, onComplete]);

  const startTimer = () => {
    setIsRunning(true);
    setElapsedSeconds(0);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
  };

  const isUrgent = remainingSeconds < 300; // Less than 5 minutes
  const isComplete = remainingSeconds === 0;

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div
        className={`px-6 py-4 ${
          isComplete
            ? 'bg-success-600'
            : isUrgent
            ? 'bg-emergency-600'
            : 'bg-primary-600'
        } text-white transition-colors duration-500`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isComplete ? (
              <CheckCircle className="w-6 h-6" />
            ) : isUrgent ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <AlertCircle className="w-6 h-6" />
              </motion.div>
            ) : (
              <Clock className="w-6 h-6" />
            )}
            <div>
              <h3 className="font-bold text-lg">
                {isComplete
                  ? 'Response Complete'
                  : isRunning
                  ? 'Team En Route'
                  : '60-Minute Guarantee'}
              </h3>
              <p
                className={`text-sm ${
                  isComplete
                    ? 'text-success-100'
                    : isUrgent
                    ? 'text-emergency-100'
                    : 'text-primary-100'
                }`}
              >
                {isComplete
                  ? 'Team arrived on schedule'
                  : isRunning
                  ? 'Track your emergency response'
                  : 'Start timer when you call'}
              </p>
            </div>
          </div>

          {!isRunning && !isComplete && (
            <button
              onClick={startTimer}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Start Timer
            </button>
          )}

          {isRunning && (
            <button
              onClick={resetTimer}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Timer Display */}
        <div className="text-center mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${minutes}-${seconds}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`text-6xl font-bold ${
                isComplete
                  ? 'text-success-600'
                  : isUrgent
                  ? 'text-emergency-600'
                  : 'text-primary-600'
              }`}
            >
              {String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}
            </motion.div>
          </AnimatePresence>

          <p className="text-neutral-600 mt-2">
            {isComplete
              ? 'Guaranteed response time met!'
              : isRunning
              ? 'Estimated time until arrival'
              : 'Response time countdown'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative h-4 bg-neutral-100 rounded-full overflow-hidden mb-6">
          <motion.div
            className={`absolute inset-y-0 left-0 ${
              isComplete
                ? 'bg-success-500'
                : isUrgent
                ? 'bg-emergency-500'
                : 'bg-primary-500'
            } transition-colors duration-500`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />

          {/* Milestone Markers */}
          <div className="absolute inset-0 flex justify-between px-1">
            {[25, 50, 75].map((milestone) => (
              <div
                key={milestone}
                className="w-0.5 h-full bg-white/50"
                style={{ marginLeft: `${milestone}%` }}
              />
            ))}
          </div>
        </div>

        {/* Status Messages */}
        <div className="space-y-3">
          <div
            className={`flex items-start gap-3 p-3 rounded-lg ${
              progress >= 0 ? 'bg-success-50' : 'bg-neutral-50'
            }`}
          >
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                progress >= 0 ? 'bg-success-500 text-white' : 'bg-neutral-300'
              }`}
            >
              {progress >= 0 && <CheckCircle className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Call Received
              </p>
              <p className="text-xs text-neutral-600">
                Emergency line answered immediately
              </p>
            </div>
          </div>

          <div
            className={`flex items-start gap-3 p-3 rounded-lg ${
              progress >= 10 ? 'bg-success-50' : 'bg-neutral-50'
            }`}
          >
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                progress >= 10
                  ? 'bg-success-500 text-white'
                  : 'bg-neutral-300'
              }`}
            >
              {progress >= 10 && <CheckCircle className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Team Dispatched
              </p>
              <p className="text-xs text-neutral-600">
                IICRC certified crew en route
              </p>
            </div>
          </div>

          <div
            className={`flex items-start gap-3 p-3 rounded-lg ${
              progress >= 100 ? 'bg-success-50' : 'bg-neutral-50'
            }`}
          >
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                progress >= 100
                  ? 'bg-success-500 text-white'
                  : isRunning
                  ? 'bg-primary-500 text-white animate-pulse'
                  : 'bg-neutral-300'
              }`}
            >
              {progress >= 100 ? (
                <CheckCircle className="w-4 h-4" />
              ) : isRunning ? (
                <Clock className="w-4 h-4" />
              ) : null}
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                On-Site Arrival
              </p>
              <p className="text-xs text-neutral-600">
                Within 60 minutes guaranteed
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {!isRunning && !isComplete && (
          <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <p className="text-sm text-primary-900 text-center">
              Start the timer when you call{' '}
              <a
                href="tel:1300309361"
                className="font-bold underline hover:text-primary-700"
              >
                1300 309 361
              </a>
            </p>
          </div>
        )}

        {isComplete && (
          <div className="mt-6 p-4 bg-success-50 border border-success-200 rounded-lg">
            <p className="text-sm text-success-900 text-center font-semibold">
              Our team has arrived! Emergency response complete.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

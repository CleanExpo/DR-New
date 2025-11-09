'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FluidFloatingCTAProps {
  /** Phone number */
  phone?: string;
  /** Show after scroll amount (pixels) */
  showAfterScroll?: number;
  /** Position */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

/**
 * FluidFloatingCTA - Sticky floating CTA that appears on scroll
 *
 * Features:
 * - Appears after scrolling X pixels
 * - Floating animation
 * - Magnetic hover effect
 * - Dismissible
 * - Smooth entrance/exit animations
 * - Mobile responsive
 *
 * @example
 * ```tsx
 * <FluidFloatingCTA
 *   phone="1300 309 361"
 *   showAfterScroll={300}
 *   position="bottom-right"
 * />
 * ```
 */
export function FluidFloatingCTA({
  phone = '1300 309 361',
  showAfterScroll = 300,
  position = 'bottom-right',
}: FluidFloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [showAfterScroll, showAfterScroll + 100], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (latest > showAfterScroll && !isDismissed) {
        setIsVisible(true);
      } else if (latest <= showAfterScroll) {
        setIsVisible(false);
      }
    });

    return () => unsubscribe();
  }, [scrollY, showAfterScroll, isDismissed]);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-50`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Dismiss button */}
            <motion.button
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg z-10"
              onClick={() => setIsDismissed(true)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Dismiss emergency call button"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </motion.button>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-red-500 rounded-full blur-2xl"
              animate={{
                opacity: isHovered ? 0.6 : 0.3,
                scale: isHovered ? 1.3 : 1.1,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Main button */}
            <motion.a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="relative flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-700 to-red-800 rounded-full shadow-2xl shadow-red-900/50 text-white"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Call emergency number ${phone}`}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 border-4 border-red-400 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />

              {/* Phone icon */}
              <motion.div
                animate={isHovered ? { rotate: [0, -15, 15, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Phone className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
              </motion.div>

              {/* Text */}
              <span className="text-xs font-bold mt-1">CALL NOW</span>
            </motion.a>

            {/* Expanded info on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className={`
                    absolute
                    ${position.includes('right') ? 'right-full mr-4' : 'left-full ml-4'}
                    ${position.includes('bottom') ? 'bottom-0' : 'top-0'}
                    bg-white text-gray-900 px-6 py-4 rounded-xl shadow-2xl whitespace-nowrap
                  `}
                  initial={{ opacity: 0, x: position.includes('right') ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: position.includes('right') ? 20 : -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-sm font-bold text-red-600">24/7 Emergency</div>
                  <div className="text-2xl font-bold">{phone}</div>
                  <div className="text-xs text-gray-600 mt-1">60-min response</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

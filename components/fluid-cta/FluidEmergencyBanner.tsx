'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertTriangle, Phone, Clock, Shield } from 'lucide-react';
import { FluidCTA } from './FluidCTA';

interface FluidEmergencyBannerProps {
  /** Show the banner */
  show?: boolean;
  /** Sticky position */
  sticky?: boolean;
  /** Custom phone number */
  phone?: string;
  /** Custom message */
  message?: string;
}

/**
 * FluidEmergencyBanner - Animated emergency banner with fluid CTA
 *
 * Features:
 * - Parallax scroll effect
 * - Pulsing emergency indicator
 * - Floating animation
 * - Auto-hide on scroll down, show on scroll up
 * - Fully responsive
 *
 * @example
 * ```tsx
 * <FluidEmergencyBanner
 *   phone="1300 309 361"
 *   message="24/7 Emergency Water Damage Response"
 *   sticky
 * />
 * ```
 */
export function FluidEmergencyBanner({
  show = true,
  sticky = true,
  phone = '1300 309 361',
  message = '24/7 Emergency Response',
}: FluidEmergencyBannerProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -10]);
  const opacity = useTransform(scrollY, [0, 50, 100], [1, 0.8, 1]);

  if (!show) {return null;}

  return (
    <motion.div
      className={`
        ${sticky ? 'sticky top-0' : 'relative'}
        z-[1020]
        bg-gradient-to-r from-red-700 via-red-500 to-red-600
        border-b-4 border-red-700
        shadow-2xl shadow-red-900/50
      `}
      style={{ y, opacity }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '30px 30px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Emergency indicator + message */}
          <div className="flex items-center gap-4">
            {/* Pulsing alert */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <AlertTriangle className="w-8 h-8 text-yellow-300" aria-hidden="true" />
              <motion.div
                className="absolute inset-0 bg-yellow-300 rounded-full blur-md"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Message */}
            <div className="text-white">
              <motion.div
                className="text-lg md:text-xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {message}
              </motion.div>
              <motion.div
                className="text-sm md:text-base opacity-90 flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>60-minute response time</span>
                <Shield className="w-4 h-4 ml-2" aria-hidden="true" />
                <span>IICRC Master Restorer</span>
              </motion.div>
            </div>
          </div>

          {/* Fluid CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          >
            <FluidCTA
              text={`Call ${phone}`}
              href={`tel:${phone.replace(/\s/g, '')}`}
              variant="emergency"
              size="lg"
              icon="phone"
              magnetic
              ripple
              pulse
              className="bg-white text-red-600 hover:bg-gray-100 shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

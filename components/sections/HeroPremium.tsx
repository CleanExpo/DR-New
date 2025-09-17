'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
  {
    id: 1,
    image: '/images/hero/disaster-recovery-services.jpg',
    // video: 'https://www.w3schools.com/howto/rain.mp4', // Disabled due to CSP
    title: 'Emergency Disaster Recovery',
    subtitle: 'Brisbane\'s Most Trusted Response Team',
    description: '24/7 Emergency Response • Rapid Triage System • IICRC Certified',
    color: 'from-blue-900/90 to-blue-800/80'
  },
  {
    id: 2,
    image: '/images/hero/fire-smoke-damage-restoration.jpg',
    title: 'Fire & Smoke Damage',
    subtitle: 'Complete Restoration Services',
    description: 'Immediate Response • Insurance Approved • Total Recovery',
    color: 'from-orange-900/90 to-red-800/80'
  },
  {
    id: 3,
    image: '/images/hero/mould-remediation-services.jpg',
    title: 'Mould Remediation',
    subtitle: 'Safe & Thorough Removal',
    description: 'Health-First Approach • Prevention Focused • Guaranteed Results',
    color: 'from-green-900/90 to-teal-800/80'
  },
  {
    id: 4,
    image: '/images/hero/commercial-restoration-services.jpg',
    title: 'Commercial Restoration',
    subtitle: 'Minimize Business Downtime',
    description: 'Priority Response • Weekend Work • Rapid Recovery',
    color: 'from-purple-900/90 to-indigo-800/80'
  }
];

const stats = [
  { number: '25+', label: 'Years Experience', icon: '⚡' },
  { number: '5000+', label: 'Properties Restored', icon: '🏠' },
  { number: 'Rapid', label: 'Triage System', icon: '⏱️' },
  { number: '24/7', label: 'Emergency Service', icon: '📞' }
];

export default function HeroPremium() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative h-screen min-h-[900px] overflow-hidden bg-black">
      {/* Video/Image Background with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={isMounted ? {
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          } : undefined}
        >
          {false && currentHero.video && currentSlide === 0 ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-110"
              onLoadedData={() => setIsVideoLoaded(true)}
            >
              <source src={currentHero.video} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={currentHero.image}
              alt={currentHero.title}
              fill
              priority={currentSlide === 0}
              className="object-cover scale-110"
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentHero.color} mix-blend-multiply`}
        animate={{ opacity: [0.7, 0.85, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Animated Particles/Dots - Disabled on SSR */}
      {typeof window !== 'undefined' && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10
              }}
              animate={{
                y: window.innerHeight + 10,
                x: Math.random() * window.innerWidth
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Emergency Banner */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-red-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-2xl">
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span className="font-semibold">EMERGENCY RESPONSE AVAILABLE 24/7</span>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
              <motion.span
                className="block"
                animate={isMounted ? { opacity: [0.8, 1, 0.8] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentHero.title}
              </motion.span>
              <motion.span
                className="block text-3xl md:text-5xl lg:text-6xl mt-2 text-white/90"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {currentHero.subtitle}
              </motion.span>
            </h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {currentHero.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.a
                href="tel:1300309361"
                className="group relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-3">
                  <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>
                    <span className="block text-xs opacity-90">Emergency Hotline</span>
                    <span className="block text-xl">1300 309 361</span>
                  </span>
                </span>
              </motion.a>

              <motion.button
                className="group relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-white border-2 border-white/30 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative">Get Instant Quote</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Live Stats Bar */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <div>
                      <motion.div
                        className="text-2xl font-bold"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-xs text-white/80">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation Dots and Pause Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-12'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Pause/Play Button for Accessibility */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="ml-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 transition-all duration-300"
          aria-label={isPaused ? 'Resume carousel' : 'Pause carousel'}
        >
          {isPaused ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 text-white z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
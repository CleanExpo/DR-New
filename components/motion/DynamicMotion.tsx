'use client';

import dynamic from 'next/dynamic';

// Loading placeholder for animations
const AnimationPlaceholder = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

// Dynamically import framer-motion components with no SSR
// This ensures they're only loaded when actually needed
export const motion = {
  div: dynamic(
    () => import('framer-motion').then(mod => mod.motion.div as any),
    { ssr: false, loading: () => <AnimationPlaceholder><div /></AnimationPlaceholder> }
  ),
  span: dynamic(
    () => import('framer-motion').then(mod => mod.motion.span as any),
    { ssr: false, loading: () => <AnimationPlaceholder><span /></AnimationPlaceholder> }
  ),
  section: dynamic(
    () => import('framer-motion').then(mod => mod.motion.section as any),
    { ssr: false, loading: () => <AnimationPlaceholder><section /></AnimationPlaceholder> }
  ),
  article: dynamic(
    () => import('framer-motion').then(mod => mod.motion.article as any),
    { ssr: false, loading: () => <AnimationPlaceholder><article /></AnimationPlaceholder> }
  ),
  button: dynamic(
    () => import('framer-motion').then(mod => mod.motion.button as any),
    { ssr: false, loading: () => <AnimationPlaceholder><button /></AnimationPlaceholder> }
  ),
  img: dynamic(
    () => import('framer-motion').then(mod => mod.motion.img as any),
    { ssr: false, loading: () => <AnimationPlaceholder><img /></AnimationPlaceholder> }
  ),
  ul: dynamic(
    () => import('framer-motion').then(mod => mod.motion.ul as any),
    { ssr: false, loading: () => <AnimationPlaceholder><ul /></AnimationPlaceholder> }
  ),
  li: dynamic(
    () => import('framer-motion').then(mod => mod.motion.li as any),
    { ssr: false, loading: () => <AnimationPlaceholder><li /></AnimationPlaceholder> }
  ),
};

export const AnimatePresence = dynamic(
  () => import('framer-motion').then(mod => mod.AnimatePresence),
  { ssr: false }
);

export const useInView = () => {
  // Return a mock for SSR
  if (typeof window === 'undefined') {
    return () => ({ ref: null, inView: false });
  }
  // Dynamically import the real hook
  return require('framer-motion').useInView;
};

export const useAnimation = () => {
  // Return a mock for SSR
  if (typeof window === 'undefined') {
    return () => ({ start: () => {}, set: () => {} });
  }
  // Dynamically import the real hook
  return require('framer-motion').useAnimation;
};
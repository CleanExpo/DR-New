'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function useInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!installPrompt) {
      return false;
    }

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;

      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        setInstallPrompt(null);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Install prompt error:', error);
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    promptInstall
  };
}

export function getInstallInstructions(): { platform: string; instructions: string[] } {
  const userAgent = navigator.userAgent.toLowerCase();

  // iOS Safari
  if (/iphone|ipad|ipod/.test(userAgent) && /safari/.test(userAgent)) {
    return {
      platform: 'iOS Safari',
      instructions: [
        'Tap the Share button',
        'Scroll down and tap "Add to Home Screen"',
        'Tap "Add" in the top right corner',
        'The app will appear on your home screen'
      ]
    };
  }

  // Android Chrome
  if (/android/.test(userAgent) && /chrome/.test(userAgent)) {
    return {
      platform: 'Android Chrome',
      instructions: [
        'Tap the menu button (three dots)',
        'Tap "Add to Home screen"',
        'Tap "Add"',
        'The app will appear on your home screen'
      ]
    };
  }

  // Desktop Chrome/Edge
  if (/chrome|edg/.test(userAgent)) {
    return {
      platform: 'Desktop Chrome/Edge',
      instructions: [
        'Click the install button in the address bar',
        'Or click the menu (three dots) → "Install Disaster Recovery"',
        'Click "Install" to confirm',
        'The app will open in a new window'
      ]
    };
  }

  // Default
  return {
    platform: 'Browser',
    instructions: [
      'Look for an install button in your browser',
      'Or check your browser menu for "Install" or "Add to Home Screen"',
      'Follow the prompts to install the app'
    ]
  };
}

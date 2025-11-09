'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { useInstallPrompt, getInstallInstructions } from '@/lib/pwa/install-prompt';

export default function InstallPrompt() {
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Check if user previously dismissed
    const wasDismissed = localStorage.getItem('install-prompt-dismissed');
    if (wasDismissed) {
      const dismissedTime = parseInt(wasDismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);

      // Show again after 7 days
      if (daysSinceDismissed < 7) {
        setDismissed(true);
        return;
      }
    }

    // Show prompt after 30 seconds on mobile
    if (isInstallable && !isInstalled && !dismissed) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, dismissed]);

  const handleInstall = async () => {
    const installed = await promptInstall();
    if (installed) {
      setShowPrompt(false);
    } else {
      // Show manual instructions if auto-prompt failed
      setShowInstructions(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem('install-prompt-dismissed', Date.now().toString());
  };

  if (isInstalled || dismissed || !isInstallable) {
    return null;
  }

  const instructions = getInstallInstructions();

  return (
    <>
      {/* Compact Banner Prompt - Mobile optimized */}
      {showPrompt && !showInstructions && (
        <div className="fixed bottom-20 left-4 right-4 z-50 lg:hidden animate-slide-up">
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-2xl shadow-2xl p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-1">Install Our App</h3>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Get faster access and work offline. Call emergency services with one tap.
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleInstall}
                    className="flex-1 min-h-[44px] bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Install
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 rounded-xl transition-colors"
                    aria-label="Dismiss"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Installation Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-[70] flex items-end lg:items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowInstructions(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-t-3xl lg:rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Download className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Install App</h2>
                    <p className="text-xs text-gray-600">{instructions.platform}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Follow these steps to install Disaster Recovery Brisbane on your device:
                </p>

                <ol className="space-y-4">
                  {instructions.instructions.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Why Install?
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Faster loading and better performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Work offline and access cached content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Quick access from your home screen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>One-tap emergency calling</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setShowInstructions(false)}
                className="w-full min-h-[52px] mt-6 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 active:bg-blue-900 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

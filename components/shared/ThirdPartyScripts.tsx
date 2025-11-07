'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface ScriptConfig {
  id: string;
  src?: string;
  inline?: string;
  strategy: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload' | 'worker';
  delay?: number;
  priority: number;
  condition?: () => boolean;
}

const scriptConfigs: ScriptConfig[] = [
  // Google Analytics - High Priority
  {
    id: 'google-analytics',
    src: `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`,
    strategy: 'afterInteractive',
    priority: 1,
    condition: () => !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  },
  // Google Tag Manager - High Priority
  {
    id: 'google-tag-manager',
    strategy: 'afterInteractive',
    priority: 2,
    inline: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
      ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_SECONDARY ?
        `gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_SECONDARY}');` : ''}
    `,
    condition: () => !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  },
  // Microsoft Clarity - Low Priority
  {
    id: 'microsoft-clarity',
    strategy: 'lazyOnload',
    priority: 5,
    delay: 5000,
    inline: `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
    `,
    condition: () => !!process.env.NEXT_PUBLIC_CLARITY_ID
  }
];

export function ThirdPartyScripts() {
  const [loadedScripts, setLoadedScripts] = useState<Set<string>>(new Set());
  const [isIdle, setIsIdle] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Detect user interaction
    const handleInteraction = () => {
      setHasInteracted(true);
      // Remove listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('mousemove', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });
    document.addEventListener('mousemove', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });

    // Use requestIdleCallback for low-priority scripts
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setIsIdle(true);
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => setIsIdle(true), 2000);
    }

    // Implement script loading queue
    const loadScriptQueue = async () => {
      const sortedScripts = scriptConfigs
        .filter(config => !config.condition || config.condition())
        .sort((a, b) => a.priority - b.priority);

      for (const config of sortedScripts) {
        if (loadedScripts.has(config.id)) continue;

        // Apply delay if specified
        if (config.delay) {
          await new Promise(resolve => setTimeout(resolve, config.delay));
        }

        // Load script based on strategy
        if (config.strategy === 'lazyOnload' && !isIdle) {
          continue;
        }

        if (config.strategy === 'worker') {
          // Load in Web Worker if possible
          loadScriptInWorker(config);
        } else {
          setLoadedScripts(prev => new Set(prev).add(config.id));
        }
      }
    };

    if (hasInteracted || isIdle) {
      loadScriptQueue();
    }

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('mousemove', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted, isIdle, loadedScripts]);

  // Load script in Web Worker
  const loadScriptInWorker = (config: ScriptConfig) => {
    if (typeof Worker !== 'undefined') {
      const workerScript = `
        self.addEventListener('message', function(e) {
          if (e.data.type === 'LOAD_SCRIPT') {
            importScripts(e.data.src);
            self.postMessage({ type: 'SCRIPT_LOADED', id: e.data.id });
          }
        });
      `;
      const blob = new Blob([workerScript], { type: 'application/javascript' });
      const worker = new Worker(URL.createObjectURL(blob));

      worker.postMessage({ type: 'LOAD_SCRIPT', src: config.src, id: config.id });
      worker.addEventListener('message', (e) => {
        if (e.data.type === 'SCRIPT_LOADED') {
          setLoadedScripts(prev => new Set(prev).add(config.id));
          worker.terminate();
        }
      });
    }
  };

  // Render scripts based on loading state
  return (
    <>
      {/* Performance monitoring for third-party scripts */}
      <Script
        id="third-party-monitor"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Monitor third-party script performance
            if ('PerformanceObserver' in window) {
              try {
                const thirdPartyDomains = [
                  'googletagmanager.com',
                  'google-analytics.com',
                  'clarity.ms',
                  'facebook.com',
                  'doubleclick.net'
                ];

                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    const isThirdParty = thirdPartyDomains.some(domain =>
                      entry.name.includes(domain)
                    );

                    if (isThirdParty) {
                      const duration = entry.responseEnd - entry.startTime;

                      // Log slow third-party resources
                      if (duration > 1000) {
                        console.warn('Slow third-party resource:', entry.name, duration + 'ms');
                      }

                      // Report to analytics
                      if (window.gtag) {
                        window.gtag('event', 'third_party_timing', {
                          resource: entry.name,
                          duration: Math.round(duration),
                          size: entry.transferSize
                        });
                      }
                    }
                  }
                });

                observer.observe({ entryTypes: ['resource'] });
              } catch (e) {
                console.error('Third-party monitoring failed:', e);
              }
            }

            // Implement facade pattern for heavy embeds
            document.addEventListener('DOMContentLoaded', () => {
              // YouTube embeds - load on interaction
              const youtubeEmbeds = document.querySelectorAll('.youtube-embed');
              youtubeEmbeds.forEach(embed => {
                const thumbnail = document.createElement('img');
                thumbnail.src = \`https://i.ytimg.com/vi/\${embed.dataset.videoId}/maxresdefault.jpg\`;
                thumbnail.loading = 'lazy';
                thumbnail.alt = 'Video thumbnail';
                thumbnail.style.cursor = 'pointer';

                thumbnail.addEventListener('click', () => {
                  const iframe = document.createElement('iframe');
                  iframe.src = \`https://www.youtube.com/embed/\${embed.dataset.videoId}?autoplay=1\`;
                  iframe.allow = 'autoplay; encrypted-media';
                  iframe.allowFullscreen = true;
                  embed.replaceChild(iframe, thumbnail);
                });

                embed.appendChild(thumbnail);
              });

              // Social media embeds - load on scroll
              const socialEmbeds = document.querySelectorAll('.social-embed');
              const socialObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    const embed = entry.target;
                    const script = document.createElement('script');
                    script.src = embed.dataset.scriptSrc;
                    script.async = true;
                    document.body.appendChild(script);
                    socialObserver.unobserve(embed);
                  }
                });
              }, { rootMargin: '100px' });

              socialEmbeds.forEach(embed => socialObserver.observe(embed));
            });
          `
        }}
      />

      {/* Load configured scripts */}
      {scriptConfigs.map(config => {
        if (!loadedScripts.has(config.id)) return null;
        if (config.condition && !config.condition()) return null;

        if (config.src) {
          return (
            <Script
              key={config.id}
              id={config.id}
              src={config.src}
              strategy={config.strategy as any}
              onLoad={() => {
                console.log(`[ThirdPartyScripts] Loaded: ${config.id}`);
              }}
              onError={() => {
                console.error(`[ThirdPartyScripts] Failed to load: ${config.id}`);
              }}
            />
          );
        }

        if (config.inline) {
          return (
            <Script
              key={config.id}
              id={config.id}
              strategy={config.strategy as any}
              dangerouslySetInnerHTML={{ __html: config.inline }}
            />
          );
        }

        return null;
      })}

      {/* Partytown for offloading scripts to Web Worker */}
      <Script
        id="partytown-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            partytown = {
              lib: "/_next/static/~partytown/",
              forward: ["dataLayer.push", "gtag"],
              resolveUrl: function(url, location) {
                if (url.hostname === 'www.googletagmanager.com') {
                  const proxyUrl = new URL(location.origin + '/api/proxy');
                  proxyUrl.searchParams.set('url', url.href);
                  return proxyUrl;
                }
                return url;
              }
            };
          `
        }}
      />
    </>
  );
}

export default ThirdPartyScripts;
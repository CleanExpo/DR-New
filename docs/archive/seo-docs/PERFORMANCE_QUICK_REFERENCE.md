# Performance Optimization Quick Reference

## Core Web Vitals Targets
- LCP < 2.5s
- FID < 100ms  
- CLS < 0.1
- TTFB < 800ms
- INP < 200ms

## Implementation Checklist

### Layout (app/layout.tsx)
```typescript
import { CriticalCSS } from '@/components/performance/CriticalCSS';
import { ImagePreloader } from '@/components/performance/ImagePreloader';
import { ResourceHints } from '@/components/performance/ResourceHints';
import { WebVitals } from '@/app/web-vitals';
import { WebVitalsOptimizer } from '@/components/performance/WebVitalsOptimizer';
import { ServiceWorkerRegistration } from '@/components/performance/ServiceWorkerRegistration';
```

### Lazy Loading
```typescript
import { LazyTrustIndicators } from '@/components/lazy/LazyComponents';
<LazyTrustIndicators />
```

### Optimized Animations
```typescript
import { fadeInUpVariants, optimizedTransition } from '@/lib/motion/optimized-config';
<motion.div variants={fadeInUpVariants} transition={optimizedTransition} />
```

### Testing
```bash
npm run build
npm start
npx lighthouse http://localhost:3000 --view
```

## Key Files
- next.config.js - Enhanced configuration
- app/web-vitals.tsx - Monitoring component
- components/performance/ - Performance components
- components/lazy/ - Lazy loading utilities
- lib/motion/optimized-config.ts - Animation config
- public/sw-optimized.js - Service worker

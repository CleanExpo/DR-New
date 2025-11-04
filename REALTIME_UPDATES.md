# Real-Time Updates System Documentation

## Overview

The NRPG Platform CRM implements a comprehensive real-time update system using both Server-Sent Events (SSE) and WebSockets (via Pusher) to provide instant notifications and live updates across the platform.

## Architecture

### Technologies Used

- **Server-Sent Events (SSE)**: For one-way server-to-client communication
- **Pusher**: For bidirectional WebSocket communication
- **Next.js API Routes**: Backend endpoints for real-time subscriptions
- **React Hooks**: Frontend integration for real-time updates

### Components

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
├───────────────────────────┬─────────────────────────────────┤
│    React Components       │         React Hooks             │
│  - NotificationBell       │  - useRealtimeUpdates()        │
│  - LiveJobFeed           │  - usePusher()                  │
│  - LiveMetrics           │  - useJobUpdates()              │
│                          │  - useDashboardMetrics()        │
└───────────────┬──────────┴─────────────┬───────────────────┘
                │                         │
                │ SSE                     │ WebSocket
                │                         │
┌───────────────▼─────────────────────────▼───────────────────┐
│                         Backend                              │
├──────────────────────────┬──────────────────────────────────┤
│     SSE Manager          │        Pusher Server             │
│  - Client connections    │  - Private channels              │
│  - Event broadcasting    │  - Presence channels             │
│  - Keep-alive pings     │  - Event triggering              │
└──────────────┬──────────┴──────────────┬───────────────────┘
               │                          │
┌──────────────▼──────────────────────────▼───────────────────┐
│                  Notification Service                        │
│  - Event processing                                         │
│  - User targeting                                           │
│  - Database persistence                                     │
└──────────────────────────────────────────────────────────────┘
```

## Event Types

### Job Events
- `JOB_CREATED`: New job added to the system
- `JOB_ASSIGNED`: Job assigned to a contractor
- `JOB_STATUS_CHANGED`: Job status updated
- `EMERGENCY_JOB`: Urgent job requiring immediate attention

### Financial Events
- `PAYMENT_RECEIVED`: Payment processed successfully
- `INVOICE_CREATED`: New invoice generated
- `SUBSCRIPTION_EXPIRING`: Contractor subscription ending soon

### System Events
- `METRICS_UPDATE`: Dashboard metrics refreshed
- `SCHEDULE_UPDATED`: Appointment schedule changed
- `NOTIFICATION`: General system notification

## Implementation Guide

### 1. Server-Side Setup

#### Environment Variables

Add to `.env.local`:

```bash
# Pusher Configuration
PUSHER_APP_ID=your_app_id
NEXT_PUBLIC_PUSHER_KEY=your_key
PUSHER_SECRET=your_secret
NEXT_PUBLIC_PUSHER_CLUSTER=ap4

# Stripe Webhook
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

#### Sending Notifications

```typescript
import { notificationService } from '@/lib/realtime/notification-service';

// Send to specific user
await notificationService.notify({
  event: 'JOB_ASSIGNED',
  userId: contractorId,
  tenantId: tenantId,
  data: {
    jobId: job.id,
    jobNumber: job.jobNumber,
    title: job.title,
  },
  priority: 'high',
});

// Broadcast to all users in tenant
await notificationService.notify({
  event: 'EMERGENCY_JOB',
  tenantId: tenantId,
  data: {
    jobId: job.id,
    priority: 'EMERGENCY',
  },
  priority: 'emergency',
});
```

### 2. Client-Side Integration

#### Using SSE Hook

```typescript
import { useRealtimeUpdates } from '@/lib/hooks/useRealtimeUpdates';

function MyComponent() {
  const { updates, isConnected } = useRealtimeUpdates({
    events: ['JOB_CREATED', 'JOB_ASSIGNED'],
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
  });

  useEffect(() => {
    // Process new updates
    if (updates.length > 0) {
      const latestUpdate = updates[updates.length - 1];
      // Handle the update
    }
  }, [updates]);

  return (
    <div>
      {isConnected && <Badge>Live</Badge>}
      {/* Your component content */}
    </div>
  );
}
```

#### Using Pusher Hook

```typescript
import { usePusher } from '@/lib/hooks/usePusher';

function JobDetails({ jobId }) {
  const { messages, isConnected } = usePusher({
    channelName: `private-job-${jobId}`,
    events: ['JOB_UPDATED', 'JOB_STATUS_CHANGED'],
  });

  // Process messages
  useEffect(() => {
    messages.forEach(msg => {
      if (msg.event === 'JOB_STATUS_CHANGED') {
        // Update job status in UI
      }
    });
  }, [messages]);
}
```

### 3. API Route Integration

Add real-time notifications to your API routes:

```typescript
// app/api/jobs/route.ts
import { notificationService } from '@/lib/realtime/notification-service';

export async function POST(request: NextRequest) {
  // Create job in database
  const job = await prisma.workOrder.create({
    data: jobData,
  });

  // Send real-time notification
  await notificationService.notifyJobCreated(job.id, tenantId);

  // If emergency, send alert
  if (job.isEmergency) {
    await notificationService.notifyEmergencyJob(job.id, tenantId);
  }

  return NextResponse.json(job);
}
```

## UI Components

### NotificationBell

Displays real-time notifications with unread count:

```typescript
import { NotificationBell } from '@/components/realtime/NotificationBell';

<header>
  <NotificationBell />
</header>
```

### LiveJobFeed

Shows incoming jobs in real-time for contractors:

```typescript
import { LiveJobFeed } from '@/components/realtime/LiveJobFeed';

<Dashboard>
  <LiveJobFeed />
</Dashboard>
```

### LiveMetrics

Displays animated KPI cards with real-time updates:

```typescript
import { LiveMetrics } from '@/components/analytics/LiveMetrics';

<AdminDashboard>
  <LiveMetrics />
</AdminDashboard>
```

## Testing

### Manual Testing

1. Open two browser windows logged in as different users
2. Create a job in one window
3. Verify notification appears in the other window
4. Check SSE connection in browser DevTools: `Network > EventStream`

### Testing SSE Connection

```javascript
// Browser console
const eventSource = new EventSource('/api/realtime/subscribe');

eventSource.addEventListener('JOB_CREATED', (e) => {
  console.log('New job:', JSON.parse(e.data));
});

eventSource.addEventListener('error', (e) => {
  console.error('SSE error:', e);
});
```

### Testing Pusher Connection

```javascript
// Browser console
import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: 'ap4',
});

const channel = pusher.subscribe('private-user-123');
channel.bind('JOB_ASSIGNED', (data) => {
  console.log('Job assigned:', data);
});
```

## Performance Considerations

### SSE Limitations
- Maximum 6 concurrent connections per domain in browsers
- One-way communication only (server to client)
- Automatic reconnection with exponential backoff

### Pusher Limits
- 200 concurrent connections (free tier)
- 300,000 messages per day (free tier)
- 100 channels per connection

### Best Practices

1. **Use SSE for**:
   - Dashboard metrics updates
   - Notification feeds
   - One-way data streaming

2. **Use Pusher for**:
   - Bidirectional communication
   - Presence (who's online)
   - Critical real-time events

3. **Optimization Tips**:
   - Batch updates when possible
   - Implement client-side deduplication
   - Use event filtering to reduce noise
   - Clean up connections on unmount

## Troubleshooting

### SSE Not Connecting

1. Check authentication:
   ```bash
   curl -H "Cookie: next-auth.session-token=..." \
        http://localhost:3000/api/realtime/subscribe
   ```

2. Verify CORS headers in production

3. Check for proxy/CDN buffering issues

### Pusher Not Working

1. Verify environment variables:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_PUSHER_KEY);
   console.log(process.env.NEXT_PUBLIC_PUSHER_CLUSTER);
   ```

2. Check Pusher debug console: https://dashboard.pusher.com

3. Verify authentication endpoint:
   ```bash
   POST /api/pusher/auth
   {
     "socket_id": "...",
     "channel_name": "private-user-123"
   }
   ```

### Missing Notifications

1. Check database for notification records
2. Verify user permissions and tenant isolation
3. Check browser notification permissions
4. Review server logs for errors

## Monitoring

### Metrics to Track

- Active SSE connections
- Pusher connection count
- Message delivery rate
- Notification open rate
- Average latency

### Health Check Endpoint

```typescript
// app/api/realtime/health/route.ts
export async function GET() {
  return NextResponse.json({
    sse: {
      connections: sseManager.getActiveClients(),
      users: sseManager.getActiveUsers(),
    },
    pusher: {
      // Get from Pusher API
    },
    status: 'healthy',
  });
}
```

## Security Considerations

1. **Authentication**: All real-time endpoints require valid session
2. **Authorization**: Users only receive events for their tenant
3. **Rate Limiting**: Implement per-user message limits
4. **Input Validation**: Sanitise all event payloads
5. **Encryption**: Use TLS for all connections

## Scaling

### Horizontal Scaling

For multiple server instances:

1. Use Redis pub/sub for cross-server communication
2. Implement sticky sessions for SSE
3. Use Pusher for automatic scaling

### Database Optimisation

1. Index notification queries
2. Implement notification archiving
3. Use read replicas for notification fetching

## Future Enhancements

- [ ] Push notifications (mobile/desktop)
- [ ] Email digest notifications
- [ ] SMS alerts for emergency jobs
- [ ] Notification preferences per user
- [ ] Real-time collaboration features
- [ ] Voice/video calling integration
- [ ] Offline message queue
- [ ] Analytics dashboard for notification engagement

## Support

For issues or questions:
1. Check server logs for errors
2. Review browser console for client-side errors
3. Test with the health check endpoint
4. Contact technical support with error details
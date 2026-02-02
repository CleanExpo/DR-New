# Adding AI Enhancement to Admin Navigation

## Quick Integration

Add this link to your admin navigation/sidebar:

### Option 1: Direct Link

```tsx
<Link
  href="/dashboard/admin/ai-enhancement"
  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
>
  <Sparkles className="w-5 h-5" />
  AI Image Enhancement
</Link>
```

### Option 2: Navigation Array

```typescript
const adminNavigation = [
  // ... existing items
  {
    name: 'AI Image Enhancement',
    href: '/dashboard/admin/ai-enhancement',
    icon: Sparkles,
    badge: 'NEW',
  },
];
```

### Option 3: Settings Dropdown

```tsx
<DropdownMenuItem>
  <Link href="/dashboard/admin/ai-enhancement" className="flex items-center gap-2">
    <Sparkles className="w-4 h-4" />
    AI Image Enhancement
  </Link>
</DropdownMenuItem>
```

## Icon Import

```typescript
import { Sparkles } from 'lucide-react';
```

## Access Control

The page automatically checks:
- User is authenticated (redirects to /auth/signin if not)
- User has ADMIN or SUPER_ADMIN role (redirects to /dashboard if not)

No additional protection needed in navigation - just add the link!

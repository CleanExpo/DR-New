'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onSearch?: (query: string) => void;
  notificationCount?: number;
  onNotificationClick?: () => void;
  subtitle?: string;
}

export function DashboardHeader({
  user,
  onSearch,
  notificationCount = 0,
  onNotificationClick,
  subtitle = 'Manage your disaster recovery requests and track progress',
}: DashboardHeaderProps) {
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-portal-card rounded-xl border border-portal-border shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Welcome Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-semantic-contractor/20">
            <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
            <AvatarFallback className="bg-gradient-to-br from-semantic-contractor/20 to-[#3B82F6]/20 text-semantic-contractor font-semibold text-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getGreeting()},{' '}
              <span className="bg-gradient-to-r from-semantic-contractor to-[#3B82F6] bg-clip-text text-transparent">
                {user.name || 'User'}
              </span>
            </h1>
            <p className="text-portal-muted text-sm mt-1">{subtitle}</p>
          </div>
        </div>

        {/* Search and Notifications */}
        <div className="flex items-center gap-3">
          {onSearch && (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-portal-muted" />
              <Input
                type="text"
                placeholder="Search requests..."
                className="pl-10 w-64 border-portal-border focus:border-semantic-contractor focus:ring-semantic-contractor/20"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          )}

          {onNotificationClick && (
            <Button
              variant="outline"
              size="icon"
              className="relative border-portal-border hover:border-semantic-contractor transition-colors"
              onClick={onNotificationClick}
            >
              <Bell className="h-5 w-5 text-portal-muted" />
              {notificationCount > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-dr-emergency text-white border-0"
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Badge>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

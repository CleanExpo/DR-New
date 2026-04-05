'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell, X, Check, AlertCircle, MessageCircle, DollarSign, Star, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  SupabaseRealtimeManager,
  type UserNotification,
} from '@/lib/realtime/supabase-realtime';
import { useRouter } from 'next/navigation';

interface Toast {
  id: string;
  notification: UserNotification;
  expiresAt: number;
}

interface RealtimeNotificationsProps {
  userId: string;
  enableSound?: boolean;
  enableDesktopNotifications?: boolean;
}

export function RealtimeNotifications({
  userId,
  enableSound = false,
  enableDesktopNotifications = false,
}: RealtimeNotificationsProps) {
  const router = useRouter();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState<UserNotification[]>([]);
  const [desktopPermission, setDesktopPermission] = useState<NotificationPermission>('default');

  // Request desktop notification permission
  useEffect(() => {
    if (enableDesktopNotifications && 'Notification' in window) {
      setDesktopPermission(Notification.permission);

      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          setDesktopPermission(permission);
        });
      }
    }
  }, [enableDesktopNotifications]);

  // Initialize realtime manager
  useEffect(() => {
    const manager = new SupabaseRealtimeManager(userId);

    // Subscribe to user notification channel
    manager.subscribeToUser(userId, {
      onNotification: (notification) => {
        // Add to recent notifications
        setRecentNotifications((prev) => [notification, ...prev].slice(0, 20));

        // Increment unread count if not read
        if (!notification.read) {
          setUnreadCount((prev) => prev + 1);
        }

        // Show toast
        showToast(notification);

        // Play sound if enabled
        if (enableSound) {
          playNotificationSound();
        }

        // Show desktop notification if enabled
        if (enableDesktopNotifications && desktopPermission === 'granted') {
          showDesktopNotification(notification);
        }
      },

      onUnreadCountChange: (count) => {
        setUnreadCount(count);
      },
    });

    // Cleanup on unmount
    return () => {
      manager.unsubscribeAll();
    };
  }, [userId, enableSound, enableDesktopNotifications, desktopPermission]);

  // Load initial unread count
  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const response = await fetch(`/api/notifications/unread-count`);
        if (response.ok) {
          const data = await response.json();
          setUnreadCount(data.count || 0);
        }
      } catch (error) {
        console.error('Error loading unread count:', error);
      }
    };

    loadUnreadCount();
  }, []);

  // Show toast notification
  const showToast = useCallback((notification: UserNotification) => {
    const id = `toast-${notification.id}-${Date.now()}`;
    const expiresAt = Date.now() + 5000; // 5 seconds

    setToasts((prev) => [
      ...prev,
      {
        id,
        notification,
        expiresAt,
      },
    ]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);

  // Remove toast
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Play notification sound
  const playNotificationSound = () => {
    try {
      const audio = new Audio('/sounds/notification.mp3'); // Add a notification sound file
      audio.volume = 0.5;
      audio.play().catch((error) => {
        console.error('Error playing notification sound:', error);
      });
    } catch (error) {
      console.error('Error creating audio:', error);
    }
  };

  // Show desktop notification
  const showDesktopNotification = (notification: UserNotification) => {
    if (!('Notification' in window)) return;

    const options: NotificationOptions = {
      body: notification.body,
      icon: '/icon-192.png', // Add your app icon
      badge: '/badge-72.png', // Add a badge icon
      tag: notification.id,
      requireInteraction: false,
      data: {
        url: notification.actionUrl,
      },
    };

    const desktopNotif = new Notification(notification.title, options);

    desktopNotif.onclick = () => {
      window.focus();
      if (notification.actionUrl) {
        router.push(notification.actionUrl);
      }
      desktopNotif.close();
    };

    // Auto-close after 10 seconds
    setTimeout(() => {
      desktopNotif.close();
    }, 10000);
  };

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="h-5 w-5 text-semantic-contractor" />;
      case 'status_update':
        return <Info className="h-5 w-5 text-blue-600" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'review':
        return <Star className="h-5 w-5 text-yellow-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  // Handle toast click
  const handleToastClick = (notification: UserNotification) => {
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
    // Mark as read
    markAsRead(notification.id);
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      });
      setUnreadCount((prev) => Math.max(0, prev - 1));
      setRecentNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <>
      {/* Notification Bell Icon */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowNotificationCenter(!showNotificationCenter)}
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-dr-emergency text-white text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>

        {/* Notification Center Dropdown */}
        {showNotificationCenter && (
          <div className="absolute right-0 top-12 w-96 bg-white border border-portal-border rounded-lg shadow-lg z-50 max-h-[500px] overflow-y-auto">
            <div className="p-4 border-b border-portal-border sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotificationCenter(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {recentNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-portal-muted mx-auto mb-3" />
                <p className="text-gray-900 font-medium mb-1">No notifications</p>
                <p className="text-sm text-portal-muted">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-portal-border">
                {recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-portal-hover cursor-pointer transition-colors ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                    onClick={() => {
                      if (notification.actionUrl) {
                        router.push(notification.actionUrl);
                      }
                      markAsRead(notification.id);
                      setShowNotificationCenter(false);
                    }}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-700">{notification.body}</p>
                        <p className="text-xs text-portal-muted mt-1">
                          {new Date(notification.timestamp).toLocaleString('en-AU', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0">
                          <div className="h-2 w-2 bg-semantic-contractor rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white border border-portal-border rounded-lg shadow-xl p-4 cursor-pointer hover:shadow-2xl transition-shadow animate-in slide-in-from-right"
            onClick={() => {
              handleToastClick(toast.notification);
              removeToast(toast.id);
            }}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0">{getNotificationIcon(toast.notification.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {toast.notification.title}
                </p>
                <p className="text-sm text-gray-700">{toast.notification.body}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeToast(toast.id);
                }}
                className="flex-shrink-0 text-portal-muted hover:text-gray-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

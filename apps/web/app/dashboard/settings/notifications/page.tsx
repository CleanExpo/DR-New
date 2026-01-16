/**
 * Notification Preferences Page
 *
 * Allows users to manage their notification settings:
 * - Email notification preferences
 * - Push notification preferences
 * - Sound settings
 * - Quiet hours
 * - SMS notifications (contractors)
 */

'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Mail,
  MessageSquare,
  Volume2,
  Moon,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface NotificationPreferences {
  // Email preferences
  emailEnabled: boolean;
  emailNewClaims: boolean;
  emailBidUpdates: boolean;
  emailPaymentNotifications: boolean;
  emailMarketingEmails: boolean;
  emailDigestFrequency: 'instant' | 'daily' | 'weekly' | 'never';

  // Push/In-app preferences
  pushEnabled: boolean;
  pushNewJobs: boolean;
  pushUrgentAlerts: boolean;
  pushStatusUpdates: boolean;

  // Sound preferences
  soundEnabled: boolean;
  soundType: string;

  // Quiet hours
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  quietHoursTimezone: string;

  // SMS (for contractors)
  smsEnabled: boolean;
  smsPhone: string;
}

const defaultPreferences: NotificationPreferences = {
  emailEnabled: true,
  emailNewClaims: true,
  emailBidUpdates: true,
  emailPaymentNotifications: true,
  emailMarketingEmails: false,
  emailDigestFrequency: 'instant',

  pushEnabled: true,
  pushNewJobs: true,
  pushUrgentAlerts: true,
  pushStatusUpdates: true,

  soundEnabled: true,
  soundType: 'subtle_chime',

  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00',
  quietHoursTimezone: 'Australia/Sydney',

  smsEnabled: false,
  smsPhone: '',
};

const SOUND_OPTIONS = [
  { value: 'subtle_chime', label: 'Subtle Chime' },
  { value: 'bell', label: 'Bell' },
  { value: 'urgent_alarm', label: 'Urgent Alarm' },
  { value: 'none', label: 'Silent' },
];

const TIMEZONE_OPTIONS = [
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
  { value: 'Australia/Melbourne', label: 'Melbourne (AEST/AEDT)' },
  { value: 'Australia/Brisbane', label: 'Brisbane (AEST)' },
  { value: 'Australia/Perth', label: 'Perth (AWST)' },
  { value: 'Australia/Adelaide', label: 'Adelaide (ACST/ACDT)' },
  { value: 'Australia/Darwin', label: 'Darwin (ACST)' },
  { value: 'Australia/Hobart', label: 'Hobart (AEST/AEDT)' },
];

const DIGEST_OPTIONS = [
  { value: 'instant', label: 'Instant (each notification)' },
  { value: 'daily', label: 'Daily digest' },
  { value: 'weekly', label: 'Weekly digest' },
  { value: 'never', label: 'Never' },
];

export default function NotificationPreferencesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [preferences, setPreferences] = React.useState<NotificationPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [hasChanges, setHasChanges] = React.useState(false);

  const isContractor = session?.user?.userType === 'CONTRACTOR';

  // Redirect if not authenticated
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard/settings/notifications');
    }
  }, [status, router]);

  // Fetch preferences
  React.useEffect(() => {
    async function fetchPreferences() {
      try {
        const res = await fetch('/api/notifications/preferences');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.preferences) {
            setPreferences({ ...defaultPreferences, ...data.preferences });
          }
        }
      } catch (error) {
        console.error('Failed to fetch preferences:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (session?.user) {
      fetchPreferences();
    }
  }, [session]);

  // Update a preference
  const updatePreference = <K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
    setSaveStatus('idle');
  };

  // Save preferences
  const savePreferences = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const res = await fetch('/api/notifications/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      if (res.ok) {
        setSaveStatus('success');
        setHasChanges(false);
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Failed to save preferences:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Notification Preferences</h1>
        <p className="text-gray-600 mt-2">
          Manage how you receive notifications about claims, bids, and updates.
        </p>
      </div>

      {/* Save Status Alert */}
      {saveStatus === 'success' && (
        <Alert className="mb-6 border-green-600 bg-green-50">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-900">
            Your notification preferences have been saved.
          </AlertDescription>
        </Alert>
      )}

      {saveStatus === 'error' && (
        <Alert className="mb-6 border-red-600 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-900">
            Failed to save preferences. Please try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Notifications
            </CardTitle>
            <CardDescription>
              Choose which emails you'd like to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-enabled" className="font-medium">
                  Enable Email Notifications
                </Label>
                <p className="text-sm text-gray-500">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-enabled"
                checked={preferences.emailEnabled}
                onCheckedChange={(checked) => updatePreference('emailEnabled', checked)}
              />
            </div>

            {preferences.emailEnabled && (
              <>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-claims">New claims & requests</Label>
                    <Switch
                      id="email-claims"
                      checked={preferences.emailNewClaims}
                      onCheckedChange={(checked) => updatePreference('emailNewClaims', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-bids">Bid updates</Label>
                    <Switch
                      id="email-bids"
                      checked={preferences.emailBidUpdates}
                      onCheckedChange={(checked) => updatePreference('emailBidUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-payments">Payment notifications</Label>
                    <Switch
                      id="email-payments"
                      checked={preferences.emailPaymentNotifications}
                      onCheckedChange={(checked) =>
                        updatePreference('emailPaymentNotifications', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-marketing">Marketing & updates</Label>
                    <Switch
                      id="email-marketing"
                      checked={preferences.emailMarketingEmails}
                      onCheckedChange={(checked) =>
                        updatePreference('emailMarketingEmails', checked)
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="digest-frequency">Email Digest Frequency</Label>
                  <Select
                    value={preferences.emailDigestFrequency}
                    onValueChange={(value) =>
                      updatePreference(
                        'emailDigestFrequency',
                        value as NotificationPreferences['emailDigestFrequency']
                      )
                    }
                  >
                    <SelectTrigger id="digest-frequency" className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DIGEST_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Push/In-App Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Push Notifications
            </CardTitle>
            <CardDescription>
              Configure in-app and browser push notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-enabled" className="font-medium">
                  Enable Push Notifications
                </Label>
                <p className="text-sm text-gray-500">
                  Receive real-time alerts in your browser
                </p>
              </div>
              <Switch
                id="push-enabled"
                checked={preferences.pushEnabled}
                onCheckedChange={(checked) => updatePreference('pushEnabled', checked)}
              />
            </div>

            {preferences.pushEnabled && (
              <>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-jobs">New job opportunities</Label>
                    <Switch
                      id="push-jobs"
                      checked={preferences.pushNewJobs}
                      onCheckedChange={(checked) => updatePreference('pushNewJobs', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-urgent">Urgent alerts</Label>
                    <Switch
                      id="push-urgent"
                      checked={preferences.pushUrgentAlerts}
                      onCheckedChange={(checked) =>
                        updatePreference('pushUrgentAlerts', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-status">Status updates</Label>
                    <Switch
                      id="push-status"
                      checked={preferences.pushStatusUpdates}
                      onCheckedChange={(checked) =>
                        updatePreference('pushStatusUpdates', checked)
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Sound Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Sound Settings
            </CardTitle>
            <CardDescription>
              Configure notification sounds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sound-enabled" className="font-medium">
                  Enable Notification Sounds
                </Label>
                <p className="text-sm text-gray-500">
                  Play a sound when you receive notifications
                </p>
              </div>
              <Switch
                id="sound-enabled"
                checked={preferences.soundEnabled}
                onCheckedChange={(checked) => updatePreference('soundEnabled', checked)}
              />
            </div>

            {preferences.soundEnabled && (
              <>
                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="sound-type">Notification Sound</Label>
                  <Select
                    value={preferences.soundType}
                    onValueChange={(value) => updatePreference('soundType', value)}
                  >
                    <SelectTrigger id="sound-type" className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SOUND_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quiet Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Quiet Hours
            </CardTitle>
            <CardDescription>
              Pause non-urgent notifications during specific hours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="quiet-enabled" className="font-medium">
                  Enable Quiet Hours
                </Label>
                <p className="text-sm text-gray-500">
                  Only urgent alerts will be delivered during quiet hours
                </p>
              </div>
              <Switch
                id="quiet-enabled"
                checked={preferences.quietHoursEnabled}
                onCheckedChange={(checked) =>
                  updatePreference('quietHoursEnabled', checked)
                }
              />
            </div>

            {preferences.quietHoursEnabled && (
              <>
                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-start">Start Time</Label>
                    <Input
                      id="quiet-start"
                      type="time"
                      value={preferences.quietHoursStart}
                      onChange={(e) =>
                        updatePreference('quietHoursStart', e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quiet-end">End Time</Label>
                    <Input
                      id="quiet-end"
                      type="time"
                      value={preferences.quietHoursEnd}
                      onChange={(e) => updatePreference('quietHoursEnd', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quiet-timezone">Timezone</Label>
                  <Select
                    value={preferences.quietHoursTimezone}
                    onValueChange={(value) =>
                      updatePreference('quietHoursTimezone', value)
                    }
                  >
                    <SelectTrigger id="quiet-timezone" className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* SMS Notifications (Contractors Only) */}
        {isContractor && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                SMS Notifications
              </CardTitle>
              <CardDescription>
                Receive urgent job alerts via SMS when you're offline
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-enabled" className="font-medium">
                    Enable SMS Notifications
                  </Label>
                  <p className="text-sm text-gray-500">
                    Standard SMS rates may apply
                  </p>
                </div>
                <Switch
                  id="sms-enabled"
                  checked={preferences.smsEnabled}
                  onCheckedChange={(checked) => updatePreference('smsEnabled', checked)}
                />
              </div>

              {preferences.smsEnabled && (
                <>
                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="sms-phone">Mobile Number</Label>
                    <Input
                      id="sms-phone"
                      type="tel"
                      placeholder="04XX XXX XXX"
                      value={preferences.smsPhone}
                      onChange={(e) => updatePreference('smsPhone', e.target.value)}
                      className="max-w-xs"
                    />
                    <p className="text-xs text-gray-500">
                      Australian mobile numbers only
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={savePreferences}
            disabled={!hasChanges || isSaving}
            className="min-w-[140px]"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

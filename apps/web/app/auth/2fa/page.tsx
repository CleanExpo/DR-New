/**
 * Two-Factor Authentication Verification Page
 *
 * Displayed after successful password authentication for users with 2FA enabled
 * Allows users to enter TOTP code or backup code
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, HelpCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TwoFactorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [method, setMethod] = useState<'totp' | 'backup'>('totp');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState(3);

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      router.push('/login');
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!code.trim()) {
        setError('Please enter the code');
        return;
      }

      const response = await fetch('/api/auth/2fa/verify', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code: code.trim(),
          useBackupCode: method === 'backup',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Verification failed');
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts);
        }
        return;
      }

      // Verification successful - redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed';
      setError(message);
    } finally {
      setLoading(false);
      setCode('');
    }
  };

  const codePlaceholder = method === 'totp' ? '000000' : 'XXXX-XXXX-XXXX';
  const codeMaxLength = method === 'totp' ? 6 : 12;
  const codeInputType = method === 'totp' ? 'text' : 'text';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
          <CardDescription>
            {email && `Verify your identity for ${email}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
                {remainingAttempts <= 1 && (
                  <div className="mt-2 text-sm">
                    ⚠️ {remainingAttempts} attempt remaining before account lockout
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Methods Tabs */}
          <Tabs value={method} onValueChange={(value) => setMethod(value as 'totp' | 'backup')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="totp">Authenticator App</TabsTrigger>
              <TabsTrigger value="backup">Backup Code</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {/* TOTP Method */}
              <TabsContent value="totp" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="totp-code">6-Digit Code</Label>
                  <p className="text-sm text-gray-400">
                    Enter the code from your authenticator app (Google Authenticator, Authy, Microsoft Authenticator, etc.)
                  </p>
                  <Input
                    id="totp-code"
                    type="text"
                    inputMode="numeric"
                    placeholder={codePlaceholder}
                    value={code}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setCode(value);
                    }}
                    maxLength={6}
                    disabled={loading}
                    className="text-center text-2xl font-mono tracking-widest"
                    autoFocus
                  />
                </div>
              </TabsContent>

              {/* Backup Code Method */}
              <TabsContent value="backup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-code">Backup Code</Label>
                  <p className="text-sm text-gray-400">
                    Use one of your backup codes if you don't have access to your authenticator app
                  </p>
                  <Input
                    id="backup-code"
                    type="text"
                    placeholder={codePlaceholder}
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    maxLength={12}
                    disabled={loading}
                    className="font-mono"
                    autoFocus
                  />
                  <p className="text-xs text-gray-400">
                    Format: XXXX-XXXX-XXXX (dashes are optional)
                  </p>
                </div>
              </TabsContent>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={loading || !code}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify
              </Button>
            </form>

            {/* Help Section */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Lost your authenticator?</p>
                  <p>
                    If you can't access your authenticator app, use a backup code instead. If you've lost those too, contact support.
                  </p>
                </div>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

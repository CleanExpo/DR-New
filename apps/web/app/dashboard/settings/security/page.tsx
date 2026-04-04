// @ts-nocheck
/**
 * User Security Settings Page
 *
 * Manages user security settings including:
 * - Two-Factor Authentication (2FA) setup
 * - 2FA disabling
 * - Backup codes management
 * - Session management
 * - Account lockout status
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertCircle, CheckCircle, Copy, Shield, Lock, LogOut } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface TwoFactorStatus {
  twoFactorEnabled: boolean;
  twoFactorSetupAt?: string;
}

interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
  manualEntryKey: string;
}

export default function SecuritySettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 2FA States
  const [twoFactorStatus, setTwoFactorStatus] = useState<TwoFactorStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Setup wizard states
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [setupStep, setSetupStep] = useState<'qr' | 'verify'>('qr');
  const [setupData, setSetupData] = useState<TwoFactorSetup | null>(null);
  const [setupLoading, setSetupLoading] = useState(false);
  const [setupError, setSetupError] = useState<string | null>(null);

  // Verification states
  const [verificationCode, setVerificationCode] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  // Disable states
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [disableLoading, setDisableLoading] = useState(false);

  // Backup codes display
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Load 2FA status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/auth/2fa/setup');
        if (response.ok) {
          const data = await response.json();
          setTwoFactorStatus(data);
        }
      } catch (error) {
        console.error('Failed to fetch 2FA status:', error);
      } finally {
        setLoadingStatus(false);
      }
    };

    if (session?.user) {
      fetchStatus();
    }
  }, [session]);

  // Initialize 2FA setup
  const handleStartSetup = async () => {
    setSetupError(null);
    setSetupLoading(true);

    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to setup 2FA');
      }

      const data: TwoFactorSetup = await response.json();
      setSetupData(data);
      setSetupStep('qr');
      setShowSetupWizard(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Setup failed';
      setSetupError(message);
    } finally {
      setSetupLoading(false);
    }
  };

  // Verify 2FA code
  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      setVerifyError('Please enter the verification code');
      return;
    }

    if (!setupData) {
      setVerifyError('Setup data missing');
      return;
    }

    setVerifyError(null);
    setVerifyLoading(true);

    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          secret: setupData.secret,
          code: verificationCode,
          backupCodes: setupData.backupCodes,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Verification failed');
      }

      // Success - show backup codes
      setSetupStep('verify');
      setShowBackupCodes(true);
      setTwoFactorStatus({ twoFactorEnabled: true, twoFactorSetupAt: new Date().toISOString() });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Verification failed';
      setVerifyError(message);
    } finally {
      setVerifyLoading(false);
    }
  };

  // Disable 2FA
  const handleDisable = async () => {
    setDisableLoading(true);

    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setTwoFactorStatus({ twoFactorEnabled: false });
        setShowDisableConfirm(false);
        // Require re-authentication for security
        await signOut({ redirect: true, callbackUrl: '/login' });
      } else {
        throw new Error('Failed to disable 2FA');
      }
    } catch (error) {
      console.error('Disable 2FA error:', error);
    } finally {
      setDisableLoading(false);
    }
  };

  // Copy backup code to clipboard
  const copyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (status === 'loading' || loadingStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
          <p className="mt-2 text-gray-400">Manage your account security and two-factor authentication</p>
        </div>

        <Tabs defaultValue="2fa" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="2fa">
              <Shield className="mr-2 h-4 w-4" />
              Two-Factor Authentication
            </TabsTrigger>
            <TabsTrigger value="sessions">
              <Lock className="mr-2 h-4 w-4" />
              Active Sessions
            </TabsTrigger>
          </TabsList>

          {/* 2FA Tab */}
          <TabsContent value="2fa" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account with 2FA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {twoFactorStatus?.twoFactorEnabled ? (
                  <div className="space-y-4">
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Two-factor authentication is enabled on your account
                      </AlertDescription>
                    </Alert>

                    {twoFactorStatus.twoFactorSetupAt && (
                      <p className="text-sm text-gray-400">
                        Enabled on {new Date(twoFactorStatus.twoFactorSetupAt).toLocaleDateString()}
                      </p>
                    )}

                    <Button
                      variant="destructive"
                      onClick={() => setShowDisableConfirm(true)}
                    >
                      Disable 2FA
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Two-factor authentication is not enabled. Enable it to secure your account.
                      </AlertDescription>
                    </Alert>

                    <Button onClick={handleStartSetup} disabled={setupLoading}>
                      {setupLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Enable 2FA
                    </Button>

                    {setupError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{setupError}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                  Manage your active sessions across devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4">
                  You are currently signed in to this device
                </p>
                <Button
                  variant="outline"
                  onClick={() => signOut({ redirect: true })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 2FA Setup Wizard Dialog */}
        <Dialog open={showSetupWizard} onOpenChange={setShowSetupWizard}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                {setupStep === 'qr'
                  ? 'Scan the QR code with your authenticator app'
                  : 'Enter the code from your authenticator app'}
              </DialogDescription>
            </DialogHeader>

            {setupStep === 'qr' && setupData && (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <img
                    src={setupData.qrCode}
                    alt="2FA QR Code"
                    className="w-full h-auto"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Manual Entry Key</Label>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
                    {setupData.manualEntryKey}
                  </p>
                </div>

                <Button
                  onClick={() => setSetupStep('verify')}
                  className="w-full"
                >
                  I've Scanned the Code
                </Button>
              </div>
            )}

            {setupStep === 'verify' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    disabled={verifyLoading}
                  />
                </div>

                {verifyError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{verifyError}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleVerify}
                  disabled={verifyLoading || verificationCode.length < 6}
                  className="w-full"
                >
                  {verifyLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify Code
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Backup Codes Display Dialog */}
        <Dialog open={showBackupCodes} onOpenChange={setShowBackupCodes}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Save Your Backup Codes</DialogTitle>
              <DialogDescription>
                Keep these codes in a safe place. Use them to access your account if you lose access to your authenticator app.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800 font-medium">
                  ⚠️ Save these codes now. You won't be able to see them again.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {setupData?.backupCodes.map((code, index) => (
                  <button
                    key={index}
                    onClick={() => copyBackupCode(code)}
                    className="p-2 font-mono text-sm bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 text-left transition"
                  >
                    <div className="flex items-center justify-between">
                      <span>{code}</span>
                      {copiedCode === code && <CheckCircle className="h-4 w-4 text-green-600" />}
                    </div>
                  </button>
                ))}
              </div>

              <Button onClick={() => setShowBackupCodes(false)} className="w-full">
                I've Saved My Codes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Disable 2FA Confirmation Dialog */}
        <Dialog open={showDisableConfirm} onOpenChange={setShowDisableConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Disable Two-Factor Authentication?</DialogTitle>
              <DialogDescription>
                This will remove 2FA protection from your account. You'll need to sign in again.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Button
                variant="destructive"
                onClick={handleDisable}
                disabled={disableLoading}
                className="w-full"
              >
                {disableLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Disable 2FA
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowDisableConfirm(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

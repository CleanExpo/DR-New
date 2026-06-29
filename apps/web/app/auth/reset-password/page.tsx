'use client';

/**
 * /auth/reset-password
 *
 * Single page with two modes, keyed on the `token` query param:
 *  - No token  → "request reset" form. POSTs { email } to
 *                /api/auth/reset-password (always returns a neutral message
 *                so account existence is not revealed).
 *  - ?token=…  → "set new password" form. PUTs { token, password } to
 *                /api/auth/reset-password, then redirects to /login.
 *
 * The path matches the link sent by sendPasswordResetEmail
 * (`${baseUrl}/auth/reset-password?token=…`).
 */

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff, CheckCircle, Mail, KeyRound } from 'lucide-react';

function extractError(data: any): string {
  const msg = data?.error || 'Something went wrong. Please try again.';
  const details = data?.details;
  if (!details) return msg;
  let detailText = '';
  if (Array.isArray(details)) {
    detailText = details.map((d: any) => d?.message ?? String(d)).join(' ');
  } else if (typeof details === 'object') {
    detailText = Object.values(details).flat().map((d: any) => d?.message ?? String(d)).join(' ');
  } else {
    detailText = String(details);
  }
  return detailText ? `${msg}: ${detailText}` : msg;
}

function Shell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00BFA6] to-[#2196F3] rounded-2xl mb-4">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">{description}</p>
        </div>
        {children}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Remembered it?{' '}
            <Link href="/login" className="text-[#00BFA6] hover:text-[#00A693] font-medium transition-colors">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Request reset (no token)
// ---------------------------------------------------------------------------

function RequestReset() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(extractError(data));
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <Shell title="Check your email" description="Password reset requested">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-gray-300">
              If an account exists for <span className="text-white font-medium">{email}</span>, a
              password reset link has been sent. The link expires in 1 hour.
            </p>
          </CardContent>
        </Card>
      </Shell>
    );
  }

  return (
    <Shell title="Reset your password" description="Enter your email to receive a reset link">
      <Card className="backdrop-blur-sm bg-white/10 border-white/20">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl text-center text-white">Forgot password</CardTitle>
          <CardDescription className="text-center text-gray-400">
            We'll email you a secure link to set a new password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#00BFA6] focus:ring-[#00BFA6]"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-white font-semibold py-3 rounded-lg transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send reset link
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Shell>
  );
}

// ---------------------------------------------------------------------------
// Set new password (token present)
// ---------------------------------------------------------------------------

function SetNewPassword({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(extractError(data));
      }
      setDone(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <Shell title="Password updated" description="You're all set">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-gray-300">Your password has been reset. Redirecting you to sign in...</p>
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-[#00BFA6] mt-4" />
          </CardContent>
        </Card>
      </Shell>
    );
  }

  return (
    <Shell title="Choose a new password" description="Set a strong password for your account">
      <Card className="backdrop-blur-sm bg-white/10 border-white/20">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl text-center text-white">New password</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Use at least 8 characters with a mix of letters, numbers and symbols
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                New password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#00BFA6] focus:ring-[#00BFA6] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-white font-medium">
                Confirm new password
              </Label>
              <Input
                id="confirm"
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                disabled={loading}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#00BFA6] focus:ring-[#00BFA6]"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-white font-semibold py-3 rounded-lg transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Update password
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Shell>
  );
}

function ResetPasswordRouter() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  return token ? <SetNewPassword token={token} /> : <RequestReset />;
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
        </div>
      }
    >
      <ResetPasswordRouter />
    </Suspense>
  );
}

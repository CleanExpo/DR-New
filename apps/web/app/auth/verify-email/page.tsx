'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Check, AlertCircle, Mail } from 'lucide-react';
import Link from 'next/link';

/**
 * UNI-161: Email Verification Page
 *
 * Automatically verifies the user's email when they click the verification link.
 * Shows success/error states and provides option to resend verification email.
 */
export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'already_verified'>('verifying');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const token = searchParams?.get('token');

    if (!token) {
      setStatus('error');
      setMessage('No verification token provided. Please check your email for the verification link.');
      return;
    }

    // Verify email immediately
    verifyEmail(token);
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
      const data = await response.json();

      if (data.success) {
        if (data.alreadyVerified) {
          setStatus('already_verified');
          setMessage('Your email is already verified. You can log in to your account.');
        } else {
          setStatus('success');
          setMessage('Your email has been verified successfully!');

          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
      } else {
        setStatus('error');
        setMessage(data.error || 'Verification failed. The link may have expired.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred during verification. Please try again.');
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setResending(true);

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Verification email sent! Please check your inbox.');
        setEmail('');
      } else {
        alert(data.error || 'Failed to send verification email');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-6">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          {status === 'verifying' && (
            <>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <CardTitle className="text-2xl">Verifying Your Email</CardTitle>
              <CardDescription>
                Please wait while we verify your email address...
              </CardDescription>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Email Verified!</CardTitle>
              <CardDescription>
                Your email has been successfully verified
              </CardDescription>
            </>
          )}

          {status === 'already_verified' && (
            <>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Already Verified</CardTitle>
              <CardDescription>
                Your email address is already verified
              </CardDescription>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl">Verification Failed</CardTitle>
              <CardDescription>
                We couldn't verify your email address
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status Message */}
          <Alert variant={status === 'success' || status === 'already_verified' ? 'default' : 'destructive'}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>

          {/* Success State Actions */}
          {(status === 'success' || status === 'already_verified') && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                {status === 'success'
                  ? 'Redirecting you to login...'
                  : 'You can now access your account'}
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild className="w-full">
                  <Link href="/login">Go to Login</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Error State - Resend Option */}
          {status === 'error' && (
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Resend Verification Email
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your email address and we'll send you a new verification link.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                  <Button
                    onClick={handleResendVerification}
                    disabled={resending}
                  >
                    {resending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Resend'
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Back to Login</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/support">Contact Support</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Having trouble? <Link href="/support" className="text-primary hover:underline">Contact Support</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

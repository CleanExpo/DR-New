import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Welcome Aboard! | NRPG Platform',
  description: 'Your tenant account has been created successfully',
};

/**
 * UNI-160: Onboarding Success Page
 *
 * Confirmation page shown after successful tenant registration.
 * Provides next steps and email verification instructions.
 */
export default function OnboardingSuccessPage({
  searchParams,
}: {
  searchParams: { tenant?: string };
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl">Welcome Aboard!</CardTitle>
          <CardDescription className="text-lg">
            Your account has been created successfully
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* What Happens Next */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-primary" />
              What happens next?
            </h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="font-semibold text-foreground mr-2">1.</span>
                <span>
                  <strong className="text-foreground">Check your email</strong> - We've sent you a verification link to confirm your email address.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-foreground mr-2">2.</span>
                <span>
                  <strong className="text-foreground">Verify your email</strong> - Click the link in the email to activate your account.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-foreground mr-2">3.</span>
                <span>
                  <strong className="text-foreground">Start your free trial</strong> - You have 14 days to explore all features.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-foreground mr-2">4.</span>
                <span>
                  <strong className="text-foreground">Set up your team</strong> - Invite team members and configure your workspace.
                </span>
              </li>
            </ol>
          </div>

          {/* Trial Information */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Your Free Trial</h4>
            <p className="text-sm text-muted-foreground">
              You have <strong className="text-foreground">14 days</strong> to explore the platform with full access to all features.
              No credit card required to get started.
            </p>
          </div>

          {/* Support */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-2">Need Help?</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Our support team is here to help you get started. Check out our resources:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <a
                href="/docs/getting-started"
                className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="font-medium">Getting Started Guide</div>
                <div className="text-xs text-muted-foreground mt-1">Learn the basics</div>
              </a>
              <a
                href="/docs"
                className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="font-medium">Documentation</div>
                <div className="text-xs text-muted-foreground mt-1">Detailed guides</div>
              </a>
              <a
                href="mailto:support@disasterrecovery.com.au"
                className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="font-medium">Contact Support</div>
                <div className="text-xs text-muted-foreground mt-1">Get in touch</div>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1">
              <Link href="/login">
                Go to Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

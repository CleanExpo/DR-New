import { Metadata } from 'next';
import { TenantOnboardingWizard } from '@/components/tenant/tenant-onboarding-wizard';

export const metadata: Metadata = {
  title: 'Create Your Account | NRPG Platform',
  description: 'Sign up for a new tenant account on the NRPG disaster recovery platform',
};

/**
 * UNI-160: Tenant Onboarding Page
 *
 * Public page for self-service tenant registration.
 * Displays the multi-step onboarding wizard.
 */
export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Welcome to NRPG Platform
          </h1>
          <p className="text-lg text-muted-foreground">
            Create your account and start managing disaster recovery services
          </p>
        </div>

        <TenantOnboardingWizard />

        <div className="text-center mt-8 text-sm text-muted-foreground">
          Already have an account?{' '}
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

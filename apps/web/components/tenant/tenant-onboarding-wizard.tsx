'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Check, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * UNI-160: Tenant Onboarding Wizard Component
 *
 * Multi-step wizard for self-service tenant registration:
 * 1. Business Information
 * 2. Subdomain Selection
 * 3. Admin Account Setup
 * 4. Billing Tier Selection
 * 5. Confirmation & Checkout
 */

interface OnboardingFormData {
  // Step 1: Business Info
  tenantName: string;
  industry: string;
  primaryColor: string;
  secondaryColor: string;

  // Step 2: Subdomain
  subdomain: string;

  // Step 3: Admin Account
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  adminPasswordConfirm: string;

  // Step 4: Billing Tier
  tier: 'BASIC' | 'PRO' | 'ENTERPRISE';
}

const INDUSTRIES = [
  { value: 'restoration', label: 'Disaster Recovery & Restoration' },
  { value: 'insurance', label: 'Insurance Claims Management' },
  { value: 'construction', label: 'Construction & Trades' },
  { value: 'healthcare', label: 'Healthcare Services' },
  { value: 'legal', label: 'Legal Services' },
  { value: 'other', label: 'Other' },
];

const BILLING_TIERS = [
  {
    value: 'BASIC',
    label: 'Basic',
    price: 'Free',
    description: '14-day trial, then $49/month',
    features: [
      '5 users',
      '50 requests per month',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    value: 'PRO',
    label: 'Professional',
    price: '$199/month',
    description: 'For growing businesses',
    features: [
      '50 users',
      '500 requests per month',
      'Advanced analytics',
      'Custom domain',
      'White-label branding',
      'API access',
      'Priority support',
    ],
  },
  {
    value: 'ENTERPRISE',
    label: 'Enterprise',
    price: '$499/month',
    description: 'For large organizations',
    features: [
      'Unlimited users',
      'Unlimited requests',
      'Advanced analytics',
      'Custom domain',
      'White-label branding',
      'API access',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom integrations',
    ],
  },
];

export function TenantOnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
  const [subdomainSuggestions, setSubdomainSuggestions] = useState<string[]>([]);

  const [formData, setFormData] = useState<OnboardingFormData>({
    tenantName: '',
    industry: 'restoration',
    primaryColor: '#00BFA6',
    secondaryColor: '#00A693',
    subdomain: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    adminPasswordConfirm: '',
    tier: 'BASIC',
  });

  // Debounced subdomain availability check
  useEffect(() => {
    if (formData.subdomain.length >= 3) {
      const timer = setTimeout(() => {
        checkSubdomainAvailability(formData.subdomain);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSubdomainAvailable(null);
      setSubdomainSuggestions([]);
    }
  }, [formData.subdomain]);

  const checkSubdomainAvailability = async (subdomain: string) => {
    setCheckingSubdomain(true);
    try {
      const response = await fetch(`/api/tenants/check-availability?subdomain=${encodeURIComponent(subdomain)}`);
      const data = await response.json();
      setSubdomainAvailable(data.available);
      setSubdomainSuggestions(data.suggestions || []);
    } catch (err) {
      console.error('Failed to check subdomain availability:', err);
    } finally {
      setCheckingSubdomain(false);
    }
  };

  const handleInputChange = (field: keyof OnboardingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const validateStep = (): boolean => {
    setError(null);

    switch (currentStep) {
      case 1:
        if (!formData.tenantName.trim()) {
          setError('Business name is required');
          return false;
        }
        if (formData.tenantName.length < 2) {
          setError('Business name must be at least 2 characters');
          return false;
        }
        break;

      case 2:
        if (!formData.subdomain.trim()) {
          setError('Subdomain is required');
          return false;
        }
        if (!/^[a-z0-9-]+$/.test(formData.subdomain)) {
          setError('Subdomain can only contain lowercase letters, numbers, and hyphens');
          return false;
        }
        if (subdomainAvailable === false) {
          setError('This subdomain is already taken. Please choose another.');
          return false;
        }
        if (subdomainAvailable === null) {
          setError('Please wait while we check subdomain availability');
          return false;
        }
        break;

      case 3:
        if (!formData.adminName.trim()) {
          setError('Your name is required');
          return false;
        }
        if (!formData.adminEmail.trim()) {
          setError('Email is required');
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
          setError('Please enter a valid email address');
          return false;
        }
        if (!formData.adminPassword) {
          setError('Password is required');
          return false;
        }
        if (formData.adminPassword.length < 8) {
          setError('Password must be at least 8 characters');
          return false;
        }
        if (formData.adminPassword !== formData.adminPasswordConfirm) {
          setError('Passwords do not match');
          return false;
        }
        break;

      case 4:
        if (!formData.tier) {
          setError('Please select a billing tier');
          return false;
        }
        break;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/tenants/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantName: formData.tenantName,
          subdomain: formData.subdomain,
          industry: formData.industry,
          adminName: formData.adminName,
          adminEmail: formData.adminEmail,
          adminPassword: formData.adminPassword,
          tier: formData.tier,
          primaryColor: formData.primaryColor,
          secondaryColor: formData.secondaryColor,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create tenant');
      }

      // If checkout URL is provided, redirect to Stripe
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        // For free tier, redirect to success page or login
        router.push(`/onboarding/success?tenant=${data.tenant.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="tenantName">Business Name *</Label>
              <Input
                id="tenantName"
                value={formData.tenantName}
                onChange={(e) => handleInputChange('tenantName', e.target.value)}
                placeholder="Acme Restoration Services"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primaryColor">Primary Colour</Label>
                <Input
                  id="primaryColor"
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  className="mt-1 h-10"
                />
              </div>
              <div>
                <Label htmlFor="secondaryColor">Secondary Colour</Label>
                <Input
                  id="secondaryColor"
                  type="color"
                  value={formData.secondaryColor}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                  className="mt-1 h-10"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="subdomain">Choose Your Subdomain *</Label>
              <div className="flex items-center mt-1 space-x-2">
                <Input
                  id="subdomain"
                  value={formData.subdomain}
                  onChange={(e) => handleInputChange('subdomain', e.target.value.toLowerCase())}
                  placeholder="acme-restoration"
                  className="flex-1"
                />
                <span className="text-muted-foreground whitespace-nowrap">
                  .{process.env.NEXT_PUBLIC_BASE_DOMAIN || 'disasterrecovery.com.au'}
                </span>
              </div>

              {checkingSubdomain && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking availability...
                </p>
              )}

              {!checkingSubdomain && subdomainAvailable === true && (
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  This subdomain is available!
                </p>
              )}

              {!checkingSubdomain && subdomainAvailable === false && (
                <div className="mt-2">
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    This subdomain is already taken
                  </p>
                  {subdomainSuggestions.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Suggestions:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {subdomainSuggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => handleInputChange('subdomain', suggestion)}
                            className="text-sm px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-md"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Your subdomain will be your unique URL for accessing the platform. Choose something memorable and professional.
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="adminName">Your Name *</Label>
              <Input
                id="adminName"
                value={formData.adminName}
                onChange={(e) => handleInputChange('adminName', e.target.value)}
                placeholder="John Smith"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="adminEmail">Email Address *</Label>
              <Input
                id="adminEmail"
                type="email"
                value={formData.adminEmail}
                onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                placeholder="john@acme.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="adminPassword">Password *</Label>
              <Input
                id="adminPassword"
                type="password"
                value={formData.adminPassword}
                onChange={(e) => handleInputChange('adminPassword', e.target.value)}
                placeholder="••••••••"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <Label htmlFor="adminPasswordConfirm">Confirm Password *</Label>
              <Input
                id="adminPasswordConfirm"
                type="password"
                value={formData.adminPasswordConfirm}
                onChange={(e) => handleInputChange('adminPasswordConfirm', e.target.value)}
                placeholder="••••••••"
                className="mt-1"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              All plans include a 14-day free trial. No credit card required for the Basic plan.
            </p>

            <div className="grid gap-4">
              {BILLING_TIERS.map((tier) => (
                <Card
                  key={tier.value}
                  className={`cursor-pointer transition-[border-color,box-shadow] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${
                    formData.tier === tier.value
                      ? 'border-primary ring-2 ring-primary'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('tier', tier.value)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{tier.label}</CardTitle>
                      <span className="text-lg font-bold">{tier.price}</span>
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-4 h-4 mr-2 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        const selectedTier = BILLING_TIERS.find((t) => t.value === formData.tier);
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Review Your Information</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-medium text-muted-foreground">Business Name</dt>
                  <dd className="mt-1">{formData.tenantName}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Industry</dt>
                  <dd className="mt-1">
                    {INDUSTRIES.find((i) => i.value === formData.industry)?.label}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Subdomain</dt>
                  <dd className="mt-1">
                    {formData.subdomain}.{process.env.NEXT_PUBLIC_BASE_DOMAIN || 'disasterrecovery.com.au'}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Admin Email</dt>
                  <dd className="mt-1">{formData.adminEmail}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Billing Plan</dt>
                  <dd className="mt-1">
                    {selectedTier?.label} - {selectedTier?.price}
                  </dd>
                </div>
              </dl>
            </div>

            <Alert>
              <AlertDescription>
                By clicking "Create Account", you agree to our Terms of Service and Privacy Policy.
                {formData.tier !== 'BASIC' && ' You will be redirected to Stripe to complete payment.'}
              </AlertDescription>
            </Alert>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Step {currentStep} of 5: {
              currentStep === 1 ? 'Business Information' :
              currentStep === 2 ? 'Subdomain Selection' :
              currentStep === 3 ? 'Admin Account Setup' :
              currentStep === 4 ? 'Choose Your Plan' :
              'Review & Confirm'
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded ${
                  step <= currentStep ? 'bg-primary' : 'bg-muted'
                } ${step < 5 ? 'mr-2' : ''}`}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Step Content */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || loading}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < 5 ? (
              <Button type="button" onClick={handleNext} disabled={loading}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

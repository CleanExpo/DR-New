'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { accountSchema, type AccountData } from '@/lib/validation/onboarding';
import { useOnboarding } from '@/lib/contexts/OnboardingContext';
import { StepNavigation } from '../StepNavigation';
import { cn } from '@/lib/utils';

export function AccountCreation() {
  const { data, updateData, nextStep, currentStep } = useOnboarding();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<AccountData>({
    resolver: zodResolver(accountSchema),
    mode: 'onChange',
    defaultValues: data.account as AccountData,
  });

  const password = watch('password', '');

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character', met: /[!@#$%^&*]/.test(password) },
  ];

  const onSubmit = (formData: AccountData) => {
    updateData('account', formData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-600 mb-6">
          Start your journey with NRPG by creating your contractor account
        </p>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              {...register('fullName')}
              placeholder="John Smith"
              className={cn(errors.fullName && 'border-red-500')}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="john@example.com"
              className={cn(errors.email && 'border-red-500')}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Create a strong password"
                className={cn(errors.password && 'border-red-500', 'pr-10')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password strength indicator */}
            {password && (
              <div className="mt-3 space-y-2">
                <div className="text-xs font-medium text-gray-700">Password requirements:</div>
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      {req.met ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300" />
                      )}
                      <span className={cn(req.met ? 'text-green-700' : 'text-gray-500')}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                placeholder="Re-enter your password"
                className={cn(errors.confirmPassword && 'border-red-500', 'pr-10')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <Checkbox
                id="acceptTerms"
                {...register('acceptTerms')}
                className={cn(errors.acceptTerms && 'border-red-500')}
              />
              <div className="flex-1">
                <label htmlFor="acceptTerms" className="text-sm text-gray-700 cursor-pointer">
                  I accept the{' '}
                  <a href="/terms" target="_blank" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-500 mt-1">{errors.acceptTerms.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="acceptNRPGAgreement"
                {...register('acceptNRPGAgreement')}
                className={cn(errors.acceptNRPGAgreement && 'border-red-500')}
              />
              <div className="flex-1">
                <label
                  htmlFor="acceptNRPGAgreement"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  I accept the{' '}
                  <a
                    href="/nrpg-membership-agreement"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    NRPG Membership Agreement
                  </a>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                {errors.acceptNRPGAgreement && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.acceptNRPGAgreement.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={7}
        onNext={handleSubmit(onSubmit)}
        onBack={() => {}}
        isValid={isValid}
      />
    </form>
  );
}

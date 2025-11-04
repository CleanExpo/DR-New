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
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Your Account</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start your journey with NRPG by creating your contractor account
          </p>
        </div>

        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <Input
                id="fullName"
                {...register('fullName')}
                placeholder="John Smith"
                className={cn(
                  'pl-12 h-12 rounded-xl border-2 transition-all',
                  errors.fullName
                    ? 'border-red-500 focus:ring-red-100'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:focus:border-blue-600 dark:focus:ring-blue-900/50'
                )}
              />
            </div>
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
                <X className="w-3 h-3" />
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john@example.com"
                className={cn(
                  'pl-12 h-12 rounded-xl border-2 transition-all',
                  errors.email
                    ? 'border-red-500 focus:ring-red-100'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:focus:border-blue-600 dark:focus:ring-blue-900/50'
                )}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
                <X className="w-3 h-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Create a strong password"
                className={cn(
                  'pl-12 pr-12 h-12 rounded-xl border-2 transition-all',
                  errors.password
                    ? 'border-red-500 focus:ring-red-100'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:focus:border-blue-600 dark:focus:ring-blue-900/50'
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password strength indicator */}
            {password && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">Password Requirements:</div>
                <div className="space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <div className={cn(
                        'flex items-center justify-center w-4 h-4 rounded-full transition-all',
                        req.met ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
                      )}>
                        {req.met ? (
                          <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                        ) : (
                          <X className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                      <span className={cn(
                        'transition-colors',
                        req.met ? 'text-green-700 dark:text-green-400 font-medium' : 'text-gray-500 dark:text-gray-400'
                      )}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.password && (
              <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
                <X className="w-3 h-3" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                placeholder="Re-enter your password"
                className={cn(
                  'pl-12 pr-12 h-12 rounded-xl border-2 transition-all',
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-100'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:focus:border-blue-600 dark:focus:ring-blue-900/50'
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
                <X className="w-3 h-3" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <Checkbox
                id="acceptTerms"
                {...register('acceptTerms')}
                className={cn('mt-0.5', errors.acceptTerms && 'border-red-500')}
              />
              <div className="flex-1">
                <label htmlFor="acceptTerms" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  I accept the{' '}
                  <a href="/terms" target="_blank" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold underline decoration-2 underline-offset-2">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" target="_blank" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold underline decoration-2 underline-offset-2">
                    Privacy Policy
                  </a>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
              <Checkbox
                id="acceptNRPGAgreement"
                {...register('acceptNRPGAgreement')}
                className={cn('mt-0.5', errors.acceptNRPGAgreement && 'border-red-500')}
              />
              <div className="flex-1">
                <label
                  htmlFor="acceptNRPGAgreement"
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  I accept the{' '}
                  <a
                    href="/nrpg-membership-agreement"
                    target="_blank"
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold underline decoration-2 underline-offset-2"
                  >
                    NRPG Membership Agreement
                  </a>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                {errors.acceptNRPGAgreement && (
                  <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
                    <X className="w-3 h-3" />
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

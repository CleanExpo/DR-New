'use client'

import React from 'react'
import { Button } from '@/src/design-system'
import { TrendingUp, Briefcase, Users, CheckCircle2, Zap, Award, DollarSign, Calendar, Shield } from 'lucide-react'
import Link from 'next/link'

export function ContractorHero() {
  const metrics = [
    {
      icon: DollarSign,
      label: 'Average Monthly Revenue',
      value: '$45,000+',
      description: 'For active contractors',
    },
    {
      icon: Briefcase,
      label: 'New Opportunities',
      value: '150+',
      description: 'Jobs posted monthly',
    },
    {
      icon: Users,
      label: 'Contractor Network',
      value: '5,000+',
      description: 'Growing nationwide',
    },
    {
      icon: TrendingUp,
      label: 'Average Job Value',
      value: '$12,500',
      description: 'Per restoration project',
    },
  ]

  const trustBadges = [
    {
      icon: CheckCircle2,
      text: 'Trusted by 5,000+ Contractors',
    },
    {
      icon: Shield,
      text: 'Verified Platform',
    },
    {
      icon: Award,
      text: 'Vetted Jobs Only',
    },
  ]

  return (
    <section
      className="relative w-full min-h-[600px] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden"
      aria-labelledby="contractor-hero-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(0,191,166,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(0,71,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Accent Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Trust Badges - Mobile Top */}
            <div className="flex flex-wrap gap-4 lg:hidden">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <badge.icon className="w-4 h-4 text-teal-400" aria-hidden="true" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1
                id="contractor-hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Grow Your{' '}
                <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                  Restoration Business
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                Join Australia's premier restoration network. Access vetted jobs, grow revenue, and build your reputation with the industry's most trusted platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup?type=contractor" className="inline-block">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-teal-500/25 transition-[transform,box-shadow,background-color] duration-300 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] hover:shadow-xl hover:shadow-teal-500/30 hover:scale-105"
                  aria-label="Create contractor account"
                >
                  <TrendingUp className="w-5 h-5 mr-2" aria-hidden="true" />
                  Create Account
                </Button>
              </Link>

              <Link href="/contractor/opportunities" className="inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-400 font-semibold px-8 py-6 text-lg transition-[transform,border-color,background-color,color] duration-300 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] hover:scale-105"
                  aria-label="Browse available opportunities"
                >
                  <Briefcase className="w-5 h-5 mr-2" aria-hidden="true" />
                  Browse Opportunities
                </Button>
              </Link>
            </div>

            {/* Trust Badges - Desktop */}
            <div className="hidden lg:flex flex-wrap gap-6 pt-4">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-slate-300"
                >
                  <badge.icon className="w-5 h-5 text-teal-400" aria-hidden="true" />
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-teal-500/50 transition-[border-color,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:shadow-lg hover:shadow-teal-500/10"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-teal-500/20 to-blue-500/20 group-hover:from-teal-500/30 group-hover:to-blue-500/30 transition-colors">
                    <metric.icon
                      className="w-6 h-6 text-teal-400 group-hover:text-teal-300 transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white group-hover:text-teal-300 transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-300 group-hover:text-slate-200 transition-colors">
                    {metric.label}
                  </div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                    {metric.description}
                  </div>
                </div>

                {/* Hover Accent */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/0 to-blue-500/0 group-hover:from-teal-500/5 group-hover:to-blue-500/5 transition-[opacity] duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Value Proposition Banner */}
        <div className="mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-700/50">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-teal-500/20">
                    <Zap className="w-6 h-6 text-teal-400" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Instant Job Matching
                  </h3>
                  <p className="text-sm text-slate-400">
                    AI-powered matching connects you with the right opportunities based on your expertise and location.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Shield className="w-6 h-6 text-blue-400" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Verified Clients Only
                  </h3>
                  <p className="text-sm text-slate-400">
                    Work with pre-screened clients and insurance companies. No time wasters, just legitimate projects.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-teal-500/20">
                    <Award className="w-6 h-6 text-teal-400" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Build Your Reputation
                  </h3>
                  <p className="text-sm text-slate-400">
                    Earn verified reviews and showcase your expertise to attract premium clients and higher-value projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}

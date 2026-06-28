'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'

/**
 * ICA acceptance form (DR-886). Scroll-gate + checkbox + typed signature.
 *
 * The button stays disabled until the reader scrolls past the end-of-agreement
 * sentinel (`#ica-end`), ticks the checkbox, and types their legal name. All
 * three are re-validated server-side; this is UX, not the security boundary.
 */
export function AgreementAcceptance({ version }: { version: string }) {
  const [scrolledToEnd, setScrolledToEnd] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [signedName, setSignedName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [accepted, setAccepted] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setScrolledToEnd(true)
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const canSubmit = scrolledToEnd && agreed && signedName.trim().length >= 2 && !loading

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!canSubmit) return
    setLoading(true)
    try {
      const res = await fetch('/api/contractor/agreement/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ version, signedName, scrolledToEnd, agreed }),
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.error || json?.message || 'Could not record acceptance')
      }
      setAccepted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not record acceptance')
    } finally {
      setLoading(false)
    }
  }

  if (accepted) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 flex gap-3 items-start">
        <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-emerald-200 font-semibold">Agreement signed</p>
          <p className="text-emerald-300/80 text-sm mt-1">
            You accepted version {version} of the Independent Contractor Agreement. A
            countersigned copy will be available in your dashboard.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* End-of-agreement sentinel for the scroll-gate */}
      <div ref={sentinelRef} aria-hidden="true" />

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-5 mt-8"
      >
        <div className="flex items-center gap-2 text-teal-400">
          <ShieldCheck className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Sign the agreement</h3>
        </div>

        {!scrolledToEnd && (
          <p className="text-amber-300/90 text-sm">
            Please scroll through the full agreement above before signing.
          </p>
        )}

        <label className="flex items-start gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked)
              if (error) setError('')
            }}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <span>
            I have read and agree to the Independent Contractor Agreement (version{' '}
            {version}).
          </span>
        </label>

        <div className="space-y-1">
          <label htmlFor="signedName" className="text-sm text-slate-300">
            Type your full legal name to sign
          </label>
          <input
            id="signedName"
            type="text"
            value={signedName}
            onChange={(e) => {
              setSignedName(e.target.value)
              if (error) setError('')
            }}
            placeholder="Your registered legal name"
            className="w-full rounded-lg bg-slate-950 border border-blue-900/40 px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:border-teal-500 focus:outline-none"
          />
          <p className="text-xs text-slate-500">
            Must match the legal name on your NRPG profile.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign agreement
        </button>
      </form>
    </div>
  )
}

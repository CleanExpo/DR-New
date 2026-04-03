'use client';

import { useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { HCaptcha } from '@/components/captcha/HCaptcha';

interface EventClaimFormProps {
  eventId: string;
  defaultState: string;
  defaultDamageType: 'STORM_DAMAGE' | 'FLOOD_DAMAGE' | 'WATER_DAMAGE';
  ctaLabel: string;
}

const INSURERS = [
  'NRMA', 'SUNCORP', 'ALLIANZ', 'QBE', 'IAG', 'CGU', 'MEDIBANK', 'OTHER',
] as const;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function EventClaimForm({
  eventId,
  defaultState,
  defaultDamageType,
  ctaLabel,
}: EventClaimFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [suburb, setSuburb] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [hasInsurance, setHasInsurance] = useState<boolean | null>(null);
  const [insurer, setInsurer] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
  }, []);

  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyConsent) {
      setErrorMessage('Please accept the privacy collection notice to continue.');
      return;
    }
    if (!captchaToken) {
      setErrorMessage('Please complete the verification above.');
      return;
    }

    setSubmitState('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/public/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          propertyAddress: address.trim() || suburb.trim(),
          suburb: suburb.trim(),
          state: defaultState,
          postcode: postcode.trim(),
          damageType: defaultDamageType,
          damageDescription: description.trim(),
          hasInsurance: hasInsurance ?? false,
          insuranceProvider: insurer || undefined,
          urgency: 'URGENT',
          preferredContactMethod: 'EMAIL',
          marketingConsent: false,
          captchaToken,
          honeypot: '',
          source: eventId,
        }),
      });

      if (res.ok) {
        setSubmitState('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(
          data?.message ?? 'Something went wrong. Please try again.'
        );
        setSubmitState('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setSubmitState('error');
    }
  };

  if (submitState === 'success') {
    return (
      <div className="bg-[#0f1115] border border-[#0d9488] rounded-sm p-8 text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-14 w-14 text-[#0d9488]" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-white">Request Received</h3>
        <p className="text-[#9ca3af]">
          We&apos;ve received your claim enquiry and a coordinator will be in touch shortly. Response times are typically under 60 minutes for urgent cases.
        </p>
        <div className="pt-4 space-y-2 text-left bg-[#1a1f2e] rounded-sm p-4">
          <p className="text-sm font-semibold text-[#0d9488] uppercase tracking-wide">What happens next</p>
          <ol className="text-sm text-[#9ca3af] space-y-2 list-decimal list-inside">
            <li>A NRPG coordinator reviews your request (within 60 min)</li>
            <li>We match you with a certified local contractor</li>
            <li>Contractor calls to arrange emergency assessment</li>
            <li>Assessment documented for your insurance claim</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Emergency claim enquiry form">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
      />

      <div className="space-y-5">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-[#d1d5db] mb-1">
              First name <span aria-label="required" className="text-[#dc2626]">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              required
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-3 bg-[#1a1f2e] border border-[#374151] rounded-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] text-base"
              placeholder="Jane"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-[#d1d5db] mb-1">
              Last name <span aria-label="required" className="text-[#dc2626]">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              required
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-3 bg-[#1a1f2e] border border-[#374151] rounded-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] text-base"
              placeholder="Smith"
            />
          </div>
        </div>

        {/* Suburb + Postcode */}
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-3">
            <label htmlFor="suburb" className="block text-sm font-medium text-[#d1d5db] mb-1">
              Suburb <span aria-label="required" className="text-[#dc2626]">*</span>
            </label>
            <input
              id="suburb"
              type="text"
              required
              autoComplete="address-level2"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className="w-full px-3 py-3 bg-[#1a1f2e] border border-[#374151] rounded-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] text-base"
              placeholder="Carnarvon"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="postcode" className="block text-sm font-medium text-[#d1d5db] mb-1">
              Postcode <span aria-label="required" className="text-[#dc2626]">*</span>
            </label>
            <input
              id="postcode"
              type="text"
              required
              inputMode="numeric"
              maxLength={4}
              autoComplete="postal-code"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.replace(/\D/g, ''))}
              className="w-full px-3 py-3 bg-[#1a1f2e] border border-[#374151] rounded-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] text-base"
              placeholder="6701"
            />
          </div>
        </div>

        {/* Street address (optional) */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-[#d1d5db] mb-1">
            Street address <span className="text-[#6b7280] font-normal">(optional)</span>
          </label>
          <input
            id="address"
            type="text"
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-3 bg-[#1a1f2e] border border-[#374151] rounded-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] text-base"
            placeholder="14 Ocean Drive"
          />
        </div>

        {/* Damage description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#d1d5db] mb-1">
            Describe the damage <span aria-label="required" className="text-[#dc2626]">*</span>
          </label>
          <textarea
            id="description"
            required
            rows={3}
            minLength={10}
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-3 bg-[#1a1f2e] border border-[#374151] rounded-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] text-base resize-none"
            placeholder="Roof damage, water ingress, structural issues..."
          />
          <p className="text-xs text-[#6b7280] mt-1">{description.length}/500</p>
        </div>

        {/* Insurance toggle */}
        <div>
          <p className="block text-sm font-medium text-[#d1d5db] mb-2" id="insurance-label">
            Do you have home/contents insurance? <span aria-label="required" className="text-[#dc2626]">*</span>
          </p>
          <div role="group" aria-labelledby="insurance-label" className="flex gap-3">
            <button
              type="button"
              onClick={() => setHasInsurance(true)}
              aria-pressed={hasInsurance === true}
              className={`flex-1 py-3 rounded-sm border text-sm font-semibold transition-colors ${
                hasInsurance === true
                  ? 'bg-[#0d9488] border-[#0d9488] text-white'
                  : 'bg-[#1a1f2e] border-[#374151] text-[#9ca3af] hover:border-[#0d9488]'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => { setHasInsurance(false); setInsurer(''); }}
              aria-pressed={hasInsurance === false}
              className={`flex-1 py-3 rounded-sm border text-sm font-semibold transition-colors ${
                hasInsurance === false
                  ? 'bg-[#374151] border-[#374151] text-white'
                  : 'bg-[#1a1f2e] border-[#374151] text-[#9ca3af] hover:border-[#374151]'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Insurer selector (conditional) */}
        {hasInsurance === true && (
          <div>
            <label htmlFor="insurer" className="block text-sm font-medium text-[#d1d5db] mb-1">
              Insurer
            </label>
            <select
              id="insurer"
              value={insurer}
              onChange={(e) => setInsurer(e.target.value)}
              className="w-full px-3 py-3 bg-[#1a1f2e] border border-[#374151] rounded-sm text-white focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] text-base"
            >
              <option value="">Select insurer (optional)</option>
              {INSURERS.map((i) => (
                <option key={i} value={i}>{i === 'OTHER' ? 'Other' : i}</option>
              ))}
            </select>
          </div>
        )}

        {/* Contact details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#d1d5db] mb-1">
              Email <span aria-label="required" className="text-[#dc2626]">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-3 bg-[#1a1f2e] border border-[#374151] rounded-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] text-base"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#d1d5db] mb-1">
              Mobile <span aria-label="required" className="text-[#dc2626]">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-3 bg-[#1a1f2e] border border-[#374151] rounded-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] text-base"
              placeholder="0400 000 000"
            />
          </div>
        </div>

        {/* hCaptcha */}
        <HCaptcha
          onVerify={handleCaptchaVerify}
          onExpire={handleCaptchaExpire}
          theme="dark"
          size="compact"
        />

        {/* Privacy collection notice */}
        <div className="flex items-start gap-3 bg-[#0f1115] border border-[#374151] rounded-sm p-4">
          <input
            id="privacy"
            type="checkbox"
            required
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            className="mt-0.5 h-5 w-5 rounded-sm border-[#374151] bg-[#1a1f2e] accent-[#0d9488] cursor-pointer flex-shrink-0"
            aria-describedby="privacy-text"
          />
          <label htmlFor="privacy" id="privacy-text" className="text-xs text-[#9ca3af] cursor-pointer">
            I consent to NRPG collecting my personal information to process this service enquiry, match me with a certified contractor, and communicate about my claim. Information will be handled in accordance with the{' '}
            <a href="/privacy" className="text-[#0d9488] underline underline-offset-2 hover:text-[#0f766e]">
              Privacy Policy
            </a>
            . I understand I may withdraw consent at any time.{' '}
            <span className="text-[#dc2626] font-medium">*</span>
          </label>
        </div>

        {/* Error message */}
        {(submitState === 'error' || errorMessage) && (
          <div role="alert" className="flex items-start gap-2 bg-[#1a0a0a] border border-[#dc2626]/40 rounded-sm p-4">
            <AlertCircle className="h-5 w-5 text-[#dc2626] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-[#f87171]">{errorMessage}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitState === 'submitting' || !privacyConsent || !captchaToken || hasInsurance === null}
          className="w-full py-4 bg-[#dc2626] hover:bg-[#b91c1c] disabled:bg-[#374151] disabled:cursor-not-allowed text-white font-bold text-lg rounded-sm transition-colors flex items-center justify-center gap-2"
          aria-busy={submitState === 'submitting'}
        >
          {submitState === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Submitting...
            </>
          ) : (
            ctaLabel
          )}
        </button>

        <p className="text-xs text-[#6b7280] text-center">
          24/7 emergency response &middot; IICRC-certified contractors &middot; All insurers accepted
        </p>
      </div>
    </form>
  );
}

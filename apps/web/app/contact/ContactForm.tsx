'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/icons';

const SUBJECTS = [
  'Platform Support',
  'Contractor Registration',
  'Client Portal Access',
  'Technical Issues',
  'Partnership Opportunities',
  'White-Label Licensing',
  'General Inquiry',
  'Other',
] as const;

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full px-4 py-3 bg-[#0F1115] border border-[#374151] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00BFA6]';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setError(null);

    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      firstName: String(form.get('firstName') || ''),
      lastName: String(form.get('lastName') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      subject: String(form.get('subject') || 'General Inquiry'),
      message: String(form.get('message') || ''),
      website: String(form.get('website') || ''), // honeypot
    };

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.success) {
        setStatus('success');
        formEl.reset();
        return;
      }
      setError(
        data?.details?.[0]?.message ||
          data?.error ||
          'We could not send your message. Please try again.',
      );
      setStatus('error');
    } catch {
      setError('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="bg-[#00BFA6]/10 border border-[#00BFA6]/30 rounded-xl p-8 text-center"
      >
        <h3 className="font-poppins font-bold text-2xl text-white mb-2">Message sent</h3>
        <p className="text-[#9CA3AF]">
          Thanks — your enquiry has been received. We aim to respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — visually hidden, off-screen, not announced. Bots fill it; humans don't. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-[#F9FAFB] mb-2">
            First Name
          </label>
          <input id="firstName" type="text" name="firstName" required className={inputClass} placeholder="John" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-[#F9FAFB] mb-2">
            Last Name
          </label>
          <input id="lastName" type="text" name="lastName" required className={inputClass} placeholder="Smith" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#F9FAFB] mb-2">
          Email
        </label>
        <input id="email" type="email" name="email" required className={inputClass} placeholder="john@example.com" />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#F9FAFB] mb-2">
          Phone <span className="text-[#9CA3AF]">(optional)</span>
        </label>
        <input id="phone" type="tel" name="phone" className={inputClass} placeholder="+61 4XX XXX XXX" />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[#F9FAFB] mb-2">
          Subject
        </label>
        <select id="subject" name="subject" defaultValue="General Inquiry" className={inputClass}>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#F9FAFB] mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={3000}
          required
          className={`${inputClass} resize-none`}
          placeholder="Tell us how we can help you..."
        />
      </div>

      {status === 'error' && error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-semibold py-3 disabled:opacity-60"
      >
        <ChatMessage size="sm" className="mr-2" aria-hidden="true" />
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ExternalLink, Gift, ArrowRight, ShoppingBag } from 'lucide-react';

interface CertificateResponse {
  success: boolean;
  certificate?: {
    html: string;
    template: { path: string; sha256: string };
  };
  error?: string;
  message?: string;
}

export default function ContractorCertificatePage() {
  const { status } = useSession();
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState<CertificateResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/onboarding/certificate', { cache: 'no-store' });
        const data = (await res.json()) as CertificateResponse;
        setPayload(data);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      void load();
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Certificate</CardTitle>
            <CardDescription>Sign in to view your certificate.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => void signIn()} className="w-full" size="lg">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Card>
          <CardContent className="py-12 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading certificate…
          </CardContent>
        </Card>
      </div>
    );
  }

  const html = payload?.certificate?.html ?? null;

  if (!payload?.success || !html) {
    return (
      <div className="container mx-auto py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Certificate unavailable</CardTitle>
            <CardDescription>{payload?.message || payload?.error || 'Complete training to unlock your certificate.'}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl space-y-3">
      <div className="flex items-center justify-end">
        <Button
          variant="outline"
          onClick={() => {
            const w = window.open('', '_blank', 'noopener,noreferrer');
            if (!w) return;
            w.document.open();
            w.document.write(html);
            w.document.close();
          }}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open fullscreen
        </Button>
      </div>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <iframe title="NRP Certificate" sandbox="allow-same-origin" srcDoc={html} className="w-full h-[75vh] bg-white" />
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">
        Template: {payload.certificate?.template.path} · sha256 {payload.certificate?.template.sha256}
      </p>

      {/* Welcome Pack CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6"
      >
        <div className="rounded-sm border border-teal-500/30 bg-[#050505] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Left — text content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-teal-500/10">
                  <Gift className="h-5 w-5 text-teal-400" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Claim Your NRPG Contractor Welcome Pack
                </h2>
              </div>

              <p className="text-gray-400 leading-relaxed max-w-xl">
                Congratulations on completing your NRPG certification. Your Welcome Pack includes an NRPG branded polo, cap, sticker set, and van magnet — everything you need to rep the brand on site.
              </p>

              {/* Price badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-teal-500/10 border border-teal-500/20 px-3 py-1 text-sm font-semibold text-teal-400">
                  Included in onboarding
                </span>
                <span className="text-gray-500 text-sm line-through">$110 AUD</span>
                <span className="text-2xl font-bold text-[#00FF88]">$0</span>
              </div>
            </div>

            {/* Right — CTAs */}
            <div className="flex flex-col gap-3 md:items-end md:shrink-0">
              <Link href="/store/contractor-welcome-bundle">
                <Button
                  size="lg"
                  className="rounded-sm bg-teal-600 hover:bg-teal-500 text-white font-semibold w-full md:w-auto transition-colors"
                >
                  Claim Welcome Pack
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link
                href="/store"
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-teal-400 transition-colors md:justify-end"
              >
                <ShoppingBag className="h-4 w-4" />
                Browse full store →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

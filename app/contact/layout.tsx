import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us 24/7 | Emergency Restoration Brisbane | Call 1300 309 361',
  description: 'Contact Phill McGurk - IICRC Master Restorer. 24/7 emergency response Brisbane, Ipswich, Logan. Call 1300 309 361 for immediate water, fire, mould & storm damage assistance.',
  keywords: 'contact disaster recovery Brisbane, emergency restoration phone, 24/7 emergency contact Brisbane, water damage emergency number, IICRC Master Restorer contact, Phill McGurk restoration, emergency response Brisbane contact, 1300 309 361',
  openGraph: {
    title: 'Contact 24/7 Emergency Restoration Brisbane | 1300 309 361',
    description: '24/7 emergency contact for disaster recovery. Phill McGurk - IICRC Master Restorer. 60-minute response time across Brisbane, Ipswich & Logan.',
    type: 'website',
    url: 'https://dr-new-ten.vercel.app/contact',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Emergency Restoration Brisbane | 1300 309 361',
    description: '24/7 emergency response. IICRC Master Restorer Phill McGurk. Call now: 1300 309 361',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

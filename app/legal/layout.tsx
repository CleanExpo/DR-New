import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Information | Privacy Policy & Terms | Disaster Recovery Brisbane',
  description: 'Legal information, privacy policy and terms of service for Disaster Recovery Brisbane. IICRC Master Restorer Phill McGurk - transparent, professional emergency services.',
  keywords: 'privacy policy Brisbane restoration, terms of service disaster recovery, legal information Brisbane, restoration company terms, emergency services privacy, Disaster Recovery Brisbane legal',
  openGraph: {
    title: 'Legal Information | Disaster Recovery Brisbane',
    description: 'Privacy policy and terms of service. Transparent professional services from IICRC Master Restorer Phill McGurk.',
    type: 'website',
    url: 'https://dr-new-ten.vercel.app/legal',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/legal',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

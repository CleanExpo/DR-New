import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Phill McGurk | IICRC Master Restorer Brisbane | Expert Profile',
  description: 'Phill McGurk - One of Queensland\'s elite IICRC Master Restorers. 20+ years disaster recovery expertise. Certified in water, fire, mould & storm damage restoration. Brisbane specialist.',
  keywords: 'Phill McGurk Master Restorer, IICRC Master Restorer Brisbane, disaster recovery expert Brisbane, certified restoration specialist, water damage expert Brisbane, fire damage restoration expert, mould remediation specialist, Phill McGurk credentials',
  openGraph: {
    title: 'Phill McGurk | IICRC Master Restorer Brisbane',
    description: 'Meet Phill McGurk - one of QLD\'s limited IICRC Master Restorers. Expert in emergency water, fire, mould & storm damage restoration across Brisbane, Ipswich & Logan.',
    type: 'profile',
    url: 'https://dr-new-ten.vercel.app/about-phil-mcgurk',
  },
  twitter: {
    card: 'summary',
    title: 'Phill McGurk | IICRC Master Restorer Brisbane',
    description: 'Elite IICRC Master Restorer. 20+ years expertise. Emergency restoration specialist Brisbane.',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/about-phil-mcgurk',
  },
};

export default function AboutPhillMcGurkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

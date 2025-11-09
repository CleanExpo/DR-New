import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | IICRC Master Restorer Brisbane | Disaster Recovery Excellence',
  description: 'Meet our expert team led by Phill McGurk - one of Queensland\'s limited IICRC Master Restorers. 20+ years emergency restoration experience. Brisbane, Ipswich, Logan specialist.',
  keywords: 'about disaster recovery Brisbane, IICRC Master Restorer Brisbane, Phill McGurk restoration expert, emergency restoration team Brisbane, certified disaster recovery, professional restoration Brisbane, Master Restorer QLD, water damage experts Brisbane',
  openGraph: {
    title: 'About Disaster Recovery Brisbane | IICRC Master Restorer Team',
    description: 'Led by Phill McGurk - IICRC Master Restorer. Expert emergency restoration team serving Brisbane, Ipswich & Logan with 60-minute response times.',
    type: 'website',
    url: 'https://dr-new-ten.vercel.app/about',
  },
  twitter: {
    card: 'summary',
    title: 'About Disaster Recovery Brisbane | IICRC Master Restorer',
    description: 'Expert restoration team led by Phill McGurk. IICRC Master Restorer certification. 24/7 emergency services.',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | Find Services & Information | Disaster Recovery Brisbane',
  description: 'Search disaster recovery services and information. Find water, fire, mould & storm damage solutions from IICRC Master Restorer Phill McGurk across Brisbane, Ipswich & Logan.',
  keywords: 'search disaster recovery, find restoration services Brisbane, search water damage, find emergency restoration, Brisbane services search, disaster recovery information',
  openGraph: {
    title: 'Search Disaster Recovery Services Brisbane',
    description: 'Find expert restoration services and information from IICRC Master Restorer Phill McGurk.',
    type: 'website',
    url: 'https://dr-new-ten.vercel.app/search',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/search',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

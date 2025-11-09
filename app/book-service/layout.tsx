import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Service Online | Emergency Restoration Brisbane | 1300 309 361',
  description: 'Book disaster recovery service with IICRC Master Restorer Phill McGurk. Online booking for water, fire, mould & storm damage. Brisbane 60-minute emergency response.',
  keywords: 'book restoration service Brisbane, online booking emergency restoration, schedule disaster recovery, book water damage service, reserve fire damage restoration, book mould remediation Brisbane',
  openGraph: {
    title: 'Book Restoration Service Online | IICRC Master Restorer Brisbane',
    description: 'Secure online booking with Phill McGurk - IICRC Master Restorer. Emergency and planned services across Brisbane, Ipswich & Logan.',
    type: 'website',
    url: 'https://dr-new-ten.vercel.app/book-service',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/book-service',
  },
};

export default function BookServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

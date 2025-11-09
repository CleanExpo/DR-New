import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule Service | Book Emergency Restoration Brisbane | 1300 309 361',
  description: 'Schedule restoration service with IICRC Master Restorer Phill McGurk. Book water, fire, mould & storm damage assessment. 60-minute Brisbane emergency response or planned service.',
  keywords: 'schedule restoration Brisbane, book emergency service, restoration appointment Brisbane, schedule water damage repair, book fire damage restoration, plan mould remediation, schedule assessment Brisbane',
  openGraph: {
    title: 'Schedule Restoration Service Brisbane | IICRC Master Restorer',
    description: 'Book service with Phill McGurk - IICRC Master Restorer. Emergency or planned restoration across Brisbane, Ipswich & Logan.',
    type: 'website',
    url: 'https://dr-new-ten.vercel.app/schedule',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/schedule',
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

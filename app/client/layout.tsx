import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Area | Disaster Recovery Brisbane | Service Information',
  description: 'Client information and resources from Disaster Recovery Brisbane. IICRC Master Restorer Phill McGurk - professional emergency restoration services.',
  keywords: 'client area Brisbane restoration, client portal disaster recovery, service information Brisbane, client resources emergency restoration',
  openGraph: {
    title: 'Client Area | Disaster Recovery Brisbane',
    description: 'Client information and resources. Professional services from IICRC Master Restorer Phill McGurk.',
    type: 'website',
    url: 'https://dr-new-ten.vercel.app/client',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/client',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

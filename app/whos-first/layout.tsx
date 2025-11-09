import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who\'s First? Emergency Priority Guide | Disaster Recovery Brisbane',
  description: 'Understand emergency service priorities from IICRC Master Restorer Phill McGurk. Learn how emergency restoration services are prioritized in Brisbane disasters.',
  keywords: 'emergency priority Brisbane, who gets helped first, disaster response priority, emergency service order, restoration priority Brisbane, emergency triage disaster recovery',
  openGraph: {
    title: 'Emergency Service Priority Guide | IICRC Master Restorer Brisbane',
    description: 'Understand emergency response priorities. Expert guidance from Phill McGurk on disaster recovery service order.',
    type: 'article',
    url: 'https://dr-new-ten.vercel.app/whos-first',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/whos-first',
  },
};

export default function WhosFirstLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

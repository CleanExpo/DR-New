import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Guide | What To Do During Water, Fire & Storm Damage | Brisbane',
  description: 'Emergency disaster recovery guide from IICRC Master Restorer Phill McGurk. Step-by-step instructions for water, fire, mould & storm emergencies. Brisbane expert advice 24/7.',
  keywords: 'emergency guide Brisbane, what to do water damage, fire damage emergency steps, storm damage response, flood emergency guide, mould emergency Brisbane, disaster recovery guide, emergency restoration steps Brisbane',
  openGraph: {
    title: 'Emergency Disaster Recovery Guide | IICRC Master Restorer Brisbane',
    description: 'Expert emergency guide from Phill McGurk. Learn what to do during water, fire, mould & storm disasters. Brisbane 24/7 emergency advice.',
    type: 'article',
    url: 'https://dr-new-ten.vercel.app/emergency-guide',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/emergency-guide',
  },
};

export default function EmergencyGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

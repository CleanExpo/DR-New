import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is It Covered? Insurance Coverage Check | Brisbane Disaster Recovery',
  description: 'Check if your damage is covered. IICRC Master Restorer Phill McGurk explains insurance coverage for water, fire, mould & storm damage. Brisbane expert advice.',
  keywords: 'is damage covered, insurance coverage Brisbane, water damage covered, fire damage insurance, storm damage coverage, what insurance covers Brisbane, claim eligibility Brisbane, insurance coverage check',
  openGraph: {
    title: 'Insurance Coverage Check | IICRC Master Restorer Brisbane',
    description: 'Find out if your damage is covered. Expert guidance from Phill McGurk. Brisbane insurance coverage expertise.',
    type: 'article',
    url: 'https://dr-new-ten.vercel.app/is-it-covered',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/is-it-covered',
  },
};

export default function IsItCoveredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

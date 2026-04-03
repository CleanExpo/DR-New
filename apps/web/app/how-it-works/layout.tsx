import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works | NRPG Disaster Recovery Australia',
  description: 'See how the NRPG platform works. Report damage, get matched with a certified contractor, and start your disaster recovery — all in minutes, 24/7 across Australia.',
}

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

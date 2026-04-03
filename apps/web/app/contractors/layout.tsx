import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find a Certified Contractor | NRPG Disaster Recovery Australia',
  description: 'Browse IICRC-certified disaster recovery contractors near you. Find specialists for water damage, fire restoration, mould remediation and storm damage across Australia.',
}

export default function ContractorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rate Schedule | NRPG Disaster Recovery Australia',
  description: 'View NRPG\'s published rate schedule for disaster recovery services. Transparent pricing for water extraction, drying, fire restoration, mould remediation and storm damage repair.',
}

export default function RatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

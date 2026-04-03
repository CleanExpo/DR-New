import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cost Estimate | Disaster Recovery Pricing — NRPG',
  description: 'Get an instant cost estimate for water damage, fire restoration, mould remediation and storm damage repair. Transparent pricing from IICRC-certified contractors across Australia.',
}

export default function CostEstimateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

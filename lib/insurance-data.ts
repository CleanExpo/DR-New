export interface InsuranceCompany {
  id: string
  name: string
  fullName: string
  type: 'residential' | 'commercial' | 'both'
  description?: string
}

export const insuranceCompanies: InsuranceCompany[] = [
  {
    id: 'nrma',
    name: 'NRMA',
    fullName: 'NRMA Insurance',
    type: 'residential',
  },
  {
    id: 'suncorp',
    name: 'Suncorp',
    fullName: 'Suncorp',
    type: 'residential',
  },
  {
    id: 'aami',
    name: 'AAMI',
    fullName: 'AAMI',
    type: 'residential',
  },
  {
    id: 'qbe',
    name: 'QBE',
    fullName: 'QBE Insurance',
    type: 'commercial',
  },
  {
    id: 'allianz',
    name: 'Allianz',
    fullName: 'Allianz',
    type: 'residential',
  },
  {
    id: 'cgu',
    name: 'CGU',
    fullName: 'CGU Insurance',
    type: 'both',
  },
  {
    id: 'gio',
    name: 'GIO',
    fullName: 'GIO',
    type: 'both',
  },
  {
    id: 'budget-direct',
    name: 'Budget',
    fullName: 'Budget Direct',
    type: 'residential',
  },
  {
    id: 'racv',
    name: 'RACV',
    fullName: 'RACV',
    type: 'residential',
  },
  {
    id: 'raa',
    name: 'RAA',
    fullName: 'RAA',
    type: 'residential',
  },
  {
    id: 'rac',
    name: 'RAC',
    fullName: 'RAC',
    type: 'residential',
  },
  {
    id: 'racq',
    name: 'RACQ',
    fullName: 'RACQ',
    type: 'residential',
  },
  {
    id: 'vero',
    name: 'Vero',
    fullName: 'Vero Insurance',
    type: 'commercial',
  },
  {
    id: 'zurich',
    name: 'Zurich',
    fullName: 'Zurich Insurance',
    type: 'commercial',
  },
]

export function getInsuranceById(id: string): InsuranceCompany | undefined {
  return insuranceCompanies.find(insurance => insurance.id === id)
}

export function getAllInsuranceIds(): string[] {
  return insuranceCompanies.map(insurance => insurance.id)
}

export function getInsuranceByType(type: 'residential' | 'commercial'): InsuranceCompany[] {
  return insuranceCompanies.filter(insurance => 
    insurance.type === type || insurance.type === 'both'
  )
}


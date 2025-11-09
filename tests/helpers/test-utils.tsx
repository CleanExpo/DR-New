import React from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Add custom render function with providers if needed
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock data generators
export const mockEmergencyRequest = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '0412345678',
  service: 'water-damage',
  location: 'Hamilton',
  message: 'Emergency water damage in basement',
  isEmergency: true,
}

export const mockContactFormData = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '+61456789012',
  service: 'fire-damage',
  message: 'Fire damage restoration inquiry',
}

export const mockLocationData = {
  suburb: 'Hamilton',
  postcode: '4007',
  state: 'QLD',
  region: 'Brisbane',
  serviceAreas: ['Hamilton', 'Ascot', 'New Farm', 'Toowong'],
}

export const mockServiceData = {
  id: 'water-damage',
  name: 'Water Damage Restoration',
  description: '24/7 emergency water damage restoration services',
  features: ['Emergency Response', 'Insurance Claims', 'Master Restorer'],
  locations: ['Brisbane', 'Ipswich', 'Logan'],
}

// Helper functions
export const waitForLoadingToFinish = () => {
  return new Promise((resolve) => setTimeout(resolve, 100))
}

export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
}

export const mockNextImage = () => {
  jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
      return <img {...props} />
    },
  }))
}

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const isValidAustralianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')
  return /^(\+61|0)[2-9]\d{8}$/.test(cleaned)
}

export const isValidPostcode = (postcode: string): boolean => {
  return /^\d{4}$/.test(postcode)
}

// Test data builders
export class EmergencyRequestBuilder {
  private data: any = { ...mockEmergencyRequest }

  withName(name: string) {
    this.data.name = name
    return this
  }

  withEmail(email: string) {
    this.data.email = email
    return this
  }

  withPhone(phone: string) {
    this.data.phone = phone
    return this
  }

  withService(service: string) {
    this.data.service = service
    return this
  }

  asEmergency(isEmergency: boolean = true) {
    this.data.isEmergency = isEmergency
    return this
  }

  build() {
    return { ...this.data }
  }
}

// Async helpers
export const waitFor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const retry = async <T,>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 100
): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    if (retries === 0) throw error
    await waitFor(delay)
    return retry(fn, retries - 1, delay)
  }
}

// DOM helpers
export const getByTestId = (container: HTMLElement, testId: string) => {
  return container.querySelector(`[data-testid="${testId}"]`)
}

export const getAllByTestId = (container: HTMLElement, testId: string) => {
  return Array.from(container.querySelectorAll(`[data-testid="${testId}"]`))
}

// Accessibility helpers
export const hasAccessibleName = (element: HTMLElement): boolean => {
  const ariaLabel = element.getAttribute('aria-label')
  const ariaLabelledBy = element.getAttribute('aria-labelledby')
  const title = element.getAttribute('title')
  const text = element.textContent

  return !!(ariaLabel || ariaLabelledBy || title || (text && text.trim()))
}

export const isKeyboardAccessible = (element: HTMLElement): boolean => {
  const tabIndex = element.getAttribute('tabindex')
  const role = element.getAttribute('role')
  const tagName = element.tagName.toLowerCase()

  const interactiveTags = ['a', 'button', 'input', 'select', 'textarea']

  return (
    interactiveTags.includes(tagName) ||
    (tabIndex !== null && parseInt(tabIndex) >= 0) ||
    role === 'button' ||
    role === 'link'
  )
}

// Performance helpers
export const measureRenderTime = async (fn: () => void): Promise<number> => {
  const start = performance.now()
  await fn()
  const end = performance.now()
  return end - start
}

// SEO helpers
export const validateMetaDescription = (description: string): boolean => {
  return description.length >= 50 && description.length <= 160
}

export const validateTitle = (title: string): boolean => {
  return title.length >= 10 && title.length <= 60
}

export const hasLocalKeywords = (content: string): boolean => {
  return /Brisbane|Queensland|QLD|Ipswich|Logan/i.test(content)
}

// Export all helpers
export default {
  mockEmergencyRequest,
  mockContactFormData,
  mockLocationData,
  mockServiceData,
  isValidEmail,
  isValidAustralianPhone,
  isValidPostcode,
  EmergencyRequestBuilder,
  waitFor,
  retry,
  hasAccessibleName,
  isKeyboardAccessible,
  measureRenderTime,
  validateMetaDescription,
  validateTitle,
  hasLocalKeywords,
}

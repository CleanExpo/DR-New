import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock emergency section component
const EmergencySection = ({ title, description }: { title: string; description: string }) => {
  return (
    <section data-testid="emergency-section" className="emergency-section">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="emergency-cta">
        <a href="/emergency/water-damage-brisbane" className="emergency-link">
          Get Emergency Help
        </a>
      </div>
    </section>
  )
}

describe('EmergencySection Component', () => {
  it('should render emergency section with title', () => {
    render(<EmergencySection title="24/7 Emergency Response" description="Fast response" />)

    expect(screen.getByText('24/7 Emergency Response')).toBeInTheDocument()
  })

  it('should render description text', () => {
    render(<EmergencySection title="Emergency" description="We provide rapid response" />)

    expect(screen.getByText('We provide rapid response')).toBeInTheDocument()
  })

  it('should render emergency call-to-action', () => {
    render(<EmergencySection title="Emergency" description="Fast response" />)

    const link = screen.getByText('Get Emergency Help')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/emergency/water-damage-brisbane')
  })

  it('should have correct test id', () => {
    render(<EmergencySection title="Emergency" description="Fast response" />)

    const section = screen.getByTestId('emergency-section')
    expect(section).toBeInTheDocument()
  })

  it('should apply correct CSS class', () => {
    render(<EmergencySection title="Emergency" description="Fast response" />)

    const section = screen.getByTestId('emergency-section')
    expect(section).toHaveClass('emergency-section')
  })
})

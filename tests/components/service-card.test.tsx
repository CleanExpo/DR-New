import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock service card component
const ServiceCard = ({
  title,
  description,
  icon,
  link,
}: {
  title: string
  description: string
  icon?: string
  link: string
}) => {
  return (
    <div className="service-card" data-testid="service-card">
      {icon && <div className="service-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} className="service-link">
        Learn More
      </a>
    </div>
  )
}

describe('ServiceCard Component', () => {
  const defaultProps = {
    title: 'Water Damage Restoration',
    description: 'Fast water damage repair services',
    link: '/services/water-damage',
  }

  it('should render service card with title', () => {
    render(<ServiceCard {...defaultProps} />)

    expect(screen.getByText('Water Damage Restoration')).toBeInTheDocument()
  })

  it('should render description', () => {
    render(<ServiceCard {...defaultProps} />)

    expect(screen.getByText('Fast water damage repair services')).toBeInTheDocument()
  })

  it('should render link with correct href', () => {
    render(<ServiceCard {...defaultProps} />)

    const link = screen.getByText('Learn More')
    expect(link).toHaveAttribute('href', '/services/water-damage')
  })

  it('should render icon when provided', () => {
    render(<ServiceCard {...defaultProps} icon="💧" />)

    expect(screen.getByText('💧')).toBeInTheDocument()
  })

  it('should not render icon when not provided', () => {
    render(<ServiceCard {...defaultProps} />)

    const icon = screen.queryByText('💧')
    expect(icon).not.toBeInTheDocument()
  })

  it('should have correct test id', () => {
    render(<ServiceCard {...defaultProps} />)

    expect(screen.getByTestId('service-card')).toBeInTheDocument()
  })

  it('should handle long descriptions', () => {
    const longDescription =
      'This is a very long description that should still render correctly in the service card component'

    render(<ServiceCard {...defaultProps} description={longDescription} />)

    expect(screen.getByText(longDescription)).toBeInTheDocument()
  })

  it('should handle special characters in title', () => {
    render(<ServiceCard {...defaultProps} title="Fire & Smoke Restoration" />)

    expect(screen.getByText('Fire & Smoke Restoration')).toBeInTheDocument()
  })
})

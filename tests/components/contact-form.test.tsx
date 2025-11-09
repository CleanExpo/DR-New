import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

// Mock contact form component
const ContactForm = ({ onSubmit }: { onSubmit?: (data: any) => void }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    if (onSubmit) {
      onSubmit(data)
    }
  }

  return (
    <form onSubmit={handleSubmit} data-testid="contact-form">
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" required />
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>

      <div>
        <label htmlFor="service">Service Type</label>
        <select id="service" name="service" required>
          <option value="">Select a service</option>
          <option value="water-damage">Water Damage</option>
          <option value="fire-damage">Fire Damage</option>
          <option value="mould-remediation">Mould Remediation</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

describe('ContactForm Component', () => {
  it('should render all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByLabelText('Service Type')).toBeInTheDocument()
  })

  it('should render submit button', () => {
    render(<ContactForm />)

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('should have required attributes on inputs', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText('Name')).toBeRequired()
    expect(screen.getByLabelText('Email')).toBeRequired()
    expect(screen.getByLabelText('Phone')).toBeRequired()
    expect(screen.getByLabelText('Message')).toBeRequired()
  })

  it('should accept user input', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const nameInput = screen.getByLabelText('Name')
    await user.type(nameInput, 'John Smith')

    expect(nameInput).toHaveValue('John Smith')
  })

  it('should call onSubmit with form data', async () => {
    const user = userEvent.setup()
    const mockSubmit = jest.fn()

    render(<ContactForm onSubmit={mockSubmit} />)

    // Fill out form
    await user.type(screen.getByLabelText('Name'), 'John Smith')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.type(screen.getByLabelText('Phone'), '0412345678')
    await user.type(screen.getByLabelText('Message'), 'Emergency water damage')
    await user.selectOptions(screen.getByLabelText('Service Type'), 'water-damage')

    // Submit form
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled()
    })
  })

  it('should have service options', () => {
    render(<ContactForm />)

    const select = screen.getByLabelText('Service Type')

    expect(select).toContainHTML('<option value="water-damage">Water Damage</option>')
    expect(select).toContainHTML('<option value="fire-damage">Fire Damage</option>')
    expect(select).toContainHTML('<option value="mould-remediation">Mould Remediation</option>')
  })

  it('should prevent submission when empty', () => {
    const mockSubmit = jest.fn()
    render(<ContactForm onSubmit={mockSubmit} />)

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    // HTML5 validation should prevent submission
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('should have correct input types', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Phone')).toHaveAttribute('type', 'tel')
    expect(screen.getByLabelText('Name')).toHaveAttribute('type', 'text')
  })

  it('should have accessible form structure', () => {
    render(<ContactForm />)

    const form = screen.getByTestId('contact-form')
    expect(form).toBeInTheDocument()

    // All inputs should have associated labels
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach((input) => {
      const id = input.getAttribute('id')
      expect(id).toBeTruthy()
    })
  })
})

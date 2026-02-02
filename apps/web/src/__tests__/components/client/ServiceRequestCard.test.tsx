import { render, screen, fireEvent } from '@testing-library/react';
import { ServiceRequestCard, ServiceRequest } from '@/components/client/ServiceRequestCard';

describe('ServiceRequestCard Component', () => {
  const mockOnViewDetails = jest.fn();
  const mockOnCancel = jest.fn();

  const baseMockRequest: ServiceRequest = {
    id: '123',
    serviceTitle: 'Water Damage Restoration',
    serviceCategory: 'water-damage',
    description: 'Burst pipe in bathroom causing water damage',
    location: 'Sydney, NSW',
    phone: '0412345678',
    urgency: 'urgent',
    status: 'PENDING',
    leadScore: 85,
    insurance: true,
    urgentResponse: true,
    preferredTime: 'Morning',
    createdAt: '2024-01-15T10:00:00Z',
    budget: '$5,000 - $10,000',
  };

  beforeEach(() => {
    mockOnViewDetails.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <ServiceRequestCard
        request={baseMockRequest}
        onViewDetails={mockOnViewDetails}
      />
    );
    expect(screen.getByText('Water Damage Restoration')).toBeInTheDocument();
  });

  it('displays all required fields correctly', () => {
    render(
      <ServiceRequestCard
        request={baseMockRequest}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Water Damage Restoration')).toBeInTheDocument();
    expect(screen.getByText('water-damage')).toBeInTheDocument();
    expect(screen.getByText('Sydney, NSW')).toBeInTheDocument();
    expect(screen.getByText('Burst pipe in bathroom causing water damage')).toBeInTheDocument();
  });

  it('displays custom category and urgency display names', () => {
    render(
      <ServiceRequestCard
        request={baseMockRequest}
        onViewDetails={mockOnViewDetails}
        categoryDisplayName="Water Damage"
        urgencyDisplayName="High Priority"
      />
    );

    expect(screen.getByText('Water Damage')).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
  });

  it('displays lead score with correct color for high score (>=80)', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, leadScore: 85 }}
        onViewDetails={mockOnViewDetails}
      />
    );

    const leadScoreBadge = screen.getByText('85');
    expect(leadScoreBadge).toBeInTheDocument();
    expect(leadScoreBadge).toHaveClass('bg-green-100', 'text-green-700');
  });

  it('displays lead score with correct color for medium score (60-79)', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, leadScore: 70 }}
        onViewDetails={mockOnViewDetails}
      />
    );

    const leadScoreBadge = screen.getByText('70');
    expect(leadScoreBadge).toHaveClass('bg-yellow-100', 'text-yellow-700');
  });

  it('displays lead score with correct color for low score (<60)', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, leadScore: 45 }}
        onViewDetails={mockOnViewDetails}
      />
    );

    const leadScoreBadge = screen.getByText('45');
    expect(leadScoreBadge).toHaveClass('bg-red-100', 'text-red-700');
  });

  it('does not display lead score when not provided', () => {
    const requestWithoutScore = { ...baseMockRequest };
    delete requestWithoutScore.leadScore;

    render(
      <ServiceRequestCard
        request={requestWithoutScore}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.queryByText('Lead Score:')).not.toBeInTheDocument();
  });

  it('displays correct status badge for PENDING', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, status: 'PENDING' }}
        onViewDetails={mockOnViewDetails}
      />
    );

    const statusBadge = screen.getByText('Pending');
    expect(statusBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('displays correct status badge for IN_PROGRESS', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, status: 'IN_PROGRESS' }}
        onViewDetails={mockOnViewDetails}
      />
    );

    const statusBadge = screen.getByText('In Progress');
    expect(statusBadge).toHaveClass('bg-purple-100', 'text-purple-800');
  });

  it('displays correct status badge for COMPLETED', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, status: 'COMPLETED' }}
        onViewDetails={mockOnViewDetails}
      />
    );

    const statusBadge = screen.getByText('Completed');
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('displays progress bar for IN_PROGRESS status', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, status: 'IN_PROGRESS' }}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('displays progress bar for MATCHED status', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, status: 'MATCHED' }}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('displays progress bar for COMPLETED status', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, status: 'COMPLETED' }}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('does not display progress bar for PENDING status', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, status: 'PENDING' }}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.queryByText('Progress')).not.toBeInTheDocument();
  });

  it('displays optional budget when provided', () => {
    render(
      <ServiceRequestCard
        request={baseMockRequest}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('$5,000 - $10,000')).toBeInTheDocument();
  });

  it('displays "To be discussed" when budget is not provided', () => {
    const requestWithoutBudget = { ...baseMockRequest };
    delete requestWithoutBudget.budget;

    render(
      <ServiceRequestCard
        request={requestWithoutBudget}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('To be discussed')).toBeInTheDocument();
  });

  it('displays phone number when provided', () => {
    render(
      <ServiceRequestCard
        request={baseMockRequest}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('0412345678')).toBeInTheDocument();
  });

  it('does not display phone number when not provided', () => {
    const requestWithoutPhone = { ...baseMockRequest };
    delete requestWithoutPhone.phone;

    render(
      <ServiceRequestCard
        request={requestWithoutPhone}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.queryByText('0412345678')).not.toBeInTheDocument();
  });

  it('displays insurance badge when insurance is true', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, insurance: true }}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Insurance Claim')).toBeInTheDocument();
  });

  it('does not display insurance badge when insurance is false', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, insurance: false }}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.queryByText('Insurance Claim')).not.toBeInTheDocument();
  });

  it('displays urgent response badge when urgentResponse is true', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, urgentResponse: true }}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Urgent Response')).toBeInTheDocument();
  });

  it('does not display urgent response badge when urgentResponse is false', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, urgentResponse: false }}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.queryByText('Urgent Response')).not.toBeInTheDocument();
  });

  it('displays preferred time badge when provided', () => {
    render(
      <ServiceRequestCard
        request={baseMockRequest}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Preferred: Morning')).toBeInTheDocument();
  });

  it('calls onViewDetails when View Details button is clicked', () => {
    render(
      <ServiceRequestCard
        request={baseMockRequest}
        onViewDetails={mockOnViewDetails}
      />
    );

    const viewDetailsButton = screen.getByText('View Details');
    fireEvent.click(viewDetailsButton);

    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
    expect(mockOnViewDetails).toHaveBeenCalledWith(baseMockRequest);
  });

  it('displays Cancel button only when status is PENDING and onCancel is provided', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, status: 'PENDING' }}
        onViewDetails={mockOnViewDetails}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('does not display Cancel button when status is not PENDING', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, status: 'IN_PROGRESS' }}
        onViewDetails={mockOnViewDetails}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('does not display Cancel button when onCancel is not provided', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, status: 'PENDING' }}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('calls onCancel when Cancel button is clicked', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, status: 'PENDING' }}
        onViewDetails={mockOnViewDetails}
        onCancel={mockOnCancel}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnCancel).toHaveBeenCalledWith('123');
  });

  it('applies custom className', () => {
    const { container } = render(
      <ServiceRequestCard
        request={baseMockRequest}
        onViewDetails={mockOnViewDetails}
        className="custom-class"
      />
    );

    const card = container.querySelector('.custom-class');
    expect(card).toBeInTheDocument();
  });

  it('formats date correctly in Australian format', () => {
    render(
      <ServiceRequestCard
        request={baseMockRequest}
        onViewDetails={mockOnViewDetails}
      />
    );

    // Date should be formatted as dd/mm/yyyy for Australian locale
    expect(screen.getByText('15/01/2024')).toBeInTheDocument();
  });

  it('displays correct urgency colors for emergency', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, urgency: 'emergency' }}
        onViewDetails={mockOnViewDetails}
        urgencyDisplayName="Emergency"
      />
    );

    const urgencyBadge = screen.getByText('Emergency');
    expect(urgencyBadge).toHaveClass('border-dr-emergency', 'text-dr-emergency');
  });

  it('displays correct urgency colors for normal', () => {
    render(
      <ServiceRequestCard
        request={{ ...baseMockRequest, urgency: 'normal' }}
        onViewDetails={mockOnViewDetails}
        urgencyDisplayName="Normal"
      />
    );

    const urgencyBadge = screen.getByText('Normal');
    expect(urgencyBadge).toHaveClass('border-portal-border', 'text-portal-muted');
  });

  it('handles missing description gracefully', () => {
    const requestWithoutDescription = { ...baseMockRequest };
    delete requestWithoutDescription.description;

    render(
      <ServiceRequestCard
        request={requestWithoutDescription}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Water Damage Restoration')).toBeInTheDocument();
    expect(screen.queryByText('Burst pipe in bathroom causing water damage')).not.toBeInTheDocument();
  });

  it('renders all status types correctly', () => {
    const statuses: ServiceRequest['status'][] = [
      'PENDING',
      'MATCHED',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
    ];

    statuses.forEach((status) => {
      const { unmount } = render(
        <ServiceRequestCard
          request={{ ...baseMockRequest, status }}
          onViewDetails={mockOnViewDetails}
        />
      );

      // Check that status badge renders
      const statusDisplay = {
        PENDING: 'Pending',
        MATCHED: 'Matched',
        IN_PROGRESS: 'In Progress',
        COMPLETED: 'Completed',
        CANCELLED: 'Cancelled',
      };

      expect(screen.getByText(statusDisplay[status])).toBeInTheDocument();
      unmount();
    });
  });

  it('renders all urgency types correctly', () => {
    const urgencies: ServiceRequest['urgency'][] = ['emergency', 'urgent', 'normal'];

    urgencies.forEach((urgency) => {
      const { unmount } = render(
        <ServiceRequestCard
          request={{ ...baseMockRequest, urgency }}
          onViewDetails={mockOnViewDetails}
        />
      );

      expect(screen.getByText(urgency)).toBeInTheDocument();
      unmount();
    });
  });
});

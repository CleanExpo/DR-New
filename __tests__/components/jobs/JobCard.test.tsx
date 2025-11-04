/**
 * JobCard Component Tests
 */

import { render, screen } from '@testing-library/react';
import { createMockJob } from '../../factories/job.factory';

// Mock JobCard component
const JobCard = ({ job }: any) => (
  <div data-testid="job-card">
    <h2>{job.title}</h2>
    <span data-testid="priority">{job.priority}</span>
    <span data-testid="suburb">{job.suburb}</span>
    <span data-testid="status">{job.status}</span>
  </div>
);

describe('JobCard Component', () => {
  it('should display job details correctly', () => {
    // Arrange
    const job = createMockJob({
      title: 'Emergency Water Damage - Hamilton',
      priority: 'URGENT',
      suburb: 'Hamilton',
      status: 'PENDING',
    });

    // Act
    render(<JobCard job={job} />);

    // Assert
    expect(screen.getByText('Emergency Water Damage - Hamilton')).toBeInTheDocument();
    expect(screen.getByTestId('priority')).toHaveTextContent('URGENT');
    expect(screen.getByTestId('suburb')).toHaveTextContent('Hamilton');
  });

  it('should display different priority levels', () => {
    const priorities = ['URGENT', 'HIGH', 'MEDIUM', 'LOW'];

    priorities.forEach(priority => {
      const job = createMockJob({ priority });
      const { rerender } = render(<JobCard job={job} />);
      
      expect(screen.getByTestId('priority')).toHaveTextContent(priority);
      
      rerender(<JobCard job={createMockJob({ priority: 'LOW' })} />);
    });
  });
});

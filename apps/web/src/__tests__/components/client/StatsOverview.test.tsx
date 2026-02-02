import { render, screen } from '@testing-library/react';
import { StatsOverview, StatItem } from '@/components/client/StatsOverview';
import { FileText, Clock, CheckCircle, TrendingUp } from 'lucide-react';

describe('StatsOverview Component', () => {
  const mockStats: StatItem[] = [
    {
      label: 'Total Requests',
      value: 42,
      icon: FileText,
      color: 'teal',
      trend: 'up',
      change: '+12%',
    },
    {
      label: 'Active Requests',
      value: 15,
      icon: Clock,
      color: 'blue',
    },
    {
      label: 'Completed',
      value: 27,
      icon: CheckCircle,
      color: 'green',
      trend: 'up',
      change: '+8%',
    },
    {
      label: 'Success Rate',
      value: '94%',
      icon: TrendingUp,
      color: 'yellow',
      trend: 'down',
      change: '-2%',
    },
  ];

  it('renders without crashing', () => {
    render(<StatsOverview stats={mockStats} />);
    expect(screen.getByText('Total Requests')).toBeInTheDocument();
  });

  it('displays all stat items correctly', () => {
    render(<StatsOverview stats={mockStats} />);

    expect(screen.getByText('Total Requests')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();

    expect(screen.getByText('Active Requests')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();

    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('27')).toBeInTheDocument();

    expect(screen.getByText('Success Rate')).toBeInTheDocument();
    expect(screen.getByText('94%')).toBeInTheDocument();
  });

  it('displays trend indicators when provided', () => {
    render(<StatsOverview stats={mockStats} />);

    // Check for trend changes
    expect(screen.getByText('+12%')).toBeInTheDocument();
    expect(screen.getByText('+8%')).toBeInTheDocument();
    expect(screen.getByText('-2%')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    const title = 'Dashboard Metrics';
    render(<StatsOverview stats={mockStats} title={title} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders with custom columns configuration', () => {
    const { container } = render(
      <StatsOverview stats={mockStats} columns={{ base: 1, md: 2, lg: 4 }} />
    );

    // Check grid classes are applied
    const gridElement = container.querySelector('.grid');
    expect(gridElement).toBeInTheDocument();
  });

  it('handles empty stats array gracefully', () => {
    const { container } = render(<StatsOverview stats={[]} />);

    expect(container.querySelector('.grid')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-stats-class';
    const { container } = render(
      <StatsOverview stats={mockStats} className={customClass} />
    );

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('renders stat items with correct color variants', () => {
    const { container } = render(<StatsOverview stats={mockStats} />);

    // Check that color classes are applied (teal, blue, green, yellow)
    const cards = container.querySelectorAll('[class*="bg-gradient"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('displays numeric and string values correctly', () => {
    const mixedStats: StatItem[] = [
      { label: 'Number', value: 100, icon: FileText, color: 'teal' },
      { label: 'String', value: '100%', icon: Clock, color: 'blue' },
      { label: 'Zero', value: 0, icon: CheckCircle, color: 'green' },
    ];

    render(<StatsOverview stats={mixedStats} />);

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});

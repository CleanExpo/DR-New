import { render, screen, fireEvent } from '@testing-library/react';
import { QuickActionsPanel, QuickAction } from '@/components/client/QuickActionsPanel';
import { Plus, Search, Settings, Bell } from 'lucide-react';

describe('QuickActionsPanel Component', () => {
  const mockOnClick = jest.fn();

  const mockActions: QuickAction[] = [
    {
      label: 'New Request',
      icon: Plus,
      onClick: mockOnClick,
      color: 'teal',
    },
    {
      label: 'Search',
      icon: Search,
      onClick: mockOnClick,
      variant: 'outline',
    },
    {
      label: 'Settings',
      icon: Settings,
      onClick: mockOnClick,
      color: 'blue',
      disabled: true,
    },
    {
      label: 'Notifications',
      icon: Bell,
      onClick: mockOnClick,
      color: 'red',
    },
  ];

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders without crashing', () => {
    render(<QuickActionsPanel actions={mockActions} />);
    expect(screen.getByText('New Request')).toBeInTheDocument();
  });

  it('displays all action buttons correctly', () => {
    render(<QuickActionsPanel actions={mockActions} />);

    expect(screen.getByText('New Request')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('calls onClick handler when action is clicked', () => {
    render(<QuickActionsPanel actions={mockActions} />);

    const newRequestButton = screen.getByText('New Request');
    fireEvent.click(newRequestButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick for disabled actions', () => {
    render(<QuickActionsPanel actions={mockActions} />);

    const settingsButton = screen.getByText('Settings');
    fireEvent.click(settingsButton);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('renders with custom title', () => {
    const title = 'Quick Actions';
    render(<QuickActionsPanel actions={mockActions} title={title} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders with custom description', () => {
    const description = 'Common tasks and shortcuts';
    render(<QuickActionsPanel actions={mockActions} description={description} />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('applies custom columns configuration', () => {
    const { container } = render(
      <QuickActionsPanel
        actions={mockActions}
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
      />
    );

    const gridElement = container.querySelector('.grid');
    expect(gridElement).toBeInTheDocument();
  });

  it('handles empty actions array gracefully', () => {
    const { container } = render(<QuickActionsPanel actions={[]} />);

    expect(container.querySelector('.grid')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-actions-class';
    const { container } = render(
      <QuickActionsPanel actions={mockActions} className={customClass} />
    );

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('renders different button variants correctly', () => {
    const variantActions: QuickAction[] = [
      { label: 'Default', icon: Plus, onClick: mockOnClick },
      { label: 'Outline', icon: Search, onClick: mockOnClick, variant: 'outline' },
      { label: 'Secondary', icon: Settings, onClick: mockOnClick, variant: 'secondary' },
      { label: 'Ghost', icon: Bell, onClick: mockOnClick, variant: 'ghost' },
    ];

    render(<QuickActionsPanel actions={variantActions} />);

    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByText('Outline')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
    expect(screen.getByText('Ghost')).toBeInTheDocument();
  });

  it('renders different color variants correctly', () => {
    const colorActions: QuickAction[] = [
      { label: 'Teal', icon: Plus, onClick: mockOnClick, color: 'teal' },
      { label: 'Blue', icon: Search, onClick: mockOnClick, color: 'blue' },
      { label: 'Red', icon: Settings, onClick: mockOnClick, color: 'red' },
      { label: 'Yellow', icon: Bell, onClick: mockOnClick, color: 'yellow' },
    ];

    render(<QuickActionsPanel actions={colorActions} />);

    expect(screen.getByText('Teal')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Yellow')).toBeInTheDocument();
  });

  it('handles multiple clicks correctly', () => {
    render(<QuickActionsPanel actions={mockActions} />);

    const newRequestButton = screen.getByText('New Request');
    fireEvent.click(newRequestButton);
    fireEvent.click(newRequestButton);
    fireEvent.click(newRequestButton);

    expect(mockOnClick).toHaveBeenCalledTimes(3);
  });

  it('renders with no title or description', () => {
    const { container } = render(<QuickActionsPanel actions={mockActions} />);

    expect(container.querySelector('.grid')).toBeInTheDocument();
  });
});

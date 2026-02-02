import { renderHook, waitFor, act } from '@testing-library/react';
import { useServiceRequests } from '@/hooks/client/useServiceRequests';
import { ServiceRequest } from '@/components/client/ServiceRequestCard';

// Mock fetch globally
global.fetch = jest.fn();

describe('useServiceRequests Hook', () => {
  const mockRequests: ServiceRequest[] = [
    {
      id: '1',
      serviceTitle: 'Water Damage Restoration',
      serviceCategory: 'water-damage',
      description: 'Burst pipe in bathroom',
      location: 'Sydney, NSW',
      phone: '0412345678',
      urgency: 'emergency',
      status: 'PENDING',
      leadScore: 85,
      insurance: true,
      urgentResponse: true,
      createdAt: '2024-01-15T10:00:00Z',
      budget: '$5,000',
    },
    {
      id: '2',
      serviceTitle: 'Mould Removal',
      serviceCategory: 'mould',
      description: 'Mould in basement',
      location: 'Melbourne, VIC',
      urgency: 'urgent',
      status: 'IN_PROGRESS',
      leadScore: 70,
      insurance: false,
      createdAt: '2024-01-14T10:00:00Z',
      budget: '$3,000',
    },
    {
      id: '3',
      serviceTitle: 'Fire Damage Assessment',
      serviceCategory: 'fire-damage',
      description: 'Kitchen fire damage',
      location: 'Brisbane, QLD',
      urgency: 'normal',
      status: 'COMPLETED',
      leadScore: 90,
      insurance: true,
      createdAt: '2024-01-10T10:00:00Z',
      budget: '$10,000',
    },
    {
      id: '4',
      serviceTitle: 'Flood Damage',
      serviceCategory: 'water-damage',
      description: 'Flood damage',
      location: 'Perth, WA',
      urgency: 'emergency',
      status: 'CANCELLED',
      insurance: false,
      createdAt: '2024-01-01T10:00:00Z',
      budget: '$8,000',
    },
  ];

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('initializes with default state', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => useServiceRequests());

    expect(result.current.requests).toEqual([]);
    expect(result.current.filteredRequests).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.filters).toEqual({
      search: '',
      status: 'all',
      category: 'all',
      urgency: 'all',
      dateRange: 'all',
      insurance: 'all',
      sortBy: 'newest',
      sortOrder: 'desc',
    });
  });

  it('fetches requests on mount', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/service-requests', {
      cache: 'no-store',
    });
    expect(result.current.requests).toEqual(mockRequests);
  });

  it('handles fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.requests).toEqual([]);
  });

  it('handles failed response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch service requests');
  });

  it('filters requests by search query (title)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        search: 'Water',
      });
    });

    expect(result.current.filteredRequests).toHaveLength(2);
    expect(result.current.filteredRequests[0].serviceTitle).toBe('Water Damage Restoration');
    expect(result.current.filteredRequests[1].serviceTitle).toBe('Flood Damage');
  });

  it('filters requests by search query (description)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        search: 'basement',
      });
    });

    expect(result.current.filteredRequests).toHaveLength(1);
    expect(result.current.filteredRequests[0].serviceTitle).toBe('Mould Removal');
  });

  it('filters requests by search query (location)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        search: 'Sydney',
      });
    });

    expect(result.current.filteredRequests).toHaveLength(1);
    expect(result.current.filteredRequests[0].location).toBe('Sydney, NSW');
  });

  it('filters requests by status', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        status: 'PENDING',
      });
    });

    expect(result.current.filteredRequests).toHaveLength(1);
    expect(result.current.filteredRequests[0].status).toBe('PENDING');
  });

  it('filters requests by category', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        category: 'water-damage',
      });
    });

    expect(result.current.filteredRequests).toHaveLength(2);
  });

  it('filters requests by urgency', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        urgency: 'emergency',
      });
    });

    expect(result.current.filteredRequests).toHaveLength(2);
    expect(result.current.filteredRequests.every(r => r.urgency === 'emergency')).toBe(true);
  });

  it('filters requests by insurance (yes)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        insurance: 'yes',
      });
    });

    expect(result.current.filteredRequests).toHaveLength(2);
    expect(result.current.filteredRequests.every(r => r.insurance === true)).toBe(true);
  });

  it('filters requests by insurance (no)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        insurance: 'no',
      });
    });

    expect(result.current.filteredRequests).toHaveLength(2);
    expect(result.current.filteredRequests.every(r => r.insurance === false)).toBe(true);
  });

  it('sorts requests by newest (default)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Default sort is newest first
    expect(result.current.filteredRequests[0].id).toBe('1'); // 2024-01-15
    expect(result.current.filteredRequests[1].id).toBe('2'); // 2024-01-14
    expect(result.current.filteredRequests[2].id).toBe('3'); // 2024-01-10
    expect(result.current.filteredRequests[3].id).toBe('4'); // 2024-01-01
  });

  it('sorts requests by oldest', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        sortBy: 'oldest',
      });
    });

    expect(result.current.filteredRequests[0].id).toBe('4'); // 2024-01-01
    expect(result.current.filteredRequests[1].id).toBe('3'); // 2024-01-10
    expect(result.current.filteredRequests[2].id).toBe('2'); // 2024-01-14
    expect(result.current.filteredRequests[3].id).toBe('1'); // 2024-01-15
  });

  it('sorts requests by title', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        sortBy: 'title',
        sortOrder: 'desc',
      });
    });

    // Alphabetical order (reversed): Water -> Mould -> Flood -> Fire
    expect(result.current.filteredRequests[0].serviceTitle).toBe('Water Damage Restoration');
    expect(result.current.filteredRequests[3].serviceTitle).toBe('Fire Damage Assessment');
  });

  it('sorts requests by urgency', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        sortBy: 'urgency',
      });
    });

    // Urgency order: emergency (3) -> urgent (2) -> normal (1)
    expect(result.current.filteredRequests[0].urgency).toBe('emergency');
    expect(result.current.filteredRequests[1].urgency).toBe('emergency');
    expect(result.current.filteredRequests[2].urgency).toBe('urgent');
    expect(result.current.filteredRequests[3].urgency).toBe('normal');
  });

  it('applies ascending sort order', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        sortBy: 'urgency',
        sortOrder: 'asc',
      });
    });

    // Urgency order (ascending): normal (1) -> urgent (2) -> emergency (3)
    expect(result.current.filteredRequests[0].urgency).toBe('normal');
    expect(result.current.filteredRequests[3].urgency).toBe('emergency');
  });

  it('applies multiple filters simultaneously', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        category: 'water-damage',
        urgency: 'emergency',
        insurance: 'yes',
      });
    });

    expect(result.current.filteredRequests).toHaveLength(1);
    expect(result.current.filteredRequests[0].id).toBe('1');
  });

  it('refreshes requests when refreshRequests is called', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRequests,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [mockRequests[0]],
      });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.requests).toHaveLength(4);

    await act(async () => {
      await result.current.refreshRequests();
    });

    expect(result.current.requests).toHaveLength(1);
  });

  it('cancels a request successfully', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRequests,
      })
      .mockResolvedValueOnce({
        ok: true,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRequests.slice(1),
      });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let cancelResult: boolean = false;
    await act(async () => {
      cancelResult = await result.current.cancelRequest('1');
    });

    expect(cancelResult).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/service-requests/1/cancel',
      expect.objectContaining({
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  });

  it('handles cancel request failure', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRequests,
      })
      .mockResolvedValueOnce({
        ok: false,
      });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let cancelResult: boolean = false;
    await act(async () => {
      cancelResult = await result.current.cancelRequest('1');
    });

    expect(cancelResult).toBe(false);
  });

  it('handles cancel request error', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRequests,
      })
      .mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let cancelResult: boolean = false;
    await act(async () => {
      cancelResult = await result.current.cancelRequest('1');
    });

    expect(cancelResult).toBe(false);
  });

  it('filters requests by date range (today)', async () => {
    const today = new Date();
    const todayRequest = {
      ...mockRequests[0],
      createdAt: today.toISOString(),
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [todayRequest, ...mockRequests],
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        dateRange: 'today',
      });
    });

    expect(result.current.filteredRequests).toHaveLength(1);
    expect(result.current.filteredRequests[0].id).toBe('1');
  });

  it('filters requests by date range (week)', async () => {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 3); // 3 days ago

    const recentRequest = {
      ...mockRequests[0],
      createdAt: recentDate.toISOString(),
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [recentRequest, ...mockRequests],
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        dateRange: 'week',
      });
    });

    // Should include requests from last 7 days
    expect(result.current.filteredRequests.length).toBeGreaterThan(0);
  });

  it('filters requests by date range (month)', async () => {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 15); // 15 days ago

    const recentRequest = {
      ...mockRequests[0],
      createdAt: recentDate.toISOString(),
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [recentRequest, ...mockRequests],
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        dateRange: 'month',
      });
    });

    // Should include requests from last 30 days
    expect(result.current.filteredRequests.length).toBeGreaterThan(0);
  });

  it('handles empty requests array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.requests).toEqual([]);
    expect(result.current.filteredRequests).toEqual([]);
  });

  it('updates filters using function form', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRequests,
    });

    const { result } = renderHook(() => useServiceRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters((prev) => ({
        ...prev,
        search: 'Water',
      }));
    });

    expect(result.current.filters.search).toBe('Water');
    expect(result.current.filteredRequests).toHaveLength(2);
  });
});

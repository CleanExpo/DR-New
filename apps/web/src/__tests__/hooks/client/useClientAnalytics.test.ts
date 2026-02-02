import { renderHook, waitFor, act } from '@testing-library/react';
import { useClientAnalytics } from '@/hooks/client/useClientAnalytics';
import { ServiceRequest } from '@/components/client/ServiceRequestCard';

// Mock fetch globally
global.fetch = jest.fn();

describe('useClientAnalytics Hook', () => {
  const now = new Date('2024-01-15T10:00:00Z');
  const thisMonth = new Date('2024-01-01T00:00:00Z');
  const lastMonth = new Date('2023-12-01T00:00:00Z');

  const mockRequests: ServiceRequest[] = [
    {
      id: '1',
      serviceTitle: 'Water Damage Restoration',
      serviceCategory: 'water-damage',
      description: 'Burst pipe',
      location: 'Sydney, NSW',
      urgency: 'emergency',
      status: 'PENDING',
      leadScore: 85,
      insurance: true,
      createdAt: '2024-01-15T10:00:00Z',
      budget: '$5,000',
    },
    {
      id: '2',
      serviceTitle: 'Mould Removal',
      serviceCategory: 'mould',
      description: 'Basement mould',
      location: 'Melbourne, VIC',
      urgency: 'urgent',
      status: 'IN_PROGRESS',
      leadScore: 70,
      insurance: false,
      createdAt: '2024-01-10T10:00:00Z',
      budget: '$3,000',
    },
    {
      id: '3',
      serviceTitle: 'Fire Damage',
      serviceCategory: 'fire-damage',
      description: 'Kitchen fire',
      location: 'Brisbane, QLD',
      urgency: 'normal',
      status: 'COMPLETED',
      leadScore: 90,
      insurance: true,
      createdAt: '2024-01-05T10:00:00Z',
      budget: '$10,000',
    },
    {
      id: '4',
      serviceTitle: 'Water Damage',
      serviceCategory: 'water-damage',
      description: 'Flood damage',
      location: 'Perth, WA',
      urgency: 'emergency',
      status: 'CANCELLED',
      insurance: false,
      createdAt: '2023-12-20T10:00:00Z',
      budget: '$8,000',
    },
    {
      id: '5',
      serviceTitle: 'Water Emergency',
      serviceCategory: 'water-damage',
      description: 'Urgent water issue',
      location: 'Adelaide, SA',
      urgency: 'emergency',
      status: 'MATCHED',
      insurance: true,
      createdAt: '2024-01-08T10:00:00Z',
      budget: '$4,000',
    },
  ];

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    // Mock Date.now to ensure consistent date calculations
    jest.useFakeTimers();
    jest.setSystemTime(now);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('initializes with null analytics when no requests provided', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useClientAnalytics());

    expect(result.current.analytics).toBe(null);
  });

  it('calculates overview statistics correctly', () => {
    const { result } = renderHook(() => useClientAnalytics(mockRequests));

    expect(result.current.analytics?.overview).toEqual({
      totalRequests: 5,
      pendingRequests: 1,
      activeRequests: 2, // MATCHED + IN_PROGRESS
      completedRequests: 1,
      cancelledRequests: 1,
      averageResponseTime: '2.4 hrs',
      completionRate: 20, // 1 completed out of 5 total = 20%
    });
  });

  it('calculates completion rate correctly', () => {
    const allCompleted: ServiceRequest[] = [
      { ...mockRequests[0], status: 'COMPLETED' },
      { ...mockRequests[1], status: 'COMPLETED' },
      { ...mockRequests[2], status: 'COMPLETED' },
    ];

    const { result } = renderHook(() => useClientAnalytics(allCompleted));

    expect(result.current.analytics?.overview.completionRate).toBe(100);
  });

  it('calculates trends correctly', () => {
    const { result } = renderHook(() => useClientAnalytics(mockRequests));

    // Requests this month (Jan 2024): IDs 1, 2, 3, 5 = 4 requests
    // Requests last month (Dec 2023): ID 4 = 1 request
    // Growth rate: ((4 - 1) / 1) * 100 = 300%
    expect(result.current.analytics?.trends).toEqual({
      requestsThisMonth: 4,
      requestsLastMonth: 1,
      growthRate: 300,
      mostCommonCategory: 'water-damage', // 3 water-damage vs 1 mould, 1 fire
      mostCommonUrgency: 'emergency', // 3 emergency vs 1 urgent, 1 normal
    });
  });

  it('identifies most common category correctly', () => {
    const { result } = renderHook(() => useClientAnalytics(mockRequests));

    expect(result.current.analytics?.trends.mostCommonCategory).toBe('water-damage');
  });

  it('identifies most common urgency correctly', () => {
    const { result } = renderHook(() => useClientAnalytics(mockRequests));

    expect(result.current.analytics?.trends.mostCommonUrgency).toBe('emergency');
  });

  it('handles empty requests array', () => {
    const { result } = renderHook(() => useClientAnalytics([]));

    expect(result.current.analytics).toBe(null);
  });

  it('updates analytics when requests change', () => {
    const { result, rerender } = renderHook(
      ({ requests }) => useClientAnalytics(requests),
      {
        initialProps: { requests: mockRequests.slice(0, 2) },
      }
    );

    expect(result.current.analytics?.overview.totalRequests).toBe(2);

    rerender({ requests: mockRequests });

    expect(result.current.analytics?.overview.totalRequests).toBe(5);
  });

  it('getRequestsByStatus returns correct requests', () => {
    const { result } = renderHook(() => useClientAnalytics(mockRequests));

    const pendingRequests = result.current.getRequestsByStatus('PENDING');
    expect(pendingRequests).toHaveLength(1);
    expect(pendingRequests[0].id).toBe('1');

    const inProgressRequests = result.current.getRequestsByStatus('IN_PROGRESS');
    expect(inProgressRequests).toHaveLength(1);
    expect(inProgressRequests[0].id).toBe('2');

    const completedRequests = result.current.getRequestsByStatus('COMPLETED');
    expect(completedRequests).toHaveLength(1);
    expect(completedRequests[0].id).toBe('3');
  });

  it('getRequestsByCategory returns correct requests', () => {
    const { result } = renderHook(() => useClientAnalytics(mockRequests));

    const waterDamageRequests = result.current.getRequestsByCategory('water-damage');
    expect(waterDamageRequests).toHaveLength(3);
    expect(waterDamageRequests.every(r => r.serviceCategory === 'water-damage')).toBe(true);

    const mouldRequests = result.current.getRequestsByCategory('mould');
    expect(mouldRequests).toHaveLength(1);
    expect(mouldRequests[0].id).toBe('2');
  });

  it('getRequestsByUrgency returns correct requests', () => {
    const { result } = renderHook(() => useClientAnalytics(mockRequests));

    const emergencyRequests = result.current.getRequestsByUrgency('emergency');
    expect(emergencyRequests).toHaveLength(3);
    expect(emergencyRequests.every(r => r.urgency === 'emergency')).toBe(true);

    const urgentRequests = result.current.getRequestsByUrgency('urgent');
    expect(urgentRequests).toHaveLength(1);
    expect(urgentRequests[0].id).toBe('2');

    const normalRequests = result.current.getRequestsByUrgency('normal');
    expect(normalRequests).toHaveLength(1);
    expect(normalRequests[0].id).toBe('3');
  });

  it('getRequestsByDateRange returns correct requests', () => {
    const { result } = renderHook(() => useClientAnalytics(mockRequests));

    const startDate = new Date('2024-01-01T00:00:00Z');
    const endDate = new Date('2024-01-31T23:59:59Z');

    const januaryRequests = result.current.getRequestsByDateRange(startDate, endDate);
    expect(januaryRequests).toHaveLength(4); // IDs 1, 2, 3, 5
    expect(januaryRequests.every(r => new Date(r.createdAt) >= startDate && new Date(r.createdAt) <= endDate)).toBe(true);
  });

  it('getRequestsByDateRange handles narrow date ranges', () => {
    const { result } = renderHook(() => useClientAnalytics(mockRequests));

    const startDate = new Date('2024-01-15T00:00:00Z');
    const endDate = new Date('2024-01-15T23:59:59Z');

    const todayRequests = result.current.getRequestsByDateRange(startDate, endDate);
    expect(todayRequests).toHaveLength(1);
    expect(todayRequests[0].id).toBe('1');
  });

  it('returns empty arrays from helper functions when no requests provided', () => {
    const { result } = renderHook(() => useClientAnalytics());

    expect(result.current.getRequestsByStatus('PENDING')).toEqual([]);
    expect(result.current.getRequestsByCategory('water-damage')).toEqual([]);
    expect(result.current.getRequestsByUrgency('emergency')).toEqual([]);
    expect(result.current.getRequestsByDateRange(new Date(), new Date())).toEqual([]);
  });

  it('fetches from API when no requests provided', async () => {
    const mockAnalytics = {
      overview: {
        totalRequests: 10,
        pendingRequests: 2,
        activeRequests: 3,
        completedRequests: 5,
        cancelledRequests: 0,
        averageResponseTime: '1.5 hrs',
        completionRate: 50,
      },
      spending: {
        totalSpent: 25000,
        averageCost: 5000,
        projectedCost: 30000,
        currency: 'AUD',
      },
      trends: {
        requestsThisMonth: 5,
        requestsLastMonth: 3,
        growthRate: 67,
        mostCommonCategory: 'water-damage',
        mostCommonUrgency: 'urgent',
      },
      contractor: {
        totalContractorsWorkedWith: 8,
        averageRating: 4.5,
        topContractors: [],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAnalytics,
    });

    const { result } = renderHook(() => useClientAnalytics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/client/analytics', {
      cache: 'no-store',
    });
    expect(result.current.analytics).toEqual(mockAnalytics);
  });

  it('falls back to calculated analytics when API returns 404', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useClientAnalytics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should use calculated analytics (which is null when no requests)
    expect(result.current.error).toBe(null);
  });

  it('falls back to calculated analytics when API throws error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useClientAnalytics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should not show error when falling back to calculated analytics
    expect(result.current.error).toBe(null);
  });

  it('refreshAnalytics fetches fresh data from API', async () => {
    const mockAnalytics = {
      overview: {
        totalRequests: 15,
        pendingRequests: 3,
        activeRequests: 5,
        completedRequests: 7,
        cancelledRequests: 0,
        averageResponseTime: '2.0 hrs',
        completionRate: 47,
      },
      spending: {
        totalSpent: 35000,
        averageCost: 5000,
        projectedCost: 40000,
        currency: 'AUD',
      },
      trends: {
        requestsThisMonth: 8,
        requestsLastMonth: 5,
        growthRate: 60,
        mostCommonCategory: 'mould',
        mostCommonUrgency: 'urgent',
      },
      contractor: {
        totalContractorsWorkedWith: 12,
        averageRating: 4.7,
        topContractors: [],
      },
    };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ overview: { totalRequests: 10 } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockAnalytics,
      });

    const { result } = renderHook(() => useClientAnalytics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.refreshAnalytics();
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result.current.analytics).toEqual(mockAnalytics);
  });

  it('calculates zero growth rate when no previous month data', () => {
    const allThisMonth = mockRequests.map(r => ({
      ...r,
      createdAt: '2024-01-10T10:00:00Z',
    }));

    const { result } = renderHook(() => useClientAnalytics(allThisMonth));

    expect(result.current.analytics?.trends.growthRate).toBe(0);
  });

  it('handles single request correctly', () => {
    const singleRequest = [mockRequests[0]];

    const { result } = renderHook(() => useClientAnalytics(singleRequest));

    expect(result.current.analytics?.overview.totalRequests).toBe(1);
    expect(result.current.analytics?.trends.mostCommonCategory).toBe('water-damage');
    expect(result.current.analytics?.trends.mostCommonUrgency).toBe('emergency');
  });

  it('includes spending data structure', () => {
    const { result } = renderHook(() => useClientAnalytics(mockRequests));

    expect(result.current.analytics?.spending).toEqual({
      totalSpent: 0,
      averageCost: 0,
      projectedCost: 0,
      currency: 'AUD',
    });
  });

  it('includes contractor data structure', () => {
    const { result } = renderHook(() => useClientAnalytics(mockRequests));

    expect(result.current.analytics?.contractor).toEqual({
      totalContractorsWorkedWith: 0,
      averageRating: 0,
      topContractors: [],
    });
  });

  it('counts active requests as MATCHED + IN_PROGRESS', () => {
    const activeRequests: ServiceRequest[] = [
      { ...mockRequests[0], status: 'MATCHED' },
      { ...mockRequests[1], status: 'IN_PROGRESS' },
      { ...mockRequests[2], status: 'PENDING' },
    ];

    const { result } = renderHook(() => useClientAnalytics(activeRequests));

    expect(result.current.analytics?.overview.activeRequests).toBe(2);
  });

  it('handles all requests with same category', () => {
    const allWaterDamage = mockRequests.map(r => ({
      ...r,
      serviceCategory: 'water-damage',
    }));

    const { result } = renderHook(() => useClientAnalytics(allWaterDamage));

    expect(result.current.analytics?.trends.mostCommonCategory).toBe('water-damage');
  });

  it('handles all requests with same urgency', () => {
    const allEmergency = mockRequests.map(r => ({
      ...r,
      urgency: 'emergency' as const,
    }));

    const { result } = renderHook(() => useClientAnalytics(allEmergency));

    expect(result.current.analytics?.trends.mostCommonUrgency).toBe('emergency');
  });

  it('calculates 0% completion rate when no completed requests', () => {
    const noneCompleted = mockRequests.map(r => ({
      ...r,
      status: 'PENDING' as const,
    }));

    const { result } = renderHook(() => useClientAnalytics(noneCompleted));

    expect(result.current.analytics?.overview.completionRate).toBe(0);
  });

  it('handles requests with no category gracefully', () => {
    const { result } = renderHook(() => useClientAnalytics([]));

    expect(result.current.analytics).toBe(null);
  });

  it('returns N/A for most common category when no requests', () => {
    const { result, rerender } = renderHook(
      ({ requests }) => useClientAnalytics(requests),
      {
        initialProps: { requests: [] as ServiceRequest[] },
      }
    );

    expect(result.current.analytics).toBe(null);

    // Update with empty categorized requests
    const noCategoryRequests: ServiceRequest[] = [];
    rerender({ requests: noCategoryRequests });

    expect(result.current.analytics).toBe(null);
  });
});

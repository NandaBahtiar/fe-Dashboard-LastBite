import { renderHook, act } from '@testing-library/react';
import useWithdrawals from '../useWithdrawals';
import axiosInstance from '../../services/axiosInstance';
import { vi } from 'vitest';

// Mock axiosInstance
vi.mock('../../services/axiosInstance', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('useWithdrawals', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console.log to prevent test output clutter
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Test initial fetch on mount
  test('should fetch withdrawals on mount with default parameters', async () => {
    const mockResponse = {
      data: [],
      paging: { currentPage: 0, size: 8, totalElements: 0, totalPage: 0 },
    };
    axiosInstance.get.mockResolvedValue({ data: mockResponse });

    const { result } = renderHook(() => useWithdrawals());

    expect(result.current.status).toBe('loading');

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0)); // Allow useEffect to run
    });

    expect(axiosInstance.get).toHaveBeenCalledWith('/withdrawals?page=0&size=8&status=PENDING');
    expect(result.current.status).toBe('succeeded');
    expect(result.current.withdrawals).toEqual(mockResponse.data);
    expect(result.current.pagination).toEqual(mockResponse.paging);
  });

  // Test fetchWithdrawals with custom parameters
  test('should fetch withdrawals with custom parameters', async () => {
    const mockResponse = {
      data: [{ id: 'w1', amount: 50 }],
      paging: { currentPage: 1, size: 10, totalElements: 1, totalPage: 1 },
    };
    axiosInstance.get.mockResolvedValue({ data: mockResponse });

    const { result } = renderHook(() => useWithdrawals());

    await act(async () => {
      await result.current.fetchWithdrawals({ page: 1, size: 10, search: 'test', status: 'APPROVED' });
    });

    expect(axiosInstance.get).toHaveBeenCalledWith('/withdrawals?page=1&size=10&search=test&status=APPROVED');
    expect(result.current.status).toBe('succeeded');
    expect(result.current.withdrawals).toEqual(mockResponse.data);
    expect(result.current.pagination).toEqual(mockResponse.paging);
  });

  // Test fetchWithdrawals failure
  test('should handle fetch failure', async () => {
    const errorMessage = 'Network Error';
    axiosInstance.get.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useWithdrawals());

    await act(async () => {
      await result.current.fetchWithdrawals({});
    });

    expect(result.current.status).toBe('failed');
    expect(result.current.error).toBe(errorMessage);
  });
});

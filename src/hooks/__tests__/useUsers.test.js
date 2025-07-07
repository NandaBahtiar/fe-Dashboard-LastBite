
import { renderHook } from '@testing-library/react';
import useUsers from '../useUsers';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../services/axiosInstance';
import { fetchCustomersStart, fetchCustomersSuccess, fetchCustomersFailure } from '../../store/Slice/CustomerSlice';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));
vi.mock('../../services/axiosInstance');

describe('useUsers hook', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
  });

  it('fetches customers with default parameters', async () => {
    const mockData = { data: 'test data' };
    axiosInstance.get.mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useUsers());
    await result.current.fetchCustomers({});

    expect(dispatch).toHaveBeenCalledWith(fetchCustomersStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/users', {
      params: {
        role: '',
        page: 0,
        size: 10,
        sortField: 'createdAt',
        sortDir: 'desc',
        search: '',
        status: '',
      },
    });
    expect(dispatch).toHaveBeenCalledWith(fetchCustomersSuccess(mockData));
  });

  it('fetches customers with custom parameters', async () => {
    const mockData = { data: 'test data' };
    axiosInstance.get.mockResolvedValue({ data: mockData });
    const params = {
      page: 1,
      size: 20,
      sortField: 'name',
      sortDir: 'asc',
      search: 'test',
      status: 'active',
    };

    const { result } = renderHook(() => useUsers());
    await result.current.fetchCustomers(params);

    expect(dispatch).toHaveBeenCalledWith(fetchCustomersStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/users', { params: { ...params, role: '' } });
    expect(dispatch).toHaveBeenCalledWith(fetchCustomersSuccess(mockData));
  });

  it('handles fetch customers failure with a specific error message', async () => {
    const errorMessage = 'Custom error message';
    axiosInstance.get.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useUsers());
    await result.current.fetchCustomers({});

    expect(dispatch).toHaveBeenCalledWith(fetchCustomersStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/users', expect.any(Object));
    expect(dispatch).toHaveBeenCalledWith(fetchCustomersFailure(errorMessage));
  });

  it('handles fetch customers failure with a default error message', async () => {
    axiosInstance.get.mockRejectedValue({}); // Simulate an error without a message

    const { result } = renderHook(() => useUsers());
    await result.current.fetchCustomers({});

    expect(dispatch).toHaveBeenCalledWith(fetchCustomersStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/users', expect.any(Object));
    expect(dispatch).toHaveBeenCalledWith(fetchCustomersFailure('Failed to fetch data'));
  });
});

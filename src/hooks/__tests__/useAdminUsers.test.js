import { renderHook, act } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import useAdminUsers from '../useAdminUsers';
import axiosInstance from '../../services/axiosInstance';
import { fetchAdminUsersStart, fetchAdminUsersSuccess, fetchAdminUsersFailure } from '../../store/Slice/AdminSlice';
import { vi } from 'vitest';

// Mock dependencies
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../services/axiosInstance', () => ({
  default: {
    get: vi.fn(),
  },
}));

// Mock Redux actions
vi.mock('../../store/Slice/AdminSlice', () => ({
  fetchAdminUsersStart: vi.fn(),
  fetchAdminUsersSuccess: vi.fn(),
  fetchAdminUsersFailure: vi.fn(),
}));

describe('useAdminUsers', () => {
  let dispatchMock;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Setup mock for useDispatch
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);

    // Setup mock for localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue('mockToken'), // Assume user is authenticated
      },
      writable: true,
    });
  });

  // Test that the hook returns the initial state from the selector
  test('should return initial state from Redux store', () => {
    const initialState = {
      adminUsers: [],
      pagination: null,
      status: 'idle',
      error: null,
    };
    useSelector.mockReturnValue(initialState);

    const { result } = renderHook(() => useAdminUsers());

    expect(result.current.adminUsers).toEqual(initialState.adminUsers);
    expect(result.current.pagination).toBe(initialState.pagination);
    expect(result.current.status).toBe(initialState.status);
    expect(result.current.error).toBe(initialState.error);
  });

  // Test successful data fetching
  test('should dispatch start and success actions on successful fetch', async () => {
    const mockData = { data: { data: [ { id: 1, name: 'Admin User' } ] } };
    axiosInstance.get.mockResolvedValue(mockData);

    useSelector.mockReturnValue({ adminUsers: [], pagination: null, status: 'idle', error: null });

    const { result } = renderHook(() => useAdminUsers());

    await act(async () => {
      await result.current.fetchAdminUsers(0, 10, 'search', 'active');
    });

    // Check that start action was dispatched
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminUsersStart());

    // Check that axios was called correctly
    expect(axiosInstance.get).toHaveBeenCalledWith('/users', {
      params: { page: 0, size: 10, search: 'search', role: 'ROLE_ADMIN', status: 'active' },
      headers: { Authorization: 'Bearer mockToken' },
    });

    // Check that success action was dispatched with the correct payload
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminUsersSuccess(mockData.data.data));
  });

  // Test failed data fetching
  test('should dispatch start and failure actions on failed fetch', async () => {
    const errorMessage = 'Failed to fetch admin users';
    axiosInstance.get.mockRejectedValue(new Error(errorMessage));

    useSelector.mockReturnValue({ adminUsers: [], pagination: null, status: 'idle', error: null });

    const { result } = renderHook(() => useAdminUsers());

    await act(async () => {
      await result.current.fetchAdminUsers();
    });

    // Check that start action was dispatched
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminUsersStart());

    // Check that failure action was dispatched with the error message
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminUsersFailure(errorMessage));
  });

  // Test failed data fetching with a custom error message from API
  test('should use error message from API response if available', async () => {
    const apiErrorMessage = 'Custom API error';
    axiosInstance.get.mockRejectedValue({ message: apiErrorMessage });

    useSelector.mockReturnValue({ adminUsers: [], pagination: null, status: 'idle', error: null });

    const { result } = renderHook(() => useAdminUsers());

    await act(async () => {
      await result.current.fetchAdminUsers();
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminUsersStart());
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminUsersFailure(apiErrorMessage));
  });
});

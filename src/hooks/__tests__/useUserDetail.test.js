import { renderHook, act } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import useUserDetail from '../useUserDetail';
import axiosInstance from '../../services/axiosInstance';
import { vi } from 'vitest';

// Import actions to be mocked
import {
  fetchUserDetailStart,
  fetchUserDetailSuccess,
  fetchUserDetailFailure,
  clearUserDetail,
} from '../../store/Slice/UserDetailSlice';

// Mock dependencies
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../services/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
  },
}));

// Mock the slice actions
vi.mock('../../store/Slice/UserDetailSlice');

describe('useUserDetail', () => {
  let dispatchMock;

  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  // Test fetchUserDetail
  describe('fetchUserDetail', () => {
    test('should fetch user details successfully', async () => {
      const mockUser = { id: 'user1', name: 'Test User' };
      axiosInstance.get.mockResolvedValue({ data: { data: mockUser } });

      const { result } = renderHook(() => useUserDetail());

      await act(async () => {
        await result.current.fetchUserDetail({ id: 'user1' });
      });

      expect(dispatchMock).toHaveBeenCalledWith(fetchUserDetailStart());
      expect(axiosInstance.get).toHaveBeenCalledWith('/users/user1');
      expect(dispatchMock).toHaveBeenCalledWith(fetchUserDetailSuccess(mockUser));
    });

    test('should handle fetch failure', async () => {
      const errorMessage = 'User not found';
      axiosInstance.get.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useUserDetail());

      await act(async () => {
        await result.current.fetchUserDetail({ id: 'user1' });
      });

      expect(dispatchMock).toHaveBeenCalledWith(fetchUserDetailStart());
      expect(dispatchMock).toHaveBeenCalledWith(fetchUserDetailFailure(errorMessage));
    });
  });

  // Test resetUserDetail
  test('should dispatch clearUserDetail on reset', () => {
    const { result } = renderHook(() => useUserDetail());

    act(() => {
      result.current.resetUserDetail();
    });

    expect(dispatchMock).toHaveBeenCalledWith(clearUserDetail());
  });

  // Test updateUser
  describe('updateUser', () => {
    test('should update user and refetch details successfully', async () => {
      const updatedUser = { id: 'user1', suspendedUntil: '2025-12-31' };
      axiosInstance.put.mockResolvedValue({}); // Mock PUT request
      axiosInstance.get.mockResolvedValue({ data: { data: updatedUser } }); // Mock GET refetch

      const { result } = renderHook(() => useUserDetail());
      const updatePayload = { id: 'user1', date: '2025-12-31', suspendedReason: 'Test reason' };

      await act(async () => {
        await result.current.updateUser(updatePayload);
      });

      expect(dispatchMock).toHaveBeenCalledWith(fetchUserDetailStart());
      expect(axiosInstance.put).toHaveBeenCalledWith('/users/user1', {
        suspendedUntil: updatePayload.date,
        suspendedReason: updatePayload.suspendedReason,
      });
      expect(axiosInstance.get).toHaveBeenCalledWith('/users/user1');
      expect(dispatchMock).toHaveBeenCalledWith(fetchUserDetailSuccess(updatedUser));
    });

    test('should handle update failure', async () => {
      const errorMessage = 'Update failed';
      axiosInstance.put.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useUserDetail());

      await act(async () => {
        await result.current.updateUser({ id: 'user1', date: '2025-12-31' });
      });

      expect(dispatchMock).toHaveBeenCalledWith(fetchUserDetailStart());
      expect(dispatchMock).toHaveBeenCalledWith(fetchUserDetailFailure(errorMessage));
      expect(axiosInstance.get).not.toHaveBeenCalled(); // Ensure no refetch on failure
    });
  });
});

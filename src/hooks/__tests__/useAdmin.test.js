import { renderHook, act } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../services/axiosInstance';
import useAdmin from '../useAdmin';
import {
  fetchAdminStart,
  fetchAdminSuccess,
  fetchAdminFailure,
} from '../../store/Slice/AdminSlice';
import { vi } from 'vitest';

// Mock useDispatch
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

// Mock axiosInstance
vi.mock('../../services/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
  },
}));

describe('useAdmin', () => {
  let dispatchMock;

  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => 'mockToken'),
        setItem: vi.fn(),
      },
      writable: true,
    });
  });

  // Test fetchAdminData
  test('fetchAdminData should dispatch success on successful API call', async () => {
    const mockAdminData = { id: 1, name: 'Admin User' };
        axiosInstance.get.mockResolvedValue({ data: mockAdminData });

    const { result } = renderHook(() => useAdmin());

    await act(async () => {
      await result.current.fetchAdminData();
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/users/me', {
      headers: {
        Authorization: 'Bearer mockToken',
      },
    });
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminSuccess(mockAdminData));
  });

  test('fetchAdminData should dispatch failure on API error', async () => {
    const errorMessage = 'Network Error';
        axiosInstance.get.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useAdmin());

    await act(async () => {
      await result.current.fetchAdminData();
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/users/me', {
      headers: {
        Authorization: 'Bearer mockToken',
      },
    });
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminFailure(errorMessage));
  });

  // Test updateAdminProfile
  test('updateAdminProfile should dispatch success on successful API call and set localStorage', async () => {
    const mockProfileData = { fullName: 'Updated Admin', email: 'admin@example.com' };
    const mockResponseData = { message: 'Profile updated', data: mockProfileData };
    axiosInstance.put.mockResolvedValue({ data: mockResponseData });

    const { result } = renderHook(() => useAdmin());

    let response;
    await act(async () => {
      response = await result.current.updateAdminProfile(mockProfileData);
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminStart());
    expect(axiosInstance.put).toHaveBeenCalledWith('/users/me', mockProfileData, {
      headers: {
        Authorization: 'Bearer mockToken',
      },
    });
    expect(window.localStorage.setItem).toHaveBeenCalledWith('Acount', mockProfileData.fullName);
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminSuccess(mockResponseData));
    expect(response).toEqual(mockResponseData);
  });

  test('updateAdminProfile should dispatch failure on API error', async () => {
    const errorMessage = 'Update failed';
    axiosInstance.put.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useAdmin());

    await act(async () => {
      await expect(result.current.updateAdminProfile({})).rejects.toThrow(errorMessage);
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminStart());
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminFailure(errorMessage));
  });

  // Test changePassword
  test('changePassword should dispatch success on successful API call', async () => {
    const mockPasswordData = { oldPassword: 'old', newPassword: 'new' };
    const mockResponseData = { message: 'Password changed' };
    axiosInstance.put.mockResolvedValue({ data: mockResponseData });

    const { result } = renderHook(() => useAdmin());

    let response;
    await act(async () => {
      response = await result.current.changePassword(mockPasswordData);
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminStart());
    expect(axiosInstance.put).toHaveBeenCalledWith('/users/me/password', mockPasswordData, {
      headers: {
        Authorization: 'Bearer mockToken',
      },
    });
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminSuccess(mockResponseData));
    expect(response).toEqual(mockResponseData);
  });

  test('changePassword should dispatch failure on API error', async () => {
    const errorMessage = 'Password change failed';
    axiosInstance.put.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useAdmin());

    await act(async () => {
      await expect(result.current.changePassword({})).rejects.toThrow(errorMessage);
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminStart());
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminFailure(errorMessage));
  });

  test('changePassword should dispatch failure with API message on API error with response data', async () => {
    const apiErrorMessage = 'Invalid old password';
    axiosInstance.put.mockRejectedValue(new Error(apiErrorMessage));

    const { result } = renderHook(() => useAdmin());

    await act(async () => {
      await expect(result.current.changePassword({})).rejects.toThrow(apiErrorMessage);
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminStart());
    expect(dispatchMock).toHaveBeenCalledWith(fetchAdminFailure(apiErrorMessage));
  });
});

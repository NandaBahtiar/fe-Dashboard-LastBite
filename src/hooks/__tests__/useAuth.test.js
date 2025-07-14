import { renderHook, act } from '@testing-library/react';
import useAuth from '../useAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import { vi } from 'vitest';

// Mock dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../services/axiosInstance', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('useAuth', () => {
  let navigateMock;

  beforeEach(() => {
    // Clear all mocks and reset localStorage before each test
    vi.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
    navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);
  });

  // Test initial state when no token is in localStorage
  test('should have isAuthenticated: false and loading: false initially if no token', () => {
    window.localStorage.getItem.mockReturnValue(null);
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
  });

  // Test initial state when a token exists in localStorage
  test('should have isAuthenticated: true if token exists', () => {
    window.localStorage.getItem.mockReturnValue('mockToken');
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
  });

  // Test successful login for ROLE_ADMIN
  test('should login successfully, set tokens for ROLE_ADMIN, and navigate', async () => {
    axiosInstance.post.mockResolvedValue({
      data: {
        data: {
          token: 'newToken',
          fullName: 'testAdmin',
          refreshToken: 'newRefreshToken',
          roles: ['ROLE_ADMIN'],
        },
      },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('admin', 'password', true);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('jwtToken', 'newToken');
    expect(localStorage.setItem).toHaveBeenCalledWith('Acount', 'testAdmin');
    expect(localStorage.setItem).toHaveBeenCalledWith('refresh', 'newRefreshToken');
    expect(localStorage.setItem).toHaveBeenCalledWith('role', 'ROLE_ADMIN');
    expect(result.current.isAuthenticated).toBe(true);
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    expect(result.current.error).toBe('');
  });

  // Test successful login for ROLE_SUPER_ADMIN
  test('should login successfully and set role for ROLE_SUPER_ADMIN', async () => {
    axiosInstance.post.mockResolvedValue({
      data: {
        data: {
          token: 'superToken',
          fullName: 'superAdmin',
          refreshToken: 'superRefreshToken',
          roles: ['ROLE_SUPER_ADMIN'],
        },
      },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('super', 'password', false); // `ingat` is false
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('jwtToken', 'superToken');
    expect(localStorage.setItem).toHaveBeenCalledWith('role', 'ROLE_SUPER_ADMIN');
    expect(localStorage.setItem).toHaveBeenCalledWith('Acount', 'superAdmin');
    // refresh token should not be set
    expect(localStorage.setItem).not.toHaveBeenCalledWith('refresh', expect.any(String));
    expect(result.current.isAuthenticated).toBe(true);
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });

  // Test login failure when API returns no token
  test('should set error if login response is missing token', async () => {
    axiosInstance.post.mockResolvedValue({ data: { data: { fullName: 'user' } } });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('user', 'pass', false);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBe('Login successful, but no token received from the server.');
    expect(navigateMock).not.toHaveBeenCalled();
  });

  // Test login failure due to API error with a specific message
  test('should set error from API response on login failure', async () => {
    axiosInstance.post.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('wrong', 'user', false);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBe('Invalid credentials');
  });

  // Test login failure due to a generic/network error
  test('should set a generic error on unexpected login failure', async () => {
    axiosInstance.post.mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('user', 'pass', false);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBe('Login failed. Please try again.');
  });

  // Test logout functionality
  test('should clear all session data from localStorage and navigate on logout', async () => {
    // Simulate being logged in
    window.localStorage.getItem.mockReturnValue('mockToken');
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);

    await act(async () => {
      result.current.logout();
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith('jwtToken');
    expect(localStorage.removeItem).toHaveBeenCalledWith('Acount');
    expect(localStorage.removeItem).toHaveBeenCalledWith('role');
    expect(localStorage.removeItem).toHaveBeenCalledWith('refresh');
    expect(result.current.isAuthenticated).toBe(false);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
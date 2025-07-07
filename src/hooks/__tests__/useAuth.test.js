import { renderHook, act } from '@testing-library/react';
import useAuth from '../useAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import { vi } from 'vitest';

// Mock useNavigate
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

// Mock axiosInstance
vi.mock('../../services/axiosInstance', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('useAuth', () => {
  let navigateMock;

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });
    navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);
  });

  // Test initial state when no token in localStorage
  test('should return initial state with isAuthenticated false if no token', () => {
    window.localStorage.getItem.mockReturnValue(null);
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
  });

  // Test initial state when token exists in localStorage
  test('should return initial state with isAuthenticated true if token exists', () => {
    window.localStorage.getItem.mockReturnValue('mockToken');
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
  });

  // Test successful login
  test('should set isAuthenticated to true and navigate to dashboard on successful login', async () => {
    axiosInstance.post.mockResolvedValue({
      data: {
        data: {
          token: 'newToken',
          fullName: 'testUser',
          refreshToken: 'newRefreshToken',
        },
      },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('testuser', 'password123', true);
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith('jwtToken', 'newToken');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('Acount', 'testUser');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('refresh', 'newRefreshToken');
    expect(result.current.isAuthenticated).toBe(true);
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    expect(result.current.error).toBe('');
  });

  // Test login failure due to no token in response
  test('should set error if login successful but no token received', async () => {
    axiosInstance.post.mockResolvedValue({
      data: {
        data: {
          fullName: 'testUser',
        },
      },
    }); // No token in response

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('testuser', 'password123', false);
    });

    expect(window.localStorage.setItem).not.toHaveBeenCalledWith('jwtToken', expect.any(String));
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBe('Login successful, but no token received from the server.');
    expect(navigateMock).not.toHaveBeenCalled();
  });

  // Test login failure due to API error
  test('should set error on login failure from API', async () => {
    axiosInstance.post.mockRejectedValue({
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('wronguser', 'wrongpass', false);
    });

    expect(window.localStorage.removeItem).not.toHaveBeenCalled();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBe('Invalid credentials');
    expect(navigateMock).not.toHaveBeenCalled();
  });

  // Test generic login failure
  test('should set generic error on unexpected login failure', async () => {
    axiosInstance.post.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('testuser', 'password123', false);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBe('Login failed. Please try again.');
    expect(navigateMock).not.toHaveBeenCalled();
  });

  // Test logout
  test('should clear localStorage and set isAuthenticated to false on logout', async () => {
    window.localStorage.getItem.mockReturnValue('mockToken'); // Simulate being logged in
    const { result } = renderHook(() => useAuth());

    // Ensure initial state is authenticated
    expect(result.current.isAuthenticated).toBe(true);

    await act(async () => {
      result.current.logout();
    });

    expect(window.localStorage.removeItem).toHaveBeenCalledWith('jwtToken');
    expect(result.current.isAuthenticated).toBe(false);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});

import { renderHook, act } from '@testing-library/react';
import useMenuItem from '../useMenuItem';
import axiosInstance from '../../services/axiosInstance';
import { vi } from 'vitest';

// Mock axiosInstance
vi.mock('../../services/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
  },
}));

describe('useMenuItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test initial state
  test('should have correct initial state', () => {
    const { result } = renderHook(() => useMenuItem());
    expect(result.current.menuItem).toBe(null);
    expect(result.current.status).toBe('idle');
    expect(result.current.error).toBe(null);
  });

  // Test fetchMenuItem
  describe('fetchMenuItem', () => {
    test('should fetch a menu item successfully', async () => {
      const mockItem = { id: 1, name: 'Pizza' };
      axiosInstance.get.mockResolvedValue({ data: { data: mockItem } });

      const { result } = renderHook(() => useMenuItem());

      await act(async () => {
        await result.current.fetchMenuItem(1);
      });

      expect(result.current.status).toBe('succeeded');
      expect(result.current.menuItem).toEqual(mockItem);
      expect(result.current.error).toBe(null);
    });

    test('should handle fetch failure', async () => {
      const errorMessage = 'Item not found';
      axiosInstance.get.mockRejectedValue({ response: { data: { message: errorMessage } } });

      const { result } = renderHook(() => useMenuItem());

      await act(async () => {
        await result.current.fetchMenuItem(1);
      });

      expect(result.current.status).toBe('failed');
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.menuItem).toBe(null);
    });
  });

  // Test updateMenuItem
  describe('updateMenuItem', () => {
    test('should update a menu item successfully', async () => {
      const updatedItem = { id: 1, name: 'Super Pizza' };
      axiosInstance.put.mockResolvedValue({ data: { data: updatedItem } });

      const { result } = renderHook(() => useMenuItem());

      let updateResult;
      await act(async () => {
        updateResult = await result.current.updateMenuItem(1, { name: 'Super Pizza' });
      });

      expect(result.current.status).toBe('succeeded');
      expect(result.current.menuItem).toEqual(updatedItem);
      expect(updateResult).toEqual(updatedItem);
    });

    test('should handle update failure and re-throw', async () => {
      const errorMessage = 'Update failed';
      axiosInstance.put.mockRejectedValue({ response: { data: { message: errorMessage } } });

      const { result } = renderHook(() => useMenuItem());

      await act(async () => {
        try {
          await result.current.updateMenuItem(1, {});
        } catch (e) {
          // Expected error
        }
      });

      expect(result.current.status).toBe('failed');
      expect(result.current.error).toBe(errorMessage);
    });
  });

  // Test deleteMenuItem
  describe('deleteMenuItem', () => {
    test('should delete a menu item successfully', async () => {
      axiosInstance.put.mockResolvedValue({}); // API returns no data on success

      const { result } = renderHook(() => useMenuItem());

      // Set an initial item to see it get cleared
      act(() => {
        result.current.menuItem = { id: 1, name: 'Old Pizza' };
      });

      await act(async () => {
        await result.current.deleteMenuItem(1);
      });

      expect(result.current.status).toBe('succeeded');
      expect(result.current.menuItem).toBe(null);
    });

    test('should handle delete failure and re-throw', async () => {
      const errorMessage = 'Delete failed';
      axiosInstance.put.mockRejectedValue({ message: errorMessage });

      const { result } = renderHook(() => useMenuItem());

      await act(async () => {
        try {
          await result.current.deleteMenuItem(1);
        } catch (e) {
          // Expected error
        }
      });

      expect(result.current.status).toBe('failed');
      expect(result.current.error).toBe(errorMessage);
    });
  });
});

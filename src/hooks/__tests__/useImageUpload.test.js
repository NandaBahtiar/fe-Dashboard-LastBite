import { renderHook, act } from '@testing-library/react';
import useImageUpload from '../useImageUpload';
import axiosInstance from '../../services/axiosInstance';
import { vi } from 'vitest';

// Mock axiosInstance
vi.mock('../../services/axiosInstance', () => ({
  default: {
    post: vi.fn(),
  },
}));

// Mock FormData
global.FormData = vi.fn(() => ({
  append: vi.fn(),
}));

describe('useImageUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test initial state
  test('should have correct initial state', () => {
    const { result } = renderHook(() => useImageUpload());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  // Test calling uploadImage with no file
  test('should set an error if no file is provided', async () => {
    const { result } = renderHook(() => useImageUpload());

    await act(async () => {
      await result.current.uploadImage(null);
    });

    expect(result.current.error).toBe('No file selected.');
    expect(result.current.isLoading).toBe(false);
    expect(axiosInstance.post).not.toHaveBeenCalled();
  });

  // Test a successful image upload
  test('should upload the image successfully and return data', async () => {
    const mockFile = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const mockResponse = { data: { url: 'http://example.com/image.png' } };
    axiosInstance.post.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useImageUpload());

    let uploadResult;
    await act(async () => {
      uploadResult = await result.current.uploadImage(mockFile);
    });

    // Check FormData was used correctly
    expect(FormData).toHaveBeenCalled();
    const formDataInstance = FormData.mock.results[0].value;
    expect(formDataInstance.append).toHaveBeenCalledWith('file', mockFile);

    // Check axios call
    expect(axiosInstance.post).toHaveBeenCalledWith('/upload', formDataInstance, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Check state after successful upload
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockResponse.data);
    expect(result.current.error).toBe(null);
    expect(uploadResult).toEqual(mockResponse.data);
  });

  // Test a failed image upload with a specific API error message
  test('should handle upload failure and set error message from API', async () => {
    const mockFile = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const errorResponse = { response: { data: { message: 'Upload failed by API' } } };
    axiosInstance.post.mockRejectedValue(errorResponse);

    const { result } = renderHook(() => useImageUpload());

    // We expect the function to throw, so we catch the error to verify state.
    await act(async () => {
      try {
        await result.current.uploadImage(mockFile);
      } catch (e) {
        // Error is expected
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(errorResponse.response.data.message);
  });

  // Test a failed image upload with a generic error
  test('should handle generic upload failure', async () => {
    const mockFile = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const genericError = new Error('Network error');
    axiosInstance.post.mockRejectedValue(genericError);

    const { result } = renderHook(() => useImageUpload());

    await act(async () => {
      try {
        await result.current.uploadImage(mockFile);
      } catch (e) {
        // Error is expected
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(genericError.message);
  });
});

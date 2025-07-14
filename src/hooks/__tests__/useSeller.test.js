import { renderHook, act } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import useSeller from '../useSeller';
import axiosInstance from '../../services/axiosInstance';
import {
  fetchPatnersStart,
  fetchPatnersSuccess,
  fetchPatnersFailure,
} from '../../store/Slice/PatnerSlice';
import { vi } from 'vitest';

// Mock dependencies
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../services/axiosInstance', () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock('../../store/Slice/PatnerSlice', () => ({
  fetchPatnersStart: vi.fn(),
  fetchPatnersSuccess: vi.fn(),
  fetchPatnersFailure: vi.fn(),
}));

describe('useSeller', () => {
  let dispatchMock;

  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  // Test successful fetch with specific params
  test('should fetch partners successfully with given params', async () => {
    const mockResponse = {
      data: {
        data: [{ id: 'seller1', storeName: 'Test Store' }],
        paging: { currentPage: 1, size: 5, totalElements: 1, totalPage: 1 },
      },
    };
    axiosInstance.get.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useSeller());
    const params = {
      id: 's1',
      search: 'Test',
      status: 'active',
      page: 1,
      size: 5,
      sortField: 'id',
      sortDir: 'desc',
      role: 'SELLER',
    };

    await act(async () => {
      await result.current.fetchPatners(params);
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchPatnersStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/sellers', {
      params: {
        id: params.id,
        storeName: params.search,
        status: params.status,
        page: params.page,
        size: params.size,
        sortField: params.sortField,
        sortDir: params.sortDir,
        role: params.role,
      },
    });

    const expectedPayload = {
      data: mockResponse.data.data,
      pagination: {
        page: mockResponse.data.paging.currentPage,
        size: mockResponse.data.paging.size,
        totalElements: mockResponse.data.paging.totalElements,
        totalPages: mockResponse.data.paging.totalPage,
      },
    };
    expect(dispatchMock).toHaveBeenCalledWith(fetchPatnersSuccess(expectedPayload));
  });

  // Test successful fetch with default params
  test('should fetch partners with default params if none are provided', async () => {
    const mockResponse = {
      data: {
        data: [],
        paging: { currentPage: 0, size: 10, totalElements: 0, totalPage: 0 },
      },
    };
    axiosInstance.get.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useSeller());

    await act(async () => {
      await result.current.fetchPatners({}); // Empty params
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchPatnersStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/sellers', {
      params: {
        id: '',
        storeName: '',
        status: '',
        page: 0,
        size: 10,
        sortField: 'storeName',
        sortDir: 'asc',
        role: '',
      },
    });
    expect(dispatchMock).toHaveBeenCalledWith(fetchPatnersSuccess(expect.any(Object)));
  });

  // Test failed fetch
  test('should dispatch failure action on failed fetch', async () => {
    const errorMessage = 'Failed to fetch sellers';
    axiosInstance.get.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useSeller());

    await act(async () => {
      await result.current.fetchPatners({});
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchPatnersStart());
    expect(dispatchMock).toHaveBeenCalledWith(fetchPatnersFailure(errorMessage));
  });
});

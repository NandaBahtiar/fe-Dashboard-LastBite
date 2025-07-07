import { renderHook, act } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../services/axiosInstance';
import useCustomerOrders from '../useCustomerOrders';
import {
  fetchCustomerOrdersStart,
  fetchCustomerOrdersSuccess,
  fetchCustomerOrdersFailure,
  clearCustomerOrders,
} from '../../store/Slice/CustomerOrdersSlice';
import { vi } from 'vitest';

// Mock useDispatch and useSelector
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// Mock axiosInstance
vi.mock('../../services/axiosInstance', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('useCustomerOrders', () => {
  let dispatchMock;
  let useSelectorMock;

  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);

    useSelectorMock = vi.fn();
    useSelector.mockImplementation((selector) => selector({
      orderDetail: {
        orders: [],
        pagination: {},
        loading: false,
        error: null,
      },
    }));

    // Default mock for useSelector initial state
    useSelectorMock.mockImplementation(() => ({
      orders: [],
      pagination: {},
      loading: false,
      error: null,
    }));
  });

  // Test initial state
  test('should return initial state', () => {
    const { result } = renderHook(() => useCustomerOrders());

    expect(result.current.orders).toEqual([]);
    expect(result.current.pagination).toEqual({});
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  // Test fetchCustomerOrders success
  test('fetchCustomerOrders should dispatch success on successful API call', async () => {
    const mockOrdersData = [{ id: 1, item: 'Product A' }];
    const mockPagingData = {
      currentPage: 0,
      size: 5,
      totalElements: 10,
      totalPage: 2,
    };
    axiosInstance.get.mockResolvedValue({
      data: {
        data: mockOrdersData,
        paging: mockPagingData,
      },
    });

    const { result } = renderHook(() => useCustomerOrders());

    await act(async () => {
      await result.current.fetchCustomerOrders(123, 0, 5);
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchCustomerOrdersStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/orders', {
      params: { page: 0, size: 5 },
    });
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchCustomerOrdersSuccess({
        data: mockOrdersData,
        paging: {
          page: mockPagingData.currentPage,
          size: mockPagingData.size,
          totalElements: mockPagingData.totalElements,
          totalPages: mockPagingData.totalPage,
        },
      }),
    );
  });

  // Test fetchCustomerOrders failure
  test('fetchCustomerOrders should dispatch failure on API error', async () => {
    const errorMessage = 'Failed to fetch customer orders';
    axiosInstance.get.mockRejectedValue({
      response: {
        data: { message: errorMessage },
      },
    });

    const { result } = renderHook(() => useCustomerOrders());

    await act(async () => {
      await result.current.fetchCustomerOrders(123, 0, 5);
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchCustomerOrdersStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/orders', {
      params: { page: 0, size: 5 },
    });
    expect(dispatchMock).toHaveBeenCalledWith(fetchCustomerOrdersFailure(errorMessage));
  });

  // Test resetCustomerOrders
  test('resetCustomerOrders should dispatch clearCustomerOrders', () => {
    const { result } = renderHook(() => useCustomerOrders());

    act(() => {
      result.current.resetCustomerOrders();
    });

    expect(dispatchMock).toHaveBeenCalledWith(clearCustomerOrders());
  });
});

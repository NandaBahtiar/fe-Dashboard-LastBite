import { renderHook, act } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import useOrdersReport from '../useOrdersReport';
import axiosInstance from '../../services/axiosInstance';
import {
  fetchOrdersReportStart,
  fetchOrdersReportSuccess,
  fetchOrdersReportFailure,
} from '../../store/Slice/OrdersReportSlice';
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

vi.mock('../../store/Slice/OrdersReportSlice', () => ({
  fetchOrdersReportStart: vi.fn(),
  fetchOrdersReportSuccess: vi.fn(),
  fetchOrdersReportFailure: vi.fn(),
}));

describe('useOrdersReport', () => {
  let dispatchMock;

  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  // Test initial state
  test('should return initial state from the Redux store', () => {
    const initialState = { report: null, loading: false, error: null };
    useSelector.mockReturnValue(initialState);

    const { result } = renderHook(() => useOrdersReport());

    expect(result.current.report).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  // Test successful fetch
  test('should dispatch start and success actions on successful fetch', async () => {
    const mockReport = { totalOrders: 100, totalRevenue: 5000 };
    axiosInstance.get.mockResolvedValue({ data: mockReport });
    useSelector.mockReturnValue({ report: null, loading: false, error: null });

    const { result } = renderHook(() => useOrdersReport());
    const params = { startDate: '2023-01-01', endDate: '2023-01-31' };

    await act(async () => {
      await result.current.fetchOrdersReport(params);
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchOrdersReportStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/orders/report', { params });
    expect(dispatchMock).toHaveBeenCalledWith(fetchOrdersReportSuccess(mockReport));
  });

  // Test successful fetch with empty params
  test('should handle fetch with empty or missing params', async () => {
    const mockReport = { totalOrders: 200, totalRevenue: 10000 };
    axiosInstance.get.mockResolvedValue({ data: mockReport });
    useSelector.mockReturnValue({ report: null, loading: false, error: null });

    const { result } = renderHook(() => useOrdersReport());

    await act(async () => {
      await result.current.fetchOrdersReport({}); // Empty params object
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchOrdersReportStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/orders/report', {
      params: { startDate: '', endDate: '' },
    });
    expect(dispatchMock).toHaveBeenCalledWith(fetchOrdersReportSuccess(mockReport));
  });

  // Test failed fetch
  test('should dispatch start and failure actions on failed fetch', async () => {
    const errorMessage = 'Failed to fetch report';
    axiosInstance.get.mockRejectedValue(new Error(errorMessage));
    useSelector.mockReturnValue({ report: null, loading: false, error: null });

    const { result } = renderHook(() => useOrdersReport());

    await act(async () => {
      await result.current.fetchOrdersReport({ startDate: '2023-01-01' });
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchOrdersReportStart());
    expect(dispatchMock).toHaveBeenCalledWith(fetchOrdersReportFailure(errorMessage));
  });
});

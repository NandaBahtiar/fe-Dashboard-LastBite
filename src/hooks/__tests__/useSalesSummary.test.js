import { renderHook, act } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import useSalesSummary from '../useSalesSummary';
import axiosInstance from '../../services/axiosInstance';
import {
  fetchSalesSummaryStart,
  fetchSalesSummarySuccess,
  fetchSalesSummaryFailure,
} from '../../store/Slice/SalesSummarySlice';
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

vi.mock('../../store/Slice/SalesSummarySlice', () => ({
  fetchSalesSummaryStart: vi.fn(),
  fetchSalesSummarySuccess: vi.fn(),
  fetchSalesSummaryFailure: vi.fn(),
}));

describe('useSalesSummary', () => {
  let dispatchMock;

  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  // Test initial state
  test('should return initial state from the Redux store', () => {
    const initialState = { summary: null, loading: false, error: null };
    useSelector.mockReturnValue(initialState);

    const { result } = renderHook(() => useSalesSummary());

    expect(result.current.summary).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  // Test successful fetch
  test('should dispatch start and success actions on successful fetch', async () => {
    const mockSummary = { totalSales: 15000, itemsSold: 300 };
    axiosInstance.get.mockResolvedValue({ data: mockSummary });
    useSelector.mockReturnValue({ summary: null, loading: false, error: null });

    const { result } = renderHook(() => useSalesSummary());
    const params = { startDate: '2023-02-01', endDate: '2023-02-28' };

    await act(async () => {
      await result.current.fetchSalesSummary(params);
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchSalesSummaryStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/orders/report', {
      params: { start: params.startDate, end: params.endDate },
    });
    expect(dispatchMock).toHaveBeenCalledWith(fetchSalesSummarySuccess(mockSummary));
  });

  // Test successful fetch with missing params
  test('should handle fetch with missing params', async () => {
    const mockSummary = { totalSales: 5000, itemsSold: 100 };
    axiosInstance.get.mockResolvedValue({ data: mockSummary });
    useSelector.mockReturnValue({ summary: null, loading: false, error: null });

    const { result } = renderHook(() => useSalesSummary());

    await act(async () => {
      await result.current.fetchSalesSummary({}); // Empty params
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchSalesSummaryStart());
    expect(axiosInstance.get).toHaveBeenCalledWith('/orders/report', {
      params: { start: '', end: '' },
    });
    expect(dispatchMock).toHaveBeenCalledWith(fetchSalesSummarySuccess(mockSummary));
  });

  // Test failed fetch
  test('should dispatch start and failure actions on failed fetch', async () => {
    const errorMessage = 'Failed to fetch summary';
    axiosInstance.get.mockRejectedValue(new Error(errorMessage));
    useSelector.mockReturnValue({ summary: null, loading: false, error: null });

    const { result } = renderHook(() => useSalesSummary());

    await act(async () => {
      await result.current.fetchSalesSummary({ startDate: '2023-01-01' });
    });

    expect(dispatchMock).toHaveBeenCalledWith(fetchSalesSummaryStart());
    expect(dispatchMock).toHaveBeenCalledWith(fetchSalesSummaryFailure(errorMessage));
  });
});

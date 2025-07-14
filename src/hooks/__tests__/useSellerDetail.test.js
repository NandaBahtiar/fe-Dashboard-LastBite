import { renderHook, act } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import useSellerDetail from '../useSellerDetail';
import axiosInstance from '../../services/axiosInstance';
import { vi } from 'vitest';

// Import the actions we want to mock
import {
  fetchSellerDetailStart,
  fetchSellerDetailSuccess,
  fetchSellerDetailFailure,
  clearSellerDetail,
} from '../../store/Slice/SellerDetailSlice';
import {
  fetchSellerMenuStart,
  fetchSellerMenuSuccess,
  fetchSellerMenuFailure,
} from '../../store/Slice/SellerMenuSlice';
import {
  canceledSellerStart,
  canceledSellerSuccess,
  canceledSellerFailure,
} from '../../store/Slice/CanceledSellerSlice';
import {
  deleteSellerStart,
  deleteSellerSuccess,
  deleteSellerFailure,
} from '../../store/Slice/DeleteSellerSlice';


// Mock all the dependencies
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../services/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock the action creator modules
vi.mock('../../store/Slice/SellerDetailSlice');
vi.mock('../../store/Slice/SellerMenuSlice');
vi.mock('../../store/Slice/CanceledSellerSlice');
vi.mock('../../store/Slice/DeleteSellerSlice');


describe('useSellerDetail', () => {
  let dispatchMock;

  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  // Test fetchSellerDetail
  describe('fetchSellerDetail', () => {
    test('should fetch seller details successfully', async () => {
      const mockDetail = { id: 's1', name: 'Seller One' };
      axiosInstance.get.mockResolvedValue({ data: { data: mockDetail } });
      const { result } = renderHook(() => useSellerDetail());
      await act(async () => { await result.current.fetchSellerDetail('s1'); });
      expect(dispatchMock).toHaveBeenCalledWith(fetchSellerDetailStart());
      expect(axiosInstance.get).toHaveBeenCalledWith('/sellers/s1');
      expect(dispatchMock).toHaveBeenCalledWith(fetchSellerDetailSuccess(mockDetail));
    });

    test('should handle failure when fetching seller details', async () => {
      const error = new Error('Fetch failed');
      axiosInstance.get.mockRejectedValue(error);
      const { result } = renderHook(() => useSellerDetail());
      await act(async () => { await result.current.fetchSellerDetail('s1'); });
      expect(dispatchMock).toHaveBeenCalledWith(fetchSellerDetailFailure(error.message));
    });
  });

  // Test resetSellerDetail
  test('resetSellerDetail should dispatch clearSellerDetail', () => {
    const { result } = renderHook(() => useSellerDetail());
    act(() => { result.current.resetSellerDetail(); });
    expect(dispatchMock).toHaveBeenCalledWith(clearSellerDetail());
  });

  // Test updateSeller
  describe('updateSeller', () => {
    test('should update seller status to ACTIVE and refetch details', async () => {
      const mockDetail = { id: 's1', status: 'ACTIVE' };
      axiosInstance.put.mockResolvedValue({});
      axiosInstance.get.mockResolvedValue({ data: { data: mockDetail } });
      const { result } = renderHook(() => useSellerDetail());
      await act(async () => { await result.current.updateSeller({ id: 's1', status: true }); });
      expect(axiosInstance.put).toHaveBeenCalledWith('/sellers/s1', { status: 'ACTIVE' });
      expect(axiosInstance.get).toHaveBeenCalledWith('/sellers/s1');
      expect(dispatchMock).toHaveBeenCalledWith(fetchSellerDetailSuccess(mockDetail));
    });
  });

  // Test fetchSellerMenu
  describe('fetchSellerMenu', () => {
    test('should fetch seller menu with pagination', async () => {
      const mockMenuResponse = { data: { data: [], paging: { currentPage: 0, size: 10, totalElements: 0, totalPage: 0 } } };
      axiosInstance.get.mockResolvedValue(mockMenuResponse);
      const { result } = renderHook(() => useSellerDetail());
      await act(async () => { await result.current.fetchSellerMenu({ sellerId: 's1', page: 0, size: 10, name: 'pizza' }); });
      expect(axiosInstance.get).toHaveBeenCalledWith('/menu-items?sortDir=asc&page=0&size=10&sellerId=s1&name=pizza');
      expect(dispatchMock).toHaveBeenCalledWith(fetchSellerMenuSuccess(expect.any(Object)));
    });
  });

  // Test cenceledSeller
  describe('cenceledSeller', () => {
    test('should cancel a seller and refetch details', async () => {
      const mockDetail = { id: 's1', status: 'CANCELLED' };
      axiosInstance.put.mockResolvedValue({});
      axiosInstance.get.mockResolvedValue({ data: { data: mockDetail } });
      const { result } = renderHook(() => useSellerDetail());
      await act(async () => { await result.current.cenceledSeller('s1'); });
      expect(axiosInstance.put).toHaveBeenCalledWith('/sellers/s1', { status: 'CANCELLED' });
      expect(axiosInstance.get).toHaveBeenCalledWith('/sellers/s1');
      expect(dispatchMock).toHaveBeenCalledWith(fetchSellerDetailSuccess(mockDetail));
      expect(dispatchMock).toHaveBeenCalledWith(canceledSellerSuccess());
    });
  });

  // Test deleteMenuItem
  describe('deleteMenuItem', () => {
    test('should delete a menu item successfully', async () => {
      axiosInstance.delete.mockResolvedValue({});
      const { result } = renderHook(() => useSellerDetail());
      await act(async () => { await result.current.deleteMenuItem('m1'); });
      expect(axiosInstance.delete).toHaveBeenCalledWith('/menu-items/m1');
      expect(dispatchMock).toHaveBeenCalledWith(deleteSellerSuccess());
    });

    test('should handle failure and re-throw when deleting a menu item', async () => {
      const error = new Error('Delete failed');
      axiosInstance.delete.mockRejectedValue(error);
      const { result } = renderHook(() => useSellerDetail());
      await expect(act(async () => { await result.current.deleteMenuItem('m1'); })).rejects.toThrow(error);
      expect(dispatchMock).toHaveBeenCalledWith(deleteSellerFailure(error.message));
    });
  });
});
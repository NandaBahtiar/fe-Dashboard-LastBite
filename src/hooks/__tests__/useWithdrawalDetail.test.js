import { renderHook, act } from '@testing-library/react';
import useWithdrawalDetail from '../useWithdrawalDetail';
import axiosInstance from '../../services/axiosInstance';
import { vi } from 'vitest';

// Mock axiosInstance
vi.mock('../../services/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
  },
}));

describe('useWithdrawalDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test initial fetch based on withdrawalId
  test('should automatically fetch withdrawal details when withdrawalId is provided', async () => {
    const mockDetail = { id: 'wd1', amount: 100 };
    axiosInstance.get.mockResolvedValue({ data: mockDetail });

    const { result, rerender } = renderHook(({ id }) => useWithdrawalDetail(id), {
      initialProps: { id: 'wd1' },
    });

    // It should be loading initially
    expect(result.current.status).toBe('loading');

    // Wait for the fetch to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0)); // Allow useEffect to run
    });

    expect(axiosInstance.get).toHaveBeenCalledWith('/withdrawals/wd1');
    expect(result.current.status).toBe('succeeded');
    expect(result.current.withdrawalDetail).toEqual(mockDetail);
  });

  test('should not fetch if withdrawalId is not provided', () => {
    renderHook(() => useWithdrawalDetail(null));
    expect(axiosInstance.get).not.toHaveBeenCalled();
  });

  // Test approveWithdrawal
  describe('approveWithdrawal', () => {
    test('should approve a withdrawal and refetch details', async () => {
      const initialDetail = { id: 'wd1', status: 'PENDING' };
      const approvedDetail = { id: 'wd1', status: 'APPROVED' };
      axiosInstance.get.mockResolvedValueOnce({ data: initialDetail }); // Initial fetch
      axiosInstance.put.mockResolvedValue({}); // Approve request
      axiosInstance.get.mockResolvedValueOnce({ data: approvedDetail }); // Refetch

      const { result } = renderHook(() => useWithdrawalDetail('wd1'));

      // Wait for initial fetch
      await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });

      await act(async () => {
        await result.current.approveWithdrawal('http://proof.com/img.jpg');
      });

      expect(result.current.status).toBe('succeeded');
      expect(axiosInstance.put).toHaveBeenCalledWith('/withdrawals/wd1/approve', {
        proofOfPaymentUrl: 'http://proof.com/img.jpg',
      });
      expect(result.current.withdrawalDetail).toEqual(approvedDetail);
    });

    test('should handle approval failure', async () => {
        axiosInstance.get.mockResolvedValue({ data: { id: 'wd1' } });
        const error = { response: { data: 'Approval failed' } };
        axiosInstance.put.mockRejectedValue(error);

        const { result } = renderHook(() => useWithdrawalDetail('wd1'));
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });

        await act(async () => {
            await result.current.approveWithdrawal('proof_url');
        });

        expect(result.current.status).toBe('failed');
        expect(result.current.error).toBe(error.response.data);
    });
  });

  // Test rejectWithdrawal
  describe('rejectWithdrawal', () => {
    test('should reject a withdrawal and refetch details', async () => {
      const rejectedDetail = { id: 'wd1', status: 'REJECTED' };
      axiosInstance.get.mockResolvedValueOnce({ data: { id: 'wd1' } });
      axiosInstance.put.mockResolvedValue({});
      axiosInstance.get.mockResolvedValueOnce({ data: rejectedDetail });

      const { result } = renderHook(() => useWithdrawalDetail('wd1'));
      await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });

      await act(async () => {
        await result.current.rejectWithdrawal('Invalid account');
      });

      expect(result.current.status).toBe('succeeded');
      expect(axiosInstance.put).toHaveBeenCalledWith('/withdrawals/wd1/reject', {
        cancelReason: 'Invalid account',
      });
      expect(result.current.withdrawalDetail).toEqual(rejectedDetail);
    });
  });
});

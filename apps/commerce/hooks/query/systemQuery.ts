import { useQuery } from '@tanstack/react-query';
import SystemAPI from 'apis/systemApi';

export const systemKeys = {
  base: ['system'] as const,
  getBuyerInfo: () => [...systemKeys.base, 'getMainDisplayInfo'] as const,
  getPaymentRequireInfo: () => [...systemKeys.base, 'paymentReqInfo'] as const,
  getLayoutInfo: () => [...systemKeys.base, 'getLayoutInfo'] as const,
};

export const useGetBuyerInfo = () =>
  useQuery({
    queryKey: systemKeys.getBuyerInfo(),
    queryFn: () => SystemAPI.getBuyerInfo(),
    select: (resp) => resp.data,
  });

export const useGetPaymentRequireInfo = (enabled?: boolean) =>
  useQuery({
    queryKey: systemKeys.getPaymentRequireInfo(),
    queryFn: () => SystemAPI.getPaymentRequireInfo(),
    enabled: !enabled,
  });

export const useGetLayoutInfo = () =>
  useQuery({
    queryKey: systemKeys.getLayoutInfo(),
    queryFn: () => SystemAPI.getLayoutInfo(),
    select: (resp) => resp.data,
  });

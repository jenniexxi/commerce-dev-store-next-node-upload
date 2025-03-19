import { useQuery } from '@tanstack/react-query';
import BuyersAPI from 'apis/buyerApi';

export const buyerKyes = {
  base: ['buyer'] as const,
  getMyAddressCount: () => [...buyerKyes.base, 'getMyAddressCount'] as const,
  getMyAddresses: () => [...buyerKyes.base, 'getMyAddresses'] as const,
};

export const useGetMyAddressCount = () =>
  useQuery({
    queryKey: buyerKyes.getMyAddressCount(),
    queryFn: () => BuyersAPI.getMyAddressCount(),
    select: (resp) => resp,
  });

export const useGetMyAddresses = (count?: number) =>
  useQuery({
    queryKey: buyerKyes.getMyAddresses(),
    queryFn: () => BuyersAPI.getMyAddresses(),
    select: (resp) => resp,
    enabled: count !== 0,
  });

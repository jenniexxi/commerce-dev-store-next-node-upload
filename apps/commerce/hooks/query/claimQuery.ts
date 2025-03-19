import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Code } from 'apis/apiCommonType';
import ClaimAPI from 'apis/claimApi';
import { ClaimListQuery } from 'type/api/claim';
import { ClaimTypeKey } from 'type/claims';

export const claimKeys = {
  base: ['claim'] as const,
  getClaimList: (searchParam?: ClaimListQuery) => [...claimKeys.base, 'getClaimList', searchParam] as const,
  getClaimOrderDetail: (ordersIdEncrypt: string) => [...claimKeys.base, 'getClaimDetail', ordersIdEncrypt] as const,
  getClaimCancelInfoView: (ordersIdEncrypt: string) =>
    [...claimKeys.base, 'getCancelOrderInfo', ordersIdEncrypt] as const,
  getClaimExchangeInfoView: (ordersIdEncrypt: string) =>
    [...claimKeys.base, 'ExchangeOrderInfo', ordersIdEncrypt] as const,
  getClaimReturnInfoView: (ordersIdEncrypt: string) => [...claimKeys.base, 'returnOrderInfo', ordersIdEncrypt] as const,
};

export const useGetClaimList = (searchParam: ClaimListQuery) =>
  useInfiniteQuery({
    queryKey: claimKeys.getClaimList(searchParam),
    queryFn: ({ pageParam }) =>
      ClaimAPI.getClaimList({
        ...searchParam,
        page: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.last || allPages.length >= lastPage.data.totalPages) {
        return undefined;
      }
      return allPages.length;
    },
  });

export const useGetClaimDetail = (ordersIdEncrypt: string) =>
  useQuery({
    queryKey: claimKeys.getClaimOrderDetail(ordersIdEncrypt),
    queryFn: () => ClaimAPI.getClaimOrderDetail(ordersIdEncrypt),
    select: (resp) => resp,
  });

export const useGetClaimCancelInfoView = (ordersIdEncrypt: string, orderShippingPriceIdEncrypt: string) =>
  useQuery({
    queryKey: claimKeys.getClaimCancelInfoView(ordersIdEncrypt),
    queryFn: () =>
      ClaimAPI.claimCancelInfoView({
        ordersIdEncrypt,
        orderShippingPriceIdEncrypt,
      }),
    select: (resp) => resp,
  });

export const useGetClaimExchangeInfoView = (ordersIdEncrypt: string, orderShippingPriceIdEncrypt: string) =>
  useQuery({
    queryKey: claimKeys.getClaimExchangeInfoView(ordersIdEncrypt),
    queryFn: () =>
      ClaimAPI.claimExchangeInfoView({
        ordersIdEncrypt,
        orderShippingPriceIdEncrypt,
      }),
    select: (resp) => resp,
  });

export const useGetClaimReturnInfoView = (ordersIdEncrypt: string, orderShippingPriceIdEncrypt: string) =>
  useQuery({
    queryKey: claimKeys.getClaimReturnInfoView(ordersIdEncrypt),
    queryFn: () =>
      ClaimAPI.claimReturnInfoView({
        ordersIdEncrypt,
        orderShippingPriceIdEncrypt,
      }),
    select: (resp) => resp,
  });

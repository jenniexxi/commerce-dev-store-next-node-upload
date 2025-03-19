import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import ClaimAPI from 'apis/claimApi';
import MyPageAPI from 'apis/mypageApi';

export const mypageKeys = {
  base: ['mypage'] as const,
  getMyPageMainInfo: () => [...mypageKeys.base, 'getMyPageMainInfo'] as const,
  getAddPaymentList: () => [...mypageKeys.base, 'getAddPaymentList'] as const,
};

export const useGetMyPageMainInfo = () =>
  useQuery({
    queryKey: mypageKeys.getMyPageMainInfo(),
    queryFn: () => MyPageAPI.getMyPageMainInfo(),
    select: (resp) => resp.data,
  });

export const useGetAddPaymentList = (size = 10) =>
  useInfiniteQuery({
    queryKey: mypageKeys.getAddPaymentList(),
    queryFn: ({ pageParam }) =>
      ClaimAPI.getAddPaymentList({
        page: pageParam,
        size,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.last || allPages.length >= lastPage.data.totalPages) {
        return undefined;
      }
      return allPages.length;
    },
  });

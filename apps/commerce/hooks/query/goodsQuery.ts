import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import GoodsAPI from 'apis/goodsApi';
import { SearchParamsQuery } from 'app/myPage/productInquiry/components/Filter';
import { GoodsQnaAnswerStatusCode } from 'type/customer';

export const goodsKeys = {
  base: ['goods'] as const,
  getGoods: (goodsId: number) => [...goodsKeys.base, 'getGoods', goodsId] as const,
  getGoodsPrice: (goodsId: number) => [...goodsKeys.base, 'getGoodsPrice', goodsId] as const,
  getGoodsFeedbackAboveFour: (goodsId: number) => [...goodsKeys.base, , 'getGoodsFeedbackAboveFour', goodsId] as const,
  getGoodsRelationVideo: (goodsId: number) => [...goodsKeys.base, , 'getGoodsRelationVideo', goodsId] as const,
  getGoodsRecommended: (goodsId: number) => [...goodsKeys.base, , 'getGoodsRecommended', goodsId] as const,
  getGoodsStoreBest: (goodsId: number) => [...goodsKeys.base, , 'getGoodsStoreBest', goodsId] as const,
  getGoodsAnnouncement: (goodsId: number) => [...goodsKeys.base, , 'getGoodsAnnouncement', goodsId] as const,
  getGoodsQnasMeInquiry: (param: SearchParamsQuery) => [...goodsKeys.base, , 'getGoodsAnnouncement', param] as const,
  getGoodsQnas: (
    goodsId: number,
    isMyInquiryToggle: boolean,
    isSecretMsg: boolean,
    selectedTab?: GoodsQnaAnswerStatusCode,
  ) => [...goodsKeys.base, , 'getGoodsInquiryInfo', goodsId, isMyInquiryToggle, isSecretMsg, selectedTab] as const,
};

export const useGetGoods = (goodsId: number) =>
  useQuery({
    queryKey: goodsKeys.getGoods(goodsId),
    queryFn: () => GoodsAPI.getGoods(goodsId),
    select: (resp) => resp,
  });

export const useGetGoodsPrice = (goodsId: number) =>
  useQuery({
    queryKey: goodsKeys.getGoodsPrice(goodsId),
    queryFn: () => GoodsAPI.getGoodsPrice(goodsId),
    select: (resp) => resp.data,
  });

export const useGetGoodsFeedbackAboveFour = (goodsId: number) =>
  useQuery({
    queryKey: goodsKeys.getGoodsFeedbackAboveFour(goodsId),
    queryFn: () => GoodsAPI.getGoodsFeedbackAboveFour(goodsId),
    select: (resp) => resp.data,
  });

export const useGetGoodsRelationVideo = (goodsId: number) =>
  useQuery({
    queryKey: goodsKeys.getGoodsRelationVideo(goodsId),
    queryFn: () => GoodsAPI.getGoodsRelationVideo(goodsId),
    select: (resp) => resp.data,
  });

export const useGetGoodsRecommended = (goodsId: number) =>
  useQuery({
    queryKey: goodsKeys.getGoodsRecommended(goodsId),
    queryFn: () => GoodsAPI.getGoodsRecommended(goodsId),
    select: (resp) => resp.data,
    enabled: goodsId !== -1,
  });

export const useGetGoodsStoreBest = (goodsId: number) =>
  useQuery({
    queryKey: goodsKeys.getGoodsStoreBest(goodsId),
    queryFn: () => GoodsAPI.getGoodsStoreBest(goodsId),
    select: (resp) => resp.data,
  });

export const useGetGoodsAnnouncement = (goodsId: number) =>
  useQuery({
    queryKey: goodsKeys.getGoodsAnnouncement(goodsId),
    queryFn: () => GoodsAPI.getGoodsAnnouncement(goodsId),
    select: (resp) => resp.data,
  });

export const useGetGoodsQnasMeInquiry = (searchParam: SearchParamsQuery) =>
  useInfiniteQuery({
    queryKey: goodsKeys.getGoodsQnasMeInquiry(searchParam),
    queryFn: ({ pageParam }) =>
      GoodsAPI.getGoodsQnasMeInquiry({
        ...searchParam,
        answerHoldYn:
          searchParam.inquiryStatus === 'ALL' ? undefined : searchParam.inquiryStatus === 'READY' ? true : false,
        answerDoneYn:
          searchParam.inquiryStatus === 'ALL' ? undefined : searchParam.inquiryStatus === 'DONE' ? true : false,
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

export const useGetGoodsQnasInquiry = (
  goodsId: number,
  isMyInquiryToggle: boolean,
  isSecretMsg: boolean,
  selectedTab?: GoodsQnaAnswerStatusCode,
) =>
  useInfiniteQuery({
    queryKey: goodsKeys.getGoodsQnas(goodsId, isMyInquiryToggle, isSecretMsg, selectedTab),
    queryFn: ({ pageParam }) =>
      GoodsAPI.getGoodsQnas(goodsId, {
        page: pageParam,
        size: 10,
        myGoodsQnaYn: isMyInquiryToggle,
        ...(isSecretMsg && { openYn: isSecretMsg }),
        statusEnum: selectedTab,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.last || allPages.length >= lastPage.data.totalPages) {
        return undefined;
      }
      return allPages.length;
    },
  });

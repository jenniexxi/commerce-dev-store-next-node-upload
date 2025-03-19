import { useQuery } from '@tanstack/react-query';
import DisplayAPI from 'apis/displayApi';

export const displayKeys = {
  base: ['display'] as const,
  getMainDisplayInfo: () => [...displayKeys.base, 'getMainDisplayInfo'] as const,
  getMainInfo: () => [...displayKeys.base, 'getMainInfo'] as const,
  getMainCustomGoods: (mainGroupId: number) => [...displayKeys.base, 'getMainCustomGoods', mainGroupId],
  getMainCustomRecommend: (mainGroupId: number) => [...displayKeys.base, 'getMainCustomRecommend', mainGroupId],
};

export const useGetMainDisplayInfo = () =>
  useQuery({
    queryKey: displayKeys.getMainDisplayInfo(),
    queryFn: () => DisplayAPI.getMainDisplayInfo(),
    select: (resp) => resp.data,
  });

export const useGetMainInfo = () =>
  useQuery({
    queryKey: displayKeys.getMainInfo(),
    queryFn: () => DisplayAPI.getMainInfo(),
    select: (resp) => resp.data,
  });

export const useGetMainCustomGoods = (mainGroupId: number) =>
  useQuery({
    queryKey: displayKeys.getMainCustomGoods(mainGroupId),
    queryFn: () => DisplayAPI.getMainCustomGoods(mainGroupId),
    select: (resp) => resp.data,
  });

export const useGetMainCustomRecommend = (mainGroupId: number) =>
  useQuery({
    queryKey: displayKeys.getMainCustomRecommend(mainGroupId),
    queryFn: () => DisplayAPI.getMainCustomRecommend(mainGroupId),
    select: (resp) => resp.data,
  });

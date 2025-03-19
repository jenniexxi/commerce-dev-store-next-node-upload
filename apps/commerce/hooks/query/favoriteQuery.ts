import { useQuery } from '@tanstack/react-query';
import FavoritesAPI from 'apis/favoritesApi';

export const favoriteKeys = {
  base: ['favorite'] as const,
  getFavoriteGoodsMe: () => [...favoriteKeys.base, 'getFavoriteGoodsMe'] as const,
  getFavoriteStore: (companyStoreId: number) => [...favoriteKeys.base, 'getFavoriteStore', companyStoreId] as const,
};

export const useGetFavoriteGoodsMe = (body: { page: number; size: number }) =>
  useQuery({
    queryKey: favoriteKeys.getFavoriteGoodsMe(),
    queryFn: () => FavoritesAPI.getFavoriteGoodsMe(body),
    select: (resp) => resp.data,
  });

export const useGetFavoriteStore = (companyStoreId: number) =>
  useQuery({
    queryKey: favoriteKeys.getFavoriteStore(companyStoreId),
    queryFn: () => FavoritesAPI.getFavoriteStore(companyStoreId),
    select: (resp) => resp.data,
    enabled: companyStoreId !== -1,
  });

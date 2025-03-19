import { useMutation } from '@tanstack/react-query';

import FavoritesAPI from 'apis/favoritesApi';
import { PostStringResp } from 'type/api/favorite';

// 찜하기 추가
export const useAddFavoriteGoods = (onSuccessCallback?: (resp: PostStringResp) => void) => {
  const mutation = useMutation({
    mutationFn: (goodsId: number) => FavoritesAPI.postFavoriteGoods(goodsId),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};

export const useRemoveFavoriteGoods = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: (encryptedIdList: string[]) => FavoritesAPI.deleteFavoriteGoods(encryptedIdList),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};

export const useAddFavoriteStore = (onSuccessCallback?: (resp: PostStringResp) => void) => {
  const mutation = useMutation({
    mutationFn: (companyStoreId: number) => FavoritesAPI.postFavoriteStore(companyStoreId),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};

export const useRemoveFavoriteStore = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: (favoriteStoreIdEncryptList: string[]) => FavoritesAPI.deleteFavoriteStore(favoriteStoreIdEncryptList),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};

export const useAddFavoriteStoreAlert = (onSuccessCallback?: (resp: PostStringResp) => void) => {
  const mutation = useMutation({
    mutationFn: (companyStoreId: number) => FavoritesAPI.postFavoriteStoreAlert(companyStoreId),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};

export const useRemoveFavoriteStoreAlert = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: (favoriteStoreAlertId: string) => FavoritesAPI.deleteFavoriteStoreAlert(favoriteStoreAlertId),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};

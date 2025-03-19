import {
  GoodsResp,
  PostStringResp,
  FavoriteGoodsQuery,
  FavoriteGoodsResp,
  CompanyStoreResp,
  FavoriteStoreQuery,
  FavoriteStoreResp,
} from 'type/api/favorite';
import { axiosInstance, APIResponse } from './api';
import { FavoritesUrl } from './urls';

const FavoritesAPI = {
  getFavoriteGoods: (goodsIdList: string): Promise<GoodsResp> => {
    return axiosInstance
      .get(FavoritesUrl.getFavoriteGoods, {
        params: { goodsIdList },
      })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  postFavoriteGoods: (goodsId: number): Promise<PostStringResp> => {
    return axiosInstance
      .post(FavoritesUrl.postFavoriteGoods, { goodsId })
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  deleteFavoriteGoods: (favoriteGoodsIdEncrypt: string[]): Promise<APIResponse> => {
    return axiosInstance
      .delete(FavoritesUrl.deleteFavoriteGoods, {
        data: { favoriteGoodsIdEncryptList: favoriteGoodsIdEncrypt },
      })
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  getFavoriteGoodsMe: (query: FavoriteGoodsQuery): Promise<FavoriteGoodsResp> => {
    const queryParam = new URLSearchParams({
      page: query.page.toString(),
      size: query.size.toString(),
    });
    return axiosInstance
      .get(FavoritesUrl.getFavoriteGoodsMe + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  getFavoriteStore: (companyStoreId: number): Promise<CompanyStoreResp> => {
    return axiosInstance
      .get(FavoritesUrl.getFavoriteStore(companyStoreId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  postFavoriteStore: (companyStoreId: number): Promise<PostStringResp> => {
    return axiosInstance
      .post(FavoritesUrl.postFavoriteStore, { companyStoreId })
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  deleteFavoriteStore: (favoriteStoreIdEncryptList: string[]): Promise<APIResponse> => {
    return axiosInstance
      .delete(FavoritesUrl.deleteFavoriteStore, {
        data: { favoriteStoreIdEncryptList: favoriteStoreIdEncryptList },
      })
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  getFavoriteStoreMe: (query: FavoriteStoreQuery): Promise<FavoriteStoreResp> => {
    const queryParam = new URLSearchParams({
      page: query.page.toString(),
      size: query.size.toString(),
    });
    return axiosInstance
      .get(FavoritesUrl.getFavoriteStoreMe + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  postFavoriteStoreAlert: (companyStoreId: number): Promise<PostStringResp> => {
    return axiosInstance
      .post(FavoritesUrl.postFavoriteStoreAlert(companyStoreId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  deleteFavoriteStoreAlert: (favoriteStoreAlertIdEncrypt: string): Promise<APIResponse> => {
    return axiosInstance
      .delete(FavoritesUrl.deleteFavoriteStoreAlert(favoriteStoreAlertIdEncrypt))
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
};

export default FavoritesAPI;

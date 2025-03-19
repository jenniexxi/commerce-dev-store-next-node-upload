import { APIResponse } from 'apis/api';
import { GoodsInfo } from './goods';

export type GoodsResp = APIResponse & {
  data: Goods;
};
export type Goods = {
  list: {
    goodsId: number;
    favoriteGoodsIdEncrypt: string;
  }[];
};

export type FavoriteGoodsQuery = {
  page: number;
  size: number;
};

export type FavoriteGoodsResp = APIResponse & {
  data: FavoriteGoods;
};

export type FavoriteGoods = {
  content: {
    favoriteGoodsIdEncrypt: string;
    goodsInfo: GoodsInfo;
  }[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type PostStringResp = APIResponse & {
  data: string;
};

export type CompanyStoreResp = APIResponse & {
  data: CompanyStore;
};
export type CompanyStore = {
  companyStoreId: number;
  storeName: string;
  storeImageUrl: string;
  favoriteStoreIdEncrypt: string;
  favoriteStoreAlertIdEncrypt: string;
  storeFavoriteCnt: number;
};

export type FavoriteStoreQuery = {
  page: number;
  size: number;
};

export type FavoriteStoreResp = APIResponse & {
  data: FavoriteStore;
};

export type FavoriteStore = {
  content: {
    favoriteStoreIdEncrypt: string;
    storeName: string;
    storeImageUrl: string;
    storeFavoriteCnt: number;
  }[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

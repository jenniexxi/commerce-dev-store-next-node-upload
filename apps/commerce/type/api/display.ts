import { APIResponse } from 'apis/api';
import { Code, Price, Badge } from 'apis/apiCommonType';
import {
  DeviceTypeCode,
  DeviceTypeCodeKey,
  DisplayGoodsSortTypeCode,
  GoodsDisplaySalesStatusKey,
  mainDisplayType,
} from 'type/display';
import { GoodsInfo } from './goods';

// NOTE: API Response, Request Type을 정의합니다.

// export type SalesListData = {
//   content: GoodsInfo[];
//   page: number;
//   size: number;
//   totalElements: number;
//   totalPages: number;
//   first: boolean;
//   last: boolean;
// };

// export type SalesListResp = APIResponse & {
//   data: SalesListData;
// };

export type SearchInfo = {
  searchKeyword: string;
  searchKeywordLinkUrl: string;
  searchRecentlyList: string[];
  recommendationKeywordList: string[];
};
export type SearchInfoResp = APIResponse & {
  data: SearchInfo;
};

type CategoryList = {
  categoryStoreId: number;
  name: string;
  childCategorySize: number;
  cnt: number;
  categoryList: CategoryList[];
};
type BrandList = {
  brandId: number;
  brandName: string;
  cnt: number;
};

export type SearchResultList = {
  goodsSortTypeEnumList: Code<DisplayGoodsSortTypeCode>;
  categoryList: CategoryList[];
  brandList: BrandList[];
};
export type SearchResultListResp = APIResponse & {
  data: SearchResultList;
};

export type SearchListGoodsContent = {
  goodsId: number;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  recommendPrice: Price;
  paymentPrice: Price;
  saleRate: number;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  soldOutYn: boolean;
  soldStopYn: boolean;
  soldEndYn: boolean;
  adultYn: boolean;
  delYn: boolean;
  badgeList: Badge[];
};

export type SearchGoodsResult = {
  content: SearchListGoodsContent[];
  page: number;
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};
export type SearchGoodsResultResp = { data: SearchGoodsResult };
export type SearchAutoCompleteResp = {
  data: {
    keyword: string;
    highLight?: string;
  }[];
};

type CustomDetailTypeEnum = {
  code: mainDisplayType;
  codeName: string;
};
type DeviceTypeEnumList = {
  code: DeviceTypeCode;
  codeName: DeviceTypeCodeKey;
};
type CustomAreaList = {
  mainGroupId: number;
  customDetailTypeEnum: CustomDetailTypeEnum;
  sort: number;
};

export type GetMainDisplayInfoResp = {
  deviceTypeEnumList: DeviceTypeEnumList[];
  customAreaList: CustomAreaList[];
};

type TopStripType = {
  imageFilesUrl: string;
  url: string;
};

type MainBannerListType = {
  imageFilesUrl: string;
  url: string;
  sort: number;
};

type QuickMenuListType = {
  imageFilesUrl: string;
  quickMenuName: string;
  url: string;
  sort: number;
};

export type GetMainInfoResp = {
  topStrip: TopStripType | null;
  mainBannerList: MainBannerListType[];
  quickMenuList: QuickMenuListType[];
};

export type GetMainCustomGoodsResp = {
  customDetailTypeEnum: CustomDetailTypeEnum;
  mainTitle: string;
  subTitle: string;
  imageFilesUrl: string;
  url: string;
  goodsList: GoodsInfo[];
};

type CustomRecommendClickA = {
  historyExistYn: boolean;
  recentGoodsList: {
    recentGoodsId: number;
    goodsImageUrl: string;
  }[];
  goodsGroupList: {
    recentGoodsId: number;
    goodsList: GoodsInfo[];
  }[];
};

type CustomRecommendClickB = {
  historyExistYn: boolean;
  goodsName: 'string';
  storeId: 0;
  storeName: 'string';
  storeImageUrl: 'string';
  storeFavoriteCnt: 0;
  goodsList: GoodsInfo[];
};

type StoreRecommendList = {
  storeId: number;
  storeName: string;
  storeImageUrl: string;
  storeFavoriteCnt: number;
  goodsList: GoodsInfo[];
};

type CustomRecommendClickC = {
  historyExistYn: boolean;
  storeRecommendList: StoreRecommendList[];
};

type CustomRecommendSearch = {
  historyExistYn: boolean;
  keyword: string | null;
  goodsList: GoodsInfo[];
};

type CustomRecommendAge = {
  ageTypeEnum: {
    code: string;
    codeName: string;
  };
  goodsList: GoodsInfo[];
};

type CustomRecommendCategory = {
  categoryStoreId: number;
  categoryName: string;
  goodsList: GoodsInfo[];
};

export type GetMainCustomRecommendResp = {
  customDetailTypeEnum: CustomDetailTypeEnum;
  clickA: CustomRecommendClickA | null;
  clickB: CustomRecommendClickB | null;
  clickC: CustomRecommendClickC | null;
  wishList: GoodsInfo[] | null;
  search: CustomRecommendSearch | null;
  order: GoodsInfo[] | null;
  newGoods: GoodsInfo[] | null;
  age: CustomRecommendAge[] | null;
  category: CustomRecommendCategory[] | null;
  storeRecommend: StoreRecommendList[] | null;
};

import { APIResponse } from 'apis/api';
import { Code, Price, Badge } from 'apis/apiCommonType';
import { DisplayGoodsSortTypeCode, GoodsDisplaySalesStatusKey } from 'type/display';

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

type CodeTypeEnum = {
  code: string;
  codeName: string;
};
type CustomAreaList = {
  mainGroupId: 0;
  customDetailTypeEnum: CodeTypeEnum;
  sort: 0;
};
export type getMainDisplayInfoRep = {
  deviceTypeEnumList: CodeTypeEnum[];
  customAreaList: CustomAreaList[];
};

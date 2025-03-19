import { DisplayGoodsSortTypeCode } from 'type';
import { APIResponse, axiosInstance } from './api';
import { DisplayUrl } from './urls';
import {
  getMainDisplayInfoRep,
  // SalesListData,
  SearchAutoCompleteResp,
  SearchGoodsResult,
  SearchInfoResp,
  SearchResultListResp,
} from 'type/api/display';
import { AxiosResponse } from 'axios';

export const DisplayAPI = {
  // getSalesList: (page: number, size: number, goodsSortTypeEnum: DisplayGoodsSortTypeCode) => {
  //   const query = new URLSearchParams({
  //     page: page.toString(),
  //     size: size.toString(),
  //     goodsAutoTypeEnum: goodsSortTypeEnum.toString(),
  //   });

  //   return axiosInstance
  //     .get<AxiosResponse<SalesListData>>(DisplayUrl.salesList + '?' + query.toString())
  //     .then((resp) => resp.data.data)
  //     .catch((e) => {
  //       console.error('API Error:', e);
  //     });
  // },
  searchInfo: () => {
    return axiosInstance
      .get<AxiosResponse<SearchInfoResp>>(DisplayUrl.searchInfo)
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  searchResultList: (keyword: string) => {
    const query = new URLSearchParams({
      keyword,
    });
    return axiosInstance
      .get<AxiosResponse<SearchResultListResp>>(DisplayUrl.searchResultList + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  saveRecentSearchKeyword: (body: { searchTextList: string[] }) => {
    return axiosInstance
      .post<AxiosResponse<APIResponse>>(DisplayUrl.saveRecentSearchKeyword, body)
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  deleteRecentSearchKeyword: (body: { searchTextList: string[] }) => {
    return axiosInstance
      .delete<AxiosResponse<APIResponse>>(DisplayUrl.deleteRecentSearchKeyword, { data: body })
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  searchGoodsResult: (queryParam: {
    page: number;
    size: number;
    searchTextMain: string;
    goodsSortTypeEnum: DisplayGoodsSortTypeCode;
    searchTextSub?: string;
    categoryStoreId?: string;
    brandIdList?: string;
  }) => {
    const query = new URLSearchParams({
      page: queryParam.page.toString(),
      size: queryParam.size.toString(),
      searchTextMain: queryParam.searchTextMain,
      goodsSortTypeEnum: queryParam.goodsSortTypeEnum,
      ...(queryParam.searchTextSub && { searchTextSub: queryParam.searchTextSub }),
      ...(queryParam.categoryStoreId && { categoryStoreId: queryParam.categoryStoreId }),
      ...(queryParam.brandIdList && { brandIdList: queryParam.brandIdList }),
    });

    return axiosInstance
      .get<AxiosResponse<SearchGoodsResult>>(DisplayUrl.searchGoodsResult + '?' + query.toString())
      .then((resp) => resp.data.data)
      .catch((e) => console.log(e));
  },
  searchAutoComplete: (keyword: string) => {
    const query = new URLSearchParams({
      keyword,
    });
    return axiosInstance
      .get<AxiosResponse<SearchAutoCompleteResp>>(DisplayUrl.searchAutoComplete + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  getMainDisplayInfo: () => {
    return axiosInstance
      .get<AxiosResponse<getMainDisplayInfoRep>>(DisplayUrl.getMainDisplayInfo)
      .then((resp) => resp.data);
  },
};

export default DisplayAPI;
